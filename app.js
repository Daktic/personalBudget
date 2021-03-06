


class Envelopes {
    constructor(envelopeList={}) {
        this.envelopeList = envelopeList;
    }

    getEnvelopes() {
        return this.envelopeList;
    }

    setEnvelope(budgetName, budget) {
        this.envelopeList[budgetName] = budget;
    }

    getEnvelope(budgetName) {
        if (Array.isArray(budgetName)) {
            const selectedBudgets = {};
            for (let budget of budgetName) {
                if (this.envelopeList.hasOwnProperty(budget)) {
                    selectedBudgets[budget] = this.envelopeList[budget];
                } else {
                    throw `No budget named ${budgetName}.`;
                }
            }
            return selectedBudgets;
        } else if (this.envelopeList.hasOwnProperty(budgetName)) {
            const selectedBudgets = {};
            selectedBudgets[budgetName] = this.envelopeList[budgetName];
            return selectedBudgets
        } else {
            throw `No budget named ${budgetName}.`;
        }
    }

    /* Transfers "amount" money from budgetOne to budgetTwo */
    transferMoney(budgetOne, budgetTwo, amount) {
        const amountAvailible = this.envelopeList[budgetOne];

        if (amountAvailible < amount) {  // Verify there is enough money in budgetOne.
            throw `Insufficient budgeted funds in ${budgetOne}.`;
        } else if (!this.envelopeList.hasOwnProperty(budgetOne)) {
            throw `${budgetOne} envelope does not exist.`;
        } else if (!this.envelopeList.hasOwnProperty(budgetTwo)) {
            throw `${budgetTwo} envelope does not exist.`;
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


