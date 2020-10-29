import React, { useState } from 'react';

import { parseTrade } from './util/parseTrade'
import useInterval from './util/useInterval';
import TradeRow from './TradeRow';

const fs = window.require('fs');

//TODO: create a config
const CLIENT_TXT_PATH = 'C:/Program Files (x86)/Steam/steamapps/common/Path of Exile/logs/client.txt';

function TradeList() {

    const [logFileContent, setLogFileContent] = useState(splitLines(fs.readFileSync(CLIENT_TXT_PATH, 'utf8')));
    const [trades, setTrades] = useState([]);

    function splitLines(t) { return t.split(/\r\n|\r|\n/); }

    useInterval(() => {
        const data = fs.readFileSync(CLIENT_TXT_PATH, 'utf8');
        const linesFromData = splitLines(data);

        if (JSON.stringify(logFileContent) !== JSON.stringify(linesFromData)) {
            var newLines = [];

            let iterator = linesFromData.length - 2;
            const logFileLength = logFileContent.length - 2;
            
            while (iterator !== logFileLength) {
                newLines.push(linesFromData[iterator]);
                iterator--;
            }

            newLines.reverse();
            newLines.forEach(line => addTrade(line));
        }
        setLogFileContent(linesFromData);
    }, 1000);

    function removeTrade(id) {
        setTrades(trades.filter(trade => trade.id !== id));
    }

    function addTrade(t) {
        const newTrade = parseTrade(t);
        console.log(newTrade);
        if (newTrade) {
            setTrades([...trades, newTrade]);
        }
    }

    return (
        <div>
            <h2>Incoming Trades</h2>
            {trades.map(trade => (
                <TradeRow 
                    key={trade.id} 
                    id={trade.id} 
                    nickname={trade.nickname} 
                    message={trade.message}
                    ratio={trade.ratio} 
                    onDelete={removeTrade}/>
                ))}
        </div>
    )
}

export default TradeList;
