import { IBaseIcon, useIconColor } from "./BaseIcon";

export const CardOutline = ({ selected }: IBaseIcon) => {
  const color = useIconColor(!selected);

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="card_outline">
        <path
          id="Vector"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M3.1875 7.125C3.1875 5.98591 4.11091 5.0625 5.25 5.0625H18.75C19.8891 5.0625 20.8125 5.98591 20.8125 7.125V16.875C20.8125 18.0141 19.8891 18.9375 18.75 18.9375H5.25C4.11091 18.9375 3.1875 18.0141 3.1875 16.875V7.125ZM5.25 6.1875C4.73223 6.1875 4.3125 6.60723 4.3125 7.125V9.5625H19.6875V7.125C19.6875 6.60723 19.2678 6.1875 18.75 6.1875H5.25ZM19.6875 10.6875H4.3125V16.875C4.3125 17.3928 4.73223 17.8125 5.25 17.8125H18.75C19.2678 17.8125 19.6875 17.3928 19.6875 16.875V10.6875ZM10.5 15.1875H6.75V14.0625H10.5V15.1875Z"
          fill={color}
        />
      </g>
    </svg>
  );
};
