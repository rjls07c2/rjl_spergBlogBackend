const asyncHandler = require('express-async-handler');

const Post = require('../models/modelPosts');
const User = require('../models/modelAuth');

// Get all posts; GET /api/posts; Public
const getPosts = asyncHandler(async (req,res) => {
    const posts = await Post.find();

    res.status(200).json(posts)
})

// Get one post; GET /api/posts/:id; Public
const getThisPost = asyncHandler(async (req,res) =>{
    try {
        const foundPost = await Post.findById(req.params.id)
        // {_id, writer, title, desc, cats, text}
        if(!Post) {
            res.status(400)
            throw new Error('Post not found')
        }
    
        res.status(200).json(foundPost)
    } catch(err) {
        console.log(err)
    }
    
})

const newPost = asyncHandler(async (req,res) =>{
    if(
        !req.body.title ||
        !req.body.desc ||
        !req.body.cats ||
        !req.body.text
    ) {
        res.status(400);
        throw new Error('ERR: Missing Required Field ')
    }
    console.log(req.body)

    const post = await Post.create({
        title: req.body.title,
        desc: req.body.desc,
        cats: req.body.cats,
        text: req.body.text,
        writer: req.user.id
    })

    res.status(200).json(post)
});

// Update a post; PUT /api/posts/:id
const updatePost = asyncHandler(async (req,res) =>{
    const post = await Post.findById(req.params.id)
    if(!post) {
        res.status(400)
        throw new Error('Post not found')
    }

    const user = await User.findById(req.user.id);

    // Check for user
    if(!user) {
        res.status(401);
        throw new Error ('ERR: User not found')
    }

    // Match user to goal
    if(post.writer.toString() !== user.id) {
        res.status(401)
        throw new Error ("ERR: Unauthorized. This isn't yours")
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true})


    res.status(200).json(updatedPost)
});

// Delete a post; DELETE /api/posts/:id; Private
const deletePost = asyncHandler(async (req,res) =>{
    const post = await Post.findById(req.params.id)

    if(!post) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id);

    // Check for user
    if(!user) {
        res.status(401);
        throw new Error ('ERR: User not found')
    }

    // Match user to goal
    if(post.writer.toString() !== user.id) {
        res.status(401)
        throw new Error ("ERR: Unauthorized. This isn't yours")
    }

    await Post.deleteOne({
        _id: req.params.id
    });

    res.status(200).json({ id: req.params.id })
});

module.exports = {
    getPosts, getThisPost, newPost, updatePost, deletePost
};