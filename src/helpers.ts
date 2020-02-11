import { memoizeWith, identity, indexOf } from 'ramda'

export const keys = 'Q 2 W 3 E R 5 T 6 Y 7 U Z S X D C V G B H N J M'
  .split (' ')
  .filter (Boolean)

export const getKeyValue = memoizeWith (identity, (k: string) => {
  return indexOf (k.toUpperCase (), keys)
})
