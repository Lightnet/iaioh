// 
// 
// 

// https://www.npmjs.com/package/@tweenjs/tween.js
// https://npmtrends.com/@createjs/tweenjs-vs-@tweenjs/tween.js-vs-animejs-vs-gsap-vs-popmotion
// https://createjs.com/getting-started/tweenjs
// https://sbcode.net/threejs/jeasings/
// https://www.jsdelivr.com/package/npm/tweakpane-plugin-media
// https://github.com/donmccurdy/tweakpane-plugin-thumbnail-list
// https://github.com/panGenerator/tweakpane-textarea-plugin
// https://github.com/metehus/tweakpane-image-plugin
// https://github.com/LuchoTurtle/tweakpane-plugin-file-import
// https://www.npmjs.com/package/@kitschpatrol/tweakpane-plugin-thumbnail-list
// https://unpkg.com/tweakpane-latex/dist/tweakpane-latex.min.js
// 
// 

//import TWEEN from 'https://unpkg.com/three@0.170.0/examples/jsm/libs/tween.module.js'; //odd url error?
//import van from "https://cdn.jsdelivr.net/npm/vanjs-core@1.5.2/src/van.min.js";

//import { Pane } from 'https://cdn.jsdelivr.net/npm/tweakpane@4.0.5/dist/tweakpane.min.js';
//import * as TweakPane from 'https://cdn.jsdelivr.net/npm/tweakpane@4.0.5/dist/tweakpane.min.js';
//import * as TweakpaneEssentialsPlugin from 'https://cdn.jsdelivr.net/npm/@tweakpane/plugin-essentials@0.2.1/dist/tweakpane-plugin-essentials.min.js';
//import * as TweakpaneLatexPlugin from 'https://unpkg.com/tweakpane-latex/dist/tweakpane-latex.js';
//import * as TweakCore from 'https://cdn.jsdelivr.net/npm/@tweakpane/core@2.0.5/dist/index.js';
//import {createPlugin} from 'https://cdn.jsdelivr.net/npm/@tweakpane/core@2.0.5/dist/index.js';

//import { Modal } from 'https://cdn.jsdelivr.net/npm/vanjs-ui@0.11.5/dist/van-ui.nomodule.min.js'
//import { Modal, FloatingWindow } from 'https://cdn.jsdelivr.net/npm/vanjs-ui@0.11.5/dist/van-ui.js';
//console.log(Modal);

import van from "vanjs-core";
import TWEEN from "@tweenjs/tween.js"
import  { Pane }from "tweakpane";
import * as TweakpaneEssentialsPlugin from "@tweakpane/plugin-essentials";
import { Modal, FloatingWindow } from "van-ui";

import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// ==============================================
const {div, style, script, p, button} = van.tags;
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


    this.initThree();
    this.initAccess();
    this.createTweakPane();
    this.run();
  }

  initThree(){
    this.clock = new THREE.Clock();
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    this.camera.position.set(0,200,200);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setClearColor( 0x80a0e0);
    this.renderer.domElement.style.position='absolute';
    this.renderer.domElement.style.top='0px';
    this.renderer.domElement.style.left='0px';
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    window.addEventListener('resize', this.resizeRenderer.bind(this) )
    // const update = this.update.bind(this);
    // this.renderer.setAnimationLoop( update );

    //CSS
    this.cssRenderer = new CSS3DRenderer();
    this.cssRenderer.domElement.style.position = 'absolute';
    this.cssRenderer.domElement.style.top = '0px';
    this.cssRenderer.setSize( window.innerWidth, window.innerHeight );

    this.orbitControls = new OrbitControls( this.camera, this.cssRenderer.domElement );

    van.add(document.body, this.renderer.domElement);
    van.add(document.body, this.cssRenderer.domElement);
    this.setupScene();
  }

  setupScene(){
    const geometry = new THREE.BoxGeometry( 32, 32, 32 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    this.scene.add( cube );

    // const divEl = div({style:"width:100px;height:100px;",onclick:()=>clicktest()});
    // divEl.style.backgroundColor='blue';
    // //note if OrbitControls is use the over lay will not work
    // console.log(divEl);
    // const cssobject = new CSS3DObject( divEl );
    // cssobject.position.set( 0, 32, 0 );
    // cssobject.rotation.y = 0;
    // this.scene.add(cssobject)


  }

  resizeRenderer(event) {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
  }

  updateRenderer(dt){

    this.renderer.render( this.scene, this.camera );
    this.cssRenderer.render( this.scene, this.camera );
  }

  setupHelpers(){
    const size = 10;
    const divisions = 10;
  
    this.gridHelper = new THREE.GridHelper( size, divisions );
    this.scene.add( this.gridHelper );
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
    //console.log(window)

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

    pane.addButton({title: 'Dialog Message 2',}).on('click', () => {
      self.createDialogMessage02()
    })

    pane.addButton({title: 'Bot Time 2',}).on('click', () => {
      self.bot_mine_test()
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
    //requestAnimationFrame(update)
    this.renderer.setAnimationLoop( update );
    //van.add(document.body, this.renderer.domElement);
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
    const dt = this.clock.getDelta()
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
    //const update = this.update.bind(this);
    //requestAnimationFrame(update)
    this.updateRenderer(dt)
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

    // pane.addButton({title: 'Research'}).on('click', () => {
    //   //console.log(self);
    // })

    // pane.addButton({title: ' Developement '}).on('click', () => {
    //   //console.log(self);
    // })

    // pane.addButton({title: 'Bots'}).on('click', () => {
    //   //console.log(self);
    // })

    // pane.addButton({title: 'Maps'}).on('click', () => {
    //   //console.log(self);
    // })

    pane.addButton({title: 'Buildings'}).on('click', () => {
      //console.log(self);
    })

    pane.addButton({title: 'Constructions'}).on('click', () => {
      //console.log(self);
    })

    // pane.addButton({title: 'Hardwares'}).on('click', () => {
    //   //console.log(self);
    // })

    // pane.addButton({title: 'Networks'}).on('click', () => {
    //   //console.log(self);
    // })

    pane.addButton({title: 'Units'}).on('click', () => {
      //console.log(self);
    })

  }

  createDialogMessage(_message){
    this.addLogs('init dialog message');
    const self = this;
    let data = {};
    data.message = _message;

    const closed = van.state(false)

    const divPane = div({style:`height:200px;`,class:'gameContainer'})
    van.add(document.body, FloatingWindow(
      {title:'Message',closed,width:202,height:240, disableResize: true},
      divPane,
    ))
    //van.add(document.body,divPane)
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

  createDialogMessage02(){

    this.addLogs('init dialog message');
    const self = this;
    let data = {};
    data.message = '_message';
    const closed = van.state(false)
    const divPane = div({style:`height:200px;`,class:'gameContainer'})
    van.add(document.body, FloatingWindow(
      {
        closed, x: 300, y: 300, width: 200, height: 200,
        windowStyleOverrides: {"background-color": "lightgray"},
        childrenContainerStyleOverrides: {
          display: "flex",
          "align-items": "center",
          "justify-content": "center",
          height: "100%",
        }
      },
      divPane
      //button({onclick: () => closed.val = true}, "Close Window"),
    ))
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
      closed.val = true
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
      closed.val = true
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

  //=============================================
  // 
  //=============================================
  bot_mine_test(){
    this.addLogs('init bot test');
    const self = this;
    let data = {};
    data.time = 0;
    data.milliSeconds = 1000;
    data.maxTime = 30;
    data.timerId = null;
    const closed = van.state(false)
    const divPane = div({style:`height:200px;`,class:'gameContainer'})
    van.add(document.body, FloatingWindow(
      {
        closed, x: 300, y: 300, width: 280, height: 200,
        windowStyleOverrides: {"background-color": "lightgray"},
        childrenContainerStyleOverrides: {
          display: "flex",
          "align-items": "center",
          "justify-content": "center",
          height: "100%",
        }
      },
      divPane
      //button({onclick: () => closed.val = true}, "Close Window"),
    ))

    function updateTime(){
      data.time++;
      if(data.time> data.maxTime){
        data.time =0;
      }
    }
    const pane = new Pane({
      title: 'Message',
      container:divPane,
      expanded: true,
    });
    pane.addBinding(data, 'time', {readonly: true});
    pane.addBinding(data, 'maxTime', {readonly: true});
    pane.addBinding(data, 'milliSeconds', {readonly: true});
    const buttonTime = pane.addButton({
      title: 'Start',
      //label: 'counter',   // optional
    }).on('click', () => {
      if(!data.timerId){
        buttonTime.title = "Stop";
        data.timerId =setInterval(()=>{
          updateTime()
        },data.milliSeconds)
      }else{
        console.log('Test timer')
        buttonTime.title = "Start";
        clearInterval(data.timerId);
        data.timerId=null;
      }
    });
    console.log(buttonTime);
    // pane.addButton({
    //   title: 'Stop',
    //   //label: 'counter',   // optional
    // }).on('click', () => {
    //   clearInterval(data.timerId);
    //   data.timerId=null;
    // })

    pane.addButton({
      title: 'Close',
      //label: 'counter',   // optional
    }).on('click', () => {
      //console.log(self);
      delete data.message;
      divPane.remove();
      pane.dispose();
      self.addLogs('remove dialog message')
      closed.val = true
    })
  }

}
const game = new AppTweakGame();
