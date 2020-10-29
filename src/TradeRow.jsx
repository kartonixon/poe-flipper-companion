import React from 'react';
import { invitePlayer, tradePlayer, kickPlayer } from './util/poeIntegration.js';

function TradeRow(props) {

    function handleTrade() {
        tradePlayer(props.nickname)
    }

    function handleInvite() {
        invitePlayer(props.nickname)
    }

    function handleKick() {
        kickPlayer(props.nickname)
    }

    function handleDelete() {
        props.onDelete(props.id);
    }

    return (
        <div>
            <h3>{props.nickname}</h3>
            <p>{props.message}</p>
            {props.ratio && <p>ratio: {props.ratio}</p>}
            <button onClick={handleInvite}>INVITE</button>
            <button onClick={handleTrade}>TRADE</button>
            <button onClick={handleKick}>KICK</button>
            <button onClick={handleDelete}>X</button>
        </div>
    )
}

export default TradeRow;
