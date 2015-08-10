$(document).ready(function(){

	$('#nav_tab').click(function(){
		$('aside').slideToggle();

	});

	$('aside h2').click(function(){
        if( $(this).next('div').is(':hidden')) {
            $('aside div').slideUp('fast');
        };
        $(this).next('div').slideToggle('slow');
    });

    $('aside h3').click(function(){
        if( $(this).next('div').is(':hidden')) {
            $('aside div').slideUp('fast');
        };
        $(this).next('div').slideToggle('slow');
    });

	var iFrameSRC = document.getElementById('feature').src;


		


		$('aside div>img').click(function(){
			//get image source when clicked
			var sampleSRC = $(this).attr('src');

			//seperate out file name
			var sampleFileStart = sampleSRC.indexOf('img/');
				sampleFileEnd = sampleSRC.indexOf('.png');
				sampleFile = sampleSRC.substring(sampleFileStart+4, sampleFileEnd);
				FileType = sampleSRC.split('/');

				if (FileType[1] == 'landingpages') {

					iFrameSRC = sampleFile+'/index.html';

				} else {
					iFrameSRC = sampleFile+'.html';
				}

				console.log('FileType :', sampleSRC);

			document.getElementById('feature').src = iFrameSRC;
		});

		
    


});