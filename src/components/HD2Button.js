import styled from "@emotion/styled";
import { Button } from "@mui/material";

const HD2Button = styled(Button)(({ theme }) => ({
  '&.MuiButton-root': {
    backgroundColor: 'yellow',
    color: 'black',
    '&.Mui-disabled': {
      background: 'grey'
    }
  },
}));

export default HD2Button;