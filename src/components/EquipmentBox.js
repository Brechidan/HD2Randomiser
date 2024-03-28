import { Button } from '@mui/material'
import './EquipmentBox.css'
import { useTheme } from '@emotion/react'

export default function EquipmentBox(props) {
  const theme = useTheme()

  return (
    <Button className="EquipmentBox" style={{ backgroundColor: theme.menuColors.equipmentBackgroundColor, border: '2px solid black', marginBottom: '2px', padding: '0 15px', color: 'rgb(246, 244, 241)', borderRadius: 0, width: '100%' }} {...props}>
      {props.children}
    </Button>
  )
}