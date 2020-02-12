import { fromEvent, merge } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'

export const windowKeyDown$ = fromEvent<KeyboardEvent> (
  window,
  'keydown'
)

export const windowKeyUp$ = fromEvent<KeyboardEvent> (
  window,
  'keyup'
)

export const windowKeyPress$ = merge (
  windowKeyDown$,
  windowKeyUp$
)
  .pipe (
    distinctUntilChanged ((p, q) => p.type === q.type && p.key === q.key)
  )
