import React, { Component, Fragment } from 'react';
import { Player } from './Models';

interface Props {
    players: Player[];
}

class Ranking extends Component<Props> {
    public render() {
        return (
            <ul>{listPlayers(this.props.players)}</ul>
        );
    }
}

const listPlayers = (players: Player[]) => players.map((player: Player) =>
    <li key={player.key}>{player.firstName}</li>);

export default Ranking;
