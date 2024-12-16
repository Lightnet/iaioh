import {createPlugin} from 'https://cdn.jsdelivr.net/npm/@tweakpane/core@2.0.5/dist/index.js';

class CounterView {
  element;
  buttonElement;
  constructor(doc, config) {
    // Create view elements
    this.element = doc.createElement('div');
    this.element.classList.add('tp-counter');

    // Apply value changes to the preview element
    const previewElem = doc.createElement('div');
    const value = config.value;
    value.emitter.on('change', () => {
      previewElem.textContent = String(value.rawValue);
    });
    previewElem.textContent = String(value.rawValue);
    this.element.appendChild(previewElem);

    // Create a button element for user interaction
    const buttonElem = doc.createElement('button');
    buttonElem.textContent = '+';
    this.element.appendChild(buttonElem);
    this.buttonElement = buttonElem;
  }
}

class CounterController{
  value;
  view;
  viewProps;

  constructor(doc,config){
    // Models
    this.value = config.value;
    this.viewProps = config.viewProps;

    // Create a view
    this.view = new CounterView(doc, {
      value: config.value,
      viewProps: this.viewProps,
    });

    // Handle user interaction
    this.view.buttonElement.addEventListener('click', () => {
      // Update a model
      this.value.rawValue += 1;
    });
  }

}

const CounterInputPlugin = createPlugin({
  id: 'counter',
  type: 'input',
  accept(value, params) {
    if (typeof value !== 'number') {
      return null;
    }
    if (params.view !== 'counter') {
      return null;
    }
    return {
      initialValue: value,
      params: params,
    };
  },
  binding: {
    reader: () => (value) => Number(value),
    writer: () => (target, value) => {
      console.log(value)
      target.write(value);
    },
  },
  controller(args) {
    console.log(args)
    return new CounterController(args.document, {
      value: args.value,
      viewProps: args.viewProps,
    });
  },
})

const CounterPluginBundle = {
  // Identifier of the plugin bundle
  id: 'counter',
  // Plugins that should be registered
  plugins: [
    CounterInputPlugin,
  ],
  // Additional CSS for this bundle
  css: `
    .tp-counter {align-items: center; display: flex;}
    .tp-counter div {color: #00ffd680; flex: 1;}
    .tp-counter button {background-color: #00ffd6c0; border-radius: 2px; color: black; height: 20px; width: 20px;}
  `,
}

export default CounterPluginBundle;
