// richiamo la libreria multer
import multer from "multer";

// File upload middleware
const storage = multer.diskStorage({
    // gli dico dove voglio vada a salvare il file che ha ricevuto
    destination: "./public/img/",
    // creo il nome del file, concatenando la data in cui è stato creato il nome con il nome originale del file
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});
const upload = multer({ storage });

export default upload;