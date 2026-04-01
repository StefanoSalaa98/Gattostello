// importo il framework express
import express, { Router } from "express";

// importo il middleware CORS
import cors from "cors";

// carico dotenv per leggere il file .env
import "dotenv/config";

// importo i middleware
import notFound from "./middlewares/notFound.js";
import errorsHandler from "./middlewares/errorServer.js";
import setImagePath from "./middlewares/imagePath.js";

// importo il router della tabella cats
import catsRouter from "./routers/catsRouter.js"

// Importo il file di connessione al database
// import connection from "./data/db.js";
// const connection = require('./data/db');

// creo una istanza di express
const app = express();

// imposto il numero della porta
const port = 3000;

// middleware imagepath
app.use(setImagePath);

// middleware bodyparser
app.use(express.json());

// middleware static
app.use(express.static("public"));

// middleware cors
app.use(
    cors({
        origin: process.env.FE_APP,
    })
);

// uso il middleware static di express per rendere disponibile i file statici
app.use(express.static('public'))

// rotte per i cats
app.use("/api/cats", catsRouter);

// imposto la rotta di home
app.get("/api/", (req, res) => {

    res.send('<h1> Server del mio sito pieno di gatti </h1>')
})

// richiamo middleware gestione errori del server
app.use(errorsHandler);

// richiamo middleware gestione errore per rotta non esistente
// deve essere richiamato dopo le rotte
app.use(notFound);

// metto in ascolto il server sulla porta definita
app.listen(port, () => {
    console.log(`Cats app listening on port ${port}`);
});

