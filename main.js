
$(document).ready(() => {

	  
	$('#search').on('click',() => {
		let $input = $('#title').val();	
		console.log($input);
		let $tracks = Trackster.searchTracksByTitle($input);
	});
	
});


var Trackster = {};
const API_KEY = '4afba2f94385995edf1831cbb15d7f7b';

/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks. 
*/
Trackster.renderTracks = function(tracks) {

	$("#result").empty();
	let j = 0;
	for (var i in tracks) {

		//	console.log (tracks[i].name);
			j++;

			let $listeners = numeral(tracks[i].listeners).format('0,0');
			let track  = 		
			'<div class="row track">' +     
		    '<span class="col-xs-1"><i class="fa fa-play-circle fa-1x"></i> </span>' +           
            '<span class="col-xs-4">' + j  + "  " + tracks[i].name + '</span>' +
            '<span class="col-xs-4">' + tracks[i].artist + '</span>' +   
         //   '<span class="col-xs-1">'+ tracks[i].listeners+'</span> ' +
            '<span class="col-xs-1">' + $listeners+ '</span> ' +
            '<span class="col-xs-2"> <a href=" ' + tracks[i].image[0]["#text"] + '">Album</a></span>' +              
            '</div>';
            
        // console.log(track);
          $('#result').append(track);  
             
	};

};

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title) {
	
	//title = 'do+you+dance';
 	let orig = 'http://ws.audioscrobbler.com/2.0/?method=track.search&track=' + title + '&api_key=' + API_KEY +
     '&limit=5'+
 	 '&format=json';
	let url =  'http://ws.audioscrobbler.com/2.0/';
	let data = 'method=track.search&track=' + title + '&api_key=' + API_KEY + '&format=json';

	 //console.log(title);

	 	//title = 'claire';
	 	if (title === "") {
	 		 $('#error').html('Please enter a title');            
	 		return;
	 	}

	 	
	  $.ajax({
        type : 'GET',
        url : 'http://ws.audioscrobbler.com/2.0/',
        data : 'method=track.search&' +
               'track='+ title + '&' +
               'api_key=57ee3318536b23ee81d6b27e36997cde&' +
               'limit=25&' +               
               'format=json',
        dataType : 'JSON',
        limit: 5,
        success : function(data) {
           //console.log(data);
             let result = data.results.trackmatches.track;
             // console.log(result);          
             Trackster.renderTracks(result);

        },
        error : function(code, message){
            $('#error').html('Error Code: ' + code + ', Error Message: ' + message);            
        }
    });
   
  
};
