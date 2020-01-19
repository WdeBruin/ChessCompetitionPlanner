import React, { Component, Fragment } from 'react';
import Games from './components/Games';
import Ranking from './components/Ranking';
import RoundSelect from './components/RoundSelect';
import db from './firebase';
import { Game, Player, StandingLine } from './Models';
import WinLossRanking from './components/WinLossRanking';

/*
Task of App is getting the data and passing it to the other components.
*/

interface Props {
  competitionKey: string;
  clubKey: string;
  showGames: boolean;
  showStanding: boolean;
  showWinLoss: boolean;
}

interface State {
  playerList: Player[];
  standingLineList: StandingLine[];
  gamesList: Game[];
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
        {this.props.showStanding && this.renderStanding()}
        {this.props.showGames && this.renderGames()}
        <WinLossRanking competitionKey={this.props.competitionKey} clubKey={this.props.clubKey} />
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
    if (this.state && this.state.playerList && this.state.standingLineList) {
      return (<Ranking players={this.state.playerList} standingLines={this.state.standingLineList} />);
    }
  }

  private renderGames() {
    if (this.state && this.state.playerList && this.state.gamesList) {
      return (<Games players={this.state.playerList} games={this.state.gamesList} />)
    }
  }

  private handleRoundSelect(selectedRound: number) {
    if (selectedRound) {
      // tslint:disable-next-line: max-line-length
      const standingsRef = db.collection(`clubs/${this.props.clubKey}/competitions/${this.props.competitionKey}/standingLines`).where('roundNumber', '==', selectedRound);
      let tempStandingLineList: StandingLine[] = [];
      standingsRef.get()
        .then((standingLines) => {
          standingLines.forEach((doc) => {
            tempStandingLineList.push(doc.data() as StandingLine);
          });
          tempStandingLineList = tempStandingLineList.filter((x) => x.gamesPlayed > 0);
          // tslint:disable-next-line: max-line-length
          tempStandingLineList.sort((a, b) => b.percentage === a.percentage ? b.wp - a.wp : b.percentage - a.percentage);
          this.setState({ ...this.state, standingLineList: tempStandingLineList });
        });

      // tslint:disable-next-line: max-line-length
      const gamesRef = db.collection(`clubs/${this.props.clubKey}/competitions/${this.props.competitionKey}/games`).where('roundNumber', '==', selectedRound);
      let tempGamesList: Game[] = [];
      gamesRef.get()
        .then((games) => {
          games.forEach((doc) => {
            tempGamesList.push(doc.data() as Game);
          });
          this.setState({ ...this.state, gamesList: tempGamesList });
        });

    }
  }
}

export default App;
