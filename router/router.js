// Import controller
const HomeController = require('../controllers/HomeController');
// const middleware = require('../middleware/middleware');
module.exports = (app) => {
    app.group("/", (router) => {
        router.get("/", HomeController.home);
        // router.post('/create', ExampleController.create); // Create
        // router.patch('/:id', middleware, ExampleController.patch); // Update
        // router.delete('/:id', middleware, ExampleController.delete); // Delete
    });
}