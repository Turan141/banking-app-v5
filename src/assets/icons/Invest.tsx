import { IBaseIcon, useIconColor } from "./BaseIcon"

export const Invest = ({selected}:IBaseIcon) => {
	const color = useIconColor(selected);
	return (
		<svg
			width='25'
			height='24'
			viewBox='0 0 22 23'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path d='M13.4 22.4H8.6V0.6H13.4V22.4Z' stroke={color} stroke-width='1.2' />
			<path d='M21.4 22.4H16.6V6.6H21.4V22.4Z' stroke={color}  stroke-width='1.2' />
			<path d='M5.4 22.4H0.6V12.6H5.4V22.4Z' stroke={color}  stroke-width='1.2' />
		</svg>
	)
}
