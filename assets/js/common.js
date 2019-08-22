$(document).ready(function(){
    $('.footer_icon').mouseover(function(){
        $(".coder_show").fadeIn("slow");
    })
    $('.close').click(function(){
        $(".coder_show").fadeOut("slow");

    })
});