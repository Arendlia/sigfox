// controllers/forbiddenController.js
const test = require('../Function/convertHexaTojson');
const renderForbiddenPage = (req, res) => {
    res.status(403).render('errors/forbidden');
    
};

module.exports = {
    renderForbiddenPage,
};
