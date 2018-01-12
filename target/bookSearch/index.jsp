<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>周柏恒帮你稳书</title>
<link rel="shortcut icon" href="favico.ico">

    <!-- 最新版本的 Bootstrap 核心 CSS 文件 -->
    <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
    <script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
    <script src="js/jquery.1.9.1.js"></script>
    <style>

        *{
            margin: 0px;
            padding: 0px;
        }

        body{
            text-align: center;
        }

        .box{
            margin: 200px 25%;
        }

        span{
            font-size: 33px;
            color: #2b669a;
        }

        .load{
            background:rgba(107,207,253,1);
        }
        

    </style>
    
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
    
</head>
<body>

<!--<nav class="navbar navbar-default navbar-fixed-top" style="background: darkred">-->
    <!--<div class="container">-->
        <!--<span>请输入关键词后点击</span>-->
    <!--</div>-->
<!--</nav>-->

<div id="loading"><!--加载图片开始-->

    <div class="col-lg-6 box">
        <div class="input-group ">
            <input type="text" class="form-control" name="bookName" placeholder="输入你想要找的图书...">
            <span class="input-group-btn">
            <button class="btn btn-default" type="button">Go!</button>
          </span>
        </div><!-- /input-group -->
    </div><!-- /.col-lg-6 -->

</div><!--加载图片结束-->


<script>
    $("button").click(function(){
        var data = $("input[ name='bookName']").val();
        console.log(data);
        if(data == ""){
            search_null();
        }else{
            search(data);
        }
    });

    function search_null() {
        $("body").append('<nav class="navbar navbar-default navbar-fixed-top" style="background: darkred">'+
                '<div class="container">'+
                '<span>请输入关键词后点击</span>'+
                '</div>'+
                '</nav>');

        setTimeout(function(){
            $("nav").hide();//找到对应的标签隐藏
        },3000)
    }

    function search(data) {
        $("#loading").empty();
        $("#loading").append('<img src="wait.gif">');
        $("body").addClass("load");
        ajax_result(data);
    }
	
    $("input[ name='bookName']").keydown(function(event){ 
	    	if(event.keyCode=="13"){
	    		var data = $("input[ name='bookName']").val();
	            if(data == ""){
	                search_null();
	            }else{
	                search(data);
	            }
	    	}
	});
    
    function ajax_result(data) {
    		var curWwwPath = window.document.location.href;
		//获取主机地址之后的目录，如： proj/meun.jsp  
	    var pathName = window.document.location.pathname;  
	    var pos = curWwwPath.indexOf(pathName);  
		//获取主机地址，如： http://localhost:8083  
	    var localhostPath = curWwwPath.substring(0, pos);  
	    //获取带"/"的项目名，如：/proj  
	    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/')+1); 
        $.ajax({
        		url:'indexSearch.do',
        		type:'post',
			data:{
				bookName:data
			},
			success:function(result){
				$(window).attr('location',localhostPath+projectName+result); 
			}
        });
    }
</script>

</body>
</html>