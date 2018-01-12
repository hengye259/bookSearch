package org.hengsir.utils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.hengsir.comparator.MyComparator;
import org.hengsir.entity.Book;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

/**
 * @author 周宇恒
 * @version v1.0 创建时间：2017年11月3日 上午9:18:55 类说明:爬取各各网上的该图书信息与链接入口
 */
public class BookSearchUtil {

	public static void main(String[] args) {
		List<Book> list = searchJDBooks("php");
		for (Book book : list) {
			System.out.println(book.getImgSrc());
		}

	}

	/**
	 * 抓取当当网上的图书信息
	 * 
	 * @param bookTypeOrName
	 * @return
	 */
	public static List<Book> searchDDBooks(String bookTypeOrName) {
		String u = "";
		if (bookTypeOrName.contains(" ")) {
			u = bookTypeOrName.replace(" ", "%20");
		} else {
			u = bookTypeOrName;
		}
		String url = "http://search.dangdang.com/?key=" + u + "&act=input";
		List<Book> DDBooks = new ArrayList<Book>();

		Document d = getDocByUrl(url);
		Elements boxs = d.select("ul.bigimg li");
		try {
			for (Element element : boxs) {
				Book b = new Book();
				b.setBookName(element.select("p.name").text());
				String s = element.select("p.price span:eq(0)").text();
				System.out.println(s);
				b.setPrice(s.substring(s.indexOf("¥") + 1, s.indexOf(".") + 3));
				b.setCompare(s.substring(s.indexOf("¥") + 1, s.indexOf(".")));
				System.out.println(s.substring(s.indexOf("¥") + 1, s.indexOf(".")));
				b.setAuthor("作者：" + element.select("p.search_book_author span:eq(0").text());
				b.setSeller(element.select("p.dang").text());
				b.setInner(element.select("p.name a").attr("href"));
				String str = element.select("img").attr("src");
				if (str.startsWith("http")) {
					b.setImgSrc(str);
				} else if (element.select("img").attr("data-original") != null) {
					b.setImgSrc(element.select("img").attr("data-original"));
				} else {
					b.setImgSrc(str);
				}
				DDBooks.add(b);
			}
		} catch (Exception e) {
			Collections.sort(DDBooks, new MyComparator());
			return DDBooks;
		}
		Collections.sort(DDBooks, new MyComparator());
		return DDBooks;
	}

	/**
	 * 抓取孔夫子二手书网上的书本信息
	 * 
	 * @param bookTypeOrName
	 * @return
	 */
	public static List<Book> searchKFZBooks(String bookTypeOrName) {
		List<Book> KFZBooks = new ArrayList<Book>();
		String bookName = toUnicode(bookTypeOrName);
		String url = "http://search.kongfz.com/product/" + bookName;
		Document d = getDocByUrl(url);

		// 获取所以书本信息
		Elements boxs = d.select("div.result_box.m_t10");
		try {
			for (Element element : boxs) {
				Book book = new Book();
				book.setImgSrc(element.select("a.small_pic_img img:eq(1)").attr("src"));
				System.out.println(element.select("a.small_pic_img img:eq(1)").attr("src"));
				book.setBookName(element.select("div.result_tit a").text());
				book.setInner(element.select("div.result_tit a").attr("href"));
				book.setAuthor(element.select("div.grid_9:eq(0) p:eq(0)").text());
				book.setPrice(element.select("p.red.fb").text());
				String s = element.select("p.red.fb").text();
				book.setCompare(s.substring(0, s.indexOf(".")));
				System.out.println(s.substring(0, s.indexOf(".")));
				KFZBooks.add(book);
			}
		} catch (Exception e) {
			Collections.sort(KFZBooks, new MyComparator());
			return KFZBooks;
		}
		Collections.sort(KFZBooks, new MyComparator());
		return KFZBooks;
	}

	/**
	 * 获取京东书城上的书本信息
	 * 
	 * @param bookTypeOrName
	 * @return
	 */
	public static List<Book> searchJDBooks(String bookTypeOrName) {
		List<Book> JDBooks = new ArrayList<Book>();
		String u = "";
		if (bookTypeOrName.contains(" ")) {
			u = bookTypeOrName.replace(" ", "%20");
		} else {
			u = bookTypeOrName;
		}
		String url = "http://search.jd.com/Search?keyword=" + u + "&enc=utf-8";

		Document d = getDocByUrl(url);
		Elements boxs = d.select("li.gl-item");
		try {
			for (Element element : boxs) {
				Book b = new Book();
				String imgSrc = element.select("div.p-img a img").attr("src");
				System.out.println("imgSrc="+imgSrc);
				if (imgSrc.startsWith("http")) {
					b.setImgSrc(imgSrc);
				} else {
					b.setImgSrc("http:" + imgSrc);
				}
				String href = element.select("div.p-img a").attr("href");
				if (href.startsWith("http")) {
					b.setInner(href);
				} else {
					b.setInner("http:" + href);
				}
				b.setBookName(element.select("div.p-name a em").text());
				b.setPrice(element.select("div.p-price strong i").text());
				String s = element.select("div.p-price strong i").text();
				b.setCompare(s.substring(0, s.indexOf(".")));
				System.out.println(s.substring(0, s.indexOf(".")));
				b.setSeller(element.select("div.p-shopnum a").attr("title"));
				System.out.println(element.select("div.p-price strong i").text());
				JDBooks.add(b);
			}
		} catch (Exception e) {
			Collections.sort(JDBooks, new MyComparator());
			return JDBooks;
		}
		Collections.sort(JDBooks, new MyComparator());
		return JDBooks;
	}

	/**
	 * 由于孔夫子网对搜索的内容做了加密，此方法为解密方法
	 * 
	 * @param source
	 * @return
	 */
	public static String toUnicode(String source) {
		char[] c = source.toCharArray();
		StringBuilder sb = new StringBuilder();
		sb.append("y0zk");
		for (int i = 0; i < c.length; i++) {
			sb.append(Integer.toHexString(c[i]));
			if (i != c.length - 1) {
				sb.append("k");
			}
		}
		return sb.toString();
	}

	/**
	 * 根据url获取Document对象
	 */
	public static Document getDocByUrl(String url) {
		HttpGet get = null;// 用于发起get请求
		HttpResponse resp = null;// 网页的响应对象
		String content = null;// 响应回来的html源码存放于这
		Document doc = null;// 用Jsoup创建的Dom对象
		HttpClient client = HttpClients.createDefault();
		get = new HttpGet(url); // get请求页面
		try {
			resp = client.execute(get);
			content = EntityUtils.toString(resp.getEntity(), "utf-8"); // 把网页源码爬下来
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		doc = Jsoup.parse(content);
		return doc;
	}

}
