export const toggleElementDisplay = (element, displayValue) => {
    element.style.display = displayValue;
};

export const debounce = (callback, timeout = 500) => {
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			callback(...args);
		}, timeout);
	};
};

export const padZero = (number) => number < 10 ? '0' + number : number;