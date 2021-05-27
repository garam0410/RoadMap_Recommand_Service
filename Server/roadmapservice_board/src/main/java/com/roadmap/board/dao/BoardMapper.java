package com.roadmap.board.dao;

import java.util.List;

import com.roadmap.board.dto.BoardDto;
import com.roadmap.board.dto.CommentDto;

public interface BoardMapper {
	public List<CommentDto> getComment(String rid);

	public void insertComment(CommentDto commentDto);
	
	public void insertViewCount(String uid, String rid);
	
	public void deleteComment(CommentDto commentDto);
	
	public String getLoveCount(int rid);
	
	public String getLoveStatus(BoardDto boardDto);
	
	public void saveLove(BoardDto boardDto);
	
	public void deleteLove(BoardDto boardDto);
	
	public String getUid(String uid);

	public List<BoardDto> getBoardList(String btype);
	
	public String getBoardText(String bid);
	
	public List<BoardDto> getBoardComment(String bid);
	
	public void deleteBoardComment(CommentDto commentDto);
	
	public void insertBoardComment(CommentDto commentDto);
	
	public void modifyBoard(BoardDto boardDto);
	
	public void insertBoard(BoardDto boardDto);
	
	public void deleteBoard(String bid);
	
	public void deleteBoardCommentAll(String bid);
}
