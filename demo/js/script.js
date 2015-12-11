(function() {

   $(function() {


   		/* QUICK START */

   		var quickData = { 
			"NY" : { "value": "$4" },
			"AL" : { "value": "$1" }
		};
		var quickMap = new Squaire(quickData, {
			colors: d3.scale.quantize().domain([1,5]).range(['#c9e2f5','#0098db'])
		});


		/* CUSTOM TOOLTIP, UPDATE */

		var tooltipData = {},
			tooltipMap,
			tooltipIndex = 'Population',
			tooltipColors,
			tooltipRepresentativesExtent;

		//get max/min of a column of numeric data
		function getExtent(index) {
			var values = Object.keys(tooltipData).map(function (key) {
    				return tooltipData[key][index];
    			});
   			return d3.extent(values, function(d){ return +d.replace(/[^\d-\.]/gi,''); });
		}

		//get max/min of values in bar chart
		function getBarExtent(){
    		var repExtent = getExtent("Representatives"),
    			electoralExtent = getExtent("Electoral Votes");
    		return [d3.min([repExtent[0],electoralExtent[0]]), d3.max([repExtent[1],electoralExtent[1]])];
		}

		function updateLegend(extent, colors, index){
			var commaFormat = d3.format(",f0"),
				unit = index==="Population" ? " people" : " square miles",
				html = '<span class="legend-value">'+commaFormat(extent[0])+'</span>';
			html += colors.map(function(color, i){
				return '<span class="legend-box" style="background-color:'+color+';"></span>';
			}).join('');
			html += '<span class="legend-value">'+commaFormat(extent[1])+unit+'</span>';
			$('.legend-scale').html(html);
		}

		function getTooltipColorScale(index) {
			var extent = getExtent(index),
				colors = ['#e6eff9','#c9e2f5','#95cbee','#0098db','#0079ae'],
				colorScale = d3.scale.quantize()
    				.domain(extent)
    				.range(colors);
    		updateLegend(extent, colors, index);
    		return colorScale;
		}

		d3.tsv("data/custom-tooltip.tsv", function(r){
			// write values to object using id as proprety name
			// id is the column name in the spreadsheet that maps to the layout and labels -- U.S. state two-letter abbreviations in default squaire.js settings
			tooltipData[r.State] = r;
			//remove id from dictionary values
			delete tooltipData[r.State].State; 
			return r;
		}, function(csv) {
			//callback when file loaded and data formatted
			tooltipColors = getTooltipColorScale(tooltipIndex);
			tooltipRepresentativesExtent = getBarExtent();
    		//init map
   			tooltipMap = new Squaire(tooltipData, {
   				el: "#custom-tooltip",
				index: tooltipIndex,
				labelStyle: "ap",
				colors: tooltipColors,
				classIndex: "landlocked",
				tooltip: {
					enabled: true,
					mode: 'toggle',
					el: "#custom-tooltip-toolbox",
					layout: tooltipBarLayout,
					whitelist: ["Population","Total Area", "Land Area","State Bird"],
					column1: 'Category',
					column2: 'Value'
				}
			});
		});

		// specialized tooltip layout with bar chart in table
		var bars = ["Representatives","Electoral Votes"];

		function tooltipBarLayout(d) {
			var html = '<h6>'+tooltipMap.options.labels[d.box].full+'</h6>' + '<table class="table">';
			if(tooltipMap.options.tooltip.column1 || tooltipMap.options.tooltip.column2) {
				html += '<tr><th>'+tooltipMap.options.tooltip.column1+'</th><th>'+tooltipMap.options.tooltip.column2+'</th></tr>';
			}
			tooltipMap.options.tooltip.whitelist.forEach(function(column) {
				//check data is defined
				if(d.data!==undefined && d.data.hasOwnProperty(column) && d.data[column]!==false && d.data[column]!=='') {
					var data = isNaN(d.data[column]) ? d.data[column] : parseFloat(d.data[column]).toFixed(0);
					html += '<tr><td>'+column+'</td><td>'+data+'</td></tr>';
				}
			});
			html += '</table>';
				html += '<table class="table table-bar hang">';
				bars.forEach(function(item) {
					var value = d.data[item];
					html += '<tr><td>'+item+'</td><td>'+value+'</td><td><div class="bar'+ (item===d.index ? ' active' : '') +'" style="width:'+((value ? value : 0)/tooltipRepresentativesExtent[1]*100)+'%"></div></td></tr>';
				});
				html += '</table>';
			return html;
		}

		var $buttons = $('.toggle-data-buttons');
		//change map via buttons
		$buttons.on('click', 'button', function(){
			$buttons.find('.btn-primary').removeClass('btn-primary');
			var index = $(this).addClass('btn-primary').data('index'),
				colorScale = getTooltipColorScale(index);

			tooltipMap.update(false, {
				index: index,
				colors: colorScale
			});

		});


		/* CUSTOM LAYOUT, REGULAR TOOLTIP, CUSTOM BREAKPOINT */

		var customLabels = {
			"N" : {
				"full"  : "North", //used in tooltip
				"short" : "N", //used in small breakpoint
				"ap"    : "N" //label format used in larger breakpoints. Can be renamed from "ap" if option `labelStyle` is changed to match or not included if `labelStyle` is set to "full" or "short".
			},
			"E" : {
				"full"  : "East",
				"short" : "E"
			},
			"S" : {
				"full"  : "South",
				"short" : "S"
			},
			"W" : {
				"full"  : "West",
				"short" : "W"
			}
		}
		
		var customData = { 
			"N" : { 
				"Direction": "Longitude",
				"Fun fact": "Compasses love me",
				"note": "Also, the north star."
			},
			"E" : { 
				"Direction": "Latitude",
				"Fun fact": "Where the sun rises"
			},
			"S" : { 
				"Direction": "Longitude",
				"Fun fact": "Come to me for penguins"
			},
			"W" : { 
				"Direction": "Latitude",
				"Fun fact": "Where the sun sets"
			}
		};
		
		var customMap = new Squaire(customData, {
			el: "#custom-layout",
			layout: ",N,\nW,,E\n,S,",
			labels: customLabels,
			labelStyle: "full",
			index: "Direction",
			indexType: "string",
			colors: d3.scale.ordinal(["Longitude","Latitude"]).range(["#c9e2f5","#c6e2ba"]),
			tooltip: {
				enabled: true,
				mode: "static",
				el: "#custom-layout-toolbox",
				whitelist: ["Fun fact"],
				noteIndex: "note"
			},
			breakpoints: {
				"small": 300
			}
		});

   });

})();