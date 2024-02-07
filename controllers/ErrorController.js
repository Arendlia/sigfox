/**
 * @fileoverview Error page rendering functions.
 */

/**
 * Render the server error page
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.renderErrorPage = (req, res) => {
    res.status(500).render('errors/errorServer');
};

/**
 * Render the bad request page
 * @param {Object} req - The request object. 
 * @param {Object} res - The response object.
 */
exports.renderBadRequestPage = (req, res) => {
    res.status(400).render('errors/badRequest');
};

/**
 * Render the forbidden page
 * @param {Object} req - The request object. 
 * @param {Object} res - The response object.
 */
exports.renderForbiddenPage = (req, res) => {
    res.status(403).render('errors/forbidden');
};

/**
 * Render the not found page
 * @param {Object} req - The request object. 
 * @param {Object} res - The response object.
 */
exports.renderNotFoundPage = (req, res) => {
    res.status(404).render('errors/notFound');
};

/**
 * Render the too many request page
 * @param {Object} req - The request object. 
 * @param {Object} res - The response object.
 */
exports.tooManyRequests = (req, res) => {
    res.status(429).render('errors/tooManyRequests');
};