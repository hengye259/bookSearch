if(typeof thunderHrefAttr == 'undefined') thunderHrefAttr = 'thunderHref';
if(typeof GetUserBrowser == 'undefined') {
    var thunderBroserName = navigator.userAgent.toLowerCase();
    var thunder_isIE = ((/msie/i.test(thunderBroserName) || /trident/i.test(thunderBroserName)) && !/opera/.test(thunderBroserName));
}
else{
    var thunder_isIE = (GetUserBrowser() == 'IE');
}
if(!thunder_isIE)
{
	if(window.Node){

		Node.prototype.replaceNode=function(Node){
			this.parentNode.replaceChild(Node,this);
			}
		Node.prototype.removeNode=function(removeChildren){
			if(removeChildren)
				return this.parentNode.removeChild(this);
			else{
				var range=document.createRange();
				range.selectNodeContents(this);
				return this.parentNode.replaceChild(range.extractContents(),this);
				}
			}
		Node.prototype.swapNode=function(Node){
			var nextSibling=this.nextSibling;
			var parentNode=this.parentNode;
			node.parentNode.replaceChild(this,Node);
			parentNode.insertBefore(node,nextSibling);
			}
	 } 	
	if(window.HTMLElement){
		HTMLElement.prototype.__defineGetter__("all",function(){
			var a=this.getElementsByTagName("*");
			var node=this;
			a.tags=function(sTagName){
				return node.getElementsByTagName(sTagName);
				}
			return a;
			});
		HTMLElement.prototype.__defineGetter__("parentElement",function(){
			if(this.parentNode==this.ownerDocument)return null;
			return this.parentNode;
			});
		HTMLElement.prototype.__defineGetter__("children",function(){
			var tmp=[];
			var j=0;
			var n;
			for(var i=0;i<this.childNodes.length;i++){
				n=this.childNodes[i];
				if(n.nodeType==1){
					tmp[j++]=n;
					if(n.name){
						if(!tmp[n.name])
							tmp[n.name]=[];
						tmp[n.name][tmp[n.name].length]=n;
						}
					if(n.id)
						tmp[n.id]=n;
					}
				}
			return tmp;
			});
		HTMLElement.prototype.__defineGetter__("currentStyle", function(){
			return this.ownerDocument.defaultView.getComputedStyle(this,null);
			});
		HTMLElement.prototype.__defineSetter__("outerHTML",function(sHTML){
			var r=this.ownerDocument.createRange();
			r.setStartBefore(this);
			var df=r.createContextualFragment(sHTML);
			this.parentNode.replaceChild(df,this);
			return sHTML;
			});
		HTMLElement.prototype.__defineGetter__("outerHTML",function(){
			var attr;
			var attrs=this.attributes;
			var str="<"+this.tagName;
			for(var i=0;i<attrs.length;i++){
				attr=attrs[i];
				if(attr.specified)
						str+=" "+attr.name+'="'+attr.value+'"';
				}
			if(!this.canHaveChildren)
				return str+">";
			return str+">"+this.innerHTML+"</"+this.tagName+">";
			});
		HTMLElement.prototype.__defineGetter__("canHaveChildren",function(){
			switch(this.tagName.toLowerCase()){
				case "area":
				case "base":
				case "basefont":
				case "col":
				case "frame":
				case "hr":
				case "img":
				case "br":
				case "input":
				case "isindex":
				case "link":
				case "meta":
				case "param":
						return false;
				}
			return true;
			});
		HTMLElement.prototype.__defineSetter__("innerText",function(sText){
			var parsedText=document.createTextNode(sText);
			this.innerHTML=parsedText;
			return parsedText;
			});
		HTMLElement.prototype.__defineGetter__("innerText",function(){
			var r=this.ownerDocument.createRange();
			r.selectNodeContents(this);
			return r.toString();
			});
		HTMLElement.prototype.__defineSetter__("outerText",function(sText){
			var parsedText=document.createTextNode(sText);
			this.outerHTML=parsedText;
			return parsedText;
			});
		HTMLElement.prototype.__defineGetter__("outerText",function(){
			var r=this.ownerDocument.createRange();
			r.selectNodeContents(this);
			return r.toString();
			});
		HTMLElement.prototype.attachEvent=function(sType,fHandler){
			var shortTypeName=sType.replace(/on/,"");
			fHandler._ieEmuEventHandler=function(e){
				window.event=e;
				return fHandler();
				}
			this.addEventListener(shortTypeName,fHandler._ieEmuEventHandler,false);
			}
		HTMLElement.prototype.detachEvent=function(sType,fHandler){
			var shortTypeName=sType.replace(/on/,"");
			if(typeof(fHandler._ieEmuEventHandler)=="function")
				this.removeEventListener(shortTypeName,fHandler._ieEmuEventHandler,false);
			else
				this.removeEventListener(shortTypeName,fHandler,true);
			}
		HTMLElement.prototype.contains=function(Node){
			do if(Node==this)return true;
			while(Node=Node.parentNode);
			return false;
			}
		HTMLElement.prototype.insertAdjacentElement=function(where,parsedNode){
			switch(where){
				case "beforeBegin":
						this.parentNode.insertBefore(parsedNode,this);
						break;
				case "afterBegin":
						this.insertBefore(parsedNode,this.firstChild);
						break;
				case "beforeEnd":
						this.appendChild(parsedNode);
						break;
				case "afterEnd":
						if(this.nextSibling)
								this.parentNode.insertBefore(parsedNode,this.nextSibling);
						else
								this.parentNode.appendChild(parsedNode);
						break;
				}
			}
		HTMLElement.prototype.insertAdjacentHTML=function(where,htmlStr){
			var r=this.ownerDocument.createRange();
			r.setStartBefore(this);
			var parsedHTML=r.createContextualFragment(htmlStr);
			this.insertAdjacentElement(where,parsedHTML);
			}
		HTMLElement.prototype.insertAdjacentText=function(where,txtStr){
			var parsedText=document.createTextNode(txtStr);
			this.insertAdjacentElement(where,parsedText);
			}
		HTMLElement.prototype.attachEvent=function(sType,fHandler){
			var shortTypeName=sType.replace(/on/,"");
			fHandler._ieEmuEventHandler=function(e){
				window.event=e;
				return fHandler();
				}
			this.addEventListener(shortTypeName,fHandler._ieEmuEventHandler,false);
			}
		HTMLElement.prototype.detachEvent=function(sType,fHandler){
			var shortTypeName=sType.replace(/on/,"");
			if(typeof(fHandler._ieEmuEventHandler)=="function")
				this.removeEventListener(shortTypeName,fHandler._ieEmuEventHandler,false);
			else
				this.removeEventListener(shortTypeName,fHandler,true);
			}
	}
}

function isSB360(){
    var agentInfo = navigator.userAgent.toLowerCase();
    if(/chrome/i.test(agentInfo) && /webkit/i.test(agentInfo) && /360EE/i.test(agentInfo)){
      return true;
    }
    return false;
}



	thunderLinker.TITLE="[$TITLE$]";											
	thunderLinker.LINK="[$LINK$]";
	thunderLinker.isDebug=(document.location.search.indexOf("thunderdbg=1")>0);
	thunderLinker.auto=true;



	function thunderLinker(arg1,arg2,arg3)
	{
		var pid=arguments[0];													
		var strPath=arguments[1];												
		var linkStyle=arguments[2]?arguments[2]:"";
		var append=typeof(arguments[3])!="undefined"?arguments[3]:null;		
		var convertSingle=false;
		var txtV=unescape("%u8FC5%u96F7%u4E13%u7528%u9AD8%u901F%u4E0B%u8F7D");
		var exceptPath="";
		var convertCount=0;
		var htmlB="";
		var htmlBf="";
		var linkModal=thunderLinker.LINK+"&nbsp;&nbsp;";
		var posStr=0;
		var thunderHref = thunderHrefAttr;
    		
		try{htmlB=thunderHTMLInsert;}catch (e){htmlB="&nbsp;";}
		

		try{if(thunderLinkPos!=0 && thunderLinkPos!=null){posStr='afterEnd';htmlBf=htmlB;htmlB="";}}catch(e){posStr='beforeBegin';}

		try{convertCount=thunderLinkCount;}catch(e){convertCount=0;}
		
		try{exceptPath=thunderExceptPath;}catch (e){exceptPath="";}

		try{linkModal=thunderLinkHTML}catch (e){}

		if(linkModal.indexOf(thunderLinker.LINK)<0) linkModal+=thunderLinker.LINK;


		//var objTag=typeof(arguments[4])!="undefined"?arguments[4]:null;
		/*
		if (!objTag)
		{
			try{objTag=thunderTagId;}catch(e){objTag=null;}			
		}

		if(objTag!=null)
		{
			objTag=document.getElementById(objTag);
		}
		*/

		if(append==null)
		{
			try{append=thunderAppend;}catch(e){append=false;}
		}

		if(thunderLinker.isDebug)	alert(append);
		
		if(linkStyle=="" || typeof(linkStyle)=="undefined")
		{
			try{ linkStyle=thunderLinkStyle; }catch(e){ linkStyle=""; }
		}

		if(linkStyle!=""){linkStyle=linkStyle.replace(/\\/g,"\\")}				
var thunderSufix=".srt|.mkv|.jad|.bis|.bin|.sw|.reg|.sisx|.sis|.eet|.xls|.nh|.kdh|.ppt|.mdf|.wmp|.doc|.pdf|.chm|.asf|.avi|.iso|.mp3|.mpeg|.mpg|.mpga|.rmvb|.tar|.wma|.wmv|.swf|.mp4|.3gp|.torrent|.txt|.jar|.mov|.wav|.eip";

		if(typeof(pid)=="undefined" || pid==null)
		{
			try{
				pid=thunderPid;
			}catch(e){
				pid="";
			}

			if(pid=="" || typeof(pid)==null || isNaN(pid)) 
			{
				if(thunderLinker.isDebug)
					alert("Pid is not provided!");
				return false;
			}
		}

		if(strPath==null || typeof(strPath)=="undefined")
		{
			try{strPath=thunderPath;}catch(e){strPath="";}
		}
		
		var a=document.links;
		var thunderSufix=thunderSufix.replace(/\./g,"\\.");
		
		
		var reg=eval("/^(http:\\/\\/|ftp:\\/\\/|mms:\\/\\/){1}[\\s\\S]*?("+thunderSufix+"){1}$/i");
		
		var aLength=a.length;
		var addL=0;

		var converted=0;
		
		if (convertCount<=0)
		{
			convertCount=aLength;
		}

		for(var i=0;i<aLength;i++)
		{

			
			if(a[i+addL].href)
			{
				

				if(exceptPath!="")
				{
					if(typeof(exceptPath)=="string")
					{
						if(a[i+addL].href.indexOf(exceptPath)>=0)
						{
							continue;
						}
					}else if(exceptPath.test){
						if(a[i+addL].href.match(exceptPath)!=null)
						{
							continue;
						}
					}
				}
				
				var tmpThunderH=a[i+addL].getAttribute(thunderHref);

				if(a[i+addL].href.substr(a[i+addL].href.length-1,1)=="#" && tmpThunderH) 
				{
					
					if(thunderLinker.isDebug)
					{
						alert("ThunderHref:"+tmpThunderH);
						alert("href:"+a[i+addL].href);
					}
					continue;	
				}

				var lk=a[i+addL].href;
				var href="";
				var thP="";
				var thSufix="thunder://";
				 
				
				if(lk.indexOf(thSufix)==0)
				{
					thP=lk;
					if (thunderLinker.isDebug)
					{
						alert("thunderLinker!["+thP+"]");
					}
				}
				else if(reg.test(lk))
				{
					href=lk;					
				}else{					
					
										
					if(strPath!="" && strPath!=null)
					{
						if(typeof(strPath)=="string")
						{
							if(lk.toLowerCase().indexOf("/"+strPath)>-1)
							{
								href=lk;
								if (thunderLinker.isDebug)
								{
									alert("other://String Path Valid!");
								}
							}
						}else
						{
							if(strPath.test)
							{

								var dddd=strPath.test(lk)
								
								//For dz6 debug
								if(lk.indexOf("attachment")>0 && thunderLinker.isDebug)
								{
									alert(String(strPath)+".test('"+lk+"')="+String(dddd));
								}
								
								if(lk.match(strPath)!=null)
								{
									href=lk;
									if (thunderLinker.isDebug)
									{
										alert("**********************RegEx*********************");
									}
								}else{
									if (thunderLinker.isDebug)
									{
										alert("other://Reg Path Invalid!\n["+strPath+"]"+lk+"||||<"+String(dddd)+">||||");
									}
								}
							}
						}
					}
				}
				
				if(href!="")
				{
					thP=ThunderEncode(href);
				}

				if(thP!="")
				{
					
					var tmpLk=a[i+addL];					
					
					
					
					
					if(linkStyle!="")
					{	
						if(!append || href=="")
						{
                                                    try{
                                                        var s = document.createElement("anchor");								
                                                        s.innerHTML+=linkModal.replace(thunderLinker.LINK,"<a target='_self' href='#' title='"+txtV+"' "+thunderHref+"='"+thP+"' thunderPid='"+pid+"' thunderType='' thunderResTitle='' onClick='return OnDownloadClick_Simple(this,2)' oncontextmenu='ThunderNetwork_SetHref(this)'>"+linkStyle.replace(thunderLinker.TITLE,tmpLk.innerHTML)+"</a>");
                                                        tmpLk.replaceNode(s);
                                                    }
                                                    catch(e)
                                                    {
                                                        tmpLk.setAttribute('target', '_self');
                                                        tmpLk.setAttribute('href', '#');
                                                        tmpLk.setAttribute('thunderPid', pid);
                                                        tmpLk.setAttribute('thunderType', '');
                                                        tmpLk.setAttribute('thunderResTitle', tmpLk.innerHTML);
                                                        tmpLk.setAttribute('onclick', 'return OnDownloadClick_Simple(this,2);');
                                                        tmpLk.setAttribute('oncontextmenu', 'ThunderNetwork_SetHref(this)');
                                                        tmpLk.setAttribute(thunderHref, thP);
                                                    }
                                                    converted++;
							
						}else{
							if(href!="")	
							{
								a[i+addL].insertAdjacentHTML(posStr,linkModal.replace(thunderLinker.LINK,htmlBf+"<a target='_self' href='#' title='"+txtV+"' "+thunderHref+"='"+thP+"' thunderPid='"+pid+"' thunderType='' thunderResTitle='' onClick='return OnDownloadClick_Simple(this,2)' oncontextmenu='ThunderNetwork_SetHref(this)'>"+linkStyle.replace(thunderLinker.TITLE,tmpLk.innerHTML)+"</a>")+htmlB);
								if(thunderLinker.isDebug)  alert(s.innerHTML);
								addL++;

								converted++;
							}
						}
					}else
					{
						if(!append || href=="")
						{
                                                    try
                                                    {
                                                        var s = document.createElement("anchor");
                                                        s.innerHTML+=linkModal.replace(thunderLinker.LINK,"<a target='_self' href='#' title='"+txtV+"' "+thunderHref+"='"+thP+"' thunderPid='"+pid+"' thunderType='' thunderResTitle='' onClick='return OnDownloadClick_Simple(this,2)' oncontextmenu='ThunderNetwork_SetHref(this)'>"+tmpLk.innerHTML+"</a>");
                                                        tmpLk.replaceNode(s);
                                                    }
                                                    catch(e)
                                                    {
                                                        tmpLk.setAttribute('target', '_self');
                                                        tmpLk.setAttribute('href', '#');
                                                        tmpLk.setAttribute('thunderPid', pid);
                                                        tmpLk.setAttribute('thunderType', '');
                                                        tmpLk.setAttribute('thunderResTitle', tmpLk.innerHTML);
                                                        tmpLk.setAttribute('onclick', 'return OnDownloadClick_Simple(this,2);');
                                                        tmpLk.setAttribute('oncontextmenu', 'ThunderNetwork_SetHref(this)');
                                                        tmpLk.setAttribute(thunderHref, thP);
                                                    }
                                                    converted++;
						}else
						{
							if(href!="")	
							{								
								a[i+addL].insertAdjacentHTML(posStr,linkModal.replace(thunderLinker.LINK,htmlBf+"<a target='_self' href='#' title='"+txtV+"' "+thunderHref+"='"+thP+"' thunderPid='"+pid+"' thunderType='' thunderResTitle='' onClick='return OnDownloadClick_Simple(this,2)' oncontextmenu='ThunderNetwork_SetHref(this)'><font color='red'>"+txtV+"</font></a>")+htmlB);
								
								
								if(thunderLinker.isDebug) alert(s.innerHTML);
								addL++;

								converted++;
							}
						}
					}
					
					if(thunderLinker.isDebug)
					{
						alert(converted);
					}
					if(converted>=convertCount) break;
					
					
				}
			}
		}
	}

	
	
	if(thunder_isIE){

		document.onreadystatechange=function ()
		{
			//alert('here!');

			if(document.readyState=="complete")
			{
				try{
						thunderLinker.auto=thunderFuncType;
					}catch(e){
						thunderLinker.auto=true;
					}
				

				if(document.body && thunderLinker.auto)
				{
					var a=function(){};
					if(typeof(document.body.onload)=="function")
					{
						a=document.body.onload;
					}
					document.body.onload=function()
					{
						a();
						thunderLinker();
					}
				}else{

					if(thunderLinker.isDebug && !document.body)
					{
						for(a in document)
						{
							alert(a);
						}
					}
				}
			}
		}
	}

