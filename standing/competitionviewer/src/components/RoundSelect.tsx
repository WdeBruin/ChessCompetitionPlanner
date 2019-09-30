import React, { Component } from 'react';

interface Props {
    roundNumbers: number[];
}

class RoundSelect extends Component<Props> {
    public render() {
        return (
            <ul>{listRoundNumbers(this.props.roundNumbers)}</ul>
        );
    }
}

export default RoundSelect;

const listRoundNumbers = (numbers: number[]) => numbers.map((digit: number) => <p key={digit}>{digit}</p>);
    // <button class='button'>{digit}</button>)

// <button id="' + r + '" class="button" onclick=selectRound(' + r + ')>' + r + '</button>
