function autoClock(){
    var today = new Date()
    var year = today.getFullYear()
    var month = today.getMonth()+1
    var date = today.getDate()
    var weekday = today.getDay()
    switch(weekday) { 
        case 0 : weekday = '일'; break;
        case 1 : weekday = '월'; break;
        case 2 : weekday = '화'; break;
        case 3 : weekday = '수'; break;
        case 4 : weekday = '목'; break;
        case 5 : weekday = '금'; break;
        case 6 : weekday = '토'; break;
    }
    var hours = today.getHours()
    var minutes = today.getMinutes()
    var seconds = today.getSeconds()
    if (hours>=0 && hours<10) {
        hours = '0'+hours
    }
    if (minutes>=0 && minutes<10) {
        minutes = '0'+minutes
    }
    if (seconds>=0 && seconds<10) {
        seconds = '0'+seconds
    }
    
    $('.autoClock > span').eq(0).text(year)
    $('.autoClock > span').eq(1).text(month)
    $('.autoClock > span').eq(2).text(date)
    $('.autoClock > span').eq(3).text(weekday)
    $('.autoClock > span').eq(4).text(hours)
    $('.autoClock > span').eq(5).text(minutes)
    $('.autoClock > span').eq(6).text(seconds)
}
// 이름있는 함수 호출
autoClock()

// p.415 setInterval (함수, 시간) 반복
var timer = setInterval(autoClock, 1000)
// $('.autoClock').hover(
//     function(){
//         clearInterval(timer)
//     },
//     function(){
//         timer = setInterval(autoClock, 1000)
//     }
// )


$('html, body').stop().animate({
    scrollTop : 0
}, 1000)
$('#nav li').eq(0).addClass('on')
var cflag = false;
$('#nav li a').on('click focus', function(e){
    e.preventDefault()
    cflag = true;
    $(this).parent().addClass('on')
    $(this).parent().siblings().removeClass('on')
    var num = $(this).parent().index()
    var secDist = $('section').eq(num).offset().top
    $('html, body').stop().animate({
        scrollTop : secDist
    }, 1000, function(){
        cflag = false
    } )
    
})


function count(jumsu, cname, time) {
    let num = 0;
    var stop = setInterval(function(){
        num++;
        if (num<=jumsu) {
            $(cname).find('.myscore').text(num+'%')
        } else {
            clearInterval(stop)
        }
    },time)
}


var sDist0 = $('#sect1').offset().top
var sDist1 = $('#sect2').offset().top
var sDist2 = $('#sect3').offset().top

// 마지막구간이 윈도우높이보다 클때
var lastSect = $('#sect4').offset().top             
// 마지막구간이 윈도우높이보다 작을때
// var lastSect = $('body').height() - $(window).height()

$(window).on('scroll', function(){
    // var wh = $(this).height()
    var sct = $(this).scrollTop()

    if ( sct>=sDist0 && sct<sDist1 && !cflag ) {
        $('#nav li').eq(0).addClass('on')
        $('#nav li').eq(0).siblings().removeClass('on')
        $('#nav').css({
            top:'20px',
        })
        $('#nav').find('li').css({
            padding:'40px 30px'
        }) 
    } else if ( sct>=sDist1 && sct<sDist2 && !cflag ) {
        $('#nav li').eq(1).addClass('on')
        $('#nav li').eq(1).siblings().removeClass('on')
        
        $('#nav').css({
            top:'0',
        })
        $('#nav').find('li').css({
            padding:'26px 40px'
        })
    
        $('#sect3').removeClass('on')
        $('#sect3 ul li').css({ transitionDelay:'0s' })
    } else if ( sct>=sDist2 && sct<lastSect && !cflag ) {
        $('#nav li').eq(2).addClass('on')
        $('#nav li').eq(2).siblings().removeClass('on')
        $('#sect4').removeClass('on')
        $('#sect3').addClass('on')
        for (let i=0; i<8; i++) {
            $('#sect3 ul li').eq(i).css({ transitionDelay:'0.'+i+'s' })    
        }
        $('#sect4 .formbox').css({
            transitionDelay:'0s'
        })
    } else if ( sct>=lastSect && !cflag ) {
        $('#nav li').eq(3).addClass('on')
        $('#nav li').eq(3).siblings().removeClass('on')
        $('#sect4').addClass('on')
    } 


})


$('.cbtn').on('click',function(){
    if (!$('.skillContainer > div').hasClass('on')) {
        $('.skillContainer > div').addClass('on')
        count(80, '.html',10)
        count(70, '.css',20)
        count(50, '.script',30)
        count(40, '.jquery',40)
        count(60, '.react',50)
       
    } else { 
        $('.skillContainer > div').removeClass('on')
        $('.myscore').text('')
    }
})



$('section').on('mousewheel', function(event, delta){
            
    if (delta>0) {    // 마우스휠을 위로 굴리면 양수
        $('html, body').stop().animate({
            scrollTop: $(this).prev().offset().top
        }, 600)
    } else if (delta<0) {  // 마우스휠을 아래로 굴리면 음수
        $('html, body').stop().animate({
            scrollTop: $(this).next().offset().top
        }, 600)
    }
})


$('.slideInner').slick({
    autoplay: true,
    arrows: false,
    pauseOnHover: false,
    autoplaySpeed:3000,
    dots: true
})
$('.slideOuter .plpa').on('click' ,function(){
    if ( $(this).find('i').hasClass('fa-pause')){
        $('.slideInner').slick('slickPause')
        $(this).find('i').removeClass('fa-pause').addClass('fa-play')
    } else { 
        $('.slideInner').slick('slickPlay')
        $(this).find('i').removeClass('fa-play').addClass('fa-pause')
    }
})
// 세번째 박스
var linum =0;
$('#sect3 ul li a').on('click',function(e){
    e.preventDefault()
    linum = $(this).parent().index()
    var src = $(this).find('img').attr('src')
    var href = $(this).attr('href')
    var title = $(this).attr('title')
    var desc = $(this).attr('data-desc')
    var font =$(this).attr('data-font')
    var color1 = $(this).attr('data-color1')
    var color2 = $(this).attr('data-color2')
    $('body').append('<div class="outlayer"><div class="inlayer"><img src="" alt""><div class="text"><h2></h2><p class="p1"></p><p class="p2"></p><p class="p3"><span></span><span></span></p></div></div></div>')
    $('.outlayer').css({
        position:'fixed',
        backgroundColor:'rgba(0,0,0,0.8)',
        zIndex:9999,
        top:0,
        left:0,
        right:0,
        bottom:0
    })
    $('.inlayer').css({
        position:'relative',
        top:'50%',
        transform:'translateY(-50%)',
        width:'1000px',
        margin:'0 auto',
        textAlign:'center',fontSize:'20px', color:'#fff'
    })
    .append('<button class="close"><i class="fas fa-times-circle"></i></button>')
    .append(`<div><a href="${href}" target="_blank">사이트 이동하기</a></div>`)
    .append('<button class=" prev"><i class="fas fa-angle-left"></i></button><button class=" next"><i class="fas fa-angle-right"></i></button>'
    )
    $('.inlayer button.close').css({
        border:'none',
        position:'absolute',
        top:'-25px', right:'-25px',
        backgroundColor:'none',
        color:'#fff',
        fontSize:'50px'
    })
    $('.inlayer .prev').css({
        position:'absolute',
        top:'50%', transform:'translateY(-50%)',
        left:'-100px',fontSize:'80px',color:'#fff',
        border:'none'
    })
    $('.inlayer .next').css({
        position:'absolute',
        top:'50%', transform:'translateY(-50%)',
        right:'-100px',fontSize:'80px',color:'#fff',
        border:'none'
    })
    $('.inlayer .text').css({
        display:'inline-block',
        width:"40%",
        height:'300px',
        backgroundColor:'#fff',
        verticalAlign:'middle',
        color:'#000'
    })
    $('.inlayer .text h2').text(title).css({
        fontSize:'30px',
        textAlign:'center',
        color:'green',
        margin:'10px 0'
    })
    $('.inlayer .text .p1').text(desc).css({
        padding: '10px',
        fontSize: '14px',
        marginBottom: '10px'
    })
    $('.inlayer .text .p2').text(font)
    $('.inlayer .text .p3 span').eq(0).before(color1)
    $('.inlayer .text .p3 span').eq(0).css({
        padding:'4px 30px',
        backgroundColor:color1,
        margin:'0 20px 0 5px'
    })
    $('.inlayer .text .p3 span').eq(1).before(color2)
    $('.inlayer .text .p3 span').eq(1).css({
        padding:'4px 30px',
        backgroundColor:color2,
        margin:'0 0 0 3px'
    })

    $('.inlayer img').attr('src', src).css({
        width:'50%',
        verticalAlign:'middle',
        marginRight:'10px'
    })
    
})

$('body').on('click','.outlayer', function(){
    // p.498
    $('.outlayer').remove()
})
$('body').on('click','.inlayer a, .inlayer img, .inlayer .text', function(e){
    e.stopPropagation()
})

function gallery(num) {
    let href = $('#sect3 ul li').eq(num).find('a').attr('href')
    let src = $('#sect3 ul li').eq(num).find('img').attr('src')
    let alt = $('#sect3 ul li').eq(num).find('img').attr('alt')
    $('.inlayer a').attr('href',href)
    $('.inlayer img').attr({
        'src' :src,
        'alt' :alt 
    })
}

$('body').on('click','.inlayer .next',function(e){
    e.preventDefault()
    e.stopPropagation()
    linum++
    if (linum>7) { 
        linum = 0
    }
    gallery(linum)
})
$('body').on('click','.inlayer .prev',function(e){
    e.preventDefault()
    e.stopPropagation()
    linum--
    if (linum<0) { 
        linum = 7
    }
   gallery(linum)
})