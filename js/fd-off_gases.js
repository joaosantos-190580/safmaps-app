/*
 * All panels, controls and other issues related to: OFF-GASES
 *
 * 
 */

// MENU: Panel activation
$("#tab-off_gases").click(function(e) {
    e.preventDefault();

    reset_actived (e);
    $("#panel-support-maps").css("display", "none");
    $("#panel-corsia").css("display", "none");
    $("#panel-eucalipto").css("display", "none");
    $("#panel-eucalipto-residues").css("display", "none");
    $("#panel-soja").css("display", "none");
    $("#panel-macauba").css("display", "none");
    $("#panel-palma").css("display", "none");		
    $("#panel-sugarcane").css("display", "none");	
    $("#panel-sugarcane-residues").css("display", "none");
    $("#panel-corn").css("display", "none");		
    $("#panel-tallow").css("display", "none");
    $("#panel-uco-residues").css("display", "none");			
    $("#empty").css("display", "none");
    $("#panel-off_gases").css("display", "block");		
    $("#legends").css("display", "block");		

    // Layers and info reset
    $('input:checkbox').prop('checked', false);
    reset_all_legends();
    removeLayers();
    removePanelbyTitle("Map Information");

    // Pins, points and controls reset
    reset_cstudies();

    // Reset map
    if (map.getZoom() != 4) {
        map.flyTo([-16.7894, -37.6708], 4);
    }    

    // Load layers groups
    //group_1 = ['DBMS:steel_plants','DBMS:flaring'];
    group_2 = ['DBMS:main_roads','DBMS:railroads_fd_stock','DBMS:pipelines_fd_stock','DBMS:waterways_fd_stock'];
    // Layers of group 1 ('DBMS:steel_plants','DBMS:flaring') is placed in group 3
    group_3 = ['DBMS:steel_plants','DBMS:flaring','DBMS:abatedouros','DBMS:airports_fd_stock','DBMS:refineries_refining_fd_stock'];
    
}); 


/*
 *  OFF-GASES LAYERS (from GeoServer)
 */

var l_steel_plants = 'DBMS:steel_plants';		// off_gases
var l_flaring = 'DBMS:flaring';


/*
 *  OFF-GASES LAYERS
 */

// Steel plants (Layer)
$("#toggle-off_gases").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-flaring').prop('checked', false);
    //reset_all_legends();
    //removeLayers_group("gp_1");

    options['layers'] = l_steel_plants;

    if($(this).prop("checked") == true) {
        //removeLayers(true);
        opacityLayers(true);

        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_steel_plants, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);    
        map.addLayer(prov);

        $("#legend-flaring").css("display", "none");
        $("#legend-off_gases").css("display", "block");
        reorderLayers();        
    } else {
        // Nos caso de layers que mudam a opacidade do fundo com labels, ao desativar o controle a opacidade
        // deve retornar ao normal (1)
        $("#legend-off_gases").css("display", "none");
        removeLayer(l_steel_plants);    
    }
});

$("#toggle-flaring").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-off_gases').prop('checked', false);
    //reset_all_legends();
    //removeLayers_group("gp_1");

    options['layers'] = l_flaring;

    if($(this).prop("checked") == true) {
        //removeLayers(true);
        opacityLayers(true);

        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_flaring, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);    
        map.addLayer(prov);

        $("#legend-off_gases").css("display", "none");
        $("#legend-flaring").css("display", "block");
        reorderLayers();    
    } else {
        // Nos caso de layers que mudam a opacidade do fundo com labels, ao desativar o controle a opacidade
        // deve retornar ao normal (1)
        $("#legend-flaring").css("display", "none");
        removeLayer(l_flaring);    
    }
});

// INFRASTRUCTURE
// toggle-roads (Layer)
$("#toggle-roads_fd_08").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-railroads_fd_08').prop('checked', false);
    $('#toggle-pipelines_fd_08').prop('checked', false);
    $('#toggle-waterways_fd_08').prop('checked', false);
    //reset_all_legends();
    removeLayers_group("gp_2");

    options['layers'] = l_main_roads_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_roads_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);  
        map.addLayer(prov);

        $("#legend-railroads_fd_stock").css("display", "none");
        $("#legend-pipelines_fd_stock").css("display", "none");
        $("#legend-waterways_fd_stock").css("display", "none");
        $("#legend-main_roads").css("display", "block");
        reorderLayers();
    } else {
        $("#legend-main_roads").css("display", "none");
        removeLayer(l_main_roads_src);
    }
});

// toggle-railroads (Layer)
$("#toggle-railroads_fd_08").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-roads_fd_08').prop('checked', false);
    $('#toggle-pipelines_fd_08').prop('checked', false);
    $('#toggle-waterways_fd_08').prop('checked', false);
    //reset_all_legends();
    removeLayers_group("gp_2");

    options['layers'] = l_railroads_fd_stock_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_railroads_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);  
        map.addLayer(prov);

        $("#legend-main_roads").css("display", "none");
        $("#legend-pipelines_fd_stock").css("display", "none");
        $("#legend-waterways_fd_stock").css("display", "none");
        $("#legend-railroads_fd_stock").css("display", "block");
        reorderLayers();
    } else {
        $("#legend-railroads_fd_stock").css("display", "none");
        removeLayer(l_railroads_fd_stock_src);
    }
});

// toggle-pipelines (Layer)
$("#toggle-pipelines_fd_08").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-roads_fd_08').prop('checked', false);
    $('#toggle-railroads_fd_08').prop('checked', false);
    $('#toggle-waterways_fd_08').prop('checked', false);
    //reset_all_legends();
    removeLayers_group("gp_2");

    options['layers'] = l_pipelines_fd_stock_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_pipelines_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);  
        map.addLayer(prov);

        $("#legend-main_roads").css("display", "none");
        $("#legend-railroads_fd_stock").css("display", "none");
        $("#legend-waterways_fd_stock").css("display", "none");
        $("#legend-pipelines_fd_stock").css("display", "block");
        reorderLayers();
    } else {
        $("#legend-pipelines_fd_stock").css("display", "none");
        removeLayer(l_pipelines_fd_stock_src);
    }
});

// toggle-waterways (Layer)
$("#toggle-waterways_fd_08").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-roads_fd_08').prop('checked', false);
    $('#toggle-railroads_fd_08').prop('checked', false);
    $('#toggle-pipelines_fd_08').prop('checked', false);
    //reset_all_legends();
    removeLayers_group("gp_2");

    options['layers'] = l_waterways_fd_stock_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_waterways_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        $("#legend-main_roads").css("display", "none");
        $("#legend-railroads_fd_stock").css("display", "none");
        $("#legend-pipelines_fd_stock").css("display", "none");
        $("#legend-waterways_fd_stock").css("display", "block");
        reorderLayers();
    } else {
        $("#legend-waterways_fd_stock").css("display", "none");
        removeLayer(l_waterways_fd_stock_src);
    }
});

// Complementary information
// toggle-airports (Layer)
$("#toggle-airports_fd_08").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    //reset_all_legends();
    //removeLayers();

    options['layers'] = l_airports_fd_stock_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_airports_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);
                
        $("#legend-airports_fd_stock").css("display", "block");
        reorderLayers();
    } else {
        $("#legend-airports_fd_stock").css("display", "none");
        removeLayer(l_airports_fd_stock_src);
    }
});

// toggle-refineries_refining (Layer)
$("#toggle-refineries_refining_fd_08").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    //reset_all_legends();
    //removeLayers();

    options['layers'] = l_refineries_refining_fd_stock_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_refineries_refining_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);
                
        $("#legend-refineries_refining_fd_stock").css("display", "block");
        reorderLayers();
    } else {
        $("#legend-refineries_refining_fd_stock").css("display", "none");
        removeLayer(l_refineries_refining_fd_stock_src);
    }
});


/*
 * JANELAS INFO - MAPAS
 */

// Steel off-gases - INFO
// Off-gases
$("#info-off_gases").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 500, height: 250},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Estimated steel off-gases</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Availability of steel off-gases, in use and flared, in twelve Brazilian steelmakers, in 2017.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Based on Capaz et al. (2021)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://35.198.22.135/geoserver/DBMS/wms?service=WMS&version=1.1.0&request=GetMap&layers=DBMS:steel_plants&styles=&bbox=-46.424485,-23.891125,-38.846829,-3.584906&width=330&height=768&srs=EPSG:4326&format=application/openlayers'>Download page</a></p>" +
                                "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Brazil</p>" +
                                "</div>" +
                    "</div>",
        callback:    function () {
            this.content.css("padding", "15px");
            
            this.find(".jsPanel-btn-smallify").remove();
            this.find(".jsPanel-btn-minimize").remove();
            this.find(".jsPanel-btn-maximize").remove();
        }
    });
});  

// Flaring
$("#info-flaring").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 500, height: 250},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Flaring</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Volume of flaring steel off-gases in twelve Brazilian steelmakers, in 2017.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Based on Capaz et al. (2021)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://35.198.22.135/geoserver/DBMS/wms?service=WMS&version=1.1.0&request=GetMap&layers=DBMS:flaring&styles=&bbox=-46.424485,-23.891125,-38.846829,-3.584906&width=330&height=768&srs=EPSG:4326&format=application/openlayers'>Download page</a></p>" +
                                "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Brazil</p>" +
                                "</div>" +
                    "</div>",
        callback:    function () {
            this.content.css("padding", "15px");
            
            this.find(".jsPanel-btn-smallify").remove();
            this.find(".jsPanel-btn-minimize").remove();
            this.find(".jsPanel-btn-maximize").remove();
        }
    });
});  


// INFRASTRUCTURE
// toggle-roads (Layer)
$("#info-roads_fd_08").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-roads").trigger("click");
}); 

// info-railroads_fd_08
$("#info-railroads_fd_08").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-railroads").trigger("click");
}); 

// info-pipelines_fd_08
$("#info-pipelines_fd_08").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-pipelines").trigger("click");
}); 

// info-waterways_fd_08
$("#info-waterways_fd_08").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-waterways").trigger("click");
}); 

// info-airports_fd_08
$("#info-airports_fd_08").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-airports").trigger("click");
}); 

// info-refineries_refining_fd_08
$("#info-refineries_refining_fd_08").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-refineries_capacity").trigger("click");
}); 


