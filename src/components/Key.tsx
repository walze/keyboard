import React, { FunctionComponent, useState } from 'react'
import { blacks } from '../helpers'
import { windowKeyPress$ } from '../observables'

const Key: FunctionComponent<{ id: number; note: string }> = ({ id, note }) => {
  const [active, setActive] = useState ('')

  const activate = () => setActive ('active')
  const deactivate = () => setActive ('')

  windowKeyPress$
    .subscribe (e => {
      const k = e.key.toUpperCase ()
      if (k !== note) return

      const isDown = e.type === 'keydown'

      isDown
        ? activate ()
        : deactivate ()
    })

  return (
    <div
      onMouseUp={deactivate}
      onMouseDown={activate}
      className={`key key--${blacks.includes (id % 12) ? 'black' : ''} ${active}`}
    >
      <span className='key__text'>
        {note}
      </span>
    </div>
  )
}

export default Key
