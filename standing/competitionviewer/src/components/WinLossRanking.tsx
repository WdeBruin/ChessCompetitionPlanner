import React, { Component, Fragment } from 'react';
import db from '../firebase';
import { Game, Player, WinLossStandingLine } from '../Models';
import { StyledTable, StyledTr, StyledTh, StyledTd } from './Styled';

interface Props {
    clubKey: string;
    competitionKey: string;
}

interface State {
    winLossLines?: WinLossStandingLine[];
}

class WinLossRanking extends Component<Props, State> {
    public componentDidMount() {
        // get players
        const playersRef = db.collection(`clubs/${this.props.clubKey}/players`);
        const tempPlayerList: Player[] = [];
        playersRef.get()
            .then((players) => {
                players.forEach((doc) => {
                    tempPlayerList.push(doc.data() as Player);
                });

                // get games
                const tempGamesList: Game[] = [];
                // tslint:disable-next-line: max-line-length
                const gamesRef = db.collection(`clubs/${this.props.clubKey}/competitions/${this.props.competitionKey}/games`);
                gamesRef.get()
                    .then((games) => {
                        games.forEach((doc) => {
                            tempGamesList.push(doc.data() as Game);
                        });

                        this.calculateLines(tempPlayerList, tempGamesList);
                    });
            });
    }

    public render() {
        return (
            <Fragment>
                {this.state && this.state.winLossLines && this.renderWinLoss()}
            </Fragment>
        );
    }

    private renderWinLoss() {
        return (
            <StyledTable>
                <thead>
                    <StyledTr>
                        <StyledTh scope='col'>#</StyledTh>
                        <StyledTh scope='col'>Naam</StyledTh>
                        <StyledTh scope='col'>Winst/Verlies</StyledTh>
                    </StyledTr>
                </thead>
                <tbody>
                    {this.state.winLossLines && this.renderLines()}
                </tbody>
            </StyledTable>
        );
    }

    private renderLines() {
        return (
            this.state.winLossLines &&
            this.state.winLossLines.map((sl, i) => {
                return (
                    <StyledTr key={i}>
                        <StyledTh scope='row'>{i + 1}</StyledTh>
                        <StyledTd>{sl.playerName}</StyledTd>
                        <StyledTd>{sl.delta}</StyledTd>
                    </StyledTr>
                );
            })
        );
    }

    private calculateLines(playerList: Player[], gamesList: Game[]) {
        let winLossLines: WinLossStandingLine[] = [];

        const add = (a: number, b: number) => a + b;

        playerList.forEach((player) => {
            const whiteWins = gamesList.filter((x) => x.whitePlayerKey === player.key && x.result === 1);
            const whiteDraws = gamesList.filter((x) => x.whitePlayerKey === player.key && x.result === 0.5);
            const whiteLosses = gamesList.filter((x) => x.whitePlayerKey === player.key && x.result === 0);
            const blackWins = gamesList.filter((x) => x.blackPlayerKey === player.key && x.result === 0);
            const blackDraws = gamesList.filter((x) => x.blackPlayerKey === player.key && x.result === 0.5);
            const blackLosses = gamesList.filter((x) => x.blackPlayerKey === player.key && x.result === 1);

            let total: number = 0;
            total += whiteWins.map((x) => x.whiteWinEloChange).reduce(add, 0);
            total += whiteDraws.map((x) => x.whiteDrawEloChange).reduce(add, 0);
            total += whiteLosses.map((x) => x.whiteLossEloChange).reduce(add, 0);
            total += blackWins.map((x) => x.blackWinEloChange).reduce(add, 0);
            total += blackDraws.map((x) => x.blackDrawEloChange).reduce(add, 0);
            total += blackLosses.map((x) => x.blackLossEloChange).reduce(add, 0);

            winLossLines.push({ playerName: `${player.firstName} ${player.lastName}`,
                                delta: (Math.round(total * 10) / 10) });
        });

        winLossLines = winLossLines.sort((a, b) => b.delta - a.delta);
        this.setState({ ...this.state, winLossLines });
    }
}

export default WinLossRanking;
