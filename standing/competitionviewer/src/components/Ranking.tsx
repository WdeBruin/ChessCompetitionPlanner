import React, { Component, Fragment } from 'react';
import { Player, StandingLine } from '../Models';
import { StyledTable, StyledTd, StyledTh, StyledTr } from './Styled';

interface Props {
    players: Player[];
    standingLines: StandingLine[];
}

class Ranking extends Component<Props> {
    public render() {
        return (
            <Fragment>
                {this.props.standingLines && this.renderStanding()}
            </Fragment>
        );
    }

    private renderStanding() {
        return (
            <StyledTable>
                <thead>
                    <StyledTr>
                        <StyledTh scope='col'>#</StyledTh>
                        <StyledTh scope='col'>Naam</StyledTh>
                        <StyledTh scope='col'>Aantal</StyledTh>
                        <StyledTh scope='col'>Score</StyledTh>
                        <StyledTh scope='col'>Winst</StyledTh>
                        <StyledTh scope='col'>Remise</StyledTh>
                        <StyledTh scope='col'>Verlies</StyledTh>
                        <StyledTh scope='col'>Percentage</StyledTh>
                        <StyledTh scope='col'>Weerstand punten</StyledTh>
                    </StyledTr>
                </thead>
                <tbody>
                    {this.renderLines()}
                </tbody>
            </StyledTable>

        );
    }

    private renderLines() {
        return (
            this.props.standingLines.map((sl, i) => {
                return (
                    <StyledTr key={i}>
                        <StyledTh scope='row'>{i + 1}</StyledTh>
                        <StyledTd>{this.getName(sl.playerKey)}</StyledTd>
                        <StyledTd>{sl.gamesPlayed}</StyledTd>
                        <StyledTd>{sl.points}</StyledTd>
                        <StyledTd>{sl.win}</StyledTd>
                        <StyledTd>{sl.draw}</StyledTd>
                        <StyledTd>{sl.loss}</StyledTd>
                        <StyledTd>{Math.round(sl.percentage)}</StyledTd>
                        <StyledTd>{sl.wp}</StyledTd>
                    </StyledTr>
                );
            })
        );
    }

    private getName(playerKey: string) {
        const player = this.props.players.find((p) => p.key === playerKey);
        return player && `${player.firstName} ${player.lastName}`;
    }
}

export default Ranking;
