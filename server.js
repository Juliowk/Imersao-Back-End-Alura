import express, { response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import posts  from './arrayTest.js';

const PORT = process.env.PORT || 3333; 

const app = express();
app.use(express.json());

app.get('/', (request, response) => {
    response.status(200).json({message: "OK"});
});

app.get('/posts', (request, response) => {
    response.status(200).json({'message': posts});
});

const buscar = (id) => {
    let post = posts.find((post) => post.id === Number(id));
    if (!post) return undefined;
    const { description, image } = post;
    return { description, image };
};

app.get('/posts/:id', (request, response) => {
    response.status(200).json(buscar(request.params.id));
});

app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}`);
});