
export const closeMenu = (sizeHook: any, size: number, e: any) => {
	const body = document.querySelector('body')
	const nav = document.querySelector('#nav')
	const burger = document.querySelector('#burger')

	if (sizeHook.width < size) {
		body?.classList.remove('lock')
		nav?.classList.remove('active')
		burger?.classList.remove('active')
	}
}