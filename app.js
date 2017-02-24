'use strict'

$(document).ready(function() {
	const APIKEY = "f164427952ade2ca59a10717ddb7ecc2";
	const APPID =  "1a6c0d8f";
	const URL = "https://api.edamam.com/search";
	
	const showResults = (data) => {
		var html = '';
		for( let i = 0; i < data.hits.length; i++) {
			let ingredientsHtml = '';
			for( let k = 0; k < data.hits[i].recipe.ingredientLines.length; k++) {
				ingredientsHtml += `<li>${data.hits[i].recipe.ingredientLines[k]}</li>`
				};
			html += `<img src="${data.hits[i].recipe.image}">
					<a target ="_blank" href="${data.hits[i].recipe.url}">
					<h2>${data.hits[i].recipe.label}</h5> 
					</a>
					<ul>${ingredientsHtml}</ul>`
		};
		
		$('#results').html(html);
	}

	const getRequest = (query) => { 
		let params = {
			app_id: APPID,
			app_key: APIKEY,
			q: query
		};
		
		$.getJSON(URL, params, data => {
			showResults(data);
			console.log(data);
		});
	};
	
	$("#search-form").submit(event => {
		event.preventDefault();
		let query = $("#query").val();
		getRequest(query);		
	});	
});