declare module '@/assets/svgr/*.svg' {
  import React from "react"
  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>
  export default SVG
}

declare module '@/assets/svgr/*.svg?url' {
  const svg: string
  export default svg
}
