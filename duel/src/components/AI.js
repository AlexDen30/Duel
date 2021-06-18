
const AI = (plCards, aiCards, type, round) => {

    function InitCard (num, prob) {
        this.num = num;
        this.prob = prob;
    }


    if (type === 'attack') {

        let sortedAi = aiCards.sort((a,b) => a-b);

        let shiftInterval = 0 + plCards.filter((i) => i>=9 && i<=11).length + Math.floor(plCards.filter((i) => i>=5 && i<=8).length/2);
        if (shiftInterval >= sortedAi.length - 1) shiftInterval = sortedAi.length - 1;

        let intervalEnd = Math.ceil(sortedAi.length / 2) + shiftInterval;
        if (intervalEnd >= sortedAi.length - 1) intervalEnd = sortedAi.length - 1;

       
        let cards = [];
        for (let i of sortedAi) {
            
            if (i>=shiftInterval && i <= intervalEnd)
                cards.push(new InitCard(i,2))
            else 
                cards.push(new InitCard(i,1));
        }

        return randCard(cards);
    }

    if (type === 'defense') {

        let sortedAi = [];
        debugger;
        let zeroInd = aiCards.findIndex(i => i===0);
        if (zeroInd !== -1) {
            sortedAi = zeroInd === 0 
            ? [...aiCards.slice(1)].sort((a,b) => a-b) 
            : [...aiCards.slice(0,zeroInd), ...aiCards.slice(zeroInd+1)].sort((a,b) => a-b);
        } else {
            sortedAi = aiCards.sort((a,b) => a-b);
        }
        

        let shiftInterval = 0 - plCards.filter((i) => i>=9 && i<=11).length;
        let calc = Math.floor(sortedAi.length / 3);
        let startInt = calc - shiftInterval < 0 ?  calc : calc - shiftInterval;
        let endInt = calc - shiftInterval < 0 ?  calc : calc*2 - shiftInterval;
        
        let cards = [];
        for (let i of sortedAi) {
            
            if (i>=startInt && i <= endInt)
                cards.push(new InitCard(i,2))
            else 
                cards.push(new InitCard(i,1));
        }

        return randCard(cards);
    }
}

function randInt(min, max) {
    return Math.floor(min + Math.random()*(max + 1 - min));
}

function randCard(cards) {
    let a = [...cards, ...cards.filter((i) => i.prob === 2)];
    let r = randInt(0, a.length - 1);
    return a[r].num;
}

export default AI;