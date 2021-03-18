define(["jquery"],function($){
	function banner(){
		var aImgs=$(".banner-img a img");
		var aBullets=$(".banner-pagination a");
		var iNow=0;
		var distance=100/aImgs.length;
		var timer,index;
		var clickNum=0;


		$(".banner-img").css({"height":`${aImgs.height()}px`,"width":`${aImgs.width()*($(".banner-img").children().length)}px`});
		aImgs.css("left",`-${distance}%`);
		$(window).on("resize",function(){
			$(".banner-img").css({"height":`${$('.banner-img img').height()}px`,"width":`${$('.banner-img img').width()*($(".banner-img a").length)}px`});
		})
		$(window).on("blur",function(){
			stop();
		})
		$(window).on("focus",function(){
			start();
		})

		start();
		function tab(){
			aBullets.removeClass("pagination-bullet-active").eq(iNow).addClass("pagination-bullet-active");
			aImgs.animate({left: `-${distance*(iNow+1)}%`},600,function(){clickNum=0});
			if (iNow==aBullets.length) {
				iNow=0;
				aImgs.animate({"left":`-${distance}%`},0)
				aBullets.removeClass("pagination-bullet-active").eq(0).addClass("pagination-bullet-active");
			}	
		}
		function prev(){
			aBullets.removeClass("pagination-bullet-active").eq(iNow).addClass("pagination-bullet-active");
			aImgs.animate({left: 0},600,function(){clickNum=0});
			if (iNow==-1) {
				iNow=aBullets.length-1;
				aImgs.animate({"left":`-${distance*aBullets.length}%`},0)
				aBullets.removeClass("pagination-bullet-active").eq(aBullets.length-1).addClass("pagination-bullet-active");
			}
		}
		function start(){
			timer=setInterval(function(){
				iNow++;
				tab();
			},3000);;
		}
		function stop(){
			clearInterval(timer);
		}
		aBullets.click(function(){
			index=$(this).index();
			if (index==iNow) {
				stop();
				start();
				return false;
			}else{
				stop();
				iNow=index;
				tab();
				start();
				return false;
			}
		});
		$(".banner-button-next,.banner-button-prev").click(function(){
			if(this.className=="banner-button-next"){
				clickNum+=1;
				if (clickNum>1) {
					return;
				}else{
					stop();
					iNow++;
					tab();
					start();
				}
			}else{
				clickNum+=1;
				if (clickNum>1) {
					return;
				}else{
					if (iNow==0) {
						stop();
						iNow--;
						prev();
						start();
					}else{
						iNow--;
						stop();
						tab();
						start();
					}
				}
			}
		})
	}
	function goodList(){
		$.ajax({
			type:"get",
			url:"../data/list.json",
			success:function(data){
				$(`<div class="scontent-first">
				<div class="figure">
					<a href="desc.html"><img width="855" height="435" src="${data[0].image}" alt=""></a>
				</div>
				<div class="content">
					<div class="wrap">
						<h3 class = 'title'>
							<a href="desc.html">
								${data[0].name}
							</a>
						</h3>
						<p class = 'desc'>${data[0].desc}</p>
						<p class = 'price'>
							<strong>${data[0].price}</strong>元
							<span>起</span>
						</p>
						<p class="link">立即预约</p>
					</div>
				</div>
				</div>`).appendTo(".page-scontent");

				for (let i = 1; i < data.length; i++) {
					$(`<div class="scontent-other">
						<div class="figure">
							<a href="desc.html"><img width="603" height="358" src="${data[i].image}" alt=""></a>
						</div>
						<div class="content">
							<div class="wrap">
								<div class="text">
									<h3 class = 'title'>
										<a href="desc.html">
											${data[i].name} 
										</a>
									</h3>
									<p class = 'desc'>${data[i].desc}</p>
								</div>
								<div class = 'price'>
									<strong>${data[i].price}</strong>元
									<span>起</span>
								</div>
							</div>
						</div>
					</div>`).appendTo(".page-scontent");			
				}
			},
			error:function(msg){
				console.log(msg);
			}
		})
	}
	return{
		banner,goodList
	}
})