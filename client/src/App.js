import React, { Component } from 'react';
import './App.css';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' }
    }
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying(){
    spotifyApi.getMyCurrentPlaybackState()
        .then((response) => {
          console.log(typeof response)
          this.setState({
            nowPlaying: { 
                name: response.item.name, 
                albumArt: response.item.album.images[0].url
              }
          });
        })
  }
  render() {
    return (
      <div className="App" style = {{backgroundImage: `url(${this.state.nowPlaying.albumArt})`}}>
        <div className = "albumArt">
          <img src={this.state.nowPlaying.albumArt}/>
        </div>
        <div className = "content">
          <div>
            <p>Now Playing</p>
            <h1>{this.state.nowPlaying.name}</h1>
          </div>
          { this.state.loggedIn &&
            <button onClick={() => this.getNowPlaying()}>
              Refresh
            </button>
          }
          <a href='http://localhost:8888' > Login to Spotify </a>
        </div>
      </div>
    );
  }
}

export default App;

/*
import React, {Component} from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

class App extends Component{
  constructor(){
    super();
    const params = this.getHashParams(); 
    this.state = {
      loggedIn: params.access_token ? true : false,
      nowPlaying: {
        name: 'Not checked',
        image: ''
      }
    }
    if (params.access_token){
      spotifyWebApi.setAccessToken(params.access_token)
    }
  }
  getHashParams(){
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  getNowPlaying(){
    spotifyWebApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying:{
            name: response.item.name,
            image: response.item.album.images[0].url
          }
        })
      })
  }

  render(){
    return (
      <div className="App">
        <a href = "http://localhost:8888">
          <button>Log In With Spotify</button>
        </a>
        <div>Now Playing: {this.state.nowPlaying.name} </div>
        <div>
          <img src = {this.state.nowPlaying.image} style = {{ width: 100 }}/>
        </div>
        <button onclick = {() => this.getNowPlaying()}>
          Check Now Playing
        </button>
      </div>
    );
  } 
}

export default App;


*/