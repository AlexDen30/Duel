
const AI = (plCards, aiCards, type) => {

    function InitCard (num, prob) {
        this.num = num;
        this.prob = prob;
    }


    if (type === 'attack') {

        let sortedAi = aiCards.sort((a,b) => b-a);
        let cards = [];

        if (aiCards.length <= 2) 
            return sortedAi[0];

        if (aiCards.length == 12) {
            for (let i of sortedAi) {
                if (i===0) cards.push(new InitCard(i,4))
                if (i>=1 && i <= 5) cards.push(new InitCard(i,3))
                if (i>=6 && i <= 9) cards.push(new InitCard(i,2))
                if (i>=10 && i <= 11) cards.push(new InitCard(i,1))
            }
        }

        if (aiCards.length >=3 && aiCards.length <=11) {
            for (let i of sortedAi) {
                let deciderHigh = 0 + plCards.filter((i) => i>=9 && i<=11).length;
                let deciderMidlle = 0 + plCards.filter((i) => i>=5 && i<=8).length;
                if (i===0) cards.push(new InitCard(i,5));
                if (i>=1 && i <= 5) cards.push(new InitCard(i,3));
                if (i>=6 && i <= 9) cards.push(new InitCard(i,1 + Math.ceil((deciderHigh+deciderMidlle)/2)))
                if (i>=10 && i <= 11) cards.push(new InitCard(i,1 + Math.ceil((deciderHigh+deciderMidlle)/2)))
            }
        }

        return randCard(cards);

        
       
    }

    if (type === 'defense') {
        debugger;
        if (aiCards.length === 1)
            return aiCards[0];

        let sortedAi = aiCards.sort((a,b) => b-a);
        let cards = [];

        let zeroInd = aiCards.findIndex(i => i===0);
        if (zeroInd !== -1) {
            sortedAi = zeroInd === 0 
            ? [...aiCards.slice(1)].sort((a,b) => a-b) 
            : [...aiCards.slice(0,zeroInd), ...aiCards.slice(zeroInd+1)].sort((a,b) => a-b);
        } else {
            sortedAi = aiCards.sort((a,b) => a-b);
        }

        if (plCards.length >=10 && plCards.length <=12) {
            for (let i of sortedAi) {
                if (i>=1 && i <= 3) cards.push(new InitCard(i,2));
                if (i>=4 && i <= 7) cards.push(new InitCard(i,3));
                if (i>=8 && i <= 9) cards.push(new InitCard(i,1));
            }
        }

        if (aiCards.length >=1 && aiCards.length <=9) {
            for (let i of sortedAi) {
                let deciderHigh = 0 + plCards.filter((i) => i>=9 && i<=11).length;
                let deciderMidlle = 0 + plCards.filter((i) => i>=5 && i<=8).length;
                if (i>=1 && i <= 3) cards.push(new InitCard(i,1));
                if (i>=4 && i <= 6) cards.push(new InitCard(i,2 + Math.floor(deciderHigh/2 + deciderMidlle/2)));
                if (i>=7 && i <= 9) cards.push(new InitCard(i,1 + Math.floor(deciderHigh/2 + deciderMidlle/2)));
            }
        }

        if (cards.length === 0) {
            if (sortedAi.length === 2) 
                return sortedAi[1];
            else
                return sortedAi[0];
        }

        return randCard(cards);

    }
}

function randInt(min, max) {
    return Math.floor(min + Math.random()*(max + 1 - min));
}

function randCard(cards) {
    let a = [];
    for (let card of cards) {
        for (let i = 0; i<card.prob; i++)
            a.push(card.num);
    }
    return a[randInt(0, a.length - 1)];
}

export default AI;