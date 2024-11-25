import fs from 'fs';
import { createNewPost, getAllPosts, updatePostDB } from "../models/modelPost.js";
import gerarDescricaoComGemini from '../services/geminiService.js';

export const listPosts = async (request, response) => {
    const posts = await getAllPosts();
    response.status(200).json(posts);
};

export const createPost = async (request, response) => {
    try {
        let { description, image, alt } = request.body;
        if (!description || !image || !alt) throw new Error('Dados não informados!');
        const post = { description, image, alt };

        const result = await createNewPost(post);
        response.status(201).json({message: result});
    } catch (error) {
        console.log(error.message);
        response.status(500).json(`Erro ao criar post`);
    };
};

export const uploadImage = async (request, response) => {
    const post = {
        description: '',
        image: request.file.originalname,
        alt: ''
    }

    try {
        const result = await createNewPost(post);
        const image = `uploads/${result.insertedId}.png`;
        fs.renameSync(request.file.path, image);
        response.status(201).json({result});
    } catch (error) {
        console.log(error.message);
        response.status(500).json(`Erro ao criar post`);
    };
};

export const updatePost = async (request, response) => {
    
    const id = request.params.id;
    const urlImage = `http://localhost:3333/${id}.png`;
    
    try {
        const imageBuffer = fs.readFileSync(`uploads/${id}.png`);
        const description = await gerarDescricaoComGemini(imageBuffer);

        const post = {
            description: description,
            image: urlImage,
            alt: request.body.alt
        };

        const result = await updatePostDB(id, post);
        response.status(201).json(result);
    } catch (error) {
        console.log(error.message);
        response.status(500).json(`Erro ao criar post`);
    };
};