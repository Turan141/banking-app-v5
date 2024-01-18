import { getTranslatedText } from "@/Translations";
import {
  S_TRANSACTION_FILTERS_APPLY,
  S_TRANSACTION_FILTERS_CLOSE,
} from "@/managers/TransactionManager";
import { Box, Button } from "@mui/material";

interface ITransactionCloseBtnProps {
  title?: string;
  buttons?: string[];
  onClick?: (value: string) => void;
  isActive?: boolean;
  filterValues?: ITransactionFilterGroup | null;
}

export const TransactionFiltersCloseBtn = () => {
  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <Button
        onClick={() => S_TRANSACTION_FILTERS_CLOSE.invoke()}
        sx={{
          backgroundColor: "backgroundAvatarBackgroundAvatarRed.main",
          color: "backgroundMain.main",
        }}
      >
        {getTranslatedText("Close")}
      </Button>
    </Box>
  );
};

export const TransactionApplyButtons = ({
  filterValues,
}: ITransactionCloseBtnProps) => {
  return (
    <Box sx={{ position: "fixed", bottom: "64px", zIndex: 8, width: `100%` }}>
      <Button
        onClick={() =>
          S_TRANSACTION_FILTERS_APPLY.invoke({
            filters: filterValues as ITransactionFilterGroup,
          })
        }
        sx={{
          backgroundColor: "backgroundAvatarBackgroundAvatarRed.main",
          color: "backgroundMain.main",
          width: `calc(100% - 32px)`,
          height: "48px",
        }}
      >
        {getTranslatedText("Apply")}
      </Button>
    </Box>
  );
};

// export const TransactionCloseBtn = ({filterValues}: ITransactionCloseBtnProps) => {
//   return (
//     <Box sx={{ position: "fixed", bottom: "86px", zIndex: 8, width: `100%` }}>
//       <Button
//         onClick={() =>
//           S_TRANSACTION_FILTERS_APPLY.invoke({
//             filters: filterValues as ITransactionFilterGroup,
//           })
//         }
//         sx={{
//           backgroundColor: "backgroundAvatarBackgroundAvatarRed.main",
//           color: "backgroundMain.main",
//           width: `calc(100% - 32px)`,
//           height: "48px",
//         }}
//       >
//         {getTranslatedText("Apply")}
//       </Button>
//     </Box>
//   );
// };

// export const TransactionResetButton = ({
//   filterValues,
// }: TransactionApplyResetButtonsProps) => {
//   return (
//     <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
//       <Button
//         onClick={() =>
//           S_TRANSACTION_FILTERS_APPLY.invoke({
//             filters: filterValues as ITransactionFilterGroup,
//           })
//         }
//         sx={{
//           backgroundColor: "backgroundAvatarBackgroundAvatarRed.main",
//           color: "backgroundMain.main",
//         }}
//       >
//         {getTranslatedText("Apply")}
//       </Button>
//       <Button
//         onClick={() => S_TRANSACTION_FILTERS_RESET.invoke()}
//         sx={{
//           backgroundColor: "backgroundDefault.main",
//           color: "backgroundAvatarBackgroundAvatarRed.main",
//         }}
//       >
//         {getTranslatedText("Reset")}
//       </Button>
//     </Box>
//   );
// };
