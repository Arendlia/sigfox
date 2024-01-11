
const MainController = require('../controllers/MainController');
const errorController = require('../controllers/ErrorController');
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
    app.group("/error", (router) => {
        router.get("/forbidden", errorHandler, errorController.renderForbiddenPage);
        router.get("/not-found", errorHandler, errorController.renderNotFoundPage);
        router.get("/error-internal", errorHandler, errorController.renderErrorPage);
        router.get("/bad-request", errorHandler, errorController.renderBadRequestPage);
        router.get("/too-many-requests", errorHandler, errorController.renderBadRequestPage);
    })
}