window.onload=function(){
	let playgame=document.getElementById('playgame');
	let leftdoor=document.getElementById('leftdoor');
	let rightdoor=document.getElementById('rightdoor');
	// playgame.onmousemove=function(){
	// 	playgame.style.width = '120px';
	// 	playgame.style.height = '120px';
	// 	playgame.style.marginTop = '-10px';
	// 	playgame.style.marginLeft = '-10px';
	// }
	// playgame.onmouseout=function(){
	// 	playgame.style.width = '110px';
	// 	playgame.style.height = '110px';
	// }
	playgame.onclick=function(){
		// $('.gif').css('display','block');
		$('.playgame').remove();

		setTimeout(function(){
			$('video').css('display','block');
			$('button').css('display','block');
		},300);


	$('.bt1').click(function(){
		$('video').animate({'opacity':'0'},1000);
		$('.bt1').remove();
		$('.bt2').remove();
		setTimeout(function(){
			// $('video').css('display','none');
			$('video').remove();
			// $('.bg').css('display','block');
			// $('.bg').animate({'opacity':'1'},1000);
			$('.bg_music').attr('src','./audio/bg_music.mp3');
		},1000);	
	});
				
	$('.leftdoor').animate({left:'-1000px'},2000);

				
		setTimeout(function(){
			$('.leftdoor').remove();
		},2000);

			
	$('.rightdoor').animate({right:'-1000px'},2000);
				
		setTimeout(function(){
			$('.rightdoor').remove();
		},2000);				
	}

$('.all_poker li').hide();
$('.operate').hide();
$('.bt1').click(function(){
	$('.all_poker li').show();
	$('.operate').show();
});

$('.bt2').click(function(){
	$('.all_poker li').show();
	$('.operate').show();
});		
// 	$(function(){
//    $('#pic1').hide();
//    $('#pic2').hide();
//    $('#pic3').hide();
//    $('#pic4').hide();
//    function picShow(the){
//       $("#pic"+(the+1)).hide(1000,function(){
//          the=(the+1)%4;
//          $("#pic"+(the+1)).show(1000,function(){
//             picShow(the);
//          });
//       });
//    };
//    picShow(0);
// });
}