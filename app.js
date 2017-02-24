'use strict'

$(document).ready(function() {
	const APIKEY = "f164427952ade2ca59a10717ddb7ecc2";
	const APPID =  "1a6c0d8f";
	const URL = "https://api.edamam.com/search"
	
	const getRequest = (query) => { 
		let params = {
			app_id: APPID,
			app_key: APIKEY,
			q: query
		};
		
		$.getJSON(URL, params, data => {
			console.log(data);
		});
	};
	
	$("#search-form").submit(event => {
		event.preventDefault();
		let query = $("#query").val();
		getRequest(query);		
	});	
});