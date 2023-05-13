import './App.css';
import React, {Component} from 'react';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-tsparticles';
import { loadFull } from "tsparticles";
import Clarifai from 'clarifai';

const app = new Clarifai.App({
    apiKey: '9bb1855e5eec413f9f3868648c2a9b18'
   });

const particlesOptions =  {
    "particles": {
        "number": {
            "value": 30,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#fff"
        },
        "shape": {
            "type": "circle",
            "options": {
                "sides": 5
            }
        },
        "opacity": {
            "value": 0,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 4,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 600,
            "color": "#efafcf",
            "opacity": 0.2,
            "width": 2
        },
        "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "events": {
            "onhover": {
                "enable": true,
                "mode": ["grab"]
            },
            "onclick": {
                "enable": false,
                "mode": "bubble"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
}
class App extends Component {
  constructor() {
    super();
    this.particlesInit = async (main) => {
      console.log(main);
  
      // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      
      await loadFull(main);
    };

    this.state ={
        input: '',
        imageUrl:'',
        box: {},
        route: 'signin',
        isSignedIn: false,
        user: {
            id: '',
            name: '',
            email: '',
            entries: 0,
            joined: ''
        }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
  }
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
        // the number clarifaiFace.left_col is the percentage of detected left face column from the overal width
        // so we multiply it by the width to get the position value of lift column
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
    }

  }


  displayFaceBox = (box) => {
    this.setState({box: box});
  }
  
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict('face-detection',this.state.input).then(response =>
            {
                if (response) {
                    fetch('http://localhost:3000/image',{
                        method: 'put',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            id: this.state.user.id
                            })
                    })
                    .then(res => res.json())
                    .then(count => {
                        this.setState(Object.assign(this.state.user, { entries: count }));
                    })
            }
            this.displayFaceBox(this.calculateFaceLocation(response))
            })
        .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
        this.setState({isSignedIn: false});
    } else if (route === 'home') {
        this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  render() {
    const {isSignedIn, imageUrl, route, box} = this.state;
    return (
      <div className="App">

      <Particles className='particles'
      id="tsparticles"
      init={this.particlesInit}

      options={particlesOptions}
       />  
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {route === 'home'  
           ?<div>
           <Logo />    
           <Rank name={this.state.user.name} entries={this.state.user.entries}/>
           <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
           <FaceRecognition imageUrl={imageUrl} box={box}/>
           </div>        
           :(
              this.state.route === 'signin'
              ?<Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
              :<Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            )
        }
    </div>);
  }
 
}

export default App;
