var app = getApp();
Page({
    data: {
        //列表数据
        cate_list: [],

        //默认显示所有状态
        show_type: 'all',

        //状态筛选默认显示所有
        show_filter_text: '全部TODO',

        //时间排序默认显示  按创建时间排序
        show_time_text: '按创建时间排序',

        //scroll-view组件
        scroll_left: 0,

        //action-sheet的排序与筛选定义
        sort: {
            //状态筛选
            filter: {
                filters: ['all', 'nofinished', 'finished'],
                list: ['全部TODO', '未完成TODO', '已完成TODO']
            },

            //时间排序
            time: {
                list: ['按创建时间排序', '按更新时间排序']
            }
        }
    },
    onLoad(option) {
        // console.log(option);
        // console.log('list load');
    },
    onReady() {
        // console.log('list ready');
        wx.setNavigationBarTitle({
            title: '任务列表'
        });
    },

    onShow() {
        // console.log('list show');

        this.onUpdateSort();

        // console.log(app.getTodoList());
        // console.log(getCurrentPages());
    },
    onHide() {
        // console.log('list hide');
    },

    onPullDownRefresh() {
        wx.stopPullDownRefresh();
    },

    onShareAppMessage() {
        return {
            title: app.data.share.title,
            desc: app.data.share.desc,
            path: app.data.share.path
        };
    },


    /**
     * 更新当前时间排序
     * @param  {array} cache 缓存数据，如果没有传，默认重新从本地取
     */
    onUpdateSort(cache) {
        if (this.data.show_time_text === '按创建时间排序') {
            this.timeSort(0, cache);
        } else {
            this.timeSort(1, cache);
        }
    },


    /**
     * 删除一条任务
     * @param  {object} e 事件对象
     */
    removeTodoItem(e) {
        var cache = app.getTodoList(),
            index = -1,
            id = e.currentTarget.id;
        for (var i = 0; i < cache.length; i++) {
            if (cache[i].id == id) {
                index = i;
                break;
            }
        }

        if (index !== -1) {
            cache.splice(index, 1);

            this.setData({
                cate_list: cache,
                scroll_left: 0
            });

            app.setTodoList(cache);
        } else {
            wx.showToast({
                title: '没有找到您要删除的数据'
            });
        }
    },


    /**
     * 切换当前任务状态
     * @param  {object} e 事件对象
     */
    toggleTodoItem(e) {
        var id = e.currentTarget.id,
            cache = app.getTodoList();

        for (var i = 0; i < cache.length; i++) {
            if (cache[i].id == id) {
                cache[i].type = !cache[i].type;
                var date = new Date();
                cache[i].update_time = date.getTime();
                for (var j = 0; j < cache[i].todo_list.length; j++) {
                    cache[i].todo_list[j].type = cache[i].type;
                }
                break;
            }
        }


        this.setData({
            scroll_left: 0
        });

        this.onUpdateSort(cache);

        app.setTodoList(cache);
    },


    /**
     * 点击筛选状态和时间排序
     * @param {object} e 事件对象
     */
    setSortTodo(e) {
        var type = e.currentTarget.id,
            itemList = this.data.sort[type].list;

        wx.showActionSheet({
            itemList,
            success: (res) => {
                // console.log(res)
                // console.log(this);

                if (res.tapIndex >= 0) {
                    if (this[type + 'Sort'] && typeof this[type + 'Sort'] === 'function') {
                        this[type + 'Sort'](res.tapIndex);
                    } else {
                        console.log(type);
                    }
                }
            },
            fail: (res) => {
                // console.log(res);
                // console.log(this)
            }
        });
    },


    /**
     * 状态筛选
     * @param  {number} index 点击状态的索引
     */
    filterSort(index) {
        console.log('status:' + index);

        this.setData({
            show_type: this.data.sort.filter.filters[index],
            show_filter_text: this.data.sort.filter.list[index]
        });
    },

    /**
     * 时间排序
     * @param  {number} index 点击时间排序的索引
     */
    timeSort(index, cache) {

        var field = index == 0 ? 'add_time' : 'update_time';

        // console.log('time:' + index);
        // console.log('field:' + field);

        var cache = cache || app.getTodoList(),
            len = cache.length;
        for (var i = 0; i < len; i++) {
            for (var j = i + 1; j < len; j++) {
                if (cache[i][field] < cache[j][field]) {
                    var temp = cache[i];
                    cache[i] = cache[j];
                    cache[j] = temp;
                }
            }
        }

        /*for (var i = 0; i < cache.length; i++) {
            console.dir(cache[i][field] + ":" + cache[i].cate_name);
        }*/

        this.setData({
            cate_list: cache,
            show_time_text: this.data.sort.time.list[index]
        });
    }
})