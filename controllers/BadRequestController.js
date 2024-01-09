// controllers/forbiddenController.js
const renderBadRequestPage = (req, res) => {
    res.status(400).render('errors/badRequest');
};

module.exports = {
    renderBadRequestPage,
};
