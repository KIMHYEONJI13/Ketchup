package com.devsplan.ketchup.comment.service;

import com.devsplan.ketchup.board.entity.Board;
import com.devsplan.ketchup.board.repository.BoardRepository;
import com.devsplan.ketchup.comment.dto.CommentDTO;
import com.devsplan.ketchup.comment.entity.Comment;
import com.devsplan.ketchup.comment.repository.CommentRepository;
import com.devsplan.ketchup.member.repository.MemberRepository;
import com.devsplan.ketchup.member.service.MemberService;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.stereotype.Service;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.sql.Date;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class CommentService {
    private final BoardRepository boardRepository;
    private final CommentRepository commentRepository;
    private final MemberRepository memberRepository;
    private final ModelMapper modelMapper;
    private final ThreadPoolTaskScheduler taskScheduler;

    @Autowired
    public CommentService(BoardRepository boardRepository, CommentRepository commentRepository, MemberRepository memberRepository, ModelMapper modelMapper, ThreadPoolTaskScheduler taskScheduler) {
        this.boardRepository = boardRepository;
        this.commentRepository = commentRepository;
        this.memberRepository = memberRepository;
        this.modelMapper = modelMapper;
        this.taskScheduler = taskScheduler;
    }

    /* 댓글 조회 */
    public List<CommentDTO> selectCommentList(int boardNo) {
        try {
            List<Comment> comments = commentRepository.findByBoard(boardRepository.findById(boardNo).orElse(null));

            List<CommentDTO> commentDTOList = comments.stream()
                    .map(comment -> modelMapper.map(comment, CommentDTO.class))
                    .collect(Collectors.toList());

            for (CommentDTO commentDTO : commentDTOList) {
                List<CommentDTO> replies = findReplies(commentDTO.getCommentNo(), commentDTOList);
                commentDTO.setReplies(replies);
            }

            return commentDTOList;
        } catch (Exception e) {
            log.error("댓글 조회 중 오류 발생: " + e.getMessage(), e);
            throw new RuntimeException("댓글 조회 중 오류 발생");
        }
    }

    /* 대댓글 찾기 */
    private List<CommentDTO> findReplies(int parentCommentNo, List<CommentDTO> commentDTOList) {
        List<CommentDTO> replies = new ArrayList<>();
        for (CommentDTO commentDTO : commentDTOList) {
            if (commentDTO.getParentCommentNo() != null && commentDTO.getParentCommentNo() == parentCommentNo) {
                List<CommentDTO> childReplies = findReplies(commentDTO.getCommentNo(), commentDTOList);
                commentDTO.setReplies(childReplies);
                replies.add(commentDTO);
            }
        }
        return replies;
    }

    /* 특정 댓글 조회 */
    public CommentDTO selectCommentDetail(int boardNo, int commentNo) {
        try {
            Comment comment = commentRepository.findByBoardBoardNoAndCommentNo(boardNo, commentNo);

            if(comment == null) {
                throw new RuntimeException("Comment not found");
            }
            return modelMapper.map(comment, CommentDTO.class);
        } catch (Exception e) {
            log.error("댓글 조회 중 오류 발생: " + e.getMessage(), e);
            throw new RuntimeException("댓글 조회 중 오류 발생");
        }
    }

    /* 대댓글 조회 */
    public List<CommentDTO> selectRepliesToComment(int boardNo, int commentNo) {
        try {
            Comment parentComment = commentRepository.findByBoardBoardNoAndCommentNo(boardNo, commentNo);

            if (parentComment == null) {
                throw new IllegalArgumentException("Parent comment not found");
            }

            List<Comment> replies = parentComment.getReplies();

            List<CommentDTO> replyDTOs = replies.stream()
                    .map(reply -> modelMapper.map(reply, CommentDTO.class))
                    .collect(Collectors.toList());

            return replyDTOs;
        } catch (Exception e) {
            log.error("대댓글 조회 중 오류 발생: " + e.getMessage(), e);
            throw new RuntimeException("대댓글 조회 중 오류 발생");
        }
    }

    /* 댓글 등록 */
    @Transactional
    public Object insertComment(int boardNo, CommentDTO commentDTO, String memberNo) {
        try {
            commentDTO.setCommentCreateDt(new Date(System.currentTimeMillis()));
            commentDTO.setMemberNo(memberNo);

            Board board = boardRepository.findById(boardNo).orElseThrow(IllegalArgumentException::new);

            String memberName = memberRepository.findByMemberNo(memberNo).orElseThrow(IllegalArgumentException::new).getMemberName();
            String positionName = memberRepository.findByMemberNo(memberNo).orElseThrow(IllegalArgumentException::new).getPosition().getPositionName();

            Comment comment = modelMapper.map(commentDTO, Comment.class);
            comment.board(board);
            comment.memberName(memberName);
            comment.positionName(positionName);

            if (commentDTO.getParentCommentNo() != null) {
                Comment parentComment = commentRepository.findById(commentDTO.getParentCommentNo())
                        .orElseThrow(() -> new IllegalArgumentException("Parent comment not found"));
                comment.parentComment(parentComment);
            }

            Comment savedComment = commentRepository.save(comment);

            return modelMapper.map(savedComment, CommentDTO.class);
        } catch (IllegalArgumentException e) {
            log.error("Failed to add comment to board: " + e.getMessage(), e);
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            throw e;
        } catch (Exception e) {
            log.error("Failed to add comment to board: " + e.getMessage(), e);
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            throw new RuntimeException("Failed to add comment to board", e);
        }
    }

    /* 대댓글 등록 */
    @Transactional
    public Object insertReply(int boardNo, String parentCommentNo, CommentDTO commentDTO, String memberNo) {
        try {
            commentDTO.setCommentCreateDt(new Date(System.currentTimeMillis()));
            commentDTO.setMemberNo(memberNo);

            Comment parentComment = commentRepository.findById(Integer.valueOf(parentCommentNo))
                    .orElseThrow(() -> new IllegalArgumentException("Parent comment not found"));

            Board board = boardRepository.findById(boardNo).orElseThrow(IllegalArgumentException::new);

            String memberName = memberRepository.findByMemberNo(memberNo).orElseThrow(IllegalArgumentException::new).getMemberName();
            String positionName = memberRepository.findByMemberNo(memberNo).orElseThrow(IllegalArgumentException::new).getPosition().getPositionName();

            Comment comment = modelMapper.map(commentDTO, Comment.class);
            comment.board(board);
            comment.parentComment(parentComment);
            comment.memberName(memberName);
            comment.positionName(positionName);

            Comment savedComment = commentRepository.save(comment);
            CommentDTO insertReply = selectCommentDetail(boardNo, savedComment.getCommentNo());

            return insertReply;
        } catch (IllegalArgumentException e) {
            log.error("Failed to add reply to comment: " + e.getMessage(), e);
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            throw e;
        } catch (Exception e) {
            log.error("Failed to add reply to comment: " + e.getMessage(), e);
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            throw new RuntimeException("Failed to add reply to comment", e);
        }
    }

    /* 댓글 수정 */
    @Transactional
    public CommentDTO updateComment(int boardNo, int commentNo, CommentDTO commentDTO, String memberNo) {
        try{
            Comment comment = commentRepository.findByBoardBoardNoAndCommentNo(boardNo, commentNo);

            if (!comment.getMemberNo().equals(memberNo)) {
                throw new IllegalArgumentException("댓글을 수정할 수 있는 권한이 없습니다.");
            }

            comment.commentContent(commentDTO.getCommentContent());
            comment.commentUpdateDt(new Date(System.currentTimeMillis()));

            Comment updatedComment = commentRepository.save(comment);

            return modelMapper.map(updatedComment, CommentDTO.class);
        } catch (IllegalArgumentException e) {
            log.error("댓글 수정 실패: " + e.getMessage(), e);
            throw e;
        } catch (Exception e) {
            log.error("댓글 수정 실패: " + e.getMessage(), e);
            throw new RuntimeException("댓글 수정 중 오류가 발생했습니다.", e);
        }
    }

    /* 댓글 삭제 */
    @Transactional
    public void deleteComment(int boardNo, int commentNo, String memberNo) {
        try {
            Comment comment = commentRepository.findByBoardBoardNoAndCommentNo(boardNo, commentNo);

            if (comment == null) {
                throw new IllegalArgumentException("해당하는 댓글이 없습니다.");
            }

            if (!comment.getMemberNo().equals(memberNo)) {
                throw new IllegalArgumentException("댓글 작성자만 삭제할 수 있습니다.");
            }

            if (!comment.getReplies().isEmpty()) {
                throw new IllegalArgumentException("대댓글이 있는 댓글은 삭제할 수 없습니다.");
            }

            comment.deleteComment(true);

            commentRepository.save(comment);

            schedulePermanentDeletion(commentNo);
        } catch (IllegalArgumentException e) {
            log.error("댓글 삭제 실패: {}", e.getMessage(), e);
            throw e;
        } catch (Exception e) {
            log.error("댓글 삭제 실패: {}", e.getMessage(), e);
            throw new RuntimeException("댓글 삭제 중 오류가 발생했습니다.", e);
        }
    }

    @Transactional
    public void schedulePermanentDeletion(int commentNo) {
        System.out.println("schedulePermanentDeletion [ commentNo ] : " + commentNo);

        taskScheduler.schedule(() -> {
            deleteCommentFromDatabase(commentNo);
        }, Instant.now().plusSeconds(10));
    }

    /* 실제 데이터베이스에서 댓글 삭제 */
    @Transactional
    public void deleteCommentFromDatabase(int commentNo) {
        System.out.println("deleteCommentFromDatabase [ commentNo ] : " + commentNo);

        try {
            Comment comment = commentRepository.findById(commentNo).orElse(null);
            if (comment == null) {
                log.warn("해당하는 댓글이 없습니다.");
                return;
            }

            if (comment.getDeleteComment()) {
                commentRepository.delete(comment);
            }
        } catch (Exception e) {
            log.error("데이터베이스에서 댓글 삭제 중 오류 발생: {}", e.getMessage(), e);
            throw new RuntimeException("데이터베이스에서 댓글 삭제 중 오류 발생", e);
        }
    }

}
