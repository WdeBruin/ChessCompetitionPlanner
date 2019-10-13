import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Player, Game } from '../Models';

interface Props {
    players: Player[];
    games: Game[];
}

class Games extends Component<Props> {
    public render() {
        return (
            <Fragment>
                {this.props.games && this.renderGames()}
            </Fragment>
        );
    }

    private renderGames() {
        return (
            <StyledTable>
                <thead>
                    <StyledTr>
                        <StyledTh scope='col'>#</StyledTh>
                        <StyledTh scope='col'>Witspeler</StyledTh>
                        <StyledTh scope='col'>Elo W</StyledTh>
                        <StyledTh scope='col'>Elo R</StyledTh>
                        <StyledTh scope='col'>Elo V</StyledTh>
                        <StyledTh scope='col'>tegen</StyledTh>
                        <StyledTh scope='col'>Zwartspeler</StyledTh>
                        <StyledTh scope='col'>Elo W</StyledTh>
                        <StyledTh scope='col'>Elo R</StyledTh>
                        <StyledTh scope='col'>Elo V</StyledTh>
                        <StyledTh scope='col'>Uitslag</StyledTh>
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
            this.props.games.map((g, i) => {
                return (
                    <StyledTr key={i}>
                        <StyledTh scope='row'>{i + 1}</StyledTh>
                        <StyledTd>{this.getName(g.whitePlayerKey)}</StyledTd>
                        <StyledTd>{Math.round(g.whiteWinEloChange * 10) / 10}</StyledTd>
                        <StyledTd>{Math.round(g.whiteDrawEloChange * 10) / 10}</StyledTd>
                        <StyledTd>{Math.round(g.whiteLossEloChange * 10) / 10}</StyledTd>
                        <StyledTd />
                        <StyledTd>{this.getName(g.blackPlayerKey)}</StyledTd>
                        <StyledTd>{Math.round(g.blackWinEloChange * 10) / 10}</StyledTd>
                        <StyledTd>{Math.round(g.blackDrawEloChange * 10) / 10}</StyledTd>
                        <StyledTd>{Math.round(g.blackLossEloChange * 10) / 10}</StyledTd>
                        <StyledTd>{g.result === 1 ? '1-0' : g.result === 0 ? '0-1' : '0,5 - 0,5'}</StyledTd>
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

export default Games;

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
