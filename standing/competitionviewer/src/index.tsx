import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';

const rootElement = document.getElementById('standing');
const clubKey = rootElement && rootElement.getAttribute('club');
const competitionKey = rootElement && rootElement.getAttribute('competition');
const showGames = rootElement && rootElement.getAttribute('showGames') === 'true';
const showStanding = rootElement && rootElement.getAttribute('showStanding') === 'true';
const showWinLoss = rootElement && rootElement.getAttribute('showWinLoss') === 'true';

ReactDOM.render(
    // tslint:disable-next-line: jsx-wrap-multiline
    <App
        competitionKey={competitionKey || ''}
        clubKey={clubKey || ''}
        showGames={showGames || false}
        showStanding={showStanding || false}
        showWinLoss={showWinLoss || false}
    />
    , document.getElementById('standing'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
