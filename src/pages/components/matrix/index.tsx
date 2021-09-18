import { FC } from "react"

import { Bracket } from "./bracket"

type MatrixProps = {
  results: string[]
  className?: string
}

export const Matrix: FC<MatrixProps> = ({ results, className }) => {
  return (
    <div className={className}>
      <Bracket side="left" />

      {/* grid */}
      {results}

      <Bracket side="right" />
    </div>
  )
}