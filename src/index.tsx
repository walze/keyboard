
import React, { Suspense } from 'react'

const App = React.lazy (() => import ('./components/App'))

const $app = document.querySelector ('#app')
if (!$app) throw new Error ('no app element')

import ('react-dom')
  .then (({ render }) => {
    render (
      <Suspense fallback='loading...'>
        <App />
      </Suspense>,
      $app
    )
  })
