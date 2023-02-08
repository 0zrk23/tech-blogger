const router = require('express').Router();
const withAuth = require('../../utils/auth');
const {Comment, User } = require('../../models');

router.post('/', withAuth, async (req,res) => {
    try {
        // const user = await User.
        // console.log();
        const newCommentData = await Comment.create({
            content: req.body.comment,
            blog_id: req.body.blogId,
            user_id: req.session.user_id
        });
        const newComment = newCommentData.get({plain: true});
        console.log(newComment);
        res.status(200).json({newComment, message: 'Comment creation successfull!'})
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;
