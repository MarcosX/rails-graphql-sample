import React, { Component } from 'react';
import logo from './logo.svg';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ApolloConsumer } from 'react-apollo';
import './App.css';

const GET_GAME_QUERY = gql`
  query GetGame($id: Int!) {
    game(id: $id) {
      name
      characters {
        name
      }
    }
  }
`

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: 1,
      game: props.data.game,
      loading: props.data && props.data.loading,
      error: props.data && props.data.error,
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      game: newProps.data.game,
      loading: newProps.data && newProps.data.loading,
      error: newProps.data && newProps.data.error,
    });
  }

  render() {
    if (this.state.loading) {
      return <div>Loading</div>;
    }

    if (this.state.error){
      return <div>Error</div>
    }

    return (
      <ApolloConsumer>
        { client => (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <input type="text" value={this.state.gameId} onChange={this.handleChange.bind(this)} />
          <button onClick={this.findGameId.bind(this, client, this.state.gameId)}>Search for game {this.state.gameId}</button>
          <h1>{this.state.game.name}</h1>
          <p>Chars:</p>
          <ul>{this.state.game.characters.map(c => <li key={c.name}>{c.name}</li>)}</ul>
        </div>
        )}
      </ApolloConsumer>
    );
  }

  async findGameId(client, gameId, e) {
    const {data} = await client.query({
      query: GET_GAME_QUERY,
      variables: { id: parseInt(gameId, 10) }
    });
    console.log("Search for game id " + gameId);
    this.onGameFetched(data, gameId);
  }

  onGameFetched(data, gameId) {
    console.log(data)
    this.setState({
      gameId: gameId,
      game: data.game,
      loading: data && data.loading,
      error: data && data.error,
    })
  }

  handleChange(e) {
    this.setState({gameId: e.target.value});
  }
}

export default graphql(gql`
  query GetGame {
    game(id: 1) {
      name
      characters {
        name
      }
    }
  }
`)(App);
