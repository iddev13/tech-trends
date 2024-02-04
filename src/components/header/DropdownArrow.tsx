'use client'

import { FC } from "react"
import { IDropdownArrow } from "@/types/header"

const DropdownArrow: FC<IDropdownArrow> = ({ dropdownStatus }) => {
	return (
		<span className={`arrow ${dropdownStatus ? 'active' : ''}`}></span >
	)
}

export default DropdownArrow