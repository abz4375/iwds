import React from 'react'
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import {
    getDocs,
    collection,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
  } from "firebase/firestore";

function MoviesCRUD() {
    const [movieList, setMovieList] = useState([]);

    // New Movie States
    const [newMovieTitle, setNewMovieTitle] = useState("");
    const [newReleaseDate, setNewReleaseDate] = useState(0);
    const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);
  
    // Update Title States
    const [updatedTitle, setUpdatedTitle] = useState("");
  
    const moviesCollectionRef = collection(db, "movies");
  
    const getMovieList = async () => {
      // READ THE DATA
      // SET THE MOVIE LIST
      try {
        const data = await getDocs(moviesCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMovieList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };
  
    useEffect(() => {
      getMovieList();
    }, []);
  
    const onSubmitMovie = async () => {
      try {
        await addDoc(moviesCollectionRef, {
          title: newMovieTitle,
          releaseDate: newReleaseDate,
          recievedAnOscar: isNewMovieOscar,
        });
  
        getMovieList();
      } catch (err) {
        console.error(err);
      }
    };
  
    const deleteMovie = async (id) => {
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
      getMovieList();
    };
  
    const updateMovieTitle = async (id) => {
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc, {title: updatedTitle});
      getMovieList();
    };
  
  return (
    <div className='moviesCRUD'>
        <div>
        <input
          placeholder="Movie Title..."
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          placeholder="Release Date..."
          type="number"
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          checked={isNewMovieOscar}
          onChange={(e) => setIsNewMovieOscar(e.target.checked)}
        />
        <label> Recieved an Oscar </label>
        <button onClick={onSubmitMovie}> Submit Movie </button>
      </div>

      <div>
        {movieList.map((movie) => {
          return (
            <div>
              <h1 style={{ color: movie.recievedAnOscar ? "green" : "red" }}>
                {movie.title}
              </h1>
              <p> Date: {movie.releaseDate} </p>

              <button onClick={() => deleteMovie(movie.id)}>
                Delete Movie
              </button>

              <input
                placeholder="New title..."
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
              <button onClick={() => updateMovieTitle(movie.id)}> Update Title </button>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default MoviesCRUD