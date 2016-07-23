$(document).ready(function(){
    $('.nav-hover').mouseover(function(){
        $(this).next('.nav-show').slideToggle(400);
        $(this).addClass('engage');
    });

    $('.nav-hover').mouseout(function(){
        $(this).next('.nav-show').slideToggle(400);
        $(this).removeClass('engage');
    });
});

// keep label above form inputs after information has been entered
function moveLabel(formInput){
    var dataEmpty = document.getElementById(formInput);
        inputID = "#"+formInput;
        placeHolder = $(inputID).attr('placeholder');

        console.log('placeHolder', placeHolder);

    if ((dataEmpty.value.length > 0) || (placeHolder.length > 0)){
        $(inputID).addClass('entered');

     } else {
      $(inputID).removeClass('entered');
    }

}

$("#name").change(function(){
    moveLabel("name");
});
$("#email").change(function(){
    moveLabel("email");
});
$("#message").change(function(){
    moveLabel("message");
});

$('#contact-form').on('submit', function(){

    moveLabel("name");
    moveLabel("email");
    moveLabel("message");
});

//Carousel JS

    //Folder name
    var startpath = "img/";
    var extension = ".png";

    function showbig(pic){
      document.getElementById("bigpic").src = pic;

      var fileExtension = pic.indexOf(extension);
      var imgNumber = pic.substr(fileExtension - 2, 2);

      var newImgLink = "http://sugarfreq.github.io/" + linkRoot + imgLinkArray[imgNumber-1];
      document.getElementById("imglink").href = newImgLink;

    }

    function calcslide(x){
      var currentImage = document.getElementById("bigpic").src;
      var fileExtension = currentImage.indexOf(extension);
      var imgNumber = currentImage.substr(fileExtension - 2, 2);
      var newNumber = parseInt(imgNumber) + x;
      var imgLink = document.getElementById("imglink");

      if (newNumber < 1){
        newNumber = maximages;
      }

      if (newNumber > maximages){
        newNumber=1;
      }

      var newImageNumber = ("0" + newNumber).slice(-2);

      var newImage = startpath + fileName + newImageNumber + extension;

      var newImgLink = imgLinkArray[newNumber-1];

      imgLink.href = newImgLink;

      showbig(newImage);
    }

    function loadCarousel(options){
      maximages = options.maximages;
      fileName = options.fileName;
      imgLinkArray = options.imgLinkArray;
      linkRoot = options.linkRoot;
    }
