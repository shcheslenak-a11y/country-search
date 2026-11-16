export function debounce(fn, delay) {
    let timeoutId = null;
    return function (...args) {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
        timeoutId = setTimeout(fn, delay, ...args);
    };
}
//# sourceMappingURL=debounce.js.map