


class Envelopes {
    constructor(envelopeList={}) {
        this.envelopeList = envelopeList;
    }

    getEnvelopes() {
        return this.envelopeList;
    }

    createEnvelope(budgetName, budget) {
        this.envelopeList[budgetName] = budget;
    }

    getEnvelope(budgetName) {
        return this.envelopeList[budgetName];
    }

    /* Transfers "amount" money from budgetOne to budgetTwo */
    transferMoney(budgetOne, budgetTwo, amount) {
        const amountAvailible = this.envelopeList[budgetOne];

        if (amountAvailible < amount) {  // Verify there is enough money in budgetOne.
            throw new Error(`Insufficient Funds in ${budgetOne}.`);
        } else {
            this.envelopeList[budgetOne] -= amount;
            this.envelopeList[budgetTwo] += amount;
        }
    }

    deleteEnvelope(budgetName) {
       delete this.envelopeList[budgetName]
    }
}


module.exports.Envelopes = new Envelopes();


