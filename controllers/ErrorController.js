const renderErrorPage = (req, res) => {
    res.status(500).render('errors/errorServer');
};

module.exports = {
    renderErrorPage,
};