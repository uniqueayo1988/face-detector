import React from 'react';
import Particles from 'react-particles-js'
import Clarifai from 'clarifai'
import Navigation from './components/Navigation'
import FaceRecognition from './components/FaceRecognition'
import Logo from './components/Logo'
import ImageLinkForm from './components/ImageLinkForm'
import Rank from './components/Rank'
import Signin from './components/Signin'
import Register from './components/Register'
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
    box: {},
    route: 'signin',
    isSignedIn: false
  }

  componentDidMount () {
    fetch('http://localhost:8080')
      .then(response => response.json())
      .then(data => console.log(data, 'hello....'))
      // .then(console.log)
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

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({
        isSignedIn: false
      })
    } else if (route === 'home') {
      this.setState({
        isSignedIn: true
      })
    }
    this.setState({
      route: route
    })
  }

  render () {
    const {route, box, input, isSignedIn} = this.state
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        { route === 'home'
          ? <div> 
            <Logo />
            <Rank />
            <ImageLinkForm onChange={this.onInputChange} onSubmit={this.onSubmit} />
            <FaceRecognition box={box} input={input}/>
          </div>
          : (
            route === 'signin'
            ? <Signin onRouteChange={this.onRouteChange} />
            : <Register onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}

export default App;
