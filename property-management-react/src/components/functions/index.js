
// get item from localStorage
export const getItem = (title = "", json = false) => {
    const item = localStorage.getItem(title)

    if (item?.toLowerCase() === "true") {
        return true;
    } else if (item?.toLowerCase() === "false") {
        return false;
    } else if (item === "null") {
        return null;
    } else if (item === "undefined") {
        return undefined;
    } else if (json) {
        return JSON.parse(item)
    }

    return item
}

// set item to localStorage
export const setItem = (title = "", item = "", json=false) => {

    if (json){
        localStorage.setItem(title, JSON.stringify(item));
    }
    localStorage.setItem(title, item);

    return true
}

// debounce method
let timer;

export default function debounce(fn, delay) {
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, arguments);
        }, delay);
    };
}

// function to trim text based on maxlength
export function trimText(text = "", maxLength = 10) {
    if (text.length <= maxLength) {
        return text;
    } else {
        return text.slice(0, maxLength).trim() + '...';
    }
}

// Function to check if string is equal to location.pathname
export function isPathnameEqual(string, pathname = location.pathname) {
    // Remove the trailing '/' from the pathname
    const trimmedPathname = pathname.replace(/\/$/, '');

    // Check if the trimmed pathname is equal to the provided string
    return trimmedPathname === string;
}

// Function to slice number
export function sliceNumber(number = 0, maxLength = 99) {

    if (+number > +maxLength) {
        return `${maxLength}+`;
    }

    return number.toString();
}