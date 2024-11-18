import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3333 ; 

const app = express();
app.use(express.json());

app.get('/', (request, response) => {
    response.status(200).json({message: "OK"});
});

app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}`);    
});