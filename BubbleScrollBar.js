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
    const {sections} = props

    // Functions
    const resetTimer = () => {
        setShowScroll(true)
        timer && clearTimeout(timer)
        setTimer( setTimeout( ()=>setShowScroll(false), 5000) )
    }
    
    // setTimersList(3)
    // Setup events
    React.useEffect( ()=>{
        // Scroll event
        function scrollEvent(){   
            // Variables
            const sectionIndex = window.screenY >= 0 ? Math.floor( (window.scrollY+(window.innerHeight/2)) / window.innerHeight) : 0
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
