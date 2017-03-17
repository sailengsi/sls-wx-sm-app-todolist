var app = getApp()
Page({
	data: {
		userInfo: {},
		all: 0,
		finished: 0,
		nofinished: 0,
		share: {
			name: '您不是通过分享点进来的'
		}
	},
	onLoad(options) {

		if (options && options.nickname) {
			this.setData({
				share: {
					name: options.nickname
				}
			});
		}

		wx.setNavigationBarTitle({
			title: '设置'
		});
		wx.login({
			success: (res) => {
				if (res.code) {
					wx.getUserInfo({
						success: (res) => {
							// console.log(res);

							this.setData({
								userInfo: res.userInfo
							});
						}
					});
				}
			}
		});
	},
	onShareAppMessage() {
		return {
			title: app.data.share.title,
			desc: app.data.share.desc,
			path: app.data.share.path
		};
	},
	onShow() {
		wx.setNavigationBarTitle({
			title: '设置'
		});
		var cache = app.getTodoList();
		// console.log(cache);

		var all = cache.length,
			finished = 0,
			nofinished = 0;
		for (var i = 0; i < cache.length; i++) {
			if (cache[i].type) {
				finished += 1;
			} else {
				nofinished += 1;
			}
		}

		this.setData({
			all,
			finished,
			nofinished
		});
	},
	clearTodo() {
		var clear = app.clearTodo();
		if (clear === true) {
			this.setData({
				all: 0,
				finished: 0,
				nofinished: 0
			});
			wx.showToast({
				title: '清除成功！',
				duration: 1000
			});
		} else {
			wx.showToast({
				title: '清除失败！',
				duration: 1000
			});
		}
	}
})