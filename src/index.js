import mjs from './modules/mjs';

(drag => {
    if (drag && drag.length) {
        mjs(import('./Draggable.svelte' /* webpackChunkName: 'draggable' */)).then(Draggable => {
            Array.prototype.forEach.call(drag, target => {
                hmr(new Draggable({ target }));
            });
        });
    }
})(document.querySelectorAll('[data-drag]'));

function hmr(component) {
    if (module.hot) {
        module.hot.dispose(() => component.$destroy());
    }

    return component;
}

if (module.hot) {
    module.hot.accept();
}
