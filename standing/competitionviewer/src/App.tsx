import React, { Component, Fragment } from 'react';
import Ranking from './components/Ranking';
import RoundSelect from './components/RoundSelect';
import db from './firebase';
import { Player } from './Models';

/*
Task of App is getting the data and passing it to the other components.
*/

interface Props {
  competitionKey: string;
  clubKey: string;
}

interface State {
  playerList: Player[];
  roundNumbers: number[];
}

class App extends Component<Props, State> {
  public componentDidMount() {
    const playersRef = db.collection(`clubs/${this.props.clubKey}/players`);
    const tempPlayerList: Player[] = [];
    playersRef.get()
      .then((players) => {
        players.forEach((doc) => {
          tempPlayerList.push(doc.data() as Player);
        });

        this.setState({ ...this.state, playerList: tempPlayerList });
      });

    // tslint:disable-next-line: max-line-length
    const roundsRef = db.collection(`clubs/${this.props.clubKey}/competitions/${this.props.competitionKey}/rounds`).where('roundStatus', '==', 2);
    const tempRoundNumbers: number[] = [];
    roundsRef.get()
      .then((rounds) => {
        rounds.forEach((doc) => {
          tempRoundNumbers.push(doc.data().roundNumber);
        });
        this.setState({ ...this.state, roundNumbers: tempRoundNumbers });
      });
  }

  public render() {
    return (
      <Fragment>
        <h1>{this.props.competitionKey}</h1>
        <h1>{this.props.clubKey}</h1>

        {this.state && this.state.roundNumbers && <RoundSelect roundNumbers={this.state.roundNumbers} />}
        {this.state && this.state.playerList && <Ranking players={this.state.playerList} />}

      </Fragment>
    );
  }
}

export default App;
