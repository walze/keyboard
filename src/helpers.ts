import { memoizeWith, identity, indexOf, pipe, split, filter } from 'ramda'

export const _keys = 'Q 2 W 3 E R 5 T 6 Y 7 U Z S X D C V G B H N J M'

export const keys = pipe (
  split (' '),
  filter (Boolean)
) (_keys)

export const blacks = [1, 3, 6, 8, 10]
export const whites = [0, 2, 4, 5, 7, 9, 11, 12]

export const getKeyValue = memoizeWith (identity, (k: string) => {
  return indexOf (k.toUpperCase (), keys)
})
