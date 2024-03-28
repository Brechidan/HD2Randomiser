import { Button, Dialog, DialogActions, DialogContent, FormControlLabel, FormGroup, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import StratagemImg from "./components/StratagemImg";
import {BorderBoxRL, BorderBoxTB} from "./components/BorderBox";
import EquipmentBox from "./components/EquipmentBox";
import BoosterImg from "./components/BoosterImg";
import { useTheme } from "@emotion/react";
import HD2Switch from "./components/HD2Switch";
import HD2Button from "./components/HD2Button";
import { useMediaQuery } from "react-responsive";
import SettingsTabs from "./components/SettingsTabs";

import equipment from "./equipment.json";
import { allEquipment } from "./equipmentLists";
import HD2TextField from "./components/HD2TextField";

const ArrRandom = (arr) => arr[Math.floor(Math.random() * arr.length)] 

const MyPaper = (props) => {
  const theme = useTheme()
  return (
    <Paper elevation={3} sx={{ padding: '10px', width: "100%", backgroundColor: theme.menuColors.menuBackgroundColor, color: 'white', zIndex: '5' }} {...props}>{props.children}</Paper>
  )
}

function App() {
  // dialog / info
  const [infoOpen, setInfoOpen] = useState(false)
  const handleInfoOpen = () => setInfoOpen(true)
  const handleInfoClose = () => setInfoOpen(false)

  //Setting,
  const [simple, setSimple] = useState(true)
  const handleSettingsChange = () => setSimple(simple => !simple)

  const [SCActive, setSCActive] = useState(false)
  const [HMActive, setHMActive] = useState(true)
  const [SVActive, setSVACtive] = useState(true)
  const [CEActive, setCEActive] = useState(false)
  const handleSCtoggle = () => setSCActive((SCActive) => !SCActive)
  const handleHMtoggle = () => setHMActive((HMActive) => !HMActive)
  const handleSVtoggle = () => setSVACtive((SVActive) => !SVActive)
  const handleCEtoggle = () => setCEActive((CEActive) => !CEActive)

  const [level, setLevel] = useState("25")
  const handleLevelChange = (event) => {
    setLevel(event.target.value)
  }

  const [badSettings, setBadSettings] = useState(false)

  useEffect(() => {
    if (parseInt(level) < 0 || parseInt(level) > 50 || isNaN(parseInt(level))) {
      setBadSettings(true)
    } else {
      setBadSettings(false)
    }
  }, [level])

  const [selection, setSelection] = useState({})
  const UpdateSettings = (aSelection) => {
    setSelection(aSelection)
  }

  //Randomiser
  const [loadout, setLoadout] = useState(undefined)

  const getEquipArr = (type) => {
    // if complex get selection of type
    if (!simple) {
      return Object.keys(selection[type]).filter((name) => selection[type][name]).map((name => allEquipment[type][name] ))
    }

    const possibleDubArr = [
      ...(equipment.base[type] !== undefined ? equipment.base[type] : []),
      ...(SCActive && equipment.superCitizen[type] !== undefined ? equipment.superCitizen[type] : []),
      ...(HMActive ? equipment.helldiversMobilize[type] : []),
      ...(SVActive ? equipment.steeledVeterans[type] : []),
      ...(CEActive ? equipment.cuttingEdge[type] : []),
    ]
    // remove possible dup items (only happens for armour when SC and HM are both on ;-;)
    const nonDubArr = []
    possibleDubArr.forEach((elem) => {
      if (!nonDubArr.includes(elem)) {
        nonDubArr.push(elem)
      }
    })
    return nonDubArr;
  }

  const getStratSelection = () => {
    if (simple) {
      return equipment.stratagems.filter(item => item.level <= parseInt(level))
    } else {
      return equipment.stratagems.filter(item => selection.strats[item.name])
    }
  }

  const handleRandomise = () => {
    const newStrats = []
    const stratSelection = getStratSelection()
    let validStrats = stratSelection.filter(item => newStrats.indexOf(item) === -1)
    while (newStrats.length < 4 && validStrats.length > 0) {
      newStrats.push(ArrRandom(validStrats))
      validStrats = stratSelection.filter(item => newStrats.indexOf(item) === -1)
    }

    const newLoadout = {
      strats: newStrats,
      booster: ArrRandom(getEquipArr("booster")),
      primary: ArrRandom(getEquipArr("primary")),
      secondary: ArrRandom(getEquipArr("secondary")),
      grenade: ArrRandom(getEquipArr("grenade")),
      armour: ArrRandom(getEquipArr("armour")),
    }
    //check for armour and booster as they have 'no' base items
    if (newLoadout.armour === undefined) {
      newLoadout.armour = "None (Starter)"
    }
    if (newLoadout.primary === undefined) {
      newLoadout.primary = "None (Starter)"
    }
    if (newLoadout.grenade === undefined) {
      newLoadout.grenade = "None (Starter)"
    }
    if (newLoadout.secondary === undefined) {
      newLoadout.secondary = "None (Starter)"
    }
    if (newLoadout.booster === undefined) {
      newLoadout.booster = {"name": "None"}
    }

    setLoadout(newLoadout);
  }

  const Reroll = (item, index) => {
    if (badSettings) {
      return;
    }

    const newLoadout = {
      strats: loadout.strats,
      booster: loadout.booster,
      primary: loadout.primary,
      secondary: loadout.secondary,
      grenade: loadout.grenade,
      armour: loadout.armour
    }

    switch (item) {
      case "strats":
        const stratSelection = getStratSelection()
        const otherStrats = loadout.strats.filter((item, i) => i !== index)
        newLoadout["strats"][index] =ArrRandom(stratSelection.filter(item => otherStrats.indexOf(item) === -1));
        break;
      case "booster":
        newLoadout["booster"] = ArrRandom(getEquipArr("booster"));
        break;
      case "primary":
        newLoadout["primary"] = ArrRandom(getEquipArr("primary"));
        break;
      case "secondary":
        newLoadout["secondary"] = ArrRandom(getEquipArr("secondary"));
        break;
      case "grenade":
        newLoadout["grenade"] = ArrRandom(getEquipArr("grenade"));
        break;
      case "armour":
        newLoadout["armour"] = ArrRandom(getEquipArr("armour"));
        break;
      default:
        throw Error("Reroll: Bad Item Type")
    }
    //check for armour and booster as they have 'no' base items
    if (newLoadout.armour === undefined) {
      newLoadout.armour = "None (Starter)"
    }
    if (newLoadout.primary === undefined) {
      newLoadout.primary = "None (Starter)"
    }
    if (newLoadout.grenade === undefined) {
      newLoadout.grenade = "None (Starter)"
    }
    if (newLoadout.secondary === undefined) {
      newLoadout.secondary = "None (Starter)"
    }
    if (newLoadout.booster === undefined) {
      newLoadout.booster = {"name": "None"}
    }

    setLoadout(newLoadout)
  }

  useEffect(() => {
    handleRandomise()
  // eslint-disable-next-line
  }, [])

  const theme = useTheme()
  const isSmall = useMediaQuery({ query: `(max-width: ${theme.smallSize})` })

  return (
    <div style={{ height: "100%", minHeight: '100vh', backgroundColor: 'grey', width: '100%', position: 'relative', overflow: 'hidden' }}>
      <img alt="Helldivers Splash Screen" src="./HD2SplashScreen.jpg" style={{
        position: 'absolute',
        width: '100%',
        height: '2300px',
        zIndex: '0',
        objectFit: 'cover'
      }}/>
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0 0 0 / 50%)',
        zIndex: '1',
      }}/>
      <div style={{
        position: 'absolute',
        right: '20px',
        bottom: '20px',
        zIndex: '2',
      }}>
         <Button variant="contained" onClick={handleInfoOpen}>info</Button>
      </div>
      <Stack justifyItems={"center"} alignItems={"center"} padding={'5px'} style={{ zIndex: 5, marginBottom: '50px' }}>
        <Stack justifyItems={"center"} alignItems={"center"} sx={{ padding: '25px', maxWidth: isSmall? '300px':'600px', width: "100%" }} gap={1}>
          <MyPaper>
            <Stack>
              <img alt="Helldivers 2 Logo Icon" height={'50px'} style={{ objectFit: 'scale-down', margin: "8px" }}  src='./HD2logoIcon.png'/>
              <Typography variant="h4" textAlign={"center"}>Randomiser</Typography>
              <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} gap={2}>
                <Typography>{"Settings"}</Typography>
                <Typography>{"|"}</Typography>
                <div>
                  <FormControlLabel control={<HD2Switch checked={simple} onChange={handleSettingsChange}/>} label="Simple" />
                </div>
              </Stack>
              {simple ? (
                <FormGroup>
                <HD2TextField  sx={{ input: {color: 'white'}, label: {color: 'grey'} }} value={level} onChange={handleLevelChange} type="number" label="Level" variant="standard" error={badSettings} helperText={badSettings ? "Must have 0 ≤ Level ≤ 50." : ''}/>
                <FormControlLabel control={<HD2Switch checked={SCActive} onChange={handleSCtoggle}/>} label="Super Citizen" />
                <FormControlLabel control={<HD2Switch checked={HMActive} onChange={handleHMtoggle}/>} label="Helldivers Mobilize" />
                <FormControlLabel control={<HD2Switch checked={SVActive} onChange={handleSVtoggle}/>} label="Steeled Veterans" />
                <FormControlLabel control={<HD2Switch checked={CEActive} onChange={handleCEtoggle}/>} label="Cutting Edge" />
              </FormGroup>
              ): <SettingsTabs UpdateSettings={UpdateSettings}/>}
              <HD2Button variant="contained" onClick={handleRandomise} disabled={badSettings} sx={{ marginTop: '15px' }}>Randomise</HD2Button>
            </Stack>
          </MyPaper>

          {loadout !== undefined && <MyPaper>
            <Stack direction={"column"} alignItems={"stretch"}>
              <BorderBoxTB type="bottom" sx={{ height: '10px' }}/>
              <Stack direction="row" justifyContent={"center"} alignItems={"center"} gap={1} sx={{ flexGrow: 1, height: 'fit-content' }}>
                {loadout.strats.map((strat, index) => <StratagemImg onClick={() => Reroll("strats", index)} stratagem={strat} key={index}/>)}
                {loadout.booster.src !== undefined && <BoosterImg onClick={() => Reroll("booster")} booster={loadout.booster} />}
              </Stack>
              <BorderBoxTB type="top" sx={{ height: '10px' }}/>
            </Stack>
          </MyPaper>}
          {loadout !== undefined && <MyPaper>
            <Stack direction={"row"} alignItems={"stretch"}>
              <BorderBoxRL type="right" sx={{ width: '10px' }}/>
              <div style={{ flexGrow: 1 }}/>
              <div style={{width: '400px', textAlign: 'center'}}>
                <Typography variant="h6">Stratagems</Typography>
                {loadout.strats.map((strat, index) => <EquipmentBox key={index} onClick={() => Reroll("strats", index)}><Typography variant="body2">{strat.name}</Typography></EquipmentBox>)}
                <Typography variant="h6">booster</Typography>
                <EquipmentBox onClick={() => Reroll("booster")}><Typography variant="body2">{`${loadout.booster.name}`}</Typography></EquipmentBox>
                <Typography variant="h6">Primary</Typography>
                <EquipmentBox onClick={() => Reroll("primary")}><Typography variant="body2">{`${loadout.primary}`}</Typography></EquipmentBox>
                <Typography variant="h6">Secondary</Typography>
                <EquipmentBox onClick={() => Reroll("secondary")}><Typography variant="body2">{`${loadout.secondary}`}</Typography></EquipmentBox>
                <Typography variant="h6">Grenade</Typography>
                <EquipmentBox onClick={() => Reroll("grenade")}><Typography variant="body2">{`${loadout.grenade}`}</Typography></EquipmentBox>
                <Typography variant="h6">Armour Perk</Typography>
                <EquipmentBox onClick={() => Reroll("armour")}><Typography variant="body2">{`${loadout.armour}`}</Typography></EquipmentBox>
              </div>
              <div style={{ flexGrow: 1 }}/>
              <BorderBoxRL type="left" sx={{ width: '10px' }}/>
            </Stack>
          </MyPaper>}
        </Stack>
      </Stack>
      <Dialog open={infoOpen} onClose={handleInfoClose}>
        <DialogContent>
          <Typography sx={{fontFamily: 'Verdana'}} variant="body1">
            {`Thanks for checking out my randomiser :) hope you like it. The source code is `}<a href="https://github.com/Brechidan/HD2Randomiser">here</a>{`. If you find any bugs/issues please DM me or add an issue on the github.
            Font (Name Smile) from `}<a href="https://www.dafont.com/name-smile.font">here</a>{`, created by Chequered Ink.`}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button sx={{fontFamily: 'Verdana'}} onClick={handleInfoClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
