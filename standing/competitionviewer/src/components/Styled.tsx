import styled from 'styled-components';

export const StyledTable = styled.table`
    border: 1px solid #ddd;
    border-collapse: collapse;
    margin-bottom: 20px;
`;

export const StyledTh = styled.th`
    border: 1px solid #ddd;
    border-collapse: collapse;
    padding-top: 6px;
    padding-bottom: 6px;
    padding: 4px;
    text-align: left;
    background-color: #a9a9a9;
    color: black;
`;

export const StyledTr = styled.tr`
    border: 1px solid #ddd;
    border-collapse: collapse;

    &:nth-child(even) {
        background-color: #f2f2f2;
    }
`;

export const StyledTd = styled.td`
    border: 1px solid #ddd;
    padding: 4px;
`;
