import { useTheme } from "@emotion/react";
import LineSegmentRL from "./LineSegmentRL"
import LineSegmentTB from "./LineSegmentTB"

export function BorderBoxRL(props) {
  const theme = useTheme();

  const {type, sx, color = theme.menuColors.menuBorderColor} = props
  const borderStyle= { padding: '5px', borderLeftStyle: 'solid', borderBottomStyle: 'solid', borderRightStyle: 'solid', borderTopStyle: 'solid', borderColor: color}
  if (type === "left") {
    borderStyle["borderLeftStyle"] = ''
  } else {
    borderStyle["borderRightStyle"] = ''
  }

  return (<>
    <div style={{...borderStyle, ...sx}}>
      <div style={{ width:"100%", height:"100%"  }}>
       <LineSegmentRL color={color}/>
      </div>
    </div>
  </>)
}

export function BorderBoxTB(props) {
  const theme = useTheme();

  const {type, sx, color = theme.menuColors.menuBorderColor} = props
  const borderStyle= { padding: '5px', borderLeftStyle: 'solid', borderBottomStyle: 'solid', borderRightStyle: 'solid', borderTopStyle: 'solid', borderColor: color}
  if (type === "bottom") {
    borderStyle["borderBottomStyle"] = ''
  } else {
    borderStyle["borderTopStyle"] = ''
  }

  return (<>
    <div style={{...borderStyle, ...sx}}>
      <div style={{ width:"100%", height:"100%"  }}>
       <LineSegmentTB color={color}/>
      </div>
    </div>
  </>)
}