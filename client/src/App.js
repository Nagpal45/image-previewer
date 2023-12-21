import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState();

  useEffect(() => {
    axios.get('http://localhost:8000/images')
    .then(response => {setImages(response.data.images)
    setSelectedImage(response.data.images[0])}
    )
    .catch(error => console.error('Error fetching images:', error));
}, []);

const handleImageSelect = (image) => {
  setSelectedImage(image);
  console.log(selectedImage);
}

  return (
    <div className="App">
      <div className="topbar">
        <img src="/images/fpLogo.svg" alt="logo" />
        <p>Welcome</p>
      </div>
      <div className="center">
        <div className="imagesContainer">
          <p>Showing {images.length-1} photos</p>
          <img
            src={`http://localhost:8000/image-preview/${selectedImage?.file_name}`}
            alt={selectedImage?.file_name}
          />
          <div className="bottomBar">
            <div className="infoContainer">
              <p>8/15 in-view</p>
              <p>1 Selected/{selectedImage?.file_name }</p>
              <p>Arrow</p>
            </div>
            <div className="images">
            {images.map((image, index) => (
              <img
                key={index}
                src={`http://localhost:8000/image-preview/${image.file_name}`}
                alt={image.file_name}
                onClick={() => handleImageSelect(image)}
              />
            ))}
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
              <p className="detailValue">{
                selectedImage?.exif_info["EXIF LensModel"]
              }
              </p>
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
