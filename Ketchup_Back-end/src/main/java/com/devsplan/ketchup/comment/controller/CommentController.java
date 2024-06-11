package com.devsplan.ketchup.comment.controller;

import com.devsplan.ketchup.comment.dto.CommentDTO;
import com.devsplan.ketchup.comment.service.CommentService;
import com.devsplan.ketchup.common.ResponseDTO;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.devsplan.ketchup.util.TokenUtils.decryptToken;

@Slf4j
@RestController
@RequestMapping("/boards")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    /* 댓글 조회 */
    @GetMapping("/{boardNo}/comments")
    public ResponseEntity<ResponseDTO> selectCommentList(@PathVariable int boardNo) {
        try {
            List<CommentDTO> commentList = commentService.selectCommentList(boardNo);
            return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "댓글 조회 성공", commentList));
        } catch (Exception e) {
            log.error("댓글 조회 중 오류 발생: " + e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDTO(HttpStatus.INTERNAL_SERVER_ERROR, "댓글 조회 중 오류 발생", null));
        }
    }

    /* 특정 댓글 조회 */
    @GetMapping("/{boardNo}/comments/{commentNo}")
    public ResponseEntity<ResponseDTO> selectCommentDetail(@PathVariable int boardNo, @PathVariable int commentNo) {
        try {

            CommentDTO comment = commentService.selectCommentDetail(boardNo, commentNo);
            return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "특정 댓글 조회 성공", comment));
        } catch (Exception e) {
            log.error("댓글 조회 중 오류 발생: " + e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDTO(HttpStatus.INTERNAL_SERVER_ERROR, "특정 댓글 조회 중 오류 발생", null));
        }
    }

    /* 대댓글 조회 */
    @GetMapping("/{boardNo}/comments/{parentCommentNo}/replies")
    public ResponseEntity<ResponseDTO> selectRepliesToComment(@PathVariable int boardNo, @PathVariable int parentCommentNo) {
        try {
            List<CommentDTO> replies = commentService.selectRepliesToComment(boardNo, parentCommentNo);
            return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "대댓글 조회 성공", replies));
        } catch (Exception e) {
            log.error("대댓글 조회 중 오류 발생: " + e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDTO(HttpStatus.INTERNAL_SERVER_ERROR, "대댓글 조회 중 오류 발생", null));
        }
    }

    /* 댓글 등록 */
    @PostMapping("/{boardNo}/comments")
    public ResponseEntity<ResponseDTO> insertComment(@PathVariable("boardNo") int boardNo
                                                    ,@RequestBody CommentDTO commentDTO
                                                    ,@RequestHeader("Authorization") String token) {
        try {
            String memberNo = decryptToken(token).get("memberNo", String.class);

            Object data = commentService.insertComment(boardNo, commentDTO, memberNo);

            return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "댓글 작성 성공", data));
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ResponseDTO("토큰이 만료되었습니다."));
        } catch (JwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ResponseDTO("유효하지 않은 토큰입니다."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseDTO(HttpStatus.INTERNAL_SERVER_ERROR, "서버 오류", null));
        }
    }

    /* 대댓글 등록 */
    @PostMapping("/{boardNo}/comments/{parentCommentNo}/replies")
    public ResponseEntity<ResponseDTO> insertReply(@PathVariable("boardNo") int boardNo
                                                    , @PathVariable("parentCommentNo") String parentCommentNo
                                                    , @RequestBody CommentDTO commentDTO
                                                    , @RequestHeader("Authorization") String token) {
        try {
            String memberNo = decryptToken(token).get("memberNo", String.class);

            Object data = commentService.insertReply(boardNo, parentCommentNo, commentDTO, memberNo);

            return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "대댓글 작성 성공", data));
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ResponseDTO("토큰이 만료되었습니다."));
        } catch (JwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ResponseDTO("유효하지 않은 토큰입니다."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseDTO(HttpStatus.INTERNAL_SERVER_ERROR, "서버 오류", null));
        }
    }

    /* 댓글 수정 */
    @PutMapping("/{boardNo}/comments/{commentNo}")
    public ResponseEntity<ResponseDTO> updateComment(@PathVariable int boardNo
                                                    , @PathVariable int commentNo
                                                    , @RequestBody CommentDTO commentDTO
                                                    , @RequestHeader("Authorization") String token) {
        try {
            String memberNo = decryptToken(token).get("memberNo", String.class);

            CommentDTO comment = commentService.updateComment(boardNo, commentNo, commentDTO, memberNo);

            return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "댓글 수정 성공", comment));
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ResponseDTO("토큰이 만료되었습니다."));
        } catch (JwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ResponseDTO("유효하지 않은 토큰입니다."));
        } catch (Exception e) {
            log.error("공지 등록 실패: {}", e.getMessage(), e);
            throw new RuntimeException("공지 등록 중 오류가 발생했습니다: " + e.getMessage()); // 수정된 부분
        }
    }

    /* 댓글 삭제 */
    @DeleteMapping("/{boardNo}/comments/{commentNo}")
    public ResponseEntity<ResponseDTO> deleteComment(@PathVariable int boardNo
                                                    , @PathVariable int commentNo
                                                    , @RequestHeader("Authorization") String token) {
        try {
            String memberNo = decryptToken(token).get("memberNo", String.class);

            commentService.deleteComment(boardNo, commentNo, memberNo);
            return ResponseEntity.ok().body(new ResponseDTO("댓글이 성공적으로 삭제되었습니다."));

        }  catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseDTO(HttpStatus.BAD_REQUEST, e.getMessage(), null));
        } catch (Exception e) {
            log.error("서버 오류: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseDTO(HttpStatus.INTERNAL_SERVER_ERROR, "서버 오류", null));
        }
    }


}
