// 题库总数都是5的倍数
var shuxue = [
	{//1
		"TITLE": "57 - 3 = ",
		"A": 53,
		"B": 54,
		"C": 55,
		"D": 56,
		"standard": "B",
		"answer": null
	},
	{//2
		"TITLE": "65 - 4 = ",
		"A": 59,
		"B": 60,
		"C": 61,
		"D": 62,
		"standard": "C",
		"answer": null
	},
	{//3
		"TITLE": "89 - 7 = ",
		"A": 82,
		"B": 83,
		"C": 84,
		"D": 85,
		"standard": "A",
		"answer": null
	},
	{//4
		"TITLE": "37 - 5 = ",
		"A": 29,
		"B": 30,
		"C": 31,
		"D": 32,
		"standard": "D",
		"answer": null
	},
	{//5
		"TITLE": "63 - 20 = ",
		"A": 33,
		"B": 43,
		"C": 53,
		"D": 61,
		"standard": "B",
		"answer": null
	},
	{//6
		"TITLE": "59 - 30 = ",
		"A": 26,
		"B": 36,
		"C": 29,
		"D": 19,
		"standard": "C",
		"answer": null
	},
	{//7
		"TITLE": "72 - 50 = ",
		"A": 12,
		"B": 22,
		"C": 32,
		"D": 67,
		"standard": "B",
		"answer": null
	},
	{//8
		"TITLE": "96 - 60 = ",
		"A": 20,
		"B": 30,
		"C": 33,
		"D": 36,
		"standard": "D",
		"answer": null
	},
	{//9
		"TITLE": "50 - 6 = ",
		"A": 40,
		"B": 42,
		"C": 44,
		"D": 46,
		"standard": "C",
		"answer": null
	},
	{//10
		"TITLE": "85 - 9 = ",
		"A": 74,
		"B": 76,
		"C": 78,
		"D": 80,
		"standard": "B",
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
		lines: 0,
		flag: false, // false考试中,true考试结束
		flag2: false, // false不看答案,true看答案
		sum: 0,
		idxs: []
    },
    methods: {
        query: function () {
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
					for (var i=0; i<this.idxs.length; i++) {
						if (this.idxs[i] >= this.cur) {
							break;
						}
						cur = this.idxs[i];
					}
					this.cur = cur;
				}
			}
		},
		next: function() {
			if (this.cur < this.max) {
				if (this.mode == 0) {
					this.cur++;
				} else {
					// 计算下一个错题的索引
					var cur = 0;
					for (var i=0; i<this.idxs.length; i++) {
						if (this.idxs[i] > this.cur) {
							cur = this.idxs[i];
							break;
						}
					}
					this.cur = cur;
				}
			}
		},
		jump: function(cur) {
			this.cur = cur;
		},
		confirm: function() {
			var right = 0;
			this.idxs = []; // 存放错题
			for (var i=0; i< this.questions.length; i++) {
				var dxt = this.questions[i];
				if (dxt.standard == dxt.answer) {
					right++;
				} else {
					this.idxs.push(i);
				}
			}
			this.flag = true;
			this.sum = right * 100 / this.questions.length;
			$('#myModal2').modal();
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
		}
    },
    created: function () {
        this.query();
    }
});

