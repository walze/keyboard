import React, { FunctionComponent, useState } from 'react'
import { blacks } from '../helpers'

const Key: FunctionComponent<{ id: number; note: string }> = ({ id, note }) => {
  const [active, setActive] = useState ('')

  const activate = () => setActive ('active')
  const deactivate = () => setActive ('')

  return (
    <div
      onMouseUp={deactivate}
      onMouseDown={activate}
      className={`key ${active}`}
      data-color={blacks.includes (id % 12) ? 'black' : 'white'}
      data-note={note}
    >
      <span className='key__text'>
        {note}
      </span>
    </div>
  )
}

export default Key
