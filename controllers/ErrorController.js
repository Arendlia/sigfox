exports.renderErrorPage = (req, res) => {
    res.status(500).render('errors/errorServer');
};

exports.renderBadRequestPage = (req, res) => {
    res.status(400).render('errors/badRequest');
};

exports.renderForbiddenPage = (req, res) => {
    res.status(403).render('errors/forbidden');
};

exports.renderNotFoundPage = (req, res) => {
    res.status(404).render('errors/notFound');
};

exports.tooManyRequests = (req, res) => {
    res.status(429).render('errors/tooManyRequests');
};