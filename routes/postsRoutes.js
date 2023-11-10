const express = require('express');
const router = express.Router();

const {
    getPosts, getThisPost, newPost, updatePost, deletePost
} = require("../controllers/postsController");

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getPosts).post(protect, newPost);
router.route('/:id').get(getThisPost).put(protect, updatePost).delete(protect, deletePost);

module.exports = router;