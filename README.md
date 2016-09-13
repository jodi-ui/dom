# JodiUI - DOM

JavaScript/TypeScript UI library based on [IncrementalDOM](https://github.com/google/incremental-dom).

This is mostly inspired by the way React handles things with `JSX`, but without that `X` part.

## How does it work?

This example is in TypeScript, but this lib will work with ES5 as well.

This code:
```typescript
import {el, elVoid, text, render, s, d, k} from 'jodi-ui-dom';

const node = document.querySelector('div.app');
let inputValue = 'lorem';
let label = 'Foo';
 
render(node, () => { // render calls IncrementalsDOM's patch underneath
    // el opens a div with specified properties, executes a callback and then closes a div
    // it also returns rendered element
    el('div', s({'class': 'wrapper'}, () => {
        el('form', () => {
            el('label', () => text(label));
            // when using el or elVoid you can specify properties as static or dynamic.
            // It's an IncrementalDOM's feature designed to improve performance
            elVoid('input', s({'name': 'foo'}), d({'value': inputValue}));
        });
    });
});
```

will render this DOM structure under our `div.app` node:
```html
<div class="wrapper">
    <form>
        <label>Foo</label>
        <input name="foo" value="lorem">
    </form>
</div>
```

When you change `inputValue` and/or `value` and render on the same
`node` using the same code then IncrementalDOM will update existing
DOM tree without re-rendering it.

## Why?
HTML code itself can be messy. When you need to add multiple attributes to
elements you either produce a very long lines or you break those lines
making the whole thing much less readable.

By using external templating syntax like the one shipped with Angular (1 or 2),
Aurelia or Vue you have to learn that new templating syntax and deal with it's
limitations. For example: in Angular 2 you cannot use TypeScript enumerables
or render something conditionally  without creating additional tag.

When using stuff like Handlebars (no VirtualDOM, nor IncremetalDOM) you have
to render the whole template even if you changed only one thing in
your data. It cannot be used for forms (this would take focus out of
an input element) or media payers (it would reset a player and stop
playback). Not to mention that manipulating DOM is generally slow.

React with it's JSX and VirtualDOM solve those problems (mostly). You
don't have some strange templating syntax, you can use regular JS loops,
conditionals and functions. Yet you have XML mixed with it and it might
make the whole code very unreadable as well

Every templating language needs additional transpiler which either works
in runtime (impacting app's performace) or it's transpiled during compilation
(which makes compilation slower, requires additional tools and might cause
problems with existing - like source maps). Not to mention a need for IDE and
other text editors plugins to help you work with this code.

*Jodi* aims to solve those problems by providing an easy-to-use JS/TS API that lets
you produce readable and dynamic templates.

## Usage examples

```typescript
import {el, elVoid, text, render} from 'path/to/jodi-ui/dom';

const node = document.querySelector('div.app');

// open a single element and immediately close it
render(node, () => {
    el('div');
});

// open element and write some text inside it, then close an element
render(node, () => {
    el('div', () => {
        text('foo');
    });
});

// create an element which doesn't require to be closed
render(node, () => {
    elVoid('input');
});

// create an element with a child and a static property
// which won't be updated upon next render on a same node
render(node, () => {
    el('div', s({'class': 'foo'}), () => {
        elVoid('input');
    });
});

// create an element with a child, a static property
// and a dynamic property which will be updated (unlike static property)
// if new values will be provided
render(node, () => {
    el('div', s({'id': 'foo1'}), d({'class': 'foo'}), () => {
        elVoid('input');
    });
});

// create multiple nested items with one line
render(node, () => {
    el(['table', 'tr', 'td']);
});

// create items with keys specified keys
render(node, () => {
    el('table', () => {
        for (let i = 0; i < 10; i++) {
            el('tr', k('row-' + i), () => {
                // some fields and contents...
            });
        }
    });
});

```
