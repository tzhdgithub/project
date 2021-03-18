define(["jquery"], function($){
	function banner(){
		$.ajax({
			type: "get",
			url: "https://tzhdgithub.github.io/project/dist/data/index.json",
			success: function(data){
				var bannerArr=data.banner;
				for (var i = 0; i < bannerArr.length; i++) {
					$(`<a href="#" class="change-a"><img class="change-img" src="img/banner/${bannerArr[i].img}" alt=""></a>`).appendTo(".banner-change");
					var node=$(`<a class="pagination-bullet" href="#"></a>`);
					node.appendTo(".banner-pagination");
					if (i==0) {
						node.addClass("pagination-bullet-active");
					}
				}

				var iNow=0;
				var aImgs=null;
				var aBtns=null;
				var timer;
				start();

				function tab(){
					aImgs=$(".banner-change").find("a");
					aBtns=$(".banner-pagination").find("a");

					if(iNow==bannerArr.length){
						iNow=0;
					}
					aImgs.hide().css({"opacity":0.2}).eq(iNow).show().animate({opacity:1},500);
					aBtns.removeClass("pagination-bullet-active").eq(iNow).addClass("pagination-bullet-active");
				}
				function start(){
					timer=setInterval(function(){
						iNow++;
						tab();
					},3000)
				}
				function stop(){
					clearInterval(timer);
				}

				$(".banner-pagination").on("click","a",function(){
					// alert($(this).index());
					stop()
					iNow=$(this).index();
					tab();
					start();
					return false;
				});
				$(".banner-button-prev,.banner-button-next").on("click",function(){
					if(this.className=="banner-button-prev"){
						iNow--;
						if(iNow==-1){
							iNow=bannerArr.length-1;
						}
					}else{
						iNow++;
					}
					stop();
					tab();
					start();
				});			
			},
			error: function(msg){
				console.log(msg);
			}
		})
	}
	function topNav(){
		$.ajax({
			type:"get",
			url:"https://tzhdgithub.github.io/project/dist/data/index.json",
			success:function(data){
				var topNavArr=data.topNav;
				for (var i = 0; i < topNavArr.length; i++) {
					$(".nav-list .list-before").before(`<li class="list-li list-mouse">
                        	<a href="javascript:void(0);" class="li-link"><span class="text">${topNavArr[i].title}</span></a>
                        </li>`);
					var node=$(`<ul class="menu-list"></ul>`);
					node.appendTo(".nav-menu .wrap");
					var childArr=topNavArr[i].childs;
					for (var j = 0; j < childArr.length; j++) {
						$(`<li>
								<a href="#">
									<img src="${childArr[j].img}" alt="">
									<p class="title">${childArr[j].a}</p>
									<p class="price">${childArr[j].i}</p>
								</a>
							</li>`).appendTo(node);								
					}
				}
				var index;
				
				$(".head-nav .nav-list").on("mouseenter",".list-mouse",function(){
					index=$(this).index()-1;					
					$(".nav-menu").removeClass("slide-up").addClass("nav-menu-active slide-down").find("ul").eq(index).css("display", 'block').siblings("ul").css("display", "none");
				});	
				$(".head-nav .nav-list").on("mouseleave",".list-mouse",function(){								
					$(".nav-menu").removeClass("nav-menu-active slide-down").addClass("slide-up");
				});
				$(".nav-menu").on("mouseenter",function(){
					$(".nav-menu").removeClass("slide-up").addClass("nav-menu-active slide-down").find("ul").eq(index).css("display", 'block').siblings("ul").css("display", "none");
				});				
				$(".nav-menu").on("mouseleave",function(){
					$(".nav-menu").removeClass("nav-menu-active slide-down").addClass("slide-up");
				});
			},
			error:function(msg){
				console.log(msg);
			}
		})
	}
	function topHover(){
		$(".head-nav .list-category .category-link").on("mouseenter",function(){
			$(".list-category .category-list").removeClass("hide");
		})
		$(".head-nav .list-category .category-link").on("mouseleave",function(){
			$(".list-category .category-list").addClass("hide");
		})
		$(".list-category .category-list").on("mouseenter",function(){
			$(".list-category .category-list").removeClass("hide");
		})
		$(".list-category .category-list").on("mouseleave",function(){
			$(".list-category .category-list").addClass("hide");
		})
	}
	function leftNav(){
		$.ajax({
			type:"get",
			url:"https://tzhdgithub.github.io/project/dist/data/index.json",
			success(data){
				var sideArr=data.sideNav;
				for (var i = 0; i < sideArr.length; i++) {
					var node=$(`<li class ="custom-item">
		                <a href="list.html" class ="title">
		                    ${sideArr[i].title}
		                    <em>&gt;</em>
		                </a>
		                <div class="children">

		                </div>
		              	</li>`);
					node.appendTo(".list-custom");

					var childArr=sideArr[i].child;
					var col=Math.ceil(childArr.length / 6);
					node.find(".children").addClass("children-col-"+col);
					for (var j = 0; j < childArr.length; j++) {
						if(j % 6 == 0){
							var newUl=$(`<ul class="children-list">
	                           </ul>`);
							newUl.appendTo(node.find(".children"));
						}
						$(`<li>
                            <a href="" class="link">
                                <img src="${childArr[j].img}" width="40" height="40" alt="" class="thumb">
                                <span class="text">${childArr[j].title}</span>
                            </a>
                        </li>`).appendTo(newUl);
					}
				}
			},
			error(msg){
				console.log(msg);
			}
		})
	}
	function flashSale(){
		$.ajax({
			type:"get",
			url:"https://tzhdgithub.github.io/project/dist/data/index.json",
			success:function(data){
				var swiperArr=data.list;
				var colorArr=["green","blue","orange","purple","red"];
				var j=0;
				for (var i = 0; i < swiperArr.length; i++) {
					var node=$(`<li class="swiper-list">
							<a href="#">
                                <div class = 'content'>
                                    <div class = 'thumb'>
                                    </div>
                                    <h3 class = 'title'>${swiperArr[i].goods_name}</h3>
                                    <p class = 'desc'>${swiperArr[i].desc}</p>
                                    <p class = 'price'>
                                        <span>${swiperArr[i].seckill_Price}元</span>
                                        <del>${swiperArr[i].goods_price}元</del>
                                    </p>
                                </div>
                            </a>
						</li>`);
					node.appendTo(".swiper-wrap");
					node.find(".thumb").css(`background-image`,`url(${swiperArr[i].src})`);
					if (j==colorArr.length) {j=0}
					$(".swiper-wrap .swiper-list").eq(i).css("border-top",`1px solid ${colorArr[j]}`);
					j++;
				}

				var width=swiperArr.length*248;
				var spareLength=swiperArr.length%4;
				var iNow=0;
				var index=Math.ceil(swiperArr.length/4)-1;
				var timeId;
				$(".swiper-wrap").css("width",width+"px");
				$(".swiper-flashsale-prev .fa").addClass("swiper-button-disabled");
				
				$(".swiper-flashsale-prev,.swiper-flashsale-next").on("click",function(){
					if (this.className=="swiper-flashsale-prev") {
						prev();
					}else{
						next();				
					}
					change();
				})
				start();
				function tab(){
					if (iNow>index) {
						iNow=0;
						$(".flashsale-swiper .swiper-wrap li").css("transform",`translateX(0px)`);
					}else if(iNow<index-1){
						iNow++;
						$(".flashsale-swiper .swiper-wrap li").css("transform",`translateX(-${iNow*992}px)`);
					}else{
						iNow++;						
						$(".flashsale-swiper .swiper-wrap li").css("transform",`translateX(-${width-992}px)`);
					}
					change();
				}

				function prev(){
					if (iNow<=0) {
						return;
					}else if(iNow>index){
						stop();
						iNow=index;
						if (spareLength==0) {
							iNow--;
							$(".flashsale-swiper .swiper-wrap li").css("transform",`translateX(-${iNow*992}px)`);
						}else{
							iNow--;
							$(".flashsale-swiper .swiper-wrap li").css("transform",`translateX(-${(index-1)*992}px)`);
						}
						start();
					}else{
						stop();
						iNow--;
						$(".flashsale-swiper .swiper-wrap li").css("transform",`translateX(-${iNow*992}px)`);
						start();
					}
				}
				function next(){
					if (iNow>index) {
						return;
					}else if(iNow<index-1){
						stop();
						iNow++;
						$(".flashsale-swiper .swiper-wrap li").css("transform",`translateX(-${iNow*992}px)`);
						start();
					}else{
						stop();
						if (spareLength==0) {
							iNow++;
							$(".flashsale-swiper .swiper-wrap li").css("transform",`translateX(-${iNow*992}px)`);
						}else{
							iNow++;
							$(".flashsale-swiper .swiper-wrap li").css("transform",`translateX(-${width-992}px)`);
						}
						start();
					}
				}
				function change(){
					if (iNow<=0) {
						$(".swiper-flashsale-prev .fa").addClass("swiper-button-disabled");
						$(".swiper-flashsale-next .fa").removeClass("swiper-button-disabled");
					}else if(iNow>=index){
						$(".swiper-flashsale-prev .fa").removeClass("swiper-button-disabled");
						$(".swiper-flashsale-next .fa").addClass("swiper-button-disabled");
					}else{
						$(".swiper-flashsale-prev .fa").removeClass("swiper-button-disabled");
						$(".swiper-flashsale-next .fa").removeClass("swiper-button-disabled");
					}
				}
				function start(){
					timeId=setInterval(function(){
						tab();
					},3000)
				}
				function stop(){
					clearInterval(timeId);
				}


				//定时器倒计时，每天14:00开枪，每天22:00开枪
				countDown();
			    function countDown(){
			        var nowDate = new Date();
			        var hour = nowDate.getHours();
			        var date = nowDate.getDate();
			        var afterDate = new Date();
			       
			        
			        //计算倒计时时间间隔
			        if(hour < 14){
			            afterDate.setHours(14);
			            $(".flashsale-countdown .time").html("14:00 场");
			            
			        }else if(hour >= 14 && hour < 22){
			            afterDate.setHours(22);
			            $(".flashsale-countdown .time").html("22:00 场");
			        }else{
			            $(".flashsale-countdown .time").html("明日14:00 场");
			            afterDate.setHours(14);
			            afterDate.setDate(date + 1);
			        }
			        afterDate.setMilliseconds(0);
			        afterDate.setSeconds(0);
			        afterDate.setMinutes(0);

			        //计算倒计时总秒数
			        var count = parseInt((afterDate.getTime() - nowDate.getTime()) / 1000);
			    

			        var aSpans = $(".flashsale-countdown .countdown").find("span");
			        
			        var timer = setInterval(function(){
			            count--;
			            aSpans.eq(2).html(doubleNum(count % 60));
			            aSpans.eq(1).html(doubleNum(parseInt(count / 60) % 60));
			            aSpans.eq(0).html(doubleNum(parseInt(count / 3600) % 24));
			            if(count == 0){
			                clearInterval(timer);
			                $(".flashsale-countdown .desc").html("本次活动结束,敬请期待~");
			            }else{
			                $(".flashsale-countdown .desc").html("距离开始还有");
			            }
			        }, 1000);
			    }

			    function doubleNum(num){
			        if(num < 10){
			            return "0" + num;
			        }else{
			            return num;
			        }
			    }
			},
			error(msg){
				console.log(msg);
			}
		})
	}
	function phoneGoods(){
		$.ajax({
			type:"get",
			url:"https://tzhdgithub.github.io/project/dist/data/index.json",
			success:function(data){
				var first=data.goods[0];
				$(`<div class="page-topimg">
					<a href=""><img width="1226px" height="120px" src="img/topimg_1.webp" alt=""></a>
					</div>
					<div class="page-brick">
						<div class="box-hd">
							<h2>${first.title}</h2>
							<div class="more">
								<a href="" class="more-link">
									查看全部
									<i class="fa fa-arrow-right"></i>
								</a>
							</div>
						</div>
						<div class='box-bd'>
	                        <div class = 'span4'>
	                            <ul class = 'brick-promo-list'>
	                                <li class = 'brick-item'>
	                                    <a href="#">
	                                        <img src="img/cb1bd61ad71c45a4f67f09b075463944.webp" width="234" height="614" alt=""/>
	                                    </a>
	                                </li>
	                            </ul>
	                        </div>
	                        <div class = 'span16'>
	                            <ul class = 'brick-list'>
	                                                            
	                            </ul>
	                        </div>
		                </div>
					</div>`).appendTo(".site-page");
				for (var i = 0; i < first.childs.length; i++) {
					$(`<li class = 'brick-item'>
                        <a href="#">
                            <div class = 'figure'>
                                <img width="160" height="160" src="" alt=""/>
                            </div>
                            <h3 class = 'title'>
								${first.childs[i].title}	                            	
                            </h3>
                            <p class = 'desc'>${first.childs[i].desc}</p>
                            <p class = 'price'>
                                <span class = 'num'>${first.childs[i].price}元</span>
                                ${first.childs[i].del==0 ? "" : "<del>"+first.childs[i].del+"元</del>"}
                            </p>
                        </a>
                    </li>`).appendTo(".page-brick .brick-list");
				}

				for (var i = 1; i < data.goods.length; i++) {
					var node=$(`<div class="page-topimg">
							<a href=""><img width="1226px" height="120px" src="img/topimg_2.webp" alt=""></a>
						</div>
						<div class="page-brick">
							<div class="box-hd">
								<h2>${data.goods[i].title}</h2>
								<div class="more">
									<ul class="tab-list">
										<li class="tab-active">热门</li>
										<li>${data.goods[i].subTitle}</li>
									</ul>
								</div>
							</div>
							<div class='box-bd'>
			                    <div class = 'span4'>
			                        <ul class = 'brick-promo-list'>
			                            <li class = 'brick-item brick-item-l'>
			                                <a href="#">
			                                    <img src="img/xmad_15501975795809_qmOCe.jpg" width="234" height="300" alt=""/>
			                                </a>
			                            </li>
			                            <li class = 'brick-item brick-item-l'>
			                                <a href="#">
			                                    <img src="img/xmad_15616291664006_XWeFG.jpg" width="234" height="300" alt=""/>
			                                </a>
			                            </li>
			                        </ul>
			                    </div>
			                    <div class = 'span16'>
			                        <ul class = 'brick-list'>
			                            
			                        </ul>
			                        <ul class = 'brick-list hide'>
			                            
			                        </ul>
			                    </div>
			                </div>
						</div> 
					</div>`);
					node.appendTo(".site-page");

					var hotChilds=data.goods[i].hotChilds;
					for (var j = 0; j < hotChilds.length; j++) {
						$(`<li class = 'brick-item ${j==7 ? "brick-item-s" : ""}'>
                            <a href="#">
                                <div class = 'figure'>
                                    <img width="160" height="160" src="img/brick.webp" alt=""/>
                                </div>
                                <h3 class = 'title'>
                                    ${hotChilds[j].title}
                                </h3>
                                <p class = 'desc'>${hotChilds[j].desc}</p>
                                <p class = 'price'>
                                    <span class = 'num'>${hotChilds[j].price}元</span>
                                    ${hotChilds[j].del==0 ? "" : "<del>" + hotChilds[j].del + "元</del>"}
                                </p>
                            </a>
                        </li>`).appendTo(node.find(".brick-list").eq(0));
					}
					$(`<li class = 'brick-item-s brick-arrow'>
                            <a href="#">
                                <h3>浏览更多</h3>
                                <span>热门</span>
                                <i class="fa fa-arrow-circle-right fa-3x"></i>
                            </a>
                    </li>`).appendTo(node.find(".brick-list").eq(0));

                    var childs=data.goods[i].childs;
					for (var j = 0; j < childs.length; j++) {
						$(`<li class = 'brick-item ${j==7 ? "brick-item-s" : ""}'>
                            <a href="#">
                                <div class = 'figure'>
                                    <img width="160" height="160" src="img/brick-2.webp" alt=""/>
                                </div>
                                <h3 class = 'title'>
                                    ${childs[j].title}
                                </h3>
                                <p class = 'desc'>${childs[j].desc}</p>
                                <p class = 'price'>
                                    <span class = 'num'>${childs[j].price}元</span>
                                    ${childs[j].del==0 ? "" : "<del>" + childs[j].del + "元</del>"}
                                </p>
                            </a>
                        </li>`).appendTo(node.find(".brick-list").eq(1));
					}
					$(`<li class = 'brick-item-s brick-arrow'>
                            <a href="#">
                                <h3>浏览更多</h3>
                                <span>热门</span>
                                <i class="fa fa-arrow-circle-right fa-3x"></i>
                            </a>
                    </li>`).appendTo(node.find(".brick-list").eq(1));
				}


				$(".page-brick").on("mouseenter", ".more .tab-list li", function(){
            		$(this).addClass("tab-active").siblings("li").removeClass("tab-active");
            		$(this).closest(".page-brick").find(".box-bd .span16 ul").addClass("hide").eq($(this).index()).removeClass("hide");
        		});
			},
			error:function(msg){
				console.log(msg);
			}
		})
	}
	function rFixed(){
		$(".site-fixed li").on("mouseenter",function(){
			$(".site-fixed li").eq($(this).index()).find("span").removeClass("hide");
		})
		$(".site-fixed li").on("mouseleave",function(){
			$(".site-fixed li span").addClass("hide");
		})
		
		$(window).scroll(function(){
			if($(window).scrollTop() < 500){
				$(".site-fixed .totop").addClass("visibility");
			}else{
				$(".site-fixed .totop").removeClass("visibility");
			}
		})
	}
	return {
		banner,topNav,leftNav,flashSale,phoneGoods,topHover,rFixed
	}
})
