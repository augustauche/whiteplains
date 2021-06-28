/**
 * Isotope v1.5.25
 * An exquisite jQuery plugin for magical layouts
 * http://isotope.metafizzy.co
 *
 * Commercial use requires one-time purchase of a commercial license
 * http://isotope.metafizzy.co/docs/license.html
 *
 * Non-commercial use is licensed under the MIT License
 *
 * Copyright 2013 Metafizzy
 */
(function(window,$,undefined){'use strict';var document=window.document;var Modernizr=window.Modernizr;var capitalize=function(str){return str.charAt(0).toUpperCase()+str.slice(1)};var prefixes='Moz Webkit O Ms'.split(' ');var getStyleProperty=function(propName){var style=document.documentElement.style,prefixed;if(typeof style[propName]==='string'){return propName}propName=capitalize(propName);for(var i=0,len=prefixes.length;i<len;i++){prefixed=prefixes[i]+propName;if(typeof style[prefixed]==='string'){return prefixed}}};var transformProp=getStyleProperty('transform'),transitionProp=getStyleProperty('transitionProperty');var tests={csstransforms:function(){return!!transformProp},csstransforms3d:function(){var test=!!getStyleProperty('perspective');if(test){var vendorCSSPrefixes=' -o- -moz- -ms- -webkit- -khtml- '.split(' '),mediaQuery='@media ('+vendorCSSPrefixes.join('transform-3d),(')+'modernizr)',$style=$('<style>'+mediaQuery+'{#modernizr{height:3px}}</style>').appendTo('head'),$div=$('<div id="modernizr" />').appendTo('html');test=$div.height()===3;$div.remove();$style.remove()}return test},csstransitions:function(){return!!transitionProp}};var testName;if(Modernizr){for(testName in tests){if(!Modernizr.hasOwnProperty(testName)){Modernizr.addTest(testName,tests[testName])}}}else{Modernizr=window.Modernizr={_version:'1.6ish: miniModernizr for Isotope'};var classes=' ';var result;for(testName in tests){result=tests[testName]();Modernizr[testName]=result;classes+=' '+(result?'':'no-')+testName}$('html').addClass(classes)}if(Modernizr.csstransforms){var transformFnNotations=Modernizr.csstransforms3d?{translate:function(position){return'translate3d('+position[0]+'px, '+position[1]+'px, 0) '},scale:function(scale){return'scale3d('+scale+', '+scale+', 1) '}}:{translate:function(position){return'translate('+position[0]+'px, '+position[1]+'px) '},scale:function(scale){return'scale('+scale+') '}};var setIsoTransform=function(elem,name,value){var data=$.data(elem,'isoTransform')||{},newData={},fnName,transformObj={},transformValue;newData[name]=value;$.extend(data,newData);for(fnName in data){transformValue=data[fnName];transformObj[fnName]=transformFnNotations[fnName](transformValue)}var translateFn=transformObj.translate||'',scaleFn=transformObj.scale||'',valueFns=translateFn+scaleFn;$.data(elem,'isoTransform',data);elem.style[transformProp]=valueFns};$.cssNumber.scale=true;$.cssHooks.scale={set:function(elem,value){setIsoTransform(elem,'scale',value)},get:function(elem,computed){var transform=$.data(elem,'isoTransform');return transform&&transform.scale?transform.scale:1}};$.fx.step.scale=function(fx){$.cssHooks.scale.set(fx.elem,fx.now+fx.unit)};$.cssNumber.translate=true;$.cssHooks.translate={set:function(elem,value){setIsoTransform(elem,'translate',value)},get:function(elem,computed){var transform=$.data(elem,'isoTransform');return transform&&transform.translate?transform.translate:[0,0]}}}var transitionEndEvent,transitionDurProp;if(Modernizr.csstransitions){transitionEndEvent={WebkitTransitionProperty:'webkitTransitionEnd',MozTransitionProperty:'transitionend',OTransitionProperty:'oTransitionEnd otransitionend',transitionProperty:'transitionend'}[transitionProp];transitionDurProp=getStyleProperty('transitionDuration')}var $event=$.event,dispatchMethod=$.event.handle?'handle':'dispatch',resizeTimeout;$event.special.smartresize={setup:function(){$(this).bind("resize",$event.special.smartresize.handler)},teardown:function(){$(this).unbind("resize",$event.special.smartresize.handler)},handler:function(event,execAsap){var context=this,args=arguments;event.type="smartresize";if(resizeTimeout){clearTimeout(resizeTimeout)}resizeTimeout=setTimeout(function(){$event[dispatchMethod].apply(context,args)},execAsap==="execAsap"?0:100)}};$.fn.smartresize=function(fn){return fn?this.bind("smartresize",fn):this.trigger("smartresize",["execAsap"])};$.Isotope=function(options,element,callback){this.element=$(element);this._create(options);this._init(callback)};var isoContainerStyles=['width','height'];var $window=$(window);$.Isotope.settings={resizable:true,layoutMode:'masonry',containerClass:'isotope',itemClass:'isotope-item',hiddenClass:'isotope-hidden',hiddenStyle:{opacity:0,scale:0.001},visibleStyle:{opacity:1,scale:1},containerStyle:{position:'relative',overflow:'hidden'},animationEngine:'best-available',animationOptions:{queue:false,duration:800},sortBy:'original-order',sortAscending:true,resizesContainer:true,transformsEnabled:true,itemPositionDataEnabled:false};$.Isotope.prototype={_create:function(options){this.options=$.extend({},$.Isotope.settings,options);this.styleQueue=[];this.elemCount=0;var elemStyle=this.element[0].style;this.originalStyle={};var containerStyles=isoContainerStyles.slice(0);for(var prop in this.options.containerStyle){containerStyles.push(prop)}for(var i=0,len=containerStyles.length;i<len;i++){prop=containerStyles[i];this.originalStyle[prop]=elemStyle[prop]||''}this.element.css(this.options.containerStyle);this._updateAnimationEngine();this._updateUsingTransforms();var originalOrderSorter={'original-order':function($elem,instance){instance.elemCount++;return instance.elemCount},random:function(){return Math.random()}};this.options.getSortData=$.extend(this.options.getSortData,originalOrderSorter);this.reloadItems();this.offset={left:parseInt((this.element.css('padding-left')||0),10),top:parseInt((this.element.css('padding-top')||0),10)};var instance=this;setTimeout(function(){instance.element.addClass(instance.options.containerClass)},0);if(this.options.resizable){$window.bind('smartresize.isotope',function(){instance.resize()})}this.element.delegate('.'+this.options.hiddenClass,'click',function(){return false})},_getAtoms:function($elems){var selector=this.options.itemSelector,$atoms=selector?$elems.filter(selector).add($elems.find(selector)):$elems,atomStyle={position:'absolute'};$atoms=$atoms.filter(function(i,atom){return atom.nodeType===1});if(this.usingTransforms){atomStyle.left=0;atomStyle.top=0}$atoms.css(atomStyle).addClass(this.options.itemClass);this.updateSortData($atoms,true);return $atoms},_init:function(callback){this.$filteredAtoms=this._filter(this.$allAtoms);this._sort();this.reLayout(callback)},option:function(opts){if($.isPlainObject(opts)){this.options=$.extend(true,this.options,opts);var updateOptionFn;for(var optionName in opts){updateOptionFn='_update'+capitalize(optionName);if(this[updateOptionFn]){this[updateOptionFn]()}}}},_updateAnimationEngine:function(){var animationEngine=this.options.animationEngine.toLowerCase().replace(/[ _\-]/g,'');var isUsingJQueryAnimation;switch(animationEngine){case'css':case'none':isUsingJQueryAnimation=false;break;case'jquery':isUsingJQueryAnimation=true;break;default:isUsingJQueryAnimation=!Modernizr.csstransitions}this.isUsingJQueryAnimation=isUsingJQueryAnimation;this._updateUsingTransforms()},_updateTransformsEnabled:function(){this._updateUsingTransforms()},_updateUsingTransforms:function(){var usingTransforms=this.usingTransforms=this.options.transformsEnabled&&Modernizr.csstransforms&&Modernizr.csstransitions&&!this.isUsingJQueryAnimation;if(!usingTransforms){delete this.options.hiddenStyle.scale;delete this.options.visibleStyle.scale}this.getPositionStyles=usingTransforms?this._translate:this._positionAbs},_filter:function($atoms){var filter=this.options.filter===''?'*':this.options.filter;if(!filter){return $atoms}var hiddenClass=this.options.hiddenClass,hiddenSelector='.'+hiddenClass,$hiddenAtoms=$atoms.filter(hiddenSelector),$atomsToShow=$hiddenAtoms;if(filter!=='*'){$atomsToShow=$hiddenAtoms.filter(filter);var $atomsToHide=$atoms.not(hiddenSelector).not(filter).addClass(hiddenClass);this.styleQueue.push({$el:$atomsToHide,style:this.options.hiddenStyle})}this.styleQueue.push({$el:$atomsToShow,style:this.options.visibleStyle});$atomsToShow.removeClass(hiddenClass);return $atoms.filter(filter)},updateSortData:function($atoms,isIncrementingElemCount){var instance=this,getSortData=this.options.getSortData,$this,sortData;$atoms.each(function(){$this=$(this);sortData={};for(var key in getSortData){if(!isIncrementingElemCount&&key==='original-order'){sortData[key]=$.data(this,'isotope-sort-data')[key]}else{sortData[key]=getSortData[key]($this,instance)}}$.data(this,'isotope-sort-data',sortData)})},_sort:function(){var sortBy=this.options.sortBy,getSorter=this._getSorter,sortDir=this.options.sortAscending?1:-1,sortFn=function(alpha,beta){var a=getSorter(alpha,sortBy),b=getSorter(beta,sortBy);if(a===b&&sortBy!=='original-order'){a=getSorter(alpha,'original-order');b=getSorter(beta,'original-order')}return((a>b)?1:(a<b)?-1:0)*sortDir};this.$filteredAtoms.sort(sortFn)},_getSorter:function(elem,sortBy){return $.data(elem,'isotope-sort-data')[sortBy]},_translate:function(x,y){return{translate:[x,y]}},_positionAbs:function(x,y){return{left:x,top:y}},_pushPosition:function($elem,x,y){x=Math.round(x+this.offset.left);y=Math.round(y+this.offset.top);var position=this.getPositionStyles(x,y);this.styleQueue.push({$el:$elem,style:position});if(this.options.itemPositionDataEnabled){$elem.data('isotope-item-position',{x:x,y:y})}},layout:function($elems,callback){var layoutMode=this.options.layoutMode;this['_'+layoutMode+'Layout']($elems);if(this.options.resizesContainer){var containerStyle=this['_'+layoutMode+'GetContainerSize']();this.styleQueue.push({$el:this.element,style:containerStyle})}this._processStyleQueue($elems,callback);this.isLaidOut=true},_processStyleQueue:function($elems,callback){var styleFn=!this.isLaidOut?'css':(this.isUsingJQueryAnimation?'animate':'css'),animOpts=this.options.animationOptions,onLayout=this.options.onLayout,objStyleFn,processor,triggerCallbackNow,callbackFn;processor=function(i,obj){obj.$el[styleFn](obj.style,animOpts)};if(this._isInserting&&this.isUsingJQueryAnimation){processor=function(i,obj){objStyleFn=obj.$el.hasClass('no-transition')?'css':styleFn;obj.$el[objStyleFn](obj.style,animOpts)}}else if(callback||onLayout||animOpts.complete){var isCallbackTriggered=false,callbacks=[callback,onLayout,animOpts.complete],instance=this;triggerCallbackNow=true;callbackFn=function(){if(isCallbackTriggered){return}var hollaback;for(var i=0,len=callbacks.length;i<len;i++){hollaback=callbacks[i];if(typeof hollaback==='function'){hollaback.call(instance.element,$elems,instance)}}isCallbackTriggered=true};if(this.isUsingJQueryAnimation&&styleFn==='animate'){animOpts.complete=callbackFn;triggerCallbackNow=false}else if(Modernizr.csstransitions){var i=0,firstItem=this.styleQueue[0],testElem=firstItem&&firstItem.$el,styleObj;while(!testElem||!testElem.length){styleObj=this.styleQueue[i++];if(!styleObj){return}testElem=styleObj.$el}var duration=parseFloat(getComputedStyle(testElem[0])[transitionDurProp]);if(duration>0){processor=function(i,obj){obj.$el[styleFn](obj.style,animOpts).one(transitionEndEvent,callbackFn)};triggerCallbackNow=false}}}$.each(this.styleQueue,processor);if(triggerCallbackNow){callbackFn()}this.styleQueue=[]},resize:function(){if(this['_'+this.options.layoutMode+'ResizeChanged']()){this.reLayout()}},reLayout:function(callback){this['_'+this.options.layoutMode+'Reset']();this.layout(this.$filteredAtoms,callback)},addItems:function($content,callback){var $newAtoms=this._getAtoms($content);this.$allAtoms=this.$allAtoms.add($newAtoms);if(callback){callback($newAtoms)}},insert:function($content,callback){this.element.append($content);var instance=this;this.addItems($content,function($newAtoms){var $newFilteredAtoms=instance._filter($newAtoms);instance._addHideAppended($newFilteredAtoms);instance._sort();instance.reLayout();instance._revealAppended($newFilteredAtoms,callback)})},appended:function($content,callback){var instance=this;this.addItems($content,function($newAtoms){instance._addHideAppended($newAtoms);instance.layout($newAtoms);instance._revealAppended($newAtoms,callback)})},_addHideAppended:function($newAtoms){this.$filteredAtoms=this.$filteredAtoms.add($newAtoms);$newAtoms.addClass('no-transition');this._isInserting=true;this.styleQueue.push({$el:$newAtoms,style:this.options.hiddenStyle})},_revealAppended:function($newAtoms,callback){var instance=this;setTimeout(function(){$newAtoms.removeClass('no-transition');instance.styleQueue.push({$el:$newAtoms,style:instance.options.visibleStyle});instance._isInserting=false;instance._processStyleQueue($newAtoms,callback)},10)},reloadItems:function(){this.$allAtoms=this._getAtoms(this.element.children())},remove:function($content,callback){this.$allAtoms=this.$allAtoms.not($content);this.$filteredAtoms=this.$filteredAtoms.not($content);var instance=this;var removeContent=function(){$content.remove();if(callback){callback.call(instance.element)}};if($content.filter(':not(.'+this.options.hiddenClass+')').length){this.styleQueue.push({$el:$content,style:this.options.hiddenStyle});this._sort();this.reLayout(removeContent)}else{removeContent()}},shuffle:function(callback){this.updateSortData(this.$allAtoms);this.options.sortBy='random';this._sort();this.reLayout(callback)},destroy:function(){var usingTransforms=this.usingTransforms;var options=this.options;this.$allAtoms.removeClass(options.hiddenClass+' '+options.itemClass).each(function(){var style=this.style;style.position='';style.top='';style.left='';style.opacity='';if(usingTransforms){style[transformProp]=''}});var elemStyle=this.element[0].style;for(var prop in this.originalStyle){elemStyle[prop]=this.originalStyle[prop]}this.element.unbind('.isotope').undelegate('.'+options.hiddenClass,'click').removeClass(options.containerClass).removeData('isotope');$window.unbind('.isotope')},_getSegments:function(isRows){var namespace=this.options.layoutMode,measure=isRows?'rowHeight':'columnWidth',size=isRows?'height':'width',segmentsName=isRows?'rows':'cols',containerSize=this.element[size](),segments,segmentSize=this.options[namespace]&&this.options[namespace][measure]||this.$filteredAtoms['outer'+capitalize(size)](true)||containerSize;segments=Math.floor(containerSize/segmentSize);segments=Math.max(segments,1);this[namespace][segmentsName]=segments;this[namespace][measure]=segmentSize},_checkIfSegmentsChanged:function(isRows){var namespace=this.options.layoutMode,segmentsName=isRows?'rows':'cols',prevSegments=this[namespace][segmentsName];this._getSegments(isRows);return(this[namespace][segmentsName]!==prevSegments)},_masonryReset:function(){this.masonry={};this._getSegments();var i=this.masonry.cols;this.masonry.colYs=[];while(i--){this.masonry.colYs.push(0)}},_masonryLayout:function($elems){var instance=this,props=instance.masonry;$elems.each(function(){var $this=$(this),colSpan=Math.ceil($this.outerWidth(true)/props.columnWidth);colSpan=Math.min(colSpan,props.cols);if(colSpan===1){instance._masonryPlaceBrick($this,props.colYs)}else{var groupCount=props.cols+1-colSpan,groupY=[],groupColY,i;for(i=0;i<groupCount;i++){groupColY=props.colYs.slice(i,i+colSpan);groupY[i]=Math.max.apply(Math,groupColY)}instance._masonryPlaceBrick($this,groupY)}})},_masonryPlaceBrick:function($brick,setY){var minimumY=Math.min.apply(Math,setY),shortCol=0;for(var i=0,len=setY.length;i<len;i++){if(setY[i]===minimumY){shortCol=i;break}}var x=this.masonry.columnWidth*shortCol,y=minimumY;this._pushPosition($brick,x,y);var setHeight=minimumY+$brick.outerHeight(true),setSpan=this.masonry.cols+1-len;for(i=0;i<setSpan;i++){this.masonry.colYs[shortCol+i]=setHeight}},_masonryGetContainerSize:function(){var containerHeight=Math.max.apply(Math,this.masonry.colYs);return{height:containerHeight}},_masonryResizeChanged:function(){return this._checkIfSegmentsChanged()},_fitRowsReset:function(){this.fitRows={x:0,y:0,height:0}},_fitRowsLayout:function($elems){var instance=this,containerWidth=this.element.width(),props=this.fitRows;$elems.each(function(){var $this=$(this),atomW=$this.outerWidth(true),atomH=$this.outerHeight(true);if(props.x!==0&&atomW+props.x>containerWidth){props.x=0;props.y=props.height}instance._pushPosition($this,props.x,props.y);props.height=Math.max(props.y+atomH,props.height);props.x+=atomW})},_fitRowsGetContainerSize:function(){return{height:this.fitRows.height}},_fitRowsResizeChanged:function(){return true},_cellsByRowReset:function(){this.cellsByRow={index:0};this._getSegments();this._getSegments(true)},_cellsByRowLayout:function($elems){var instance=this,props=this.cellsByRow;$elems.each(function(){var $this=$(this),col=props.index%props.cols,row=Math.floor(props.index/props.cols),x=(col+0.5)*props.columnWidth-$this.outerWidth(true)/2,y=(row+0.5)*props.rowHeight-$this.outerHeight(true)/2;instance._pushPosition($this,x,y);props.index++})},_cellsByRowGetContainerSize:function(){return{height:Math.ceil(this.$filteredAtoms.length/this.cellsByRow.cols)*this.cellsByRow.rowHeight+this.offset.top}},_cellsByRowResizeChanged:function(){return this._checkIfSegmentsChanged()},_straightDownReset:function(){this.straightDown={y:0}},_straightDownLayout:function($elems){var instance=this;$elems.each(function(i){var $this=$(this);instance._pushPosition($this,0,instance.straightDown.y);instance.straightDown.y+=$this.outerHeight(true)})},_straightDownGetContainerSize:function(){return{height:this.straightDown.y}},_straightDownResizeChanged:function(){return true},_masonryHorizontalReset:function(){this.masonryHorizontal={};this._getSegments(true);var i=this.masonryHorizontal.rows;this.masonryHorizontal.rowXs=[];while(i--){this.masonryHorizontal.rowXs.push(0)}},_masonryHorizontalLayout:function($elems){var instance=this,props=instance.masonryHorizontal;$elems.each(function(){var $this=$(this),rowSpan=Math.ceil($this.outerHeight(true)/props.rowHeight);rowSpan=Math.min(rowSpan,props.rows);if(rowSpan===1){instance._masonryHorizontalPlaceBrick($this,props.rowXs)}else{var groupCount=props.rows+1-rowSpan,groupX=[],groupRowX,i;for(i=0;i<groupCount;i++){groupRowX=props.rowXs.slice(i,i+rowSpan);groupX[i]=Math.max.apply(Math,groupRowX)}instance._masonryHorizontalPlaceBrick($this,groupX)}})},_masonryHorizontalPlaceBrick:function($brick,setX){var minimumX=Math.min.apply(Math,setX),smallRow=0;for(var i=0,len=setX.length;i<len;i++){if(setX[i]===minimumX){smallRow=i;break}}var x=minimumX,y=this.masonryHorizontal.rowHeight*smallRow;this._pushPosition($brick,x,y);var setWidth=minimumX+$brick.outerWidth(true),setSpan=this.masonryHorizontal.rows+1-len;for(i=0;i<setSpan;i++){this.masonryHorizontal.rowXs[smallRow+i]=setWidth}},_masonryHorizontalGetContainerSize:function(){var containerWidth=Math.max.apply(Math,this.masonryHorizontal.rowXs);return{width:containerWidth}},_masonryHorizontalResizeChanged:function(){return this._checkIfSegmentsChanged(true)},_fitColumnsReset:function(){this.fitColumns={x:0,y:0,width:0}},_fitColumnsLayout:function($elems){var instance=this,containerHeight=this.element.height(),props=this.fitColumns;$elems.each(function(){var $this=$(this),atomW=$this.outerWidth(true),atomH=$this.outerHeight(true);if(props.y!==0&&atomH+props.y>containerHeight){props.x=props.width;props.y=0}instance._pushPosition($this,props.x,props.y);props.width=Math.max(props.x+atomW,props.width);props.y+=atomH})},_fitColumnsGetContainerSize:function(){return{width:this.fitColumns.width}},_fitColumnsResizeChanged:function(){return true},_cellsByColumnReset:function(){this.cellsByColumn={index:0};this._getSegments();this._getSegments(true)},_cellsByColumnLayout:function($elems){var instance=this,props=this.cellsByColumn;$elems.each(function(){var $this=$(this),col=Math.floor(props.index/props.rows),row=props.index%props.rows,x=(col+0.5)*props.columnWidth-$this.outerWidth(true)/2,y=(row+0.5)*props.rowHeight-$this.outerHeight(true)/2;instance._pushPosition($this,x,y);props.index++})},_cellsByColumnGetContainerSize:function(){return{width:Math.ceil(this.$filteredAtoms.length/this.cellsByColumn.rows)*this.cellsByColumn.columnWidth}},_cellsByColumnResizeChanged:function(){return this._checkIfSegmentsChanged(true)},_straightAcrossReset:function(){this.straightAcross={x:0}},_straightAcrossLayout:function($elems){var instance=this;$elems.each(function(i){var $this=$(this);instance._pushPosition($this,instance.straightAcross.x,0);instance.straightAcross.x+=$this.outerWidth(true)})},_straightAcrossGetContainerSize:function(){return{width:this.straightAcross.x}},_straightAcrossResizeChanged:function(){return true}};$.fn.getOutOfHere=function(callback){var $this=this,$images=$this.find('img').add($this.filter('img')),len=$images.length,blank='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==',loaded=[];function triggerCallback(){callback.call($this,$images)}function imgLoaded(event){var img=event.target;if(img.src!==blank&&$.inArray(img,loaded)===-1){loaded.push(img);if(--len<=0){setTimeout(triggerCallback);$images.unbind('.imagesLoaded',imgLoaded)}}}if(!len){triggerCallback()}$images.bind('load.imagesLoaded error.imagesLoaded',imgLoaded).each(function(){var src=this.src;this.src=blank;this.src=src});return $this};var logError=function(message){if(window.console){window.console.error(message)}};$.fn.isotope=function(options,callback){if(typeof options==='string'){var args=Array.prototype.slice.call(arguments,1);this.each(function(){var instance=$.data(this,'isotope');if(!instance){logError("cannot call methods on isotope prior to initialization; attempted to call method '"+options+"'");return}if(!$.isFunction(instance[options])||options.charAt(0)==="_"){logError("no such method '"+options+"' for isotope instance");return}instance[options].apply(instance,args)})}else{this.each(function(){var instance=$.data(this,'isotope');if(instance){instance.option(options);instance._init(callback)}else{$.data(this,'isotope',new $.Isotope(options,this,callback))}})}return this}})(window,jQuery);









jQuery(document).ready(function() {

//** init isotope
	var ux_ts = new ThemeIsotope;
	ux_ts.init();


});











function ThemeIsotope(){
	var ux_ts = this;
	var theme_win = jQuery(window);
	
	//ts init
	this.init = function(){
		//ThemeIsotope: isotope list double width
		var _isotope_width4 = jQuery('.isotope .width4');
		if(_isotope_width4.length){
			ux_ts.isotopewidth4();
		}
		
		//ThemeIsotope: Portfolio #3D Flip Mouseover IE HACK
		var _container3d = jQuery('.container3d');
		if(_container3d.length){
			if((jQuery.browser.msie == true && parseInt(jQuery.browser.version) < 9)){
				ux_ts.flipcenterie();
				//ux_ts.flipie();
			}
		}
		
		//ThemeIsotope: Run isotope
		$allcontainer = jQuery('.container-fluid.main');
		
		//ThemeIsotope: Call isotope
		var _isotope = jQuery('.isotope');
		if(_isotope.length){
			ux_ts.callisotope();
		}
		
		//ThemeIsotope: isotope filter
		var _filters = jQuery('.filters');
		if(_filters.length){
			ux_ts.isotopefilters();
		}
		
		//win smartresize
		theme_win.smartresize(function(){
			ux_ts.refresh();
		}).resize();
		
		theme_win.load(function(){
			ux_ts.refresh();
		});
	}
	
	this.refresh = function(){
		var _isotope = jQuery('.isotope');
		if(_isotope.length){
			_isotope.each(function(index, element) {
				var _this = jQuery(this),
					image_size = jQuery(this).data('size');
				
				ux_ts.setWidths(image_size, _this);
				_this.isotope({
					masonry: {
						columnWidth: ux_ts.getUnitWidth(image_size, _this)
					}
				});
			})
		}
	}
	
	//ThemeIsotope: isotope list double width
	this.isotopewidth4 = function(){
		var _isotope_width4 = jQuery('.isotope .width4');
		_isotope_width4.each(function(index, element) {
			var width = jQuery(this).find('.fade_wrap').width();
			jQuery(this).find('img').width(width);
		});
	}
	
	//ThemeIsotope: isotope list responsive
	this.getUnitWidth = function(size, container){
		var width;
		switch(size){
			case 'medium':
				if (container.width() <= 320) {
					width = Math.floor(container.width() / 1);
				} else if (container.width() >= 321 && container.width() <= 480) {
					width = Math.floor(container.width() / 1);
				} else if (container.width() >= 481 && container.width() <= 768) {
					width = Math.floor(container.width() / 4);
				} else if (container.width() >= 769 && container.width() <= 979) {
					width = Math.floor(container.width() / 4);
				} else if (container.width() >= 980 && container.width() <= 1200) {
					width = Math.floor(container.width() / 4);
				} else if (container.width() >= 1201 && container.width() <= 1600) {
					width = Math.floor(container.width() / 4);
				} else if (container.width() >= 1601 && container.width() <= 1824) {
					width = Math.floor(container.width() / 10);
				} else if (container.width() >= 1825) {
					width = Math.floor(container.width() / 12);
				}
			break;
			
			case 'large':
				if (container.width() <= 320) {
					width = Math.floor(container.width() / 1);
				} else if (container.width() >= 321 && container.width() <= 480) {
					width = Math.floor(container.width() / 1);
				} else if (container.width() >= 481 && container.width() <= 768) {
					width = Math.floor(container.width() / 4);
				} else if (container.width() >= 769 && container.width() <= 979) {
					width = Math.floor(container.width() / 4);
				} else if (container.width() >= 980 && container.width() <= 1200) {
					width = Math.floor(container.width() / 6);
				} else if (container.width() >= 1201 && container.width() <= 1600) {
					width = Math.floor(container.width() / 6);
				} else if (container.width() >= 1601 && container.width() <= 1824) {
					width = Math.floor(container.width() / 10);
				} else if (container.width() >= 1825) {
					width = Math.floor(container.width() / 12);
				}
			break;
			
			case 'small':
				if (container.width() <= 320) {
					width = Math.floor(container.width() / 1);
				} else if (container.width() >= 321 && container.width() <= 480) {
					width = Math.floor(container.width() / 1);
				} else if (container.width() >= 481 && container.width() <= 768) {
					width = Math.floor(container.width() / 6);
				} else if (container.width() >= 769 && container.width() <= 979) {
					width = Math.floor(container.width() / 8);
				} else if (container.width() >= 980 && container.width() <= 1200) {
					width = Math.floor(container.width() / 12);
				} else if (container.width() >= 1201 && container.width() <= 1600) {
					width = Math.floor(container.width() / 10);
				} else if (container.width() >= 1601 && container.width() <= 1824) {
					width = Math.floor(container.width() / 10);
				} else if (container.width() >= 1825) {
					width = Math.floor(container.width() / 12);
				}
			break;
			
			case 'brick':
				if (container.width() > 1440) {
					width = Math.floor(container.width() / 5);
				} else if (container.width() > 1365) {
					width = Math.floor(container.width() / 5);
				} else if (container.width() > 1279) {
					width = Math.floor(container.width() / 5);
				} else if (container.width() > 1023) {
					width = Math.floor(container.width() / 5);
				} else if (container.width() > 767) {
					width = Math.floor(container.width() / 3);
				} else if (container.width() > 479) {
					width = Math.floor(container.width() / 2);
				} else {
					width = Math.floor(container.width() / 1);
				}
			break;
			
			case 'width-col-5':
				if (container.width() <= 320) {
					width = Math.floor(container.width() / 1);
				} else if (container.width() >= 321 && container.width() <= 480) {
					width = Math.floor(container.width() / 1);
				} else if (container.width() >= 481 && container.width() <= 768) {
					width = Math.floor(container.width() / 2);
				} else if (container.width() >= 769 && container.width() <= 979) {
					width = Math.floor(container.width() / 5);
				} else if (container.width() >= 980 && container.width() <= 1200) {
					width = Math.floor(container.width() / 5);
				} else if (container.width() >= 1201 && container.width() <= 1600) {
					width = Math.floor(container.width() / 5);
				} else if (container.width() >= 1601 && container.width() <= 1824) {
					width = Math.floor(container.width() / 5);
				} else if (container.width() >= 1825) {
					width = Math.floor(container.width() / 5);
				}
			break;
			
			case 'width-col-4':
				if (container.width() <= 320) {
					width = Math.floor(container.width() / 1);
				} else if (container.width() >= 321 && container.width() <= 480) {
					width = Math.floor(container.width() / 1);
				} else if (container.width() >= 481 && container.width() <= 768) {
					width = Math.floor(container.width() / 2);
				} else if (container.width() >= 769 && container.width() <= 979) {
					width = Math.floor(container.width() / 4);
				} else if (container.width() >= 980 && container.width() <= 1200) {
					width = Math.floor(container.width() / 4);
				} else if (container.width() >= 1201 && container.width() <= 1600) {
					width = Math.floor(container.width() / 4);
				} else if (container.width() >= 1601 && container.width() <= 1824) {
					width = Math.floor(container.width() / 4);
				} else if (container.width() >= 1825) {
					width = Math.floor(container.width() / 4);
				}
			break;
			
			case 'width-col-3':
				if (container.width() <= 320) {
					width = Math.floor(container.width() / 1);
				} else if (container.width() >= 321 && container.width() <= 480) {
					width = Math.floor(container.width() / 1);
				} else if (container.width() >= 481 && container.width() <= 768) {
					width = Math.floor(container.width() / 2);
				} else if (container.width() >= 769 && container.width() <= 979) {
					width = Math.floor(container.width() / 3);
				} else if (container.width() >= 980 && container.width() <= 1200) {
					width = Math.floor(container.width() / 3);
				} else if (container.width() >= 1201 && container.width() <= 1600) {
					width = Math.floor(container.width() / 3);
				} else if (container.width() >= 1601 && container.width() <= 1824) {
					width = Math.floor(container.width() / 3);
				} else if (container.width() >= 1825) {
					width = Math.floor(container.width() / 3);
				}
			break;
			
			case 'width-col-2':
				if (container.width() <= 320) {
					width = Math.floor(container.width() / 1);
				} else if (container.width() >= 321 && container.width() <= 480) {
					width = Math.floor(container.width() / 1);
				} else if (container.width() >= 481 && container.width() <= 768) {
					width = Math.floor(container.width() / 2);
				} else if (container.width() >= 769 && container.width() <= 979) {
					width = Math.floor(container.width() / 2);
				} else if (container.width() >= 980 && container.width() <= 1200) {
					width = Math.floor(container.width() / 2);
				} else if (container.width() >= 1201 && container.width() <= 1600) {
					width = Math.floor(container.width() / 2);
				} else if (container.width() >= 1601 && container.width() <= 1824) {
					width = Math.floor(container.width() / 2);
				} else if (container.width() >= 1825) {
					width = Math.floor(container.width() / 2);
				}
			break;
			
			
			
		}
		return width;
	}
	
	this.setWidths = function(size,container){
		var unitWidth = ux_ts.getUnitWidth(size,container) - 0;
		container.children(":not(.width2)").css({
			width: unitWidth
		});
		
		if (container.width() <= 480) {
			container.children(".width2").css({
				width: unitWidth * 1
			});
			container.children(".width4").css({
				width: unitWidth * 2
			});
			container.children(".width6").css({
				width: unitWidth * 2
			});
			container.children(".width8").css({
				width: unitWidth * 2
			});
			
			//brick
			container.children(".width-and-small").css({ width: unitWidth * 1, height: unitWidth * 1 });
			container.children(".width-and-big").css({ width: unitWidth * 1, height: unitWidth * 1 });
			container.children(".width-and-long").css({ width: unitWidth * 1, height: unitWidth / 2 });
			container.children(".width-and-height").css({ width: unitWidth * 1, height: unitWidth * 2 });
		}
		if (container.width() >= 481) {
			container.children(".width8").css({
				width: unitWidth * 8
			});
			container.children(".width6").css({
				width: unitWidth * 6
			});
			container.children(".width4").css({
				width: unitWidth * 4
			});
			container.children(".width2").css({
				width: unitWidth * 2
			});
			container.children(".width-col4").css({
				width: unitWidth * 2
			});
			
			//brick --- thumb small
			container.children(".width-and-small").css({ width: unitWidth * 1, height: unitWidth * 1 });
			container.find(".width-and-small img").css({ width: unitWidth * 1 });
			
			//brick --- thumb big
			container.children(".width-and-big").css({ width: unitWidth * 2, height: unitWidth * 2 });
			container.find(".width-and-big img").css({ width: unitWidth * 2, });
			
			//brick --- thumb long
			container.children(".width-and-long").css({ width: unitWidth * 2, height: unitWidth * 1 });
			container.find(".width-and-long img").css({ width: unitWidth * 2 });
			
			//brick --- thumb height
			container.children(".width-and-height").css({ width: unitWidth * 1, height: unitWidth * 2 });
			container.find(".width-and-height img").css({ width: unitWidth * 1 });
			
			//brick set height
			if(size == 'brick'){
				container.children().each(function(){
					var _this = jQuery(this);
					var _this_height = jQuery(this).height();
					
					if(Math.floor(_this.find('img').height()) < Math.floor(_this_height)){
						_this.find('img').css({
							width: 'auto',
							height: _this_height
						});
					}
				});
			}
			
		} else {
			container.children(".width2").css({
				width: unitWidth
			});
		}
	}
	
	//ThemeIsotope: Call isotope
	this.callisotope = function(){
		var _isotope = jQuery('.isotope');
		
		_isotope.each(function(index, element) {
			var _this = jQuery(this);
			var image_size = _this.data('size');
			
			
			if(image_size != 'brick'){
				ux_ts.setWidths(image_size, _this);
			}
				
			_this.imagesLoaded(function(){
				if(_this.is('.masonry')){
					_this.isotope({
						animationEngine : 'css',
						//resizable: false,
						masonry: {
							columnWidth: ux_ts.getUnitWidth(image_size, _this)
						}
					});
				}else if(_this.is('.grid_list')){
					_this.isotope({
						layoutMode : 'fitRows',
						animationEngine : 'css',
						//resizable: false,
						masonry: {
							columnWidth: ux_ts.getUnitWidth(image_size, _this)
						}
					});
				}
			});
			
			_this.addClass('isotope_fade');
			_this.siblings('#isotope-load').fadeOut(300);
		});
	}
	
	//ThemeIsotope: isotope filter
	this.isotopefilters = function(){
		var _filters = jQuery('.filters');
		_filters.delegate('a', 'click', function() {
			$container = jQuery(this).parent().parent().parent().next().find('.isotope');
			jQuery(this).parent().parent().find('li').removeClass('active');
			jQuery(this).parent().addClass('active');
			var selector = jQuery(this).attr('data-filter');
			$container.isotope({
				filter: selector
			});
			return false;
		});

		if( _filters.find('.filter-floating-triggle').length ){

			_filters.find('ul').contents().filter(function() {
				return this.nodeType === 3;
			}).remove();

		}
	}
	
	//Flip centered IE8 hack
	this.flipcenterie = function(){
		var _flipback = jQuery('.flip_wrap_back_con');
		_flipback.each(function(){
			var 
			flipTitHeight  = jQuery(this).find('h2').height(),
			flipMarginTop  = -((flipTitHeight + 60 )/2);
			
			jQuery(this).css({'margin-top':+flipMarginTop,'left':'0' });
		});
	}
}






















/*!
 * imagesLoaded PACKAGED v3.1.8
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */


/*!
 * EventEmitter v4.2.6 - git.io/ee
 * Oliver Caldwell
 * MIT license
 * @preserve
 */

(function () {
	

	/**
	 * Class for managing events.
	 * Can be extended to provide event functionality in other classes.
	 *
	 * @class EventEmitter Manages event registering and emitting.
	 */
	function EventEmitter() {}

	// Shortcuts to improve speed and size
	var proto = EventEmitter.prototype;
	var exports = this;
	var originalGlobalValue = exports.EventEmitter;

	/**
	 * Finds the index of the listener for the event in it's storage array.
	 *
	 * @param {Function[]} listeners Array of listeners to search through.
	 * @param {Function} listener Method to look for.
	 * @return {Number} Index of the specified listener, -1 if not found
	 * @api private
	 */
	function indexOfListener(listeners, listener) {
		var i = listeners.length;
		while (i--) {
			if (listeners[i].listener === listener) {
				return i;
			}
		}

		return -1;
	}

	/**
	 * Alias a method while keeping the context correct, to allow for overwriting of target method.
	 *
	 * @param {String} name The name of the target method.
	 * @return {Function} The aliased method
	 * @api private
	 */
	function alias(name) {
		return function aliasClosure() {
			return this[name].apply(this, arguments);
		};
	}

	/**
	 * Returns the listener array for the specified event.
	 * Will initialise the event object and listener arrays if required.
	 * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
	 * Each property in the object response is an array of listener functions.
	 *
	 * @param {String|RegExp} evt Name of the event to return the listeners from.
	 * @return {Function[]|Object} All listener functions for the event.
	 */
	proto.getListeners = function getListeners(evt) {
		var events = this._getEvents();
		var response;
		var key;

		// Return a concatenated array of all matching events if
		// the selector is a regular expression.
		if (typeof evt === 'object') {
			response = {};
			for (key in events) {
				if (events.hasOwnProperty(key) && evt.test(key)) {
					response[key] = events[key];
				}
			}
		}
		else {
			response = events[evt] || (events[evt] = []);
		}

		return response;
	};

	/**
	 * Takes a list of listener objects and flattens it into a list of listener functions.
	 *
	 * @param {Object[]} listeners Raw listener objects.
	 * @return {Function[]} Just the listener functions.
	 */
	proto.flattenListeners = function flattenListeners(listeners) {
		var flatListeners = [];
		var i;

		for (i = 0; i < listeners.length; i += 1) {
			flatListeners.push(listeners[i].listener);
		}

		return flatListeners;
	};

	/**
	 * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
	 *
	 * @param {String|RegExp} evt Name of the event to return the listeners from.
	 * @return {Object} All listener functions for an event in an object.
	 */
	proto.getListenersAsObject = function getListenersAsObject(evt) {
		var listeners = this.getListeners(evt);
		var response;

		if (listeners instanceof Array) {
			response = {};
			response[evt] = listeners;
		}

		return response || listeners;
	};

	/**
	 * Adds a listener function to the specified event.
	 * The listener will not be added if it is a duplicate.
	 * If the listener returns true then it will be removed after it is called.
	 * If you pass a regular expression as the event name then the listener will be added to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to attach the listener to.
	 * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.addListener = function addListener(evt, listener) {
		var listeners = this.getListenersAsObject(evt);
		var listenerIsWrapped = typeof listener === 'object';
		var key;

		for (key in listeners) {
			if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
				listeners[key].push(listenerIsWrapped ? listener : {
					listener: listener,
					once: false
				});
			}
		}

		return this;
	};

	/**
	 * Alias of addListener
	 */
	proto.on = alias('addListener');

	/**
	 * Semi-alias of addListener. It will add a listener that will be
	 * automatically removed after it's first execution.
	 *
	 * @param {String|RegExp} evt Name of the event to attach the listener to.
	 * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.addOnceListener = function addOnceListener(evt, listener) {
		return this.addListener(evt, {
			listener: listener,
			once: true
		});
	};

	/**
	 * Alias of addOnceListener.
	 */
	proto.once = alias('addOnceListener');

	/**
	 * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
	 * You need to tell it what event names should be matched by a regex.
	 *
	 * @param {String} evt Name of the event to create.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.defineEvent = function defineEvent(evt) {
		this.getListeners(evt);
		return this;
	};

	/**
	 * Uses defineEvent to define multiple events.
	 *
	 * @param {String[]} evts An array of event names to define.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.defineEvents = function defineEvents(evts) {
		for (var i = 0; i < evts.length; i += 1) {
			this.defineEvent(evts[i]);
		}
		return this;
	};

	/**
	 * Removes a listener function from the specified event.
	 * When passed a regular expression as the event name, it will remove the listener from all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to remove the listener from.
	 * @param {Function} listener Method to remove from the event.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.removeListener = function removeListener(evt, listener) {
		var listeners = this.getListenersAsObject(evt);
		var index;
		var key;

		for (key in listeners) {
			if (listeners.hasOwnProperty(key)) {
				index = indexOfListener(listeners[key], listener);

				if (index !== -1) {
					listeners[key].splice(index, 1);
				}
			}
		}

		return this;
	};

	/**
	 * Alias of removeListener
	 */
	proto.off = alias('removeListener');

	/**
	 * Adds listeners in bulk using the manipulateListeners method.
	 * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
	 * You can also pass it a regular expression to add the array of listeners to all events that match it.
	 * Yeah, this function does quite a bit. That's probably a bad thing.
	 *
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to add.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.addListeners = function addListeners(evt, listeners) {
		// Pass through to manipulateListeners
		return this.manipulateListeners(false, evt, listeners);
	};

	/**
	 * Removes listeners in bulk using the manipulateListeners method.
	 * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	 * You can also pass it an event name and an array of listeners to be removed.
	 * You can also pass it a regular expression to remove the listeners from all events that match it.
	 *
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to remove.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.removeListeners = function removeListeners(evt, listeners) {
		// Pass through to manipulateListeners
		return this.manipulateListeners(true, evt, listeners);
	};

	/**
	 * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
	 * The first argument will determine if the listeners are removed (true) or added (false).
	 * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	 * You can also pass it an event name and an array of listeners to be added/removed.
	 * You can also pass it a regular expression to manipulate the listeners of all events that match it.
	 *
	 * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
		var i;
		var value;
		var single = remove ? this.removeListener : this.addListener;
		var multiple = remove ? this.removeListeners : this.addListeners;

		// If evt is an object then pass each of it's properties to this method
		if (typeof evt === 'object' && !(evt instanceof RegExp)) {
			for (i in evt) {
				if (evt.hasOwnProperty(i) && (value = evt[i])) {
					// Pass the single listener straight through to the singular method
					if (typeof value === 'function') {
						single.call(this, i, value);
					}
					else {
						// Otherwise pass back to the multiple function
						multiple.call(this, i, value);
					}
				}
			}
		}
		else {
			// So evt must be a string
			// And listeners must be an array of listeners
			// Loop over it and pass each one to the multiple method
			i = listeners.length;
			while (i--) {
				single.call(this, evt, listeners[i]);
			}
		}

		return this;
	};

	/**
	 * Removes all listeners from a specified event.
	 * If you do not specify an event then all listeners will be removed.
	 * That means every event will be emptied.
	 * You can also pass a regex to remove all events that match it.
	 *
	 * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.removeEvent = function removeEvent(evt) {
		var type = typeof evt;
		var events = this._getEvents();
		var key;

		// Remove different things depending on the state of evt
		if (type === 'string') {
			// Remove all listeners for the specified event
			delete events[evt];
		}
		else if (type === 'object') {
			// Remove all events matching the regex.
			for (key in events) {
				if (events.hasOwnProperty(key) && evt.test(key)) {
					delete events[key];
				}
			}
		}
		else {
			// Remove all listeners in all events
			delete this._events;
		}

		return this;
	};

	/**
	 * Alias of removeEvent.
	 *
	 * Added to mirror the node API.
	 */
	proto.removeAllListeners = alias('removeEvent');

	/**
	 * Emits an event of your choice.
	 * When emitted, every listener attached to that event will be executed.
	 * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
	 * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
	 * So they will not arrive within the array on the other side, they will be separate.
	 * You can also pass a regular expression to emit to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	 * @param {Array} [args] Optional array of arguments to be passed to each listener.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.emitEvent = function emitEvent(evt, args) {
		var listeners = this.getListenersAsObject(evt);
		var listener;
		var i;
		var key;
		var response;

		for (key in listeners) {
			if (listeners.hasOwnProperty(key)) {
				i = listeners[key].length;

				while (i--) {
					// If the listener returns true then it shall be removed from the event
					// The function is executed either with a basic call or an apply if there is an args array
					listener = listeners[key][i];

					if (listener.once === true) {
						this.removeListener(evt, listener.listener);
					}

					response = listener.listener.apply(this, args || []);

					if (response === this._getOnceReturnValue()) {
						this.removeListener(evt, listener.listener);
					}
				}
			}
		}

		return this;
	};

	/**
	 * Alias of emitEvent
	 */
	proto.trigger = alias('emitEvent');

	/**
	 * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
	 * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	 * @param {...*} Optional additional arguments to be passed to each listener.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.emit = function emit(evt) {
		var args = Array.prototype.slice.call(arguments, 1);
		return this.emitEvent(evt, args);
	};

	/**
	 * Sets the current value to check against when executing listeners. If a
	 * listeners return value matches the one set here then it will be removed
	 * after execution. This value defaults to true.
	 *
	 * @param {*} value The new value to check for when executing listeners.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.setOnceReturnValue = function setOnceReturnValue(value) {
		this._onceReturnValue = value;
		return this;
	};

	/**
	 * Fetches the current value to check against when executing listeners. If
	 * the listeners return value matches this one then it should be removed
	 * automatically. It will return true by default.
	 *
	 * @return {*|Boolean} The current value to check for or the default, true.
	 * @api private
	 */
	proto._getOnceReturnValue = function _getOnceReturnValue() {
		if (this.hasOwnProperty('_onceReturnValue')) {
			return this._onceReturnValue;
		}
		else {
			return true;
		}
	};

	/**
	 * Fetches the events object and creates one if required.
	 *
	 * @return {Object} The events storage object.
	 * @api private
	 */
	proto._getEvents = function _getEvents() {
		return this._events || (this._events = {});
	};

	/**
	 * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
	 *
	 * @return {Function} Non conflicting EventEmitter class.
	 */
	EventEmitter.noConflict = function noConflict() {
		exports.EventEmitter = originalGlobalValue;
		return EventEmitter;
	};

	// Expose the class either via AMD, CommonJS or the global object
	if (typeof define === 'function' && define.amd) {
		define('eventEmitter/EventEmitter',[],function () {
			return EventEmitter;
		});
	}
	else if (typeof module === 'object' && module.exports){
		module.exports = EventEmitter;
	}
	else {
		this.EventEmitter = EventEmitter;
	}
}.call(this));

/*!
 * eventie v1.0.4
 * event binding helper
 *   eventie.bind( elem, 'click', myFn )
 *   eventie.unbind( elem, 'click', myFn )
 */

/*jshint browser: true, undef: true, unused: true */
/*global define: false */

( function( window ) {



var docElem = document.documentElement;

var bind = function() {};

function getIEEvent( obj ) {
  var event = window.event;
  // add event.target
  event.target = event.target || event.srcElement || obj;
  return event;
}

if ( docElem.addEventListener ) {
  bind = function( obj, type, fn ) {
    obj.addEventListener( type, fn, false );
  };
} else if ( docElem.attachEvent ) {
  bind = function( obj, type, fn ) {
    obj[ type + fn ] = fn.handleEvent ?
      function() {
        var event = getIEEvent( obj );
        fn.handleEvent.call( fn, event );
      } :
      function() {
        var event = getIEEvent( obj );
        fn.call( obj, event );
      };
    obj.attachEvent( "on" + type, obj[ type + fn ] );
  };
}

var unbind = function() {};

if ( docElem.removeEventListener ) {
  unbind = function( obj, type, fn ) {
    obj.removeEventListener( type, fn, false );
  };
} else if ( docElem.detachEvent ) {
  unbind = function( obj, type, fn ) {
    obj.detachEvent( "on" + type, obj[ type + fn ] );
    try {
      delete obj[ type + fn ];
    } catch ( err ) {
      // can't delete window object properties
      obj[ type + fn ] = undefined;
    }
  };
}

var eventie = {
  bind: bind,
  unbind: unbind
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( 'eventie/eventie',eventie );
} else {
  // browser global
  window.eventie = eventie;
}

})( this );

/*!
 * imagesLoaded v3.1.8
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

( function( window, factory ) { 
  // universal module definition

  /*global define: false, module: false, require: false */

  if ( typeof define === 'function' && define.amd ) {
    // AMD
    define( [
      'eventEmitter/EventEmitter',
      'eventie/eventie'
    ], function( EventEmitter, eventie ) {
      return factory( window, EventEmitter, eventie );
    });
  } else if ( typeof exports === 'object' ) {
    // CommonJS
    module.exports = factory(
      window,
      require('wolfy87-eventemitter'),
      require('eventie')
    );
  } else {
    // browser global
    window.imagesLoaded = factory(
      window,
      window.EventEmitter,
      window.eventie
    );
  }

})( window,

// --------------------------  factory -------------------------- //

function factory( window, EventEmitter, eventie ) {



var $ = window.jQuery;
var console = window.console;
var hasConsole = typeof console !== 'undefined';

// -------------------------- helpers -------------------------- //

// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

var objToString = Object.prototype.toString;
function isArray( obj ) {
  return objToString.call( obj ) === '[object Array]';
}

// turn element or nodeList into an array
function makeArray( obj ) {
  var ary = [];
  if ( isArray( obj ) ) {
    // use object if already an array
    ary = obj;
  } else if ( typeof obj.length === 'number' ) {
    // convert nodeList to array
    for ( var i=0, len = obj.length; i < len; i++ ) {
      ary.push( obj[i] );
    }
  } else {
    // array of single index
    ary.push( obj );
  }
  return ary;
}

  // -------------------------- imagesLoaded -------------------------- //

  /**
   * @param {Array, Element, NodeList, String} elem
   * @param {Object or Function} options - if function, use as callback
   * @param {Function} onAlways - callback function
   */
  function ImagesLoaded( elem, options, onAlways ) {
    // coerce ImagesLoaded() without new, to be new ImagesLoaded()
    if ( !( this instanceof ImagesLoaded ) ) {
      return new ImagesLoaded( elem, options );
    }
    // use elem as selector string
    if ( typeof elem === 'string' ) {
      elem = document.querySelectorAll( elem );
    }

    this.elements = makeArray( elem );
    this.options = extend( {}, this.options );

    if ( typeof options === 'function' ) {
      onAlways = options;
    } else {
      extend( this.options, options );
    }

    if ( onAlways ) {
      this.on( 'always', onAlways );
    }

    this.getImages();

    if ( $ ) {
      // add jQuery Deferred object
      this.jqDeferred = new $.Deferred();
    }

    // HACK check async to allow time to bind listeners
    var _this = this;
    setTimeout( function() {
      _this.check();
    });
  }

  ImagesLoaded.prototype = new EventEmitter();

  ImagesLoaded.prototype.options = {};

  ImagesLoaded.prototype.getImages = function() {
    this.images = [];

    // filter & find items if we have an item selector
    for ( var i=0, len = this.elements.length; i < len; i++ ) {
      var elem = this.elements[i];
      // filter siblings
      if ( elem.nodeName === 'IMG' ) {
        this.addImage( elem );
      }
      // find children
      // no non-element nodes, #143
      var nodeType = elem.nodeType;
      if ( !nodeType || !( nodeType === 1 || nodeType === 9 || nodeType === 11 ) ) {
        continue;
      }
      var childElems = elem.querySelectorAll('img');
      // concat childElems to filterFound array
      for ( var j=0, jLen = childElems.length; j < jLen; j++ ) {
        var img = childElems[j];
        this.addImage( img );
      }
    }
  };

  /**
   * @param {Image} img
   */
  ImagesLoaded.prototype.addImage = function( img ) {
    var loadingImage = new LoadingImage( img );
    this.images.push( loadingImage );
  };

  ImagesLoaded.prototype.check = function() {
    var _this = this;
    var checkedCount = 0;
    var length = this.images.length;
    this.hasAnyBroken = false;
    // complete if no images
    if ( !length ) {
      this.complete();
      return;
    }

    function onConfirm( image, message ) {
      if ( _this.options.debug && hasConsole ) {
        console.log( 'confirm', image, message );
      }

      _this.progress( image );
      checkedCount++;
      if ( checkedCount === length ) {
        _this.complete();
      }
      return true; // bind once
    }

    for ( var i=0; i < length; i++ ) {
      var loadingImage = this.images[i];
      loadingImage.on( 'confirm', onConfirm );
      loadingImage.check();
    }
  };

  ImagesLoaded.prototype.progress = function( image ) {
    this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
    // HACK - Chrome triggers event before object properties have changed. #83
    var _this = this;
    setTimeout( function() {
      _this.emit( 'progress', _this, image );
      if ( _this.jqDeferred && _this.jqDeferred.notify ) {
        _this.jqDeferred.notify( _this, image );
      }
    });
  };

  ImagesLoaded.prototype.complete = function() {
    var eventName = this.hasAnyBroken ? 'fail' : 'done';
    this.isComplete = true;
    var _this = this;
    // HACK - another setTimeout so that confirm happens after progress
    setTimeout( function() {
      _this.emit( eventName, _this );
      _this.emit( 'always', _this );
      if ( _this.jqDeferred ) {
        var jqMethod = _this.hasAnyBroken ? 'reject' : 'resolve';
        _this.jqDeferred[ jqMethod ]( _this );
      }
    });
  };

  // -------------------------- jquery -------------------------- //

  if ( $ ) {
    $.fn.imagesLoaded = function( options, callback ) {
      var instance = new ImagesLoaded( this, options, callback );
      return instance.jqDeferred.promise( $(this) );
    };
  }


  // --------------------------  -------------------------- //

  function LoadingImage( img ) {
    this.img = img;
  }

  LoadingImage.prototype = new EventEmitter();

  LoadingImage.prototype.check = function() {
    // first check cached any previous images that have same src
    var resource = cache[ this.img.src ] || new Resource( this.img.src );
    if ( resource.isConfirmed ) {
      this.confirm( resource.isLoaded, 'cached was confirmed' );
      return;
    }

    // If complete is true and browser supports natural sizes,
    // try to check for image status manually.
    if ( this.img.complete && this.img.naturalWidth !== undefined ) {
      // report based on naturalWidth
      this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
      return;
    }

    // If none of the checks above matched, simulate loading on detached element.
    var _this = this;
    resource.on( 'confirm', function( resrc, message ) {
      _this.confirm( resrc.isLoaded, message );
      return true;
    });

    resource.check();
  };

  LoadingImage.prototype.confirm = function( isLoaded, message ) {
    this.isLoaded = isLoaded;
    this.emit( 'confirm', this, message );
  };

  // -------------------------- Resource -------------------------- //

  // Resource checks each src, only once
  // separate class from LoadingImage to prevent memory leaks. See #115

  var cache = {};

  function Resource( src ) {
    this.src = src;
    // add to cache
    cache[ src ] = this;
  }

  Resource.prototype = new EventEmitter();

  Resource.prototype.check = function() {
    // only trigger checking once
    if ( this.isChecked ) {
      return;
    }
    // simulate loading on detached element
    var proxyImage = new Image();
    eventie.bind( proxyImage, 'load', this );
    eventie.bind( proxyImage, 'error', this );
    proxyImage.src = this.src;
    // set flag
    this.isChecked = true;
  };

  // ----- events ----- //

  // trigger specified handler for event type
  Resource.prototype.handleEvent = function( event ) {
    var method = 'on' + event.type;
    if ( this[ method ] ) {
      this[ method ]( event );
    }
  };

  Resource.prototype.onload = function( event ) {
    this.confirm( true, 'onload' );
    this.unbindProxyEvents( event );
  };

  Resource.prototype.onerror = function( event ) {
    this.confirm( false, 'onerror' );
    this.unbindProxyEvents( event );
  };

  // ----- confirm ----- //

  Resource.prototype.confirm = function( isLoaded, message ) {
    this.isConfirmed = true;
    this.isLoaded = isLoaded;
    this.emit( 'confirm', this, message );
  };

  Resource.prototype.unbindProxyEvents = function( event ) {
    eventie.unbind( event.target, 'load', this );
    eventie.unbind( event.target, 'error', this );
  };

  // -----  ----- //

  return ImagesLoaded;

});
