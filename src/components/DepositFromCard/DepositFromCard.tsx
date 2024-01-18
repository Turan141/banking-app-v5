import { Box, Typography } from "@mui/material";
import { RectangleButton } from "@/components/Buttons/ButtonVariations/RectangleButton";
import { DepositFromCardButtons } from "@/components/Buttons/ButtonLayouts/DepositFromCard";

export const DepositFromCard = () => {
  const hasSomeCard = true;
  return (
    <Box>
      <Box>
        <Typography
          variant="h4"
          sx={{
            fontSize: "20px",
            color: "contentPrimary.main",
            fontWeight: "var(--fontSemiBold600)",
          }}
        >
          Deposit from Card
        </Typography>
      </Box>
      <Box display="flex" gap={1.5}>

        {hasSomeCard ? (
          DepositFromCardButtons.map((button) => (
            <Box
              display="flex"
              alignItems="start"
              justifyContent="center"
              onClick={button?.onClick}
              key={button.title}
              sx={{
                display: "flex",
                borderRadius: "4px",
                color: "contentPrimary.main",
                width: "150px",
                height: "100px",
              }}
              mt={2}
              mb={1}
            >
              <RectangleButton
                width={32}
                height={32}
                icon={button.icon}
                title={button.title}
              />
            </Box>
          ))
        ) : (
          <></>
        )}
        
      </Box>
    </Box>
  );
};
