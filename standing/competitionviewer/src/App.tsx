import React, { Component, Fragment } from 'react';
import Ranking from './components/Ranking';
import RoundSelect from './components/RoundSelect';
import db from './firebase';
import { Player, StandingLine } from './Models';

/*
Task of App is getting the data and passing it to the other components.
*/

interface Props {
  competitionKey: string;
  clubKey: string;
}

interface State {
  playerList: Player[];
  standingLineList: StandingLine[];
  roundNumbers: number[];
  selectedRound: number;
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
        tempRoundNumbers.sort((a, b) => b - a);
        this.setState({ ...this.state, roundNumbers: tempRoundNumbers, selectedRound: tempRoundNumbers[0] });
        this.handleRoundSelect(tempRoundNumbers[0]);
      });
  }

  public render() {
    return (
      <Fragment>
        {this.renderRoundSelect()}
        {this.renderStanding()}

      </Fragment>
    );
  }

  private renderRoundSelect() {
    if (this.state && this.state.roundNumbers) {
      return (
        <RoundSelect
          roundNumbers={this.state.roundNumbers}
          onChange={(selected) => this.handleRoundSelect(selected.value)}
          selected={this.state.selectedRound}
        />
      );
    }
  }

  private renderStanding() {
    if (this.state && this.state.playerList) {
      return (<Ranking players={this.state.playerList} standingLines={this.state.standingLineList} />);
    }
  }

  private handleRoundSelect(selectedRound: number) {
    // tslint:disable-next-line: max-line-length
    if (selectedRound) {
      const standingsRef = db.collection(`clubs/${this.props.clubKey}/competitions/${this.props.competitionKey}/standingLines`).where('roundNumber', '==', selectedRound);
      const tempStandingLineList: StandingLine[] = [];
      standingsRef.get()
        .then((standingLines) => {
          standingLines.forEach((doc) => {
            tempStandingLineList.push(doc.data() as StandingLine);
          });
          tempStandingLineList.sort((a, b) => b.percentage - a.percentage);
          this.setState({ ...this.state, standingLineList: tempStandingLineList });
        });
    }
  }

}

export default App;
