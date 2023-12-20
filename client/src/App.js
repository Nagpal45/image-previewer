import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/images')
    .then(response => setImages(response.data))
    .catch(error => console.error('Error fetching images:', error));
}, []);
console.log(images);

  return (
    <div className="App">
      <div className="topbar">
        <img src="/images/fpLogo.svg" alt="logo" />
        <p>Welcome</p>
      </div>
      <div className="center">
        <div className="imagesContainer">
          <p>Showing 20 photos</p>
          <img
            src="https://images.unsplash.com/photo-1701730282717-f6478c8f2186?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="1"
          />
          <div className="bottomBar">
            <div className="infoContainer">
              <p>200/200 in-view</p>
              <p>1 Selected/Vaibhav.jpg</p>
              <p>Arrow</p>
            </div>
            <div className="images">
              {
                Array(10).fill().map((_, index) => (
          <img key={index} src={
            "https://images.unsplash.com/photo-1701730282717-f6478c8f2186?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          } alt=""/>
        ))
              }
            </div>
          </div>
        </div>
        <div className="rightBar">
          <div className="line"></div>
          <div className="detailHead">
            <p>About Image</p>
          </div>
          <div className="details">
            <div className="detail">
              <p className="detailTitle">Lens</p>
              <p className="detailValue">1</p>
            </div>
            <div className="detail">
              <p className="detailTitle">Lens AF</p>
              <p className="detailValue">2</p>
            </div>
            <div className="detail">
              <p className="detailTitle">Capture Time</p>
              <p className="detailValue">3</p>
            </div>
            <div className="detail">
              <p className="detailTitle">ISO</p>
              <p className="detailValue">4</p>
            </div>
            <div className="detail">
              <p className="detailTitle">Speed</p>
              <p className="detailValue">5</p>
            </div>
            <div className="detail">
              <p className="detailTitle">Aperature</p>
              <p className="detailValue">6</p>
            </div>
            <div className="detail">
              <p className="detailTitle">FileName</p>
              <p className="detailValue">7</p>
            </div>
            <div className="detail">
              <p className="detailTitle">ImageSize</p>
              <p className="detailValue">8</p>
            </div>
            <div className="detail">
              <p className="detailTitle">WhiteBalance</p>
              <p className="detailValue">9</p>
            </div>
            <div className="detail">
              <p className="detailTitle">Rating</p>
              <p className="detailValue">10</p>
            </div>
            <div className="detail">
              <p className="detailTitle">Colour</p>
              <p className="detailValue">11</p>
            </div>
            <div className="detail">
              <p className="detailTitle">Camera</p>
              <p className="detailValue">12</p>
            </div>
          </div>
          <div className="downloadContainer">
            <div className="downloadButton">
              <p>Download</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
