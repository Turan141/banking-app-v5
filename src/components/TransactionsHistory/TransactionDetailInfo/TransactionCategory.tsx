import { getTranslatedText } from "@/Translations";
import { TransactionIconDiv } from "@/components/CommonListItem/CommonListItem";
import { TransactionIcons } from "@/components/Reusable/TransactionIcons";
import { capitalizeFirstLetter } from "@/helpers/utils";
import { Box, Typography } from "@mui/material";

interface TransactionCategoryProps {
    type: string;
    category: string;
  }
  export const TransactionCategory: React.FC<TransactionCategoryProps> = ({
    type,
    category,
  }) => {
    return (
      <Box sx={{ display: "flex" }}>
        <Box sx={{ mr: 2 }}>
          <TransactionIconDiv>
            <TransactionIcons type={type} />
          </TransactionIconDiv>
        </Box>
  
        <Box display="flex" flexDirection="column">
          <Typography
            sx={{
              color: "contentQuaternary.main",
              fontSize: "12px",
              fontWeight: "--fontRegular400",
            }}
          >
            {getTranslatedText("Category")}
          </Typography>
  
          <Typography
            sx={{
              color: "contentPrimary.main",
              fontSize: "16px",
              fontWeight: "--fontRegular400",
            }}
          >
            {capitalizeFirstLetter(category)}
          </Typography>
        </Box>
      </Box>
    );
  };