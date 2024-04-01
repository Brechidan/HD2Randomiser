import styled from "@emotion/styled";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

export const HD2Accordion = styled(Accordion)(({ theme }) => ({
  '&.MuiAccordion-root': {
    backgroundColor: 'transparent !important',
    padding: 0,
  },
}))

export const HD2AccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  '&.MuiAccordionSummary-root': {
    margin: '10px 0px',
    color: 'white',
  },
}))

export const HD2AccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  '&.MuiAccordionDetails-root': {
    padding: 0,
    color: 'white',
  },
}))
