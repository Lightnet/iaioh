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
//import * as TweakPane from 'https://cdn.jsdelivr.net/npm/tweakpane@4.0.5/dist/tweakpane.min.js';
import * as TweakpaneEssentialsPlugin from 'https://cdn.jsdelivr.net/npm/@tweakpane/plugin-essentials@0.2.1/dist/tweakpane-plugin-essentials.min.js';
//import * as TweakpaneLatexPlugin from 'https://unpkg.com/tweakpane-latex/dist/tweakpane-latex.js';
//import * as TweakCore from 'https://cdn.jsdelivr.net/npm/@tweakpane/core@2.0.5/dist/index.js';
//import {createPlugin} from 'https://cdn.jsdelivr.net/npm/@tweakpane/core@2.0.5/dist/index.js';

// ==============================================
const {div,style,script} = van.tags;
//let TweakpaneLatexPlugin;

//console.log(TweakPane);
//console.log(TweakCore);
// class CounterView {
//   element;
//   buttonElement;
//   constructor(doc, config) {
//     // Create view elements
//     this.element = doc.createElement('div');
//     this.element.classList.add('tp-counter');

//     // Apply value changes to the preview element
//     const previewElem = doc.createElement('div');
//     const value = config.value;
//     value.emitter.on('change', () => {
//       previewElem.textContent = String(value.rawValue);
//     });
//     previewElem.textContent = String(value.rawValue);
//     this.element.appendChild(previewElem);

//     // Create a button element for user interaction
//     const buttonElem = doc.createElement('button');
//     buttonElem.textContent = '+';
//     this.element.appendChild(buttonElem);
//     this.buttonElement = buttonElem;
//   }
// }
// class CounterController{
//   value;
//   view;
//   viewProps;

//   constructor(doc,config){
//     // Models
//     this.value = config.value;
//     this.viewProps = config.viewProps;

//     // Create a view
//     this.view = new CounterView(doc, {
//       value: config.value,
//       viewProps: this.viewProps,
//     });

//     // Handle user interaction
//     this.view.buttonElement.addEventListener('click', () => {
//       // Update a model
//       this.value.rawValue += 1;
//     });
//   }

// }

// const CounterInputPlugin = createPlugin({
//   id: 'counter',
//   type: 'input',
//   accept(value, params) {
//     if (typeof value !== 'number') {
//       return null;
//     }
//     if (params.view !== 'counter') {
//       return null;
//     }
//     return {
//       initialValue: value,
//       params: params,
//     };
//   },
//   binding: {
//     reader: () => (value) => Number(value),
//     writer: () => (target, value) => {
//       console.log(value)
//       target.write(value);
//     },
//   },
//   controller(args) {
//     console.log(args)
//     return new CounterController(args.document, {
//       value: args.value,
//       viewProps: args.viewProps,
//     });
//   },
// })
// const CounterPluginBundle = {
//   // Identifier of the plugin bundle
//   id: 'counter',
//   // Plugins that should be registered
//   plugins: [
//     CounterInputPlugin,
//   ],
//   // Additional CSS for this bundle
//   css: `
//     .tp-counter {align-items: center; display: flex;}
//     .tp-counter div {color: #00ffd680; flex: 1;}
//     .tp-counter button {background-color: #00ffd6c0; border-radius: 2px; color: black; height: 20px; width: 20px;}
//   `,
// }

class AppTweakGame {

  name="A.I"
  strLogs="";
  time="";
  count=0;
  isStart=false;

  constructor(){
    
    
    this.init()
  }

  init(){
    this.group = new TWEEN.Group();
    //this.setupScript()
    this.setupStyle();
    //this.initLogin()
    this.initAccess();
    this.createTweakPane();
    this.run();
  }

  initAccess(){
    this.isStart = true;
    this.addLogs('init Access...')
    this.initLog();
    this.initMenu();
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
    // const myScript = script({
    //   //src:`https://unpkg.com/tweakpane-latex/dist/tweakpane-latex.js`
    //   src:`https://unpkg.com/tweakpane-latex/dist/tweakpane-latex.min.js`
    // });
    // van.add(document.head,myScript)
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
    //pane.registerPlugin(CounterPluginBundle);
    this.pane = pane;
    const self = this;

    const fpsGraph = pane.addBlade({
      view: 'fpsgraph',
      label: 'fps',
      rows: 2,
    });
    this.fpsGraph = fpsGraph;

    // pane.addBlade({
    //   view: 'buttongrid',
    //   size: [3, 3],
    //   cells: (x, y) => ({
    //     title: [
    //       ['NW', 'N', 'NE'],
    //       ['W',  '*', 'E'],
    //       ['SW', 'S', 'SE'],
    //     ][y][x],
    //   }),
    //   label: 'buttongrid',
    // }).on('click', (ev) => {
    //   console.log(ev);
    // });

    pane.addButton({
      title: 'test',
      //label: 'counter',   // optional
    }).on('click', () => {
      console.log(self);
    })

    pane.addButton({
      title: 'test log set 1',
      //label: 'counter',   // optional
    }).on('click', () => {
      console.log(self);
      self.strLogs = "hello..."
    })

    pane.addButton({
      title: 'test log set 2',
      //label: 'counter',   // optional
    }).on('click', () => {
      console.log(self);
      self.strLogs = "lol"
    })

    pane.addButton({
      title: 'add logs',
      //label: 'counter',   // optional
    }).on('click', () => {
      console.log(self);
      self.addLogs('test logs')
    })
    pane.addButton({
      title: 'Dialog Message',
      //label: 'counter',   // optional
    }).on('click', () => {
      //console.log(self);
      self.createDialogMessage('Hello World')
    })

    // TEST PLUGIN
    // pane.addBlade({
    //   view: "latex",
    //   content: "No parsing",
    // });

    // pane.addBinding(this, 'count', {
    //   view: 'counter',
    // });
    
  }

  addLogs(_text){
    this.strLogs += "\n" +_text
  }

  clearLogs(){
    this.strLogs = "";
  }

  run(){
    const update = this.update.bind(this);
    requestAnimationFrame(update)
  }

  updateLogic(){
    this.count++;
    //this.strLogs = "Test " + this.count;
    if(this.count > 30){
      this.count = 0;
      //console.log(this.strLogs);
    }
  }

  update(){
    if(this.isStart){
      //game logic
      this.updateLogic();
    }
    //render handler
    //console.log("update")
    this.group.update()
    this.fpsGraph.begin();
    // Rendering
    this.fpsGraph.end();
    //this.strLogs = ""
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
      //console.log('test');
      //console.log(TWEEN);
      pane0.disabled = true;
      fadeClose(divPane, pane0,()=>{
        //console.log('finish');
        //self.isStart = true;
        self.initAccess();
      })
    });
  }

  initLog(){
    //this.strLogs = 'init logs';
    this.addLogs('init logs');
    const self = this;
    const divPane = div({style:`position:absolute; height:100px; bottom:100px; left:10px; opacity:1;`,class:'gameContainer'})
    van.add(document.body,divPane)
    const pane = new Pane({
      title: 'Console',
      container:divPane,
      expanded: true,
    });
    pane.addBinding(this, 'strLogs', {
      label:'',
      readonly: true,
      //bufferSize: 10,
      multiline: true,
      rows: 5,
    });
    pane.addButton({
      title: 'Clear',
      //label: 'counter',   // optional
    }).on('click', () => {
      //console.log(self);
      self.clearLogs();
    })
    this.uiLogs = pane;
  }

  initMenu(){
    //this.strLogs = 'init menu';
    this.addLogs('init menu');
    const divPane = div({style:`position:fixed;top:64;left:10;opacity:0;`,class:'gameContainer'});
    van.add(document.body,divPane)
    this.fadeShow(divPane,()=>{
      //console.log('test')
    });
    const pane = new Pane({title: 'Menu',container:divPane,expanded: true});
    this.uiGame = pane;

    pane.addButton({title: 'Research'}).on('click', () => {
      //console.log(self);
    })

    pane.addButton({title: 'Developement'}).on('click', () => {
      //console.log(self);
    })

    pane.addButton({title: 'Bots'}).on('click', () => {
      //console.log(self);
    })

    pane.addButton({title: 'Maps'}).on('click', () => {
      //console.log(self);
    })
  }

  createDialogMessage(_message){
    this.addLogs('init dialog message');
    const self = this;
    let data = {};
    data.message = _message;
    const divPane = div({style:`position:absolute; height:50%; bottom:50%; left:50%; opacity:1;`,class:'gameContainer'})
    van.add(document.body,divPane)
    const pane = new Pane({
      title: 'Message',
      container:divPane,
      expanded: true,
    });
    pane.addBinding(data, 'message', {
      label:'',
      readonly: true,
      multiline: true,
      rows: 5,
    });
    pane.addButton({
      title: 'Okay',
      //label: 'counter',   // optional
    }).on('click', () => {
      //console.log(self);
      delete data.message;
      divPane.remove();
      pane.dispose();
      self.addLogs('remove dialog message')
    })
    pane.addButton({
      title: 'Cancel',
      //label: 'counter',   // optional
    }).on('click', () => {
      //console.log(self);
      delete data.message;
      divPane.remove();
      pane.dispose();
      self.addLogs('remove dialog message')
    })
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
