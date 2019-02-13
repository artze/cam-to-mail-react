import React from 'react'
import ReactDOM from 'react-dom'
import 'normalize.css/normalize.css'
import './styles/styles.scss'

import axiosConfig from './config/axiosConfig'
import CameraApp from './components/CameraApp'

axiosConfig()

ReactDOM.render(<CameraApp />, document.getElementById('app'))
