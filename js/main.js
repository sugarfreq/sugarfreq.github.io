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

    //The maximages global variable must equal the number of thumbnails in the gallery.
    var maximages = 6;
    //Folder name and start of file name of each image file.
    var startpath = "img/port"
    //Filename extension of each image.
    var extension = ".png"
    //links to go with images
    var imgLinkArray = ["http://go.officite.com/HI/dental.html", "http://go.officite.com/NewYear/new-year.html", "http://go.officite.com/New-Years/new-year.html", "http://www.onlinepodiatrysites.com/nov_2015", "http://www.onlinechiro.com/dec_2015", "http://www.theonlinepractice.com/jan_2016" ];

    function showbig(pic){
      document.getElementById("bigpic").src = pic;

      var fileExtension = pic.indexOf(extension);
      var imgNumber = pic.substr(fileExtension - 2, 2);

      var newImgLink = imgLinkArray[imgNumber-1];
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

      var newImage = startpath + newImageNumber + extension;

      var newImgLink = imgLinkArray[newNumber-1];

      imgLink.href = newImgLink;

      showbig(newImage);
    }