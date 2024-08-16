// These functions are for local storage

export const setDataIntoLc = (key, value, isJson = false) => {
    if (isJson) {
        return localStorage.setItem(key, JSON.stringify(value));
    }
    localStorage.setItem(key, JSON.stringify(value));
};

export const getDataFromLc = (key, isJson = false) => {
    if (isJson) {
        return JSON.parse(localStorage.getItem(key));
    }
    return localStorage.getItem(key);
};

export const removeDataFromLc = (key) => {
    localStorage.removeItem(key);
};
