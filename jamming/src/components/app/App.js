import React from 'react';

import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import PlayList from '../Playlist/PlayList.js';
import Spotify from '../../util/Spotify.js';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state= {
      searchResults: [],
      playlistName: 'Playlist', 
      playlistTracks: []
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack (track){
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)){
      return (alert('Track already exists in playlist'));
    } 

    tracks.push(track);
    this.setState({playlistTracks: tracks});
  }

  removeTrack (track){
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(savedTrack => savedTrack.id !== track.id);

    this.setState({playlistTracks: tracks});
  }

  updatePlaylistName (newName){
    this.setState({ playlistName: newName});
  }

  savePlaylist (){
    alert("The " + this.state.playlistName + " has been saved successfully!");
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    });
  }
  
  search (term){
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults})
    });
  }
  
  render() {
    return (
      <div>
        <h1>Spotify <span className="highlight">Playlist</span> Maker</h1>
        <div className="App">
          < SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} 
                            onAdd={this.addTrack}/>
            <PlayList playlistName={this.state.playlistName} 
                      playlistTracks={this.state.playlistTracks} 
                      onRemove={this.removeTrack}
                      onNameChange={this.updatePlaylistName}
                      onSave={this.savePlaylist}/>
        </div>
    </div>
  </div>

    
   )
  }
}


export default App;
