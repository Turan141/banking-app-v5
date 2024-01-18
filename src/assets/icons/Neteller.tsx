import { useIconColor, IBaseIcon } from "./BaseIcon";

export const Neteller = ({selected}:IBaseIcon) => {
  const color = useIconColor(!selected);

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="neteller">
        <path
          id="Vector"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M21.2827 4.50033L17.9965 19.5H11.9211L10.2078 14.6844L9.32538 19.5H2.71484L5.57475 4.5H11.8006L13.6044 9.28938L14.5099 4.50033H21.2827ZM13.9649 13.4383L11.0221 5.625H6.50552L4.0746 18.375H8.38781L9.85888 10.3473L12.715 18.375H17.0913L19.8846 5.62533H15.4421L13.9649 13.4383Z"
          fill={color}
        />
      </g>
    </svg>
  );
};
