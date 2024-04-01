import styled from "@emotion/styled";
import { Tab, Tabs } from "@mui/material";

export const HD2Tab = styled(Tab)(({ theme }) => ({
  '&.MuiTab-root': {
    color: 'white',
    '&.Mui-selected': {
      color: 'Black',
      backgroundColor: 'yellow'
    },
  },
}))

export const HD2Tabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    backgroundColor: 'black',
  },
}))
