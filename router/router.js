// Import controller
const ExampleController = require('../controllers/ExampleController');
// const middleware = require('../middleware/middleware');
module.exports = (app) => {
    app.group("/example", (router) => {
        // router.get("/", middleware, ExampleController.getNotificationsTypes); // FindAll
        // router.post('/create', ExampleController.create); // Create
        // router.patch('/:id', middleware, ExampleController.patch); // Update
        // router.delete('/:id', middleware, ExampleController.delete); // Delete
    });
}