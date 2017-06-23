!(function(){
	//过滤器
	Vue.filter('uppercase', function(value) {
		return value?value.substr(5,value.length):'---';
	})
	Vue.filter('price', function(fen,a,b) {
		var money = Math.round(fen);
	    if (!money) {
	        return "";
	    }
	    money = money.toString()
	    var before = money.substr(0, money.length - 2);
	    var end = money.substr(money.length - 2, 2);
	    money = before + "." + end;
	    var re = /(-?\d+)(\d{3})/;
	    return parseInt(money);
	})
	var urlParams = tmsky.util.urlParams()
	var app = new Vue({
		el: '#detail',
		data: {
			 flgShow: false,
			 url: {
				bundlstatus: 'bundlstatus', //酒店绑定/解绑接口
				gethotelbyid: 'gethotelbyid',  //酒店基本信息
				roomHotel: 'roomStatusChangeNotice'
			},
			itemsInfo: '',
			hotelData: '',
			roomData:[],
			aa:['111','222','333'],
			prizeList: [
	        { name: 0 }
	      ],
	      activeIndex: 0
		},
		created () {
			this.gethotelbyid();
			this.roomHotel();
			//this.roomData = this.arrs(this.roomData);
		},
		methods: {
			roomHotel () {
				var that = this;
				axios({
					method:'get',
					url: hostUrl+that.url.roomHotel,
					responseType:'stream',
					params:{
						wxUnionId: urlParams.wxUnionId || 123456,
						msgId: urlParams.msgId || 'mHHtd7vb',
						userId: urlParams.userId || 1
					}
				}).then(response => {
					that.itemsInfo = response.data.data;
					that.roomData = that.arrs(response.data.data.result);
				}, error => {
				    console.log('error')
				})
			},
			relieve () {
				const me = this;
				me.flgShow = true;
				me.$refs.show.style.display = 'block';
				//me.$refs.show.style.display = 'block'
			},
			cancel () {
				this.flgShow = false;
			},
			save (id) {

				var that = this;
				let parm ={
					bundlingFlag :0,
					hotelId: id,
					wxUnionId :123456 
				}
				axios.get(hostUrl+this.url.bundlstatus,{params:parm}).then(response => {
				    that.itemsInfo = response.data.data;
				    this.flgShow = false;
					setTimeout(function(){
						location.href = 'ashotel.html'
					},800)
				    tmsky.ui.dialog.loading.close();
				}, response => {

				})
			},
			gethotelbyid () {
				tmsky.ui.dialog.loading('正在加载，请稍等。。。');
				var that = this;
				let parm ={
					hotelId: urlParams.hotelId,
					wxUnionId : urlParams.wxUnionId ||  123456
				}
				axios.get(hostUrl+that.url.gethotelbyid,{params:parm}).then(response => {
				    that.hotelData = response.data.data?JSON.parse(response.data.data):'';
				    document.title = that.hotelData.hotelName;
				    tmsky.ui.dialog.loading.close();
				}, response => {

				})
			},
			arrs (items) {
				var renArry = new Array();

	            for (var i in items) {
	                if (renArry.hasOwnProperty(items[i].goodsId)){
	                    renArry.push({
	                    	goodsId:items[i].goodsId,
	                    	roomName:items[i].roomName,
	                    	data:items[i],
	                    	roomFacilitieList:items[i].roomFacilities?items[i].roomFacilities:''
	                    })
	                }
	                else{
	                	renArry.push({
	                    	goodsId:items[i].goodsId,
	                    	roomName:items[i].roomName,
	                    	data:items[i],
	                    	roomFacilitieList:items[i].roomFacilities?items[i].roomFacilities:''
	                    })
	                    //renArry[items[i].goodsId] = [items[i]];
	                }
	            }
	           	
	            var vdata = [],gdName =[];

	            for (var i in renArry) {
	                vdata.push({
	                	goodsId: i,
	                	roomName:renArry[i].roomName,
	                	goodName:renArry[i].roomFacilitieList?JSON.parse(renArry[i].roomFacilitieList):'',
	                	item: {
	                		data:renArry[i].data
	                	}
	                });
	            }
	           return vdata;
			}
		}
	})
})()
