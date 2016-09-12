import {el, elVoid, text, render, d, s} from '../index';

const getAttrsListedAsDynamic = (node: Element) => {
    // IncrementalDOM stores dynamic attrs in node.__incrementalDOMData.newAttrs
    // This function returns that list

    const keys = [];
    for (let key in node['__incrementalDOMData'].newAttrs) {
        keys.push(key);
    }

    return keys;
};

describe('dom', () => {
    it('should create few nested element when using el with array as first argument', () => {
        const node = document.createElement('div');

        render(node, () => {
            el(['table', 'tr', 'td'], () => {
                text('test');
            });
        });

        expect(node.querySelector('table > tr > td').innerHTML).toEqual('test');
    });

    it('should create element with some properties if those are set as static and dynamic properties', () => {
        const node = document.createElement('div');

        render(node, () => {
            el('span', s({ foo: 'bar', lorem: 'ipsum' }), d({ at: 'dolor', sit: 'amet' }), () => {
                text('test2');
            });
        });

        const span = node.querySelector('span');

        expect(span.innerHTML).toEqual('test2');

        expect(span.getAttribute('foo')).toEqual('bar');
        expect(span.getAttribute('lorem')).toEqual('ipsum');
        expect(span.getAttribute('at')).toEqual('dolor');
        expect(span.getAttribute('sit')).toEqual('amet');

        const dynamicKeys = getAttrsListedAsDynamic(span);

        expect(dynamicKeys).toContain('at');
        expect(dynamicKeys).toContain('sit');
    });

    it('should be possible to omit dynamic properties and still specify a callback for rendering child nodes', () => {
        const node = document.createElement('div');

        render(node, () => {
            el('span', s({'class': 'foobar'}), () => {
                text('test3');
            });
        });

        const span = node.querySelector('span');

        expect(span.innerHTML).toEqual('test3');
        expect(span.getAttribute('class')).toEqual('foobar');
    });

    it('should be possible to render void elements with both static and dynamic properties', () => {
        const node = document.createElement('div');

        render(node, () => {
            elVoid('input', d({ at: 'dolor', sit: 'amet' }), s({ foo: 'bar', lorem: 'ipsum' }));
        });

        const input = node.querySelector('input');

        expect(input.getAttribute('foo')).toEqual('bar');
        expect(input.getAttribute('lorem')).toEqual('ipsum');
        expect(input.getAttribute('at')).toEqual('dolor');
        expect(input.getAttribute('sit')).toEqual('amet');

        const dynamicKeys = getAttrsListedAsDynamic(input);

        expect(dynamicKeys).toContain('at');
        expect(dynamicKeys).toContain('sit');
    });

    it('should only update what changed when using render on the same node for the 2nd time', () => {
        const node = document.createElement('div');

        const data = [
            {id: 'a1', text: 'ipsum', 'class': 'qwe'},
            {id: 'a2', text: 'dolor', 'class': 'asd'},
            {id: 'a3', text: 'amet', 'class': 'zxc'}
        ];

        const renderComponent = (data) => {
            render(node, () => {
                data.forEach(item => {
                    el('div', d({'class': item['class']}), s({id: item.id}), () => {
                        text(item.text);
                    });
                });
            });
        };

        renderComponent(data);

        // we're applying markers on rendered divs
        const nodeList = node.querySelectorAll('div');
        const nodeListArr = [];

        for (let i = 0; i < nodeList.length; i++) {
            nodeListArr.push(nodeList.item(i));
        }

        nodeListArr.forEach(div => {
            div['__marker'] = true;
        });

        // we're very selectively changing data
        data[0]['class'] = 'poi';
        data[1]['text'] = 'sit';

        data[0]['id'] = 'b1';
        data[1]['id'] = 'b2';
        data[2]['id'] = 'b3';

        // we're re-rendering
        renderComponent(data);

        // now we're checking if our nodes are updated
        const divs = node.querySelectorAll('div');

        expect(divs.length).toEqual(3);
        expect(node.querySelector('.poi').innerHTML).toEqual('ipsum');
        expect(node.querySelector('.asd').innerHTML).toEqual('sit');
        expect(node.querySelector('.zxc').innerHTML).toEqual('amet');

        // ids shouldn't change (since those are static attributes)
        expect(node.querySelector('.poi').id).toEqual('a1');
        expect(node.querySelector('.asd').id).toEqual('a2');
        expect(node.querySelector('.zxc').id).toEqual('a3');

        // we're checking if our markers are still there (meaning those are still the same elements)
        expect(node.querySelector('.poi')['__marker']).toBeTruthy();
        expect(node.querySelector('.asd')['__marker']).toBeTruthy();
        expect(node.querySelector('.zxc')['__marker']).toBeTruthy();
    });

    it('should pass currently opened element to child-rendering callback', () => {
        const node = document.createElement('section');

        let element1;

        render(node, () => {
            element1 = el('div', s({'marker1': 'bar'}), (div) => {
                div.__marker2 = 'lorem';
                expect(div.getAttribute('marker1')).toEqual('bar');
            });
        });

        expect(element1.getAttribute('marker1')).toEqual('bar');
        expect(element1.__marker2).toEqual('lorem');
    });

    // TODO test for key
});
