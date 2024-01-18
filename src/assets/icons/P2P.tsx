import { IBaseIcon, useIconColor } from "./BaseIcon"

export const P2P = ({selected}:IBaseIcon) => {
	const color = useIconColor(selected)
	return (
		<svg
			width='25'
			height='24'
			viewBox='0 0 25 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				fill-rule='evenodd'
				clip-rule='evenodd'
				d='M8 5.8125C7.27513 5.8125 6.6875 6.40013 6.6875 7.125C6.6875 7.84987 7.27513 8.4375 8 8.4375C8.72487 8.4375 9.3125 7.84987 9.3125 7.125C9.3125 6.40013 8.72487 5.8125 8 5.8125ZM5.5625 7.125C5.5625 5.77881 6.65381 4.6875 8 4.6875C9.34619 4.6875 10.4375 5.77881 10.4375 7.125C10.4375 8.47119 9.34619 9.5625 8 9.5625C6.65381 9.5625 5.5625 8.47119 5.5625 7.125ZM17 11.0625C16.2751 11.0625 15.6875 11.6501 15.6875 12.375C15.6875 13.0999 16.2751 13.6875 17 13.6875C17.7249 13.6875 18.3125 13.0999 18.3125 12.375C18.3125 11.6501 17.7249 11.0625 17 11.0625ZM14.5625 12.375C14.5625 11.0288 15.6538 9.9375 17 9.9375C18.3462 9.9375 19.4375 11.0288 19.4375 12.375C19.4375 13.7212 18.3462 14.8125 17 14.8125C15.6538 14.8125 14.5625 13.7212 14.5625 12.375ZM6.9028 11.2562C7.24904 11.1287 7.62204 11.0625 8 11.0625C8.37796 11.0625 8.75096 11.1287 9.09721 11.2562C9.44343 11.3837 9.75406 11.5691 10.0128 11.7991C10.2714 12.029 10.4725 12.2982 10.6082 12.5895C10.6612 12.7031 10.7039 12.8194 10.7363 12.9375L5.2637 12.9375C5.29612 12.8194 5.33885 12.7031 5.39177 12.5895C5.52751 12.2982 5.72862 12.029 5.98722 11.7991C6.24595 11.5691 6.55657 11.3837 6.9028 11.2562ZM8 9.9375C7.49153 9.9375 6.98679 10.0265 6.51409 10.2005C6.04137 10.3746 5.60788 10.6311 5.23981 10.9583C4.87161 11.2855 4.57552 11.6777 4.37205 12.1144C4.16845 12.5513 4.0625 13.0223 4.0625 13.5V14.0625L11.9375 14.0625V13.5C11.9375 13.0223 11.8315 12.5513 11.628 12.1144C11.4245 11.6777 11.1284 11.2855 10.7602 10.9583C10.3921 10.6311 9.95863 10.3746 9.48591 10.2005C9.01321 10.0265 8.50847 9.9375 8 9.9375ZM17 16.3125C16.622 16.3125 16.249 16.3787 15.9028 16.5062C15.5566 16.6337 15.2459 16.8191 14.9872 17.0491C14.7286 17.279 14.5275 17.5482 14.3918 17.8395C14.3388 17.9531 14.2961 18.0694 14.2637 18.1875H19.7363C19.7039 18.0694 19.6612 17.9531 19.6082 17.8395C19.4725 17.5482 19.2714 17.279 19.0128 17.0491C18.7541 16.8191 18.4434 16.6337 18.0972 16.5062C17.751 16.3787 17.378 16.3125 17 16.3125ZM15.5141 15.4505C15.9868 15.2765 16.4915 15.1875 17 15.1875C17.5085 15.1875 18.0132 15.2765 18.4859 15.4505C18.9586 15.6246 19.3921 15.8811 19.7602 16.2083C20.1284 16.5355 20.4245 16.9277 20.628 17.3644C20.8315 17.8013 20.9375 18.2723 20.9375 18.75V19.3125H13.0625V18.75C13.0625 18.2723 13.1685 17.8013 13.372 17.3644C13.5755 16.9277 13.8716 16.5355 14.2398 16.2083C14.6079 15.8811 15.0414 15.6246 15.5141 15.4505ZM11.5625 19.3125V18.1875H5.75C5.43934 18.1875 5.1875 17.9357 5.1875 17.625V15.75H4.0625V17.625C4.0625 18.557 4.81802 19.3125 5.75 19.3125H11.5625ZM20.9375 7.125V9.75H19.8125V7.125C19.8125 6.81434 19.5607 6.5625 19.25 6.5625H12.125V5.4375H19.25C20.182 5.4375 20.9375 6.19302 20.9375 7.125Z'
				fill={color}
			/>
		</svg>
	)
}
