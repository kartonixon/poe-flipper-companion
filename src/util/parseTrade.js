const shortid = window.require('shortid');

export function parseTrade(tradeString) {
    const regexpSender = /@From (.*):/;
    const regexpTradeDetails = /buy your (.*) in Heist/;
    const sender = tradeString.match(regexpSender);
    const tradeDetails = tradeString.match(regexpTradeDetails);

    if (sender && tradeDetails) {
        const id = shortid.generate();

        const s = sender[1];
        const nickname = s.split(" ").length > 1 ? s.split(" ")[1] : s;

        //TODO: extract information about trade (x => y)
        const message = tradeDetails[1];

        const values = message.match(/\d+/g);
        
        let ratio = null;

        if (values.length === 2) {
            const q1 = parseInt(values[0])
            const q2 = parseInt(values[1])
            ratio = q1 > q2 ? q1 / q2 : q2 / q1
        }

        const newTrade = {
          id: id,
          nickname: nickname,
          message: message,
          ratio: ratio
        };

        return newTrade;
    } else {
        return null;
    }
}