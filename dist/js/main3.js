// console.log("success");

require.config({
	paths: {
		"jquery": "jquery-3.3.1.min",
		"jquery-cookie": "jquery.cookie",
		"index": "index",
		"HappyImage.min":"HappyImage.min",
		"desc":"desc"
	},
	shim: {
		"jquery-cookie": ["jquery"],
	}
})

require(["index","desc"], function(index,desc){
	index.leftNav();
	index.topNav();
	index.topHover();
	index.rFixed();
	desc.buyTap();
})