const router = require('express').Router();
const {Comment, User } = require('../../models');

router.post('/', async (req,res) => {
    try {
        // const user = await User.
        // console.log();
        const newComment = await Comment.create({
            content: req.body.comment,
            blog_id: req.body.blogId,
            user_id: req.session.user_id
        });
        console.log(newComment);
        res.redirect(`/blogs/${req.body.blogId}`);
        res.status(200)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;
