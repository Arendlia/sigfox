
const MainController = require('../controllers/MainController');
const errorController = require('../controllers/ErrorController');
const notFoundController = require('../controllers/NotFoundController');
const forbiddenController = require('../controllers/ForbiddenController');
const badRequestController = require('../controllers/BadRequestController');
const errorHandler = require('../middlewares/errorHandler');
module.exports = (app) => {
    app.group("/", (router) => {
        router.get("/", MainController.home);
        router.post("/", MainController.homePost);
    });
    app.group("/sensor", (router) => {
        router.get("/:id", MainController.sensor);
        router.get('/:id/last-message', MainController.getLastMessage); // Create
        router.get('/:id/messages', MainController.getAllMessages); // Create
    })
    app.group("/errors", (router) => {
        router.get("/forbidden", errorHandler, forbiddenController.renderForbiddenPage);
        router.get("/not-found", errorHandler, notFoundController.renderNotFoundPage);
        router.get("/error-internal", errorHandler, errorController.renderErrorPage);
        router.get("/bad-request", errorHandler, badRequestController.renderBadRequestPage);
    })
}