import { Typography } from "@mui/material";
import { HD2Accordion, HD2AccordionDetails, HD2AccordionSummary } from "../HD2Accordion";
import ExpandArrow from "../ExpandArrow";
import { HD2NativeSelect } from "../HD2NativeSelect";
import { useEffect, useState } from "react";
import { backpacks, defensive, eagle, orbital, vehicles, weapons } from "../../equipmentLists";

function ItemSelect({value, setValue, itemAmount}, props) {
  const options = [
    <option key={0} style={{ color: 'black' }} value={0}>0</option>,
    <option key={1} style={{ color: 'black' }} value={1}>1</option>,
    <option key={2} style={{ color: 'black' }} value={2}>2</option>,
    <option key={3} style={{ color: 'black' }} value={3}>3</option>,
    <option key={4} style={{ color: 'black' }} value={4}>4</option>,
  ]

  const maxSelection = itemAmount < 5 ? itemAmount: 5

  return (
    <HD2NativeSelect
      sx={{ color: 'white' }}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      inputProps={{
        name: 'age',
      }}
      {...props}
    >
      {options.filter((option, index) => index <= maxSelection)}
    </HD2NativeSelect>
  )
}

export default function LogicSettings({ UpdateLogicSettings }) {
  const [backPackMax, setBackpackMax] = useState(4)
  const [weaponMax, setWeaponMax] = useState(4)
  const [vehicleMax, setVehicleMax] = useState(vehicles.length < 5 ? vehicles.length: 5)
  const [defensiveMax, setDefensiveMax] = useState(4)
  const [orbitalMax, setOrbitalMax] = useState(4)
  const [eagleMax, setEagleMax] = useState(4)

  useEffect(() => {
    UpdateLogicSettings({
      backpacks: parseInt(backPackMax),
      weapons: parseInt(weaponMax),
      vehicles: parseInt(vehicleMax),
      defensive: parseInt(defensiveMax),
      orbital: parseInt(orbitalMax),
      eagle: parseInt(eagleMax),
    })
  // eslint-disable-next-line
  }, [backPackMax, weaponMax, vehicleMax, defensiveMax, orbitalMax, eagleMax])

  return (<>
    <HD2Accordion disableGutters={true}>
      <HD2AccordionSummary expandIcon={<ExpandArrow/>} sx={{ paddingLeft: '0'}}>
        <Typography sx={{ color: 'white' }} variant="h6">Randomness Logic</Typography>
      </HD2AccordionSummary>
      <HD2AccordionDetails>
        <Typography sx={{ color: 'grey' }} variant="body2">Controls the maximum possible amount of each stratagem type</Typography>
        <table><tbody>
          <tr>
            <td style={{ paddingRight: '20px' }}><Typography variant="body2">Backpacks</Typography></td>
            <td><ItemSelect id="Maximum Backpack Stratagems" value={backPackMax} setValue={setBackpackMax} itemAmount={backpacks.length} /></td>
          </tr>
          <tr>
            <td><Typography variant="body2">Weapons</Typography></td>
            <td><ItemSelect id="Maximum Weapon Stratagems" value={weaponMax} setValue={setWeaponMax} itemAmount={weapons.length} /></td>
          </tr>
          <tr>
            <td><Typography variant="body2">Vehicles</Typography></td>
            <td><ItemSelect id="Maximum Vehicle Stratagems" value={vehicleMax} setValue={setVehicleMax} itemAmount={vehicles.length} /></td>
          </tr>
          <tr>
            <td><Typography variant="body2">Defensive</Typography></td>
            <td><ItemSelect id="Maximum Defensive Stratagems" value={defensiveMax} setValue={setDefensiveMax} itemAmount={defensive.length} /></td>
          </tr>
          <tr>
            <td><Typography variant="body2">Eagle</Typography></td>
            <td><ItemSelect id="Maximum Eagle Stratagems" value={eagleMax} setValue={setEagleMax} itemAmount={eagle.length} /></td>
          </tr>
          <tr>
            <td><Typography variant="body2">Orbital</Typography></td>
            <td><ItemSelect id="Maximum Orbital Stratagems" value={orbitalMax} setValue={setOrbitalMax} itemAmount={orbital.length} /></td>
          </tr>
        </tbody></table>
      </HD2AccordionDetails>
    </HD2Accordion>
  </>)
}