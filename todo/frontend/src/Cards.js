import { useEffect, useRef, useState } from "react"

const RecieveData = ({ cardData }) => {
    return (
        <div>
            {Object.entries(cardData).map(([cardId, cards]) => (
                <div key={cardId}>
                    <h3>{cardId}</h3>

                    {Object.entries(cards).map(([id, card]) => (
                        <div key={id}>{card.text}</div>
                    ))}
                </div>
            ))}
        </div>
    )
}

const Card = ({ id, onDelete, cardData, loadData }) => {
    const [ showForm, setShowForm ] = useState(false)
    const formInputRef = useRef()

    const sendForm = async () => {

        const cardData = {
            id: 0,
            text: formInputRef.current.value,
            cardId: id,
            completed: false
        }

        const response = await fetch("http://localhost:8000/cards", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cardData)
        })
        const data = await response.json()
        console.log(data)
        loadData()
    }

    const updateCompleted = async (taskId, completed) => {
        await fetch("http://localhost:8000/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                cardId: id,
                taskId: taskId,
                completed: completed
            })
        })

        loadData()
    }

    const cards = cardData[id] || {}
    const allCompleted =
        Object.keys(cards).length > 0 &&
        Object.values(cards).every(card => card.completed)

    const Form = () => {
        return (
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" disabled/>
                </div>
                <input type="text" ref={ formInputRef } style={{ flexGrow: 1 }} placeholder="Type something..."/>
                <input type="button" value="✓" className="btn btn-success" onClick={sendForm}/>
                <input type="button" value="x" className="btn btn-danger" onClick={() => setShowForm(false)}/>
            </div>
        )
    }

    const CardContents = () => {
        return (
            <div style={{ width: "30vw", backgroundColor: allCompleted ? 'lightgray' : 'white' }} className="card p-2">
                <div style={{ display: "flex", justifyContent: "space-between", margin: "10px 0" }}>
                    <input type="button" value="+" className="btn btn-success" onClick={() => setShowForm(true)}/>
                    <input type="button" value="x" className="btn btn-danger" onClick={() => onDelete(id)}/>
                </div>
                {
                    showForm ? <Form shown={setShowForm}/> : ''
                }
                

                <div style={{ display: "flex", flexDirection: "column" }}>
                    {
                        Object.entries(cardData).map(([cardId, cards]) => {
                            if (cardId === id)
                                return <div key={cardId}>
                                    {
                                        Object.entries(cards).map(([taskId, card]) => {
                                            return (
                                                <div key={taskId}>
                                                    <input
                                                        type="checkbox"
                                                        checked={card.completed}
                                                        onChange={(e) => updateCompleted(taskId, e.target.checked)}
                                                        style={{ margin: "5px" }}
                                                    />
                                                    <span>{card.text}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            else
                                return
                        })
                    }
                </div>
            </div>
        )
    }

    return (
        <>
            <CardContents/>
        </>
    )
}

const Main = () => {
    const [ cards, setCards ] = useState([])
    const [cardData, setCardData] = useState({})

    const loadData = () => {
        fetch('http://localhost:8000/send', { method: "POST" })
            .then(res => res.json())
            .then(data => {
                setCardData(data)

                const loadedCards = Object.keys(data).map(id => ({ id }))
                setCards(loadedCards)
            })
            .catch(err => console.error("Fetch error:", err))
    }

    const onDelete = async (id) => {
        await fetch(`http://localhost:8000/cards/${id}`, {
            method: "DELETE"
        })

        loadData()
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <div>
            <nav style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>
                <input type="button" value="+" className="btn btn-success" onClick={ () => setCards( prev => [...prev, { id: crypto.randomUUID() }] ) }/>
                <h5 style={{ margin: 0 }}>Add New Note</h5>
                {/* <select value='default' onChange={e => {
                    const newLength = parseInt(e.target.value)

                    setCards(prev => {
                        if (newLength > prev.length) {
                        return [
                            ...prev,
                            ...Array.from(
                            { length: newLength - prev.length },
                            () => ({ id: crypto.randomUUID() })
                            )
                        ]
                        } else {
                            return prev.slice(0, newLength)
                        }
                    })
                }}>
                    <option value="default">-- Select number of cards --</option>
                    <option value={0}>0</option>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select> */}
            </nav>
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
                {
                    cards.map((card) => {
                        return <Card
                            key={card.id}
                            id={card.id}
                            loadData={loadData}
                            cardData={cardData}
                            onDelete={onDelete}
                        />
                    })
                }
            </div>
        </div>
    )
}

export default Main