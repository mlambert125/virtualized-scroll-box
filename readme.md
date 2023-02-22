# Virtual Scroll Web Component

This implements a basic "virtual" scroll box for showing extremely large scrollable lists of items while
maintaining performance by only rendering a small window at a time.  

This implementation has one constraint: the display of each item in the list must have the same height.

This is implemented a web component that raises a "getItems" event callback to request elements to render
for an index and count based on the current scroll position.
