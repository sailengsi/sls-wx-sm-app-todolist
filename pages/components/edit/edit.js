var Edit = require('../common/todocate/form.js');
Edit.getTodoByCateName = function(id) {
	var cache = this.app.getTodoList();
	for (var i = 0; i < cache.length; i++) {
		if (cache[i].id == id) {
			return cache[i];
			break;
		}
	}
	return false;
};
Page({
	onLoad(options) {
		// console.log('edit load');
		for (var k in Edit) {
			this[k] = Edit[k];
		}
		var todo = this.getTodoByCateName(options.id);
		this.setData({
			todo: todo
		});
	},
	onReady() {
		wx.setNavigationBarTitle({
			title: '修改任务'
		});
	},
	onShow() {
		wx.setNavigationBarTitle({
			title: '修改任务'
		});
		// console.log('edit show');
	},

	onShareAppMessage() {
		return {
			title: this.app.data.share.title,
			desc: this.app.data.share.desc,
			path: this.app.data.share.path
		};
	},

	onHide() {
		// console.log('list hide')
	}
});