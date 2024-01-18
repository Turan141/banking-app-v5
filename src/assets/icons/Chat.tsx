import { IBaseIcon, useIconColor } from "./BaseIcon"

export const Chat = ({selected}:IBaseIcon) => {
	const color = useIconColor(selected)
	return (
		<svg
			width='25'
			height='24'
			viewBox='0 0 25 24'
			//fill='#C8CEDB'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				fill-rule='evenodd'
				clip-rule='evenodd'
				d='M12.5 4.3125C7.71049 4.3125 4.0625 7.36604 4.0625 10.875C4.0625 12.6346 4.95992 14.2604 6.47489 15.4639L6.78662 15.7116L5.8409 18.4514C5.78345 18.6178 5.96638 18.7645 6.11637 18.6723L9.05048 16.8675L9.29666 16.9464C10.2828 17.2624 11.3641 17.4375 12.5 17.4375C17.2895 17.4375 20.9375 14.384 20.9375 10.875C20.9375 7.36604 17.2895 4.3125 12.5 4.3125ZM2.9375 10.875C2.9375 6.5139 7.34838 3.1875 12.5 3.1875C17.6516 3.1875 22.0625 6.5139 22.0625 10.875C22.0625 15.2361 17.6516 18.5625 12.5 18.5625C11.343 18.5625 10.2322 18.3976 9.20299 18.0945L6.70578 19.6305C5.65585 20.2763 4.37528 19.2495 4.77747 18.0843L5.46654 16.088C3.91498 14.7354 2.9375 12.9097 2.9375 10.875Z'
				fill={color}
			/>
		</svg>
	)
}
