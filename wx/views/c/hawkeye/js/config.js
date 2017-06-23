var isHost = /\w+?\.(member|fangbaba)\.com/.test(location.host);

var hostApi = isHost ? '//member.fangbaba.com/' : '//member.fangbaba.cc/';

let dom = document.getElementsByTagName('section')[0]

var myObject = (function(){

    return {
        hawTost : function(ops){
        	let str =[];
        	str.push(`<div class="cpt_mask_dailog" ref="show">
				<div class="div_dailog c-confirm">
					<div class="title_dailog">解除追踪</div>
					<div class="discription_dailog">
						<p class="p-count">确认不再关注当前酒店信息？</p>
					</div>
					<div class="dailog_divOperation">
						<span class="btn_cancel" @click="cancel" data-name="取消">取消</span>
						<span class="btn_save" @click="save" data-name="绑定">绑定</span>
					</div>
				</div>
			</div>`);
			return str.join('');
        },
        hawComfir : function(){
        	let str =[`<div class="cpt_mask_dailog">
	                <div class="div_dailog">
	                    <div class="title_dailog text_slv" v-text="detail.a"></div>
	                    <div class="discription_dailog">
	                        <p class="p-title">酒店地址：</p>
	                        <p class="p-count" v-text="detail.b"></p>
	                    </div>
	                    <div class="discription_dailog">
	                        <p class="p-title">酒店评分：</p>
	                        <p class="p-count"><i v-text="detail.c"></i><em>分</em></p>
	                    </div>
	                    <div class="dailog_divOperation">
	                        <span class="btn_cancel" @click="cancel" data-name="取消">取消</span>
	                        <span class="btn_save" @click="save" data-name="绑定">绑定</span>
	                    </div>
	                </div>
	            </div>`]
	            return str.join('')
        }
    };        
}());