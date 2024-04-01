import { Typography } from "@mui/material";
import { HD2Accordion, HD2AccordionDetails, HD2AccordionSummary } from "../HD2Accordion";
import ExpandArrow from "../ExpandArrow";
import SimpleSettings from "./SimpleSettings";
import ComplexSettings from "./ComplexSettings";

export default function ContentSettings({updateSettings, setBadSettings, UpdateLevel, useSimple = true}, props) {
  return (<>
    <HD2Accordion defaultExpanded disableGutters={true}>
      <HD2AccordionSummary expandIcon={<ExpandArrow/>} sx={{ paddingLeft: '0'}}>
        <Typography sx={{ color: 'white' }} variant="h6">Content Selection</Typography>
      </HD2AccordionSummary>
      <HD2AccordionDetails>
        {useSimple ? <SimpleSettings UpdateSettings={updateSettings} SetBadSettings={setBadSettings} UpdateLevel={UpdateLevel}/> : <ComplexSettings UpdateSettings={updateSettings}/>}
      </HD2AccordionDetails>
    </HD2Accordion>
  </>)
}