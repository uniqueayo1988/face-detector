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
    input: ''
  }

  onInputChange = (e) => {
    this.setState({
      input: e.target.value
    })
  }

  onSubmit = () => {
    app.models.predict(
        // "a403429f2ddf4b49b307e318f00e528b",
        Clarifai.FACE_DETECT_MODEL,
        this.state.input
      ).then(
        (response) => {
          console.log(response.outputs[0].data.regions[0].region_info.bounding_box, 'response....')
        },
        (err) => {
          console.log(err.response, 'err....')
        }
      );
  }

  render () {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onChange={this.onInputChange} onSubmit={this.onSubmit} />
        <FaceRecognition input={this.state.input}/>
      </div>
    );
  }
}

export default App;
