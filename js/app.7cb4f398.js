(function(e){function t(t){for(var i,u,l=t[0],o=t[1],c=t[2],d=0,h=[];d<l.length;d++)u=l[d],Object.prototype.hasOwnProperty.call(r,u)&&r[u]&&h.push(r[u][0]),r[u]=0;for(i in o)Object.prototype.hasOwnProperty.call(o,i)&&(e[i]=o[i]);a&&a(t);while(h.length)h.shift()();return s.push.apply(s,c||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],i=!0,l=1;l<n.length;l++){var o=n[l];0!==r[o]&&(i=!1)}i&&(s.splice(t--,1),e=u(u.s=n[0]))}return e}var i={},r={app:0},s=[];function u(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.m=e,u.c=i,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)u.d(n,i,function(t){return e[t]}.bind(null,i));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],o=l.push.bind(l);l.push=t,l=l.slice();for(var c=0;c<l.length;c++)t(l[c]);var a=o;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},1873:function(e,t,n){},"1f01":function(e,t,n){e.exports=n.p+"img/dice5.8dbcd3de.svg"},2452:function(e,t,n){e.exports=n.p+"media/music.5d9a7a77.ogg"},2920:function(e,t,n){var i={"./dice1.svg":"54ca","./dice2.svg":"afdb","./dice3.svg":"550b","./dice4.svg":"8227","./dice5.svg":"1f01","./dice6.svg":"94cad"};function r(e){var t=s(e);return n(t)}function s(e){if(!n.o(i,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return i[e]}r.keys=function(){return Object.keys(i)},r.resolve=s,e.exports=r,r.id="2920"},"54ca":function(e,t,n){e.exports=n.p+"img/dice1.056eae24.svg"},"550b":function(e,t,n){e.exports=n.p+"img/dice3.89edb45b.svg"},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("7a23"),r=n("2452"),s=n.n(r),u=Object(i["f"])("header",null,[Object(i["f"])("audio",{controls:"",loop:"",autoplay:""},[Object(i["f"])("source",{src:s.a})]),Object(i["f"])("h1",null,"Backgammon"),Object(i["f"])("p",null,' As you may guess, it\'s game called "backgammon". It\'s widely popular on east. It\'s "short" version because i didn\'t like "long" version. Actually, long version is whole another game, and this game is really stupid ')],-1);function l(e,t,n,r,s,l){var o=Object(i["p"])("game-desk"),c=Object(i["p"])("modal-pick"),a=Object(i["p"])("modal-post-game"),d=Object(i["p"])("modal-match-end");return Object(i["k"])(),Object(i["e"])(i["a"],null,[u,Object(i["f"])("section",null,[null!=s.firstTurnOfIn?(Object(i["k"])(),Object(i["c"])(o,{key:0,onWon:l.scoreOnEmit,firstTurnOf:s.firstTurnOfIn},null,8,["onWon","firstTurnOf"])):Object(i["d"])("",!0)]),s.modalVisible?(Object(i["k"])(),Object(i["c"])(c,{key:0,onFirstTurnOf:l.begginingOfTheGame},null,8,["onFirstTurnOf"])):Object(i["d"])("",!0),s.postGameModalVisible?(Object(i["k"])(),Object(i["c"])(a,{key:1,lightsScore:s.score.true,darksScore:s.score.false,onHideMe:l.hidePostGameModal},null,8,["lightsScore","darksScore","onHideMe"])):Object(i["d"])("",!0),s.gameEnded?(Object(i["k"])(),Object(i["c"])(d,{key:2,winner:s.winner},null,8,["winner"])):Object(i["d"])("",!0)],64)}Object(i["m"])("data-v-354b6f16");var o={class:"desk"},c={class:"rowContainer"},a={class:"firstRow"},d={class:"rowContainer"},h={class:"secondRow"},f={class:"dead-figures"},O={class:"light-figures"},g={class:"dark-figures"};function b(e,t,n,r,s,u){var l=Object(i["p"])("draught-figure"),b=Object(i["p"])("desk-column"),m=Object(i["p"])("rolling-dice");return Object(i["k"])(),Object(i["e"])("div",null,[Object(i["t"])(Object(i["f"])("h1",null,Object(i["q"])(e.ifTurnOfLight?"Lights":"Darks"),513),[[i["r"],null!=e.ifTurnOfLight]]),Object(i["g"])(" "+Object(i["q"])(e.indexOfSelectedDraught)+" "+Object(i["q"])(e.indexOfSelectedColumn)+" ",1),Object(i["f"])("div",null,[Object(i["f"])("div",o,[Object(i["f"])("div",c,[Object(i["f"])("div",a,[(Object(i["k"])(!0),Object(i["e"])(i["a"],null,Object(i["n"])(u.firstRow,(function(e,t){return Object(i["k"])(),Object(i["e"])("span",{key:t},[Object(i["h"])(b,{draughtNumber:e,indexOfColumnOnDesk:t,onSelectedColumn:u.selectColumn},{default:Object(i["s"])((function(){return[Object(i["h"])(l,{onSelected:u.selectDraught,draughtNumber:e,indexOfColumnOnDesk:t},null,8,["onSelected","draughtNumber","indexOfColumnOnDesk"])]})),_:2},1032,["draughtNumber","indexOfColumnOnDesk","onSelectedColumn"])])})),128))])]),Object(i["f"])("div",d,[Object(i["f"])("div",h,[(Object(i["k"])(!0),Object(i["e"])(i["a"],null,Object(i["n"])(u.secondRow,(function(e,t){return Object(i["k"])(),Object(i["e"])("span",{key:t},[Object(i["h"])(b,{draughtNumber:e,indexOfColumnOnDesk:t+12,onSelectedColumn:u.selectColumn},{default:Object(i["s"])((function(){return[Object(i["h"])(l,{onSelected:u.selectDraught,draughtNumber:e,indexOfColumnOnDesk:t+12},null,8,["onSelected","draughtNumber","indexOfColumnOnDesk"])]})),_:2},1032,["draughtNumber","indexOfColumnOnDesk","onSelectedColumn"])])})),128))])])]),Object(i["f"])("h1",null,[(Object(i["k"])(!0),Object(i["e"])(i["a"],null,Object(i["n"])(u.leftTurns,(function(e,t){return Object(i["k"])(),Object(i["e"])("span",{key:t},[Object(i["h"])(m,{roll:u.leftTurns[t].value},null,8,["roll"])])})),128))]),Object(i["f"])("h1",null,"Turns left: "+Object(i["q"])(u.leftTurns.length),1),Object(i["f"])("div",{onClick:t[0]||(t[0]=function(){return u.getOut&&u.getOut.apply(u,arguments)}),class:"light leavedFigures"},[(Object(i["k"])(!0),Object(i["e"])(i["a"],null,Object(i["n"])(e.lightsOut,(function(e,t){return Object(i["k"])(),Object(i["c"])(l,{onSelected:u.selectDeadDraught,key:t,draughtNumber:1,indexOfColumnOnDesk:t},null,8,["onSelected","indexOfColumnOnDesk"])})),128))]),Object(i["f"])("div",{onClick:t[1]||(t[1]=function(){return u.getOut&&u.getOut.apply(u,arguments)}),class:"dark leavedFigures"},[(Object(i["k"])(!0),Object(i["e"])(i["a"],null,Object(i["n"])(e.darksOut,(function(e,t){return Object(i["k"])(),Object(i["c"])(l,{onSelected:u.selectDeadDraught,key:t,draughtNumber:-1,indexOfColumnOnDesk:t},null,8,["onSelected","indexOfColumnOnDesk"])})),128))])]),Object(i["f"])("div",f,[Object(i["f"])("ul",O,[(Object(i["k"])(!0),Object(i["e"])(i["a"],null,Object(i["n"])(e.deadLights,(function(e,t){return Object(i["k"])(),Object(i["c"])(l,{onSelected:u.selectDeadDraught,key:t,draughtNumber:1,indexOfColumnOnDesk:t},null,8,["onSelected","indexOfColumnOnDesk"])})),128))]),Object(i["f"])("ul",g,[(Object(i["k"])(!0),Object(i["e"])(i["a"],null,Object(i["n"])(e.deadDarks,(function(e,t){return Object(i["k"])(),Object(i["c"])(l,{onSelected:u.selectDeadDraught,key:t,draughtNumber:-1,indexOfColumnOnDesk:t},null,8,["onSelected","indexOfColumnOnDesk"])})),128))])])])}Object(i["l"])();var m=n("53ca");n("fb6a"),n("4de4"),n("159b"),n("caad"),n("2532"),n("c740");function p(e,t,n,r,s,u){return Object(i["k"])(),Object(i["e"])("div",{onClick:t[0]||(t[0]=function(){return u.selectColumn&&u.selectColumn.apply(u,arguments)}),class:Object(i["i"])([u.computedClass,"column"]),style:Object(i["j"])("background-color: ".concat(u.computedStyle," "))},[(Object(i["k"])(!0),Object(i["e"])(i["a"],null,Object(i["n"])(u.columnLength,(function(t,n){return Object(i["k"])(),Object(i["e"])("div",{key:n},[Object(i["o"])(e.$slots,"default",{},void 0,!0)])})),128))],6)}n("a9e3");var v={name:"DeskColumn",emits:{selectedColumn:function(e){return"number"===typeof e}},props:{draughtNumber:{type:Number,required:!0,default:0},indexOfColumnOnDesk:{type:Number,required:!0}},computed:{columnLength:function(){return Math.abs(this.draughtNumber)},computedStyle:function(){return this.indexOfColumnOnDesk%2===0?"#0000FF":"#BF3EFF"},computedClass:function(){return{marginRight:6===this.indexOfColumnOnDesk||17===this.indexOfColumnOnDesk}}},methods:{selectColumn:function(){this.$emit("selectedColumn",this.indexOfColumnOnDesk)}}},k=(n("5ecf"),n("d959")),j=n.n(k);const D=j()(v,[["render",p],["__scopeId","data-v-51f9a3cc"]]);var T=D,x=["fill"];function S(e,t,n,r,s,u){return Object(i["k"])(),Object(i["e"])("svg",{onClick:t[0]||(t[0]=Object(i["u"])((function(){return u.selectDraught&&u.selectDraught.apply(u,arguments)}),["stop"])),style:{width:"25px"},viewBox:"0 0 120 120",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},[Object(i["f"])("circle",{cx:"60",cy:"60",r:"50",fill:u.draughtColor},null,8,x)])}var y={name:"DraughtFigure",emits:{selected:function(e){return"number"===typeof e}},props:{draughtNumber:{type:Number,default:0},indexOfColumnOnDesk:{type:Number}},computed:{draughtColor:function(){return this.draughtNumber>0?"red":"black"}},methods:{selectDraught:function(){this.$emit("selected",this.indexOfColumnOnDesk)}}};const C=j()(y,[["render",S]]);var I=C,L=["src"];function w(e,t,n,r,s,u){return Object(i["k"])(),Object(i["e"])("img",{src:u.imagesUrl},null,8,L)}var F={name:"Dice",props:{roll:{type:Number,required:!0}},computed:{imagesUrl:function(){return n("2920")("./dice".concat(Math.abs(this.roll),".svg"))}}};const G=j()(F,[["render",w]]);var H=G,M=function(){return{desk:[2,0,0,0,0,-5,0,-3,0,0,0,5,-5,0,0,0,3,0,5,0,0,0,0,-2],ifTurnOfLight:null,minRoll:1,maxRoll:6,askedForRerroll:!1,rolls:[{value:1,used:!1},{value:1,used:!1}],indexOfSelectedDraught:null,indexOfSelectedColumn:null,deadLights:0,deadDarks:0,lightsOut:0,darksOut:0,modalVisible:!0}},P={name:"GameDesk",components:{DeskColumn:T,DraughtFigure:I,RollingDice:H},emits:{won:function(e){return"object"===Object(m["a"])(e)}},props:{firstTurnOf:{required:!0}},created:function(){this.beginningOfTheGame(this.firstTurnOf)},data:M,computed:{firstRow:function(){return this.desk.slice(0,12)},secondRow:function(){return this.desk.slice(12,24)},darkHome:function(){return this.desk.slice(0,6)},lightHome:function(){return this.desk.slice(18,24)},rollsAreEqual:function(){return this.rolls[0].value===this.rolls[1].value},indexesOfAllLights:function(){return this.desk.reduce((function(e,t,n){return t>=1&&e.push(n),e}),[])},indexesOfAllDarks:function(){return this.desk.reduce((function(e,t,n){return t<=-1&&e.push(n),e}),[])},indexesOfCurrentPlayer:function(){return this.ifTurnOfLight?this.indexesOfAllLights:this.indexesOfAllDarks},ifAllFiguresOfCurrentPlayerIsInHome:function(){var e,t=function(e,t){return e+t};if(this.ifTurnOfLight){var n=this.lightHome.filter((function(e){return e>0}));n.length>0&&(e=n.reduce(t)+this.lightsOut===15)}else{var i=this.darkHome.filter((function(e){return e<0}));i.length>0&&(e=i.reduce(t)-this.darksOut===-15)}return e},positionsAvailableForDark:function(){var e=this,t=[],n=this.indexesOfAllDarks;0!=this.deadDarks&&n.push(24);for(var i=function(i){var r=e.leftTurns[i].value;n.forEach((function(n){e.desk[n+r]<=1&&t.push(n+r)}))},r=0;r<this.leftTurns.length;r++)i(r);return t},positionsAvailableForLights:function(){var e=this,t=[],n=this.indexesOfAllLights;0!=this.deadLights&&n.push(-1);for(var i=function(i){var r=e.leftTurns[i].value;n.forEach((function(n){e.desk[n+r]>=-1&&t.push(n+r)}))},r=0;r<this.leftTurns.length;r++)i(r);return t},positionsAvailableForCurrentPlayer:function(){return this.ifTurnOfLight?this.positionsAvailableForLights:this.positionsAvailableForDark},positionsPossiblyAvailableForSelectedDraught:function(){var e=this,t=[];return this.leftTurns.forEach((function(n){t.push(e.indexOfSelectedDraught+n.value)})),t},positionsAvailableForSelectedDraught:function(){var e=this;return this.positionsAvailableForCurrentPlayer.filter((function(t){return e.positionsPossiblyAvailableForSelectedDraught.includes(t)}))},positionsAvailableForDeadDraughtOfCurrentPlayer:function(){var e=this;return this.ifTurnOfLight?this.positionsPossiblyAvailableForSelectedDraught.filter((function(t){return e.desk[t]>=-1})):this.positionsPossiblyAvailableForSelectedDraught.filter((function(t){return e.desk[t]<=1}))},possibleToGetIn:function(){return this.ifTurnOfLight?this.darkHome.some((function(e){return e>=-1})):this.lightHome.some((function(e){return e<=1}))},ifSelectedColumnOccupiedByOnlyOneDraught:function(){return this.ifTurnOfLight?-1===this.desk[this.indexOfSelectedColumn]:1===this.desk[this.indexOfSelectedColumn]},canGetInLightHome:function(){var e=[],t=this.lightHome;return t.reverse(),this.leftTurns.forEach((function(n){n=Math.abs(n.value),t[n-1]<=1&&e.push(n)})),e},canGetInDarkHome:function(){var e=this,t=[];return this.leftTurns.forEach((function(n){e.darkHome[n.value-1]>=-1&&t.push(n.value)})),t},canGetIn:function(){return this.ifTurnOfLight?this.canGetInDarkHome:this.canGetInLightHome},needToGetIn:function(){return this.ifTurnOfLight?0!=this.deadLights:0!=this.deadDarks},leftTurns:function(){return this.rolls.filter((function(e){return!1===e.used}))},highestIndexInHomeOfCurrentPlayer:function(){var e,t=this.ifTurnOfLight?function(e){return e>=1}:function(e){return e<=-1},n=this.ifTurnOfLight?this.lightHome:this.darkHome;return e=n,e.reverse(),e=Math.abs(e.findIndex(t)-6),-1===e&&(e=void 0),e},ifSelectedDraughtIsDraughtOfCurrentPlayer:function(){return this.ifTurnOfLight?this.desk[this.indexOfSelectedDraught]>0:this.desk[this.indexOfSelectedDraught]<0},validValuesToGetOutIfSelectedDraughtHaveHighestIndex:function(){var e=this;return this.ifCurrentlySelectedDraughtIsHighestInItsHome?this.ifTurnOfLight?this.leftTurns.filter((function(t){return t.value>=e.localIndexOfSelectedDraught})):this.leftTurns.filter((function(t){return t.value<=e.localIndexOfSelectedDraught})):[]},localIndexOfSelectedDraught:function(){return this.ifTurnOfLight?Math.abs(this.indexOfSelectedDraught-24):-(this.indexOfSelectedDraught+1)},ifCurrentlySelectedDraughtIsHighestInItsHome:function(){return Math.abs(this.localIndexOfSelectedDraught)===this.highestIndexInHomeOfCurrentPlayer},waysToGetOutForSelectedDraught:function(){var e=this;return this.ifAllFiguresOfCurrentPlayerIsInHome&&this.ifSelectedDraughtIsDraughtOfCurrentPlayer?this.leftTurns.filter((function(t){return t.value===e.localIndexOfSelectedDraught})):[]}},methods:{setToInitialState:function(){Object.assign(this.$data,M())},roll:function(){var e=Math.floor(Math.random()*(this.maxRoll-this.minRoll)+1);return this.ifTurnOfLight?e:-e},beginningOfTheGame:function(e){this.ifTurnOfLight=e,this.modalVisible=!1,this.beginningOfTheTurn()},beginningOfTheTurn:function(){var e=this.roll(),t=this.roll();this.rolls=[{value:e,used:!1},{value:t,used:!1}],this.rollsAreEqual&&(this.rolls[2]={value:e,used:!1},this.rolls[3]={value:e,used:!1})},theEndOfTurn:function(){this.indexOfSelectedDraught=null,this.indexOfSelectedColumn=null,this.ifTurnOfLight=!this.ifTurnOfLight},selectDraught:function(e){this.indexOfSelectedDraught=e},selectDeadDraught:function(){this.ifTurnOfLight?this.indexOfSelectedDraught=-1:this.indexOfSelectedDraught=24},selectColumn:function(e){this.indexOfSelectedColumn=e,(this.ifTurnOfLight?this.deadLights:this.deadDarks)?this.ressurect():this.moveDraught()},hitOpponentsDraught:function(){this.ifTurnOfLight?(this.desk[this.indexOfSelectedColumn]++,this.deadDarks++):(this.desk[this.indexOfSelectedColumn]--,this.deadLights++)},relocateDraught:function(){this.ifTurnOfLight?(this.desk[this.indexOfSelectedDraught]--,this.desk[this.indexOfSelectedColumn]++):(this.desk[this.indexOfSelectedDraught]++,this.desk[this.indexOfSelectedColumn]--)},moveDraught:function(){this.positionsAvailableForSelectedDraught.includes(this.indexOfSelectedColumn)&&(this.ifSelectedColumnOccupiedByOnlyOneDraught&&this.hitOpponentsDraught(),this.relocateDraught(),this.useRoll(this.indexOfSelectedColumn-this.indexOfSelectedDraught))},useRoll:function(e){var t=this.rolls.findIndex((function(t){return t.value===e&&!1===t.used}));this.rolls[t].used=!0},ressurect:function(){if(this.canGetIn.length>0){var e=Math.abs(this.indexOfSelectedDraught-this.indexOfSelectedColumn);this.canGetIn.includes(e)&&(this.ifSelectedColumnOccupiedByOnlyOneDraught&&this.hitOpponentsDraught(),this.ifTurnOfLight?(this.desk[this.indexOfSelectedColumn]++,this.deadLights--,this.useRoll(this.indexOfSelectedColumn+1)):(this.desk[this.indexOfSelectedColumn]--,this.deadDarks--,this.useRoll(this.indexOfSelectedColumn-24)))}},getOut:function(){var e;this.ifTurnOfLight?this.waysToGetOutForSelectedDraught.length>0?(e=this.waysToGetOutForSelectedDraught[0],this.desk[this.indexOfSelectedDraught]--,this.lightsOut++,this.useRoll(e.value)):this.ifCurrentlySelectedDraughtIsHighestInItsHome&&this.validValuesToGetOutIfSelectedDraughtHaveHighestIndex.length>0&&(e=this.validValuesToGetOutIfSelectedDraughtHaveHighestIndex[0],this.desk[this.indexOfSelectedDraught]--,this.lightsOut++,this.useRoll(e.value)):this.waysToGetOutForSelectedDraught.length>0?(e=this.localIndexOfSelectedDraught,this.desk[this.indexOfSelectedDraught]++,this.darksOut++,this.useRoll(e)):this.ifCurrentlySelectedDraughtIsHighestInItsHome&&this.validValuesToGetOutIfSelectedDraughtHaveHighestIndex.length>0&&(e=this.validValuesToGetOutIfSelectedDraughtHaveHighestIndex[0],this.darksOut++,this.desk[this.indexOfSelectedDraught]++,this.useRoll(e.value))},score:function(e){var t,n,i,r=this;!0===e?(t=0===this.darksOut,n=function(){return r.lightHome.some((function(e){return e<0}))||0!=r.deadDarks}):(t=0===this.lightsOut,n=function(){return r.darkHome.some((function(e){return e>0}))||0!=r.deadLights}),i=t?n()?3:2:1,this.$emit("won",{score:i,winner:e}),this.setToInitialState()}},watch:{leftTurns:function(){0===this.leftTurns.length&&(this.theEndOfTurn(),this.beginningOfTheTurn())},possibleToGetIn:function(){this.needToGetIn&&!this.possibleToGetIn&&(console.log("not possible to get in"),this.theEndOfTurn(),this.beginningOfTheTurn())},canGetIn:function(){this.needToGetIn&&0===this.canGetIn.length&&(this.theEndOfTurn(),this.beginningOfTheTurn())},darksOut:function(){15===this.darksOut&&this.score(!1)},lightsOut:function(){15===this.lightsOut&&this.score(!0)},positionsAvailableForCurrentPlayer:function(){0!==this.positionsAvailableForCurrentPlayer.length||this.ifAllFiguresOfCurrentPlayerIsInHome||(this.theEndOfTurn(),this.beginningOfTheTurn())}}};n("cd12");const R=j()(P,[["render",b],["__scopeId","data-v-354b6f16"]]);var A=R;function N(e,t,n,r,s,u){var l=Object(i["p"])("modal-outer");return Object(i["k"])(),Object(i["c"])(l,null,{default:Object(i["s"])((function(){return[Object(i["f"])("div",null,[Object(i["f"])("h1",null,Object(i["q"])(s.text),1),Object(i["f"])("button",{ref:"button",onClick:t[0]||(t[0]=function(){return u.firstGameRoll&&u.firstGameRoll.apply(u,arguments)})},"Roll!",512)])]})),_:1})}Object(i["m"])("data-v-06f60fae");var E={class:"center modalOuter"},_={class:"modalBody"};function q(e,t){return Object(i["k"])(),Object(i["e"])("div",E,[Object(i["f"])("div",_,[Object(i["o"])(e.$slots,"default",{},void 0,!0)])])}Object(i["l"])();n("697a");const V={},$=j()(V,[["render",q],["__scopeId","data-v-06f60fae"]]);var B=$,U={name:"ModalPick",components:{ModalOuter:B},emits:{firstTurnOf:function(e){return"boolean"===typeof e}},data:function(){return{ifLightsTurnFirst:null,askedForRerroll:!1,text:"Roll! Winner gets first try"}},mounted:function(){this.$refs.button.focus()},methods:{roll:function(){var e=Math.floor(5*Math.random()+1);return e},firstGameRoll:function(){var e=this.roll(),t=this.roll();e>t?this.ifLightsTurnFirst=!0:e<t?this.ifLightsTurnFirst=!1:this.askedForRerroll=!0}},watch:{ifLightsTurnFirst:function(){null!=this.ifLightsTurnFirst&&this.$emit("firstTurnOf",this.ifLightsTurnFirst)},askedForRerroll:function(){this.askedForRerroll&&(this.text="Draw! U should roll it once again")}}};const W=j()(U,[["render",N]]);var J=W;function z(e,t,n,r,s,u){var l=Object(i["p"])("modal-outer");return Object(i["k"])(),Object(i["c"])(l,null,{default:Object(i["s"])((function(){return[Object(i["f"])("div",null,"Darks: "+Object(i["q"])(n.darksScore),1),Object(i["f"])("div",null,"Lights: "+Object(i["q"])(n.lightsScore),1),Object(i["f"])("button",{onClick:t[0]||(t[0]=function(){return u.closeThisModal&&u.closeThisModal.apply(u,arguments)})},"Close me")]})),_:1})}var K={name:"Modal Post Game",components:{ModalOuter:B},props:{darksScore:{type:Number,required:!0},lightsScore:{type:Number,required:!0}},methods:{closeThisModal:function(){this.$emit("hideMe")}}};const Q=j()(K,[["render",z]]);var X=Q;function Y(e,t,n,r,s,u){var l=Object(i["p"])("modal-outer");return Object(i["k"])(),Object(i["c"])(l,null,{default:Object(i["s"])((function(){return[Object(i["f"])("h1",null,"Congtrats, "+Object(i["q"])(n.winner)+" won!",1)]})),_:1})}var Z={name:"ModalGameEnd",components:{ModalOuter:B},props:{winner:{type:Boolean,required:!0}}};const ee=j()(Z,[["render",Y]]);var te=ee,ne={name:"App",components:{GameDesk:A,ModalPick:J,ModalPostGame:X,ModalMatchEnd:te},data:function(){return{score:{true:0,false:0},firstTurnOfIn:null,modalVisible:!0,postGameModalVisible:!1,gameEnded:!1,winner:void 0}},methods:{scoreOnEmit:function(e){this.score[e.winner]+=e.score,this.score[e.winner]>=5?this.gameEnds():this.postGameModalVisible=!0,this.firstTurnOfIn=e},hidePostGameModal:function(){this.postGameModalVisible=!1},begginingOfTheGame:function(e){this.firstTurnOfIn=e,this.modalVisible=!1},gameEnds:function(){this.gameEnded=!0}}};n("d3d3");const ie=j()(ne,[["render",l]]);var re=ie;Object(i["b"])(re).mount("#app")},"5ecf":function(e,t,n){"use strict";n("1873")},"697a":function(e,t,n){"use strict";n("97da")},"7fb2":function(e,t,n){},8227:function(e,t,n){e.exports=n.p+"img/dice4.0393540f.svg"},"94cad":function(e,t,n){e.exports=n.p+"img/dice6.d21de585.svg"},"97da":function(e,t,n){},afdb:function(e,t,n){e.exports=n.p+"img/dice2.2e839c33.svg"},cd12:function(e,t,n){"use strict";n("d749")},d3d3:function(e,t,n){"use strict";n("7fb2")},d749:function(e,t,n){}});
//# sourceMappingURL=app.7cb4f398.js.map