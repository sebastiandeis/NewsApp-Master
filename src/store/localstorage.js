export const loadState = () => {
    try {
        // console.log("loadState!");
        const serializedState = localStorage.getItem('newsraven');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('newsraven', serializedState);
    } catch (err) {
        // Ignore writing errors
    }
};