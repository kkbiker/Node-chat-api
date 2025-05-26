const sql = require('../config/db');

exports.getAllGenre = async () => {
    const rows = await sql`SELECT g.id AS genre_id, g.name AS genre_name, g.removable AS genre_removable, sg.id AS subgenre_id, sg.name AS subgenre_name, sg.parent_id AS subgenre_parent_id FROM genres g LEFT OUTER JOIN subgenres sg ON g.id = sg.parent_id ORDER BY genre_id, subgenre_id;`;

    const genresMap = new Map();

    for (const row of rows) {
        const genreId = row.genre_id;

        if (!genresMap.has(genreId)) {
            genresMap.set(genreId, {
                id: genreId,
                name: row.genre_name,
                removable: row.genre_removable,
                subgenres: [],
            });
        }

        if (row.subgenre_id !== null) {
            genresMap.get(genreId).subgenres.push({
                id: row.subgenre_id,
                name: row.subgenre_name,
                parentId: row.subgenre_parent_id,
            })
        }
    }

    return Array.from(genresMap.values());
};  
