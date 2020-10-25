import React from 'react';
import { sendCommandToPoe } from './util/poeIntegration.js';

function TradeRow(props) {

    function handleTrade() {
        sendCommandToPoe("/tradewith " + props.nickname);
    }

    function handleInvite() {
        sendCommandToPoe("/invite " + props.nickname);
    }

    function handleKick() {
        sendCommandToPoe("/kick " + props.nickname);
        sendCommandToPoe("@" + props.nickname + " thanks");
    }

    function handleDelete() {
        props.onDelete(props.id);
    }

    return (
        <div>
            <h3>{props.nickname}</h3>
            <p>{props.message}</p>
            <button onClick={handleInvite}>INVITE</button>
            <button onClick={handleTrade}>TRADE</button>
            <button onClick={handleKick}>KICK</button>
            <button onClick={handleDelete}>X</button>
        </div>
    )
}

export default TradeRow;
