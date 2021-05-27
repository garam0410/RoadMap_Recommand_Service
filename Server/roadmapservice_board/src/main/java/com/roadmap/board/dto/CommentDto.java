package com.roadmap.board.dto;

public class CommentDto {
	private int rid;
	private String uid;
	private String bid;
	private String bcomment;
	private String ucomment;
	private String udate;
	private String cdate;
	
	public void setBcomment(String bcomment) {
		this.bcomment = bcomment;
	}
	
	public String getBcomment() {
		return bcomment;
	}
	
	public void setBid(String bid) {
		this.bid = bid;
	}
	
	public String getBid() {
		return bid;
	}
	
	public void setCdate(String cdate) {
		this.cdate = cdate;
	}
	public String getCdate() {
		return cdate;
	}
	
	public void setUid(String uid) {
		this.uid = uid;
	}
	
	public String getUid() {
		return uid;
	}
	
	public void setRid(int rid) {
		this.rid = rid;
	}
	
	public int getRid() {
		return rid;
	}
	
	public void setUcomment(String ucomment) {
		this.ucomment = ucomment;
	}
	
	public String getUcomment() {
		return ucomment;
	}
	
	public void setDate(String udate) {
		this.udate = udate;
	}
	
	public String getDate() {
		return udate;
	}
}
