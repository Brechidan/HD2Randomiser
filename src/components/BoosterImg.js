import { IconButton } from "@mui/material"
import './EquipmentBox.css'
import { useMediaQuery } from "react-responsive"
import { useTheme } from "@emotion/react"

// i hate hexgons in html they stink
// uses css instead of mui themes as hexgons stink
export default function BoosterImg(props) {
  const {booster, onClick} = props
  
  const theme = useTheme()
  const isSmall = useMediaQuery({ query: `(max-width: ${theme.smallSize})` })

  return (<>
    <IconButton className="EquipmentBox hexagon" onClick={onClick} style={{ backgroundColor: 'black', borderRadius: 0 }}>
      <div style={{ margin: '3px', display: 'flex', justifyItems: 'center' }}>
        <img  alt={`${booster.name} icon`} src={booster.src} style={{ height: isSmall ? '25px':'40px', width: isSmall ? '25px':'45px', zIndex: 99}} {...props}/>
      </div>
    </IconButton>
  </>)
} 