export default function LineSegmentRL({color = 'black'}, props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" display={"block"}>
      <defs>
        <pattern id="lineSegmentRL" patternUnits="userSpaceOnUse" width="10" height="30">
          <polygon points="0,0,10,0,10,15" style={{fill: `${color}`}} />
          <polygon points="0,15,0,30,10,30" style={{fill: `${color}`}} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#lineSegmentRL)" />
    </svg>
  )
}