export interface IHeaderLink {
	path: string
	name: string
	isActive?: boolean
	children?: React.ReactNode
}

export interface INavItem {
	id: number
	path: string
	name: string
	position?: 'left' | 'right'
	subMenu?: Array<ISubMenu>
}

export interface ISubMenu {
	id: number
	path: string
	name: string
	position?: 'left' | 'right'
	subMenu?: Array<ISubMenu>
}

export interface ISubMenuLink {
	path: string
	name: string
	children?: React.ReactNode
}

export interface IThemeColorsItem {
	id: number
	color: string
	title: string
	bg: string
}

export interface IDrop {
	submens: Array<ISubMenu>
	dropdown: boolean
	depthLevel: number
	position: string | undefined
}

export interface IDropdownArrow {
	dropdownStatus: boolean
}

export interface IDropdownBtn {
	path: string
	name: string
	children: React.ReactNode
	dropdownStatus?: boolean
}