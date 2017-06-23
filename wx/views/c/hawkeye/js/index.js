!(function(){
	const urlParams = tmsky.util.urlParams()
	var app = new Vue({
		el: '#index',
		data: {
			message: 'Hello Vue!',
			items: [],
			show: true,
			ins:false,
			url: {
				userauthoritycheck: 'userauthoritycheck', //用户是否授权接口
				authority: 'authority'  //用户授权接口
			}
		},
		methods: {
			peidui () {
				window.localStorage.setItem('m29',JSON.stringify(urlParams));
				this.userauthoritycheck();
			},
			userauthoritycheck () {
				var that = this;
				axios.get(hostUrl+this.url.userauthoritycheck,{params:{innId: urlParams.hotelInnId || 36072}}).then(response => {

				    if(response.data.data =="true"){
				    	that.authority();
				    }else{
				    	that.authority();
				    }
				}, response => {
				})
			},
			authority () {
				let parm ={
					innId: urlParams.hotelInnId || 36072
				}
				axios.get(hostUrl+this.url.authority,{params:parm}).then(response => {
					if(response.data.data){
						window.localStorage.setItem('authority',response.data.data);
					}
					location.href = 'ashotel.html'
 				}, response => {
				})
			}
		},
		mounted () {
			this.ins = true;
		}
	})
})()
