const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

// create api routes
router.use('/users', userRoutes); // /api/users/
router.use('/post', postRoutes); // /api/post/
router.use('/comment', commentRoutes); // /api/comment/

module.exports = router;