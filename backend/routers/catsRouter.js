// importo il framework express
import express from "express";

// attivo il router
const router = express.Router();

// // importo il controller della risorsa cats
import * as catsController from '../controllers/catsController.js';

// Rotta /index che restituisce un oggetto json con la lista dei gatti
router.get('/', catsController.index);

router.get('/ospiti/', catsController.ospiti);
router.get('/exOspiti', catsController.exOspiti);
router.get('/ospiti/:slug', catsController.show);
router.get('/exOspiti/totali', catsController.totAdottati);



// // Rotta che restituisce la media voto delle recensioni di ciascun film
// // Metto questa rotta prima della rotta :id per evitare che '/rating' venga interpretato come un ID
// router.get('/rating', moviesController.ratingReview);

// // Rotta /show/:id che restituisce un singolo film
// router.get('/:id', moviesController.show);

// // Rotta per l'IA che interpreta richiesta utente
// router.post('/chat', moviesController.chatController);

// // Rotta che permette di inserire una nuova recensione
// router.post('/:id/reviews', moviesController.storeReview);

// // Rotta che permette di inserire un nuovo film
// router.post('/', upload.single('image'), moviesController.storeMovie);

export default router;

