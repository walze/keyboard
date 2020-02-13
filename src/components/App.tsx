
import { PolySynth, Reverb, FMSynth } from 'tone'

import React, { useEffect, lazy } from 'react'
import { compose } from 'ramda'

import { keyPress$ } from '../observables'
import { getKeyIndex, keys } from '../helpers'

const Key = lazy (() => import ('./Key'))

const getHz = (n: number) => 440 * Math.pow (2, (n - 9) / 12)

const synth = new PolySynth ({
  voice: FMSynth
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

const App = () => {
  useEffect (() => {
    const sub = keyPress$
      .subscribe ((e) => {
        const isDown = e.type === 'keydown'
        const index = getKeyIndex (e.key)
        if (index <= -1) return

        if (isDown) {
          emit (index)
        } else {
          release (index)
        }
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
