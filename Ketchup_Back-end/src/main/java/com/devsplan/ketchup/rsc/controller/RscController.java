package com.devsplan.ketchup.rsc.controller;

import com.devsplan.ketchup.common.Criteria;
import com.devsplan.ketchup.common.PageDTO;
import com.devsplan.ketchup.common.PagingResponseDTO;
import com.devsplan.ketchup.common.ResponseDTO;
import com.devsplan.ketchup.rsc.dto.ResourceDTO;
import com.devsplan.ketchup.rsc.service.RscService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import static com.devsplan.ketchup.util.TokenUtils.decryptToken;

@Controller
@RequestMapping("/resources")
public class RscController {
    @Value("${jwt.key}")
    private String jwtSecret;
    private final RscService rscService;

    public RscController(RscService rscService) {
        this.rscService = rscService;
    }

    @PostMapping
    public ResponseEntity<ResponseDTO> insertResource(@RequestBody ResourceDTO rscDto) {
        System.out.println(rscDto);
        return ResponseEntity.ok().body(
                new ResponseDTO(HttpStatus.OK, "자원 등록 성공",
                        rscService.insertResource(rscDto))
        );
    }

    @GetMapping
    public ResponseEntity<ResponseDTO> selectResource(@RequestHeader("Authorization") String token,
                                                      @RequestParam("part") String partValue,
                                                      @RequestParam(name = "page", defaultValue = "1"
                                                      ) String page) {
        String depName = decryptToken(token).get("depName", String.class);
        Criteria cri = new Criteria(Integer.valueOf(page),10);

        PagingResponseDTO pagingResponseDTO = new PagingResponseDTO();

        if(depName.equals("총무팀")) {
            String rscCate = "";
            if(partValue.equals("conferences")) {
                rscCate = "회의실";
            }else if(partValue.equals("vehicles")) {
                rscCate = "차량";
            }

            Page<ResourceDTO> rscList = rscService.selectRscList(cri, rscCate);
            pagingResponseDTO.setData(rscList);

            pagingResponseDTO.setPageInfo(new PageDTO(cri, (int) rscList.getTotalElements()));

            return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "자원 목록 조회", pagingResponseDTO));
        }else {
            return ResponseEntity.ok().body(
                    new ResponseDTO(HttpStatus.OK, "자원 관리 접근 권한 없습니다.", 0)
            );
        }
    }

    @GetMapping("/{rscNo}")
    public ResponseEntity<ResponseDTO> selectResourceDetail(@PathVariable int rscNo) {
        ResourceDTO selectRsc = rscService.selectResourceDetail(rscNo);

        return ResponseEntity.ok().body(
                new ResponseDTO(HttpStatus.OK, "자원 상세 조회",
                        selectRsc)
        );
    }

    @PutMapping("/{rscNo}")
    public ResponseEntity<ResponseDTO> updateResource(@RequestHeader("Authorization") String token,
                                                      @PathVariable int rscNo,
                                                      @RequestBody ResourceDTO updateRscDto) {
        String memberNo = decryptToken(token).get("memberNo", String.class);

        int result = rscService.updateResource(memberNo, rscNo, updateRscDto);

        if(result > 0) {
            return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "자원 수정 성공", result));
        }else {
            return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "자원 수정 실패", result));
        }
    }

    @DeleteMapping("/{rscNo}")
    public ResponseEntity<ResponseDTO> deleteResource(@RequestHeader("Authorization") String token, @PathVariable int rscNo) {
        String memberNo = decryptToken(token).get("memberNo", String.class);

        int delRsc = rscService.deleteResource(memberNo, rscNo);

        return ResponseEntity.ok().body(
                new ResponseDTO(HttpStatus.OK, "자원 삭제", delRsc)
        );
    }
}
