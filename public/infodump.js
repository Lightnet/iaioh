// https://github.com/doersino/tweakpane-plugin-infodump/blob/main/src/plugin.ts
// https://tweakpane.github.io/docs/plugins/dev/
// 
import { createPlugin } from 'https://cdn.jsdelivr.net/npm/@tweakpane/core@2.0.5/dist/index.js';


class InfoDumpView {
  element;
  constructor(doc, config) {

  }
}

const InfoDumpInputPlugin = createPlugin({
  id: 'infodump',
  type: 'blade',
  accept(value, params) {

  },
  binding: {

  },
  controller(args) {

  }
})

const InfoDumpPluginBundle = {
  // Identifier of the plugin bundle
  id: 'infodump',
  // Plugins that should be registered
  plugins: [
    CounterInputPlugin,
  ],
  // Additional CSS for this bundle
  css: `
    .tp-infodump {align-items: center; display: flex;}
    .tp-infodump div {color: #00ffd680; flex: 1;}
    .tp-infodump button {background-color: #00ffd6c0; border-radius: 2px; color: black; height: 20px; width: 20px;}
  `,
}