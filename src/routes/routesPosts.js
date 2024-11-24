import express from 'express';
import multer from 'multer';

import { createPost, listPosts, uploadImage } from '../controllers/controllerPosts.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
});
  
const upload = multer({ storage: storage });

const routes = (app) => {
    app.use(express.json());

    app.get('/posts', listPosts);

    app.post('/post', createPost);

    app.post('/upload', upload.single('image'), uploadImage);
};

export default routes;