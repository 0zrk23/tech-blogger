const router = require('express').Router();
const withAuth = require('../../utils/auth');
const {Blog,Comment,User} = require('../../models');

router.post('/', withAuth, async (req,res) => {
    try {
        const blogData = await Blog.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        })
        res.status(200).json({message: 'Success!', blogData})
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.delete('/:id', withAuth, async (req,res) => {
    // console.log('here');
    try {
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });
        if(!blogData){
            res.status(404).json({message: 'No blog found with this id!'});
            return;
        }
        res.status(200).json(blogData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})

module.exports = router;