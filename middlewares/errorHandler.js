// middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('internalServerError');
};

module.exports = errorHandler;
