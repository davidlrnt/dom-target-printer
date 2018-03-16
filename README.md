# DOM Target Printer

Utility to show only selected dom element on window.print

## Getting Started

Clone repo or copy index.js, not published to npm (yet)


### Usage

'dom-target-printer' exports a single function (targetPrint) that takes two arguments, a DOM element and a callback.
When calling targetPrint, css will be applied to show only the selected DOM element and the print popup will show up. Upon print or closing the print popup all previous styles are removed.

If print button is inside the selected element and it should be hidden for print, add class `print-target-btn` to the element


```
import targetPrint from 'dom-target-printer';

...

let myDiv = document.getElementById('my-div')

targetPrint(myDiv, ()=>{console.log("done");})

```

