import express from "express"
import pg from "pg"
import dotenv from "dotenv"
import cors from "cors"
const app = express();

//port
const port = process.env.port || 8000;
dotenv.config({path: './.env'})

const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'music',
    password: process.env.PG_PASS,
    port: 5432
})
//server inst
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

//GET ALL

app.get('/api/bands', async (req, res) => {
    const client = await pool.connect();
    try{
        const result = await client.query('SELECT * FROM bands', []);
        res.json(result.rows);
    }
    catch (err) {
        res.status(500).send(err);
    }
    finally{
        client.release();
    }
});

app.get('/api/albums', async (req, res) => {
    const client = await pool.connect();
    try{
        const result = await client.query('SELECT * FROM albums', []);
        res.json(result.rows);
    }
    catch (err) {
        res.status(500).send(err);
    }
    finally{
        client.release();
    }
});

//GET ONE
app.get('/api/bands/:id', async (req, res) => {
    const client = await pool.connect();
    try{
        const result = await client.query('SELECT * FROM bands WHERE band_id = $1', [req.params.id]);
        res.json(result.rows);
    }
    catch (err) {
        res.status(500).send(err);
    }
    finally{
        client.release();
    }
});

app.get('/api/albums/:id', async (req, res) => {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM albums WHERE album_id = $1', [req.params.id]);
        res.json(result.rows); 
    } 
    catch (err) {
        res.status(500).send(err);
    }
    finally{
        client.release();
    }
});

//CREATE ONE
app.post('/api/bands', async (req, res) => {
    const client = await pool.connect();
    const {band_name, genre} = req.body;
    try {
        const result = await client.query('INSERT INTO bands (band_name, genre) VALUES ($1,$2)', [band_name, genre]);
        res.json(req.body);
    }
    catch (err) {
        res.status(500).send(err);
    }
    finally{
        client.release();
    }
});

app.post('/api/albums', async (req, res) => {
    const client = await pool.connect(); 
    const {album_title, song_count, pitchfork_rating, band_id} = req.body;
    try {
        const result = await client.query('INSERT INTO albums (album_title, song_count, pitchfork_rating, band_id) VALUES ($1,$2,$3,$4)', [album_title, song_count, pitchfork_rating, band_id]);
        res.json(req.body); 
    }
    catch (err) {
        res.status(500).send(err);
    }
    finally{
        client.release();
    }
});

//PUT ONE
app.put('/api/bands/:id', async (req, res) => {
    const client = await pool.connect();
    const {id} = req.params;
    const {band_name, genre} = req.body;
    try {
        const result = await client.query('UPDATE bands SET band_name = $1, genre = $2 WHERE band_id = $3', [band_name, genre, id]);
        res.json(req.body);
    }
    catch (err) {
        res.status(500).send(err);
    }
    finally{
        client.release();
    }
});

app.put('/api/albums/:id', async (req, res) => {
    const client = await pool.connect();
    const {id} = req.params;
    const {album_title, song_count, pitchfork_rating, band_id} = req.body;
    try {
        const result = await client.query('UPDATE albums SET album_title = $1, song_count = $2, pitchfork_rating = $3, band_id = $4 WHERE album_id = $5', [album_title, song_count, pitchfork_rating, band_id, id]);
        res.json(req.body);
    }
    catch (err) {
        res.status(500).send(err);
    }
    finally{
        client.release();
    }
});

//DELETE ONE
app.delete('/api/bands/:id', async (req, res) => {
    const client = await pool.connect();
    const {id} = req.params;
    try {
        const result = await client.query('DELETE FROM bands WHERE band_id = $1', [id]);
        res.json(result.rows);
    }
    catch (err) {
        res.status(500).send(err);
    }
    finally{
        client.release();
    }
});

app.delete('/api/albums/:id', async (req, res) => {
    const client = await pool.connect();
    const {id} = req.params;
    try {
        const result = await client.query('DELETE FROM albums WHERE album_id = $1', [id]);
        res.json(result.rows);
    }
    catch (err) {
        res.status(500).send(err);
    }
    finally{
        client.release();
    }
});

//listener
app.listen(port,() => {
    console.log("Server running on port", port);
})