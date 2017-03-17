/**
 * 添加修改表单公共逻辑处理
 * @type {Object}
 */
let Edit = {

	app: getApp(),

	/**
	 * 表单数据
	 * @type {Object}
	 */
	data: {
		//scroll-view左右滑动操作位置，默认为0
		scroll_left: 0,

		//点击添加清单时push这条数据(清单是任务的子级)
		todo_data: {
			todo_name: '',
			type: false
		},

		//添加和修改的表单数据
		todo: {
			//分类名称-也是任务名称
			cate_name: '',
			//任务状态，默认为false,不能修改,只能通过列表改变状态
			type: false,
			//当前任务下的清单列表
			todo_list: []
		}
	},


	/**
	 * 初始化更新数据
	 */
	onUpdateData() {
		this.setData({
			todo: {
				cate_name: '',
				type: false,
				todo_list: []
			}
		});
	},


	/**
	 * 添加一条清单事件
	 */
	addTodoItem() {
		var todo = this.data.todo;
		todo.todo_list.push(this.data.todo_data);

		this.setData({
			todo: todo
		});
	},


	/**
	 * 删除一条清单数据
	 */
	deleteTodoItem(e) {
		var idx = e.currentTarget.id;
		var todo = this.data.todo;
		todo.todo_list.splice(parseInt(idx), 1);

		this.setData({
			scroll_left: 0,
			todo: todo
		});
	},


	/**
	 * 分类任务名称改变事件
	 */
	changeCateName(e) {
		// console.log('catename');
		var todo = this.data.todo;
		todo.cate_name = e.detail.value;
		this.setData({
			todo: todo
		});
	},


	/**
	 * 改变清单事件
	 */
	changeTodoName(e) {
		// console.log('todoname');
		var idx = e.currentTarget.id,
			value = e.detail.value,
			todo = this.data.todo;
		todo.todo_list[idx].todo_name = value;
		this.setData({
			todo: todo
		});
	},


	/**
	 * 改变清单状态事件
	 */
	changeTodoStatus(e) {
		var checked = e.detail.value.length ? true : false,
			index = e.currentTarget.id,
			todo = this.data.todo;

		todo.todo_list[index].type = checked;
		this.setData({
			todo: todo
		});
	},


	/**
	 * 保存分类任务事件
	 */
	saveTodo: function() {
		var todo = this.data.todo,
			cache = this.app.getTodoList(),
			toast = true,
			type = 1;


		/*console.log(todo);
		console.log(cache);
		return;*/

		if (todo.cate_name === '') {
			toast = '任务名称不能为空';
		} else {
			var childFlag = true;
			for (var i = 0; i < todo.todo_list.length; i++) {
				if (todo.todo_list[i].todo_name === '') {
					childFlag = false;
					break;
				}
			}
			if (!childFlag) {
				toast = '清单内容不能包含空选项';
			} else {
				var index = -1,
					id = -1;
				for (var i = 0; i < cache.length; i++) {
					if (cache[i].cate_name == todo.cate_name) {
						index = i;
					}
					if (cache[i].id == todo.id) {
						id = i;
					}
				}


				var date = new Date(),
					time = date.getTime();

				if (!todo.id) {
					type = 2;
					if (index === -1) {
						todo.id = time;
						todo.add_time = time;
						todo.update_time = time;
						cache.push(todo);
					} else {
						toast = '该任务名称已存在';
					}
				} else {
					if (id !== -1) {
						todo.update_time = time;
						cache[id] = todo;
					} else {
						toast = '缓存中不存在该条数据';
					}
				}
				this.app.setTodoList(cache);
			}
		}

		if (toast !== true) {
			wx.showToast({
				title: toast,
				duration: 1600
			});
		} else {
			if (type === 2) {
				wx.switchTab({
					url: '/pages/components/list/list?update=true'
				});
			} else {
				wx.navigateBack();
			}
		}
	}
}

module.exports = Edit;