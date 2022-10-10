const router = require("express").Router();
const { User, Post, Comment } = require("../models");
// const withAuth = require('../utils/auth');

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ["username"] }],
    });
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async(req, res) => {
  try{

  }
  catch (err){
    res.status(500).json(err);
  }



    
});


router.get("/dashboard", async (req, res) => {
  try {
    if (req.session.logged_in) {
      const postData = await Post.findAll({
        include: [{ model: User }],
        where: { user_id: req.session.user_id },
      });
      const posts = postData.map((post) => post.get({ plain: true }));

      res.render("dashboard", {
        posts,
        logged_in: req.session.logged_in,
      });
    } else {
        res.redirect("/login");
        return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
