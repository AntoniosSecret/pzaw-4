const cors = require('cors')
const express = require('express')
const fs = require('fs')
const crypto = require('crypto')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        key: 'Hello World!',
    })
})

app.post('/cards', (req, res) => {
    const newCard = req.body

    console.log(newCard)

    newCard.id = crypto.randomUUID()

    console.log(newCard)

    const fileData = fs.readFileSync('data.json', 'utf-8')
    const cards = JSON.parse(fileData)

    if (!cards[newCard.cardId]) {
        cards[newCard.cardId] = {}
    }

    const id = newCard.id
    const cardId = newCard.cardId

    delete newCard.id
    delete newCard.cardId

    cards[cardId][id] = newCard

    fs.writeFileSync('data.json', JSON.stringify(cards, null, 4))

    res.status(201).json({
        id,
        cardId,
        ...newCard
    })
})

app.post('/send', (req, res) => {
    const cards = JSON.parse(fs.readFileSync('data.json', 'utf-8'))
    console.log(cards)

    res.status(201).json(cards)
})

app.put('/update', (req, res) => {
    const { cardId, taskId, completed } = req.body

    const cards = JSON.parse(fs.readFileSync('data.json', 'utf-8'))

    if (cards[cardId] && cards[cardId][taskId]) {
        cards[cardId][taskId].completed = completed
    }

    fs.writeFileSync('data.json', JSON.stringify(cards, null, 4))

    res.json({ success: true })
})

app.delete('/cards/:cardId', (req, res) => {
    const { cardId } = req.params

    const cards = JSON.parse(fs.readFileSync('data.json', 'utf-8'))

    if (cards[cardId]) {
        delete cards[cardId]
    }

    fs.writeFileSync('data.json', JSON.stringify(cards, null, 4))

    res.json({ success: true })
})

app.listen(8000, () => {
    console.log('Server listening')
})
