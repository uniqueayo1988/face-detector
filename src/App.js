import React from 'react';
import Particles from 'react-particles-js'
import Clarifai from 'clarifai'
import Navigation from './components/Navigation'
import FaceRecognition from './components/FaceRecognition'
import Logo from './components/Logo'
import ImageLinkForm from './components/ImageLinkForm'
import Rank from './components/Rank'
import './App.css';

const particlesOptions = {
  "particles": {
    "number": {
      "value": 160,
      "density": {
        "enable": false
      }
    },
    "size": {
      "value": 10,
      "random": true
    },
    "line_linked": {
        "enable": false
    }
  }
}

const app = new Clarifai.App({
 apiKey: '4f5e9705cef64ee8950179118a78540e'
});

class App extends React.Component {
  state = {
    input: '',
    box: {}
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage')
    const width = Number(image.width)
    const height = Number(image.height)
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({
      box
    })
  }

  onInputChange = (e) => {
    this.setState({
      box: {},
      input: e.target.value
    })
  }

  onSubmit = () => {
    app.models.predict(
        // "a403429f2ddf4b49b307e318f00e528b",
        Clarifai.FACE_DETECT_MODEL,
        this.state.input
      ).then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err))
  }

  render () {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onChange={this.onInputChange} onSubmit={this.onSubmit} />
        <FaceRecognition box={this.state.box} input={this.state.input}/>
      </div>
    );
  }
}

export default App;
