const { Router } = require('express');
const { verifyToken, verifyOwnerOrder } = require('../middlewares/auth');
const commentService = require('../services/CommentService');
const router = Router({ mergeParams: true })

router
    .post('/',verifyToken,verifyOwnerOrder, (req, res) => {
        const {star,content} = req.body
        if(!star&&!content)
            return res.status(400).json({message: 'you must to rate for this comment'})
        commentService.create(req.body)
            .then(comment => {
                res.status(201).json(comment);
            })
            .catch(err => {
                res.status(400).json({ message: err });
            })
    })
    .get('/product/:id',(req,res) => {
        const productId = req.params.id
        commentService.findByProductId(productId)
            .then(comments => {
                res.status(200).json(comments);
            })
            .catch(err => {
                res.status(400).json({ message: err });
            })
    })

module.exports = { router }