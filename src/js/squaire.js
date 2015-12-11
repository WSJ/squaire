window.Squaire = (function(){

	// data must be passed in as an object with data assigned to each property
	// colors option is required. the rest are optional.
	function Squaire(data, options) {
		var self = this;
		// default options
		var defaults = {
			el: '#map-container',
			//box layout, using data format from http://code.minnpost.com/aranger/
			layout: [[0,0,"AK"],[10,0,"ME"],[9,1,"VT"],[10,1,"NH"],[0,2,"WA"],[1,2,"ID"],[2,2,"MT"],[3,2,"ND"],[4,2,"MN"],[6,2,"MI"],[8,2,"NY"],[9,2,"MA"],[10,2,"RI"],[0,3,"OR"],[1,3,"UT"],[2,3,"WY"],[3,3,"SD"],[4,3,"IA"],[5,3,"WI"],[6,3,"IN"],[7,3,"OH"],[8,3,"PA"],[9,3,"NJ"],[10,3,"CT"],[0,4,"CA"],[1,4,"NV"],[2,4,"CO"],[3,4,"NE"],[4,4,"MO"],[5,4,"IL"],[6,4,"KY"],[7,4,"WV"],[8,4,"VA"],[9,4,"MD"],[10,4,"DE"],[1,5,"AZ"],[2,5,"NM"],[3,5,"KS"],[4,5,"AR"],[5,5,"TN"],[6,5,"NC"],[7,5,"SC"],[8,5,"DC"],[3,6,"OK"],[4,6,"LA"],[5,6,"MS"],[6,6,"AL"],[7,6,"GA"],[0,7,"HI"],[3,7,"TX"],[8,7,"FL"]],
			//text labels for boxes. For each two-letter short code (AL): box (Alabama), short (AL) and AP (Ala.) styles.
			labels: {'AK': {'full': 'Alaska', 'short': 'AK', 'ap': 'Alaska'}, 'AL': {'full': 'Alabama', 'short': 'AL', 'ap': 'Ala.'}, 'AR': {'full': 'Arkansas', 'short': 'AR', 'ap': 'Ark.'}, 'AZ': {'full': 'Arizona', 'short': 'AZ', 'ap': 'Ariz.'}, 'CA': {'full': 'California', 'short': 'CA', 'ap': 'Calif.'}, 'CO': {'full': 'Colorado', 'short': 'CO', 'ap': 'Colo.'}, 'CT': {'full': 'Connecticut', 'short': 'CT', 'ap': 'Conn.'}, 'DC': {'full': 'District of Columbia', 'short': 'DC', 'ap': 'D.C.'}, 'DE': {'full': 'Delaware', 'short': 'DE', 'ap': 'Del.'}, 'FL': {'full': 'Florida', 'short': 'FL', 'ap': 'Fla.'}, 'GA': {'full': 'Georgia', 'short': 'GA', 'ap': 'Ga.'}, 'HI': {'full': 'Hawaii', 'short': 'HI', 'ap': 'Hawaii'}, 'IA': {'full': 'Iowa', 'short': 'IA', 'ap': 'Iowa'}, 'ID': {'full': 'Idaho', 'short': 'ID', 'ap': 'Idaho'}, 'IL': {'full': 'Illinois', 'short': 'IL', 'ap': 'Ill.'}, 'IN': {'full': 'Indiana', 'short': 'IN', 'ap': 'Ind.'}, 'KS': {'full': 'Kansas', 'short': 'KS', 'ap': 'Kan.'}, 'KY': {'full': 'Kentucky', 'short': 'KY', 'ap': 'Ky.'}, 'LA': {'full': 'Louisiana', 'short': 'LA', 'ap': 'La.'}, 'MA': {'full': 'Massachusetts', 'short': 'MA', 'ap': 'Mass.'}, 'MD': {'full': 'Maryland', 'short': 'MD', 'ap': 'Md.'}, 'ME': {'full': 'Maine', 'short': 'ME', 'ap': 'Maine'}, 'MI': {'full': 'Michigan', 'short': 'MI', 'ap': 'Mich.'}, 'MN': {'full': 'Minnesota', 'short': 'MN', 'ap': 'Minn.'}, 'MO': {'full': 'Missouri', 'short': 'MO', 'ap': 'Mo.'}, 'MS': {'full': 'Mississippi', 'short': 'MS', 'ap': 'Miss.'}, 'MT': {'full': 'Montana', 'short': 'MT', 'ap': 'Mont.'}, 'NC': {'full': 'North Carolina', 'short': 'NC', 'ap': 'N.C.'}, 'ND': {'full': 'North Dakota', 'short': 'ND', 'ap': 'N.D.'}, 'NE': {'full': 'Nebraska', 'short': 'NE', 'ap': 'Neb.'}, 'NH': {'full': 'New Hampshire', 'short': 'NH', 'ap': 'N.H.'}, 'NJ': {'full': 'New Jersey', 'short': 'NJ', 'ap': 'N.J.'}, 'NM': {'full': 'New Mexico', 'short': 'NM', 'ap': 'N.M.'}, 'NV': {'full': 'Nevada', 'short': 'NV', 'ap': 'Nev.'}, 'NY': {'full': 'New York', 'short': 'NY', 'ap': 'N.Y.'}, 'OH': {'full': 'Ohio', 'short': 'OH', 'ap': 'Ohio'}, 'OK': {'full': 'Oklahoma', 'short': 'OK', 'ap': 'Okla.'}, 'OR': {'full': 'Oregon', 'short': 'OR', 'ap': 'Ore.'}, 'PA': {'full': 'Pennsylvania', 'short': 'PA', 'ap': 'Pa.'}, 'RI': {'full': 'Rhode Island', 'short': 'RI', 'ap': 'R.I.'}, 'SC': {'full': 'South Carolina', 'short': 'SC', 'ap': 'S.C.'}, 'SD': {'full': 'South Dakota', 'short': 'SD', 'ap': 'S.D.'}, 'TN': {'full': 'Tennessee', 'short': 'TN', 'ap': 'Tenn.'}, 'TX': {'full': 'Texas', 'short': 'TX', 'ap': 'Texas'}, 'UT': {'full': 'Utah', 'short': 'UT', 'ap': 'Utah'}, 'VA': {'full': 'Virginia', 'short': 'VA', 'ap': 'Va.'}, 'VT': {'full': 'Vermont', 'short': 'VT', 'ap': 'Vt.'}, 'WA': {'full': 'Washington', 'short': 'WA', 'ap': 'Wash.'}, 'WI': {'full': 'Wisconsin', 'short': 'WI', 'ap': 'Wis.'}, 'WV': {'full': 'West Virginia', 'short': 'WV', 'ap': 'W.Va.'}, 'WY': {'full': 'Wyoming', 'short': 'WY', 'ap': 'Wyo.'} },
			labelStyle: 'short',//full, short, ap
			index: 'value',//name of column to use to color boxs
			indexType: 'numeric',//type of data. numeric or string. Numeric can include non-numeric characters, but they will be removed for the scale
			colors: d3.scale.ordinal().range(['#f3f3f3']),//d3 color scale
			classIndex: false,//set to column name to assign a class to each <g> wrapping a box
			defaultColor: '#f3f3f3',//color for undefined data
			tooltip: {
				enabled: false,
				mode: 'dynamic',//static, dynamic, toggle (between static and dynamic)
				el: '.squaire-toolbox',//element for static tooltip
				layout: false,//function to use as the tooltip layout
				whitelist: '*',//or array of column names to show in tooltip (for default tooltip)
				column1: '',//header for default table
				column2: '',//header for default table
				noteIndex: false//set to column name to add a text note at bottom of tooltip with class .tooltip-note
			},
			//defined breakpoints
			breakpoints: {
				"small-thumbnail": 270,//sub points (small-) are only used by CSS
				"small-xsmall": 350,
				"small": 540,//primary breakpoint where label format changes and tooltip toggles in toggle mode
				"medium": 940,
				"large": ''
			}
		};
		options = options || {};
		this.options = this.extend({}, ['tooltip'], defaults, options);

		//expand whitelist, but don't include columns defined as class or note index
		if(this.options.tooltip.whitelist==='*') {
			this.options.tooltip.whitelist = this.getDataColumns(data);
		}

		//make wrapping div to use as element to allow for padding on original container
		this.$el = d3.select(this.options.el)
			.append("div")
			.attr({ "margin": 0, "padding": 0 })
			.node();

		//save original data format
		this.options.data = data;
		//merge data and layout, prepare
		this.data = this.prepareData(self.options.layout, data);

		//basic setup
		//calculate map dimensions by number of boxs based on layout values
		this.mapDimensions();
		this.width = this.$el.getBoundingClientRect().width;
		this.height = this.width*this.ratio;

		this.breakpoint = this.getBreakpoint();

		//create svg
		this.svg = d3.select(this.$el)
			.append("svg")
			.attr("class", "squaire")
			.attr("data-breakpoint", this.breakpoint);

		this.svg.attr({
			"width": this.width,
			"height": this.height
		});
		
		//making default here so references correct options
		var tooltipDefaultLayout = function(d) {
				var html = '<h6>'+self.options.labels[d.box].full+'</h6>' + '<table class="table">';
				if(self.options.tooltip.column1 || self.options.tooltip.column2) {
					html += '<tr><th>'+self.options.tooltip.column1+'</th><th>'+self.options.tooltip.column2+'</th></tr>';
				}
				self.options.tooltip.whitelist.forEach(function(column) {
					//if box exists in data, has property in whitelist and property is neither false or blank
					if(d.data!==undefined && d.data.hasOwnProperty(column) && d.data[column]!==false && d.data[column]!=='') {
						html += '<tr><td>'+column+'</td><td>'+d.data[column]+'</td></tr>';
					}
				});
				html += '</table>';
				//if box exists in data, has property in whitelist and property is neither false or blank
				if(d.data!==undefined && d.data.hasOwnProperty(self.options.tooltip.noteIndex) && d.data[self.options.tooltip.noteIndex]!==false && d.data[self.options.tooltip.noteIndex]!=='') {
					html += '<div class="tooltip-note">'+d.data[self.options.tooltip.noteIndex]+'</div>';
				}
				return html;
			},
			tooltipLayout = this.options.tooltip.layout || tooltipDefaultLayout;

		if(this.options.tooltip.enabled) {
			//initialize tooltips
			this.tip = d3.tip()
				.attr('class', 'squaire-tooltip')
				.direction(function(d) {
					var ew = 'n';
					if(d.x < 2) {
						ew = 'e';
					} else if (d.x > (self.boxesWide-3)) {
						ew = 'w';
					} else if (d.y < 2) {
						ew = 's';
					}
					return ew;
				})
				.offset([6, 6])
				.html(tooltipLayout)
				.toolbox(self.options.tooltip.el);

			/* Invoke the tip in the context of your visualization */
			this.svg.call(this.tip);

			this.toolbox = d3.select(self.options.tooltip.el).attr("class", "squaire-toolbox");
			if(this.options.tooltip.mode !== "static") {
				this.toolbox.style("display", "none");
			}
		}

		//draw the map
		this.draw();

		this.mapInteraction();
		this.toggleTooltip();

		//debounce resize
		var resize = this.debounce(this.resizeMap, 250);
		d3.select(window).on('resize.'+this.options.el, resize.bind(this));

		return this;

	}

	//return array of data properties for "*" option in whitelist
	//don't include columns defined as class or note index
	Squaire.prototype.getDataColumns = function(data) {
		var whitelist = Object.keys(data[Object.keys(data)[0]]);
		whitelist = this.removeFromArray(whitelist, this.options.classIndex);
		whitelist = this.removeFromArray(whitelist, this.options.tooltip.noteIndex);
		return whitelist;
	};

	//remove an item from an array by value
	Squaire.prototype.removeFromArray = function(arr, item) {
		var i = arr.indexOf(item);
		if(i != -1) {
			arr.splice(i, 1);
		}
		return arr;
	};

	//make data object with a property for each box
	//function can be overwritten to handle custom layouts or otherwise conver data, but final format must be the same
	//currently accepts two formats of data. box name needs to match how data is keyed.
	//If not using box names, need to edit updateText() and tooltip
	Squaire.prototype.prepareData = function(layout, data) {
		if(typeof layout=="string"){
			//for layouts formatted in Excel (tsv or csv) with one "box" per cell
			var out = [];
			layout=layout.replace(/[\n\r]/g, '\n');
			layout.split("\n").forEach(function(row, y){
				row.split(/\t|,/).forEach(function(rowItem, x){
					if( rowItem !== "") out.push({ box: rowItem, x: x, y: y, data: data[rowItem] });
				});
			});
			return out;
		} else {
			//for default layout in the format produced by http://code.minnpost.com/aranger/ aka array of arrays of [x,y,box]
			return layout.map(function(geo){
				return {
						x: geo[0],
						y: geo[1],
						box: geo[2],
						data: data[geo[2]]
					};
			});
		}
	};

	/**
	* Modified deep extend from youmightnotneedjquery.com
	* @private
	* @param {Object} variable or empty object to extend
	* @param {Array} is present, properties to allow deep extend
	* @param {Object} defaults Default settings
	* @param {Object} options User options
	* @returns {Object} Merged values of defaults and options
	*/
	Squaire.prototype.extend = function(out) {
	  out = out || {};
	  var deep = [];//whitelist for deep extend

	  for (var i = 1; i < arguments.length; i++) {
	    var obj = arguments[i];
	    //if second argument is an array, make argument whitelist for deep extend
	    if(Object.prototype.toString.call(obj) === '[object Array]'){
	    	deep = obj;
	    	continue;
	    }

	    if (!obj)
	      continue;
	
	    for (var key in obj) {
	      if (obj.hasOwnProperty(key)) {
	      	//only deep extend whitelisted properties
	        if (typeof obj[key] === 'object' && deep.indexOf(key) > -1) {
		      var deepOut = {};
	          if (Object.prototype.toString.call(obj[key]) === '[object Array]') {
	            deepOut = [];
	          }
	          out[key] = this.extend(deepOut, out[key], obj[key]);
	        } else
	          out[key] = obj[key];
	      }
	    }
	  }
	
	  return out;
	};

	// http://davidwalsh.name/javascript-debounce-function
	Squaire.prototype.debounce = function (func, wait, immediate) {
	    var timeout;
	    return function() {
	        var context = this, args = arguments,
	        	later = function() {
	        		timeout = null;
	        		if (!immediate) func.apply(context, args);
	        	},
	        	callNow = immediate && !timeout;
	        clearTimeout(timeout);
	        timeout = setTimeout(later, wait);
	        if (callNow) func.apply(context, args);
	    };
	};

	//return string based on width of svg and defined breakpoints
	Squaire.prototype.getBreakpoint = function() {
		if(this.width < this.options.breakpoints['small-thumbnail']) {
			return 'small-thumbnail';
		} else if (this.width < this.options.breakpoints['small-xsmall']) {
			return 'small-xsmall';
		} else if (this.width < this.options.breakpoints.small) {
			return 'small';
		} else if (this.width < this.options.breakpoints.medium) {
			return 'medium';
		} else {
			return 'large';
		}
	};

	//if tooltips are enabled, toggles between dynamic and static
	Squaire.prototype.toggleTooltip = function() {
		if(this.options.tooltip.enabled && this.options.tooltip.mode==='toggle') {
			if(this.breakpoint.slice(0,5) === 'small'){
				this.toolbox.style("display", "block");
			} else {
				this.toolbox.style("display", "none");
			}
		}
	};

	//resizer function
	// updates size, breakpoint, text, and tooltip style
	Squaire.prototype.resizeMap = function() {
		var self = this;
		this.width = this.$el.getBoundingClientRect().width;
		this.height = this.width*this.ratio;

		this.breakpoint = this.getBreakpoint();
		var size = this.boxDimensions();
		
		this.svg.attr({
				"width": this.width,
				"height": this.height
			}).attr("data-breakpoint", this.breakpoint);

		this.boxRect
			.attr("x", function(d){
				return size.xScale(d.x);
			})
			.attr("y", function(d){
				return size.yScale(d.y);
			})
			.attr({"width": size.boxWidth, "height": size.boxWidth});

		this.updateText(size);

		this.toggleTooltip();

	};

	Squaire.prototype.mapDimensions = function(){
		var boxesWide = d3.extent(this.data, function(d) { return d.x; });
		var boxesTall = d3.extent(this.data, function(d) { return d.y; });
		this.boxesWide = boxesWide[1] - boxesWide[0] + 1;
		this.boxesTall = boxesTall[1] - boxesTall[0] + 1;
		this.ratio = this.boxesTall/this.boxesWide;
	};

	//recalculate scales, box widths
	Squaire.prototype.boxDimensions = function(){
		var xScale = d3.scale.linear()
			.domain([0, this.boxesWide])
			.range([0,this.width]);
		var yScale = d3.scale.linear()
			.domain([0, this.boxesTall])
			.range([0, this.height]);
		var boxWidth = this.width/this.boxesWide;

		return {
			xScale: xScale,
			yScale: yScale,
			boxWidth: boxWidth
		};
	};

	//return color for box labels based on how dark background color is
	Squaire.prototype.overlayColor = function(color){
		//if only first half of color is defined, repeat it
		if(color.length < 5) {
			color += color.slice(1);
		}
	   return (color.replace('#','0x')) > (0xffffff/2) ? '#333' : '#fff';
	};

	//add the colors! use index property as the data
	Squaire.prototype.colorMap = function(index){
		//need to find min/max for color scale if numbers. also need to work with categories
		var self = this,
			indexType = this.options.indexType,
			colors = this.options.colors;
		this.boxRect
			.style('fill', function(d){
				//if box exists in data, has property in whitelist and property is neither false or blank
				if(d.data!==undefined && d.data.hasOwnProperty(index) && d.data[index]!==false && d.data[index]!==''){
					var value = d.data[index];
					//if data is numeric, strip any symbols, etc from value except decimal and negative signs
					if(indexType === 'numeric') {
						value = isNaN(value) ? value.replace(/[^\d-\.]/gi,'') : value;
					}
					d.fill = colors(value);
					d.index = index;
					return colors(value);
				} else {
					d.fill = self.options.defaultColor;
					d.index = index;
					return self.options.defaultColor;
				}
			});
		return this;
	};

	//update text on boxs (recalculate positions, return correct format, fill)
	Squaire.prototype.updateText = function(size){
		var self = this;
		this.boxText
			.attr("x", function(d){
				return size.xScale(d.x) + (size.boxWidth/2);
			})
			.attr("y", function(d){
				return size.yScale(d.y) + (size.boxWidth/2);
			})
			.text(function(d){
				return self.breakpoint.slice(0,5)==='small' ? self.options.labels[d.box].short : self.options.labels[d.box][self.options.labelStyle];
			})
			.style('fill', function(d){ return self.overlayColor(d.fill); });
		return this;
	};

	//separating mouseover/out to provide a funtion to be overwritten for custom mouseevents (including click)
	Squaire.prototype.mapInteraction = function(){
		var self = this;
		if(this.options.tooltip.enabled) {
			//this.boxRect.style("cursor", function(d){ return d.data!==undefined && d.data.hasOwnProperty(self.options.index) ? "pointer" : "default"; })
			this.boxRect
				.on('mouseover', function(d, idx){
					// hide dynamic tooltip if mode is static or toggle and breakpoint === small
					var hideToolTip = (self.options.tooltip.mode==='toggle' && self.breakpoint.slice(0,5)==='small') || self.options.tooltip.mode==='static';
					self.tip.show(d, idx, hideToolTip);

					// add .active class to <g> in focus and move to front (for z index)
					d3.selectAll("g.active").classed("active", false);
					var box = d3.select(this.parentNode).classed("active", true).node();
					box.parentNode.appendChild(box);
				})
		  		.on('mouseout', this.tip.hide);
		}
		return this;
	};

	//join data to DOM, update and draw svg elements
	Squaire.prototype.draw = function(){
		var self = this,
			size = this.boxDimensions(),
		    // DATA JOIN
			boxes = this.svg.selectAll("g")
				.data(this.data);

	    // ENTER
		var dataEnter = boxes.enter()
			.append("g");
		dataEnter.append("rect");
		dataEnter.append("text");

	    // ENTER + UPDATE
		boxes.attr("data-box", function(d){
				return d.box;
			})
			.attr("class", function(d){
				if(d.data!==undefined && d.data.hasOwnProperty(self.options.classIndex) && d.data[self.options.classIndex]!==false && d.data[self.options.classIndex]!=='') {
					return d.data[self.options.classIndex];
				} else {
					return '';
				}
			});
		
		this.boxRect = boxes.select("rect")
			.attr("x", function(d){
				return size.xScale(d.x);
			})
			.attr("y", function(d){
				return size.yScale(d.y);
			})
			.attr({"width": size.boxWidth, "height": size.boxWidth})
			.attr("class", "box-rect");

		this.boxText = boxes.select("text");

		// EXIT
		boxes.exit().remove();

		this.colorMap(this.options.index);
		this.updateText(size);

		return this;
	};

	//update map whitelist and colors
	Squaire.prototype.update = function(data, options){
		var self = this;
		data = data || this.options.data;
		options = options || {};
		this.options = this.extend({}, ['tooltip'], this.options, options);

		//expand whitelist
		if(this.options.tooltip.whitelist==='*') {
			this.options.tooltip.whitelist = this.getDataColumns(data);
		}

		//merge data and layout, prepare
		this.data = this.prepareData(self.options.layout, data);
		//update dimensions due to layout changes
		this.mapDimensions();

		//update data, DOM
		this.draw();

		//reset static tooltip when map is updated
		//could change this to update the tooltip
		if(this.options.tooltip.enabled) {
			this.toolbox.html('');
		}

		this.resizeMap();

		return this;
	};

	return Squaire;

}());