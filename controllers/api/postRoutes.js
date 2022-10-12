// routes to delete a post, update a post, and add a post
const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

// get post by ID, return post data to be used in front end
router.get('/:id', async(req, res) => {
    try{
        const postData = await Post.findByPk(req.params.id);
        const post = postData.get({ plain: true });
        if (post){
            res.status(200).json(post);
        } else{
            res.status(400).json("Could not find post with that ID.");
        }
    } catch(err){
        res.status(500).json(err);
    }
})

// create a new Post
router.post("/", async (req, res) => {
  try {
    const postData = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update an existing Post using post ID
router.put('/:id', async (req, res) => {
    try{
        const postData = await Post.update(
            {
                title: req.body.title,
                content: req.body.content,
            },
            {
                where: { id: req.params.id }
            },
        );
        if (postData){
            res.status(200).json(postData);
        } else{
            res.status(400).json("Could not update.");
        }
        
    } catch(err){
        res.status(500).json(err);
    }
});


// delete an existing Post using post ID
router.delete('/:id', async (req, res) => {
    try{
        const postData = await Post.destroy(
            {where: {id: req.params.id}}
        );
        if (postData){
            res.status(200).json(postData); 
        } else {
            res.status(400).json("Could not delete data.");
        }
    } catch(err){
        res.status(500).json(err);
    }
});


module.exports = router;
