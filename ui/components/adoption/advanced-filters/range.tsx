"use client"

import { Slider } from "@/ui/slider"
import { useMemo, useState } from "react"

export function Range() {
  const defaultValues = {
    low: 1,
    high: 5,
  }
  const [[lowest, highest], setValues] = useState([
    defaultValues.low,
    defaultValues.high,
  ])

  const values = useMemo(
    () => ({
      lowest,
      highest,
    }),
    [highest, lowest],
  )

  return (
    <>
      <p className="text-white">
        {values.lowest} - {values.highest}
      </p>

      <Slider
        minStepsBetweenThumbs={1}
        step={1}
        min={1}
        max={20}
        defaultValue={[defaultValues.low, defaultValues.high]}
        onValueChange={([low, high]) => setValues([low, high])}
      />
    </>
  )
}
