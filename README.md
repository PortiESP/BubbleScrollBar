
# BubbleScrollBar documentation

This tool allow the user to create a custom scrollbar for any site, the tool will remove the default scrollbar and it will be replaced with a fixed element placed at the right side of the screen with a TOC (Table Of Concepts).

![Site screenshot](screenshots/siteScreenshot.png "Example site screenshot")

### Features

- Easy tag selection by id
- Customizable style and decorations
- Auto sorting items by its order in page
- Automatic hiding after few seconds but prevent it when user hovers it


# Implementation

Just clone the repo inside your project, import the `BubbleScrollBar.js` file add the component to your JSX code and the element will be positioned as *fixed* in the right side of the screen

*Import library*
```javascript
import BubbleScrollBar from "./BubbleScrollBar/BubbleScrollBar"
```
*Add component*

> Its **recommended** to add it at the end of your page to ensure that every component is already rendered
```jsx
<BubbleScrollBar sections={sectionsData}/>
```

# Props

> - `sections`  Takes an array of objects as show [here](#sections-object-structure)
> - `styleTOC`  Adds custom styles to the TOC, *takes an object with css properties*
> - `styleLabel`  Adds custom styles to the label of each item of the TOC, *takes an object with css properties*
> - `styleDecoration`  Adds custom styles to the decoration bubble of each item of the TOC, *takes an object with css properties*
> - `disableBubble`  Removes the *bubble* element from the TOC and leave just the label, *takes a boolean*

## `sections` object structure

```javascript
{
    label: "Section name",
    id: "section--id"
}
```

> In the followig example we create an array of objects where the object is the data of each item of the TOC (Table Of Concepts) of the scrollbar

```javascript
const sectionsData = [
    {
        label: "Profile",
        id: "section--welcome"
    },
    {
        label: "Skills",
        id: "section--skills-wrap"
    },
    {
        label: "My work",
        id: "section--work"
    }
]
```

## Style

> The component can be customized with the style props but since the module is cloned, you can edit the css files

## Media

- **Zoomed screenshot**

!["Zoomed screenshot"](./screenshots/zoomScreenshot.png "Zoomed screenshot")