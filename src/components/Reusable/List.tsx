import { CommonListItem } from "../CommonListItem/CommonListItem";
import { Box } from "@mui/material";

type ListItemType = IAccountVO | ITransactionOperation | IDukasCoinBalanceVO;

interface IListProps {
  type: "accountStat" | "dukascoins" | "transaction";
  items: ListItemType[];
  onItemClick?: (item: any) => void;
}

const List: React.FC<IListProps> = ({ type, items, onItemClick }) => {
  return (
    <Box>
      {items?.map((item, index) => (
        <Box key={index}>
          <CommonListItem key={index} type={type} value={item} onItemClick={onItemClick} />
        </Box>
      ))}
    </Box>
  );
};

export default List;
