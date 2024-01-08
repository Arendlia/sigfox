// Import controller
const MainController = require('../controllers/MainController');
// const middleware = require('../middleware/middleware');
module.exports = (app) => {
    app.group("/", (router) => {
        router.get("/", MainController.home);
        router.get("/sensor", MainController.sensor);
        // router.post('/create', ExampleController.create); // Create
        // router.patch('/:id', middleware, ExampleController.patch); // Update
        // router.delete('/:id', middleware, ExampleController.delete); // Delete
    });
}