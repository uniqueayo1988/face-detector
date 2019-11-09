import React from 'react'

const FaceRecognition = ({input, box}) => {
  const {leftCol, topRow, rightCol, bottomRow} = box
  return (
    <div className="center ma">
    <div className="absolute mt2">
      <img id="inputImage" src={input} alt="Face(s)" width="500" height="auto"/>
      <div 
        className="bounding-box" 
        style={{top: topRow, right: rightCol, bottom: bottomRow, left: leftCol}}
      >
      </div>
    </div>
    </div>
  )
}

export default FaceRecognition

// "https://samples.clarifai.com/face-det.jpg"
// https://images.pexels.com/photos/2092709/pexels-photo-2092709.jpeg
// https://scx1.b-cdn.net/csz/news/800/2018/1-detectingfak.jpg
