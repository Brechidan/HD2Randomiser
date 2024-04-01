import equipment from "./equipment.json";

// create item lists outside of func so they don't regen on rerender
const packages = [equipment.base, equipment.superCitizen, equipment.helldiversMobilize, equipment.steeledVeterans, equipment.cuttingEdge]

const getItems = (type) => {
  const packageMap = packages.flatMap((aPackage) => {
    const items = []
    if (aPackage[type] !== undefined) {
      aPackage[type].forEach((item) => {items.push(item)})
    }
    return items
  })
  //need to check for dubs
  const result = []
  packageMap.forEach((item) => {
    if (!result.includes(item)) {
      result.push(item)
    }
  })
  return result;
}

const boosters = getItems('booster')
const primarys = getItems('primary')
const secondarys = getItems('secondary')
const grenades = getItems('grenade')
const armours = getItems('armour')

const defensive = []

const offensive = []
const eagle = []
const orbital = []

const supply = []
const weapons = []
const vehicles = []
const backpacks = []

// simple look thru img path for item type and place in correct array
equipment.stratagems.forEach((item) => {
  if (item.src.includes('defensive')) {
    defensive.push(item)
  } else if (item.src.includes('offensive')) {
    offensive.push(item)
    if (item.src.includes('eagle')) {
      eagle.push(item)
    } else if (item.src.includes('orbital')) {
      orbital.push(item)
    } else {
      console.warn(`Unknown Offensive Item Type - ${item}`);
    }
  } else if (item.src.includes('supply')) {
    supply.push(item)
    if (item.src.includes('weapons')) {
      weapons.push(item)
    } else if (item.src.includes('vehicles')) {
      vehicles.push(item)
    } else if (item.src.includes('backpacks')) {
      backpacks.push(item)
    } else {
      console.warn(`Unknown Supply Item Type - ${item.name} ${item.src}`);
    }
  } else {
    console.warn(`Unknown Item Type - ${item}`);
  }
})

const stratagems = [...defensive, ...offensive, ...supply]
const allEquipment = {
  strats: {},
  booster: {},
  primary: {},
  secondary: {},
  grenade: {},
  armour: {},
}
stratagems.forEach((item) => allEquipment.strats[item.name] = item)
boosters.forEach((item) => allEquipment.booster[item.name] = item)
primarys.forEach((item) => allEquipment.primary[item] = item)
secondarys.forEach((item) => allEquipment.secondary[item] = item)
grenades.forEach((item) => allEquipment.grenade[item] = item)
armours.forEach((item) => allEquipment.armour[item] = item)

export {boosters, primarys, secondarys, grenades, armours, defensive, offensive, eagle, orbital, supply, weapons, vehicles, backpacks, stratagems, allEquipment}
