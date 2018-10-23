$(function(){
	let all_poker = [];	//声明一个数组用来保存牌堆数据
	for(let i=1;i<=13;i++){	//在数组添加牌堆数据
		for(let j=0;j<4;j++){
			all_poker.push({num:i,color:j});	//num代表牌的大小，color代表牌的花色
		}
	}
	all_poker.push({num:14,color:0});	//添加小王
	all_poker.push({num:14,color:1});	//添加大王
	// console.log(all_poker);


	// let player1 = {name:'小明',integral:1000,poker:[],role:0};	//声明玩家1的数据，名字，积分，牌型，身份
	// let player2 = {name:'小红',integral:1000,poker:[],role:0};	//声明玩家2的数据，名字，积分，牌型，身份
	// let player3 = {name:'小军',integral:1000,poker:[],role:0};	//声明玩家3的数据，名字，积分，牌型，身份

	//用于保存玩家数据
	let player = [
		{name:'小明',integral:1000,poker:[],role:0},	//声明玩家1的数据，名字，积分，牌型，身份
		{name:'小红',integral:1000,poker:[],role:0},	//声明玩家2的数据，名字，积分，牌型，身份
		{name:'小军',integral:1000,poker:[],role:0},	//声明玩家3的数据，名字，积分，牌型，身份
	];


	//用于保存玩家当前游戏具体情况的数据
	let game ={
		boss:null,	//当前游戏的地主角色
		select_poker:{	//当前玩家选择中的牌组数据
			poker:[],	//玩家选中牌组的具体数组数据
			type:0,		//玩家选中牌组的牌型
			max:0		//玩家牌型中的对比值
		},	
		desktop_poker:{	 //当前桌面上的牌组数据
			poker:[],	//桌面牌组的具体数组数据
			type:0,		//桌面牌组的牌型
			max:0		//桌面牌型中的对比值
		},	
	};



	let poker_str= '';	//创建一个变量用于保存54个li
	for(let i=0;i<54;i++){
		poker_str +='<li class="back" style="top:-'+i+'px;"></li>';
	}
	$('.all_poker').append(poker_str);	//在class名为all_poker的ul里面添加li



	let click = 0;	//声明一个点击次数的值
	// $('body').on('click','.all_poker li',function(){	//绑定li的多次点击事件
	// 	if(click == 0){	//当点击次数为0时，调用洗牌动画函数
	// 		clearPoker();
	// 	}else if(click == 1){	//当点击次数为1时，调用发牌动画函数
	// 		deal();	//当前调用一次
	// 	}
	// });

	let status = true;	//设置点击的状态值（防止多次点击造成多次触发函数）

	//封装洗牌函数动画
	function clearPoker(){	
		for(let i=0;i<3;i++){	//打乱牌堆数据的排序（洗牌）
			all_poker.sort(function(x,y){
				return Math.random()-0.5;	//当x小于y，数据就调换位置；当x大于y，数据就不用调换位置
			});
		}

		if(status){	//状态值为true时，执行函数
			let $all = $('.all_poker');	//用于保存原始牌堆
			$('.all_poker').remove();	//删除原始牌堆

			//创建三个洗牌临时牌堆
			let temp_html = '';	
			for(let i=0;i<54;i++){
				temp_html +='<ul class="all_poker" style="top:-'+i*275+'px  ">';
				// for(let j=0;j<18;j++){
					temp_html +='<li class="back" style="top:-'+i+'px" ></li>';
				// }
				temp_html +='</ul>';
			}
			$('.mid_top').append(temp_html);

				
			for(let i=0;i<54;i++){
			 if(i % 3 == 0){	
					setTimeout(function(){
							$('.back').eq(i).css({
								transform:' rotateZ(360deg)  translate(-800px,400px)',
								transition:'2s'
							});
						},50*i);
						setTimeout(function(){
							$('.back').eq(i).css({
								transform:'rotateZ(720deg) translate(0px,0px)',
								transition:'2s'
							});
						},1700+i*20);
				}else if(i % 3 == 1){
					setTimeout(function(){
							$('.back').eq(i).css({
								transform:' rotateZ(-360deg)  translate(800px,400px)',
								transition:'2s'
							});
						},50*i);
						setTimeout(function(){
							$('.back').eq(i).css({
								transform:'rotateZ(-720deg) translate(0px,0px)',
								transition:'2s'
							});
						},1700+i*20);
				}else {
					setTimeout(function(){
							$('.back').eq(i).css({
								transform:' rotateX(-360deg)  translate(0px,800px)',
								transition:'2s'
							});
						},50*i);
						setTimeout(function(){
							$('.back').eq(i).css({
								transform:'rotateX(-720deg) translate(0px,0px)',
								transition:'2s'
							});
						},1700+i*20);
				}
		}


			//在3次洗牌动画结束后，删除三个临时牌堆
			setTimeout(function(){
				$('.all_poker').remove();	

				$('.mid_top').html($all);	//将保存的原始牌堆恢复出来
			},4500); 
			click++;	//点击次数变为1
		}

		//在洗牌动画函数结束后，状态值变为false
		setTimeout(function(){
			status = false;
		},4600);
		
	}


	//封装发牌动画函数
	function deal(num){	//传入一个参数为num，上面调用此函数时num的值为1
		num = num || 0;	//可传入参数，当deal()调用时，参数的值布传入时num的值为0
		let poker_html = '';
		if(status == false){	//状态值为false时，执行发牌动画函数
			if(num < 17){	//当num的值小于17时，
				//发牌给左边玩家
				$('.all_poker li:last').animate({left:'-500px',top:'300px'},20);	//将牌发到指定位置
				setTimeout(function(){	//发牌结束后，在原始牌堆删掉这张牌
					player[0].poker.push(all_poker.pop());  // 把总牌组数据中的最后个元素添加到玩家1，并且删除
					let poker_html = makePoker(player[0].poker[player[0].poker.length-1]);	//每发一张牌，player2.poker的长度就为1，所以调用makePoker方法时，传入的参数就是player2.poker的下标就为0
					$('.play_1').append(poker_html);	
					$('.play_1 li:last').css({top:num*24+'px',transform:'rotateZ(90deg)'});
					$('.play_1').css({top:-12*num+220+'px'});
					$('.all_poker li:last').remove();
				},22);


				//发牌给中间玩家
				setTimeout(function(){
					$('.all_poker li:last').animate({top:'600px'},20);
					setTimeout(function(){
						player[1].poker.push(all_poker.pop());  // 把总牌组数据中的最后个元素添加到玩家2，并且删除
						let poker_html = makePoker(player[1].poker[player[1].poker.length-1]);	//每发一张牌，player2.poker的长度就为1，所以调用makePoker方法时，传入的参数就是player2.poker的下标就为0
						$('.play_2').append(poker_html);	
						$('.play_2 li:last').css({left:num*24+'px'});
						$('.play_2').css({left:-12*num+'px','top':'100px'});
						$('.all_poker li:last').remove();
					},22);
				},24);	//发完第一张220毫秒，第二张发牌时就延时20毫秒发


				//发牌给右边玩家
				setTimeout(function(){
					$('.all_poker li:last').animate({left:'500px',top:'300px'},20);
					setTimeout(function(){
						player[2].poker.push(all_poker.pop());  // 把总牌组数据中的最后个元素添加到玩家3，并且删除
						let poker_html = makePoker(player[2].poker[player[2].poker.length-1]);	//每发一张牌，player2.poker的长度就为1，所以调用makePoker方法时，传入的参数就是player2.poker的下标就为0
						$('.play_3').append(poker_html);	
						$('.play_3 li:last').css({top:-num*24+'px',transform:'rotateZ(90deg)'});
						$('.play_3').css({top:12*num+220+'px'});
						$('.all_poker li:last').remove();
						deal(num+1);	//自定义函数，在一轮第三张牌结束后，再次调用此函数，直到num的值为18时停止调用
					},22);
				},48);	//在发第一张和第二张时，第三张牌是不能动的，因此发第三张时要加上第一张发牌的时间

				click++;
			}else{
				click = 2;
				setTimeout(function(){
					all_play_sort();
					$('.Icon').css({'display':'block'});
				},100);
			}
		}
	}


	// 桌面上洗牌按钮
	$('.riffle').click(function(){
		clearPoker();
		$('.riffle').css('display','none');
		setTimeout(function(){
			$('.deals').css('display','block');
		},4700);
		
	});	

	// $('.deals').css('display','block');
	//桌面上发牌按钮
	$('.deals').click(function(){
		// status = false;
		deal();
		$('.deals').css('display','none');
	});
	




	// 生成牌面HTML代码的函数
	function makePoker(poker_data){	
		let color_arr = [
			[-17, -225],		// 方块花色的坐标
			[-17, -5],			// 梅花花色的坐标
			[-160, -5],			// 红桃花色的坐标
			[-160, -225]		// 黑桃花色的坐标
		];

		let x,y;
		// 判断是否为大小王
		if(poker_data.num < 14){
			// 生成本牌花色坐标
			x = color_arr[poker_data.color][0];  //当传入的color值为0时，color_arr[0][0]，那x的值就为-17
			y = color_arr[poker_data.color][1];	 //当传入的color值为0时，color_arr[0][1]，那x的值就为-255
		}else{	//当poker_data的值大于14时就是大小王
			if(poker_data.color == 0){	//如果poker_data.color的值为0时，那么它就是小王，坐标为（-160，-5）
				x = -160;
				y = -5;
			}else{	//如果poker_data.color的值为1时，那么它就是大王，坐标为（-17，-5）
				x = -17;
				y = -5;
			}
		}

		poker_html = '<li style="width: 125px; height: 175px; background: url(./images/'+poker_data.num+'.png) '+x+'px '+y+'px;" data-num="'+poker_data.num+'" data-color="'+poker_data.color+'"></li>';
		//图片名称由传入的参数决定，当poker_data.num的值为1时，显示第一张图片
		
		return poker_html;

	}


	// 发牌完成后所有玩家的牌进行排序
	function all_play_sort(){
		// 调用牌组排序方法让玩家的手牌数据进行排序
		pokerSort(player[0].poker);
		pokerSort(player[1].poker);
		pokerSort(player[2].poker);
		

		// 使用动画效果让牌组看起进行了自动排序
		$('.play_1 li').remove();	//删除玩家1拿到的牌组
		$('.play_2 li').remove();	//删除玩家2拿到的牌组
		$('.play_3 li').remove();	//删除玩家3拿到的牌组

		for(let i=0; i<17; i++){
			$('.play_1').append('<li class="back"></li>');	//让牌组翻面
			$('.play_1 li:last').css({top:24*i+'px',transform:'rotateZ(90deg)'});	//让每张牌之间有一定的间隔

			$('.play_2').append('<li class="back"></li>');	//让牌组翻面
			$('.play_2 li:last').css({left:24*i+'px'});	//让每张牌之间有一定的间隔

			$('.play_3').append('<li class="back"></li>');	//让牌组翻面
			$('.play_3 li:last').css({top:-24*i+'px',transform:'rotateZ(90deg)'});	//让每张牌之间有一定的间隔
		}


		let poker_html = '';
		setTimeout(function(){
			$('.play_1 li').remove();	//删除翻面的牌组
			$('.play_2 li').remove();	//删除翻面的牌组
			$('.play_3 li').remove();	//删除翻面的牌组

			for(let i=0; i<17; i++){	
				poker_html = makePoker(player[0].poker[i]);	//生成开始拿到的牌型数据，
				$('.play_1').append(poker_html);
				$('.play_1 li:last').css({top:24*i+'px',transform:'rotateZ(90deg)'});
				

				poker_html = makePoker(player[1].poker[i]);	//生成开始拿到的牌型数据，
				$('.play_2').append(poker_html);
				$('.play_2 li:last').css({left:24*i+'px'});


				poker_html = makePoker(player[2].poker[i]);	//生成开始拿到的牌型数据，
				$('.play_3').append(poker_html);
				$('.play_3 li:last').css({top:-24*i+'px',transform:'rotateZ(90deg)'});
			}

			//调用抢地主函数
			getBoss(1);
		}, 500);
	}



	// 对牌组数据进行排序的方法
	function pokerSort(poker_arr){
		poker_arr.sort(function(x, y){
			if(x.num != y.num){
				return y.num - x.num;
			}else {
				return y.color - x.color;
			}
		});
	}


	//抢地主函数
	function getBoss(get_play,cancelNum){	//get_play是用来接收随机数的，当随机数为0时，就是左边玩家，1就是中间玩家，2就是右边玩家
		if(cancelNum === undefined){	//当第一次调用时，两个参数都没有值传入，所以两个参数的值都为undefined，因此用if来判断
			cancelNum = 0;
		}
		if(get_play === undefined){
			get_play = Math.floor(Math.random()*3);
		}
		
		// 调用抢地主倒计时函数
		countDown(get_play,cancelNum);

		//把对应的玩家抢地主的按钮显示
		$('.play_btn').eq(get_play).css({'display':'block'});
		if(get_play == 0){	//左边玩家抢地主按钮显示
			$('.play_btn').eq(0).css({'transform':'rotateZ(90deg)','margin-left':'259px','margin-top':'285px'});
		}else if(get_play == 2){	//右边玩家抢地主按钮显示
			$('.play_btn').eq(2).css({'transform':'rotateZ(-90deg)','margin-left':'-270px','margin-top':'280px'});
		}else{	//中间玩家抢地主按钮显示
			$('.play_btn').eq(1).css({'margin-top':'120px'});
		}

		//绑定抢地主事件
		$('.play_btn').eq(get_play).on('click','.get',function(){
			//隐藏当前的按钮组
			$('.play_btn').css({'display':'none'});

			//抢到地主后清除定时器
			clearInterval(ss);
			//隐藏定时器
			$('.Interval').eq(get_play).css({'display':'none'});

			if(get_play == 0){
				$('.Icon').eq(0).attr('src','./images/dz1.gif');
			}else if(get_play == 1){
				$('.Icon').eq(1).attr('src','./images/dz2.gif');
			}else{
				$('.Icon').eq(2).attr('src','./images/dz3.gif');
			}

			player[get_play].role = 1;	//设置玩家角色为地主

			//地主牌的开牌动画
			poker_html = '';
			$('.all_poker li').remove();	//删除发牌后剩下的三张牌（重叠的）

			$('.music').attr('src','./audio/抢地主.mp3');

			//把最后三张牌的数据发给地主角色玩家
			for(let i=0;i<all_poker.length;i++){
				poker_html = makePoker(all_poker[i]);	//

				//地主牌生成
				$('.all_poker').append(poker_html);

				//地主牌放入玩家牌组
				$('.play').eq(get_play).append(poker_html);
				//中间玩家放牌的方式
				if(get_play == 1){	//中间玩家的放牌方式
					$('.play').eq(1).find('li:last').css({left:(17+i)*24+'px','top':'0px'});
				}else if(get_play == 0){	//左边玩家的放牌方式
					$('.play').eq(0).find('li:last').css({top:(17+i)*24+'px','transform':'rotateZ(90deg)'});
				}else{	//右边玩家的放牌方式
					$('.play').eq(2).find('li:last').css({top:(17+i)*-24+'px','transform':'rotateZ(90deg)'});
				}

				//把总牌组中的最后三张牌数据添加到地主玩家数据中
				player[get_play].poker.push(all_poker[i]);
			}

			//最后三张牌的动画
			$('.all_poker li').eq(0).animate({left:'0px'},400).animate({top:'-90px'},200);
			$('.all_poker li').eq(1).animate({left:'-300px'},400).animate({top:'-90px'},200);
			$('.all_poker li').eq(2).animate({left:'300px'},400).animate({top:'-90px'},200);

			//地主玩家牌重新排序
			setTimeout(function(){
				//删除地主牌放进来后的牌组
				$('.play').eq(get_play).find('li').remove();

				//生成背面的牌组
				for(let i=0;i<20;i++){
					if(get_play == 0){
						$('.play').eq(0).append('<li class="back"></li>');
						$('.play').eq(0).find('li:last').css({top:24*i+'px','transform':'rotateZ(90deg)'});
						$('.play').eq(0).css({top:'20px'});
					}else if(get_play == 2){
						$('.play').eq(2).append('<li class="back"></li>');
						$('.play').eq(2).find('li:last').css({top:-24*i+'px','transform':'rotateZ(90deg)'});
						$('.play').eq(2).css({top:'470px'});
					}else{
						$('.play').eq(1).append('<li class="back"></li>');
						$('.play').eq(1).find('li:last').css({left:24*i+'px'});
						$('.play').eq(1).css({left:-12*i+'px','top':'100px'});

					}
						//需要判定！！！！
					
				}
				setTimeout(function(){
					//地主牌的数据重新排序
					pokerSort(player[get_play].poker);

					//删除生成背面的牌组
					$('.play').eq(get_play).find('li').remove();

					//生成得到地主牌后重新排序的牌组
					let poker_html = '';
					for(let i=0;i<player[get_play].poker.length;i++){
						poker_html = makePoker(player[get_play].poker[i]);
						if(get_play == 1){	//中间玩家的放牌方式
							$('.play').eq(get_play).append(poker_html);
							$('.play').eq(get_play).find('li:last').css({left:24*i+'px'});	//
							$('.play').eq(get_play).css({left:-12*i+'px'});
							$('.play').eq(get_play).css('top','100px');
						}else if(get_play == 0){	//左边玩家的放牌方式
							$('.play').eq(get_play).append(poker_html);
							$('.play').eq(get_play).find('li:last').css({top:24*i+'px','transform':'rotateZ(90deg)'});	//
							$('.play').eq(get_play).css({top:'20px'});
						}else{	//右边玩家的放牌方式
							$('.play').eq(get_play).append(poker_html);
							$('.play').eq(get_play).find('li:last').css({top:-24*i+'px','transform':'rotateZ(90deg)'});	//
							$('.play').eq(get_play).css({top:'470px'});
						}
					}
					//开始出牌阶段
					playPoker(get_play,0);
				},200);
			},500);
		});

		//绑定不抢地主事件
		$('.play_btn').eq(get_play).on('click','.cancel',function(){
			cancelNum++;	//不抢地主次数
			if(cancelNum == 3){	//不抢地主次数为三次时，（也就是三个玩家都不抢地主时），页面刷新
				window.location.href = window.location.href;
				alert('本局没人抢地主，本局刘局！');
			}

			//隐藏当前按钮组
			$('.play_btn').css({'display':'none'});

			//点击不抢地主，清除当前玩家定时器
			clearInterval(ss);
			//隐藏定时器
			$('.Interval').eq(get_play).css({'display':'none'});

			$('.music').attr('src','./audio/不抢地主.mp3');

			//移除本按钮组绑定的事件，防止重复绑定
			$('.play_btn').eq(get_play).find('.get').off('click');
			$('.play_btn').eq(get_play).find('.cancel').off('click');

			get_play = ++get_play > 2 ? 0 : get_play;	//抢地主轮换
			getBoss(get_play,cancelNum);
		});
	}

	//抢地主事件倒计时函数
	function countDown(get_play,cancelNum){
		let s = 150;
		$('.Interval').eq(get_play).css({'display':'block'});
		$('.Interval').eq(get_play).text(s);
		ss = setInterval(function(){
			$('.Interval').eq(get_play).text(s--);
			if(s < 0){
				clearInterval(ss);
				$('.Interval').eq(get_play).css({'display':'none'});
				$('.play_btn').css({'display':'none'});
				cancelNum++;
				if(cancelNum == 3){
					alert('没有玩家抢地主，本局刘局！');
					window.location.href = window.location.href;
				}
				$('.btn_play').eq(get_play).find('.get').off('click');
				$('.btn_play').eq(get_play).find('.cancel').off('click');
				$('.btn_play').css({'display':'none'});
				get_play = ++get_play > 2 ? 0 : get_play;
				getBoss(get_play,cancelNum); 
			}
		},1000);
	}


	//出牌阶段
	function playPoker(index,cancelNum){

		if(game.desktop_poker.poker.length == 0){
			$('.play_btn2').eq(index).find('.pass').attr('disabled',true);
		}else{
			$('.play_btn2').eq(index).find('.pass').attr('disabled',false);
		}
		//初始化所有页面的元素与事件
		$('.play_btn2').css({'display':'none'});

		//解绑选牌事件
		$('.play').off('click','li');

		//解绑出牌事件
		$('.play_btn2').off('click','.play_out');

		//解绑过牌事件
		$('.play_btn2').off('click','.pass');

		//调用出牌定时器函数
		cardInterval(index,cancelNum);

		//先让出牌玩家对应的按钮组显示
		$('.play_btn2').eq(index).css({'display':'block'});
		if(index == 0){	//左边玩家出牌按钮显示
			$('.play_btn2').eq(0).css({'transform':'rotateZ(90deg)','margin-left':'230px','margin-top':'255px'});
		}else if(index == 2){	//右边玩家出牌按钮显示
			$('.play_btn2').eq(2).css({'transform':'rotateZ(-90deg)','margin-left':'-270px','margin-top':'280px'});
		}else{	//中间玩家出牌按钮显示
			$('.play_btn2').eq(1).css({'margin-top':'120px'});
		}

		//绑定选牌事件
		$('.play').eq(index).on('click','li',function(){
			let poker = {};
			poker.num = $(this).attr('data-num');	//设置li中的data-num属性，指定用户选定牌的大小
			poker.color = $(this).attr('data-color');	//设置li中的data-color属性，指定用户选定牌的花色

			if($(this).attr('class') == 'select'){	//取消选定的牌，赋给li一个class名为select的属性，（选中哪张牌，就给这个li添加一个class名为select的属性）

				//删除玩家选中牌组的数据
				$(this).removeClass('select');	//删除这个class名为select的属性

				//调用删除对应牌的数据方法
				delSelect(poker);
			}else{

				//添加玩家选中牌的牌组数据
				game.select_poker.poker.push(poker);
				console.log(game.select_poker.poker);
				$(this).addClass('select');		//添加这个class名为select的属性
			}
		});

		//绑定出牌事件
		$('.play_btn2').eq(index).on('click','.play_out',function(){
			// alert('出牌');

			// 调用检查牌型方法
			checkPoker(game.select_poker);
			if(game.select_poker.type == 0){
				$('.pocess').find('li').eq(0).css({display:'block'});
				setTimeout(function(){
					$('.pocess').find('li').eq(0).css({display:'none'});
				},2000);
			}else{
				//调用选中牌与桌面牌组进行对比的函数
				if(vsPoker()){
					let type = game.select_poker.type;
					let num = game.select_poker.max;
					//调用出牌音效函数
					playcardAudio(type,num);

					//调用出牌动画函数
					animationPoker(game.select_poker);

					//1.删除玩家手牌的数据
					delPlayerPoker(index);

					//1.1执行对应的桌面效果，玩家手牌消失重新整理
					arrangePoker(index);
					//1.2桌面出现新牌
					desktopPoker(index);

					//1.3添加桌面牌组数据
					game.desktop_poker.poker = game.select_poker.poker;
					game.desktop_poker.max = game.select_poker.max;
					game.desktop_poker.type = game.select_poker.type;

					game.select_poker.type = 0;
					game.select_poker.max = 0;
					game.select_poker.poker = [];
					//删除上一张的牌组
					if(index == 0){
						$('.desktopPoke').eq(1).find('li').remove();
						$('.desktopPoke').eq(2).find('li').remove();
					}else if(index == 1){
						$('.desktopPoke').eq(0).find('li').remove();
						$('.desktopPoke').eq(2).find('li').remove();
					}else if(index == 2){
						$('.desktopPoke').eq(1).find('li').remove();
						$('.desktopPoke').eq(0).find('li').remove();
					}

					//抢到地主后清除定时器
					clearInterval(ss);
					//隐藏定时器
					$('.Interval').eq(index).css({'display':'none'});

					// //清空桌面牌组动画定时器
					// clearInterval(animate);
					//1.2桌面出现新牌
					
					//1.3添加桌面牌组数据
					
					//2.先判断是否已经胜出
					//2.先判断是否已经胜出
					if(player[index].poker.length == 0 && player[index].role == 1){
						// alert('地主赢了！');
						$('.desktopPoke').eq(index).find('li').remove(); 
						$('.play_btn2').eq(index).remove();

						//地主胜利动画
						$('.win').attr({'src':'./images/win.gif'});
						if(index == 0){
							$('.dizhu').attr({'src':'./images/dz1_win.gif'});
						}else if(index == 1){
							$('.dizhu').attr({'src':'./images/dz2_win.gif'});
						}else{
							$('.dizhu').attr({'src':'./images/dz3_win.gif'});
						}

						$('.result button').click(function(){
							window.location.href = window.location.href;
						});
					}else if(player[index].poker.length != 0){
						//3.准备让下一个玩家出牌
						index = ++index > 2 ? 0:index;
						playPoker(index,0);
					}else if(player[index].poker.length == 0 && player[index].role == 0){
						// alert('农民赢');
						$('.desktopPoke').eq(index).find('li').remove(); 
						$('.play_btn2').eq(index).remove();
						
						//农民胜利动画
						$('.win').attr({'src':'./images/win.gif'});
						$('.dizhu').attr({'src':'./images/nmwin.gif'});

						$('.result button').click(function(){
							window.location.href = window.location.href;
						});
					}
				}else{
					// alert('打不了！');
					$('.pocess').find('li').eq(1).css({display:'block'});
					setTimeout(function(){
						$('.pocess').find('li').eq(1).css({display:'none'});
					},2000);
				}
			}

		});
		
		//绑定不出牌事件
		$('.play_btn2').eq(index).on('click','.pass',function(){
			//有牌被选定并非打出去的，按不出按钮时退回来（删除全部重新生成）；
			let poker_html = '';
			$('.play').eq(index).find('li').remove();
			for(let i=0;i<player[index].poker.length;i++){
				if(index == 1){
					poker_html = makePoker(player[index].poker[i]);
					$('.play').eq(index).append(poker_html);
					$('.play').eq(index).find('li:last').css({left:i*24+'px'});
					$('.play').eq(index).css('top','100px');
				}else if(index == 0){
					poker_html = makePoker(player[index].poker[i]);
					$('.play').eq(index).append(poker_html);
					$('.play').eq(index).find('li:last').css({top:i*24+'px',transform:'rotateZ(90deg)'});
				}else if(index == 2){
					poker_html = makePoker(player[index].poker[i]);
					$('.play').eq(index).append(poker_html);
					$('.play').eq(index).find('li:last').css({top:i*-24+'px',transform:'rotateZ(90deg)'});
				}
				
			}

			delSelect_one(game.select_poker.poker);

			//抢到地主后清除定时器
			clearInterval(ss);
			//隐藏定时器
			$('.Interval').eq(index).css({'display':'none'});

			//清空桌面牌组动画定时器
			// clearInterval(animate);

			$('.music').attr('src','./audio/要不起.wav');

			index = ++index > 2 ? 0:index;
			cancelNum++;
			if(cancelNum == 2){
				//1.清空桌面牌型数据
				game.desktop_poker.type = 0;
				game.desktop_poker.max = 0;
				game.desktop_poker.poker = [];

				//两次过牌清空桌面牌组
				$('.desktopPoke').eq(index).find('li').remove(); 

				//2.重置过牌次数
				cancelNum = 0;
			}
			playPoker(index,cancelNum);
		});

		//提示按钮
		$('.play_btn2').eq(index).on('click','.tips',function(){
			tipsPoker(index);
		});

	}
	
	// let animate;
	//出牌定时器函数
	function cardInterval(index,cancelNum){
		let s = 150;
		$('.Interval').eq(index).css({'display':'block'});
		$('.Interval').eq(index).text(s);
		ss = setInterval(function(){
			$('.Interval').eq(index).text(s--);
			if(s < 0){
				clearInterval(ss);
				$('.Interval').eq(index).css({'display':'none'});
				$('.play_btn2').css({'display':'none'});
				$('.play').eq(index).find('li').removeClass('select');
				// autoPoker(index);
				cancelNum++;
				if(cancelNum == 2){
					game.desktop_poker.type = 0;
					game.desktop_poker.max = 0;
					game.desktop_poker.poker = [];
				}

				$('.play_btn2').eq(index).find('.play_out').off('click');
				$('.play_btn2').eq(index).find('.pass').off('click');
				$('.play_btn2').css({'display':'none'});
				index = ++index > 2 ? 0:index;
				playPoker(index,cancelNum);
			}
		},1000);
		// animate = setInterval(function(){
		// 	$('.desktopPoke').eq(index).find('li').remove(); 
		// }, 31000);
	}

	//显示提示按钮
	function tipsPoker(index){
		let min ;
		let color;
		let str = [];
		let type = game.desktop_poker.type;
		function minPoker(index){	
			if(game.desktop_poker.poker.length != 0){
				min = game.desktop_poker.poker[game.desktop_poker.poker.length-1].num;
				color = game.desktop_poker.poker[game.desktop_poker.poker.length-1].color;
				for(let i=0;i<=player[index].poker.length-1;i++){
					if(player[index].poker[i].num == 14 && player[index].poker[i].color > color){
						str.push(player[index].poker[i]);
					}else if(player[index].poker > min){
						str.push(player[index].poker[i]);
					}
				}
			}	
		}
		minPoker(index);

		switch(type){
			case 0:
				$('.play').eq(index).find('li:last').trigger('click');
			break;
			//單張
			case 1:
				for(let i=str.length-1;i>=0;i--){
					if(min == 14){
						if(str[i].color > color){
							$('.play').eq(index).find('li').eq(i).trigger('click');
						}
					}else{
						if(str[i].num > min){
							for(let j=0;j<type;j++){
								$('.play').eq(index).find('li').eq(i-j).trigger('click');
								console.log(i-j)
							}
							break;
						}
					}
				}
			break;
			//對子
			case 2:
				for(let i=str.length-1;i>=1;i--){
					if(str[i].num > min && str[i].num == str[i-1].num){
						for(let j=0;j<type;j++){
							$('.play').eq(index).find('li').eq(i-j).trigger('click');
						}
						break;
					}
				}
			break;
			//三張
			case 3:
				for(let i=str.length-1;i>=2;i--){
					if(str[i].num > min && str[i].num == str[i-2].num){
						for(let j=0;j<type;j++){
							$('.play').eq(index).find('li').eq(i-j).trigger('click');
						}
						break;
					}
				}
			break;
			//三帶一
			case 4:
				for(let i=str.length-1;i>=3;i--){
					if(str[i].num > min && str[i].num == str[i-2].num && str[i].num != str[i-3].num ||
						str[i-1].num > min && str[i-1].num == str[i-3].num && str[i].num != str[i-1].num){
						for(let j=0;j<type;j++){
							$('.play').eq(index).find('li').eq(i-j).trigger('click');
						}
						break;
					}
				}
			break;
			
		}
	}


	// 时间到默认出牌函数
	// function autoPoker(index){
	// 	$('.play_btn2').eq(index).find('.tips').trigger('click');
	// 	setTimeout(function(){
	// 		$('.play_btn2').eq(index).find('.play_out').trigger('click');
	// 	},10);
		
	// 	console.log(game.select_poker.poker);
	// 	// console.log(player[index].poker);
	// }


	//删除选中牌组中指定牌的方法
	function delSelect(poker){
		let index = null;	//index是数组game.select_poker的下标
		for(let i=0;i<game.select_poker.poker.length;i++){
			if(game.select_poker.poker[i].num == poker.num && game.select_poker.poker[i].color == poker.color){
				index = i;
				break;
			}
		}
		game.select_poker.poker.splice(index,1);	//删除select_poker数组的一个值
		console.log(game.select_poker.poker);
	}

	//删除不出置顶手牌的数据函数
	function delSelect_one(poker){
		let index = null;	//index是数组game.select_poker的下标
		for(let i=0;i<game.select_poker.poker.length;i++){
			if(game.select_poker.poker[i].num == poker.num && game.select_poker.poker[i].color == poker.color){
				index = i;
				break;
			}
		}
		game.select_poker.poker.splice(index);	//删除select_poker数组的一个值
		console.log(game.select_poker.poker);
	}


	//玩家出牌成功后，删除对应玩家的手牌数据
	function delPlayerPoker(index){
		let select_poker = game.select_poker.poker;
		let player_poker = player[index].poker;
		
		for(let i=0;i<select_poker.length;i++){
			for(let j=0;j<player_poker.length;j++){
				if(select_poker[i].num == player_poker[j].num && select_poker[i].color == player_poker[j].color){
					player_poker.splice(j,1);
					console.log(player_poker);
					// if(player[index].poker.length == 2){
					// 	$('audio').attr('src','./audio/只剩2张.mp3');
					// }else if(player[index].poker.length == 1){
					// 	$('audio').attr('src','./audio/只剩一张.mp3');
					// }
				}
			}
		}
	}


	//封装整理手牌动画
	function arrangePoker(index){
		$('.play').eq(index).find('li').remove();
		let poker_html = '';
		setTimeout(function(){
			for(let i=0;i<player[index].poker.length;i++){
				if(index == 1){
					poker_html = makePoker(player[index].poker[i]);
					$('.play').eq(index).append(poker_html);
					$('.play').eq(index).find('li:last').css({left:24*i+'px'});	
					$('.play').eq(index).css({left:-12*i+'px'});
					$('.play').eq(index).css({top:'100px'});
				}else if(index == 0){
					poker_html = makePoker(player[index].poker[i]);
					$('.play').eq(index).append(poker_html);
					$('.play').eq(index).find('li:last').css({top:24*i+'px','transform':'rotateZ(90deg)'});	
					$('.play').eq(index).css({left:i+'px','top':10*-i+200+'px'});
				}else{
					poker_html = makePoker(player[index].poker[i]);
					$('.play').eq(index).append(poker_html);
					$('.play').eq(index).find('li:last').css({top:-24*i+'px','transform':'rotateZ(90deg)'});	
					$('.play').eq(index).css({left:i+'px','top':i*10+300+'px'});
				}
				
			}	
	
			pokerSort(player[index].poker);
		},100);
			
	}

	//桌面的牌组动画
	function desktopPoker(index){
		game.desktop_poker.poker.push(game.select_poker.poker);
		console.log(game.select_poker.poker);
		let poker_html = '';
		for(let i=0;i<game.select_poker.poker.length;i++){
			if(index == 1){	
				poker_html = makePoker(game.select_poker.poker[i]);
				$('.desktopPoke').eq(index).append(poker_html);
				$('.desktopPoke').eq(index).find('li:last').css({left:24*i+'px'});	
				$('.desktopPoke').eq(index).css({left:-6*i+'px'});
			}else if(index == 0){
				poker_html = makePoker(game.select_poker.poker[i]);
				$('.desktopPoke').eq(index).append(poker_html);
				$('.desktopPoke').eq(index).find('li:last').css({left:24*i+'px'});	
				$('.desktopPoke').eq(index).css({'top':10*-i+200+'px'});
			}else{
				poker_html = makePoker(game.select_poker.poker[i]);
				$('.desktopPoke').eq(index).append(poker_html);
				$('.desktopPoke').eq(index).find('li:last').css({left:-24*i+'px'});	
				$('.desktopPoke').eq(index).css({'top':i*10+300+'px'});
			}
		}
	}




	/**
	 * 检查牌型的方法
	 * @param  object poker_data 需要检查牌型的数据对象
	 * @return {[type]}            [description]
	 *
	 * 牌型代号：
	 * 0：无效
	 * 1：单张
	 * 2：对子
	 * 3：三张
	 * 4：三带一
	 * 5：三带二
	 * 7：四带二
	 * 6: 顺子
	 * 8：连对
	 * 9：飞机带单
	 * 10：飞机带双
	 * 11：双飞机带单
	 * 12：双飞机带对子
	 * 911：普通炸弹
	 * 110：王炸
	 */
	function checkPoker(poker_data){
		//初始化牌型与判断值
		poker_data.type = 0;
		poker_data.max = 0;

		let poker = poker_data.poker;

		//1.为了方便牌型的判断，需要先把选中的牌进行排序
		pokerSort(poker_data.poker);	//调用排序函数

		//2.通过牌的张数来进行各牌的判断
		switch(poker.length){
			//判断1张牌的情况
			case 1:
				poker_data.type = 1;	//设置牌型为单张

				//判断普通单张的判断值
				if(poker[0].num < 14){
					poker_data.max = poker[0].num;
				}else{
					//判断大小王
					if(poker[0].color == 0){
						poker_data.max = 14;	//小王的判断值
					}else{
						poker_data.max = 15;	//大王的判断值
					}
				}
			break;

			//判断两张牌的情况
			case 2:
				//判断两张牌的点数是否一样
				if(poker[0].num == poker[1].num){
					//是否是普通对子还是王炸
					if(poker[0].num < 14){
						poker_data.type = 2;	//设置牌型为对子
						poker_data.max = poker[0].num;
					}else{
						poker_data.type = 110;	//设置牌型为王炸
						poker_data.max = poker[0].num;
						// $('audio').attr('src','./audio/110.mp3');
						// let animate_1 = '';
						// animate_1 = '<div class="animate_11" style="background:url(./images/110.gif) no-repeat;width:895px;height:815px;position:absolute;top:-213px;left:485px;z-index:2"></div>';
						// $('body').append(animate_1);
						// setTimeout(function(){
						// 	$('.animate_11').remove();
						// },2500);
						// $('body').addClass('dou');
						// setTimeout(function(){
						// 	$('body').removeClass('dou');
						// },2500);
					}
				}
			break;

			//判断三张牌的情况
			case 3:
				//判断三张牌的点数是否相等
				if(poker[0].num == poker[2].num){
					poker_data.type = 3;	//设置牌型为三张
					poker_data.max = poker[0].num;	//判断值
				}
			break;

			//判断四张牌的情况
			case 4:
				//判断四张牌的点数是否相等
				if(poker[0].num == poker[3].num){
					poker_data.type = 911;	//设置牌型为普通炸弹
					poker_data.max = poker[0].num;	//判断值
					// $('audio').attr('src','./audio/911.mp3');
					// let animate_1 = '';
					// animate_1 = '<div class="animate_11" style="background:url(./images/911.gif) no-repeat;width:436px;height:240px;position:absolute;top:260px;left:730px;z-index:2"></div>';
					// $('body').append(animate_1);
					// setTimeout(function(){
					// 	$('.animate_11').remove();
					// },1200);
				}else if(poker[0].num == poker[2].num || poker[1].num == poker[3].num){
					poker_data.type = 4;	//设置牌型为三带一
					poker_data.max = poker[1].num;	//判断值
					// $('audio').attr('src','./audio/444.mp3');
				}
			break;

			//判断五张牌的情况
			case 5:
				console.log(checkStraight(poker));
				//判断三带二	33555
				if(poker[0].num == poker[2].num && poker[3].num == poker[4].num || 
					poker[0].num == poker[1].num && poker[2].num == poker[4].num){
					poker_data.type = 5;	//设置牌型为三带二
					poker_data.max = poker[2].num;	//判断值
					// $('audio').attr('src','./audio/555.mp3');
				}else if(checkStraight(poker)){
					poker_data.type = 6;	//设置牌型为顺子
					poker_data.max = poker[poker.length-1].num;	//判断值
				}
			break;

			//判断六张牌的情况
			case 6:
				if(checkStraight(poker)){	//判断顺子
					poker_data.type = 6;	//设置牌型为顺子
					poker_data.max = poker[poker.length-1].num 	//判断值
				}else if(checkStraightPairs(poker)){	//判断连队
					poker_data.type = 8;	//设置牌型连队
					poker_data.max = poker[poker.length-1].num //判断值
				}else if(poker[0].num == poker[3].num || poker[1].num == poker[4].num || poker[2].num == poker[5]){
					poker_data.type = 7;	//设置牌型为四带二
					poker_data.max = poker[3].num;	//判断值
					// $('audio').attr('src','./audio/777.mp3');
				}
			break;

			//判断七张牌的情况
			case 7:
				if(checkStraight(poker)){	//判断顺子
					poker_data.type = 6;	//设置牌型为顺子
					poker_data.max = poker[poker.length-1].num;	//判断值
				}
			break;

			//判断八张牌的情况
			case 8:
				if(checkStraight(poker)){	//判断顺子
					poker_data.type = 6;	//设置牌型顺子
					poker_data.max = poker[poker.length-1].num;	//判断值
				}else if(checkStraightPairs(poker)){	//判断连队
					poker_data.type = 8;	//设置牌型连队
					poker_data.max = poker[poker.length-1].num;	//判断值
				}else if(planePoker(poker)){	//判断飞机带单
					poker_data.type = 9;
					poker_data.max = poker[poker.length-3].num;	//判断值
				}
			break;

			//判断九张牌的情况
			case 9:
				if(checkStraight(poker)){	//判断顺子
					poker_data.type = 6;	//设置牌型顺子
					poker_data.max = poker[poker.length-1].num;	//判断值
				}
			break;

			//判断十张牌的情况
			case 10:
				if(checkStraight(poker)){	//判断顺子
					poker_data.type = 6;	//设置牌型顺子
					poker_data.max = poker[poker.length-1].num;	//判断值
				}else if(checkStraightPairs(poker)){	//判断连队
					poker_data.type = 8;	//设置牌型连队
					poker_data.max = poker[poker.length-1].num;	//判断值
				}else if(planePokerPairs(poker)){
					poker_data.type = 10;	//设置牌型飞机带对子
					poker_data.max = checkStraightFullsMax(poker);	//判断值！！！！！！！！！！！！！！！！！！！！！最大值拿不到
				}
			break;

			//判断十一张牌的情况
			case 11:
				if(checkStraight(poker)){	//判断顺子
					poker_data.type = 6;	//设置牌型顺子
					poker_data.max = poker[poker.length-1].num;	//判断值
				}
			break;

			//判断十二张牌的情况
			case 12:
				if(checkStraight(poker)){	//判断顺子
					poker_data.type = 6;	//设置牌型顺子
					poker_data.max = poker[poker.length-1].num;	//判断值
				}else if(checkStraightPairs(poker)){	//判断连队
					poker_data.type = 8;	//设置牌型连队
					poker_data.max = poker[poker.length-1].num;	//判断值
				}else if(planesPoker(poker)){
					poker_data.type = 11;	//设置牌型双飞机带单
					poker_data.max = checkStraightFullsMax(poker);	//判断值！！！！！！！！！！！！！！！！！！！！！最大值拿不到
				}
			break;

			//十三张没有牌型

			//判断十四张牌的情况
			case 14:
				if(checkStraightPairs(poker)){	//判断连队
					poker_data.type = 8;	//设置牌型连队
					poker_data.max = poker[poker.length-1].num;	//判断值
				}
			break;

			//判断十五张牌的情况
			case 15:
				if(planesPokerPairs(poker)){
					poker_data.type = 12;	//设置牌型双飞机带对子
					poker_data.max = checkStraightFullsMax(poker);	//判断值！！！！！！！！！！！！！！！！！！！！！最大值拿不到
				}

			//判断十六张牌的情况
			case 16:
				if(checkStraightPairs(poker)){	//判断连队
					poker_data.type = 8;	//设置牌型连队
					poker_data.max = poker[poker.length-1].num;	//判断值
				}
			break;

			//十七张没有牌型
			
			//判断十八张牌的情况
			case 18:
				if(checkStraightPairs(poker)){	//判断连队
					poker_data.type = 8;	//设置牌型连队
					poker_data.max = poker[poker.length-1].num;	//判断值
				}
			break;

			//十九张没有牌型
			
			//判断二十张牌的情况
			case 20:
				if(checkStraightPairs(poker)){	//判断连队
					poker_data.type = 8;	//设置牌型连队
					poker_data.max = poker[poker.length-1].num;	//判断值
				}
			break;

		}
	}


	//出牌音效函数
	function playcardAudio(type,num){
		let f = [9,10,11,12];
		let index = f.indexOf(type);
		if(index >= 9){
			type = 9;
		}
		switch(type){	
			case 1:
				$('.music').attr('src','./audio/'+num+'.mp3');
			break;
			case 2:
				$('.music').attr('src','./audio/'+num+'_'+num+'.mp3');
			break;
			case 3:
				$('.music').attr('src','./audio/'+num+'_'+num+'_'+num+'.mp3');
			break;
			case 4:
				$('.music').attr('src','./audio/'+type+type+type+'.mp3');
			break;
			case 5:
				$('.music').attr('src','./audio/'+type+type+type+'.mp3');
			break;
			case 6:
				$('.music').attr('src','./audio/'+type+type+type+'.mp3');
			break;
			case 7:
				$('.music').attr('src','./audio/'+type+type+type+'.mp3');
			break;
			case 8:
				$('.music').attr('src','./audio/'+type+type+type+'.mp3');
			break;
			case 9:
				$('.music').attr('src','./audio/男子飞机.mp3');
			break;
			case 911:
				$('.music').attr('src','./audio/911.mp3');
			break;
			case 110:
				$('.music').attr('src','./audio/110.mp3');
			break;
		}
	}

	//出牌动画函数
	function animationPoker(poker_data){
		//王炸动画
		if(poker_data.type == 110){		
			let animate_110 = '';
			animate_110 = '<div class="animate_110" style="background:url(./images/110.gif) no-repeat;width:895px;height:815px;position:absolute;top:-213px;left:485px;z-index:2"></div>';
			$('body').append(animate_110);
			setTimeout(function(){
				$('.animate_110').remove();
			},2500);
			$('body').addClass('dou');
			setTimeout(function(){
				$('body').removeClass('dou');
			},2500);
		//炸弹动画
		}else if(poker_data.type == 911){	
			let animate_911 = '';
			animate_911 = '<div class="animate_911" style="background:url(./images/911.gif) no-repeat;width:436px;height:240px;position:absolute;top:260px;left:730px;z-index:2"></div>';
			$('body').append(animate_911);
			setTimeout(function(){
				$('.animate_911').remove();
			},2400);
		//顺子动画
		}else if(poker_data.type == 6){		
			let animate_6 = '';
			animate_6 = '<div class="animate_6" style="background:url(./images/sz.gif) no-repeat;width:645px;height:258px;position:absolute;top:300px;left:630px;z-index:2"></div>';
			// $('audio').attr('src','./audio/666.mp3');
			$('body').append(animate_6);
			setTimeout(function(){
				$('.animate_6').remove();
			},3000);
		//连队动画
		}else if(poker_data.type == 8){	
			let animate_8 = '';
			animate_8 = '<div class="animate_8" style="background:url(./images/ld.gif) no-repeat;width:800px;height:315px;position:absolute;top:215px;left:650px;z-index:2"></div>';
			$('body').append(animate_8);
			setTimeout(function(){
				$('.animate_8').remove();
			},2100);
		//飞机动画
		}else if(poker_data.type == 9 || poker_data.type == 10 || poker_data.type == 11 || poker_data.type == 12){	
			let animate_12 = '';
			animate_12 = '<div class="animate_12" style="background:url(./images/fj.gif) no-repeat;width:680px;height:502px;position:absolute;top:85px;left:575px;z-index:2"></div>';
			$('body').append(animate_12);
			setTimeout(function(){
				$('.animate_12').remove();
			},2100);
		}
	}



	/**
	 * 判断牌型是否为顺子
	 * break	用于跳出当前循环（语句）
	 * continue 用于跳过当前循环（语句）
	 * return 直接返回出当前函数的结果，也可以认为是结束函数。如果写在函数外部，可以认为结束程序
	 * 
	 * @param Array poker 牌组的具体数据，用于判断是不是顺子
	 * @return boolean 如果检查的数据是顺子，返回true,否则返回false
	 */
	function checkStraight(poker){
		for(let i=0; i<poker.length-1; i++){
			if((poker[i].num*1) - 1 != poker[i+1].num){
				return false;
			}
		}
		return true;
	}


	/**
	 * 检查牌型是否为连对
	 * @param  Array poker 牌组的具体数据
	 * @return Boolean      如果检查的数据是连对，返回true,否则返回false
	 */
	//4444 jj qq
	//qqjj4444
	function checkStraightPairs(poker){
		//3344556677
		for(let i=0;i<poker.length-3;i+=2){
			if(poker[i].num*1 - 1 != poker[i+3].num || poker[i+1].num*1 - 1 != poker[i+2].num){
				return false;
			}
		}
		return true;
	}


	/**
	 * 检查牌型是否为飞机带单
	 */
	
	//65444333
	//65554443
	//66655543
	function planePoker(poker){
		if(poker.length = 8){
			for(let i=0;i<poker.length-7;i++){
				if((poker[i].num != poker[i+3].num*1 + 1 || poker[i].num != poker[i+2].num || poker[i+3].num != poker[i+5].num) &&
					(poker[i+1].num != poker[i+4].num*1 + 1 || poker[i+1].num != poker[i+3].num || poker[i+4].num != poker[i+6].num) &&
					(poker[i+2].num != poker[i+5].num*1 + 1 || poker[i+2].num != poker[i+4].num || poker[i+5].num != poker[i+7].num)
					){
					return false;
				}
			}
		}
		return true;
	}


	/**
	 * 检查牌型是否为飞机带对子
	 */
	//6655444333
	//6655544433
	//6665554433
	function planePokerPairs(poker){
		if(poker.length == 10){
			for(let i=0;i<poker.length-9;i++){
				if((poker[i].num != poker[i+1].num || poker[i+2].num != poker[i+3].num || poker[i+4].num != poker[i+6].num || poker[i+7].num != poker[i+9].num || poker[i+6].num*1 - 1 != poker[i+7].num) &&
					(poker[i].num != poker[i+1].num || poker[i+2].num != poker[i+4].num || poker[i+5].num != poker[i+7].num || poker[i+4].num*1 - 1 != poker[i+5].num || poker[i+8].num != poker[i+9].num) &&
					(poker[i].num != poker[i+2].num || poker[i+3].num != poker[i+5].num || poker[i+2].num*1 - 1 != poker[i+3].num || poker[i+6].num != poker[i+7].num || poker[i+8].num != poker[i+9].num)
					){
					return false;
				}
			}
		}
		return true;
	}


	/*双飞机带单*/
	//876555444333
	//876665554443
	//877766655543
	//888777666543
	function planesPoker(poker){
		if(poker.length == 12){
			if(	(poker[3].num != poker[5].num || poker[6].num != poker[8].num || poker[9].num != poker[11].num || poker[5].num*1 - 1 != poker[6].num || poker[8].num*1 - 1 != poker[9].num) &&
				(poker[2].num != poker[4].num || poker[5].num != poker[7].num || poker[8].num != poker[10].num || poker[4].num*1 - 1 != poker[5].num || poker[7].num*1 - 1 != poker[8].num) &&
				(poker[1].num != poker[3].num || poker[4].num != poker[6].num || poker[7].num != poker[9].num || poker[3].num*1 - 1 != poker[4].num || poker[6].num*1 - 1 != poker[7].num) &&
				(poker[0].num != poker[2].num || poker[3].num != poker[5].num || poker[6].num != poker[8].num || poker[2].num*1 - 1 != poker[3].num || poker[5].num*1 - 1 != poker[6].num)
				){
				return false;
			}
		}
		return true;
	}
	
	/*双飞机带对子*/
	//887766555444333
	//887766655544433
	//887776665554433
	//888777666554433
	function planesPokerPairs(poker){
		if(poker.length == 15){
			if(	(poker[0].num != poker[1].num || poker[2].num != poker[3].num || poker[4].num != poker[5].num || poker[6].num != poker[8].num || poker[9].num != poker[11].num || poker[12].num != poker[14].num || pokeer[8].num*1 - 1 != poker[9].num || poker[11].num*1 - 1 != poker[12].num) && 
				(poker[0].num != poker[1].num || poker[2].num != poker[3].num || poker[4].num != poker[6].num || poker[7].num != poker[9].num || poker[10].num != poker[12].num || poker[13].num != poker[14].num || poker[6].num*1 - 1 != poker[7].num || poker[9].num*1 - 1 != poker[10].num) &&
				(poker[0].num != poker[1].num || poker[2].num != poker[4].num || poker[5].num != poker[7].num || poker[8].num != poker[10].num || poker[11].num != poker[12].num || poker[13].num != poker[14].num || poker[4].num*1 - 1 != poker[5].num || poker[7].num*1 - 1 != poker[8].num) &&
				(poker[0].num != poker[2].num || poker[3].num != poker[5].num || poker[6].num != poker[8].num || poker[9].num != poker[10].num || poker[11].num != poker[12].num || poker[13].num != poker[14].num || poker[2].num*1 - 1 != poker[3].num || poker[4].num*1 - 1 != poker[6].num)){
				return false;
			}
			
		}
		return true;
	}


	//取飞机最大值的函数
	function checkStraightFullsMax(poker){
		let Numarr = [];
		let Numarr2 = [];
		for(let i=0;i<poker.length;i++){
			if(Numarr[poker[i].num] == undefined){
				Numarr[poker[i].num] = 1;
			}else{
				Numarr[poker[i].num]++;
				if(Numarr[poker[i].num == 3]){
					Numarr2.push([poker[i].num]);
				}
			}
		}
		let Max = '';
		Max = Numarr2[0];
		return Max;
	}




	/**
	 * 用于对比选中的牌型与桌面牌型
	 * @return Boolean  如果选中牌型大于桌面牌型，返回true,否则返回false
	 */
	function vsPoker(){
		//判断桌面没牌，肯定可以打出
		if(game.desktop_poker.poker.length == 0){
			return true;
		}

		//判断打出去的是王炸
		if(game.select_poker.type == 110){
			return true;
		}

		//判断桌面上的牌是王炸
		if(game.desktop_poker.type == 110){
			return false;
		}

		//判断如果桌面上的不是炸弹，选中的是炸弹
		if(game.select_poker.type == 911 && game.desktop_poker.type != 911){
			return true;
		}

		//判断普通牌型
		if(game.select_poker.type == game.desktop_poker.type &&
			game.desktop_poker.poker.length == game.select_poker.poker.length &&
			game.select_poker.max*1 > game.desktop_poker.max*1){

			return true;
		}
		return false;
	}


	





});


