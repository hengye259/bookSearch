<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
	String loadImgPath=request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/loadImg.do?url=";
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>柏恒书城</title>
<link rel="shortcut icon" href="favico.ico">
<!-- 最新版本的 Bootstrap 核心 CSS 文件 -->
<link rel="stylesheet"
	href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css"
	integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
	crossorigin="anonymous">
<!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
<script
	src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"
	integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
	crossorigin="anonymous"></script>
<script src="js/jquery.1.9.1.js"></script>


<style>
* {
	margin: 0;
	padding: 0;
}

.section-box {
	position: absolute;
	top: 50px;
	bottom: 0;
	left: 0;
	right: 0;
	overflow-y: scroll;
}

.topic {
	display: flex;
	justify-content: center;
	width: 1000px;
	margin: 0 auto;
	margin-top: 40px;
	/* 透明度 值越小，越透明 */
	opacity: 0.8;
}

.panel {
	flex: 1;
	box-shadow: 2px 3px 3px rgba(0, 0, 0, 0.3);
}

.left {
	margin-left: 10px;
}

.panel-white>.panel-heading {
	color: #aaa;
	background-color: #fff;
	border-color: #aaa;
}

.panel-white {
	border-color: #aaa;
}

.topic-box {
	display: flex;
	margin: 12px;
	box-shadow: 2px 3px 3px rgba(0, 0, 0, 0.1);
	border: 1px solid #dddddd;
	border-radius: 5%;
}

.img {
	flex: 1.5;
	width: 130px;
	height: 160px;
	overflow: hidden;
}

img {
	max-width: 100%;
	display: block;
	margin: 0 auto;
}

.word {
	flex: 2;
	margin: 10px 0 0 10px;
	font-size: 14px;
}

.load {
	background: rgba(107, 207, 253, 1);
	text-align: center;
}

.price {
	font-size: 18px;
	color: red;
	font-weight: bold;
}
</style>


</head>
<body>



	<!-- 搜索 -->
	<nav class="navbar navbar-default navbar-fixed-top">
		<div class="container-fluid">
			<!-- navbar-header -->
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed"
					data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
					aria-expanded="false">
					<span class="sr-only">Toggle navigation</span> <span
						class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="#">柏恒查书</a>
			</div>
			<!-- /navbar-header -->
			<div class="collapse navbar-collapse"
				id="bs-example-navbar-collapse-1">
				<form class="navbar-form navbar-left">
					<div class="form-group">
						<input type="text" name="bookName" class="form-control"
							placeholder="请输入你想要找的书名或者类型。。" style="width: 400px;">
					</div>
					<input type="button" value="查找" class="btn btn-default">
				</form>

			</div>
		</div>
	</nav>
	<!-- /搜索 -->

	<!--这是整个内容的大框-->
	<div class="section-box">
		<section class="topic">
			<!--这是当当网内容=====开始-->
			<div id="dd" class="panel panel-white left">
				<div class="panel-heading">
					<h3 class="panel-title">当当图书</h3>
				</div>
				<!-- jstl -->
				<c:forEach items="${bookMap.dd}" var="book">
					<div class="panel-body topic-box">
						<div class="img">
							<img src="<%=loadImgPath %>${book.imgSrc}" alt="" onerror="this.src='error.jpg'">
						</div>
						<div class="word">
							<p>${book.bookName}</p>
							<p>${book.author}</p>
							<p class="price">${book.price }</p>
							<p>${book.seller }</p>
							<p>
								<a href="${book.inner }" target="_blank" class="btn btn-primary"
									role="button">进入购买</a>
							</p>
						</div>
					</div>

				</c:forEach>
			</div>
			<!--这是当当网内容=====结束-->

			<!--这是京东网内容=====开始-->
			<div id="jd" class="panel panel-white left">
				<div class="panel-heading">
					<h3 class="panel-title">京东图书</h3>
				</div>
				<!-- jstl -->
				<c:forEach items="${bookMap.jd}" var="book">
					<div class="panel-body topic-box">
						<div class="img">
							<img src="<%=loadImgPath %>${book.imgSrc}" alt="" onerror="this.src='error.jpg'">
						</div>
						<div class="word">
							<p>${book.bookName}</p>
							<p>${book.author}</p>
							<p class="price">${book.price }</p>
							<p>${book.seller }</p>
							<p>
								<a href="${book.inner }" target="_blank" class="btn btn-primary"
									role="button">进入购买</a>
							</p>
						</div>
					</div>

				</c:forEach>
			</div>
			<!--这是京东网内容=====结束-->

			<!--这是孔夫子网内容=====开始-->
			<div id="kfz" class="panel panel-white left">
				<div class="panel-heading">
					<h3 class="panel-title">孔夫子图书</h3>
				</div>
				<!-- jstl -->
				<c:forEach items="${bookMap.kfz}" var="book">
					<div class="panel-body topic-box">
						<div class="img">
							<img src="<%=loadImgPath %>${book.imgSrc}" alt="" onerror="this.src='error.jpg'">
						</div>
						<div class="word">
							<p>${book.bookName}</p>
							<p>${book.author}</p>
							<p class="price">${book.price }</p>
							<p>
								<a href="${book.inner }" target="_blank" class="btn btn-primary"
									role="button">进入购买</a>
							</p>
						</div>
					</div>

				</c:forEach>
			</div>
			<!--这是孔夫子网内容=====结束-->

		</section>
	</div>
	<!--/这是整个内容的大框-->

	<script>

        $("input.btn-default").click(function () {
            var data = $("input[ name='bookName']").val();
            if(data == ""){
                alert("请输入关键字");
            }else{
                $("section").empty();
                $("section").append('<img src="wait.gif">');
                ajaxSearch(data);
            }
        });
		
        
        
        function ajaxSearch(data) {
        		var curWwwPath = window.document.location.href;
			//获取主机地址之后的目录，如： proj/meun.jsp  
		    var pathName = window.document.location.pathname;  
		    var pos = curWwwPath.indexOf(pathName);  
			//获取主机地址，如： http://localhost:8083  
		    var localhostPath = curWwwPath.substring(0, pos);  
		    //获取带"/"的项目名，如：/proj  
		    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/')+1); 
	        	$.ajax({
	        		url:'searchAjax.do',
	        		type:'post',
				data:{
					bookName:data
				},
				dataType:'json',
				success:function(result){
					$("section").empty();
					$("section").append('<div id="dd" class="panel panel-white left">'+
			        						'<div class="panel-heading">'+
			          					'<h3 class="panel-title">当当图书</h3>'+
			        						'</div></div>'
			        						);
					$("section").append('<div id="jd" class="panel panel-white left">'+
			        						'<div class="panel-heading">'+
			          					'<h3 class="panel-title">京东图书</h3>'+
			        						'</div></div>'
			        						);
			        	$("section").append('<div id="kfz" class="panel panel-white left">'+
			        						'<div class="panel-heading">'+
			          					'<h3 class="panel-title">孔夫子图书</h3>'+
			        						'</div></div>'
			        						)	;				
					$.each(result,function(key,values){
						
						if(key == "dd"){
							console.log(localhostPath+projectName+"/loadImg.do?url=");
							$.each(values,function(index,val){
								$("#dd").append(
										'<div class="panel-body topic-box">'+
						          		'<div class="img">'+
						          		'<img src="'+localhostPath+projectName+"/loadImg.do?url="+val.imgSrc+'" alt="">'+
								        '</div>'+
								        '<div class="word">'+
								        '<p>'+val.bookName+'</p>'+
								        '<p>'+val.author+'</p>'+
								        '<p class="price">'+val.price+'</p>'+
								        '<p>'+val.seller+'</p>'+
								        '<p>'+
								              '<a href="'+val.inner+'" target="_blank" class="btn btn-primary" role="button">进入购买</a>'+
								            '</p>'+
								          '</div>'+
						        '</div>'
						        );
								$("img").attr("onerror","this.src='error.jpg'");
							});
						} 
						if(key == "jd"){
							$.each(values,function(index,val){
								$("#jd").append(
										'<div class="panel-body topic-box">'+
						          		'<div class="img">'+
						          		'<img src="'+localhostPath+projectName+"/loadImg.do?url="+val.imgSrc+'" alt="">'+
								        '</div>'+
								        '<div class="word">'+
								        '<p>'+val.bookName+'</p>'+
								        '<p>'+val.author+'</p>'+
								        '<p class="price">'+val.price+'</p>'+
								        '<p>'+val.seller+'</p>'+
								        '<p>'+
								              '<a href="'+val.inner+'" target="_blank" class="btn btn-primary" role="button">进入购买</a>'+
								            '</p>'+
								          '</div>'+
						        '</div>'
						        );
								$("img").attr("onerror","this.src='error.jpg'");
							});
						}
						if(key == "kfz"){
							$.each(values,function(index,val){
								$("#kfz").append(
										'<div class="panel-body topic-box">'+
						          		'<div class="img">'+
						          		'<img src="'+localhostPath+projectName+"/loadImg.do?url="+val.imgSrc+'" alt="">'+
								        '</div>'+
								        '<div class="word">'+
								        '<p>'+val.bookName+'</p>'+
								        '<p>'+val.author+'</p>'+
								        '<p class="price">'+val.price+'</p>'+
								        '<p>'+val.seller+'</p>'+
								        '<p>'+
								              '<a href="'+val.inner+'" target="_blank" class="btn btn-primary" role="button">进入购买</a>'+
								            '</p>'+
								          '</div>'+
						        '</div>'
						        );
								$("img").attr("onerror","this.src='error.jpg'");
							});
						}
						
					});
				}
	        });
        }
        	

    </script>



</body>


</html>