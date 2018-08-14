var keystone = require('keystone');
var Recipe = keystone.list('Recipe');
;

/**
 * List Recipe
 */
exports.list = function(req, res) {
    Recipe.model.find()
    Recipe.model.find()
    .exec(function(err, recipes) {
		// do something with recipe
		// create an array 
		let results = []; 
		if (err) return res.json('database error', err);
		//loop through recipes and ad to result 
		for (var i = 0; i < recipes.length; i++){
			results.push({
				title: recipes[i].title,
				article: recipes[i].article,
				img: recipes[i].img,
				buttontext: recipes[i].buttontex
			  })
		}
		res.json(
			//return result 
			results
		);
	});

  }

  /**
 * Get Recipe by ID
 */
exports.get = function(req, res) {
    // find by (title search )!!
	Recipe.model.findById(req.params.id)
	.exec(function(err, recipe){
		// do something with users
		if (err) return res.apiError('database error', err);
		res.json({
		 title: recipe.title,
		 article: recipe.article,
		 img: recipe.img,
		 buttontext: recipe.buttontext
		 //  author: recipe.author
		});
	});
  }

  /**
 * Create a Recipe
 */
exports.create = function(req, res) {
    // console.log("created new recipe");
	// console.log(req.body);
	
	var newRecipe = new Recipe.model({
		title: req.body.title,
		article: req.body.article,
		img: req.body.img,
		buttontext: req.body.buttontext
	});

	newRecipe.save(function(err) {	
		// if (err) return res.apiError('database error', err);
		console.log("created new recipe");
	});

	return res.json("created new recipe");
  }

  /**
 * Patch Recipe by ID
 */
exports.update = function(req, res) {
    	// 
	Recipe.model.findById(req.params.id)
	.exec(function(err, recipe) {
		// do something with users
		if (err) return res.apiError('database error', err);
		if (!recipe) return res.apiError('not found');

		var data = req.body;
		// console.log(data)

		recipe.getUpdateHandler(req).process(data, function(err) {

			if (err) return res.apiError('create error', err);

			res.json(
				recipe
			);
		});
	});
  }

  /**
 * Delete Recipe by ID
 */
exports.remove = function(req, res) {
    Recipe.model.findById(req.params.id)
	.exec(function(err, recipe){
	// do something with users
	if (err) return res.apiError('database error', err);
	if (!recipe) return res.apiError('not found');

		recipe.remove(function (err) {
			if (err) return res.apiError('database error', err);

			res.apiResponse({
				success: true
			});
		});

	});
  }