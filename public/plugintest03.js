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
import CounterPluginBundle from './counter_plugin.js';
//import * as TweakpaneLatexPlugin from 'https://unpkg.com/tweakpane-latex/dist/tweakpane-latex.js';
//import * as TweakCore from 'https://cdn.jsdelivr.net/npm/@tweakpane/core@2.0.5/dist/index.js';
//import {createPlugin} from 'https://cdn.jsdelivr.net/npm/@tweakpane/core@2.0.5/dist/index.js';

// ==============================================
const {div,style,script} = van.tags;
//let TweakpaneLatexPlugin;

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
    //pane.registerPlugin(CounterPluginBundle);
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
