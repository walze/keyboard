import React, { FunctionComponent, useState, useEffect } from 'react'
import { blacks } from '../helpers'
import { keyPress$ } from '../observables'

const Key: FunctionComponent<{ id: number; note: string }> = ({ id, note }) => {
  const [active, setActive] = useState ('')

  const activate = () => setActive ('active')
  const deactivate = () => setActive ('')

  const mup = () => {
    deactivate ()

    keyPress$.next ({
      key: note,
      type: 'keyup'
    })
  }

  const mdown = () => {
    activate ()

    keyPress$.next ({
      key: note,
      type: 'keydown'
    })
  }

  useEffect (() => {
    const sub = keyPress$.subscribe (e => {
      const k = e.key.toUpperCase ()
      if (k !== note) return

      const isDown = e.type === 'keydown'

      isDown
        ? activate ()
        : deactivate ()
    })

    return () => {
      sub.unsubscribe ()
    }
  }, [])

  return (
    <div
      onMouseUp={mup}
      onMouseDown={mdown}
      className={`key key--${blacks.includes (id % 12) ? 'black' : ''} ${active}`}
    >
      <span className='key__text'>
        {note}
      </span>
    </div>
  )
}

export default Key
