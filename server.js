const express = require('express')

const Budget = require('./app.js');

const app = express()
const port = 3000

const envelopeRouter = express.Router()

app.use(express.json())

app.get('/', (req, res, next) => {
    res.send('Welcome!')
})

envelopeRouter.get('/', (req, res) => {
    const envelopes = Budget.Envelopes.getEnvelopes();
    if (envelopes) {
        res.send(envelopes)
    } else {
        res.Status(404).send("not found!")
    }
    
})

envelopeRouter.get('/:budgetName', (req, res) => {
    
    envelope = Budget.Envelopes.getEnvelope(req.params.budgetName);
    if (envelope){
        res.status(200).send(envelope)
    } else {
        res.Status(404).send("not found!")
    }
    
})

envelopeRouter.delete('/:budgetName', (req, res) => {
    envelope = Budget.Envelopes.getEnvelope(req.params.budgetName);
    if (envelope){
        Budget.Envelopes.deleteEnvelope(req.params.budgetName);
        res.status(203).send(Budget.Envelopes.getEnvelopes())
    } else {
        res.status(404).send("not found!")
    }
    
})


envelopeRouter.post('/', (req, res) => {
    const budgetName = req.body.budgetName;
    const budget = req.body.budget;
    Budget.Envelopes.createEnvelope(budgetName,budget)
    
    res.status(200).send(req.body)
})

envelopeRouter.post('/transfer/:budgetOne/:budgetTwo', (req, res) => {
    const budgetOne = req.params.budgetOne;
    const budgetTwo = req.params.budgetTwo;
    const transferAmount = req.body.amount;

    try {
        Budget.Envelopes.transferMoney(budgetOne, budgetTwo, transferAmount);

        updatedBudgets = {}
        updatedBudgets[budgetOne] = Budget.Envelopes.getEnvelope(budgetOne);
        updatedBudgets[budgetTwo] = Budget.Envelopes.getEnvelope(budgetTwo);

        res.status(200).send(updatedBudgets)
    } catch (error) {
        res.status(403).send(error);
    }
});

app.use('/envelopes', envelopeRouter)

app.listen(port, () => {
    console.log(`listening on port ${port}.`)
});