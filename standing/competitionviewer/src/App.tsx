import React, { Component, Fragment } from 'react';
import './App.css';
import db from './firebase';
import { Player } from './Models';
import Ranking from './Ranking';

interface Props {
  competitionKey: string;
  clubKey: string;
}

let playerList: Player[] = [];

class App extends Component<Props> {
  private data: any;

  private standingLines: any[] = [];

  public componentDidMount() {
    const playersRef = db.collection(`clubs/${this.props.clubKey}/players`);

    playersRef.get()
      .then((players) => {
        players.forEach((doc) => {
          playerList.push(doc.data() as Player);
        });
      });
  }

  public render() {
    return (
      <Fragment>
        <h1>{this.props.competitionKey}</h1>
        <h1>{this.props.clubKey}</h1>

        <Ranking players={playerList} />

      </Fragment>
    );
  }
}

export default App;
