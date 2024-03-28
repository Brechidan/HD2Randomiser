export default function LineSegmentTB({color = 'black'}, props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" display={"block"}>
      <defs>
        <pattern id="lineSegmentTB" patternUnits="userSpaceOnUse" width="30" height="10">
          <polygon points="0,0,0,10,15,10" style={{fill: `${color}`}} />
          <polygon points="15,0,30,0,30,10" style={{fill: `${color}`}} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#lineSegmentTB)" />
    </svg>
  )
}