import React from 'react'
import { Provider } from 'react-redux'
import { Navigation } from '../index'
import { getAppMockStore } from '../../../../../../library/src/store/mock'
import { mockAppState } from '../../../../../../library/src/state/mock'

export const defaultRender = (() => {
  return (
    <Provider store={getAppMockStore(mockAppState)}>
      <Navigation />
    </Provider>
  )
})()