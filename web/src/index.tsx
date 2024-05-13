/* @refresh reload */
import { render } from 'solid-js/web'

import App from './App'
import '@unocss/reset/normalize.css'
import './styles/main.css'
import 'mdui/mdui.css'
import 'mdui'
import 'uno.css'

import 'material-icons/iconfont/material-icons.css';

render(() => <App />, document.getElementById('root') as HTMLElement)
