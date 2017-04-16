'use strict';
$(document).ready(function() {
	const APIKEY = "f164427952ade2ca59a10717ddb7ecc2";
	const APPID =  "1a6c0d8f";
	const URL = "https://api.edamam.com/search";
	let ingredients = [];
	let nongredients = [];
	let fridgeManifest = [];
	let fridgeNonifest = [];

	const getRequest = (query) => { 
		let params = {
			app_id: APPID,
			app_key: APIKEY,
			from: 0,
			to: 50,
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
		generateRecipeHtml(recipeFilter(recipes));
	}

	const colorForIngredient = (ingredients, ingredient) => {
		let color = 'red';
		for ( let i = 0; i < ingredients.length; i++) {
			if( ingredient.indexOf(ingredients[i]) != -1) {
				color = 'white';
			};
		}
		return color;
	};

	const generateIngredientsHtml = (listOfIngredients) => {
		let ingredientsHtml = '';
		let color = '';
		for ( let i = 0; i < listOfIngredients.length; i++){
			for ( let k = 0; k < listOfIngredients[i].length; k++){
				color = colorForIngredient(ingredients, listOfIngredients[i]);	
			};
			ingredientsHtml += `<li class="${color}">${listOfIngredients[i]}</li>`;
		}
		return ingredientsHtml;
	}

	const generateRecipeHtml = (recipes) => {
		var html = '';
		let ingredientsHtml = '';
		for (let i = 0; i < recipes.length; i++) {
			html += `<div class="recipe recipe-box">
					<a target ="_blank" href="${recipes[i].recipeUrl}">
					<img class="image" src="${recipes[i].recipeImageUrl}">
					<h3>${recipes[i].recipeName}</h3> 
					</a>
					<button class="show-ingredients" type="toggle"> Show Ingredients </button>
					<div class="ingredient-list">
						<ul>${generateIngredientsHtml(recipes[i].listOfIngredients)}</ul>
					</div>
					</div>`
		};
		$("#results").html(html);
		$(".ingredient-list").toggle();
		ingredients = [];
		nongredients = [];
	};

	const recipeFilter = (recipes) => {
		let goodRecipes = [];
		let recipeValidity = true;
		for (let i = 0; i < recipes.length; i++) {
			for (let k = 0; k < recipes[i].listOfIngredients.length; k++) {
				for ( let j = 0; j < nongredients.length; j++) {
					if (recipes[i].listOfIngredients[k].indexOf(nongredients[j]) != -1) {
						recipeValidity = false;
					};
				};
			};
			if (recipeValidity) {
				goodRecipes.push(recipes[i]);
			}
		};
		return goodRecipes;
	};

	$("#add-item").submit(event => {
		event.preventDefault();
		var foodItem = $("#ingredient").val();
		fridgeManifest += `<li>${foodItem}</li>`;
		ingredients.push(foodItem);
		$("#fridge-manifest").append(fridgeManifest);
		$("#ingredient").val("");
	});

	$("#exclude-item").submit(event => {
		event.preventDefault();
		var poodItem = $("#nongredient").val();
		fridgeNonifest += `<li>${poodItem}</li>`;
		nongredients.push(poodItem);
		$("#fridge-nonifest").html(fridgeNonifest);
		$("#nongredient").val("");			
	});

	$("#search-form").submit(event => {
		event.preventDefault();
		let query = ingredients.join(", ");
		getRequest(query);
		$("#fridge-manifest").html("");
		$("#fridge-nonifest").html("");
	});

	$("#results").on("click", ".show-ingredients", function(event) {
		console.log($(this));
		$(this).next().toggle();
	});
});