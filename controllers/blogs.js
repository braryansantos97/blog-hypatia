const Blog = require('../models/blog');
const Comment = require('../models/comment');
const router = require('express').Router();

//Create
router.post('/', async (req, res) => {
  try {
    const createdBlog = await Blog.create(req.body)
    res.status(200).json(createdBlog)
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message })
  }
})

//Read
  /*Index*/
  router.get('/', async (req, res) => {
    try {
      const theBlogs = await Blog.find({})
      res.status(200).json(theBlogs)
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message})
    }
  })

  /*Show*/
  router.get('/:id', async (req, res) => {
    try {
      const oneBlog = await Blog.findById(req.params.id)
      res.status(200).json(oneBlog)
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message})
    }
  })

//Update
  /*Update the blog*/
  router.put('/:id', async (req, res) => {
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true})
      res.status(200).json(updatedBlog)
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message})
    }
  })

  /*update the comment */
  //created a comment
  //take that comment & add it to the comments array of the blog
  //send back relevant response
  router.put('/:id/addComment', (req, res) => {
    const createCommentQuery = Comment.create(req.body)

    createCommentQuery.exec((err, createdComment) => {
      const updateBlogQuery = Blog.findByIdAndUpdate(req.params.id, {$addToSet: { comments: createdComment._id }}, { new: true })

      updateBlogQuery.exec((err, updatedBlog) => {
        if(err) {
          console.error(err);
          res.status(400).json({ message: err.message })
        } else {
          res.status(200).json(createdComment)
        }
      })
    })
  })

//Delete

router.delete('/:id', async(req,res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message})
  }
})

module.exports = router;
