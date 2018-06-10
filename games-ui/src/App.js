import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ApolloConsumer } from 'react-apollo';
import { PageHeader, Button, Grid, Row, Col, Well } from 'react-bootstrap';


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
          <Grid>
            <Row>
              <Col xs={6}>
                <PageHeader>{this.state.game.name}</PageHeader>
              </Col>
              <Col xs={3}>
                <input type="text" value={this.state.gameId} onChange={this.handleChange.bind(this)} />
              </Col>
              <Col xs={3}>
                <Button bsStyle="primary" onClick={this.findGameId.bind(this, client, this.state.gameId)}>Search for game {this.state.gameId}</Button>
              </Col>
            </Row>
            <Well bsSize="large">{this.state.game.characters.map(c => <Row key={c.name}>{c.name}</Row>)}</Well>
          </Grid>
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
