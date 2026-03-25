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
router.post("/", catsController.store);
router.put("/:slug", catsController.update);
router.delete("/:slug", catsController.destroy);

// // Rotta che permette di inserire un nuovo film
// router.post('/', upload.single('image'), moviesController.storeMovie);

export default router;

