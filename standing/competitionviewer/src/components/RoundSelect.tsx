import React, { Component } from 'react';
import Select from 'react-select';
import styled from 'styled-components';

interface Props {
    roundNumbers: number[];
    selected: number;
    onChange: (selectedOption: any) => void;
}

class RoundSelect extends Component<Props> {
    public render() {
        return (
            <StyledContainer>
                <Select
                    options={listRoundNumbers(this.props.roundNumbers)}
                    onChange={this.props.onChange}
                    defaultValue={{ label: 'Ronde ' + this.props.selected, value: this.props.selected }}
                />
            </StyledContainer>
        );
    }
}

export default RoundSelect;

const listRoundNumbers = (numbers: number[]) => {
    const options: any[] = [];
    numbers.forEach((n) => {
        options.push({ value: n, label: 'Ronde ' + n });
    });

    return options;
};

const StyledContainer = styled.div`
    max-width: 200px;
`;
