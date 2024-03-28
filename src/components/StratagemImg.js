import { useTheme } from "@emotion/react"
import { IconButton } from "@mui/material"
import './EquipmentBox.css'
import { useMediaQuery } from "react-responsive"

export default function StratagemImg(props) {
  const theme = useTheme()
  const {stratagem, onClick} = props

  const isSmall = useMediaQuery({ query: `(max-width: ${theme.smallSize})` })

  return (<>
    <IconButton className="EquipmentBox" onClick={onClick} style={{ border: '2px solid black', backgroundColor: theme.menuColors.equipmentBackgroundColor, borderRadius: 0, padding: 0 }}>
      <div style={{ margin: '1px', display: 'flex', justifyItems: 'center' }}>
        <img alt={`${stratagem.name} icon`} src={stratagem.src} style={{ height: isSmall ? '35px':'55px', objectFit: 'scale-down' }} {...props}/>
      </div>
    </IconButton>
  </>)
} 