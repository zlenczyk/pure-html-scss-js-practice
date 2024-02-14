import { toggleElementDisplay, debounce } from "../utils/common.js";
import { fetchData } from "../utils/api.js";

const inputElement = document.getElementById("search-input");
const noItemFoundElement = document.getElementById('no-search-results-item');
const spinnerElement = document.querySelector("#search-spinner");
const resultsListElement = document.getElementById('search-results');

let isInputFocused;

const getProducts = async (query) => {
    const fetchUrl = `https://dummyjson.com/products/search?q=${query}&limit=5&delay=2000`;
    const data = await fetchData(fetchUrl);
    return data;
};

const createResultsListItem = (productData) => {
    const productItem = document.createElement("li");
    productItem.classList.add('search-results-item');
    productItem.innerHTML = productData.title;
    return productItem;
};

const clearResultsList = () => {
    toggleElementDisplay(noItemFoundElement, "none");

    while (noItemFoundElement.nextSibling) {
        resultsListElement.removeChild(noItemFoundElement.nextSibling);
    }
};

const showResults = (results) => {
    clearResultsList();

    if(results && results.length) {
        results.forEach(product => resultsListElement.appendChild(createResultsListItem(product)));
    } else toggleElementDisplay(noItemFoundElement, "flex");

    toggleElementDisplay(resultsListElement, "block");
};

const handleInput = debounce (async (event) => {
    isInputFocused = true;
    if (event.target.value.length >= 2) {
        toggleElementDisplay(spinnerElement, "block");
        const results = await getProducts(event.target.value);
        if(isInputFocused) showResults(results ? results.products : null);
    } else {
        toggleElementDisplay(resultsListElement, "none");
    }

    toggleElementDisplay(spinnerElement, "none");
});

const clearInput = (e) => {
    toggleElementDisplay(spinnerElement, "none");
    toggleElementDisplay(resultsListElement, "none");
    isInputFocused = false;
    e.target.value = "";
}

inputElement.addEventListener("keyup", handleInput);
inputElement.addEventListener("change", clearInput);