import { Post } from "../models/post.model.js";

// create post
const createPost = async (request, response) => {
    try {
        const {name, description, age} = request.body

        if(!name || !description || !age){
            response.status(400).json({
                message : "Please fill all the fields"
            });
        }

        const post = await Post.create({ name, description, age });

        response.status(200).json({
            message : "Post created successfully",
            post
        })
    } catch (error) {
        response.status(500).json({
            message : "Internal Server Error",
            error : error.message
        })
    }
}

// get post
const getPosts = async (request, response) => {
    try {
        const posts = await Post.find();

        if(!posts){
            response.status(404).json({
                message : "no posts were found"
            })
        }

        response.status(200).json({
            posts
        })
    } catch (error) {
        response.status(500).json({
            message : "Internal Server Error",
            error : error.message
        })
    }
}

const updatePost = async (request, response) => {
    try {
        // basic validation 

        //Calculates the length of fields in the request body
        // {name: x, description: y, age: z} -> [name, description, age]
        if(Object.keys(request.body).length === 0){
            return  response.status(400).json({
                    message : "no data provided for update"
                })
        }

        const post = await Post.findByIdAndUpdate(request.params.id, request.body, { new : true} );

        if(!post){
            return response.status(404).json({
                message : "Post not found"
            })
        }

        response.status(200).json({
            message : "Post updated successfully",
            post
        });

    } catch (error) {
        response.status(500).json({
            message : "Internal Server Error",
            error : error.message
        })
    }
}

const deletePost = async (request, response) => {
    try {
        const deleted = await Post.findByIdAndDelete(request.params.id);

        if(!deleted){
            return response.status(404).json({
                message : 'post not found'
            });
        }

        response.status(200).json({
            message : "post deleted successfully"
        })
    } catch (error) {
        response.status(500).json({
            message : "Internal Server Error",
            error : error.message
        })
    }
}

export { createPost, getPosts, updatePost, deletePost };
