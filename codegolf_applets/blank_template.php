<!DOCTYPE html>
<html>
	<head>
		<style>
			html,body{
				margin:0;
				overflow:hidden;
				background:#fff;
			}
			canvas{
				position:absolute;
				z-index:11;
				width:100%;
				display:block;
			}
			#error{
				position:absolute;
				color:red;
				font-size:1.5em;
				font-family:arial,tahoma,courier;
				z-index:10;
			}
		</style>
		<script>
			<?
				require("db.php");
			?>
			window.addEventListener("message", receiveMessage, false);
			function receiveMessage(event){
				var origin = event.origin || event.originalEvent.origin;
				if (origin !== "<?=$baseURL?>") return;
				message=event.data;
				var command=message.split(':')[0];
				webgl=message.split(':')[1];
				var data=message.substr(command.length+webgl.length+2);
				switch(command){
					case "start":
						if(data !=""){
							if(typeof animationFrameHandle != "undefined"){
								cancelAnimationFrame(animationFrameHandle);
								delete animationFrameHandle;
							}
							document.body.removeChild(document.querySelector("#script-block"));
							document.body.removeChild(c);
							c=document.createElement("canvas");
							c.id="c";
							document.body.appendChild(c);
							document.querySelector("#error").innerHTML="";
							
							var newScript=document.createElement("script");
							newScript.id="script-block";
							newScript.text=`
								c = document.querySelector("#c");
								c.width = 1920;
								c.height = 1080;
								var x = c.getContext(webgl!="false"?"experimental-webgl":"2d");
								var T = Math.tan;
								var S = Math.sin;
								var C = Math.cos;
								var time = 0;
								var frame = 0;
								function loop(newtime){
									animationFrameHandle=requestAnimationFrame(loop);
									now = newtime;
									elapsed = now - then;
									if (elapsed > fpsInterval){
										time = frame/60;
										frame++;
										then = now - (elapsed % fpsInterval);
										u(time);
									}
								}
								function u(t){
									`+data+`
								}`;
							document.body.appendChild(newScript);

							try {
								c.style.display="block";
								eval("u = function(t){"+data+"\n};");
							} catch (e) {
								c.style.display="none";
								document.querySelector("#error").innerHTML=e;
								u=function(t){
									throw e;
								}
								throw e;
							};							

							try {
								u(time);
							} catch (e) {
								c.style.display="none";
								document.querySelector("#error").innerHTML=e;
								throw e;
							}
						}else{
							c.style.display="block";
						}
						if(typeof animationFrameHandle == "undefined"){
							fpsInterval = 1000 / 60;
							then = window.performance.now();
							startTime = then;
							loop();
						}
						break;
					case "stop":
						if(typeof animationFrameHandle != "undefined"){
							cancelAnimationFrame(animationFrameHandle);
							delete animationFrameHandle;
						}
						break;
				}
			}
		</script>
	</head>
	<body>
		<canvas id="c" width="1920" height="1080"></canvas>
		<div id="error"></div>
		<script id="script-block"></script>
	</body>
</html>