/**
 * Virtualized scrolling custom element.
 * Scroll a large set of items, provided that they all display at the same (known) height, and 
 * that the size of the set is known.
 * 
 * A getItems event containing parameters and a return list is fired when elements are needed
 */
export class VirtualizedScrollBox extends HTMLElement {
    /**
     * Attributes used by this element
     */
    static get observedAttributes() {
        return ['item-overrun', 'item-height'];
    }

    /**
     * Attribute container object
     */
    attributes = {};

    /**
     * An observer for handling resizing of the container
     */
    resizeObserver;

    /**
     * This containers shown height
     */
    viewHeight;

    /**
     * A top level div with a scrollbar that contains everything
     */
    container;

    /** 
     * A large panel sized to hold all items that is the only child
     * of the container
     */
    largePanel;

    /**
     * A small sliding panel containing only the small subset of rendered items
     */
    smallPanel;

    /**
     * Custom element callback called when the element is attached to a document
     */
    connectedCallback() {
        this.resizeObserver = new ResizeObserver((entries) => {
            this.viewHeight = entries[0].contentRect.height;
            this.render();
        });
       
        this.container = document.createElement('div');
        this.container.style.height = '100%';
        this.container.style.overflow = 'auto';
        this.container.addEventListener('scroll', this.render.bind(this));

        this.largePanel = document.createElement('div');
        this.smallPanel = document.createElement('div');
       
        this.largePanel.appendChild(this.smallPanel);
        this.container.appendChild(this.largePanel);
        this.appendChild(this.container);

        this.resizeObserver.observe(this.container);
    }

    /**
     * Custom element callback called when the element is detached from a document
     */
    disconnectedCallback() {
        this.resizeObserver.disconnect();
    }

    /**
     * Custom element callback called when the elements observed attributes are added, removed or changed
     */
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue == newValue) return;
        this.attributes[name] = newValue;
    }

    /**
     * Build and render the child items into the sliding smallPanel and resize the
     * large panel if the total item count has changed
     */
    render () {
        const topItem = Math.floor(this.container.scrollTop / this.attributes["item-height"]);
        const visibleItems = (this.viewHeight / this.attributes["item-height"]);
        const start = Math.max(topItem - this.attributes["item-overrun"], 0);
        const count = visibleItems + this.attributes["item-overrun"] * 2

        const detail = { start, count, items: [], totalItems: 0 };

        this.dispatchEvent(new CustomEvent("getItems", {
            bubbles: true,
            cancelable: false,
            detail: detail
        }));

        this.largePanel.style.height = (detail.totalItems * this.attributes['item-height']) + 'px';
        this.smallPanel.style.transform = `translateY(${start * this.attributes['item-height']}px)`;

        while (this.smallPanel.firstChild)
            this.smallPanel.removeChild(this.smallPanel.firstChild);

        for (const item of detail.items) {            
            this.smallPanel.appendChild(item);
        }
    }
}

// Register this custom element
window.customElements.define('virtualized-scroll-box', VirtualizedScrollBox);
