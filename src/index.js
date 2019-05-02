(drag => {
    if (drag && drag.length) {
        import('./Draggable.svelte' /* webpackChunkName: 'draggable' */)
            .then(({ default: Draggable }) => {
                Array.prototype.forEach.call(drag, target => {
                    ((h, m) => {
                        h && h.dispose(() => m.$destroy());
                    })(module.hot, new Draggable({ target }));
                });
            });
    }
})(document.querySelectorAll('[data-drag]'));

if (module.hot) {
    module.hot.accept();
}
