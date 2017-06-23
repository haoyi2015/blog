!(function(){
	let fag =true;
	var app = new Vue({
		el: '#hotel',
		data: {
			dailogFlag: false,
			sVal:'',
			showFlag: false,
			url: {
				bundlstatus: 'bundlstatus', //酒店绑定/解绑接口
				gethotelbyname: 'gethotelbyname'  //酒店列表
			},
			cityV:JSON.parse(window.localStorage.getItem("city")),
			items: [],
			detail:'',
			nowPage: 1,
            switchShow: false
		},
		methods: {
			bindHotel (ops) {
				var that = this
					that.detail = ops;
					that.dailogFlag =true;
					console.log(that.detail)
			},
			cancel () {
				this.detail ='';
				this.dailogFlag =false;
			},
			save (id) {

				var that = this;
				let parm ={
					bundlingFlag:1,
					hotelId: id,
					wxUnionId:niOpenid.wxUnionId || 123456
				}
				axios.get(hostUrl+this.url.bundlstatus,{params:parm}).then(response => {
					this.dailogFlag =false;
					this.showFlag = true;
					window.localStorage.setItem("bhotel",JSON.stringify(that.detail))
					setTimeout(function(){
						location.href = 'hotelDetail.html?hotelId='+id
					},800)
				    tmsky.ui.dialog.loading.close();
				}, response => {
				})
			},
			search () {
				this.nowPage =1;
				this.items =[];
				this.moreGet();
			},
			moreGet (){
				if(fag){
					fag =false;
					var sMe =this;
					let parm ={
						pageNo :sMe.nowPage,
						pageSize: 8,
						cityCode: sMe.cityV.cityId || '' ,
						hotelName :sMe.sVal || '',
						wxUnionId:niOpenid.wxUnionId || 123456
					}
					tmsky.ui.dialog.loading('正在加载，请稍等。。。');
					axios.get(hostUrl+this.url.gethotelbyname,{params:parm}).then(response => {
					    sMe.items = sMe.items.concat(JSON.parse(response.data.data))
					    sMe.switchShow = !sMe.switchShow;
					    tmsky.ui.dialog.loading.close();
					    fag =true;
					}, response => {
					})
				}
			},
			getMore: function() {  
                this.switchShow = !this.switchShow;  
                this.nowPage++;  
                this.moreGet(this.nowPage); 
            }
		},
		directives: { // 自定义指令
            scroll: { 
                bind: function(el, binding) {
                    window.addEventListener('scroll', function() {
                    	console.log(document.body.scrollTop + window.innerHeight, el.clientHeight)
                        if (document.body.scrollTop + window.innerHeight >= el.clientHeight-1) {
                            var fnc = binding.value;
                            fnc();
                            fag = true;
                        }  
                    })
                } 
            } 
        }
	})
})()