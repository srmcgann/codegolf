<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" href="/cropit.css">
		<meta name="description" content="Social Codegolf Platform">
		<meta name="keywords" content="code,golf,codegolf,javascript,social">
		<script src="/jquery-2.0.0.min.js"></script>
		<script src="/codemirror/lib/codemirror.js"></script>
		<link rel="stylesheet" href="/codemirror/lib/codemirror.css">
		<link rel="stylesheet" href="/codemirror/theme/midnight.css">
		<script src="/codemirror/mode/javascript/javascript.js"></script>
		<script src="/js.php?2"></script>
		<link id="stylesheet" rel="stylesheet" href="/style.css">
		<script>
			mobile=$(window).width()<$(window).height();
			if (mobile) {
				$('head:first').append('<link class="stylesheet" rel="stylesheet" href="/style.css" />');
			}else{
				$('head:first').append('<link class="stylesheet" rel="stylesheet" href="/desktopStyle.css">');
			}
			setTimeout(function(){$("#stylesheet").remove()},5000);
		</script>		
		<script src="/linkify/linkify.min.js"></script>
		<script src="/linkify/linkify-jquery.min.js"></script>
		<link rel="shortcut icon" type="image/png" href="/favicon.png"/>
		<title>CodeGolf</title>
	</head>
	<body>
		<script>
			document.body.style.display="none";
		</script>

		<? 
			require("functions.php");
			drawMenu()
		?>
		<div id="main"></div>
	</body>
</html>