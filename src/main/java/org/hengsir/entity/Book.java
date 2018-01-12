package org.hengsir.entity;

import java.util.Date;

/**
* @author 周宇恒 
* @version v1.0
* 创建时间：2017年11月3日 上午9:20:36
* 类说明:书本实体
*/
public class Book{
	
	private String bookName;
	
	private String imgSrc;
	
	private String price;
	
	private String inner;
	
	private Date putTime;
	
	private Date outTime;
	
	private String dise;
	
	private String seller;
	
	private String author;
	
	private String compare;

	public String getBookName() {
		return bookName;
	}

	public void setBookName(String bookName) {
		this.bookName = bookName;
	}

	public String getImgSrc() {
		return imgSrc;
	}

	public void setImgSrc(String imgSrc) {
		this.imgSrc = imgSrc;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getInner() {
		return inner;
	}

	public void setInner(String inner) {
		this.inner = inner;
	}

	public Date getPutTime() {
		return putTime;
	}

	public void setPutTime(Date putTime) {
		this.putTime = putTime;
	}

	public Date getOutTime() {
		return outTime;
	}

	public void setOutTime(Date outTime) {
		this.outTime = outTime;
	}

	public String getDise() {
		return dise;
	}

	public void setDise(String dise) {
		this.dise = dise;
	}

	public String getSeller() {
		return seller;
	}

	public void setSeller(String seller) {
		this.seller = seller;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	@Override
	public String toString() {
		return "Book [bookName=" + bookName + ", imgSrc=" + imgSrc + ", price=" + price + ", inner=" + inner
				+ ", putTime=" + putTime + ", outTime=" + outTime + ", dise=" + dise + ", seller=" + seller + "]";
	}

	public String getCompare() {
		return compare;
	}

	public void setCompare(String compare) {
		this.compare = compare;
	}

}
