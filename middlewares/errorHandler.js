/**
 * @param {Error} err
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('internalServerError');
};

module.exports = errorHandler;
