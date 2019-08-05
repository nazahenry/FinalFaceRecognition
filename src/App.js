import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Signin from './components/Signin/Signin';
import Rank from './components/Rank/Rank';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';




const particlesOptions = { 
   particles: {
    number: {
      value: 200,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user:  {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
  }



class App extends Component {
  constructor(){
    super();
    this.state = initialState;
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

  //Receives an update when the text in the search field changes.
  onInputChange = (e) => {
    this.setState({input: e.target.value});
  }


  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }


  displayFaceBox = (box) => {
    this.setState({box: this.calculateFaceLocation(box)});
  }


  //Submitting the picture
  onPictureSubmit = () => {
    this.setState({imageUrl: this.state.input});
    // async function drop(){
    //   try {
    //     const predict = await app.models.predict(Clarifai.FACE_DETECT_MODEL , this.state.input);
    //     console.log(predict);
    //   } catch (error) {
    //     console.log("Unexpected Error", error);
    //   }
    // }
    // drop();

      fetch('http://localhost:4000/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input,
            })
      }) 
      .then(response => response.json())
      .then(response => {
        if(response){
          fetch('http://localhost:4000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id,
                })
            }) 
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}));
          })
          .catch(err => console.log('Unable to Fetch', err));
        }
        this.displayFaceBox(response)
      })
      .catch(err => console.log("There was an Error", err));
  }


  onRouteChange = (route) => {
    if (route === 'signout'){
      this.setState(initialState);
    } else if (route === 'home'){
      this.setState({isSignedIn: true});
    }
     this.setState({route: route});
  }


  render() {
    return (
    <div className="App">
      <Particles className='particles'
          params={particlesOptions} 
      />

      <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />

      { this.state.route === 'home'

        ? <div>
              <Logo /> 
              <Rank 
                name={this.state.user.name} 
                entries={this.state.user.entries} />
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onPictureSubmit={this.onPictureSubmit} />
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
          </div>
          
        : ( (this.state.route === 'signin') 

        ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
        
        : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        )
      }
    </div>
  );
}

}


export default App;
