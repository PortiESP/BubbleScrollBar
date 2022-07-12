
# BubbleScrollBar Docs

## Props

> - `sections`  A list of HTML IDs of the elements we want to appear in the scrollbar

# Usage

Just add the component to your JSX code and the element will be positioned as *fixed* in the right side of the screen

```jsx
<BubbleScrollBar sections={sectionsData}/>
```

### Sections object structure

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