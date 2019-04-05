/* The source was adapted from the code on https://codepen.io/adamjacob/pen/yNmMxX*/
$('.water').css('width', $('body').width()*2);
$('.water').css('height', $('body').width()*2);
$('.water_1').css('width', $('body').width()*2);
$('.water_1').css('height', $('body').width()*2);
$('.water_2').css('width', $('body').width()*2);
$('.water_2').css('height', $('body').width()*2);
$('.water_3').css('width', $('body').width()*2);
$('.water_3').css('height', $('body').width()*2);
function showAchievement(){
    $(".achievement-overlay").css("width","100%");
    console.log("test");
    $(".achievement-picture").css("left","200px");
    
    $("#achievement-hide-button").css("left","60%");
    if(localStorage.getItem("quiz")){
        $(".reward-1").attr("src","images/puzzlepart1.png");
    }
    if(localStorage.getItem("histquiz")){
        $(".reward-2").attr("src","images/puzzlepart2.png");
    }
    if(localStorage.getItem("artquiz")){
        $(".reward-3").attr("src","images/puzzlepart3.png");
    }
    if(localStorage.getItem("artquiz") && localStorage.getItem("histquiz") && localStorage.getItem("quiz")){
        $(".reward-4").attr("src","images/puzzleicon.png");
    }
};
function hideAchievement(){
    console.log("text");
    $(".achievement-overlay").css("width","0%");
    $(".achievement-picture").css("left","-1200px");

}