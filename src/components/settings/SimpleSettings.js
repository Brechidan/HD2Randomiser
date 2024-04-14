import { useEffect, useState } from "react"
import { stratagems } from "../../equipmentLists"
import { FormControlLabel, FormGroup } from "@mui/material";
import HD2Switch from "../HD2Switch";
import HD2TextField from "../HD2TextField";

import equipment from '../../equipment.json';

export default function SimpleSettings({UpdateSettings, SetBadSettings, UpdateLevel}, props) {
  const [packagesActive, setPackagesActive] = useState(equipment.packages.map((aPackage) => true))
  const handlePackageChange = (packageID) => () => {
    const newActive = [...packagesActive]
    newActive[packageID] = !newActive[packageID]
    setPackagesActive(newActive)
  }

  const [level, setLevel] = useState("50")
  const handleLevelChange = (event) => {
    setLevel(event.target.value)
  }

  const [localBadSettings, setLocalBadSettings] = useState(false)

  useEffect(() => {
    if (parseInt(level) < 0 || parseInt(level) > 150 || isNaN(parseInt(level))) {
      SetBadSettings(true)
      setLocalBadSettings(true)
    } else {
      SetBadSettings(false)
      setLocalBadSettings(false)
    }
    UpdateLevel(level)
  // eslint-disable-next-line
  }, [level])

  useEffect(() => {
    const packages = equipment.packages.filter((val, index) => packagesActive[index])

    const selected = {
      strats: stratagems,
      booster: {},
      primary: {},
      secondary: {},
      grenade: {},
      armour: {}
    }

    const addItems = (type) => {
      const items = []
      packages.forEach((aPackage) => {
        if (aPackage[type] !== undefined) {
          aPackage[type].forEach((item) => {
            if (!items.includes(item)) {
              items.push(item)
              selected[type][type === 'booster' ? item.name : item] = item
            }
          })
        }
      })
    }

    addItems('booster')
    addItems('primary')
    addItems('secondary')
    addItems('grenade')
    addItems('armour')

    console.log(selected.armour);

    UpdateSettings(selected)
  // eslint-disable-next-line
  }, [packagesActive])

  return (<>
      <FormGroup>
        <HD2TextField  sx={{ input: {color: 'white'}, label: {color: 'grey'} }} value={level} onChange={handleLevelChange} type="number" label="Level" variant="standard" error={localBadSettings} helperText={localBadSettings ? "Must have 0 ≤ Level ≤ 150." : ''}/>
        {equipment.packages.map((aPackage, index) => {
          return <FormControlLabel key={index} control={<HD2Switch checked={packagesActive[index]} onChange={handlePackageChange(index)}/>} label={aPackage.name} />
        })}
      </FormGroup>
  </>)
}