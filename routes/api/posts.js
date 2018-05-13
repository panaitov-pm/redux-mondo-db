const express = require('express');
const router = express.Router();
const passport = require('passport')
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const validatePostInput = require('../../validation/post');


router.get('/test', (req, res) => {
    res.json({
        msg: "Posts works"
    });
})



// http://localhost:5000/api/posts
router.get('/', (req,res) => {
    Post.find()
        .sort({date: -1})
        .then(posts => res.json(posts))
        .catch(error => res.status(404).json({nopostfound: 'No posts found'}))
});

// http://localhost:5000/api/posts/id
router.get('/:id', (req,res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(error => res.status(404).json({nopostfound: 'No post found with this id'}))
});

///  http://localhost:5000/api/post
router.post('/', passport.authenticate('jwt', { session: false}),
    (req,res) => {
        const {errors, isValid} = validatePostInput(req.body);
        if(!isValid) {
            return res.status(400)
                .json(errors)
        }

        const newPost  = new Post({
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id
        });
        newPost.save()
            .then(post => res.json(post))
 });


// http://localhost:5000/api/posts/id
router.delete('/:id', passport.authenticate('jwt', { session: false}),
    (req,res) => {
        Profile.findOne({user: req.user.id})
            .then(profile => {
                Post.findById(req.params.id)
                    .then(post => {
                        if(post.user.toString() !== req.user.id){
                            return res.status(401)
                                .json({notauthorize: 'Not authorize'})
                        }
                        post.remove()
                            .then(() => res.json({success: true}))
                            .catch(error => res.status(404)
                                .json( {nopostfound: 'No post found with this id'})
                             )
                    })
            })
});



// http://localhost:5000/api/posts/like/id
router.post('/like/:id', passport.authenticate('jwt', { session: false}),
    (req,res) => {
        Profile.findOne({user: req.user.id})
            .then(profile => {
                Post.findById(req.params.id)
                    .then(post => {
                        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                            return res.status(400)
                                .json({alreadyliked: 'User already like this post'})
                        }
                        post.likes.unshift({user: req.user.id});
                        post.save()
                            .then(post => res.json(post))

                    })
            })
    });


// http://localhost:5000/api/posts/unlike/id
router.post('/unlike/:id', passport.authenticate('jwt', { session: false}),
    (req,res) => {
        Profile.findOne({user: req.user.id})
            .then(profile => {
                Post.findById(req.params.id)
                    .then(post => {
                        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                            return res.status(400)
                                .json({alreadyliked: 'You have not yet like this post'})
                        }
                        const removeIndex = post.likes.map(item => item.user.toString())
                            .indexOf(req.user.id);
                        post.likes.splice(removeIndex, 1);
                        post.save()
                            .then(post => res.json(post))
                    })
            })
    });


// http://localhost:5000/api/posts/comment/:id
router.post('/comment/:id', passport.authenticate('jwt', { session: false}),
    (req,res) => {
        const {errors, isValid} = validatePostInput(req.body);
        if(!isValid) {
            return res.status(400)
                .json(errors)
        }
        Post.findById(req.params.id)
            .then(post => {
                const newComment = {
                    text: req.body.text,
                    name: req.body.name,
                    avatar: req.body.avatar,
                    user: req.user.id
                }
                post.comments.unshift(newComment)
                post.save()
                    .then(post => res.json(post))
            })
            .catch(error => res.status(404).json({postnotfound: 'No post found'}))
 });



// http://localhost:5000/api/posts/comment/:id/:comment_id
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false}),
    (req,res) => {

        Post.findById(req.params.id)
            .then(post => {
                if(post.comments.filter(c => c._id.toString() === req.params.comment_id).length === 0) {
                    return res.status(404).json({commentnoexists: 'Comment does not exists'})
                }
                const removeIndex = post.comments.map(item => item._id.toString())
                    .indexOf(req.params.comment_id);
                post.comments.splice(removeIndex, 1)
                post.save()
                    .then(post => res.json(post))
            })
            .catch(error => res.status(404).json({postnotfound: 'No post found'}))
    });







module.exports = router;