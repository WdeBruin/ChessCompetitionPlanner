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

const listRoundNumbers = (numbers: number[]) => numbers.map((digit: number) =>
    <li key={digit}>{digit}</li>)