import styled from "@emotion/styled";
import { Switch } from "@mui/material";

const HD2Switch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.menuColors.menuBorderColor,
  },
  '& .MuiSwitch-switchBase': {
    '&.Mui-checked': {
      color: 'yellow',
      '& .MuiSwitch-thumb': {
        backgroundColor: 'yellow',
      },
    },
  },
  '& .MuiSwitch-track': {
    backgroundColor: `${theme.menuColors.menuBorderColor} !important`, //still don't really know how styled func works so using !important
  },
}));

export default HD2Switch;