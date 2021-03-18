var spans = document.getElementsByTagName('span');
var project = document.querySelector(".project");

function doSetTimeout(i) {
  setTimeout(function(){ 
		// spans[i].classList += ' animate-in'
		spans[i].classList.add('animate-in')
	}, 120 * i);
}

window.addEventListener('load', function() {
	setTimeout(function(){
		for (var i = 0; i < spans.length; i++) {
			doSetTimeout(i);
		}
	},3100);
	setTimeout(() => {
		project.style.display="block";
	}, 6000);
})

// window.onload = function(){
// 	for(var i=0; i<spans.length;i++){
// 		doSetTimeout(i);
// 	}
// }


var per=0;
var timer;
timer=setInterval(function(){
	$('.bar').css("width",per+"%");
	per+=1;
	if(per>100){
		clearInterval(timer);
		$('.pageLoading').addClass("complete");
	}
},25)