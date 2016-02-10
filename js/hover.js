//hover.js

/*$(document).ready(function(){
  function menuSlide(navID){
    var navElement = document.getElementById(navID);
    var movement = parseInt(navElement.style.top)

    navElement.style.top = (movement+10)+'px';

    if (navElement.style.top !== '53px'){
      console.log('position='+navElement.style.top);
      setTimeout(menuSlide(navID), 2000);
    }
  }

  $('a.nav-hover').mouseover(function(){
     var menuID = $(this).next('a').attr('id');

     setTimeout(menuSlide(menuID), 300);
   });
});*/



/*$(document).ready(function(){
    $('a.nav-hover').mouseover( function(){
        if ( $(this).next('a.nav-show').is(':hidden')) {
          $(this).next('a.nav-show').delay(300).slideDown(400);
        };

      $('a.nav-show').mouseout( function(){
        $(this).slideUp(400);
      });
      $('a.nav-hover').mouseout( function(){
        $(this).next('a.nav-show').slideUp(400);
      });

        //$(this).next('a.nav-show').slideToggle(400);

    });
})*/

$(document).ready(function(){
    $('.nav-hover').mouseover(function(){
        $(this).next('.nav-show').slideToggle(400);
        $(this).addClass('engage');
    });

    $('.nav-hover').mouseout(function(){
        $(this).next('.nav-show').slideToggle(400);
        $(this).removeClass('engage');
    });



})