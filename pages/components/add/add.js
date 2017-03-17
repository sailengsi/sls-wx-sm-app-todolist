var Edit = require('../common/todocate/form.js');
// console.log(Edit);

Page({
    onLoad() {
        // console.log('add load');
        for (var k in Edit) {
            this[k] = Edit[k];
        }
    },

    onReady() {
        // console.log('add ready');
        wx.setNavigationBarTitle({
            title: '添加任务'
        });
    },

    onShow() {
        // console.log('add show');
        this.onUpdateData();
    },

    onShareAppMessage() {
        return {
            title: this.app.data.share.title,
            desc: this.app.data.share.desc,
            path: this.app.data.share.path
        };
    },

    onHide() {
        // console.log('add hide');
        this.onUpdateData();
    }
});