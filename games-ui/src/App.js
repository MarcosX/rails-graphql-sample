import React from 'react';
import logo from './logo.svg';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import './App.css';

function App({data: {game}}) {
  console.log(game)
  return (
    <div className="App">
    <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h1 className="App-title">Welcome to React</h1>
    </header>
    <h1>{game && game.name}</h1>
    <p>Chars:</p>
    <ul>{game && game.characters.map(c => <li key={c.name}>{c.name}</li>)}</ul>
    </div>
  );
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
