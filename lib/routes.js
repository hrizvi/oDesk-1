'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    items = require('./controllers/items'),
    session = require('./controllers/session');

var middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function (app) {

    // Server API Routes
    app.get('/api/awesomeThings', api.awesomeThings);

    // Items
    app.post("/api/items", middleware.auth, items.createItem);

    app.get ("/api/items", middleware.auth, items.getItems);

    app.get ("/api/items/:id", middleware.auth, items.getItem);
    app.put ("/api/items/:id", middleware.auth, items.updateItem);

    app.delete("/api/items/:id", middleware.auth, items.deleteItem);

    // update array of docs.
    app.post("/api/updateItems", middleware.auth, items.updateItems);

    app.post('/api/users', users.create);
    app.put('/api/users', users.changePassword);
    app.get('/api/users/me', users.me);
    app.get('/api/users/:id', users.show);

    app.post('/api/session', session.login);
    app.del('/api/session', session.logout);

    // All other routes to use Angular routing in app/scripts/app.js
    app.get('/partials/*', index.partials);
    app.get('/*', middleware.setUserCookie, index.index);


};