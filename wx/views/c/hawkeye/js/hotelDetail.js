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
	     // while (re.test(money)) {//都好分割
	    //     money = money.replace(re, "$1,$2")
	    // }
	    return parseInt(money);
	})
	var urlParams = tmsky.util.urlParams()
	var app = new Vue({
		el: '#detail',
		data: {
			 flgShow: false,
			 url: {
				bundlstatus: 'bundlstatus',     //解绑接口
				gethotelbyid: 'gethotelbyid',  //酒店基本信息
				getRoomInfo: 'getRoomInfo'     //根据酒店Id获取房态信息查询接口
			},
			itemsInfo: '',
			hotelData: '',
			roomData: ''
		},
		created () {
			this.gethotelbyid();
			this.getRoomInfo();
		},
		methods: {
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
					wxUnionId :niOpenid.wxUnionId || 123456 
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
					hotelId: urlParams.hotelId || '',
					wxUnionId :niOpenid.wxUnionId || 123456 
				}
				axios.get(hostUrl+that.url.gethotelbyid,{params:parm}).then(response => {
				    that.hotelData = response.data.data?JSON.parse(response.data.data):'';
				    document.title = that.hotelData.hotelName;
				    tmsky.ui.dialog.loading.close();
				}, response => {

				})
			},
			getRoomInfo () {
				var that = this;
				let parm ={
					hotelId: 301 || urlParams.hotelId,
					wxUnionId :niOpenid.wxUnionId || 123456,
					from: '',
					to: ''
				}
				axios.get(hostUrl+this.url.getRoomInfo,{params:parm}).then(response => {
				    that.itemsInfo = response.data.data;
				    that.roomData = that.arrs(response.data.data);
				    this.flgShow = false;
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
