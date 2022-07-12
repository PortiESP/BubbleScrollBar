import React from "react"
import "./style/style.css"

function BubbleScrollItem(props){

    const scrollData = props.scrollData[0]
    const $link = React.useRef(null)
    
    let focusClass = `div--BubbleScrollItem ${scrollData.focus === props.id ? "focusing": ""}`
    
    return (
        <div  className={focusClass} onClick={ ()=> $link.current.click()} >
            <div className="div--BubbleScrollItem-label" >
                <a ref={$link} href={`#${props.id}`} className="a--BubbleScrollItem-label" style={props.styleLabel}>{props.label} </a>
            </div>
            {
                !props.disableBubble ?
                    <div className="div--BubbleScrollItem-decoration-bubble" style={props.styleDecoration}>
                        <span className="span--BubbleScrollItem-decoration-bubble"></span>
                    </div>
                 : ""
            }
        </div>
    )
}

export default function BubbleScrollBar(props){
    
    const [scrollData, setScrollData] = React.useState({focus: "section--welcome"})
    let [showScroll, setShowScroll] = React.useState(false)
    let [timer, setTimer] = React.useState(null)
    let sections = props.sections
    
    // Functions
    const resetTimer = () => {
        setShowScroll(true)
        timer && clearTimeout(timer)
        setTimer( setTimeout( ()=>setShowScroll(false), 3000) )
    }

    // Setup events
    React.useEffect( ()=>{

        // Fill the sections object with positions and dimensions
        // eslint-disable-next-line react-hooks/exhaustive-deps
        sections = props.sections.map( item => {
            const dimensions = document.getElementById(item.id).getBoundingClientRect()
            return ({...item, top: dimensions.y + window.scrollY, bottom: dimensions.bottom + window.scrollY, width: dimensions.width, height: dimensions.height}) 
        })
        // Sort array based on the top value
        sections.sort( (a,b) => a.top - b.top )
        

        // Scroll event
        const scrollEvent = () => {   
            // Variables
            const sectionIndex = sections.findIndex( item => item.bottom - (item.height > 500 ? 400 : Math.floor(item.height/2)) >= window.scrollY)
            const newSection = sections[sectionIndex].id

            // Update section
            setScrollData( oldData => ({...oldData, focus: newSection}) ) 
        }
        window.addEventListener("scroll", scrollEvent)


        // Effect cleaner
        return ()=>{
            window.removeEventListener("scroll", scrollEvent)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect( ()=>{
        resetTimer()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrollData.focus])

    // Create list JSX elements
    const computedSections = sections.map( data => <BubbleScrollItem 
                                                        key={data.id} 
                                                        label={data.label} 
                                                        id={data.id} 
                                                        scrollData={[scrollData, setScrollData]}
                                                        disableBubble={props.disableBubble}
                                                        styleLabel={props.styleLabel}
                                                        styleDecoration={props.styleDecoration}
                                                    /> )

    return (
        <div className="div--BubbleScrollBar-zone" onMouseOver={resetTimer}>
            <div className={"div--BubbleScrollBar" + (!showScroll ? " hide": "")} style={props.styleScroll}>
                {computedSections}
            </div>
        </div>
    )
}
