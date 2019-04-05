$(document).ready(function() {
    $('#hamburger').on('click', function() {
      $('#list').toggleClass('height-auto');
      $('nav').toggleClass('height-fixed');
  
    })
  
  })
  
  var swiper = new Swiper('.swiper-container', {
  speed: 600,
  parallax: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
function resetQuiz(){
  localStorage.removeItem("quiz");
  localStorage.removeItem("histquiz");
  localStorage.removeItem("artquiz");
  $(".reward-1").attr("src","../images/board.jpg");
  $(".reward-2").attr("src","../images/board.jpg");
  $(".reward-3").attr("src","../images/board.jpg");
  $(".reward-4").attr("src","../images/board.jpg");
}
function showAchievement(){
  $(".achievement-overlay").css("width","100%");
  console.log("test");
  $(".achievement-picture").css("left","200px");

  if(localStorage.getItem("quiz")){
      $(".reward-1").attr("src","../images/puzzlepart1.png");
  }
  if(localStorage.getItem("histquiz")){
      $(".reward-2").attr("src","../images/puzzlepart2.png");
  }
  if(localStorage.getItem("artquiz")){
      $(".reward-3").attr("src","../images/puzzlepart3.png");
  }
  if(localStorage.getItem("artquiz") && localStorage.getItem("histquiz") && localStorage.getItem("quiz")){
      $(".reward-4").attr("src","../images/puzzleicon.png");
  }
};
function hideAchievement(){
  console.log("text");
  $(".achievement-overlay").css("width","0%");
  $(".achievement-picture").css("left","-1200px");

}
     


