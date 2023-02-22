# &lt;virtual-scroll&gt; element

Virtualized list for displaying long lists of items

## Installation

```
$ npm install --save @mlambert125/virtual-scroll
```

## Usage

### Script

Import as a module:

```js
import '@mlambert125/virtual-scroll'
```

With a script tag:

```html
<script type="module" src="./node_modules/@mlambert125/virtual-scroll/virtual-scroll.js">
```
### Markup
```html
<virtual-scroll 
    id="mylist"             
    item-height="30" 
    item-overrun="3" 
    style="display: block; height: 20vh; width: 300px; overflow-y: auto; border: 1px solid gray;">
</virtual-scroll>    

<template id="listItemTemplate">
    <div style="height: 30px; margin-left: 10px; overflow-y: hidden;">
        <span id="listText" style="color:green; font-family: Arial, Helvetica, sans-serif"></span>
    </div>
</template>
```
## Events
```js
document.getElementById("mylist").addEventListener("getItems", (e) => {
    for(let i = e.detail.start; i < Math.min(e.detail.start + e.detail.count, 100000); i++) { 
        const template = document.getElementById('listItemTemplate');
        const node = template.content.cloneNode(true);
        node.getElementById('listText').innerText = `item ${i}`;
        e.detail.items.push(node);
    }
    e.detail.totalItems = 100000;
});

```
## Browser support
Browsers without native [custom element support][support] require a [polyfill][].
- Chrome
- Firefox
- Safari
- Microsoft Edge
[support]: https://caniuse.com/#feat=custom-elementsv1
[polyfill]: https://github.com/webcomponents/custom-elements
## Development
```
npm install
npm test
```
## License
Distributed under the MIT license. See LICENSE for details.