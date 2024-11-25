import { ObjectId } from 'mongodb';
import conectarAoBanco from '../config/DBConfig.js';

import 'dotenv/config';

const conexao = await conectarAoBanco(process.env.DB);

export const getAllPosts = async () => {
    const db = conexao.db("Imersao-instaBytes");
    const colecao = db.collection("posts");
    return colecao.find().toArray();
};

export const createNewPost = async (post) => {
    const db = conexao.db("Imersao-instaBytes");
    const colecao = db.collection("posts");
    return colecao.insertOne(post);
};

export const updatePostDB = async (id, post) => {
    const db = conexao.db("Imersao-instaBytes");
    const colecao = db.collection("posts");
    const objectId = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objectId)}, {$set:post});
};