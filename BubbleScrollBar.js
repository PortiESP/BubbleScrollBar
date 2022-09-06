import React from "react"
import sass from "./style/style.module.scss"

function BubbleScrollItem(props){

    const scrollData = props.scrollData[0]
    const $link = React.useRef(null)

    const draggingItem = (e) => {
        if(!e.clientY) return false
        e.preventDefault()

        document.querySelector("html").style.scrollBehavior = ""
        
        const scrollValue = e.clientY / ( window.innerHeight*.9 ) * document.body.scrollHeight - 1000
        console.log(scrollValue, document.body.style.scrollBehavior, e.target)
        window.scrollTo(0, scrollValue)
        
        document.querySelector("html").style.scrollBehavior = "smooth"

    }   
    
    let focusClass = `${sass.div__BubbleScrollItem} ${scrollData.focus === props.id ? sass.focusing: ""}`
    
    return (
        <div  className={focusClass} onClick={ ()=> $link.current.click()} >
            <div className={sass.div__BubbleScrollItem_label} >
                <a ref={$link} href={`#${props.id}`} className={sass.a__BubbleScrollItem_label} style={props.styleLabel} draggable="true">{props.label}</a>
            </div>
            {
                !props.disableBubble ?
                    <div className={sass.div__BubbleScrollItem_decoration_bubble} style={props.styleDecoration}>
                        <span className={sass.span__BubbleScrollItem_decoration_bubble}></span>
                    </div>
                 : ""
            }
            <div className={sass.div__dragzone} onDrag={draggingItem} draggable="true" onDragStart={ e => e.dataTransfer.effectAllowed = "move" }></div>
        </div>
    )
}

export default function BubbleScrollBar(props){
    
    const [scrollData, setScrollData] = React.useState({focus: "section--welcome"})
    const [showScroll, setShowScroll] = React.useState(false)
    const [timer, setTimer] = React.useState(null)
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
            const sectionIndex = sections.findIndex( item => item.bottom >= window.scrollY + (window.innerHeight / 2))
            const newSection = sections[sectionIndex] && sections[sectionIndex].id || sections[sectionIndex-1]
            const newSectionLabel = sections[sectionIndex] && sections[sectionIndex].label || sections[sectionIndex-1]

            // Update section
            setScrollData( oldData => ({...oldData, focus: newSection, label: newSectionLabel}) ) 
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
        props.sectionCallback && props.sectionCallback(scrollData.label)

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

    return !props.hide && (
        
        <div className={sass.div__BubbleScrollBar_zone} onMouseOver={resetTimer} 
            onDragOver={ e=> {
                e.preventDefault()
                e.dataTransfer.effectAllowed = "none"
                e.target.style.cursor = "pointer"
            }}
            >
            <div className={`${sass.div__BubbleScrollBar} ${(!showScroll ? sass.hide: "")}`} style={props.styleScroll}>
                {computedSections}
            </div>
        </div>
    )
}
