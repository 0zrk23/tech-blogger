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
        include: [
          {
            model: User
          },
          {
            model: Comment,
            include: [{
              model: User
            }]
          }],
      });
      const blog = await blogData.get({plain: true});
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
  try {
    // console.log('here');
    const blogData = await Blog.findAll({
      where: {
        user_id: req.session.user_id
      }
    })
    let blogs;
    let noData;
    if(!blogData[0]){
      noData = true;
    } else {
      blogs = blogData.map(blog => blog.get({plain: true}));
      noData = false;
    }
    res.render('profile',{
      blogs,
      noData: noData,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err);
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
