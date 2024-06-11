package com.devsplan.ketchup.notice.service;

import com.devsplan.ketchup.board.dto.BoardDTO;
import com.devsplan.ketchup.board.entity.Board;
import com.devsplan.ketchup.common.Criteria;
import com.devsplan.ketchup.notice.dto.NoticeDTO;
import com.devsplan.ketchup.notice.dto.NoticeFileDTO;
import com.devsplan.ketchup.notice.entity.Notice;
import com.devsplan.ketchup.notice.entity.NoticeFile;
import com.devsplan.ketchup.notice.repository.NoticeFileRepository;
import com.devsplan.ketchup.notice.repository.NoticeRepository;
import com.devsplan.ketchup.util.FileUtils;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.NoSuchFileException;
import java.sql.Timestamp;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final NoticeFileRepository noticeFileRepository;
    private final ModelMapper modelMapper;

    /* 이미지 저장 할 위치 및 응답 할 이미지 주소 */
    @Value("${image.image-dir}")
    private String IMAGE_DIR;

    @Value("${image.image-url}")
    private String IMAGE_URL;

    public NoticeService(NoticeRepository noticeRepository, NoticeFileRepository noticeFileRepository, ModelMapper modelMapper) {
        this.noticeRepository = noticeRepository;
        this.noticeFileRepository = noticeFileRepository;
        this.modelMapper = modelMapper;
    }

    /* 공지사항 목록조회 & 페이징 & 상단고정 */
    public Map<String, Object> selectNoticeList(Criteria cri, String title) {

        int page = cri.getPageNum() - 1;
        int size = cri.getAmount();
        Pageable paging = PageRequest.of(page, size, Sort.by("noticeNo").descending());

        List<Notice> allNotices = noticeRepository.findAll(Sort.by("noticeCreateDttm").descending());
        List<Notice> fixedNotices = allNotices.stream().filter(notice -> notice.getNoticeFix() == 'Y').toList();
        List<Notice> normalNotices = allNotices.stream().filter(notice -> notice.getNoticeFix() != 'Y').collect(Collectors.toList());

        // 검색어에 따라 필터링
        if (title != null && !title.isEmpty()) {
            normalNotices = normalNotices.stream()
                    .filter(notice -> notice.getNoticeTitle().toLowerCase().contains(title.toLowerCase()))
                    .collect(Collectors.toList());
        }

        int totalElements = normalNotices.size();

        List<Notice> currentNormalItems = getCurrentItems(page, size, normalNotices);

        List<NoticeDTO> fixedNoticeDTOs = fixedNotices.stream()
                .map(notice -> modelMapper.map(notice, NoticeDTO.class))
                .collect(Collectors.toList());


        List<NoticeDTO> normalNoticeDTOs = currentNormalItems.stream()
                .map(notice -> modelMapper.map(notice, NoticeDTO.class))
                .collect(Collectors.toList());


        Page<NoticeDTO> normalNoticePage = new PageImpl<>(normalNoticeDTOs, paging, totalElements);

        // 응답 데이터를 생성합니다.
        Map<String, Object> responseData = new HashMap<>();
        responseData.put("fixedNotices", fixedNoticeDTOs);
        responseData.put("normalNotices", normalNoticePage);

        return responseData;
    }

    // 현재 페이지에 보여질 일반 공지 목록을 가져옵니다.
    private List<Notice> getCurrentItems(int page, int size, List<Notice> normalNotices) {
        int startIndex = page * size;
        int endIndex = Math.min(startIndex + size, normalNotices.size());
        return normalNotices.subList(startIndex, endIndex);
    }

    /* 공지사항 상세조회(첨부파일 다운) */
    public NoticeDTO selectNoticeDetail(int noticeNo) {

        Notice foundNotice = noticeRepository.findById(noticeNo).orElse(null);
        if (foundNotice == null) {
            return null; // 해당 게시물이 존재하지 않으면 null 반환
        }

        NoticeDTO noticeDTO = modelMapper.map(foundNotice, NoticeDTO.class);

        List<NoticeFile> noticeFiles = findNoticeFileByNoticeNo(noticeNo);
        List<NoticeFileDTO> noticeFileDTOs = new ArrayList<>();

        for (NoticeFile noticeFile : noticeFiles) {
            NoticeFileDTO noticeFileDTO = modelMapper.map(noticeFile, NoticeFileDTO.class);
            noticeFileDTOs.add(noticeFileDTO);
        }

        noticeDTO.setNoticeFileList(noticeFileDTOs);
        log.info("noticeDTO : " + noticeDTO);

        return noticeDTO;
    }

    public List<NoticeFile> findNoticeFileByNoticeNo(int noticeNo) {
        return noticeFileRepository.findByNoticeNo(noticeNo);
    }

    /* 상세조회 이전 게시물 조회 */
    public NoticeDTO getPreviousNotice(int noticeNo) {
        Notice previousNotice = noticeRepository.findTopByNoticeNoLessThanOrderByNoticeNoDesc(noticeNo);
        if(previousNotice != null) {
            return modelMapper.map(previousNotice, NoticeDTO.class);
        } else {
            return null;
        }
    }

    /* 상세조회 이후 게시물 조회 */
    public NoticeDTO getNextNotice(int noticeNo) {
        Notice nextNotice = noticeRepository.findTopByNoticeNoGreaterThanOrderByNoticeNoAsc(noticeNo);

        if(nextNotice != null) {
            return modelMapper.map(nextNotice, NoticeDTO.class);
        } else {
            return null;
        }
    }

    /* 공지사항 등록 */
    @Transactional
    public Object insertNotice(NoticeDTO noticeDTO, String memberNo) {

        try {
            noticeDTO.setNoticeCreateDttm(new Timestamp(System.currentTimeMillis()));
            noticeDTO.setMemberNo(memberNo);

            Notice notice = modelMapper.map(noticeDTO, Notice.class);

            Notice savedNotice = noticeRepository.save(notice);

            log.info("공지 등록 성공");
            System.out.println("savedNotice : " + savedNotice.getNoticeNo());
            return savedNotice.getNoticeNo(); // 등록된 공지의 번호 반환
        } catch (Exception e) {
            log.error("공지 등록 실패: {}", e.getMessage(), e);
            return null; // 실패 시 null 반환
        }
    }

    /* 공지사항 등록(첨부파일) */
    @Transactional
    public Object insertNoticeWithFile(NoticeDTO noticeDTO, List<MultipartFile> files, String memberNo) throws IOException {

        log.info("NoticeDTO : " + noticeDTO);
        Map<String, Object> result = new HashMap<>();

        try {
            noticeDTO.setNoticeCreateDttm(new Timestamp(System.currentTimeMillis()));
            noticeDTO.setMemberNo(memberNo);

            Notice savedNotice = modelMapper.map(noticeDTO, Notice.class);
            noticeRepository.save(savedNotice);

            uploadFiles(savedNotice, files);

            log.info("공지 등록 성공");
            System.out.println("savedNotice : " + savedNotice.getNoticeNo());
            return savedNotice.getNoticeNo(); // 등록된 공지의 번호 반환
        } catch (Exception e) {
            log.error("Error while inserting Announce with Files: " + e.getMessage());
            result.put("result", false);
        }
        return result;
    }


    /* 공지사항 수정 */
    @Transactional
    public String updateNotice(int noticeNo, NoticeDTO noticeDTO, List<Integer> deleteFileNo, String memberNo) {
        try {
            Notice foundNotice = noticeRepository.findById(noticeNo).orElseThrow(IllegalArgumentException::new);

            // 직급 2,3인 사용자
            if (foundNotice.getMemberNo().equals(memberNo)) {
                foundNotice.noticeTitle(noticeDTO.getNoticeTitle());
                foundNotice.noticeContent(noticeDTO.getNoticeContent());
                foundNotice.noticeFix(noticeDTO.getNoticeFix());
                foundNotice.noticeUpdateDttm(new Timestamp(System.currentTimeMillis()));

                Notice savedNotice = noticeRepository.save(foundNotice);

                // 파일 삭제 처리
                if (deleteFileNo != null && !deleteFileNo.isEmpty()) {
                    deleteFiles(deleteFileNo);
                }
                
                if (savedNotice.getNoticeNo() == noticeNo) {
                    return "공지 수정 성공";
                } else {
                    return "공지 수정 실패 : 엔티티 잘못 저장되었습니다.";
                }
            } else {
                return "공지 수정 권한이 없습니다.";
            }
        } catch (Exception e) {
            log.error("공지 수정 중 오류 발생: " + e.getMessage(), e);
            return "공지 수정 중 오류가 발생했습니다.";
        }
    }

    /* 공지사항 수정(첨부파일) */
    @Transactional
    public String updateNoticeWithFile(int noticeNo, NoticeDTO noticeDTO, List<MultipartFile> files, List<Integer> deleteFileNo, String memberNo) {
        try {
            Notice foundNotice = noticeRepository.findById(noticeNo).orElseThrow(IllegalArgumentException::new);
            log.info("updateNoticeWithFile [ deleteFileNo ] : {}", deleteFileNo);

            if (foundNotice.getMemberNo().equals(memberNo)) {
                foundNotice.noticeTitle(noticeDTO.getNoticeTitle());
                foundNotice.noticeContent(noticeDTO.getNoticeContent());
                foundNotice.noticeFix(noticeDTO.getNoticeFix());
                foundNotice.noticeUpdateDttm(new Timestamp(System.currentTimeMillis()));

                Notice savedNotice = noticeRepository.save(foundNotice);

                // 파일 삭제 처리
                if (deleteFileNo != null && !deleteFileNo.isEmpty()) {
                    deleteFiles(deleteFileNo);
                }

                uploadFiles(savedNotice, files); // Upload new files
                return "공지 수정 성공";

            } else {
                return "공지 수정 권한이 없습니다.";
            }

        } catch (Exception e) {
            log.error("공지 수정 중 오류 발생: " + e.getMessage(), e);
            return "공지 수정 중 오류가 발생했습니다.";
        }
    }

 
    /* 공지사항 삭제 */
    @Transactional
    public Object deleteNotice(int noticeNo, String memberNo) throws NoSuchFileException {
        try {

            // 공지사항 조회
            Notice notice = noticeRepository.findById(noticeNo).orElseThrow();

            System.out.println("service noticeNo : " + noticeNo);
            System.out.println("service memberNo : " + memberNo);

            // 현재 사용자의 Authentication 객체를 가져옴
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            // 현재 사용자의 권한을 확인하여 LV2 또는 LV3 권한이 있는지 확인
            boolean hasPermission = authentication.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("LV2") || a.getAuthority().equals("LV3"));

            // 작성자인 경우에도 삭제 권한 부여
            hasPermission = hasPermission || notice.getMemberNo().equals(memberNo);

            if (hasPermission) {
                List<NoticeFile> noticeFiles = noticeFileRepository.findByNoticeNo(noticeNo);

                noticeFileRepository.deleteAll(noticeFiles);
                noticeRepository.delete(notice);
                return true; // 성공적으로 삭제됨

            } else {
                throw new IllegalArgumentException("권한이 없습니다.");
            }
        } catch (Exception e) {
            log.error("공지 삭제 중 오류 발생: " + e.getMessage(), e);
            return false; // 삭제 중 오류 발생
        }
    }

    /* 수정, 삭제 여부 test 확인용 */
    public void getNoticeById(int noticeNo) throws ChangeSetPersister.NotFoundException {
        noticeRepository.findById(noticeNo).orElseThrow(ChangeSetPersister.NotFoundException::new);
    }

    /* 파일 업로드 */
    @Transactional
    public void uploadFiles(Notice savedNotice, List<MultipartFile> files) {
        try {
            if (files != null && !files.isEmpty()) {
                int fileCount = 0;
                for (MultipartFile file : files) {
                    if (fileCount >= 5) { // 등록된 파일이 5개 이상이면 더 이상 파일을 등록하지 않음
                        break;
                    }
                    String fileName = file.getOriginalFilename();
                    String newFileName = UUID.randomUUID().toString().replace("-", "") + "." + fileName;
                    String savedFilePath = FileUtils.saveFile(IMAGE_DIR, newFileName, file);

                    // 파일을 저장할 디렉토리 생성 (만약 디렉토리가 없다면)
                    File newFile = new File(savedFilePath);
                    file.transferTo(newFile);

                    NoticeFileDTO noticeFileDTO = new NoticeFileDTO();
                    noticeFileDTO.setNoticeNo(savedNotice.getNoticeNo());
                    noticeFileDTO.setNoticeFileName(newFileName);
                    noticeFileDTO.setNoticeFilePath(savedFilePath);
                    noticeFileDTO.setNoticeFileOriName(fileName);

                    NoticeFile noticeFile = modelMapper.map(noticeFileDTO, NoticeFile.class);
                    noticeFileRepository.save(noticeFile);
                    fileCount++;
                }
            }
        } catch (Exception e) {
            log.error("Error while uploading files: " + e.getMessage(), e);
        }
    }

    /* 상세조회 파일 삭제 */
    @Transactional
    public void deleteFiles(List<Integer> fileNos) {
        for (int fileNo : fileNos) {
            try {
                NoticeFile noticeFile = noticeFileRepository.findById(fileNo)
                        .orElseThrow(() -> new IllegalArgumentException("File not found with ID: " + fileNo));

                File file = new File(noticeFile.getNoticeFilePath());
                if (file.exists()) {
                    if (file.delete()) {
                        log.info("File deleted successfully: {}", noticeFile.getNoticeFilePath());
                    } else {
                        log.error("Failed to delete file: {}", noticeFile.getNoticeFilePath());
                    }
                } else {
                    log.warn("File does not exist: {}", noticeFile.getNoticeFilePath());
                }
                noticeFileRepository.delete(noticeFile);
                log.info("Deleted file record from database: {}", noticeFile);
            } catch (Exception e) {
                log.error("Error while deleting file: " + e.getMessage(), e);
            }
        }
    }

}