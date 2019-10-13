import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Player, StandingLine } from '../Models';

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

const StyledTable = styled.table`
    border: 1px solid #ddd;
    border-collapse: collapse;
    margin-bottom: 20px;
`;

const StyledTh = styled.th`
    border: 1px solid #ddd;
    border-collapse: collapse;
    padding-top: 6px;
    padding-bottom: 6px;
    padding: 4px;
    text-align: left;
    background-color: #a9a9a9;
    color: black;
`;

const StyledTr = styled.tr`
    border: 1px solid #ddd;
    border-collapse: collapse;

    &:nth-child(even) {
        background-color: #f2f2f2;
    }
`;

const StyledTd = styled.td`
    border: 1px solid #ddd;
    padding: 4px;
`;
