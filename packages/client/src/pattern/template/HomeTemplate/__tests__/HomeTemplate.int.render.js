import React from 'react'
import { Provider } from 'react-redux'
import { HomeTemplate } from '../index'
import { getAppMockStore } from '../../../../bootstrap/store/mock'
import { mockAppState } from '../../../../store/state/mock'

export const defaultRender = (
  <Provider store={getAppMockStore(mockAppState)}>
    <HomeTemplate />
  </Provider>
)