// Import controller
const MainController = require('../controllers/MainController');
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
    });
    app.group("/sensor", (router) => {
        router.get("/", MainController.sensor);
        router.get('/messagesajax', MainController.sensorMessagesAjax); // Create
    })
    app.group("/errors", (router) => {
        router.get("/forbidden", errorHandler, forbiddenController.renderForbiddenPage);
        router.get("/not-found", errorHandler, notFoundController.renderNotFoundPage);
        router.get("/error-internal", errorHandler, errorController.renderErrorPage);
        router.get("/bad-request", errorHandler, badRequestController.renderBadRequestPage);
    })
}