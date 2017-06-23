!(function(){
	var app = new Vue({
		el: '#ashotel',
		data: {
			items: [],
			show: false,
			load: true,
			asShow: false,
			hotelList: [],
			tips: false,
			gethotelbyuserinfo: 'gethotelbyuserinfo'
		},
		created () {
			var that = this;
			setTimeout(() => {
				that.show =true;
				document.getElementsByTagName('body')[0].className ='ash-bg';
				that.load =false;
				let parm ={
					pageNo : 1,
					pageSize: 10,
					wxUnionId :niOpenid.wxUnionId || 123456,
					userId:JSON.parse(window.localStorage.getItem('authority'))?JSON.parse(window.localStorage.getItem('authority')).userid:''
				}
				
				axios.get(hostUrl+that.gethotelbyuserinfo,{params:parm}).then(response => {
				    that.hotelList = response.data.data;
				    that.tips =that.hotelList.length>=1?false:true
				}, response => {
				    console.log(response);
				})
            }, 1500);
		},
		methods: {
			addHotel () {
				//tmsky.ui.dialog.loading('正在跳转，请稍等。。。');
				//this.asShow = true;
				setTimeout(function(){
					//tmsky.ui.dialog.loading.close();
					location.href = 'search.html'
				},1000)
			},
			save () {
				this.asShow = false;
			},
			hotelDetail (id) {
				location.href = 'hotelDetail.html?hotelId='+id
			}
		},
		mounted (){
			 
		}
	})
})()
