package org.hengsir.comparator;

import java.util.Comparator;

import org.hengsir.entity.Book;

/**
* @author 周宇恒 
* @version v1.0
* 创建时间：2017年11月3日 下午3:45:48
* 类说明:
*/
public class MyComparator implements Comparator<Book>{

	public int compare(Book o1, Book o2) {
		Integer i1 = Integer.valueOf("".equals(o1.getCompare())?"0":o1.getCompare());
		System.out.println(i1);
		Integer i2 = Integer.valueOf("".equals(o2.getCompare())?"0":o2.getCompare());
		int i = i1.compareTo(i2);
		System.out.println(i2);
		
		return i;
	}

}
