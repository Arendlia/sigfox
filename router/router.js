
const MainController = require('../controllers/MainController');
const errorController = require('../controllers/ErrorController');
const errorHandler = require('../middlewares/errorHandler');

/**
 * @param {import('express').Application} app
 */
module.exports = (app) => {
    app.group("/", (router) => {
        /**
         * @param {import('express').Request} req
         * @param {import('express').Response} res
         */
        router.get("/", MainController.home);
        /**
         * @param {import('express').Request} req
         * @param {import('express').Response} res
         */
        router.post("/", MainController.homePost);
    });
    app.group("/sensor", (router) => {
        /**
         * @param {import('express').Request} req
         * @param {import('express').Response} res
         */
        router.get("/:id", MainController.sensor);
        /**
         * @param {import('express').Request} req
         * @param {import('express').Response} res
         */
        router.get('/:id/last-message', MainController.getLastMessage); // Create
        /**
         * @param {import('express').Request} req
         * @param {import('express').Response} res
         */
        router.get('/:id/messages', MainController.getAllMessages); // Create
    })
    app.group("/error", (router) => {
        /**
         * @param {import('express').ErrorRequestHandler} errorHandler
         * @param {import('express').RequestHandler} renderForbiddenPage
         */
        router.get("/forbidden", errorHandler, errorController.renderForbiddenPage);
        /**
         * @param {import('express').ErrorRequestHandler} errorHandler
         * @param {import('express').RequestHandler} renderNotFoundPage
         */
        router.get("/not-found", errorHandler, errorController.renderNotFoundPage);
        /**
         * @param {import('express').ErrorRequestHandler} errorHandler
         * @param {import('express').RequestHandler} renderErrorPage
         */
        router.get("/error-internal", errorHandler, errorController.renderErrorPage);
        /**
         * @param {import('express').ErrorRequestHandler} errorHandler
         * @param {import('express').RequestHandler} renderBadRequestPage
         */
        router.get("/bad-request", errorHandler, errorController.renderBadRequestPage);
        /**
         * @param {import('express').ErrorRequestHandler} errorHandler
         * @param {import('express').RequestHandler} renderBadRequestPage
         */
        router.get("/too-many-requests", errorHandler, errorController.renderBadRequestPage);
    })
}