// controllers/notFoundController.js
const renderNotFoundPage = (req, res) => {
    res.status(404).render('errors/notFound');
};

module.exports = {
    renderNotFoundPage,
};
