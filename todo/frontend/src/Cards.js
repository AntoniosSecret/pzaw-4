import { useRef, useState } from "react"

const Card = ({ id, onDelete }) => {
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
    }

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
            <div style={{ width: "30vw" }} className="card p-2">
                <div style={{ display: "flex", justifyContent: "space-between", margin: "10px 0" }}>
                    <input type="button" value="+" className="btn btn-success" onClick={() => setShowForm(true)}/>
                    <input type="button" value="x" className="btn btn-danger" onClick={() => onDelete(id)}/>
                </div>
                {
                    showForm ? <Form shown={setShowForm}/> : ''
                }
                

                <div style={{ display: "flex", flexDirection: "column" }}>

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

    return (
        <div>
            <nav>
                <input type="button" value="+" className="btn btn-success" onClick={ () => setCards( prev => [...prev, { id: crypto.randomUUID() }] ) }/>

                <select value='default' onChange={e => {
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
                </select>
            </nav>
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                {
                    cards.map((card) => {
                        return <Card
                            key={card.id}
                            id={card.id}
                            onDelete={(id) => setCards(prev => prev.filter(card => card.id !== id))}
                        />
                    })
                }
            </div>
        </div>
    )
}

export default Main