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

exports.findPostList = async (req) => {
    const {companyId} = req.query;

    const rows = await sql`SELECT sg.id AS subgenre_id, sg.name AS subgenre_name, a.id AS id, a.title AS title, a.description AS description, a.is_edit AS is_edit, a.is_public AS is_public, to_char(a.create_at, 'YYYY/MM/DD') AS create_at, count(f.id) AS favorite_count FROM articles a LEFT OUTER JOIN subgenres sg ON a.genre_id = sg.id LEFT OUTER JOIN favorites f ON a.id = f.article_id LEFT OUTER JOIN users u ON a.user_id = u.id WHERE a.is_edit = false AND (a.is_public = true OR (a.is_public = false AND u.company_id = ${companyId})) GROUP BY a.id, u.name, sg.id ORDER BY a.create_at DESC;`;

    return rows;
};

exports.findArticlesByUserId = async (req) => {
    const { userId } = req.query;

    try {
        const rows = await sql`SELECT sg.id AS subgenre_id, sg.name AS subgenre_name, a.id AS id, a.title AS title, a.description AS description, a.is_edit AS is_edit, a.is_public AS is_public, to_char(a.create_at, 'YYYY/MM/DD') AS create_at, count(f.id) AS favorite_count FROM articles a LEFT OUTER JOIN subgenres sg ON a.genre_id = sg.id LEFT OUTER JOIN favorites f ON a.id = f.article_id LEFT OUTER JOIN users u ON a.user_id = u.id WHERE a.user_id = ${userId} GROUP BY a.id, u.name, sg.id ORDER BY a.create_at DESC;`;

        return rows;
    } catch (err) {
        console.err(err);
        throw new Error("記事の取得に失敗しました");
    }
};

exports.findArticlesByTitle = async (req) => {
    const { search } = req.query;
    const title = "%" + search + "%";

    try {
        const rows = await sql`SELECT sg.id AS subgenre_id, sg.name AS subgenre_name, a.id AS id, a.title AS title, a.description AS description, a.is_edit AS is_edit, a.is_public AS is_public, to_char(a.create_at, 'YYYY/MM/DD') AS create_at, count(f.id) AS favorite_count FROM articles a LEFT OUTER JOIN subgenres sg ON a.genre_id = sg.id LEFT OUTER JOIN favorites f ON a.id = f.article_id LEFT OUTER JOIN users u ON a.user_id = u.id WHERE title like ${title} GROUP BY a.id, u.name, sg.id ORDER BY a.create_at DESC;`;

        return rows;
    } catch (err) {
        console.err(err);
        throw new Error("記事の取得に失敗しました");
    }
};

exports.findByGenre = async (req) => {
    const {id, companyId} = req.query;

    try {
        const rows = await sql`SELECT sg.id AS subgenre_id, sg.name AS subgenre_name, a.id AS id, a.title AS title, a.description AS description, a.is_edit AS is_edit, a.is_public AS is_public, to_char(a.create_at, 'YYYY/MM/DD') AS create_at, count(f.id) AS favorite_count FROM articles a LEFT OUTER JOIN subgenres sg ON a.genre_id = sg.id LEFT OUTER JOIN favorites f ON a.id = f.article_id LEFT OUTER JOIN users u ON a.user_id = u.id WHERE sg.id = ${id} AND a.is_edit = false AND (a.is_public = true OR (a.is_public = false AND u.company_id = ${companyId})) GROUP BY a.id, u.name, sg.id ORDER BY a.create_at DESC;`

        return rows;
    } catch (err) {
        console.err(err);
        throw new Error("記事の取得に失敗しました");
    }
};

exports.findArticleByid = async (req) => {
    const {postId} = req.query;

    try {
        const rows = await sql`SELECT sg.id AS subgenre_id, sg.name AS subgenre_name, u.name AS user_name, a.id AS id, a.title AS title, a.description AS description, a.img_path AS a_img_path, a.is_edit AS is_edit, a.is_public AS is_public, to_char(a.create_at, 'YYYY/MM/DD') AS create_at, sa.sub_title AS sub_title, sa.content AS content, sa.img_path AS sa_img_path, count(f.id) AS favorite_count FROM articles a LEFT OUTER JOIN sub_articles sa ON a.id = sa.parent_id LEFT OUTER JOIN subgenres sg ON a.genre_id = sg.id LEFT OUTER JOIN favorites f ON a.id = f.article_id LEFT OUTER JOIN users u ON a.user_id = u.id WHERE a.id = ${postId} GROUP BY a.id, u.name, sg.id, sa.id, sa.sub_title, sa.content, sa.img_path ORDER BY sa.id ASC;`;

        const articlesMap = new Map();

        for (const row of rows) {
            const id = row.id;

            if (!articlesMap.has(id)) {
                articlesMap.set(id, {
                    subgenreId: row.subgenre_id,
                    subgenreName: row.subgenre_name,
                    userName: row.user_name,
                    id: id,
                    title: row.title,
                    description: row.description,
                    aImgPath: row.a_img_path,
                    isEdit: row.is_edit,
                    isPublic: row.is_public,
                    createAt: row.create_at,
                    subArticles: [],
                    favoriteCount: row.favorite_count,
                });
            }

            if (row.sub_title !== null) {
                articlesMap.get(id).subArticles.push({
                    subTitle: row.sub_title,
                    content: row.content,
                    saImgPath: row.sa_img_path,
                })
            }
        }

        return Array.from(articlesMap.values())[0];
    } catch (err) {
        console.log(err);
        throw new Error("記事の取得に失敗しました");
    }
};

exports.saveArticle = async (req) => {
    const { userId, genreId, title, description, imgPath } = req.body;
    const rows = await sql`INSERT INTO articles (user_id, genre_id, title, description, img_path) VALUES (${userId}, ${genreId}, ${title}, ${description}, ${imgPath}) RETURNING id;`;
    return rows[0].id;
};

exports.saveSubArticle = async (subpost, parentId) => {
    const { subTitle, content, imgPath } = subpost;
    await sql`INSERT INTO sub_articles (parent_id, sub_title, content, img_path) VALUES (${parentId}, ${subTitle}, ${content}, ${imgPath});`;
};

exports.deleteArticle = async (req) => {
    const { postId } = req.body;
    await sql`with delete_articles as (delete from articles where id = ${postId} returning id) delete from sub_articles where parent_id in (select id from delete_articles);`;
};

exports.postStatus = async (req) => {
    const {articleId, isPublic} = req.body;
    await sql`UPDATE articles SET is_edit = false, is_public = ${isPublic} WHERE id = ${articleId};`;
};

exports.favorite = async (req) => {
    const {postId, userId} = req.body;
    await sql`DELETE FROM favorites WHERE article_id = ${postId} AND user_id = ${userId};`;
    await sql`INSERT INTO favorites (article_id, user_id) VALUES (${postId}, ${userId});`;
};

exports.getComments = async (articleId) => {
    const rows = await sql`SELECT c.id, c.comment, u.id AS user_id, u.name AS user_name, to_char(c.create_at, 'YYYY/MM/DD HH24:MI') AS create_at FROM skill_commnets c INNER JOIN users u ON c.user_id = u.id WHERE c.article_id = ${articleId} ORDER BY c.create_at DESC;`;
    return rows;
};

exports.insertComment = async (comment, userId, articleId) => {
    const rows = await sql`INSERT INTO skill_commnets (comment, article_id, user_id) VALUES (${comment}, ${articleId}, ${userId}) RETURNING article_id;`;
    return rows[0];
};

exports.problem = async (problem, articleId) => {
    await sql`INSERT INTO problems (problem, article_id) VALUES (${problem}, ${articleId});`;
};

exports.showFavorite = async (userId) => {
    const rows = sql`SELECT f.id AS id, f.article_id AS articleId, a.title AS title, sg.name AS genre_name FROM favorites f INNER JOIN articles a ON f.article_id = a.id INNER JOIN subgenres sg ON a.genre_id = sg.id INNER JOIN users u ON f.user_id = u.id WHERE u.id = ${userId};`;
    return rows;
};
