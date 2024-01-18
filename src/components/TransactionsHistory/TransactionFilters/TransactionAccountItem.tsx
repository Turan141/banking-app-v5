import { getTranslatedText } from "@/Translations";
import { Checkmark } from "@/assets/icons/Checkmark";
import { CustomAvatar } from "@/components/Avatars/CustomAvatar";
import { Box, Typography } from "@mui/material";
import { memo } from "preact/compat";

interface TransactionAccountItemProps {
  iban?: string;
  accountLabel: string;
  url?: string;
  isActive?: boolean;
}
export const TransactionAccountItem: React.FC<TransactionAccountItemProps> =
  memo(({ iban, accountLabel, url, isActive = false }) => {
    return (
      <Box
        sx={{
          display: "flex",
          backgroundColor: isActive
            ? "backgroundNeutralBackgroundNeutralHighlight01.main"
            : "contentDefault.main",
          borderRadius: "8px",
          padding: "8px 12px",
          alignItems: "center",
        }}
      >
        <Box sx={{ mr: 2 }}>
          <CustomAvatar alt="avatar" size={32} src={url} />
        </Box>

        <Box display="flex" flexDirection="column" sx={{ width: "100%" }}>
          <Typography
            sx={{
              color: "contentPrimary.main",
              fontSize: "16px",
              fontWeight: "--fontRegular400",
            }}
          >
            {getTranslatedText(accountLabel)}
          </Typography>

          <Typography
            sx={{
              color: "contentQuaternary.main",
              fontSize: "12px",
              fontWeight: "--fontRegular400",
            }}
          >
            {iban}
          </Typography>
        </Box>

        <Box>{isActive && <Checkmark />}</Box>
      </Box>
    );
  });
