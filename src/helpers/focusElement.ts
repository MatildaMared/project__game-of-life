export function focusElement(queryString: string) {
	const element = document.querySelector(queryString) as HTMLElement | null;
	element && element.focus();
}
