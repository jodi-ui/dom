import {render, el, elVoid, text, s, d, k} from './index';

export function bootstrap() {
    let x = 0; // example state
    const increment = () => { // example action
        x++;
        refreshUI();
    };

    const refreshUI = () => {
        render(document.querySelector('div#app'), () => {
            el('div', s({'style': 'background: seagreen; padding: 1rem;'}), () => {
                el('h1', k('main-title'), () => text('Hello Jodi'));
                el('h2',  () => text('This is a very simple example'));
                el('p',  () => text('This example uses TypeScript and systemjs.'));
                el('p',  () => {
                    text('You can, however, use it with ES6 or ES5 and with any UMD-style module loader you like.');
                });
                el('div', () => {
                    elVoid('input', s({'disabled': ''}), d({'value': x}));
                    el('button', d({'onclick': increment}), () => text('Increment'));
                });
            });
        });
    };

    refreshUI();
}