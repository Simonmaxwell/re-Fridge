'use strict'

$(document).ready(function() {
	const APIKEY = "f164427952ade2ca59a10717ddb7ecc2";
	const APPID =  "1a6c0d8f";
	const URL = "https://api.edamam.com/search";
	let ingredients = [];
	let nongredients = [];
	let fridgeManifest = '';

	const showResults = (data) => {
		var html = '';
		if (data.hits.length) { 
			for( let i = 0; i < data.hits.length; i++) {
				let ingredientsHtml = '';
				let color = 'red';
				for( let k = 0; k < data.hits[i].recipe.ingredientLines.length; k++) {
					ingredientsHtml += `<li class="${color}">${data.hits[i].recipe.ingredientLines[k]}</li>`
				};
				html += `<div class="recipe recipe-box">
						<a target ="_blank" href="${data.hits[i].recipe.url}">
						<img src="${data.hits[i].recipe.image}">
						<h2>${data.hits[i].recipe.label}</h5> 
						</a>
						<ul >${ingredientsHtml}</ul>
						</div>`
			};
		} else { 
			html = "No recipes found" 
		}
		$('#results').html(html);
		ingredients = [];
	
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

	$("#add-item").submit(event => {
		event.preventDefault();
		var foodItem = $("#ingredient").val();
		fridgeManifest += `<li>${foodItem}</li>`;
		ingredients.push(foodItem);
		$("#fridge-manifest").html(fridgeManifest);
		$("#ingredient").val("");
	})
	
	$("#search-form").submit(event => {
		event.preventDefault();
		let query = ingredients.join(" ");
		getRequest(query);		
	});	
});