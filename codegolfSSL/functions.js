function isEmailAddress(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function Login(){
	$("#emailConfirmScreen").hide();
	$("#registerScreen").hide();
	$("#emailVerificationScreen").hide();
	$("#loginScreen").show();
	$("#loginusername").focus();
}

function LogOut(){

	$.post( "/logout.php", function( data ) {
		location.reload();
	});
}

function Register(){
	$("#loginScreen").hide();
	$("#emailVerificationScreen").hide();
	$("#registerScreen").show();
	$("#username").focus();
}

function Preferences(){
	$("#changePasswordScreen").hide();
	$("#preferencesScreen").show();
}

function ChangePassword(){
	
	$("#preferencesScreen").hide();
	$("#changePasswordScreen").show();
	pass=$("#password").focus();
}

function SubmitRegistration(){

	var user=$("#username").val();
	if(!userTest){
		alert("User name is blank or unavailable!\nTry again.");
		return;
	}
	var email=$("#email").val();
	if(!emailTest){
		alert("Email is blank or unavailable!\nTry again.");
		return;
	}
	if(!passwordTest){
		alert("Passwords are blank or do not match.\nTry again.");
		return;
	}
	pass=$("#password").val();
	var isEmail=isEmailAddress(user);
	$.post( "/register.php", { user: user, email: email, pass: pass}, function( data ) {
		if(data){
			location.reload();
		}else{
			alert("Registration failed.");
		}
	});
}

function SubmitNewPassword(){

	if($("#passwordConsistency").html()!="✔" && $("#passwordConsistency").html()!="&#10004;"){
		alert("Passwords are blank or do not match.\nTry again.");
		return;
	}
	var pass=$("#password").val();
	$.post( "/changePassword.php", { pass: pass}, function( data ) {
		if(data){
			alert("Password change was successful!");
			$("#password").val("");
			$("#confirmpassword").val("");
			$("#changePasswordScreen").hide();
		}else{
			alert("Password change failed.");
		}
	});
}

function SubmitLogin(){

	var user=$("#loginusername").val();
	var pass=$("#loginpassword").val();
	var isEmail=isEmailAddress(user);
	$.post( "/login.php", { user: user, pass: pass, isEmail: isEmail }, function( data ) {
		if(data){
			location.href="/";
		}else{
			$("#loginResult").show();
		}
	});
}

function CancelRegistration(){
	$("#registerScreen").hide();
}

function CancelLogin(){
	$("#loginScreen").hide();
}

function CancelPreferences(){
	$("#preferencesScreen").hide();
}

function CancelNewPassword(){
	$("#password").val("");
	$("#confirmpassword").val("");
	$("#changePasswordScreen").hide();
}

function SavePreferences(){
	
	var img = $('#image-cropper').cropit('export', {type: 'image/jpeg', quality: .9, originalSize: false});
	var email=$("#email").val();
	$.post( "/savePrefs.php", { avatar: img, email: email}, function( data ) {
		if(data){
			location.reload();
		}
	});
}

function bindEnterKey(){
	document.getElementById('loginusername').onkeypress = function(e){
		if (!e) e = window.event;
		var keyCode = e.keyCode || e.which;
		if (keyCode == '13'){
			SubmitLogin();
		}
	}
	document.getElementById('loginpassword').onkeypress = function(e){
		if (!e) e = window.event;
		var keyCode = e.keyCode || e.which;
		if (keyCode == '13'){
			SubmitLogin();
		}
	}
	document.getElementById('username').onkeypress = function(e){
		if (!e) e = window.event;
		var keyCode = e.keyCode || e.which;
		if (keyCode == '13'){
			SubmitRegistration();
		}
	}
	document.getElementById('email').onkeypress = function(e){
		if (!e) e = window.event;
		var keyCode = e.keyCode || e.which;
		if (keyCode == '13'){
			SubmitRegistration();
		}
	}
	document.getElementById('password').onkeypress = function(e){
		if (!e) e = window.event;
		var keyCode = e.keyCode || e.which;
		if (keyCode == '13'){
			SubmitRegistration();
		}
	}
	document.getElementById('confirmpassword').onkeypress = function(e){
		if (!e) e = window.event;
		var keyCode = e.keyCode || e.which;
		if (keyCode == '13'){
			SubmitRegistration();
		}
	}
}

function bindLoggedInEnterKey(){
	document.getElementById('email').onkeypress = function(e){
		if (!e) e = window.event;
		var keyCode = e.keyCode || e.which;
		if (keyCode == '13'){
			SavePreferences();
		}
	}
	document.getElementById('password').onkeypress = function(e){
		if (!e) e = window.event;
		var keyCode = e.keyCode || e.which;
		if (keyCode == '13'){
			SubmitNewPassword();
		}
	}
	document.getElementById('confirmpassword').onkeypress = function(e){
		if (!e) e = window.event;
		var keyCode = e.keyCode || e.which;
		if (keyCode == '13'){
			SubmitNewPassword();
		}
	}
}


function validateUsername(){
	
	var name=$("#username").val();
	if(name){
		$.post( "/userNameAvailable.php", { name: name }, function( data ) {
			if(data){
				$("#usernameAvailability").show();
				$("#usernameAvailability").css("color","#0f0");
				$("#usernameAvailability").html("&#10004;");
				userTest=1;
			}else{
				$("#usernameAvailability").show();
				$("#usernameAvailability").css("color","#f00");
				$("#usernameAvailability").html("Name is taken!");
				userTest=0;
			}
		});
	}else{
		$("#usernameAvailability").hide();
	}
}

function validateEmail(){
	
	var email=$("#email").val();
	if(email){
		$.post( "/emailAvailable.php", { email: email }, function( data ) {
			if(data && isEmailAddress(email)){
				$("#emailAvailability").show();
				$("#emailAvailability").css("color","#0f0");
				$("#emailAvailability").html("&#10004;");
				emailTest=1;
			}else{
				$("#emailAvailability").show();
				$("#emailAvailability").css("color","#f00");
				$("#emailAvailability").html("Invalid or Unavailable...");
				emailTest=0;
			}
		});
	}else{
		$("#emailAvailability").hide();
	}
}

function validatePrefEmail(current){
	
	var email=$("#email").val();
	if(email){
		if(email.toUpperCase()==current.toUpperCase()){
			$("#emailAvailability").show();
			$("#emailAvailability").css("color","#0f0");
			$("#emailAvailability").html("Available!");
		}else{
			$.post( "/emailAvailable.php", { email: email }, function( data ) {
				if(data && isEmailAddress(email)){
					$("#emailAvailability").show();
					$("#emailAvailability").css("color","#0f0");
					$("#emailAvailability").html("Available!");
					emailTest=1;
				}else{
					$("#emailAvailability").show();
					$("#emailAvailability").css("color","#f00");
					$("#emailAvailability").html("Unavailable!");
					emailTest=0;
				}
			});
		}
	}else{
		$("#emailAvailability").hide();
	}
}

function validatePasswords(){
	
	var pass1=$("#password").val();
	var pass2=$("#confirmpassword").val();
	if(pass1 && pass2){
		if(pass1==pass2){
			$("#passwordConsistency").show();
			$("#passwordConsistency").css("color","#0f0");
			$("#passwordConsistency").html("&#10004;");
			passwordTest=1;
		}else{
			$("#passwordConsistency").show();
			$("#passwordConsistency").css("color","#f00");
			$("#passwordConsistency").html("Passwords don't match!");
			passwordTest=0;
		}
	}else{
		$("#passwordConsistency").hide();
	}
}

function resendVerificationEmail(){
	
	$.post( "/resendVerificationEmail.php", function( data ) {
		if(data){
			$("#emailVerificationSendStatus").css("color","#0f0");
			$("#emailVerificationSendStatus").html("Email sent!");
		}else{
			$("#emailVerificationSendStatus").css("color","#f00");
			$("#emailVerificationSendStatus").html("There was a problem... Try re-registering.");
		}
	});
}

function confirmEmail(k,email){
	
	$.post( "/confirm.php", {k:k, email:email}, function( data ) {
		if(data){
			$("#confirmResult").css("color","#0f0");
			$("#confirmResult").html("Email confirmed!<br><br><button onclick='Login()'>Log In</button>");
		}else{
			$("#confirmResult").css("color","#f44");
			$("#confirmResult").html("This email has already been confirmed!<br><br><button onclick='Login()'>Log In</button>");
		}
	});
}


function isScrolledIntoView(elem){
	
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    return ((docViewTop-100 < elemTop) && (docViewBottom+100 > elemBottom));
}


function startStopApplets(){
	
	$('.appletIframe').each(function(i, obj) {
		if(isScrolledIntoView(obj)){
			obj.contentWindow.postMessage("start:", "http://codegolf.test");
		}else{
			obj.contentWindow.postMessage("stop:", "http://codegolf.test");
		}
	});
}


function fetchMore(){
	
	startStopApplets();
	if($(window).scrollTop()+$(window).height() > $(document).height()-900){
		$(window).unbind('scroll',fetchMore);
		$(window).bind('scroll',startStopApplets);
		fetchComplete=false;
		var IDs = [];
		$("#main").find("iframe").each(function(){ IDs.push(this.id.substring(6)); });
		console.log(IDs);
		$.post('/fetch.php',{scroll: scroll, u:window.location.pathname.split('/')[1], JSON.stringify(IDs) }, function(data) {
			if(data.length>10){
				scroll++;
				if(data=="<br><br><br>User not found... :("){
					$("#main").html(data);
				}else{
					$("#main").append(data);
					if($(window).scrollTop()+$(window).height() > $(document).height()-900){
						fetchMore();
					}else{
						$(window).bind('scroll',fetchMore);
					}
				}
			}
			fetchComplete=true;
		},'json');
	}
}

function hookNewAppletButton(){
	$("#landingDiv").click(function () {
		$.post('/fetchnew.php',{ id:1 },
		function(data) {
			if(data.length>1){
				$("#landingDiv").html("");
				$("#main").prepend(data);
				$("#main").css("margin-top","85px");
			}
		});
	});
	$("#landingDiv").show();
	$("#main").css("margin-top","180px");
}

$(document).ready(function(){
	
	if(window.location.pathname.split('/')[1]=='a'){
		$.post('/fetchSingle.php',{ id:window.location.pathname.split('/')[2] },
		function(data) {
			if(data.length>10){
				$("#main").append(data);
			}
		});
	}else{
		scroll=0;
		$(window).bind('scroll',fetchMore);
		fetchMore();
		hookNewAppletButton();
	}
});

$(window).resize(function(){
	var h=$(".appletIframe").width()/1.777777777777777777777777777778;
	$(".appletIframe").css("height",h+"px");
	var h=$(".appletDiv").width()/38;
	$(".appletName").css("font-size",h+"px");
	var h=$(".appletDiv").width()/10.5;
	$(".appletAvatar").css("width",h+"px");
	var h=$(".appletDiv").width()/45;
	$(".userInfoTable").css("font-size",h+"px");
});

function toggleShareBox(id){
	if($("#shareBox"+id).is(":visible")){
		$("#shareBox"+id).hide();
	}else{
		$("#shareBox"+id).show();
		$("#shareBox"+id)[0].select();
	}
}

function deleteApplet(id){
	if(confirm("Are you sure?!\n\nThis action cannot be undone")){
		$.post('/deleteApplet.php',{ id:id }, function(data) {
			if(data){
				alert("Oops. Applet could not be deleted.");
			}else{
				location.reload();
			}
		});
	}
}

function saveApplet(id,formerUserID,formerAppletID){
	$.post('/saveApplet.php',{ code:$("#textArea"+id).val(), formerUserID: formerUserID, formerAppletID:formerAppletID },
	function(data) {
		if(data=="fail"){
			alert("Applet could not be saved!\n\nEither it is too long, or you are not logged in...")
		}else{
			window.location="/";
		}
	});
	
}
