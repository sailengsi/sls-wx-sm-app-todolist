//app.js
App({
    /**
     * app运行
     */
    onLaunch: function() {

    },

    /**
     * 公共状态，因为小程序没有类似于react的redux和vue中的vuex，所以共享状态放到根实例上
     * @type {Object}
     */
    data: {
        db_prefix: 'sls_todo_',
        db_key: 'list',

        share: {
            title: '任务清单',
            desc: '提升做事效率的任务管理器，欢迎您的使用！',
            path: 'pages/components/list/list'
        }
    },

    /**
     * 公共获取本地存储的缓存列表
     * @param  {boolean} type 获取的方式，true:异步；false:同步    
     * @return {array}   array       获取到的数据   
     */
    getTodoList(type) {
        try {
            if (type === true) {
                wx.getStorage({
                    key: this.data.db_prefix + this.data.db_key,
                    success: (res) => {
                        console.log('suc');
                        return res.data;
                    },
                    fail: (msg) => {
                        console.log(msg);
                        console.log('fail');
                        return false;
                    },
                    complete: () => {
                        console.log('com');
                        return false;
                    }
                });
            } else {
                var value = wx.getStorageSync(this.data.db_prefix + this.data.db_key);
                if (!value) {
                    return [];
                }
                return value;
            }
        } catch (e) {
            return false;
        }
    },


    /**
     * 存储todo数据
     * @param {array} value 最新TODO列表
     */
    setTodoList(value) {
        try {
            wx.setStorageSync(this.data.db_prefix + this.data.db_key, value);
            return true;
        } catch (e) {
            return false;
        }
    },


    /**
     * 清除TODO
     * @return {boolean} 清除成功:true;失败:false
     */
    clearTodo() {
        try {
            wx.removeStorageSync(this.data.db_prefix + this.data.db_key);
            return true;
        } catch (e) {
            return false;
        }
    }
})