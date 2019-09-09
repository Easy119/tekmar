$(document).ready(function(){
    $('.footer_icon').mouseover(function(){
        $(".coder_show").fadeIn("slow");
    })
    $('.coder_show').mouseleave(function(){
        $(".coder_show").fadeOut("slow");

    })
    $('.notice_us').mouseover(function(){
        $('.show_us').fadeIn('slow')
    })
    $('.notice_us').mouseleave(function(){
        $('.show_us').fadeOut('slow')
    })
});