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

// importo il router
import catsRouter from "./routers/catsRouter.js"

// Importo il file di connessione al database
// import connection from "./data/db.js";
// const connection = require('./data/db');

// creo una istanza di express
const app = express();

// imposto il numero della porta
const port = 3000;

/////

// // registro il body-parser per "application/json"
// // permette di leggere in formato json i dati inviati nella request
// app.use(express.json());

// // importo globalmente il middleware che gestisce errore per rotta inesistente
// const notFound = require("./middlewares/notFound.js");

// // importo globalmente il middleware che gestisce l'errore del server
// const errorServer = require("./middlewares/errorServer");

// importo il modulo del router per i movies
// const moviesRouter = require("./routers/moviesRouter.js")

// // importo globalmente il middleware per la gestione dei path delle immagini
// const imagePath = require("./middlewares/imagePath");

// const cors = require("cors");

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
app.use(express.static('public'));

// // registro il middleware per la gestione dei path delle immagini
// app.use(imagePath);

// rotte per i cats
app.use("/api/cats", catsRouter);

// imposto la rotta di home
app.get("/api/", (req, res) => {

    res.send('<h1> Server del mio sito pieno di gatti </h1>')
})

// // richiamo middleware gestione errori del server
// app.use(errorServer);

// // richiamo middleware gestione errore per rotta non esistente
// // deve essere richiamato dopo le rotte
// app.use(notFound);

// metto in ascolto il server sulla porta definita
app.listen(port, () => {
    console.log(`Cats app listening on port ${port}`);
});

