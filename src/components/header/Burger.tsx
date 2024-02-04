'use client'

const Burger = () => {

	// Open or close burger
	const handleBurger = () => {
		const body = document.querySelector('body')
		const nav = document.querySelector('#nav')
		const burger = document.querySelector('#burger')

		body?.classList.toggle('lock')
		nav?.classList.toggle('active')
		burger?.classList.toggle('active')

		const closeNav = (event: Event): void => {
			const currentElement = event.target as HTMLElement

			// If the clicked element up the tree has no id=header, then closed the menu
			if (!currentElement?.closest('#header')) {
				body?.classList.remove('lock')
				nav?.classList.remove('active')
				burger?.classList.remove('active')
			}
		}

		body?.addEventListener('click', (event) => closeNav(event))
	}

	return (
		<div id='burger'
			className={`burger`} onClick={handleBurger}>
			<div className={`burgerLine blt`}></div>
			<div className={`burgerLine blc`}></div>
			<div className={`burgerLine blb`}></div>
		</div>
	)
}

export default Burger