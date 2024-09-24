import equipment from "./equipment.json";

// create item lists outside of func so they don't regen on rerender

const getItems = (type) => {
  const items = []
  equipment.packages.forEach((aPackage) => {
    if (aPackage[type] !== undefined) {
      aPackage[type].forEach((item) => {items.push(item)})
    }
    return items
  })
  //need to check for dubs
  const result = []
  items.forEach((item) => {
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

const stratagems = getItems('stratagems')
stratagems.forEach(stratagem => {
  let type;
  if (stratagem.src.includes('defensive')) {
    type = 'defensive';
  } else if (stratagem.src.includes('offensive')) {
    type = 'offensive';
    if (stratagem.src.includes('eagle')) {
      type = 'offensive-eagle';
    } else if (stratagem.src.includes('orbital')) {
      type = 'offensive-orbital';
    } else {
      console.warn(`Unknown Offensive Item Type - ${stratagem}`);
    }
  } else if (stratagem.src.includes('supply')) {
    type = 'supply';
    if (stratagem.src.includes('weapons')) {
      type = 'supply-weapons';
    } else if (stratagem.src.includes('vehicles')) {
      type = 'supply-vehicles';
    } else if (stratagem.src.includes('backpacks')) {
      type = 'supply-backpacks';
    } else {
      console.warn(`Unknown Supply Item Type - ${stratagem.name} ${stratagem.src}`);
    }
  } else {
    console.warn(`Unknown Item Type - ${stratagem}`);
  }
  stratagem.type = type
})

const defensive = stratagems.filter(item => item.src.includes('defensive'))

const offensive = stratagems.filter(item => item.src.includes('offensive'))
const eagle = stratagems.filter(item => item.src.includes('eagle'))
const orbital = stratagems.filter(item => item.src.includes('orbital'))

const supply = stratagems.filter(item => item.src.includes('supply'))
const weapons = stratagems.filter(item => item.src.includes('weapons'))
const vehicles = stratagems.filter(item => item.src.includes('vehicles'))
const backpacks = stratagems.filter(item => item.src.includes('backpacks'))

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
