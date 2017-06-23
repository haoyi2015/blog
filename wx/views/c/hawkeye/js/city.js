!(function(){
	var app = new Vue({
		el: '#city',
		data: {
			cityName : '定位中....',
			url: 'getcitylist',
			hotData:[],//热门城市
			datas:{},
			itemsData:[],
			val: '',
			flag: true
		},
		created () {
			tmsky.ui.dialog.loading('正在加载，请稍等。。。');
			this.getCityList();
		},
		methods: {
			bindCity (codeCity) {
				var that = this;
				window.localStorage.setItem("city",JSON.stringify(codeCity))
				location.href = 'search.html'
			},
			search () {
				var me =this;
				if(me.flag){
					me.flag =false;
					me.hotData =[];
					me.cityName = me.val;
					me.getCityList()
				}
			},
			getCityList (ops) {

				var that = this;
				let parm ={
					cityName :that.val || '',
					//webChatCode :'' 
					wxUnionId:niOpenid.wxUnionId || 123456
				}
				axios.get(hostUrl+this.url,{params:parm}).then(response => {
					
					var data = JSON.parse(response.data.data),
						len =data.length,
						letters = "ABCDEFGHIJKLMNOPQRSTUVXYZ".split(''),
						newCity =[];

					for(var i=0; i<len; i++){
						if(data[i].ctiyHot){
							that.hotData.push(data[i])
						}
						for(var l=0; l<letters.length; l++){
							if(letters[l].toLowerCase() == data[i].pinyin.substr(0,1)){
								newCity.push({
									type: letters[l],
									cityId: data[i].cityId,
									ctiyName: data[i].ctiyName
								})
							}
						}
					}
					that.flag =true
			        that.datas = that.arrs(newCity);
				    tmsky.ui.dialog.loading.close();
				}, response => {
				    tmsky.ui.dialog.loading.close();
				})
			},
			arrs (items) {
				var renArry = new Array();

	            for (var i in items) {
	                if (renArry.hasOwnProperty(items[i].type))
	                    renArry[items[i].type].push(items[i]);
	                else
	                    renArry[items[i].type] = [items[i]];
	            }
	           
	            var vdata = [];
	            for (var i in renArry) {
	                vdata.push({
	                	type: i,
	                	data: renArry[i]
	                });
	            }

	            vdata.sort(function(a,b){
	                return a.type.localeCompare(b.type);
	            });
	           return vdata;
			}
		},
		mounted () {
			var self =this;
			setTimeout(function(){
				self.cityName ='定位失败，请在设置后台允许获取位置…'
				console.log(self.cityName)
			},1600)
		}
	})
})()
