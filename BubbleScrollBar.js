import React from "react"
import "./style/style.css"

function BubbleScrollItem(props){

    const [scrollData, setScrollData] = props.scrollData
    
    function itemClick(event){
        setScrollData( oldData => ({...oldData, focus: event.target.href.split("#")[1]}))
    }
    
    let focusClass = `div--BubbleScrollItem ${scrollData.focus === props.id ? "focusing": ""}`
    
    console.log(props.styleLabel)

    return (
        <div className={focusClass} onClick={itemClick} >
            <div className="div--BubbleScrollItem-label" >
                <a href={`#${props.id}`} className="a--BubbleScrollItem-label" style={props.styleLabel}>{props.label} </a>
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
    
    // const [focus, setFocus] = React.useState("section--welcome")
    const [scrollData, setScrollData] = React.useState({focus: "section--welcome", show: true, timer: null})
    const {sections} = props
    
    // Setup events
    React.useEffect( ()=>{
        // Scroll event
        function scrollEvent(){   
            const sectionIndex = window.screenY >= 0 ? Math.floor( (window.scrollY+(window.innerHeight/2)) / window.innerHeight) : 0
            const newSection = sections[sectionIndex].id
            
            setScrollData( oldData => ({...oldData, focus: newSection}) )

            // setShowScrollBar(true)
            // hideTimer && clearTimeout(hideTimer)
            // hideTimer = setTimeout(()=> setShowScrollBar(false), 5000)
        }
       window.addEventListener("scroll", scrollEvent)

        // ScrollBar hide timer

        // Effect cleaner
        return ()=>{
            window.removeEventListener("scroll", scrollEvent)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
        <div className="div--BubbleScrollBar" style={props.styleTOC}>
            {computedSections}
        </div>
    )
}
