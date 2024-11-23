import { MongoClient } from "mongodb";

export default async function conectarAoBanco (stringConexao) {
    if (!stringConexao) {
        throw new Error("A string de conexão com o banco não foi fornecida.");
    };

    let mongoClient;
    
    try {
        mongoClient = new MongoClient(stringConexao);
        console.log(`Conectando ao cluster do banco de dados...`);
        await mongoClient.connect();
        console.log(`Conectado ao MongoDB Atlas com sucesso!`);
        return mongoClient;    
    } catch (error) {
        console.log(`Fala na conexão com o banco!`, error);;
        process.exit();
    };
};