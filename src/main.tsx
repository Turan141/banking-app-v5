import React from 'preact/compat'
import { App } from './app.tsx'
import { Bridge } from './bridge/Bridge.ts'
import '@/themes/variables.css';

//@ts-ignore
const bridge = new Bridge();
React.render(<App themeType='light'/>,document.getElementById('app')!)
