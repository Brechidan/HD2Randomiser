import { TabContext, TabPanel } from "@mui/lab";
import { Box, FormControlLabel, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import HD2Checkbox from "../HD2Checkbox.js";
import ExpandArrow from "../ExpandArrow.js";
import HD2Button from "../HD2Button.js";
import { HD2Accordion, HD2AccordionDetails, HD2AccordionSummary } from "../HD2Accordion.js";
import { HD2Tab, HD2Tabs } from "../HD2Tabs.js";

import {boosters, primarys, secondarys, grenades, armours, defensive, offensive, supply} from '../../equipmentLists.js';

const createSelectedObj = (selection) => {
  const selected = {
    strats: {},
    booster: {},
    primary: {},
    secondary: {},
    grenade: {},
    armour: {}
  }
  defensive.forEach((item) => selected.strats[item.name] = selection)
  offensive.forEach((item) => selected.strats[item.name] = selection)
  supply.forEach((item) => selected.strats[item.name] = selection)
  boosters.forEach((item) => selected.booster[item.name] = selection)
  primarys.forEach((item) => selected.primary[item] = selection)
  secondarys.forEach((item) => selected.secondary[item] = selection)
  grenades.forEach((item) => selected.grenade[item] = selection)
  armours.forEach((item) => selected.armour[item] = selection)

  return selected
}

// ########### COMPONENT #################
export default function ComplexSettings(props) {
  const {UpdateSettings} = props

  const [tabVal, setTabVal] = useState("1")
  const handleTabChange = (event, newValue) => {
    setTabVal(newValue);
  };

  const [stratTabVal, setStratTabVal] = useState("1")
  const handleStratTabChange = (event, newValue) => {
    setStratTabVal(newValue);
  };

  const [selected, setSelected] = useState(createSelectedObj(true))
  const handleChangeSelected = (event, type, name) => {
    const newSelected = {...selected}
    newSelected[type][name] = !newSelected[type][name]
    setSelected(newSelected)
  }

  const handleTurnOnAll = () => setSelected(createSelectedObj(true))
  const handleTurnOffAll = () => setSelected(createSelectedObj(false))

  useEffect(() => {
    UpdateSettings(selected)
  // eslint-disable-next-line
  }, [selected])

  return (<>
    <HD2Accordion defaultExpanded disableGutters={true}>
      <HD2AccordionSummary expandIcon={<ExpandArrow/>}>
        <Typography sx={{ color: 'white' }}>Complex Active!</Typography>
      </HD2AccordionSummary>
      <HD2AccordionDetails>
        <TabContext value={tabVal}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <HD2Tabs variant="scrollable" value={tabVal} onChange={handleTabChange} scrollButtons={true} allowScrollButtonsMobile={true}>
              <HD2Tab label="Stratagems" value="1" />
              <HD2Tab label="Boosters" value="2" />
              <HD2Tab label="Primary" value="3" />
              <HD2Tab label="Secondary" value="4" />
              <HD2Tab label="Grenade" value="5" />
              <HD2Tab label="Armour" value="6" />
            </HD2Tabs>
          </Box>
          <TabPanel value="1">
            <TabContext value={stratTabVal}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <HD2Tabs variant="scrollable" value={stratTabVal} onChange={handleStratTabChange} scrollButtons={true} allowScrollButtonsMobile={true}>
                <HD2Tab label="Supply" value="1" />
                <HD2Tab label="Offensive" value="2" />
                <HD2Tab label="Defensive" value="3" />
              </HD2Tabs>
            </Box>
            <TabPanel value="1"><Stack>{supply.map((item, index) => <FormControlLabel key={index} control={<HD2Checkbox checked={selected.strats[item.name]} onChange={(e) => handleChangeSelected(e, 'strats', item.name)}/>} label={item.name}/>)}</Stack></TabPanel>
            <TabPanel value="2"><Stack>{offensive.map((item, index) => <FormControlLabel key={index} control={<HD2Checkbox checked={selected.strats[item.name]} onChange={(e) => handleChangeSelected(e, 'strats', item.name)}/>} label={item.name}/>)}</Stack></TabPanel>
            <TabPanel value="3"><Stack>{defensive.map((item, index) => <FormControlLabel key={index} control={<HD2Checkbox checked={selected.strats[item.name]} onChange={(e) => handleChangeSelected(e, 'strats', item.name)}/>} label={item.name}/>)}</Stack></TabPanel>
            </TabContext>
          </TabPanel>
          <TabPanel value="2"><Stack>{boosters.map((item, index) => <FormControlLabel key={index} control={<HD2Checkbox checked={selected.booster[item.name]} onChange={(e) => handleChangeSelected(e, 'booster', item.name)}/>} label={item.name}/>)}</Stack></TabPanel>
          <TabPanel value="3"><Stack>{primarys.map((item, index) => <FormControlLabel key={index} control={<HD2Checkbox checked={selected.primary[item]} onChange={(e) => handleChangeSelected(e, 'primary', item)}/>} label={item}/>)}</Stack></TabPanel>
          <TabPanel value="4"><Stack>{secondarys.map((item, index) => <FormControlLabel key={index} control={<HD2Checkbox checked={selected.secondary[item]} onChange={(e) => handleChangeSelected(e, 'secondary', item)}/>} label={item}/>)}</Stack></TabPanel>
          <TabPanel value="5"><Stack>{grenades.map((item, index) => <FormControlLabel key={index} control={<HD2Checkbox checked={selected.grenade[item]} onChange={(e) => handleChangeSelected(e, 'grenade', item)}/>} label={item}/>)}</Stack></TabPanel>
          <TabPanel value="6"><Stack>{armours.map((item, index) => <FormControlLabel key={index} control={<HD2Checkbox checked={selected.armour[item]} onChange={(e) => handleChangeSelected(e, 'armour', item)}/>} label={item}/>)}</Stack></TabPanel>
        </TabContext>
        <Stack direction={"row"} justifyContent={"space-around"}>
          <HD2Button style={{ flexGrow: 1, margin: '0px 10px' }} onClick={handleTurnOnAll}>Add All Items</HD2Button>
          <HD2Button style={{ flexGrow: 1, margin: '0px 10px' }} onClick={handleTurnOffAll}>Remove All Items</HD2Button>
        </Stack>
      </HD2AccordionDetails>
    </HD2Accordion>
  </>)
}