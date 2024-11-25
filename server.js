import express from 'express';

import { config } from './src/config/dotenv.js';
import routes from './src/routes/routesPosts.js';

const PORT = config.PORT; 

const app = express();
app.use(express.static('uploads'));
routes(app);

app.get('/', (request, response) => {
    response.status(200).json({message: "OK"});
});

app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}`);
});