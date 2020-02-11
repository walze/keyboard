
import { PolySynth, DuoSynth, Synth, Reverb } from 'tone'

import React, { useEffect } from 'react'
import { compose } from 'ramda'

import { windowKeyPress$ } from '../observables'
import { getKeyValue } from '../helpers'

const getHz = (n: number) => 440 * Math.pow(2, n / 12)

const synth = new PolySynth({
  voice: Synth,
  volume: -20,
})
  .chain(new Reverb(2))
  .set({
    oscillator: {
      type: "square"
    },
  })
  .toMaster()


const triggerSynth = (_synth: PolySynth) =>
  (n: number) =>
    _synth.triggerAttack([n])

const releaseSynth = (_synth: PolySynth) =>
  (n: number) => _synth.triggerRelease([n])

const emit = compose(triggerSynth(synth), getHz)
const release = compose(releaseSynth(synth), getHz)
const App = () => {

  useEffect(() => {
    const sub = windowKeyPress$
      .subscribe((e) => {
        const isDown = e.type === 'keydown'

        if (isDown)
          emit(getKeyValue(e.key))
        else
          release(getKeyValue(e.key))
      })

    return () => sub.unsubscribe()
  }, [])

  return (
    <div>
      press any key
    </div>
  )
}

export default App
