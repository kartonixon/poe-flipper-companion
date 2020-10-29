const robot = window.require('robotjs');
const copy = window.require('copy-to-clipboard');

function focusOnPOE() {
    robot.setMouseDelay(1);
    var screenSize = robot.getScreenSize();
    var x = screenSize.width / 2;
    var y = (screenSize.height / 2) - 100;
    robot.moveMouse(x, y);
    robot.mouseClick();
}

function sendCommandToPoe(command) {
    focusOnPOE();
    robot.keyTap('enter');
    copy(command);
    robot.keyToggle('control','down') ;
    robot.keyTap('v');
    robot.keyToggle('control', 'up');
    robot.keyTap('enter');
}

function invitePlayer(nickname) {
    sendCommandToPoe("/invite " + nickname);
}

function tradePlayer(nickname) {
    sendCommandToPoe("/tradewith " + nickname);
}

function kickPlayer(nickname) {
    sendCommandToPoe("/kick " + nickname);
}

export { invitePlayer, tradePlayer, kickPlayer };