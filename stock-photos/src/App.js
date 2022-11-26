import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";
// const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;
const clientID = process.env.REACT_APP_ACCESS_KEY;
// need to restart the server

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [newImages, setNewImages] = useState(false);
  const mounted = useRef(false);

  const fetchImages = async () => {
    let url;
    if (searchTerm) {
      url = `${searchUrl}?client_id=${clientID}&page=${page}&query=${searchTerm}`;
    } else {
      url = `${mainUrl}?client_id=${clientID}&page=${page}`;
    }
    try {
      setLoading(true);
      const resp = await fetch(url);
      const data = await resp.json();
      setPhotos((oldPhoto) => {
        if (searchTerm && page === 1) {
          return data.results;
        } else if (searchTerm) {
          return [...oldPhoto, ...data.results];
        } else {
          return [...oldPhoto, ...data];
        }
      });
      setNewImages(false); //before setLoading!
      setLoading(false);
    } catch (error) {
      console.log(error);
      setNewImages(false);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchImages();
  }, [page]);

  // listen to scroll event

  // useEffect(() => {
  //   const event = window.addEventListener("scroll", () => {
  //     if (
  //       !loading &&
  //       window.innerHeight + window.scrollY > document.body.scrollHeight - 3
  //     ) {
  //       setPage((oldPage) => oldPage + 1);
  //     }
  //   });
  //   return () => window.removeEventListener("scroll", event);
  // }, []);

  useEffect(() => {
    // use useRef to prevent only the first render
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (!newImages) return;
    if (loading) return;
    setPage((oldPage) => oldPage + 1);
  }, [newImages]);

  const event = () => {
    // as scroll, once we reach the bottom, we set newImage to true
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      setNewImages(true);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", event);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm) return;
    if (page === 1) {
      fetchImages();
    }
    setPage(1);
  };

  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input
            type="text"
            placeholder="search for photos..."
            className="form-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="submit-btn" type="submit" onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map((photo, index) => {
            return <Photo key={index} {...photo} />;
          })}
        </div>
        {loading && <h2 className="loading">loading...</h2>}
      </section>
    </main>
  );
}

export default App;
