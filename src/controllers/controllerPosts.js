import { getTodosPosts } from "../models/modelPost.js";

export const listaPosts = async (request, response) => {
    const posts = await getTodosPosts();
    response.status(200).json(posts);
}