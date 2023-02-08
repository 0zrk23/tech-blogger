const router = require('express').Router();
const { Comment, Blog, User } = require('../models');
const Sequelize = require('sequelize');
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');

router.get('/', async (req,res) => {
    // console.log(sequelize.col('blog.user_id'))
    try{
        const blogData = await Blog.findAll({
          include: [{model: User}]
        });
        const blogs = blogData.map(blog => blog.get({plain: true}));
        console.log(blogs);
        res.render('homepage', {
          blogs,
          logged_in: req.session.logged_in
        })
        res.status(200);
    } catch (err) {
      console.log(err);
        res.status(500).json(err);
    }
})

router.get('/blogs/:id', withAuth, async (req,res)=>{
  try{
      const blogData = await Blog.findByPk(req.params.id,{
        include: [{
          model: Comment,
          include: [{
            model: User
          }]
        }],
      });
      const blog = await blogData.get({plain: true});
      console.log(blog);
      res.render('blog',{
        ...blog,
        logged_in: req.session.logged_in,
      })
  } catch (err) {
      res.status(400).json(err);
  }
})

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  // console.log('here');
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });
    console.log(user);
    res.render('profile', {
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('signup');
});

module.exports = router;
