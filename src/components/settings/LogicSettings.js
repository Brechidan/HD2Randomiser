import { Typography } from "@mui/material";
import { HD2Accordion, HD2AccordionDetails, HD2AccordionSummary } from "../HD2Accordion";
import ExpandArrow from "../ExpandArrow";
import { HD2NativeSelect } from "../HD2NativeSelect";
import { useEffect, useState } from "react";
import { backpacks, defensive, eagle, orbital, vehicles, weapons } from "../../equipmentLists";

function ItemSelect(props) {
  const {value, setValue, itemAmount} = props

  const options = [
    <option key={0} style={{ color: 'black' }} value={0}>0</option>,
    <option key={1} style={{ color: 'black' }} value={1}>1</option>,
    <option key={2} style={{ color: 'black' }} value={2}>2</option>,
    <option key={3} style={{ color: 'black' }} value={3}>3</option>,
    <option key={4} style={{ color: 'black' }} value={4}>4</option>,
  ]

  const maxSelection = Math.min(5, Math.max(2, itemAmount + 1))

  return (
    <HD2NativeSelect
      sx={{ color: 'white' }}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      inputProps={{
        name: 'age',
        id: 'uncontrolled-native',
      }}
    >
      {options.filter((option, index) => index <= maxSelection)}
    </HD2NativeSelect>
  )
}

export default function LogicSettings({ UpdateLogicSettings }) {
  const [backPackMax, setBackpackMax] = useState(4)
  const [weaponMax, setWeaponMax] = useState(4)
  const [vehicleMax, setVehicleMax] = useState(1)
  const [defensiveMax, setDefensiveMax] = useState(4)
  const [orbitalMax, setOrbitalMax] = useState(4)
  const [eagleMax, setEagleMax] = useState(4)

  useEffect(() => {
    UpdateLogicSettings({
      backPackMax: parseInt(backPackMax),
      weaponMax: parseInt(weaponMax),
      vehicleMax: parseInt(vehicleMax),
      defensiveMax: parseInt(defensiveMax),
      orbitalMax: parseInt(orbitalMax),
      eagleMax: parseInt(eagleMax),
    })
  }, [backPackMax, weaponMax, vehicleMax, defensiveMax, orbitalMax, eagleMax])

  return (<>
    <HD2Accordion defaultExpanded disableGutters={true}>
      <HD2AccordionSummary expandIcon={<ExpandArrow/>} sx={{ paddingLeft: '0'}}>
        <Typography sx={{ color: 'white' }} variant="h6">Randomness Logic</Typography>
      </HD2AccordionSummary>
      <HD2AccordionDetails>
        <Typography sx={{ color: 'grey' }} variant="body2">Controls the maximum amount of the certain stratagem type.</Typography>
        <table><tbody>
          <tr>
            <td style={{ paddingRight: '20px' }}><Typography variant="body2">BackPacks</Typography></td>
            <td><ItemSelect value={backPackMax} setValue={setBackpackMax} itemAmount={backpacks.length} /></td>
          </tr>
          <tr>
            <td><Typography variant="body2">Weapons</Typography></td>
            <td><ItemSelect value={weaponMax} setValue={setWeaponMax} itemAmount={weapons.length} /></td>
          </tr>
          <tr>
            <td><Typography variant="body2">Vehicles</Typography></td>
            <td><ItemSelect value={vehicleMax} setValue={setVehicleMax} itemAmount={vehicles.length} /></td>
          </tr>
          <tr>
            <td><Typography variant="body2">Defensive</Typography></td>
            <td><ItemSelect value={defensiveMax} setValue={setDefensiveMax} itemAmount={defensive.length} /></td>
          </tr>
          <tr>
            <td><Typography variant="body2">Eagle</Typography></td>
            <td><ItemSelect value={eagleMax} setValue={setEagleMax} itemAmount={eagle.length} /></td>
          </tr>
          <tr>
            <td><Typography variant="body2">Orbital</Typography></td>
            <td><ItemSelect value={orbitalMax} setValue={setOrbitalMax} itemAmount={orbital.length} /></td>
          </tr>
        </tbody></table>
      </HD2AccordionDetails>
    </HD2Accordion>
  </>)
}