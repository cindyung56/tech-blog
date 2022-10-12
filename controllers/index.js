const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

// set up routes to back-end and front-end
router.use('/api', apiRoutes);
router.use('/', homeRoutes);

module.exports = router;
