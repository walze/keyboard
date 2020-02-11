import { fromEvent, merge } from 'rxjs'
import { map, takeUntil, repeat, flatMap, distinct, distinctUntilChanged } from 'rxjs/operators'
import { equals, pipe, prop, pair } from 'ramda'

export const windowKeyDown$ = fromEvent<KeyboardEvent>(
  window,
  'keydown'
)

export const windowKeyUp$ = fromEvent<KeyboardEvent>(
  window,
  'keyup'
)

export const windowKeyPress$ = merge(
  windowKeyDown$,
  windowKeyUp$,
)
  .pipe(
    distinctUntilChanged(
      (p, q) => p.type === q.type && p.key === q.key
    ),
  )
