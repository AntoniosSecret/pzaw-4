import { useState } from "react"

const Card = () => {
    const [ showForm, setShowForm ] = useState(false)
    const [ showSelf, setShowSelf ] = useState(true)

    const Form = () => {
        return (
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" disabled/>
                </div>
                <input type="text" style={{ flexGrow: 1 }} placeholder="Type something..."/>
                <input type="button" value="✓" className="btn btn-success"/>
                <input type="button" value="x" className="btn btn-danger" onClick={() => setShowForm(false)}/>
            </div>
        )
    }

    const CardContents = () => {
        return (
            <div style={{ width: "30vw" }} className="card p-2">
                <div style={{ display: "flex", justifyContent: "space-between", margin: "10px 0" }}>
                    <input type="button" value="+" className="btn btn-success" onClick={() => setShowForm(true)}/>
                    <input type="button" value="x" className="btn btn-danger" onClick={() => setShowSelf(false)}/>
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
            { showSelf ? <CardContents/> : '' }
        </>
    )
}

const Main = () => {
    const [ cardsNum, setCardsNum ] = useState(0)

    return (
        <div>
            <nav>
                <input type="button" value="+" className="btn btn-success" onClick={ () => setCardsNum( parseInt(cardsNum) + 1 ) }/>

                <select value='default' onChange={ e => setCardsNum(e.target.value) }>
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
                    Array.from(
                        {length: cardsNum},
                        (_) => <Card/>
                    )
                }
            </div>
        </div>
    )
}

export default Main