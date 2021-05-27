package com.roadmap.board.dto;

public class BoardDto {
	
	private String bid;
	private String bindex;
	private String btitle;
	private String btext;
	private String bdate;
	private String blike;
	private String bcomment;
	private String cdate;
	private String btype;
	
	private String rlike;
	private String rid;
	private String uid;
	private String userid;
	
	public void setBtype(String btype) {
		this.btype = btype;
	}
	
	public String getBtype() {
		return btype;
	}
	
	public void setCdate(String cdate) {
		this.cdate = cdate;
	}
	
	public String getCdate() {
		return cdate;
	}
	
	public void setBcomment(String bcomment) {
		this.bcomment = bcomment;
	}
	
	public String getBcomment() {
		return bcomment;
	}
	
	public void setuserid(String userid) {
		this.userid = userid;
	}
	public String getUserid() {
		return userid;
	}
	
	public void setBtitle(String btitle) {
		this.btitle = btitle;
	}
	
	public String getBtitle() {
		return btitle;
	}
	
	public void setRid(String rid) {
		this.rid = rid;
	}
	
	public String getRid() {
		return rid;
	}
	
	public void setUid(String uid) {
		this.uid = uid;
	}
	
	public String getUid() {
		return uid;
	}
	
	public void setRlike(String rlike) {
		this.rlike = rlike;
	}
	
	public String getRlike() {
		return rlike;
	}
	
	public void setBid(String bid) {
		this.bid = bid;
	}
	
	public String getBid() {
		return bid;
	}
	
	public void setBindex(String bindex) {
		this.bindex = bindex;
	}
	
	public String getBindex() {
		return bindex;
	}
	
	public void setBtext(String btext) {
		this.btext = btext;
	}
	
	public String getBtext() {
		return btext;
	}
	
	public void setBdate(String bdate) {
		this.bdate = bdate;
	}
	
	public String getbDate() {
		return bdate;
	}
	
	public void setBlike(String blike) {
		this.blike = blike;
	}
	
	public String getBlike() {
		return blike;
	}
}
