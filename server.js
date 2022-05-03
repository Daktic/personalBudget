const express = require('express')


const app = express()
const port = 3000

const envelopeRouter = express.Router()



app.get('/', (req, res, next) => {
    res.send('Welcome!')
})

envelopeRouter.get('/', (req, res) => {
    console.log('get router working')
    res.send('get envelopes')
})

envelopeRouter.post('/', (req, res) => {
    res.send('create envelope')
})

app.use('/envelopes', envelopeRouter)

app.listen(port, () => {
    console.log(`listening on port ${port}.`)
});