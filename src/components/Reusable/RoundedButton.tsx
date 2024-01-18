import { getColorFromTheme } from "@/helpers/utils";
import ButtonBase, { ButtonBaseProps } from "@mui/material/ButtonBase";
import { useTheme } from "@mui/system";

interface ButtonProps extends ButtonBaseProps {
  filled?: boolean;
  color?: string; // Assuming "color" is a valid key in the theme palette
  bordered?: boolean;
  customStyles?: any;
  textColor?: string;
}


const RoundedButton: React.FC<ButtonProps> = ({
  filled = true,
  mainColor,
  bordered,
  onClick,
  children,
  customStyles,
  textColor="#fff",
  ...rest
}) => {
  const theme = useTheme();
  const resolvedMainColor = mainColor ? getColorFromTheme(theme, mainColor) : undefined;
  const resolvedTextColor = textColor ? getColorFromTheme(theme, textColor) : undefined;

  return (
    <ButtonBase
      sx={{
        borderRadius: "16px",
        padding: "8px 16px",
        backgroundColor: filled ? resolvedMainColor : "transparent",
        border: bordered ? `1px solid ${resolvedMainColor}` : "none",
        color: resolvedTextColor,
        cursor: "pointer",
        transition: "background-color 0.3s ease",
        ...customStyles,
      }}
      {...rest}
      onClick={onClick}
    >
      {children || "RoundedButton"}
    </ButtonBase>
  );
};

export default RoundedButton;
