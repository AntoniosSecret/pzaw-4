
import {useRef, useState} from 'react'
import data_json from './data.json'

const Tile = (props) => {
    const [tile, setTile] = useState(data_json[props.id])
    
    const handle_button_count = (v) => {
        switch (v) {
            case '+':
                setTile({...tile, count: tile.count + 1})
                break
            case '-':
                setTile({...tile, count: tile.count - 1})
                break
            default:
                break
        }
    }
    return (
        <div className='card'>
            <div className='card-body d-flex flex-column align-items-center'>
                <h2 className='card-title'>{tile.count}</h2>
                <div className='d-flex'>
                    <input type='button' value='+' className='btn btn-success' onClick={() => handle_button_count('+')}/>
                    <span className='card-text p-3 text-center'>{tile.id}<br/>{tile.text}</span>
                    <input type='button' value='-' className='btn btn-danger' onClick={() => handle_button_count('-')}/>
                </div>
            </div>
        </div>
    )
}

const View = () => {
    const [rangeValue, setRangeValue] = useState(3)
    const [searchValue, setSearchValue] = useState(null)
    const ref_search = useRef()
    const ref_range = useRef()


    return (
        <div>
            <input ref={ref_search} type='search' value={searchValue} onChange={(e) => setSearchValue(ref_search.current.value)} defaultValue='Search...'/><br/>
            <input ref={ref_range} type='range' min={3} max={7} defaultValue={3} value={rangeValue} step={1} onChange={() => setRangeValue(ref_range.current.value)}/>
            <div className="grid-container" style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${rangeValue}, 1fr)`,
            gap: '1rem'
            }}>
                {
                    data_json.map((element, elementIndex) => {
                        if (searchValue !== null) {
                            const text_lower = element.text.toLowerCase()
                            if (!text_lower.includes(searchValue)) {
                                return null
                            }
                        }
                        return <Tile id={elementIndex}/>
                    })
                }
            </div>
        </div>
    )
}

export default View
