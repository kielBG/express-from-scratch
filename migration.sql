CREATE DATABASE music;

\c music;

CREATE TABLE bands (
    band_id serial PRIMARY KEY,
    band_name varchar(50),
    genre varchar(20)
);

CREATE TABLE albums (
    album_id serial PRIMARY KEY,
    album_title varchar(50),
    song_count integer,
    pitchfork_rating integer,
    band_id integer REFERENCES bands(band_id)
);