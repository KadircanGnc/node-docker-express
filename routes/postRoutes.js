const express = require('express');

const postController = require('../controllers/postController');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

router
  .route('/')
  .get(postController.getAllPosts)
  .post(auth, postController.createPost);

router
  .route('/:id')
  .get(postController.getOnePost)
  .patch(auth, postController.updatePost)
  .delete(auth, postController.deletePost);

module.exports = router;
