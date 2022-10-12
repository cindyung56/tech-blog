const router = require("express").Router();
const { User, Post, Comment } = require("../models");

// GET request to grab all post information, display this information in homepage.handlebars
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ["username"] }], //include each post's username using user_id
    });
    const posts = postData.map((post) => post.get({ plain: true })); // filter out the unnecessary information

    // render homepage with returned data
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET request to get a singular post via ID, then display the post and following comments on its own page
// also provide the option to comment
// if the user is not logged in redirect them to the login page
router.get("/post/:id", async (req, res) => {
  try {
    if (req.session.logged_in) {
    // find post by passed ID
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User, attributes: ["username"] }], // include post's author (user)
    });

    // filter out the unnecessary information
    const post = postData.get({ plain: true });

    // if the post with that ID exists, also find the comments
    if (post) {
      const commentData = await Comment.findAll({
        where: { post_id: req.params.id },
        include: [{ model: User, attributes: ["username"] }],
      });

      const comments = commentData.map((comment) =>
        comment.get({ plain: true })
      );

      // include both post data and comment data in the same object
      const data = {post, comments};
      
      // render all the data in the post.handlebars page
      res.render('post', {
        data,
        logged_in: req.session.logged_in,
      });
    } else {
      res.status(400).json("Could not find post with that id.");
    }}
    else{
      res.redirect("/login");
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET request to render the dashboard, but if the user is not logged in then redirect them to login first
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

// GET request to log in or sign up
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to homepage
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
