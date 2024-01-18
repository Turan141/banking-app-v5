import { Box } from "@mui/material";
import { useCallback } from "preact/hooks";
import { TransactionInfoRow } from "../TransactionRows/TransactionInfoRow";

interface TransactionInfoProps {
  description: string;
  message: string | null;
  reference: string;
  from: string;
}

const TransactionInfo: React.FC<TransactionInfoProps> = ({
  description,
  message,
  reference,
  from,
}) => {
  const onBtnClick = useCallback(
    (value: string) => {
      navigator.clipboard
        .writeText(value)
        .then(() => {
          console.log(`Copied: ${value}`);
          alert("Copied to clipboard!");
        })
        .catch((error) => {
          console.error("Unable to copy:", error);
          alert("Failed to copy to clipboard");
        });
    },
    [reference, from]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <TransactionInfoRow label="Description" value={description ?? "--"} />
      <TransactionInfoRow label="Message" value={message ?? "--"} />
      <TransactionInfoRow
        label="Reference"
        value={reference ?? "--"}
        onBtnClick={onBtnClick}
      />
      <TransactionInfoRow
        label="From"
        value={from ?? "--"}
        onBtnClick={onBtnClick}
      />
    </Box>
  );
};

export default TransactionInfo;
