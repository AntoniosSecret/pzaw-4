import { useEffect, useState } from "react"
import data from './data.json'

const Card = () => {
    const [ muted, setMuted ] = useState(false)

    const [ count, setCount ] = useState(0)

    const [ timer, setTimer ] = useState(0)

    const [ pause, setPause ] = useState(false)

    const changeSong = (value) => {
        setCount(count => (count + value + 6) % 6)
    }

    useEffect(() => {
        if (pause) return

        const interval = setInterval(() => {
            setTimer(timer => timer + 1)
        }, 1000)

        if (timer === 225) {
            setTimer(0)
        }

        return () => clearInterval(interval)
    }, [pause])


    const minutes = Math.floor(timer / 60);
    const seconds = timer - minutes * 60

    return (
        <div id="mediaPlayer">
            <div id="cover">
                <img src={`${data[count].artwork}`} style={{ height: "100%", borderRadius: "20px" }}/>
            </div>
            
            <div id="visualizer">
                <div className="vBars" id="v1"></div>
                <div className="vBars" id="v2"></div>
                <div className="vBars" id="v3"></div>
                <div className="vBars" id="v4"></div>
                <div className="vBars" id="v5"></div>
                <div className="vBars" id="v6"></div>
                <div className="vBars" id="v7"></div>
                <div className="vBars" id="v8"></div>
            </div>

            <h1 id="songTitle">{data[count].title}</h1>
            <h2 id="songAuthor">{data[count].artist}</h2>

            <progress id="time" value={timer} max={225}></progress>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}>
                <span>{minutes}:{seconds < 10 ? `0` : ``}{seconds}</span>
                <span>3:45</span>
            </div>

            <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
                <input type="button" className="btn btn-secondary" value="Prev" onClick={() => changeSong(-1)} style={{ fontStyle: "italic" }}/>
                <input type="button" className={`btn ${pause ? `btn-success` : `btn-danger`}`} value={`${pause ? 'Play' : 'Pause'}`} onClick={() => setPause(pause => !pause)}/>
                <input type="button" className="btn btn-secondary" value="Next" onClick={() => changeSong(1)} style={{ fontStyle: "italic" }}/>
            </div>

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", width: "90%" }}>
                <img src={`./${muted ? `wy` : `od`}ciszony.jpg`} onClick={() => setMuted(muted => !muted)} style={{ height: "20px" }}/>
                <input type="range" id="volume" defaultValue={0.5} min={0} max={1} step={0.01} onChange={(e) => console.log(e.target.value)}></input>
            </div>
        </div>
    )
}

export default Card