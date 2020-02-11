import { memoizeWith, identity, indexOf } from "ramda"

export const keys = [
  "Q",
  "2",
  "W",
  "3",
  "E",
  "R",
  "5",
  "T",
  "6",
  "Y",
  "7",
  "U",
  "I",
  "9",
  "O",
  "0",
  "P",
  "Z",
  "S",
  "X",
  "D",
  "C",
  "F",
  "V",
]


export const getKeyValue = memoizeWith(identity, (k: string) => {
  return indexOf(k.toUpperCase(), keys)
})