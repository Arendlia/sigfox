// controllers/forbiddenController.js
const renderForbiddenPage = (req, res) => {
    res.status(403).render('errors/forbidden');
};

module.exports = {
    renderForbiddenPage,
};
