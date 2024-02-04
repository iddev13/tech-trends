'use client'
import { FC } from 'react'
import { usePathname } from 'next/navigation'
import { pulseBtnFunc } from '@/utils/pulseBtnFunc'
import { IDropdownBtn } from '@/types/header'
import { RiArrowDownDoubleLine } from 'react-icons/ri'

const DropdownBtn: FC<IDropdownBtn> = ({ path, name, children, dropdownStatus }) => {
	const pathName = usePathname()

	return (
		<div>
			<button
				type='button'
				className={`dropdown-btn pulse-btn ${pathName === path ? 'active' : ''}`}
				onClick={(e) => pulseBtnFunc(e)}
			>

				{ /*//?  Submenu Icon*/}
				{name === 'pages' && <span className='dropdown-btn__icon'><RiArrowDownDoubleLine /></span>}
				{/* {name === 'second level 1' && <span className='dropdown-btn__icon'><RiArrowDownDoubleLine /></span>} */}

				<span className='dropdown-btn__name flex-grow-1 flex-shrink-1'>{name}</span>
			</button>
			{children}
		</div>
	)
}

export default DropdownBtn