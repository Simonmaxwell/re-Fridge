'use strict';
$(document).ready(function() {
	const APIKEY = "f164427952ade2ca59a10717ddb7ecc2";
	const APPID =  "1a6c0d8f";
	const URL = "https://api.edamam.com/search";
	let ingredients = [];
	let fridgeManifest = [];

	const getRequest = (query) => { 
		let params = {
			app_id: APPID,
			app_key: APIKEY,
			q: query
		};
		
		$.getJSON(URL, params, data => {
			createRecipeObjects(data);
			console.log(data);
		});
	};

	const createRecipeObjects = (data) => {
	var recipes = [];
		for( let i = 0; i < data.hits.length; i++) {
			let ingredientListItems = [];
			for( let k = 0; k < data.hits[i].recipe.ingredientLines.length; k++) {
				ingredientListItems.push(data.hits[i].recipe.ingredientLines[k]);
			}
			recipes.push({
				recipeUrl: data.hits[i].recipe.url,
				recipeImageUrl: data.hits[i].recipe.image,
				recipeName: data.hits[i].recipe.label,
				listOfIngredients: ingredientListItems
			});
		}
	generateRecipeHtml(recipes);
	}

	const generateIngredientsHtml = (listOfIngredients) => {
		let ingredientsHtml = '';
		let color = 'red';
		for ( let i = 0; i < listOfIngredients.length; i++){
			for ( let k = 0; k < listOfIngredients[i].length; k++){
				if( listOfIngredients[i].indexOf(ingredients[i]) != -1) {
				color = 'black';
				};
			};
		ingredientsHtml += `<li class="${color}">${individual ingredient line}</li>`;
		}
	}

	const generateRecipeHtml = (recipes) => {
		var html = '';
		let ingredientsHtml = 'butts';
		for (let i = 0; i < recipes.length; i++) {
			html += `<div class="recipe recipe-box">
					<a target ="_blank" href="${recipes[i].recipeUrl}">
					<img src="${recipes[i].recipeImageUrl}">
					<h2>${recipes[i].recipeName}</h5> 
					</a>
					<ul >${generateIngredientsHtml(recipes[i].listOfIngredients)}</ul>
					</div>`
		};
		$("#results").html(html);
		ingredients = [];
	};

	$("#add-item").submit(event => {
		event.preventDefault();
		var foodItem = $("#ingredient").val();
		fridgeManifest += `<li>${foodItem}</li>`;
		ingredients.push(foodItem);
		$("#fridge-manifest").html(fridgeManifest);
		$("#ingredient").val("");
	});

	$("#search-form").submit(event => {
		event.preventDefault();
		let query = ingredients.join(", ");
		getRequest(query);	
	});




});