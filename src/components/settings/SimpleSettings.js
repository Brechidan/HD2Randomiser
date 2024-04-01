import { useEffect, useState } from "react"
import { stratagems } from "../../equipmentLists"
import { FormControlLabel, FormGroup } from "@mui/material";
import HD2Switch from "../HD2Switch";
import HD2TextField from "../HD2TextField";

import equipment from "../../equipment.json";

export default function SimpleSettings({UpdateSettings, SetBadSettings}, props) {
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

  const [localBadSettings, setLocalBadSettings] = useState(false)

  useEffect(() => {
    if (parseInt(level) < 0 || parseInt(level) > 50 || isNaN(parseInt(level))) {
      SetBadSettings(true)
      setLocalBadSettings(true)
    } else {
      SetBadSettings(false)
      setLocalBadSettings(false)
    }
  // eslint-disable-next-line
  }, [level])

  useEffect(() => {
    const packages = [equipment.base]

    if (SCActive) {
      packages.push(equipment.superCitizen)
    }
    if (HMActive) {
      packages.push(equipment.helldiversMobilize)
    }
    if (SVActive) {
      packages.push(equipment.steeledVeterans)
    }
    if (CEActive) {
      packages.push(equipment.cuttingEdge)
    }

    const selected = {
      strats: stratagems,
      booster: {},
      primary: {},
      secondary: {},
      grenade: {},
      armour: {}
    }

    packages.forEach((aPackage) => {
      Object.keys(aPackage).forEach((key) => {
        aPackage[key].forEach((item) => {
          if (key === 'booster') {
            selected[key][item.name] = item
          } else {
            selected[key][item] = item
          }
        })
      })
    })

    UpdateSettings(selected)
  }, [SCActive, HMActive, SVActive, CEActive])

  return (<>
      <FormGroup>
        <HD2TextField  sx={{ input: {color: 'white'}, label: {color: 'grey'} }} value={level} onChange={handleLevelChange} type="number" label="Level" variant="standard" error={localBadSettings} helperText={localBadSettings ? "Must have 0 ≤ Level ≤ 50." : ''}/>
        <FormControlLabel control={<HD2Switch checked={SCActive} onChange={handleSCtoggle}/>} label="Super Citizen" />
        <FormControlLabel control={<HD2Switch checked={HMActive} onChange={handleHMtoggle}/>} label="Helldivers Mobilize" />
        <FormControlLabel control={<HD2Switch checked={SVActive} onChange={handleSVtoggle}/>} label="Steeled Veterans" />
        <FormControlLabel control={<HD2Switch checked={CEActive} onChange={handleCEtoggle}/>} label="Cutting Edge" />
      </FormGroup>
  </>)
}