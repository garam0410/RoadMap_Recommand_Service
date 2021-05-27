package com.roadmap.board.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.roadmap.board.dao.BoardMapper;
import com.roadmap.board.dto.BoardDto;
import com.roadmap.board.dto.CommentDto;

@RestController
public class BoardController {
	
	public String result = "";
	
	@Autowired
	private BoardMapper boardMapper;
	
	@GetMapping(path = "/getcomment")
	public List<CommentDto> getComment(@RequestParam String rid) {
		List<CommentDto> list = boardMapper.getComment(rid);
		System.out.println(list);
		return list;
	}
	
	@GetMapping(path = "/insertviewcount")
	public void insertViewCount(@RequestParam String userId, String rid) {
		try {

			String uid = boardMapper.getUid(userId);
			boardMapper.insertViewCount(uid,rid);
			
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	@GetMapping(path = "/insertcomment")
	public String insertComment(@RequestParam int rid, String uid, String ucomment, String udate) {
		
		try {			
			CommentDto commentDto = new CommentDto();
			commentDto.setRid(rid);
			commentDto.setUid(boardMapper.getUid(uid));
			commentDto.setUcomment(ucomment);
			commentDto.setDate(udate);
			boardMapper.insertComment(commentDto);
			result = "success";
			
		}catch(Exception e) {
			result = "fali";
			e.printStackTrace();
		}
		return result;
	}
	
	@GetMapping(path = "/deletecomment")
	public String delectComment(@RequestParam String uid, String udate) {
		
		try {
			CommentDto commentDto = new CommentDto();
			commentDto.setUid(boardMapper.getUid(uid));
			commentDto.setDate(udate);
			boardMapper.deleteComment(commentDto);
			result = "success";
			System.out.println(uid);
			
		}catch(Exception e) {
			result = "fail";
			e.printStackTrace();
		}
		
		return result;
	}
	
	@GetMapping(path = "/getlovecount")
	public String getLoveCount(@RequestParam String rid) {
		
		try {
			
			result =  boardMapper.getLoveCount(Integer.parseInt(rid));
			System.out.println(result);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	@GetMapping(path = "/getlovestatus")
	public String getLoveStatus(@RequestParam String rid, String uid) {
		
		try {
			
			BoardDto boardDto = new BoardDto();
			boardDto.setRid(rid);
			boardDto.setUid(boardMapper.getUid(uid));
			
			if(boardMapper.getLoveStatus(boardDto) != null) {
				result = "♥";
			}
			else result = "♡";
			
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	@GetMapping(path = "/savelove")
	public String saveLove(@RequestParam String rid, String uid) {
		
		try {
			
			BoardDto boardDto = new BoardDto();
			boardDto.setRid(rid);
			boardDto.setUid(boardMapper.getUid(uid));
			
			boardMapper.saveLove(boardDto);
			
			result = "success";
			
		}catch(Exception e) {
			result = "fail";
			e.printStackTrace();
		}
		
		return result;
	}
	
	@GetMapping(path = "/deletelove")
	public String deleteLove(@RequestParam String rid, String uid){
		
		try {
			
			BoardDto boardDto = new BoardDto();
			boardDto.setRid(rid);
			boardDto.setUid(boardMapper.getUid(uid));
			
			boardMapper.deleteLove(boardDto);
			
			result = "success";
			
		}catch(Exception e) {
			result = "fail";
			e.printStackTrace();
		}
		
		return result;
	}

	@GetMapping(path = "/getboardlist")
	public List<BoardDto> getBoardList(@RequestParam String btype){
		List<BoardDto> rs = null;
		try {
			rs = boardMapper.getBoardList(btype); 
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return rs;
	}
	
	
	@GetMapping(path = "/getboardtext")
	public String getBoardText(@RequestParam String bid) {
		try {
			
			String rs = boardMapper.getBoardText(bid);
			return rs;
			
		}catch(Exception e) {
			e.printStackTrace();
			return "fail";
		}
	}
	
	@GetMapping(path = "/getboardcomment")
	public List<BoardDto> getBoardComment(@RequestParam String bid){
		
		List<BoardDto> rs = null;
		
		try {
			
			rs = boardMapper.getBoardComment(bid);

		}catch(Exception e) {
			e.printStackTrace();
		}
		return rs;
	}
	
	@GetMapping(path = "/deleteboardcomment")
	public String deleteBoardComment(@RequestParam String uid, String udate) {
		try {
			CommentDto commentDto = new CommentDto();
			commentDto.setUid(boardMapper.getUid(uid));
			commentDto.setCdate(udate);
			boardMapper.deleteBoardComment(commentDto);
			
			result = "success";
		}catch(Exception e) {
			result = "fail";
			e.printStackTrace();
		}
		return result;
	}
	
	@GetMapping(path = "/insertboardcomment")
	public String insertBoardComment(@RequestParam String bid, String uid, String bcomment, String cdate) {
		try {			
			CommentDto commentDto = new CommentDto();
			commentDto.setBid(bid);
			commentDto.setUid(boardMapper.getUid(uid));
			commentDto.setBcomment(bcomment);
			commentDto.setCdate(cdate);
			boardMapper.insertBoardComment(commentDto);
			result = "success";
			
		}catch(Exception e) {
			result = "fali";
			e.printStackTrace();
		}
		return result;
	}
	
	@GetMapping(path = "/modifyboard")
	public String modifyBoard(@RequestParam String bid, String btitle, String btext) {
		
		try {
			
			BoardDto boardDto = new BoardDto();
			boardDto.setBid(bid);
			boardDto.setBtitle(btitle);
			boardDto.setBtext(btext);
			System.out.println(bid);
			System.out.println(btitle);
			System.out.println(btext);
			boardMapper.modifyBoard(boardDto);
			result = "success";
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	@GetMapping(path = "/insertboard")
	public String insertBoard(@RequestParam String uid, String btype, String btitle, String btext, String bdate) {
		
		try {
			
			BoardDto boardDto = new BoardDto();
			boardDto.setUid(boardMapper.getUid(uid));
			boardDto.setBtype(btype);
			boardDto.setBtitle(btitle);
			boardDto.setBtext(btext);
			boardDto.setBdate(bdate);
			boardMapper.insertBoard(boardDto);
			result = "success";
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	@GetMapping(path = "/deleteboard")
	public String deleteBoard(@RequestParam String bid) {
		
		try {
			boardMapper.deleteBoardCommentAll(bid);
			boardMapper.deleteBoard(bid);
			result = "success";
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
}
