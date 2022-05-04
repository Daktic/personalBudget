const express = require('express')

const Budget = require('./app.js');

const app = express()
const port = 3000

const envelopeRouter = express.Router()
const budgetRouter = express.Router()

app.use(express.json())

//grabs budget information and passes it to route
envelopeRouter.param('budgetName',(req, res, next, name) => {
    const budgetName = name;
    const budget =  Budget.Envelopes.getEnvelope(budgetName);
    const newBudget = req.body.budget
    if (!budget) {
        res.status(404).send('Not found!')
    } else {
        req.budgetName = budgetName;
        req.budget = budget;
        req.newBudget = newBudget
        next();
    }
})

//welcome page
app.get('/', (req, res, next) => {
    res.status(200).send('Welcome!')
})

//#########################  All Routes  #################################

//get all envelopes
envelopeRouter.get('/', (req, res) => {
    const envelopes = Budget.Envelopes.getEnvelopes();
    if (envelopes) {
        res.status(200).send(envelopes)
    } else {
        res.status(404).send("not found!")
    }  
})
//add envelope
envelopeRouter.post('/', (req, res) => {
    Budget.Envelopes.setEnvelope(req.body.budgetName,req.body.budget)
    res.status(201).send(req.body)
})

//#########################  Budget Routes  #################################

//get specific budget
envelopeRouter.get('/:budgetName', (req, res) => {
    res.send(req.budget.toString());
})
//delete budget
envelopeRouter.delete('/:budgetName', (req, res) => {
        Budget.Envelopes.deleteEnvelope(req.budgetName);
        res.status(203).send(Budget.Envelopes.getEnvelopes()) 
})
//update budget
envelopeRouter.put('/:budgetName', (req, res) => {
    Budget.Envelopes.setEnvelope(req.budgetName, req.newBudget);
    const updatedBudgets = {};
    updatedBudgets[req.budgetName] = Budget.Envelopes.getEnvelope(req.budgetName);

    res.status(200).send(updatedBudgets);
});

//#########################  Transfer Routes  #################################

//transfer from first budget to next budget
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

//mount envelope router
app.use('/envelopes', envelopeRouter)

//listen on port
app.listen(port, () => {
    console.log(`listening on port ${port}.`)
});