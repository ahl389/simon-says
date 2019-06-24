(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,t,n){},16:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),s=n(8),l=n.n(s),o=(n(15),n(2)),r=n(3),c=n(6),h=n(4),u=n(1),d=n(5),p=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(c.a)(this,Object(h.a)(t).call(this,e))).state={mouseDown:!1},n.handleMouseDown=n.handleMouseDown.bind(Object(u.a)(n)),n.handleMouseUp=n.handleMouseUp.bind(Object(u.a)(n)),n}return Object(d.a)(t,e),Object(r.a)(t,[{key:"handleMouseDown",value:function(){this.props.disabled?console.log("tiles disabled"):this.setState({mouseDown:!0})}},{key:"handleMouseUp",value:function(){this.props.disabled||(this.setState({mouseDown:!1}),(0,this.props.comparePattern)(this.props.id))}},{key:"generateStyles",value:function(e){var t,n;return this.props.totalTiles>6?(t="100px",n="100px"):this.props.totalTiles>4?(t="150px",n="150px"):(t="200px",n="200px"),{backgroundColor:e,width:t,height:n}}},{key:"render",value:function(){var e=this.state.mouseDown?"highlight":"",t="tile tile-".concat(this.props.id," ").concat(e," color-").concat(this.props.id),n=this.generateStyles(this.props.color);return i.a.createElement("div",{className:t,style:n,onMouseDown:this.handleMouseDown,onMouseUp:this.handleMouseUp})}}]),t}(a.Component),v=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(c.a)(this,Object(h.a)(t).call(this,e))).state={levelEnded:!1,clickCount:0,tilesDisabled:!0},n.tiles=[],n.pattern=n.createPattern(),n.userPattern=[],n.showPattern=n.showPattern.bind(Object(u.a)(n)),n.handleClick=n.handleClick.bind(Object(u.a)(n)),n.enableTiles=n.enableTiles.bind(Object(u.a)(n)),n}return Object(d.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){this.showPattern()}},{key:"componentDidUpdate",value:function(){this.state.tilesDisabled&&this.showPattern()}},{key:"createPattern",value:function(){for(var e=[],t=0;t<this.props.patternLength;t++)e.push(Math.ceil(Math.random()*this.props.tileCount-1));return e}},{key:"generateTiles",value:function(){for(var e=[],t=0,n=0;n<this.props.tileCount;n++)t>this.props.colors.length-1&&(t=0),e.push(i.a.createElement(p,{key:n,id:n,color:this.props.colors[t],pattern:this.pattern,comparePattern:this.comparePattern.bind(this),totalTiles:this.props.tileCount,disabled:this.state.tilesDisabled})),t+=1;return e}},{key:"handleClick",value:function(){this.setState({levelEnded:!1,tilesDisabled:!0,clickCount:0})}},{key:"enableTiles",value:function(){this.setState({tilesDisabled:!1})}},{key:"showPattern",value:function(){var e=this;setTimeout(function(){(function t(n){if(!(n<e.pattern.length))return"done!";var a=e.pattern[n],i=document.querySelector(".tile-".concat(a));i&&(i.classList.add("highlight"),n+=1,setTimeout(function(){i.classList.remove("highlight"),setTimeout(function(){return t(n)},200)},700))})(0)},1250)}},{key:"comparePattern",value:function(e){this.state.clickCount<this.pattern.length-1?this.pattern[this.state.clickCount]!==e?(this.setState({levelEnded:!0,clickCount:this.state.clickCount+1}),(0,this.props.removeLife)()):this.setState({clickCount:this.state.clickCount+1}):(0,this.props.increaseLevel)()}},{key:"render",value:function(){return i.a.createElement("div",{className:"game-board"},this.state.levelEnded?i.a.createElement("button",{className:"button",onClick:this.handleClick},"Try again?"):i.a.createElement("div",{className:"level"},0==this.props.id?i.a.createElement("div",{className:"instructions"},"Watch the pattern. When you are ready, click the got it button and then use your mouse to repeat it by clicking on the same tiles in the same order."):"",this.generateTiles(),this.state.tilesDisabled?i.a.createElement("button",{className:"button gotit",onClick:this.enableTiles},"Got it"):""))}},{key:"tilesDisabled",set:function(e){this.setState({tilesDisabled:!1})}}]),t}(a.Component),m=(a.Component,[{tileCount:9,patternLength:2},{tileCount:4,patternLength:3},{tileCount:4,patternLength:4},{tileCount:4,patternLength:5},{tileCount:6,patternLength:5},{tileCount:6,patternLength:6},{tileCount:6,patternLength:7},{tileCount:9,patternLength:7},{tileCount:9,patternLength:8},{tileCount:9,patternLength:9}]),b=(n(16),function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(c.a)(this,Object(h.a)(t).call(this,e))).state={lives:3,hideGame:!0,level:0,colors:["#e6194B","#f58231","#ffe119","#3cb44b","#4363d8","#911eb4"],buttonText:"Begin",statusCode:1},n.handleClick=n.handleClick.bind(Object(u.a)(n)),n}return Object(d.a)(t,e),Object(r.a)(t,[{key:"updateGameStatus",value:function(e){"NEW_GAME"===e?this.setState({hideGame:!0,buttonText:"Play Again?",lives:3,level:0}):"NEXT_LEVEL"===e&&this.setState({hideGame:!0,buttonText:"next level",lives:3,level:this.state.level+1})}},{key:"handleClick",value:function(){this.setState({hideGame:!1})}},{key:"removeLife",value:function(){var e=this.state.lives-1;e>0?this.setState({lives:e}):this.updateGameStatus("NEW_GAME")}},{key:"increaseLevel",value:function(){this.updateGameStatus("NEXT_LEVEL")}},{key:"render",value:function(){var e=this.removeLife,t=this.increaseLevel,n=this.state.lives>1?"".concat(this.state.lives," lives remaining"):"".concat(this.state.lives," life remaining"),a="Level ".concat(this.state.level+1," ");return i.a.createElement("div",{className:"game"},this.state.hideGame?i.a.createElement("button",{className:"button",onClick:this.handleClick},this.state.buttonText):i.a.createElement("div",{className:"play-area"},i.a.createElement("div",{className:"game-state"},i.a.createElement("div",{className:"level-display"},a),i.a.createElement("div",{className:"lives-display"},n)),i.a.createElement(v,{id:this.state.level,tileCount:m[this.state.level].tileCount,patternLength:m[this.state.level].patternLength,colors:this.state.colors,removeLife:e.bind(this),increaseLevel:t.bind(this)})))}}]),t}(a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(i.a.createElement(b,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},9:function(e,t,n){e.exports=n(17)}},[[9,1,2]]]);
//# sourceMappingURL=main.fd4d7ee0.chunk.js.map