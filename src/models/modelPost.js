import conectarAoBanco from '../config/DBConfig.js';
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