


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

    deleteEnvelope(budgetName) {
       delete this.envelopeList[budgetName]
    }
}


module.exports.Envelopes = new Envelopes();


