// console.log("success");

require.config({
	paths: {
		"jquery": "jquery-3.3.1.min",
		"jquery-cookie": "jquery.cookie",
		"index": "index",
		"list":"list"
	},
	shim: {
		"jquery-cookie": ["jquery"]
	}
})

require(["index","list"], function(index,list){
	index.leftNav();
	index.topNav();
	index.topHover();
	index.rFixed();
	list.banner();
	list.goodList();
})