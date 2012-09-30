<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Move Subtly - a jQuery Plugin</title>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.js"></script>
<script src="js/moveSubtly.js"></script>
</head>

<body>

<script>

$(function() {
	
	$("#image1").moveSubtly();
	$("#image2").moveSubtly({moveTime:1000,stillTime:6000,lockSide:"bottom"});
	$("#image3").moveSubtly();
	$("#image4").moveSubtly();
	
});

</script>

<style> h3 { padding-top:10px; border-top:1px solid rgba(0,0,0,.2); } </style>

<h1>Move Subtly - a jQuery Plugin</h1>
<h2>Move Subtly takes any image and turns it into a subtly moving image.</h2>
<h3>by Drew Thomas and Brolik</h3>

<h3>Default Settings</h3>
<p><img id="image1" src="/images/articleImages/gqMasthead.jpg" style="width:500px;" /></p>
<code>$("#image1").moveSubtly();</code>

<h3>Custom Settings</h3>
<p><img id="image2" src="/images/articleImages/instagramBridge.png" style="width:500px;" /></p>
<code>$("#image2").moveSubtly({moveTime:1000,stillTime:6000,lockSide:"bottom"});</code>

<h3>Image Retains All Styling</h3>
<p><img id="image3" src="/images/articleImages/flamingos.jpg" style="width:500px; border:10px solid rgba(0,0,0,.6); float:right; margin-top:-100px; -moz-border-radius:10px; -webkit-border-radius:10px; border-radius:10px;" /></p>
<code>$("#image3").moveSubtly();</code>

<h3>Images Can Be Percentages... Almost (need to fix get the other dimension into a %)</h3>
<p><img id="image4" src="/images/articleImages/hipCityVeg.jpg" style="width:50%;" /></p>
<code>$("#image4").moveSubtly();</code>

<h3>More ToDos</h3>
<p>Allow for ";" and "; " separated css styles</p>

</body>
</html>