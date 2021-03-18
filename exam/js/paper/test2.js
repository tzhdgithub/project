// 题库总数都是5的倍数
var shuxue = [{ //1
		"TITLE1": "运走了",
		"TITLE2": "箱",
		"picture": "0.png",
		"standard": 63,
		"answer": null
	},
	{ //2
		"TITLE1": "还缺",
		"TITLE2": "把椅子",
		"picture": "1.png",
		"standard": 18,
		"answer": null
	},
	{ //3
		"TITLE1": "一共有",
		"TITLE2": "人在打乒乓球",
		"picture": "2.png",
		"standard": 16,
		"answer": null
	},
	{ //4
		"TITLE1": "还剩",
		"TITLE2": "个足球",
		"picture": "3.png",
		"standard": 28,
		"answer": null
	},
	{ //5
		"TITLE1": "还剩",
		"TITLE2": "只",
		"picture": "4.png",
		"standard": 15,
		"answer": null
	},
	{ //6
		"TITLE1": "应找回",
		"TITLE2": "元",
		"picture": "5.png",
		"standard": 42,
		"answer": null
	},
	{ //7
		"TITLE1": "可以装",
		"TITLE2": "个吊扇",
		"picture": "6.png",
		"standard": 5,
		"answer": null
	},
	{ //8
		"TITLE1": "一本《少儿百科》",
		"TITLE2": "元",
		"picture": "7.png",
		"standard": 23,
		"answer": null
	},
	{ //9
		"TITLE1": "最多可以做",
		"TITLE2": "个毽子",
		"picture": "8.png",
		"standard": 4,
		"answer": null
	},
	{ //10
		"TITLE1": "兰兰比小清多跳了",
		"TITLE2": "下",
		"picture": "9.png",
		"standard": 6,
		"answer": null
	}
];

new Vue({
	el: '#app',
	data: {
		questions:null,
		mode: 0, // 0:正常模式, 1:错题模式
		min: 0,
		max: 0,
		cur: 0,
		picUrl: 'img/0.png',
		lines: 0,
		flag: false, // false考试中,true考试结束
		flag2: false, // false不看答案,true看答案
		sum: 0,
		idxs: []
	},
	methods: {
		query: function() {
			this.questions = shuxue;
			this.lines = Math.floor(this.questions.length / 5);
			this.max = this.questions.length - 1;
		},
		prev: function() {
			if (this.cur > this.min) {
				if (this.mode == 0) {
					this.cur--;
				} else {
					// 计算上一个错题的索引
					var cur = 0;
					for (var i = 0; i < this.idxs.length; i++) {
						if (this.idxs[i] >= this.cur) {
							break;
						}
						cur = this.idxs[i];
					}
					this.cur = cur;
				}
				this.picUrl = 'img/' + this.cur + '.png';
			}
		},
		next: function() {
			if (this.cur < this.max) {
				if (this.mode == 0) {
					this.cur++;
				} else {
					// 计算下一个错题的索引
					var cur = 0;
					for (var i = 0; i < this.idxs.length; i++) {
						if (this.idxs[i] > this.cur) {
							cur = this.idxs[i];
							break;
						}
					}
					this.cur = cur;
				}
				this.picUrl = 'img/' + this.cur + '.png';
			}
		},
		jump: function(cur) {
			this.cur = cur;
			this.picUrl = 'img/' + this.cur + '.png';
		},
		confirm: function() {
			var right = 0;
			this.idxs = []; // 存放错题
			for (var i = 0; i < this.questions.length; i++) {
				var dxt = this.questions[i];
				if (dxt.standard == dxt.answer) {
					right++;
				} else {
					this.idxs.push(i);
				}
			}
			this.flag = true;
			this.sum = right * 100 / this.questions.length;
			$('#myModal3').modal();
		},
		restart: function() {
			window.location.reload();
		},
		showanswer: function() {
			this.flag2 = true;
		},
		recover: function() {
			this.flag = false;
			this.flag2 = false;
			this.mode = 1;
			this.min = this.idxs[0];
			this.max = this.idxs[this.idxs.length-1];
			this.cur = this.min;
			this.picUrl = 'img/' + this.cur + '.png';
		}
	},
	created: function() {
		this.query();
	}
});
