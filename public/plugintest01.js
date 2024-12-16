// https://www.npmjs.com/package/@tweenjs/tween.js
// 
// https://npmtrends.com/@createjs/tweenjs-vs-@tweenjs/tween.js-vs-animejs-vs-gsap-vs-popmotion
// https://createjs.com/getting-started/tweenjs
// https://sbcode.net/threejs/jeasings/
// 
// https://www.jsdelivr.com/package/npm/tweakpane-plugin-media
// https://github.com/donmccurdy/tweakpane-plugin-thumbnail-list
// https://github.com/panGenerator/tweakpane-textarea-plugin
// https://github.com/metehus/tweakpane-image-plugin
// https://github.com/LuchoTurtle/tweakpane-plugin-file-import
// 
// https://www.npmjs.com/package/@kitschpatrol/tweakpane-plugin-thumbnail-list
// 
// 
// 
// 
// 
// 
// 
// https://unpkg.com/tweakpane-latex/dist/tweakpane-latex.min.js
// 
// 

import TWEEN from 'https://unpkg.com/three@0.170.0/examples/jsm/libs/tween.module.js'; //odd url error?
import van from "https://cdn.jsdelivr.net/npm/vanjs-core@1.5.2/src/van.min.js";

import { Pane } from 'https://cdn.jsdelivr.net/npm/tweakpane@4.0.5/dist/tweakpane.min.js';
import * as TweakPane from 'https://cdn.jsdelivr.net/npm/tweakpane@4.0.5/dist/tweakpane.min.js';
import * as TweakpaneEssentialsPlugin from 'https://cdn.jsdelivr.net/npm/@tweakpane/plugin-essentials@0.2.1/dist/tweakpane-plugin-essentials.min.js';
//import * as TweakpaneLatexPlugin from 'https://unpkg.com/tweakpane-latex/dist/tweakpane-latex.js';
//import * as TweakCore from 'https://cdn.jsdelivr.net/npm/@tweakpane/core@2.0.5/dist/index.js';
import {createPlugin} from 'https://cdn.jsdelivr.net/npm/@tweakpane/core@2.0.5/dist/index.js';

// ==============================================
const {div,style,script} = van.tags;
//let TweakpaneLatexPlugin;

//console.log(TweakPane);
//console.log(TweakCore);
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


class AppTweakGame {

  constructor(){
    this.name="A.I"
    this.time=""
    this.count=0;
    this.init()
  }

  init(){
    this.group = new TWEEN.Group();
    //this.setupScript()
    this.setupStyle();
    this.initLogin()
    this.createTweakPane();
    this.run();
  }

  setupStyle(){
const myStyle = style(`
/* Default wrapper view */
.gameContainer .tp-dfwv {
  min-width: 360px;
}
`);
  van.add(document.body,myStyle)
  }

  setupScript(){
    
    const myScript = script({
      //src:`https://unpkg.com/tweakpane-latex/dist/tweakpane-latex.js`
      src:`https://unpkg.com/tweakpane-latex/dist/tweakpane-latex.min.js`
    });
    van.add(document.head,myScript)
  }

  createTweakPane(){
    //console.log(Pane)
    const pane = new Pane({
      title: 'Debug',
      //container:divPane,
      expanded: true,
    });
    //console.log(TweakpaneEssentialsPlugin)
    console.log(window)

    pane.registerPlugin(TweakpaneEssentialsPlugin);
    //pane.registerPlugin(window.TweakpaneLatexPlugin );
    pane.registerPlugin(CounterPluginBundle);
    this.pane = pane;
    const self = this;

    const fpsGraph = pane.addBlade({
      view: 'fpsgraph',
      label: 'fps',
      rows: 2,
    });
    this.fpsGraph = fpsGraph;

    pane.addBlade({
      view: 'buttongrid',
      size: [3, 3],
      cells: (x, y) => ({
        title: [
          ['NW', 'N', 'NE'],
          ['W',  '*', 'E'],
          ['SW', 'S', 'SE'],
        ][y][x],
      }),
      label: 'buttongrid',
    }).on('click', (ev) => {
      console.log(ev);
    });

    pane.addButton({
      title: 'test',
      //label: 'counter',   // optional
    }).on('click', () => {
      console.log(self);
    })

    // pane.addBlade({
    //   view: "latex",
    //   content: "No parsing",
    // });

    pane.addBinding(this, 'count', {
      view: 'counter',
    });
    
  }

  

  run(){
    const update = this.update.bind(this);
    requestAnimationFrame(update)
  }

  update(){
    //console.log("update")
    this.group.update()
    this.fpsGraph.begin();
    // Rendering
    this.fpsGraph.end();
    const update = this.update.bind(this);
    requestAnimationFrame(update)
  }

  initLogin(){
    const self = this;
    const fadeClose = this.fadeClose.bind(this);
    const divPane = div({style:`position:fixed;top:50%;left:50%;opacity:1;`,class:'gameContainer'})
    van.add(document.body,divPane)
    const pane0 = new Pane({
      title: 'hardware',
      container:divPane,
      expanded: true,
    });
    pane0.addButton({
      title: 'boot',
      //label: 'counter',   // optional
    }).on('click', () => {
      console.log('test');
      console.log(TWEEN);
      pane0.disabled = true;
      fadeClose(divPane, pane0,()=>{
        //console.log('finish');
        self.initAccess();
      })
    });
  }

  initAccess(){
    const divPane = div({style:`position:fixed;top:64;left:10;opacity:0;`,class:'gameContainer'});
    van.add(document.body,divPane)
    this.fadeShow(divPane,()=>{
      //console.log('test')
    });
    const pane0 = new Pane({
      title: 'hardware',
      container:divPane,
      expanded: true,
    });
    this.gameui = pane0;

  }

  fadeShow(_div,_callback){
    const tween = new TWEEN
      .Tween(_div.style)
      .to({opacity:1}, 500)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onComplete(handleComplete);
    tween.start()
    function handleComplete() {
      //Tween complete
      if( _callback){
        _callback();
      }
    }
    this.group.add(tween);
  }

  fadeClose(_div,_pane,_callback){
    const tween = new TWEEN
      .Tween(_div.style)
      .to({opacity:0}, 500)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate((object)=>{
        //console.log(object);
      })
      .onComplete(handleComplete);
    tween.start()
    //console.log(tween)
    function handleComplete() {
      //Tween complete
      if( _callback){
        _callback();
      }
      _div.remove();
      //document.body.removeChild(_div);
      _pane.dispose()
    }
    this.group.add(tween);
  }

}
const game = new AppTweakGame();

// const group = new TWEEN.Group();

// let target = {};
//   target.alpha = 0;
//   target.x = 0;

// const divPane = div({style:`position:fixed;top:0px;left:0px;opacity:1;`,class:'yourCustomContainer'})
// van.add(document.body,divPane)
// const pane0 = new Pane({
//   title: 'Parameters',
//   container:divPane,
//   expanded: true,
// });

// pane0.addBinding(target, 'alpha', {
//   readonly: true,
// });

// pane0.addBinding(target, 'x', {
//   readonly: true,
// });

// pane0.addButton({
//   title: 'test',
//   //label: 'counter',   // optional
// }).on('click', () => {
//   console.log('test');

//   //TWEEN.
//   console.log(TWEEN);

//   const tween = new TWEEN
//     .Tween(divPane.style)
//     .to({opacity:0}, 500)
//     //.easing(TWEEN.Easing.Quadratic.InOut)
//     .onUpdate((object)=>{
//       console.log(object);
//     })
//     .onComplete(handleComplete);
//   tween.start()
//   console.log(tween)
//   function handleComplete() {
//     //Tween complete
//     console.log("TESTss")
//   }
//   group.add(tween)

// });

// function update(){
//   group.update()
//   requestAnimationFrame(update)
// }
// update();

// let target = {};
//   target.alpha = 0;
//   target.x = 0;

// const divPane = div({style:`position:fixed;top:0px;left:0px;opacity:1;`,class:'yourCustomContainer'})
// van.add(document.body,divPane)
// const pane0 = new Pane({
//   title: 'Parameters',
//   container:divPane,
//   expanded: true,
// });

// pane0.addBinding(target, 'alpha', {
//   readonly: true,
// });

// pane0.addBinding(target, 'x', {
//   readonly: true,
// });

// pane0.addButton({
//   title: 'test',
//   //label: 'counter',   // optional
// }).on('click', () => {
//   console.log('test');

//   //TWEEN.
//   console.log(TWEEN);

//   const tween = new TWEEN
//     .Tween(divPane.style)
//     .to({opacity:0}, 500)
//     //.easing(TWEEN.Easing.Quadratic.InOut)
//     .onUpdate((object)=>{
//       console.log(object);
//     })
//     .onComplete(handleComplete);
//   tween.start()
//   console.log(tween)
//   function handleComplete() {
//     //Tween complete
//     console.log("TESTss")
//   }
//   group.add(tween)

// });

// const tween = new TWEEN
//     .Tween(target)
//     .to({alpha:1,x:10}, 5000)
//     .easing(TWEEN.Easing.Quadratic.InOut)
//     .onUpdate((object)=>{
//       console.log(object);
//     })
//     .onComplete(handleComplete);
//   tween.start()
//   console.log(tween)
//   function handleComplete() {
//     //Tween complete
//     console.log("TESTss")
//   }
//   group.add(tween)

// const PARAMS = {
//   factor: 123,
//   title: 'hello',
//   color: '#ff0055',
//   percentage: 50,
//   theme: 'dark',
//   size:8,
//   text:'text',
//   count:0,
// };

// const divPane = div({style:`position:fixed;top:0px;left:0px;`,class:'yourCustomContainer'})
// van.add(document.body,divPane)
// const pane0 = new Pane({
//   title: 'Parameters',
//   container:divPane,
//   expanded: true,
// });

// pane0.addButton({
//   title: 'test',
//   //label: 'counter',   // optional
// }).on('click', () => {
//   console.log('test')
// });

// // https://tweakpane.github.io/docs/monitor-bindings/
// pane0.addBinding(PARAMS, 'count',{
//   interval: 100,
//   view: 'graph',
//   readonly: true,
// });

// function update(){
//   PARAMS.count++;
//   //console.log(PARAMS.count);
//   if(PARAMS.count>30){
//     PARAMS.count=0
//   }
//   requestAnimationFrame(update)
// }
//update();