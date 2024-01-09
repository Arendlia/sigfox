// Import controller
const MainController = require('../controllers/MainController');
const HomeController = require('../controllers/HomeController');
const errorController = require('../controllers/ErrorController');
const notFoundController = require('../controllers/NotFoundController');
const forbiddenController = require('../controllers/ForbiddenController');
const badRequestController = require('../controllers/BadRequestController');
// Import middlewares
const errorHandler = require('../middlewares/errorHandler');
// const middleware = require('../middleware/middleware');
module.exports = (app) => {
    app.group("/", (router) => {
        router.get("/", MainController.home);
        router.get("/sensor", MainController.sensor);
        // Page error
        router.get("/errors/forbidden", errorHandler, forbiddenController.renderForbiddenPage);
        router.get("/errors/not-found", errorHandler, notFoundController.renderNotFoundPage);
        router.get("/errors/error-internal", errorHandler, errorController.renderErrorPage);
        router.get("/errors/bad-request", errorHandler, badRequestController.renderBadRequestPage);
        // router.post('/create', ExampleController.create); // Create
        // router.patch('/:id', middleware, ExampleController.patch); // Update
        // router.delete('/:id', middleware, ExampleController.delete); // Delete
    });
}