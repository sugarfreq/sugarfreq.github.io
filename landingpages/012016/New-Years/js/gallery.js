function loadInfo(){
	var url = window.location.toString();
	    input = url.split("?");
		end_count = input.length;
		galleryURL=document.getElementsByClassName("galleryURL");
		baseURL = input[end_count-2];


	if (end_count > 1){
		if(url.length > baseURL.length) {

			marketURL = input[end_count-1];

			newGalleryURL = 'http://go.officite.com/gallery/'+marketURL+'/designs/';

			for (var i=0; i < galleryURL.length; i++){
				galleryURL[i].href=newGalleryURL;
			}
			
		} 
	}
}