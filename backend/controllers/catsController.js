// Importo il file di connessione al database
import connection from "../data/db.js";

// INDEX – lista gatti
export function index(req, res) {

    const page = parseInt(req.query.page) || 1;
    const limit = 12;
    console.log("sei nella nuova index limitata");

    const offset = (page - 1) * limit;

    const sql = `
    SELECT * 
    FROM gatti 
    LIMIT ? 
    OFFSET ?
    `;

    connection.query(sql, [limit, offset], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });

        results.map((x) => {
            if (x.image && x.image.search("http") === -1) {
                x.image = x.image === "" ? null : req.imagePath + x.image;
            }
        });

        res.json(results);
    });
}

// INDEX – lista gatti da adottare
export function ospiti(req, res) {

    const page = parseInt(req.query.page) || 1;
    const limit = 12;

    // Query per contare il totale dei gatti
    const countSql = "SELECT COUNT(*) as total FROM gatti WHERE adottato = 0";

    const offset = (page - 1) * limit;

    connection.query(countSql, (err, countResult) => {
        if (err) return res.status(500).json({ error: "Errore nel conteggio" });

        const totalItems = countResult[0].total;
        const totalPages = Math.ceil(totalItems / limit);

        // Query per i dati della pagina attuale
        const dataSql = `
            SELECT g.id, g.slug, g.name, g.image, g.sex
            FROM gatti as g
            WHERE g.adottato = 0
            LIMIT ? OFFSET ?`;

        connection.query(dataSql, [limit, offset], (err, results) => {
            if (err) return res.status(500).json({ error: "Errore nel recupero dati" });

            // Elaborazione immagini
            results.forEach((x) => {
                if (x.image && !x.image.startsWith("http")) {
                    x.image = x.image === "" ? null : req.imagePath + x.image;
                }
            });

            res.json({
                data: results,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: page,
                    itemsPerPage: limit
                }
            });
        });
    });
}

// lista gatti già adottati
export function exOspiti(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = 12;

    // Query per contare il totale dei gatti
    const countSql = "SELECT COUNT(*) as total FROM gatti WHERE adottato = 1";

    const offset = (page - 1) * limit;

    connection.query(countSql, (err, countResult) => {
        if (err) return res.status(500).json({ error: "Errore nel conteggio" });

        const totalItems = countResult[0].total;
        const totalPages = Math.ceil(totalItems / limit);

        // Query per i dati della pagina attuale
        const dataSql = `
            SELECT g.id, g.slug, g.name, g.image, g.sex
            FROM gatti as g
            WHERE g.adottato = 1
            LIMIT ? OFFSET ?`;

        connection.query(dataSql, [limit, offset], (err, results) => {
            if (err) return res.status(500).json({ error: "Errore nel recupero dati" });

            // Elaborazione immagini
            results.forEach((x) => {
                if (x.image && !x.image.startsWith("http")) {
                    x.image = x.image === "" ? null : req.imagePath + x.image;
                }
            });

            res.json({
                data: results,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: page,
                    itemsPerPage: limit
                }
            });
        });
    });
}

// SHOW – gatto singolo via slug
export function show(req, res) {
    const { slug } = req.params;
    const sql = `
    SELECT *
    FROM gatti 
    WHERE gatti.slug = ?
    `;

    connection.query(sql, [slug], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });

        if (result.length === 0) {
            return res.status(404).json({ error: "Planet not found" });
        }

        result.map((x) => {
            if (x.image && x.image.search("http") === -1) {
                x.image = x.image === "" ? null : req.imagePath + x.image;
            }
        });

        res.json(result[0]);
    });
}

// totale gatti adottati
export function totAdottati(req, res) {
    const sql = `
    SELECT COUNT(*) AS totale_adottati
    FROM gatti
    WHERE adottato = 1;
    `;

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });

        res.json(results[0]);
    });
}

// STORE – crea nuova entità gatto
export function store(req, res) {
    const {
        slug,
        name,
        sex,
        date_of_birth = null,
        coat = null,
        image = null,
        info = null,
        adottato = 0,
        prenotato = 0
    } = req.body;

    const sql = `
        INSERT INTO gatti
        (slug, name, sex, date_of_birth, coat, image, info, adottato, prenotato)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(
        sql,
        [slug, name, sex, date_of_birth, coat, image, info, adottato, prenotato],
        (err, result) => {
            if (err) return res.status(500).json({ error: "Database error" });

            res.status(201).json({
                message: "Gatto creato",
                id: result.insertId
            });
        }
    );
}

// UPDATE – modifica gatto
export function update(req, res) {

    const { slug } = req.params;

    // creo l'array delle chiavi e dei valori che ho ricevuto
    const chiavi = [];
    const valori = [];

    // per ogni chiave presente carico chiavi e valori negli array corrispondenti
    for (let key in req.body) {
        chiavi.push(`${key} = ?`);
        valori.push(req.body[key]);
    }

    if (chiavi.length === 0) {
        return res.status(400).json({ error: "Nessun dato da aggiornare" });
    }

    const sql = `
        UPDATE gatti
        SET ${chiavi.join(", ")}
        WHERE slug = ?
    `;

    valori.push(slug);

    connection.query(sql, valori, (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });

        res.json({ message: "Gatto aggiornato" });
    });
}

// DELETE – elimina gatto 
export function destroy(req, res) {
    const { slug } = req.params;

    const sql = `DELETE FROM gatti WHERE slug = ?`;

    connection.query(sql, [slug], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Gatto non trovato" });
        }

        res.json({ message: "Gatto eliminato" });
    });
}