var jurl="https://shahid-moqavemat.ir/modules.php?name=Icms&file=json&";
var hstr=[];
function setCookie(cname, cvalue, exdays) {
	if (typeof(Storage) !== "undefined") {
		if (cvalue=="") window.localStorage.removeItem(cname);
		else window.localStorage.setItem(cname,cvalue);
		return true;
	}
	if (exdays==undefined) exdays=100;
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60));
	var expires = "expires="+ d.toUTCString();
	var cval = cvalue.split(';').join('~');
	var cval = encodeURIComponent(cval);
	document.cookie = cname + "=" + cval + ";" + expires + ";path=/";	
	return false;
}
function getCookie(cname) {
	if (typeof(Storage) !== "undefined") {
		val=window.localStorage.getItem(cname);
		if (val==undefined) return "";
		return val;
	}
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') 
			c = c.substring(1);
		if (c.indexOf(name) == 0)
			return c.substring(name.length,c.length).split('~').join(';');
	}
	return "";
}
function delCookie(){
	if (typeof(Storage) !== "undefined")
		window.localStorage.clear();
	else
		document.cookie.split(";").forEach(function(c){document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");});
			
}
function IntiateF(op){
	$('.menu .item').tab();
	$('.ui.accordion').accordion();
	$('a.item').click(function(e){ClickR(e,this);});
	$('li.psearch').click(function(e){SearchQ($(this).text());});
	if ($('#page').val()=="list") SearchQ("|");
	AddF();
	if (getCookie(op+"_j")!='')
		eval.call(null,getCookie(op+"_j"));
}
function RunU(op,l){
	$('#content-page').html(getCookie(op));	
	$('.sidebar').sidebar('hide');
	$("#list").NanoTE(jurl+l,"","get","IntiateF",op);		
}
function LoadU(url){
	var url,au,ac,op,q,l;
	if (hstr[hstr.length-1]==url) return 0;
	if (url!='list') hstr.push(url);
	
	au=url.split("?");
	op=au[0];
	q=au[1];
	l="op=m_"+op+"&"+q;
	if (op=="search"){
		SearchQ(q,true)
	}else if (op!=""){		
		$('#back_p').parent().show();
		$('#page').val(op);
		if (getCookie(op)==""){
			$.getJSON(jurl+"op=m_get&pg="+op,function(data){
				setCookie(op,data.html);
				setCookie(op+"_j",data.js);
				RunU(op,l);
			});
		}else RunU(op,l);
	}	
}
function ClickR(e,obj){
	e.preventDefault();
	url=$(obj).attr("href");
	if (url.match(/http/gi))
		window.open(url,'_blank');
	else if (url=='signout'){
		delCookie();
		location.reload();
	}else if (url!='index.html' && url!='#')
		LoadU(url);
}
function Unitegallery(idb){
	if (idb=="undefined"){
		$("#gallery").unitegallery({
			tiles_type:"justified",
			tile_as_link: true,
			tile_link_newpage: false,
			tile_enable_icons: false,
			tile_enable_textpanel: true,
			tiles_space_between_cols: 0,
			tiles_include_padding: false,
			tiles_justified_row_height:200,
			tiles_justified_space_between:0,
		});
	}else if ($("#"+idb).html()!=''){
		$("#"+idb).unitegallery({
			tiles_type: "columns",
			tiles_col_width: 100,
			tile_as_link: true,
			tile_link_newpage: false,
			tile_enable_icons: false,
			tile_enable_textpanel: true,
			tiles_space_between_cols:10,
			tile_enable_border:true,
			tile_border_color: "#000",
			tile_border_width:1,
			tile_textpanel_always_on:true,
			tile_textpanel_title_text_align: "center",
			tile_textpanel_offset:-10,			
		});
		flagl=true;					
	}else{
		$("#"+idb).remove();
		p=Number($('#pageq').val());
		if (p>0) p--;
		$('#pageq').val(p);
	}
	$("#morel").hide();
	$("#moreb").show();
	AddF();
}
function LoadB(idp){
	hstr.push("B_"+idp);
	$('#page').val("home");
	if (idp>0)
		$('#back_p').parent().show();		
	else
		$('#back_p').parent().hide();	
	$('#content-page').html('<div id="gallery">{link}<img alt="{tit}" src="{img}"></a></div>');
	$("#gallery").NanoTE(jurl+"op=m_banner&idp="+idp,"","get","Unitegallery");	
}
function BackP(){
	hstr.pop();
	url=hstr.pop();
	if (url==undefined) LoadB(0);
	else{
		idba=url.split("B_");
		idb=idba[1];
		if (idb==undefined) LoadU(url)
		else LoadB(idb);
	}
	window.history.pushState({}, '');
}
function NewP(){
	$('#pageq').val(Number($('#pageq').val())+1);
	SearchQ("|");	
}
var percent = 90;
flagl = true;
$(window).scroll(function() {
	window_scrolled = ($(document).height()/100)*percent;
	if($(window).scrollTop()+$(window).height()>=window_scrolled && window.flagl){
		if ($('#page').val()=="list") NewP();
	}
});
function SearchQ(q,op){
	if (q=="|"){
		flagl=false;
		$("#moreb").hide();
		$("#morel").show();
	}else{
		$("#list").html("");
		$('#pageq').val(0);		
		if (op==undefined && q!=undefined){
			$('#searchq').val(q);
			$('#search_q').val("q="+q);
			$('#page').val("");
		}else if (op!=undefined){
			$('#search_q').val(q);
			$('#page').val("");
		}
	}
	if ($('#page').val()!="list"){
		LoadU('list');
	}else{
		sty=String($('#search_q').val()).split("type=");
		if (sty[1]!=undefined){
			ty=sty[1].split("&");
			$('#typeq').val(ty[0]);
		}
		page=$('#pageq').val();
		type=$('#typeq').val();		
		qr="op=m_search&"+$('#search_q').val()+"&sort="+$('#sortq').val()+"&type="+type+"&page="+page;
		$("#list").append("<div id='l_"+page+"' style='display:none'><a href='javascript:LoadU(\"{link}\");' class='item'><img alt='{st}' src='{img}'></a></div>").ready(function(){
			$("#l_"+page).NanoTE(jurl+qr,"","get","Unitegallery","l_"+page);			
		});
	}
	
}
var PlayB=["",""];
var flagA=true;
var fA=false;
function Reloadplay(op){
	av=["audio","video"];
	if (PlayB[op]=="") PlayB[op]=$("#r"+av[op]).html();
	$("#r"+av[op]).html(PlayB[op]);
	$("#r"+av[op]).NanoTE(jurl+"op=m_r"+av[op]+"&f="+flagA,"","get","AutoP",av[op]);
	if (op==0) flagA=!(flagA);
}
function AutoP(id){
	if (fA){
		$("#"+id+"p")[0].play();
	}
}
function StopP(op){
	if (op==0 || op==1) $("#audiop")[0].pause();
	if (op==0 || op==2) $("#videop")[0].pause();
	if (op>0 && $("#player").length) $("#player")[0].pause();
	if (op>0) fA=true;
}
function AddF(s){
	if (s!=undefined){
		name=$("#font_name").val();
		setCookie("font_name",name);
	}else s=0;
	if (s=='thm'){
		thm=getCookie("thm");
		if (thm=="") thm=0;
		thm=(Number(thm)+1)%2;
		setCookie("thm",thm);
		s=0;
	}
	size=Number(getCookie("font_size"));
	if (size>0)
		size+=s;
	else
		size=14;
	name=getCookie("font_name");
	if (name=="") name="Byekan";
	$("#font_size").text(size);
	setCookie("font_name",name);
	setCookie("font_size",size);
	$("body").css({"font-family": "'"+name+"'", "font-size": size+"px"});
	thm=getCookie("thm");
	$("#thm_b").text("🌙");
	$("#body").css("color","#000");
	$("#body").css("background","#FFF");
	$("#menu").css("background","#FFF");
	if (thm==1){
		$("#thm_b").text("🔅");
		$("#body").css("color","#FFF");
		$("#body").css("background","#000");
		$("#menu").css("background","#000");		
	}	
}
function Upload(){
	ds=$("#uploadp").css('display');
	if (ds=='none'){
		$("#uploadp").slideDown("slow");
		$("#upload").animate({bottom: 150},"slow");
		$("#upload").css({transform: "rotate(45deg)"})
	}else{
		$("#uploadp").slideUp("slow");
		$("#upload").animate({bottom: 30},"slow");
		$("#upload").css({transform: "rotate(0deg)"})
	}
}
function UploadP(){
	if ($("#pic").val()=="" || $("#fname").val()=="") alert("Fill File & Title!");
	else{
		$("#sub_up").hide();
		$("#loadi").show();
		setTimeout(function(){SubmitF("#upload_f","SUp");},500);
	}	
}
function SUp(res){					
	$("#pic").val("");
	$("#fname").val("");
	$("#loadi").hide();
	$("#sub_up").show();
}
function SubmitF(id,func){
	var formData = new FormData($(id)[0]);
	$.post({
		url: jurl,
		data: formData,
		async: false,
		cache: false,
		contentType: false,
		enctype: 'multipart/form-data',
		processData: false,
		success: function (data) {
			var res = JSON.parse(data);
			alert(res.mes);
			eval(func+"();");
		}
	});
	return false;	
}
function handleBackButton(){
	BackP();
}
window.history.pushState({}, '');
window.addEventListener('popstate', handleBackButton);

var note='';
function Notify(str){
	note=str;
	if (!("Notification" in window)) 
		console.log("This browser does not support Notification!");
	else if (Notification.permission === "granted"){
		if (('serviceWorker' in navigator)){
			navigator.serviceWorker.register('sw.js');
			navigator.serviceWorker.ready.then(function(registration){
				registration.showNotification('شهید مقاومت - Martyr of Resistance - شهيد المقاومة',{
					body: note,
					icon: '/assets/images/logo.png',
					vibrate: [200, 100, 200],
				});
			});
		}else{
			console.log("This browser does not support serviceWorker!")
			Notification('شهید مقاومت - Martyr of Resistance - شهيد المقاومة',{
					body: note,
					icon: '/assets/images/logo.png',
					vibrate: [200, 100, 200],
			});
		}
	}else{
		alert("Please allow notification!");
		Notification.requestPermission();
	}
}

var push;
if(typeof(Worker) !== "undefined") {
	if(typeof(push) == "undefined")
		push = new Worker("assets/js/push.js");
	push.onmessage = function(event){
		Notify(event.data);
	};
}else console.log("This browser does not support Worker!");

var ib=0;
function TimeBC(){
	$(".backp").css({'background-image': 'url(./assets/images/'+ib+'.jpg)'});
	ib=(ib+1)%6;
	if (getCookie("UID")!="" && ib==0)
		push.postMessage([jurl+"op=m_notify"]);
}

$(function(){
	$.getJSON(jurl+"op=m_version",function(data){
		version=getCookie("version");
		Notify("Version: "+version);
		if (version!=data.version){
			delCookie();
			f=setCookie("version",data.version);						
			alert("Update...");
			if (!f) alert('Use newer browsers to make better use of the app!');
			location.reload();
		}
		$("#version").text(version);
	});	
	if (getCookie("UID")==""){
		LoadU("sign_up");
	}else{
		jurl=jurl+"UID="+getCookie("UID")+"&";
		$("#preloader").fadeOut();
		$('.ui.sidebar-left').sidebar('attach events', '.navbar-toggle-left').sidebar('setting','transition','scale down');
		$('.ui.search').sidebar('attach events', '.navbar-toggle-search').sidebar('setting','transition','scale down');
		$('.ui.setting').sidebar('attach events', '.navbar-toggle-setting').sidebar('setting','transition','scale down');
		$('.ui.radio').sidebar('attach events', '.navbar-toggle-radio').sidebar('setting','transition','scale down');
		$("#psearch_l").NanoTE(jurl+"op=m_psearch");
		Reloadplay(0)
		Reloadplay(1)
		$("#prof").NanoTE(jurl+"op=m_profile");		
		$("#menu_right").NanoTE(jurl+"op=m_menu","","get","IntiateF","home");	
		LoadB(0);
	}
	TimeBC();
	setInterval(TimeBC,5000);
});