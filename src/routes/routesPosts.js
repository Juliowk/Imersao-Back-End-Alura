import express from 'express';
import { listaPosts } from '../controllers/controllerPosts.js';

const routes = (app) => {
    app.use(express.json());

    app.get('/posts', listaPosts);
};

export default routes;