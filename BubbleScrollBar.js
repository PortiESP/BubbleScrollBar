import React from "react"
import sass from "./style/style.module.scss"

function BubbleScrollItem(props){

    const scrollData = props.scrollData[0]
    const $link = React.useRef(null)
    
    let focusClass = `${sass.div__BubbleScrollItem} ${scrollData.focus === props.id ? sass.focusing: ""}`
    
    return (
        <div  className={focusClass} onClick={ ()=> $link.current.click()} >
            <div className={sass.div__BubbleScrollItem_label} >
                <a ref={$link} href={`#${props.id}`} className={sass.a__BubbleScrollItem_label} style={props.styleLabel}>{props.label} </a>
            </div>
            {
                !props.disableBubble ?
                    <div className={sass.div__BubbleScrollItem_decoration_bubble} style={props.styleDecoration}>
                        <span className={sass.span__BubbleScrollItem_decoration_bubble}></span>
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
        setTimer( setTimeout( ()=>setShowScroll(false), 2000) )
    }

    // Setup events
    React.useEffect( ()=>{

        // Allow smooth scroll
        document.querySelector("html").style.scrollBehavior = "smooth"
        

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
            // Here is where gets deceided in wich section your are
            const sectionIndex = sections.findIndex( item => item.bottom >= window.scrollY)
            const newSection = sections[sectionIndex] && sections[sectionIndex].id || sections[sectionIndex-1]

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
        <div className={sass.div__BubbleScrollBar_zone} onMouseOver={resetTimer}>
            <div className={`${sass.div__BubbleScrollBar} ${(!showScroll ? sass.hide: "")}`} style={props.styleScroll}>
                {computedSections}
            </div>
        </div>
    )
}
