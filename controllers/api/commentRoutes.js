const router = require('express').Router();
const Comment = require('../../models/Comment');

router.post('/',(req,res) => {
    try {
        console.log('here');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;
