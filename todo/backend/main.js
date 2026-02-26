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

    cards.push(newCard)

    fs.writeFileSync('data.json', JSON.stringify(cards, null, 4))

    res.status(201).json({ message: newCard })
})

app.listen(8000, () => {
    console.log('Server listening')
})
