
import { PolySynth, DuoSynth, Synth, Reverb, MonoSynth, AMSynth } from 'tone'

import React, { useEffect, useState, FunctionComponent } from 'react'
import { compose, props } from 'ramda'

import { windowKeyPress$ } from '../observables'
import { getKeyValue, keys, blacks } from '../helpers'

const getHz = (n: number) => 440 * Math.pow (2, n / 12)

const synth = new PolySynth ({
  voice: AMSynth,
  volume: -10
})
  .chain (new Reverb (2))
  .set ({
    oscillator: {
      type: 'triangle'
    }
  })
  .toMaster ()

const triggerSynth = (_synth: PolySynth) =>
  (n: number) =>
    _synth.triggerAttack ([n])

const releaseSynth = (_synth: PolySynth) =>
  (n: number) => _synth.triggerRelease ([n])

const emit = compose (triggerSynth (synth), getHz)
const release = compose (releaseSynth (synth), getHz)

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

const App = () => {
  useEffect (() => {
    const sub = windowKeyPress$
      .subscribe ((e) => {
        const isDown = e.type === 'keydown'
        const hz = getKeyValue (e.key)
        if (hz <= -1) return

        if (isDown) { emit (hz) } else { release (hz) }
      })

    return () => sub.unsubscribe ()
  }, [])

  return (
    <div>
      {keys.map ((key, i) => (
        <Key key={key} note={key} id={i} />
      ))}
    </div>
  )
}

export default App
