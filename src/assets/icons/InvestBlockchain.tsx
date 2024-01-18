import { useIconColor, IBaseIcon } from "./BaseIcon";

export const InvestBlockchain = ({selected}:IBaseIcon) => {
  const color=useIconColor(!selected)

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
	  	fill={color}
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.95819 3.12012C8.35528 3.67644 9.64575 4.32978 10.6335 5.40504C11.8764 6.75811 12.5625 8.68987 12.5626 11.6784L12.5626 13.5346L15.3523 10.745L16.1477 11.5404L12 15.6882L7.85225 11.5404L8.64775 10.745L11.4376 13.5348L11.4376 11.6784C11.4375 8.86259 10.7944 7.24319 9.80498 6.1661C8.99265 5.28178 7.89588 4.70442 6.54199 4.1653L6.95819 3.12012ZM11.9885 3.24699L20.8125 7.25792V16.5928L12 20.999L3.1875 16.5928V7.28094L6.48747 5.53951L7.01253 6.53447L5.06004 7.56481L6.96966 8.37486L6.53034 9.41054L4.3125 8.46974V15.8975L11.4376 19.46V17.1427H12.5626V19.4599L19.6875 15.8975V8.46974L17.4697 9.41054L17.0303 8.37486L18.8515 7.60233L12.0115 4.49324L11.5016 4.74823L10.9984 3.742L11.9885 3.24699Z"
      />
    </svg>
  );
};