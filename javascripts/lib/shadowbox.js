/*
 * Shadowbox.js, version 3.0.3
 * http://shadowbox-js.com/
 *
 * Copyright 2007-2010, Michael J. I. Jackson
 * Date: 2010-10-30 22:17:31 +0000
 */
(function(V,q){var g={version:"3.0.3"};var aa=navigator.userAgent.toLowerCase();if(aa.indexOf("windows")>-1||aa.indexOf("win32")>-1){g.isWindows=true}else{if(aa.indexOf("macintosh")>-1||aa.indexOf("mac os x")>-1){g.isMac=true}else{if(aa.indexOf("linux")>-1){g.isLinux=true}}}g.isIE=aa.indexOf("msie")>-1;g.isIE6=aa.indexOf("msie 6")>-1;g.isIE7=aa.indexOf("msie 7")>-1;g.isGecko=aa.indexOf("gecko")>-1&&aa.indexOf("safari")==-1;g.isWebKit=aa.indexOf("applewebkit/")>-1;var e=/#(.+)$/,O=/^(light|shadow)box\[(.*?)\]/i,o=/\s*([a-z_]*?)\s*=\s*(.+)\s*/,au=/[0-9a-z]+$/i,ar=/(.+\/)shadowbox\.js/i;var x=false,m=false,X={},ak=0,Q,ac;g.current=-1;g.dimensions=null;g.ease=function(E){return 1+Math.pow(E-1,3)};g.errorInfo={fla:{name:"Flash",url:"http://www.adobe.com/products/flashplayer/"},qt:{name:"QuickTime",url:"http://www.apple.com/quicktime/download/"},wmp:{name:"Windows Media Player",url:"http://www.microsoft.com/windows/windowsmedia/"},f4m:{name:"Flip4Mac",url:"http://www.flip4mac.com/wmv_download.htm"}};g.gallery=[];g.onReady=al;g.path=null;g.player=null;g.playerId="sb-player";g.options={animate:true,animateFade:true,autoplayMovies:true,continuous:false,enableKeys:true,flashParams:{bgcolor:"#000000",allowfullscreen:true},flashVars:{},flashVersion:"9.0.115",handleOversize:"resize",handleUnsupported:"link",onChange:al,onClose:al,onFinish:al,onOpen:al,showMovieControls:true,skipSetup:false,slideshowDelay:0,viewportPadding:20};g.getCurrent=function(){return g.current>-1?g.gallery[g.current]:null};g.hasNext=function(){return g.gallery.length>1&&(g.current!=g.gallery.length-1||g.options.continuous)};g.isOpen=function(){return x};g.isPaused=function(){return ac=="pause"};g.applyOptions=function(E){X=aq({},g.options);aq(g.options,E)};g.revertOptions=function(){aq(g.options,X)};g.init=function(S,ay){if(m){return}m=true;if(g.skin.options){aq(g.options,g.skin.options)}if(S){aq(g.options,S)}if(!g.path){var ax,K=document.getElementsByTagName("script");for(var aw=0,E=K.length;aw<E;++aw){ax=ar.exec(K[aw].src);if(ax){g.path=ax[1];break}}}if(ay){g.onReady=ay}at()};g.open=function(K){if(x){return}var E=g.makeGallery(K);g.gallery=E[0];g.current=E[1];K=g.getCurrent();if(K==null){return}g.applyOptions(K.options||{});f();if(g.gallery.length){K=g.getCurrent();if(g.options.onOpen(K)===false){return}x=true;g.skin.onOpen(K,W)}};g.close=function(){if(!x){return}x=false;if(g.player){g.player.remove();g.player=null}if(typeof ac=="number"){clearTimeout(ac);ac=null}ak=0;ah(false);g.options.onClose(g.getCurrent());g.skin.onClose();g.revertOptions()};g.play=function(){if(!g.hasNext()){return}if(!ak){ak=g.options.slideshowDelay*1000}if(ak){Q=Z();ac=setTimeout(function(){ak=Q=0;g.next()},ak);if(g.skin.onPlay){g.skin.onPlay()}}};g.pause=function(){if(typeof ac!="number"){return}ak=Math.max(0,ak-(Z()-Q));if(ak){clearTimeout(ac);ac="pause";if(g.skin.onPause){g.skin.onPause()}}};g.change=function(E){if(!(E in g.gallery)){if(g.options.continuous){E=(E<0?g.gallery.length+E:0);if(!(E in g.gallery)){return}}else{return}}g.current=E;if(typeof ac=="number"){clearTimeout(ac);ac=null;ak=Q=0}g.options.onChange(g.getCurrent());W(true)};g.next=function(){g.change(g.current+1)};g.previous=function(){g.change(g.current-1)};g.setDimensions=function(aH,ay,aF,aG,ax,E,aD,aA){var aC=aH,aw=ay;var aB=2*aD+ax;if(aH+aB>aF){aH=aF-aB}var S=2*aD+E;if(ay+S>aG){ay=aG-S}var K=(aC-aH)/aC,aE=(aw-ay)/aw,az=(K>0||aE>0);if(aA&&az){if(K>aE){ay=Math.round((aw/aC)*aH)}else{if(aE>K){aH=Math.round((aC/aw)*ay)}}}g.dimensions={height:aH+ax,width:ay+E,innerHeight:aH,innerWidth:ay,top:Math.floor((aF-(aH+aB))/2+aD),left:Math.floor((aG-(ay+S))/2+aD),oversized:az};return g.dimensions};g.makeGallery=function(ax){var E=[],aw=-1;if(typeof ax=="string"){ax=[ax]}if(typeof ax.length=="number"){ae(ax,function(az,aA){if(aA.content){E[az]=aA}else{E[az]={content:aA}}});aw=0}else{if(ax.tagName){var K=g.getCache(ax);ax=K?K:g.makeObject(ax)}if(ax.gallery){E=[];var ay;for(var S in g.cache){ay=g.cache[S];if(ay.gallery&&ay.gallery==ax.gallery){if(aw==-1&&ay.content==ax.content){aw=E.length}E.push(ay)}}if(aw==-1){E.unshift(ax);aw=0}}else{E=[ax];aw=0}}ae(E,function(az,aA){E[az]=aq({},aA)});return[E,aw]};g.makeObject=function(aw,S){var ax={content:aw.href,title:aw.getAttribute("title")||"",link:aw};if(S){S=aq({},S);ae(["player","title","height","width","gallery"],function(ay,az){if(typeof S[az]!="undefined"){ax[az]=S[az];delete S[az]}});ax.options=S}else{ax.options={}}if(!ax.player){ax.player=g.getPlayer(ax.content)}var E=aw.getAttribute("rel");if(E){var K=E.match(O);if(K){ax.gallery=escape(K[2])}ae(E.split(";"),function(ay,az){K=az.match(o);if(K){ax[K[1]]=K[2]}})}return ax};g.getPlayer=function(S){if(S.indexOf("#")>-1&&S.indexOf(document.location.href)==0){return"inline"}var aw=S.indexOf("?");if(aw>-1){S=S.substring(0,aw)}var K,E=S.match(au);if(E){K=E[0].toLowerCase()}if(K){if(g.img&&g.img.ext.indexOf(K)>-1){return"img"}if(g.swf&&g.swf.ext.indexOf(K)>-1){return"swf"}if(g.flv&&g.flv.ext.indexOf(K)>-1){return"flv"}if(g.qt&&g.qt.ext.indexOf(K)>-1){if(g.wmp&&g.wmp.ext.indexOf(K)>-1){return"qtwmp"}else{return"qt"}}if(g.wmp&&g.wmp.ext.indexOf(K)>-1){return"wmp"}}return"iframe"};function f(){var aw=g.errorInfo,ax=g.plugins,az,aA,aD,S,aC,K,aB,E;for(var ay=0;ay<g.gallery.length;++ay){az=g.gallery[ay];aA=false;aD=null;switch(az.player){case"flv":case"swf":if(!ax.fla){aD="fla"}break;case"qt":if(!ax.qt){aD="qt"}break;case"wmp":if(g.isMac){if(ax.qt&&ax.f4m){az.player="qt"}else{aD="qtf4m"}}else{if(!ax.wmp){aD="wmp"}}break;case"qtwmp":if(ax.qt){az.player="qt"}else{if(ax.wmp){az.player="wmp"}else{aD="qtwmp"}}break}if(aD){if(g.options.handleUnsupported=="link"){switch(aD){case"qtf4m":aC="shared";K=[aw.qt.url,aw.qt.name,aw.f4m.url,aw.f4m.name];break;case"qtwmp":aC="either";K=[aw.qt.url,aw.qt.name,aw.wmp.url,aw.wmp.name];break;default:aC="single";K=[aw[aD].url,aw[aD].name]}az.player="html";az.content='<div class="sb-message">'+t(g.lang.errors[aC],K)+"</div>"}else{aA=true}}else{if(az.player=="inline"){S=e.exec(az.content);if(S){aB=ai(S[1]);if(aB){az.content=aB.innerHTML}else{aA=true}}else{aA=true}}else{if(az.player=="swf"||az.player=="flv"){E=(az.options&&az.options.flashVersion)||g.options.flashVersion;if(g.flash&&!g.flash.hasFlashPlayerVersion(E)){az.width=310;az.height=177}}}}if(aA){g.gallery.splice(ay,1);if(ay<g.current){--g.current}else{if(ay==g.current){g.current=ay>0?ay-1:ay}}--ay}}}function ah(E){if(!g.options.enableKeys){return}(E?j:a)(document,"keydown",Y)}function Y(S){if(S.metaKey||S.shiftKey||S.altKey||S.ctrlKey){return}var K=l(S),E;switch(K){case 81:case 88:case 27:E=g.close;break;case 37:E=g.previous;break;case 39:E=g.next;break;case 32:E=typeof ac=="number"?g.pause:g.play;break}if(E){I(S);E()}}function W(az){ah(false);var ay=g.getCurrent();var S=(ay.player=="inline"?"html":ay.player);if(typeof g[S]!="function"){throw"unknown player "+S}if(az){g.player.remove();g.revertOptions();g.applyOptions(ay.options||{})}g.player=new g[S](ay,g.playerId);if(g.gallery.length>1){var aw=g.gallery[g.current+1]||g.gallery[0];if(aw.player=="img"){var K=new Image();K.src=aw.content}var ax=g.gallery[g.current-1]||g.gallery[g.gallery.length-1];if(ax.player=="img"){var E=new Image();E.src=ax.content}}g.skin.onLoad(az,s)}function s(){if(!x){return}if(typeof g.player.ready!="undefined"){var E=setInterval(function(){if(x){if(g.player.ready){clearInterval(E);E=null;g.skin.onReady(M)}}else{clearInterval(E);E=null}},10)}else{g.skin.onReady(M)}}function M(){if(!x){return}g.player.append(g.skin.body,g.dimensions);g.skin.onShow(r)}function r(){if(!x){return}if(g.player.onLoad){g.player.onLoad()}g.options.onFinish(g.getCurrent());if(!g.isPaused()){g.play()}ah(true)}if(!Array.prototype.indexOf){Array.prototype.indexOf=function(K,S){var E=this.length>>>0;S=S||0;if(S<0){S+=E}for(;S<E;++S){if(S in this&&this[S]===K){return S}}return -1}}function Z(){return(new Date).getTime()}function aq(E,S){for(var K in S){E[K]=S[K]}return E}function ae(aw,ax){var K=0,E=aw.length;for(var S=aw[0];K<E&&ax.call(S,K,S)!==false;S=aw[++K]){}}function t(K,E){return K.replace(/\{(\w+?)\}/g,function(S,aw){return E[aw]})}function al(){}function ai(E){return document.getElementById(E)}function A(E){E.parentNode.removeChild(E)}var am=true,N=true;function ap(){var E=document.body,K=document.createElement("div");am=typeof K.style.opacity==="string";K.style.position="fixed";K.style.margin=0;K.style.top="20px";E.appendChild(K,E.firstChild);N=K.offsetTop==20;E.removeChild(K)}g.getStyle=(function(){var E=/opacity=([^)]*)/,K=document.defaultView&&document.defaultView.getComputedStyle;return function(ay,ax){var aw;if(!am&&ax=="opacity"&&ay.currentStyle){aw=E.test(ay.currentStyle.filter||"")?(parseFloat(RegExp.$1)/100)+"":"";return aw===""?"1":aw}if(K){var S=K(ay,null);if(S){aw=S[ax]}if(ax=="opacity"&&aw==""){aw="1"}}else{aw=ay.currentStyle[ax]}return aw}})();g.appendHTML=function(S,K){if(S.insertAdjacentHTML){S.insertAdjacentHTML("BeforeEnd",K)}else{if(S.lastChild){var E=S.ownerDocument.createRange();E.setStartAfter(S.lastChild);var aw=E.createContextualFragment(K);S.appendChild(aw)}else{S.innerHTML=K}}};g.getWindowSize=function(E){if(document.compatMode==="CSS1Compat"){return document.documentElement["client"+E]}return document.body["client"+E]};g.setOpacity=function(S,E){var K=S.style;if(am){K.opacity=(E==1?"":E)}else{K.zoom=1;if(E==1){if(typeof K.filter=="string"&&(/alpha/i).test(K.filter)){K.filter=K.filter.replace(/\s*[\w\.]*alpha\([^\)]*\);?/gi,"")}}else{K.filter=(K.filter||"").replace(/\s*[\w\.]*alpha\([^\)]*\)/gi,"")+" alpha(opacity="+(E*100)+")"}}};g.clearOpacity=function(E){g.setOpacity(E,1)};var p=Event;function D(E){return p.element(E)}function T(E){return[p.pointerX(E),p.pointerY(E)]}function I(E){p.stop(E)}function l(E){return E.keyCode}function j(S,K,E){p.observe(S,K,E)}function a(S,K,E){p.stopObserving(S,K,E)}var F=false,P;if(document.addEventListener){P=function(){document.removeEventListener("DOMContentLoaded",P,false);g.load()}}else{if(document.attachEvent){P=function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",P);g.load()}}}}function i(){if(F){return}try{document.documentElement.doScroll("left")}catch(E){setTimeout(i,1);return}g.load()}function at(){if(document.readyState==="complete"){return g.load()}if(document.addEventListener){document.addEventListener("DOMContentLoaded",P,false);V.addEventListener("load",g.load,false)}else{if(document.attachEvent){document.attachEvent("onreadystatechange",P);V.attachEvent("onload",g.load);var E=false;try{E=V.frameElement===null}catch(K){}if(document.documentElement.doScroll&&E){i()}}}}g.load=function(){if(F){return}if(!document.body){return setTimeout(g.load,13)}F=true;ap();g.onReady();if(!g.options.skipSetup){g.setup()}g.skin.init()};g.plugins={};if(navigator.plugins&&navigator.plugins.length){var ao=[];ae(navigator.plugins,function(E,K){ao.push(K.name)});ao=ao.join(",");var d=ao.indexOf("Flip4Mac")>-1;g.plugins={fla:ao.indexOf("Shockwave Flash")>-1,qt:ao.indexOf("QuickTime")>-1,wmp:!d&&ao.indexOf("Windows Media")>-1,f4m:d}}else{var C=function(E){var K;try{K=new ActiveXObject(E)}catch(S){}return !!K};g.plugins={fla:C("ShockwaveFlash.ShockwaveFlash"),qt:C("QuickTime.QuickTime"),wmp:C("wmplayer.ocx"),f4m:false}}var c=/^(light|shadow)box/i,ab="shadowboxCacheKey",h=1;g.cache={};g.select=function(K){var S=[];if(!K){var E;ae(document.getElementsByTagName("a"),function(ay,az){E=az.getAttribute("rel");if(E&&c.test(E)){S.push(az)}})}else{var ax=K.length;if(ax){if(typeof K=="string"){if(g.find){S=g.find(K)}}else{if(ax==2&&typeof K[0]=="string"&&K[1].nodeType){if(g.find){S=g.find(K[0],K[1])}}else{for(var aw=0;aw<ax;++aw){S[aw]=K[aw]}}}}else{S.push(K)}}return S};g.setup=function(E,K){ae(g.select(E),function(S,aw){g.addCache(aw,K)})};g.teardown=function(E){ae(g.select(E),function(K,S){g.removeCache(S)})};g.addCache=function(S,E){var K=S[ab];if(K==q){K=h++;S[ab]=K;j(S,"click",b)}g.cache[K]=g.makeObject(S,E)};g.removeCache=function(E){a(E,"click",b);delete g.cache[E[ab]];E[ab]=null};g.getCache=function(K){var E=K[ab];return(E in g.cache&&g.cache[E])};g.clearCache=function(){for(var E in g.cache){g.removeCache(g.cache[E].link)}g.cache={}};function b(E){g.open(this);if(g.gallery.length){I(E)}}g.lang={code:"en",of:"of",loading:"loading",cancel:"Cancel",next:"Next",previous:"Previous",play:"Play",pause:"Pause",close:"Close",errors:{single:'You must install the <a href="{0}">{1}</a> browser plugin to view this content.',shared:'You must install both the <a href="{0}">{1}</a> and <a href="{2}">{3}</a> browser plugins to view this content.',either:'You must install either the <a href="{0}">{1}</a> or the <a href="{2}">{3}</a> browser plugin to view this content.'}};g.html=function(E,K){this.obj=E;this.id=K;this.height=E.height?parseInt(E.height,10):300;this.width=E.width?parseInt(E.width,10):500};g.html.prototype={append:function(E,K){var S=document.createElement("div");S.id=this.id;S.className="html";S.innerHTML=this.obj.content;E.appendChild(S)},remove:function(){var E=ai(this.id);if(E){A(E)}}};var an=false,B=[],J=["sb-nav-close","sb-nav-next","sb-nav-play","sb-nav-pause","sb-nav-previous"],H,aj,w,R=true;function ag(S,aF,aC,aA,aG){var E=(aF=="opacity"),aB=E?g.setOpacity:function(aH,aI){aH.style[aF]=""+aI+"px"};if(aA==0||(!E&&!g.options.animate)||(E&&!g.options.animateFade)){aB(S,aC);if(aG){aG()}return}var aD=parseFloat(g.getStyle(S,aF))||0;var aE=aC-aD;if(aE==0){if(aG){aG()}return}aA*=1000;var aw=Z(),az=g.ease,ay=aw+aA,ax;var K=setInterval(function(){ax=Z();if(ax>=ay){clearInterval(K);K=null;aB(S,aC);if(aG){aG()}}else{aB(S,aD+az((ax-aw)/aA)*aE)}},10)}function L(){H.style.height=g.getWindowSize("Height")+"px";H.style.width=g.getWindowSize("Width")+"px"}function af(){H.style.top=document.documentElement.scrollTop+"px";H.style.left=document.documentElement.scrollLeft+"px"}function z(E){if(E){ae(B,function(K,S){S[0].style.visibility=S[1]||""})}else{B=[];ae(g.options.troubleElements,function(S,K){ae(document.getElementsByTagName(K),function(aw,ax){B.push([ax,ax.style.visibility]);ax.style.visibility="hidden"})})}}function y(S,E){var K=ai("sb-nav-"+S);if(K){K.style.display=E?"":"none"}}function n(E,ay){var ax=ai("sb-loading"),S=g.getCurrent().player,aw=(S=="img"||S=="html");if(E){g.setOpacity(ax,0);ax.style.display="block";var K=function(){g.clearOpacity(ax);if(ay){ay()}};if(aw){ag(ax,"opacity",1,g.options.fadeDuration,K)}else{K()}}else{var K=function(){ax.style.display="none";g.clearOpacity(ax);if(ay){ay()}};if(aw){ag(ax,"opacity",0,g.options.fadeDuration,K)}else{K()}}}function av(aD){var ay=g.getCurrent();ai("sb-title-inner").innerHTML=ay.title||"";var aE,aA,K,aF,aB;if(g.options.displayNav){aE=true;var aC=g.gallery.length;if(aC>1){if(g.options.continuous){aA=aB=true}else{aA=(aC-1)>g.current;aB=g.current>0}}if(g.options.slideshowDelay>0&&g.hasNext()){aF=!g.isPaused();K=!aF}}else{aE=aA=K=aF=aB=false}y("close",aE);y("next",aA);y("play",K);y("pause",aF);y("previous",aB);var E="";if(g.options.displayCounter&&g.gallery.length>1){var aC=g.gallery.length;if(g.options.counterType=="skip"){var ax=0,aw=aC,S=parseInt(g.options.counterLimit)||0;if(S<aC&&S>2){var az=Math.floor(S/2);ax=g.current-az;if(ax<0){ax+=aC}aw=g.current+(S-az);if(aw>aC){aw-=aC}}while(ax!=aw){if(ax==aC){ax=0}E+='<a onclick="Shadowbox.change('+ax+');"';if(ax==g.current){E+=' class="sb-counter-current"'}E+=">"+(++ax)+"</a>"}}else{E=[g.current+1,g.lang.of,aC].join(" ")}}ai("sb-counter").innerHTML=E;aD()}function v(aw){var E=ai("sb-title-inner"),S=ai("sb-info-inner"),K=0.35;E.style.visibility=S.style.visibility="";if(E.innerHTML!=""){ag(E,"marginTop",0,K)}ag(S,"marginTop",0,K,aw)}function ad(S,aB){var az=ai("sb-title"),E=ai("sb-info"),aw=az.offsetHeight,ax=E.offsetHeight,ay=ai("sb-title-inner"),aA=ai("sb-info-inner"),K=(S?0.35:0);ag(ay,"marginTop",aw,K);ag(aA,"marginTop",ax*-1,K,function(){ay.style.visibility=aA.style.visibility="hidden";aB()})}function G(E,aw,K,ay){var ax=ai("sb-wrapper-inner"),S=(K?g.options.resizeDuration:0);ag(w,"top",aw,S);ag(ax,"height",E,S,ay)}function u(E,aw,K,ax){var S=(K?g.options.resizeDuration:0);ag(w,"left",aw,S);ag(w,"width",E,S,ax)}function U(aB,S){var ax=ai("sb-body-inner"),aB=parseInt(aB),S=parseInt(S),K=w.offsetHeight-ax.offsetHeight,E=w.offsetWidth-ax.offsetWidth,az=aj.offsetHeight,aA=aj.offsetWidth,ay=parseInt(g.options.viewportPadding)||20,aw=(g.player&&g.options.handleOversize!="drag");return g.setDimensions(aB,S,az,aA,K,E,ay,aw)}var k={};k.markup='<div id="sb-container"><div id="sb-overlay"></div><div id="sb-wrapper"><div id="sb-title"><div id="sb-title-inner"></div></div><div id="sb-wrapper-inner"><div id="sb-body"><div id="sb-body-inner"></div><div id="sb-loading"><div id="sb-loading-inner"><span>{loading}</span></div></div></div></div><div id="sb-info"><div id="sb-info-inner"><div id="sb-counter"></div><div id="sb-nav"><a id="sb-nav-close" title="{close}" onclick="Shadowbox.close()"></a><a id="sb-nav-next" title="{next}" onclick="Shadowbox.next()"></a><a id="sb-nav-play" title="{play}" onclick="Shadowbox.play()"></a><a id="sb-nav-pause" title="{pause}" onclick="Shadowbox.pause()"></a><a id="sb-nav-previous" title="{previous}" onclick="Shadowbox.previous()"></a></div></div></div></div></div>';k.options={animSequence:"sync",counterLimit:10,counterType:"default",displayCounter:true,displayNav:true,fadeDuration:0.35,initialHeight:160,initialWidth:320,modal:false,overlayColor:"#000",overlayOpacity:0.5,resizeDuration:0.35,showOverlay:true,troubleElements:["select","object","embed","canvas"]};k.init=function(){g.appendHTML(document.body,t(k.markup,g.lang));k.body=ai("sb-body-inner");H=ai("sb-container");aj=ai("sb-overlay");w=ai("sb-wrapper");if(!N){H.style.position="absolute"}if(!am){var S,E,K=/url\("(.*\.png)"\)/;ae(J,function(ax,ay){S=ai(ay);if(S){E=g.getStyle(S,"backgroundImage").match(K);if(E){S.style.backgroundImage="none";S.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,src="+E[1]+",sizingMethod=scale);"}}})}var aw;j(V,"resize",function(){if(aw){clearTimeout(aw);aw=null}if(x){aw=setTimeout(k.onWindowResize,10)}})};k.onOpen=function(E,S){R=false;H.style.display="block";L();var K=U(g.options.initialHeight,g.options.initialWidth);G(K.innerHeight,K.top);u(K.width,K.left);if(g.options.showOverlay){aj.style.backgroundColor=g.options.overlayColor;g.setOpacity(aj,0);if(!g.options.modal){j(aj,"click",g.close)}an=true}if(!N){af();j(V,"scroll",af)}z();H.style.visibility="visible";if(an){ag(aj,"opacity",g.options.overlayOpacity,g.options.fadeDuration,S)}else{S()}};k.onLoad=function(K,E){n(true);while(k.body.firstChild){A(k.body.firstChild)}ad(K,function(){if(!x){return}if(!K){w.style.visibility="visible"}av(E)})};k.onReady=function(aw){if(!x){return}var K=g.player,S=U(K.height,K.width);var E=function(){v(aw)};switch(g.options.animSequence){case"hw":G(S.innerHeight,S.top,true,function(){u(S.width,S.left,true,E)});break;case"wh":u(S.width,S.left,true,function(){G(S.innerHeight,S.top,true,E)});break;default:u(S.width,S.left,true);G(S.innerHeight,S.top,true,E)}};k.onShow=function(E){n(false,E);R=true};k.onClose=function(){if(!N){a(V,"scroll",af)}a(aj,"click",g.close);w.style.visibility="hidden";var E=function(){H.style.visibility="hidden";H.style.display="none";z(true)};if(an){ag(aj,"opacity",0,g.options.fadeDuration,E)}else{E()}};k.onPlay=function(){y("play",false);y("pause",true)};k.onPause=function(){y("pause",false);y("play",true)};k.onWindowResize=function(){if(!R){return}L();var E=g.player,K=U(E.height,E.width);u(K.width,K.left);G(K.innerHeight,K.top);if(E.onWindowResize){E.onWindowResize()}};g.skin=k;V.Shadowbox=g})(window);