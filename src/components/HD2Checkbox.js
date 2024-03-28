import styled from "@emotion/styled";
import { Checkbox } from "@mui/material";

const HD2Checkbox = styled(Checkbox)(({ theme }) => ({
  '&.MuiCheckbox-root': {
    color: 'yellow',
  },
}));

export default HD2Checkbox;