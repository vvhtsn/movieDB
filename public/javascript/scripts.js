$(document).ready(function(){
	// The base url for all API calls
	var apiBaseURL = 'http://api.themoviedb.org/3/';

	// URL in Authentication. Base URL of image
	var imageBaseUrl = 'https://image.tmdb.org/t/p/';
	
	const nowPlayingURL = apiBaseURL + 'movie/now_playing?api_key=' + apiKey;

	//==============================================================================
	//====================== Get "main" data on default. ====================
	//=================== Change results when buttons are clicked.================
	//==============================================================================
	function mainpage(){
		
		var mainpageHTML = '';
		
		/* Managing the alert message */
		var close = document.getElementsByClassName("closebtn");
		var i;
		for (i = 0; i < close.length; i++) {
		close[i].onclick = function(){
			var div = this.parentElement;
			div.style.opacity = "0";
			setTimeout(function(){ div.style.display = "none"; }, 600);
			}
		}
		
		$('#mainPageContent').append(mainpageHTML);
		$('#mainPage').html("Main Page");
	}
	
	
	
	//==============================================================================
	//====================== Get "now playing" data. ===============================
	//==============================================================================
	function getNowPlayingData(){
		$.getJSON(nowPlayingURL, function(nowPlayingData){
			//we needed to add .results because nowPlayingData is an array.
			for(let i = 0; i<nowPlayingData.results.length; i++){
				// mid = movie ID
				var mid = nowPlayingData.results[i].id;
				
				var thisMovieUrl = apiBaseURL+'movie/'+mid+'/videos?api_key=' + apiKey;

				$.getJSON(thisMovieUrl, function(movieKey){
					
					var poster = imageBaseUrl+'w300'+nowPlayingData.results[i].poster_path;

					var title = nowPlayingData.results[i].original_title;

					var releaseDate = nowPlayingData.results[i].release_date;

					var overview = nowPlayingData.results[i].overview;

					var voteAverage = nowPlayingData.results[i].vote_average;				
				
					var youtubeKey = movieKey.results[0].key;

					var youtubeLink = 'https://www.youtube.com/watch?v='+youtubeKey;
										
					var nowPlayingHTML = '';		
					// added in i to nowPlayingHTML. Without it, only the details for the first movie in the results display in the modal no matter which movie poster you click on.
					nowPlayingHTML += '<div class="col-sm-3 eachMovie">';
						nowPlayingHTML += '<button type="button" class="btnModal" data-toggle="modal" data-target="#exampleModal'+ i + '" data-whatever="@' + i + '">'+'<img src="'+poster+'"></button>'; 	
						nowPlayingHTML += '<div class="modal fade" id="exampleModal' + i +'" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
							nowPlayingHTML += '<div class="modal-dialog" role="document">';
								nowPlayingHTML += '<div class="modal-content col-sm-12">';
									nowPlayingHTML += '<div class="col-sm-6 moviePosterInModal">';
										nowPlayingHTML += '<a href="'+youtubeLink+'"><img src="'+poster+'"></a>'; 
									nowPlayingHTML += '</div><br>';//close trailerLink
									nowPlayingHTML += '<div class="col-sm-6 movieDetails">';
										nowPlayingHTML += '<div class="movieName">'+title+'</div><br>';
										nowPlayingHTML += '<div class="linkToTrailer"><a href="'+youtubeLink+'"><span class="glyphicon glyphicon-play"></span>&nbspPlay trailer</a>' + '</div><br>';	
										nowPlayingHTML += '<div class="release">Release Date: '+releaseDate+'</div><br>';
										nowPlayingHTML += '<div class="overview">' +overview+ '</div><br>';// Put overview in a separate div to make it easier to style
										nowPlayingHTML += '<div class="rating">Rating: '+voteAverage+ '/10</div><br>';
									nowPlayingHTML += '</div>'; //close movieDetails
								nowPlayingHTML += '</div>'; //close modal-content
							nowPlayingHTML += '</div>'; //close modal-dialog
						nowPlayingHTML += '</div>'; //close modal
					nowPlayingHTML += '</div>'; //close off each div

					$('#movie-grid').append(nowPlayingHTML);
					//Without this line, there is nowhere for the posters and overviews to display so it doesn't show up 
					$('#movieGenreLabel').html("Now Playing");
					//h1 will change depending on what is clicked. Will display "Now Playing" in this case.
				})
			}
		}) 
	}
	
	
	//==============================================================================
	//====================== Get movies by genre ===================================
	//==============================================================================

		// Check genreIDs and genre names: 
		// http://api.themoviedb.org/3/movie/:movieID?api_key=<<>>
					//28 = action
					//12 = adventure
					//16 = animation
					//35 = comedy
					//80 = crime
					//18 = drama
					//10751 = family
					//14 = fantasy
					//36 = history
					//27 = horror
					//10402 = music
					//10749 = romance
					//878 = science fiction
					//53 = thriller

	function getMoviesByGenre(genre_id){
		const getMoviesByGenreURL = apiBaseURL + 'genre/' + genre_id + '/movies?api_key=' + apiKey + '&language=en-US&include_adult=false&sort_by=created_at.asc';
		// console.log(getMoviesByGenreURL);

		$.getJSON(getMoviesByGenreURL, function(genreData){
			for(let i = 0; i<genreData.results.length; i++){
				var mid = genreData.results[i].id;
				var thisMovieUrl = apiBaseURL+'movie/'+mid+'/videos?api_key=' + apiKey;

				$.getJSON(thisMovieUrl, function(movieKey){
					var poster = imageBaseUrl+'w300'+genreData.results[i].poster_path;
					var title = genreData.results[i].original_title;
					var releaseDate = genreData.results[i].release_date;
					var overview = genreData.results[i].overview;
					var voteAverage = genreData.results[i].vote_average;				
					var youtubeKey = movieKey.results[0].key;
					var youtubeLink = 'https://www.youtube.com/watch?v='+youtubeKey;
					var genreHTML = '';
					genreHTML += '<div class="col-sm-3 col-md-3 col-lg-3 eachMovie">';
						genreHTML += '<button type="button" class="btnModal" data-toggle="modal" data-target="#exampleModal'+ i + '" data-whatever="@' + i + '">'+'<img src="'+poster+'"></button>'; 	
						genreHTML += '<div class="modal fade" id="exampleModal' + i +'" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
							genreHTML += '<div class="modal-dialog" role="document">';
								genreHTML += '<div class="modal-content col-sm-12 col-lg-12">';
									genreHTML += '<div class="col-sm-6 moviePosterInModal">';
										genreHTML += '<a href="'+youtubeLink+'"><img src="'+poster+'"></a>'; 
									genreHTML += '</div><br>';//close trailerLink
									genreHTML += '<div class="col-sm-6 movieDetails">';
										genreHTML += '<div class="movieName">'+title+'</div><br>';
										genreHTML += '<div class="linkToTrailer"><a href="'+youtubeLink+'"><span class="glyphicon glyphicon-play"></span>&nbspPlay trailer</a>' + '</div><br>';	
										genreHTML += '<div class="release">Release Date: '+releaseDate+'</div><br>';
										genreHTML += '<div class="overview">' +overview+ '</div><br>';
										genreHTML += '<div class="rating">Rating: '+voteAverage+ '/10</div><br>';									
									genreHTML += '</div>'; //close movieDetails
								genreHTML += '</div>'; //close modal-content
							genreHTML += '</div>'; //close modal-dialog
						genreHTML += '</div>'; //close modal
					genreHTML += '</div>'; //close off each div
					$('#movie-grid').append(genreHTML);
					//Without this line, there is nowhere for the posters and overviews to display so it doesn't show up 
				})
			}
		}) 
	}
	
	
	// call getMoviesByGenre using click function but call getNowPlayingData on default.
	mainpage();

	//Reset HTML strings to empty to overwrite with new one!
	var nowPlayingHTML = '';
	var genreHTML = '';
	var mainpageHTML = '';

	$('.navbar-brand').click(function(){
		mainpage();
	})		
	$('.nowPlaying').click(function(){
		$('.mainPageContent').hide();
		getNowPlayingData();
		$('#movie-grid').html(nowPlayingHTML);
		$('#movieGenreLabel').html("Now Playing");
	})
	$('#action').click(function(){
		$('.mainPageContent').hide();
		$('#movie-grid').html('');
		getMoviesByGenre(28);
		$('#movie-grid').html(genreHTML);
		$('#movieGenreLabel').html("Action");
	})
	$('#adventure').click(function(){
		$('.mainPageContent').hide();
		getMoviesByGenre(12);
		$('#movie-grid').html(genreHTML);
		$('#movieGenreLabel').html("Adventure");
	})
	$('#animation').click(function(){
		$('.mainPageContent').hide();
		getMoviesByGenre(16);
		$('#movie-grid').html(genreHTML);
		$('#movieGenreLabel').html("Animation");
	})
	$('#comedy').click(function(){
		$('.mainPageContent').hide();
		getMoviesByGenre(35);
		$('#movie-grid').html(genreHTML);
		$('#movieGenreLabel').html("Comedy");
	})
	$('#crime').click(function(){
		$('.mainPageContent').hide();
		getMoviesByGenre(80);
		$('#movie-grid').html(genreHTML);
		$('#movieGenreLabel').html("Crime");
	})
	$('#drama').click(function(){
		$('.mainPageContent').hide();
		getMoviesByGenre(18);
		$('#movie-grid').html(genreHTML);
		$('#movieGenreLabel').html("Drama");
	})
	$('#family').click(function(){
		$('.mainPageContent').hide();
		getMoviesByGenre(10751);
		$('#movie-grid').html(genreHTML);
		$('#movieGenreLabel').html("Family");
	})
	$('#fantasy').click(function(){
		$('.mainPageContent').hide();
		getMoviesByGenre(14);
		$('#movie-grid').html(genreHTML);
		$('#movieGenreLabel').html("Fantasy");
	})
	$('#history').click(function(){
		$('.mainPageContent').hide();
		getMoviesByGenre(36);
		$('#movie-grid').html(genreHTML);
		$('#movieGenreLabel').html("History");
	})
	$('#horror').click(function(){
		$('.mainPageContent').hide();
		getMoviesByGenre(27);
		$('#movie-grid').html(genreHTML);
		$('#movieGenreLabel').html("Horror");
	})
	$('#music').click(function(){
		$('.mainPageContent').hide();
		getMoviesByGenre(10402);
		$('#movie-grid').html(genreHTML);
		$('#movieGenreLabel').html("Music");
	})
	$('#romance').click(function(){
		$('.mainPageContent').hide();
		getMoviesByGenre(10749);
		$('#movie-grid').html(genreHTML);
		$('#movieGenreLabel').html("Romance");
	})
	$('#scifi').click(function(){
		$('.mainPageContent').hide();
		getMoviesByGenre(878);
		$('#movie-grid').html(genreHTML);
		$('#movieGenreLabel').html("Science Fiction");
	})
	$('#thriller').click(function(){
		$('.mainPageContent').hide();
		getMoviesByGenre(53);
		$('#movie-grid').html(genreHTML);
		$('#movieGenreLabel').html("Thriller");
	})

	//==============================================================================
	//====================== Search Function =======================================
	//==============================================================================

	//Run function searchMovies AFTER an input has been submitted. Submit form first.
	//Run searchMovies once to add an empty html to movie-grid using .html(). Then, overwrite it with the new html using .append(). Need to use .append() to overwrite or all the images will display on top of each other.

	var searchTerm = '';
	searchMovies();
	//reference entire search form
	$('.searchForm').submit(function(event){
		$('.mainPageContent').hide();
		$('#movie-grid').html('');
		event.preventDefault();
		//search term is only concerned with what the user inputted 
		//Get input with .val();
		searchTerm = $('.form-control').val();
		searchMovies();
	})

	function searchMovies(){
		//need to include query in url. (ex: &query=boss+baby)
		const searchMovieURL = apiBaseURL + 'search/movie?api_key=' + apiKey + '&language=en-US&page=1&include_adult=false&query=' + searchTerm;
		
		$.getJSON(searchMovieURL, function(movieSearchResults){
			if(movieSearchResults.results.length < 1)
			    {
					document.getElementById("movieGenreLabel").value = "Based on your search, no results have been found";
			    }
			for (let i = 0; i<movieSearchResults.results.length; i++){
				
				var mid = movieSearchResults.results[i].id;
				var thisMovieUrl = apiBaseURL+'movie/'+mid+'/videos?api_key=' + apiKey;		

				$.getJSON(thisMovieUrl, function(movieKey){
					// console.log(movieKey)
					var poster = imageBaseUrl+'w300'+movieSearchResults.results[i].poster_path;
					var title = movieSearchResults.results[i].original_title;
					var releaseDate = movieSearchResults.results[i].release_date;
					var overview = movieSearchResults.results[i].overview;
					var voteAverage = movieSearchResults.results[i].vote_average;				
					var youtubeKey = movieKey.results[0].key;
					var youtubeLink = 'https://www.youtube.com/watch?v='+youtubeKey;
					var searchResultsHTML = '';
					searchResultsHTML += '<div class="col-sm-3 col-md-3 col-lg-3 eachMovie">';
						searchResultsHTML += '<button type="button" class="btnModal" data-toggle="modal" data-target="#exampleModal'+ i + '" data-whatever="@' + i + '">'+'<img src="'+poster+'"></button>'; 	
						searchResultsHTML += '<div class="modal fade" id="exampleModal' + i +'" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
							searchResultsHTML += '<div class="modal-dialog" role="document">';
								searchResultsHTML += '<div class="modal-content col-sm-12 col-lg-12">';
									searchResultsHTML += '<div class="col-sm-6 moviePosterInModal">';
										searchResultsHTML += '<a href="'+youtubeLink+'"><img src="'+poster+'"></a>'; 
									searchResultsHTML += '</div><br>';//close trailerLink
									searchResultsHTML += '<div class="col-sm-6 movieDetails">';
										searchResultsHTML += '<div class="movieName">'+title+'</div><br>';
										searchResultsHTML += '<div class="linkToTrailer"><a href="'+youtubeLink+'"><span class="glyphicon glyphicon-play"></span>&nbspPlay trailer</a>' + '</div><br>';	
										searchResultsHTML += '<div class="release">Release Date: '+releaseDate+'</div><br>';
										searchResultsHTML += '<div class="overview">' +overview+ '</div><br>';
										searchResultsHTML += '<div class="rating">Rating: '+voteAverage+ '/10</div><br>';
									searchResultsHTML += '</div>'; //close movieDetails
							searchResultsHTML += '</div>'; //close modal-dialog
						searchResultsHTML += '</div>'; //close modal
					searchResultsHTML += '</div>'; //close off each div
					$('#movie-grid').append(searchResultsHTML);
					//Label will be whatever user input was
					$('#movieGenreLabel').html(searchTerm);	
				})
			}
		})
	}
});


//.append(nowPlayingHTML) adds nowPlayingHTML to the present HTML
//.html(nowPlayingHTML) ovwrwrites the HTML present with nowPlayingHTML. 
//.html() is faster than DOM creation
//.html() is good for when the element is empty. 
//.append() is better when you want to add something dynamically, like adding a list item dynamically. (You would be adding a new string of HTML to the element.)
