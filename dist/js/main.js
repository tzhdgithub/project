// console.log("success");

require.config({
	paths: {
		"jquery": "jquery-3.3.1.min",
		"jquery-cookie": "jquery.cookie",
		"index": "index"
	},
	shim: {
		"jquery-cookie": ["jquery"]
	}
})

require(["index"], function(index){
	index.banner();
	index.leftNav();
	index.topNav();
	index.flashSale();
	index.phoneGoods();
	index.rFixed();
})