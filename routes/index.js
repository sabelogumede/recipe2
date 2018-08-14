var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	api: importRoutes('./api'),
};

// Setup Route Bindings
exports = module.exports = function (app) {

	// Add headers
	app.use(function (req, res, next) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
		next();
	});
	
	// Views
	app.options('*', (req, res) => res.sendStatus(200) )


	// Views
	app.get('/', routes.views.index);
	// app.get('/blog/:category?', routes.views.blog);
	// app.get('/blog/post/:post', routes.views.post);
	// app.all('/contact', routes.views.contact);

	// API

	app.get('/api/people', routes.api.people.list);
	app.get('/api/people/:id', routes.api.people.get);
	app.post('/api/people', routes.api.people.create);
	app.put('/api/people/:id', routes.api.people.update);
	app.delete('/api/people/:id', routes.api.people.remove);
  
	app.get('/api/planets', routes.api.planet.list);
	app.get('/api/planets/:id', routes.api.planet.get);
	app.post('/api/planets', routes.api.planet.create);
	app.put('/api/planets/:id', routes.api.planet.update);
	app.delete('/api/planets/:id', routes.api.planet.remove);
  
	app.get('/api/starships', routes.api.starship.list);
	app.get('/api/starships/:id', routes.api.starship.get);
	app.post('/api/starships', routes.api.starship.create);
	app.put('/api/starships/:id', routes.api.starship.update);
	app.delete('/api/starships/:id', routes.api.starship.remove);
	
	app.get('/api/recipes', routes.api.recipe.list);
	app.get('/api/recipes/:id', routes.api.recipe.get);
	app.post('/api/recipes', routes.api.recipe.create);
	app.put('/api/recipes/:id', routes.api.recipe.update);
	app.delete('api/recipes/:id', routes.api.recipe.remove);


	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

};
