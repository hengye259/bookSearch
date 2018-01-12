package org.hengsir.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CountDownLatch;

import org.hengsir.entity.Book;
import org.hengsir.service.BookSearchService;
import org.hengsir.utils.BookSearchUtil;
import org.springframework.stereotype.Service;

/**
* @author 周宇恒 
* @version v1.0
* 创建时间：2017年11月7日 上午9:46:29
* 类说明:实现搜索的业务
*/

@Service("bookSearchService")
public class BookSearchServiceImpl implements BookSearchService{

	private Map<String, List<Book>> bookMap;
	private CountDownLatch cdl;// 有三个子线程，用来保证子线程可以执行结束


	public Map<String, List<Book>> search(String bookName) {
		final String bn = bookName;
		bookMap = new HashMap<String, List<Book>>();
		cdl = new CountDownLatch(3);
		
		new Thread(new Runnable() {
			public void run() {
				List<Book> ddList = BookSearchUtil.searchDDBooks(bn);
				insertMap("dd", ddList);
			}
		}).start();

		new Thread(new Runnable() {
			public void run() {
				List<Book> jdList = BookSearchUtil.searchJDBooks(bn);
				insertMap("jd", jdList);
			}
		}).start();

		new Thread(new Runnable() {
			public void run() {
				List<Book> kfzList = BookSearchUtil.searchKFZBooks(bn);
				insertMap("kfz", kfzList);
			}
		}).start();

		try {
			// 主线程等待子线程完成后执行
			cdl.await();
		} catch (InterruptedException e) {
			e.printStackTrace();
		} 
		return bookMap;
	}



	public synchronized void insertMap(String name, List<Book> list) {
		bookMap.put(name, list);
		cdl.countDown();
	}
}
