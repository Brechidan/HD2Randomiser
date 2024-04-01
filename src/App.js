import { Button, Dialog, DialogActions, DialogContent, FormControlLabel, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import StratagemImg from "./components/StratagemImg";
import {BorderBoxRL, BorderBoxTB} from "./components/BorderBox";
import EquipmentBox from "./components/EquipmentBox";
import BoosterImg from "./components/BoosterImg";
import { useTheme } from "@emotion/react";
import HD2Switch from "./components/HD2Switch";
import HD2Button from "./components/HD2Button";
import { useMediaQuery } from "react-responsive";
import { allEquipment } from "./equipmentLists";
import LogicSettings from "./components/settings/LogicSettings";
import ContentSettings from "./components/settings/Settings";

import equipment from "./equipment.json";


const ArrRandom = (arr) => arr[Math.floor(Math.random() * arr.length)] 

const MyPaper = (props) => {
  const theme = useTheme()
  return (
    <Paper elevation={3} sx={{ padding: '10px', width: "100%", backgroundColor: theme.menuColors.menuBackgroundColor, color: 'white', zIndex: '5' }} {...props}>{props.children}</Paper>
  )
}

const loudoutUndefinedRename = (loadout) => {
  if (loadout.armour === undefined) {
    loadout.armour = "None (Starter)"
  }
  if (loadout.primary === undefined) {
    loadout.primary = "None (Starter)"
  }
  if (loadout.grenade === undefined) {
    loadout.grenade = "None (Starter)"
  }
  if (loadout.secondary === undefined) {
    loadout.secondary = "None (Starter)"
  }
  if (loadout.booster === undefined) {
    loadout.booster = {"name": "None"}
  }
}

function App() {
  // dialog / info
  const [infoOpen, setInfoOpen] = useState(false)
  const handleInfoOpen = () => setInfoOpen(true)
  const handleInfoClose = () => setInfoOpen(false)

  //Setting,
  const [simple, setSimple] = useState(true)
  const handleSettingsChange = () => setSimple(simple => !simple)

  const [level, setLevel] = useState(25)
  const UpdateLevel = (aLevel) => {
    setLevel(aLevel)
  }
  const [badSettings, setBadSettings] = useState(false)

  const [selection, setSelection] = useState({})
  const UpdateSettings = (aSelection) => {
    setSelection(aSelection)
  }
  const [logicSelection, setLogicSelection] = useState({})
  const UpdateLogicSettings = (aSelection) => {
    setLogicSelection(aSelection)
  }

  //Randomiser
  const [loadout, setLoadout] = useState(undefined)

  const getEquipArr = (type) => {
    if (selection[type] === undefined) {
      return allEquipment[type]
    }
    return Object.keys(selection[type]).filter((name) => selection[type][name]).map((name => allEquipment[type][name] ))
  }

  const getStratSelection = (choosenStrats, logicSettings) => {
    const stratagems = simple ? equipment.stratagems.filter(item => item.level <= parseInt(level)) : equipment.stratagems.filter(item => selection.strats[item.name])

    const stratCount = {
      defensive: 0,
      eagle: 0,
      orbital: 0,
      weapons: 0,
      vehicles: 0,
      backpacks: 0,
    }

    const getType = (itemSrc) => {
      if (itemSrc.includes('defensive')) {
        return 'defensive'
      } if (itemSrc.includes('eagle')) {
        return 'eagle'
      } else if (itemSrc.includes('orbital')) {
        return 'orbital'
      } if (itemSrc.includes('weapons')) {
        return 'weapons'
      } else if (itemSrc.includes('vehicles')) {
        return 'vehicles'
      } else if (itemSrc.includes('backpacks')) {
        return 'backpacks'
      } else {
        console.warn(`Unknown Item Type - ${itemSrc}`);
      }
    }

    choosenStrats.forEach((strat) => {
      stratCount[getType(strat.src)]++
    });

    return stratagems.filter(item => choosenStrats.indexOf(item) === -1 && stratCount[getType(item.src)] < logicSettings[getType(item.src)])
  }

  const handleRandomise = () => {
    const newStrats = []
    let validStrats = getStratSelection(newStrats, logicSelection)
    while (newStrats.length < 4 && validStrats.length > 0) {
      newStrats.push(ArrRandom(validStrats))
      validStrats = getStratSelection(newStrats, logicSelection)
    }

    let newLoadout = {
      strats: newStrats,
      booster: ArrRandom(getEquipArr("booster")),
      primary: ArrRandom(getEquipArr("primary")),
      secondary: ArrRandom(getEquipArr("secondary")),
      grenade: ArrRandom(getEquipArr("grenade")),
      armour: ArrRandom(getEquipArr("armour")),
    }
    loudoutUndefinedRename(newLoadout)

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
        const otherStrats = loadout.strats.filter((item, i) => i !== index)
        const stratSelection = getStratSelection(otherStrats, logicSelection)
        newLoadout["strats"][index] = ArrRandom(stratSelection.filter(item => otherStrats.indexOf(item) === -1));
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
    loudoutUndefinedRename(newLoadout)

    setLoadout(newLoadout)
  }

  const theme = useTheme()
  const isSmall = useMediaQuery({ query: `(max-width: ${theme.smallSize})` })

  return (
    <div style={{ height: "100%", minHeight: '100vh', backgroundColor: 'grey', width: '100%', position: 'relative', overflow: 'hidden' }}>
      <img alt="Helldivers Splash Screen" src="./HD2SplashScreen.jpg" style={{
        position: 'absolute',
        width: '100%',
        height: isSmall ? '2800px' : '2500px',
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
              <Typography variant="h4" textAlign={"center"}><span style={{ borderBottom: '2px white solid' }}>Randomiser</span></Typography>
              <Stack direction={isSmall ? "column" : "row"} justifyContent={"center"} alignItems={"center"} gap={isSmall ? 1 : 2}>
                <Typography variant="h5">{"Settings"}</Typography>
                {!isSmall && <Typography variant="h5">{"|"}</Typography>}
                <div>
                  <FormControlLabel control={<HD2Switch id="Settings Switch" checked={simple} onChange={handleSettingsChange}/>} label={<Typography variant="h5">Simple</Typography>} />
                </div>
              </Stack>
              <ContentSettings useSimple={simple} updateSettings={UpdateSettings} setBadSettings={setBadSettings} UpdateLevel={UpdateLevel}/>
              <LogicSettings UpdateLogicSettings={UpdateLogicSettings}/>
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
          <Typography sx={{fontFamily: 'Verdana', fontWeight: 'bold'}} variant="body1">{`Content release included: ${equipment.release}`}</Typography>
          <br/>
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
