<html>
	<head>
		<title>This is my title</title>
		<link href="style.css" rel="stylesheet" type="text/css" />
		<script src="jquery.min.js" type="text/javascript"></script>
		<script src="accordian.js" type="text/javascript"></script>
	</head>
	<body>
		<div id="accordian">
			<div class="accordian-panel">
				<div class="head">Hello World</div>
				<div class="body">
					Hello this is me <br>
					Hello this is me <br>
					Hello this is me <br>
					Hello this is me <br>
					Hello this is me <br>
				</div>
			</div>
			<div class="accordian-panel">
				<div class="head">Hello World</div>
				<div class="body">
					Hello this is me <br>
					Hello this is me <br>
					Hello this is me <br>
					Hello this is me <br>
					Hello this is me <br>
				</div>
			</div>
			<div class="accordian-panel">
				<div class="head">Hello World</div>
				<div class="body">
					Hello this is me <br>
					Hello this is me <br>
					Hello this is me <br>
					Hello this is me <br>
					Hello this is me <br>
				</div>
			</div>
		</div>
		<script>
			$(document).ready(function(){
				$("#accordian").customAccordian();	
			})
			
		</script>
	</body>
</html>
