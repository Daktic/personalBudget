const express = require('express')

const Budget = require('./app.js');

const app = express()
const port = 3000

const envelopeRouter = express.Router()
const budgetRouter = express.Router()

app.use(express.json())

envelopeRouter.param('budgetName',(req, res, next, name) => {
    const budgetName = name;
    const budget =  Budget.Envelopes.getEnvelope(budgetName);
    if (!budget) {
        res.status(404).send('Not found!')
    } else {
        req.budgetName = budgetName;
        req.budget = budget;
        next();
    }
})


app.get('/', (req, res, next) => {
    res.send('Welcome!')
})

envelopeRouter.get('/', (req, res) => {
    const envelopes = Budget.Envelopes.getEnvelopes();
    if (envelopes) {
        res.send(envelopes)
    } else {
        res.status(404).send("not found!")
    }
    
})


//Budget Routes
envelopeRouter.get('/:budgetName', (req, res) => {
    res.status(200).send(req.budget);   
    
})
envelopeRouter.delete('/:budgetName', (req, res) => {
        Budget.Envelopes.deleteEnvelope(req.budgetName);
        res.status(203).send(Budget.Envelopes.getEnvelopes()) 
})
envelopeRouter.put('/:budgetName', (req, res) => {
    const newBudget = req.body.budget;

    if (Budget.Envelopes.getEnvelope(req.budgetName)) {
        Budget.Envelopes.setEnvelope(req.budgetName, newBudget);
        const updatedBudgets = {};
        updatedBudgets[req.budgetName] = Budget.Envelopes.getEnvelope(req.budgetName);

        res.status(200).send(updatedBudgets);
    } else {
        res.status(404).send("not found!");
    }
});

envelopeRouter.post('/', (req, res) => {
    const budgetName = req.body.budgetName;
    const budget = req.body.budget;
    Budget.Envelopes.setEnvelope(budgetName,budget)
    
    res.status(200).send(req.body)
})

envelopeRouter.post('/transfer/:budgetOne/:budgetTwo', (req, res) => {
    const budgetOne = req.params.budgetOne;
    const budgetTwo = req.params.budgetTwo;
    const transferAmount = req.body.amount;

    try {
        Budget.Envelopes.transferMoney(budgetOne, budgetTwo, transferAmount);

        const updatedBudgets = {}
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