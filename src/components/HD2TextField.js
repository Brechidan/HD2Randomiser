import styled from "@emotion/styled";
import { TextField } from "@mui/material";

const HD2TextField = styled(TextField)(({ theme }) => ({
  '&.MuiTextField-root': {
    color: 'white',
    '& .Mui-focused': {
      color: 'white'
    }
  },
  '& ::after': {
    borderBottom: '2px solid white',
  },
  '& ::before': {
    borderBottom: '1px solid rgba(255, 255, 255, 0.42)',
  },
  '& :hover': {
    borderBottom: '2px solid white'
  }
}));

export default HD2TextField;