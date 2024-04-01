import styled from "@emotion/styled";
import { NativeSelect } from "@mui/material";

export const HD2NativeSelect = styled(NativeSelect)(({ theme }) => ({
  '&.MuiNativeSelect-root': {
    color: 'white',
    borderBottom: '2px solid white',
    '& .Mui-focused': {
      color: 'white'
    },
    '& .MuiNativeSelect-icon': {
      color: 'white'
    },
  },
  '& ::after': {
    borderBottom: '',
    color: 'green'
  },
}))
