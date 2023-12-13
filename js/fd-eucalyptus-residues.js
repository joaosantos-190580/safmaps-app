/*
 * All panels, controls and other issues related to: EUCALYPTUS (RESIDUES)
 *
 * 
 */

// MENU: Panel activation
$("#ft-spk-residues").click(function(e) {
    e.preventDefault();

    reset_actived (e);
    $("#ft-spk-group").addClass("active");
    $("#ft-spk-group").removeClass("inactive");

    $("#panel-support-maps").css("display", "none");
    $("#panel-corsia").css("display", "none");
    $("#panel-eucalipto").css("display", "none");
    $("#panel-soja").css("display", "none");
    $("#panel-macauba").css("display", "none");
    $("#panel-palma").css("display", "none");
    $("#panel-sugarcane").css("display", "none");	
    $("#panel-sugarcane-residues").css("display", "none");
    $("#panel-corn").css("display", "none");		
    $("#panel-tallow").css("display", "none");		
    $("#panel-off_gases").css("display", "none");	
    $("#panel-uco-residues").css("display", "none");		
    $("#empty").css("display", "none");
    $("#panel-eucalipto-residues").css("display", "block");
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
    group_1 = ['DBMS:eucalyptus_residue_agroicone'];
    group_2 = ['DBMS:main_roads','DBMS:railroads_fd_stock','DBMS:pipelines_fd_stock','DBMS:ethanol_pipelines_fd_stock','DBMS:waterways_fd_stock'];
    group_3 = ['DBMS:airports_fd_stock','DBMS:refineries_refining_fd_stock','DBMS:ethanol_output_fd_stock','DBMS:ethanol_pipelines_terminals_fd_stock'];
    
}); 


/*
 *  EUCALYPTUS LAYERS (from GeoServer) and variables
 */

var l_aptidao_eucalipto_residues = 'DBMS:eucalyptus_residue_agroicone';            // sample
var l_ethanol_pipelines_fd_stock_src = 'DBMS:ethanol_pipelines_fd_stock';
var l_ethanol_output_fd_stock_src = 'DBMS:ethanol_output_fd_stock';
var l_ethanol_pipelines_terminals_fd_stock_src = 'DBMS:ethanol_pipelines_terminals_fd_stock';


/*
 *  EUCALYPTUS LAYERS
 */

// BASE MAPS
// Eucalyptus residues (Layer)
$("#toggle-aptidao_eucalipto_residues").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    //reset_all_legends();
    removeLayers_group("gp_1");

    options['layers'] = l_aptidao_eucalipto_residues;

    if($(this).prop("checked") == true) {
       
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        $("#legend-aptidao_eucalipto_residues").css("display", "block");
        reorderLayers();
    } else {
        $("#legend-aptidao_eucalipto_residues").css("display", "none");
        removeLayer(l_aptidao_eucalipto_residues);
    }
});

// Pop-up de alerta - Eucalyptus residues (Layer)
$('#popper-aptidao_eucalipto_residues').hover(function() {
    $( "#alert-aptidao_eucalipto_residues" ).toggle();
});


// INFRASTRUCTURE
// toggle-roads (Layer)
$("#toggle-roads_fd_01a").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-railroads_fd_01a').prop('checked', false);
    $('#toggle-pipelines_fd_01a').prop('checked', false);
    $('#toggle-ethanol_pipelines_fd_01a').prop('checked', false);
    $('#toggle-waterways_fd_01a').prop('checked', false);
    //reset_all_legends();
    removeLayers_group("gp_2");

    options['layers'] = l_main_roads_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_roads_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);  
        map.addLayer(prov);

        $("#legend-railroads_fd_stock").css("display", "none");
        $("#legend-pipelines_fd_stock").css("display", "none");
        $("#legend-ethanol_pipelines_fd_stock").css("display", "none");
        $("#legend-waterways_fd_stock").css("display", "none");
        $("#legend-main_roads").css("display", "block");
        reorderLayers();
    } else {
        $("#legend-main_roads").css("display", "none");
        removeLayer(l_main_roads_src);
    }
});

// toggle-railroads (Layer)
$("#toggle-railroads_fd_01a").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-roads_fd_01a').prop('checked', false);
    $('#toggle-pipelines_fd_01a').prop('checked', false);
    $('#toggle-ethanol_pipelines_fd_01a').prop('checked', false);
    $('#toggle-waterways_fd_01a').prop('checked', false);
    //reset_all_legends();
    removeLayers_group("gp_2");

    options['layers'] = l_railroads_fd_stock_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_railroads_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);  
        map.addLayer(prov);

        $("#legend-main_roads").css("display", "none");
        $("#legend-pipelines_fd_stock").css("display", "none");
        $("#legend-ethanol_pipelines_fd_stock").css("display", "none");
        $("#legend-waterways_fd_stock").css("display", "none");
        $("#legend-railroads_fd_stock").css("display", "block");
        reorderLayers();
    } else {
        $("#legend-railroads_fd_stock").css("display", "none");
        removeLayer(l_railroads_fd_stock_src);
    }
});

// toggle-pipelines (Layer)
$("#toggle-pipelines_fd_01a").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-roads_fd_01a').prop('checked', false);
    $('#toggle-railroads_fd_01a').prop('checked', false);
    $('#toggle-ethanol_pipelines_fd_01a').prop('checked', false);
    $('#toggle-waterways_fd_01a').prop('checked', false);
    //reset_all_legends();
    removeLayers_group("gp_2");

    options['layers'] = l_pipelines_fd_stock_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_pipelines_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);  
        map.addLayer(prov);

        $("#legend-main_roads").css("display", "none");
        $("#legend-railroads_fd_stock").css("display", "none");
        $("#legend-ethanol_pipelines_fd_stock").css("display", "none");
        $("#legend-waterways_fd_stock").css("display", "none");
        $("#legend-pipelines_fd_stock").css("display", "block");
        reorderLayers();
    } else {
        $("#legend-pipelines_fd_stock").css("display", "none");
        removeLayer(l_pipelines_fd_stock_src);
    }
});

// toggle-ethanol_pipelines (Layer)
$("#toggle-ethanol_pipelines_fd_01a").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-roads_fd_01a').prop('checked', false);
    $('#toggle-railroads_fd_01a').prop('checked', false);
    $('#toggle-pipelines_fd_01a').prop('checked', false);
    $('#toggle-waterways_fd_01a').prop('checked', false);
    //reset_all_legends();
    removeLayers_group("gp_2");

    options['layers'] = l_ethanol_pipelines_fd_stock_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_refineries_refining_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        $("#legend-main_roads").css("display", "none");
        $("#legend-railroads_fd_stock").css("display", "none");
        $("#legend-pipelines_fd_stock").css("display", "none");
        $("#legend-waterways_fd_stock").css("display", "none");
        $("#legend-ethanol_pipelines_fd_stock").css("display", "block");
        reorderLayers();
    } else {
        $("#legend-ethanol_pipelines_fd_stock").css("display", "none");
        removeLayer(l_ethanol_pipelines_fd_stock_src);
    }
});

// toggle-waterways (Layer)
$("#toggle-waterways_fd_01a").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-roads_fd_01a').prop('checked', false);
    $('#toggle-railroads_fd_01a').prop('checked', false);
    $('#toggle-pipelines_fd_01a').prop('checked', false);
    $('#toggle-ethanol_pipelines_fd_01a').prop('checked', false);
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
        $("#legend-ethanol_pipelines_fd_stock").css("display", "none");
        $("#legend-waterways_fd_stock").css("display", "block");
        reorderLayers();
    } else {
        $("#legend-waterways_fd_stock").css("display", "none");
        removeLayer(l_waterways_fd_stock_src);
    }
});

// Complementary information
// toggle-airports (Layer)
$("#toggle-airports_fd_01a").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    //reset_all_legends();
    //removeLayers();

    options['layers'] = l_airports_fd_stock_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_airports_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);
                
        $("#legend-airports_fd_stock").css("display", "block");
    } else {
        $("#legend-airports_fd_stock").css("display", "none");
        removeLayer(l_airports_fd_stock_src);
    }
});

// toggle-refineries_refining (Layer)
$("#toggle-refineries_refining_fd_01a").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    //reset_all_legends();
    //removeLayers();

    options['layers'] = l_refineries_refining_fd_stock_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_refineries_refining_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);
                
        $("#legend-refineries_refining_fd_stock").css("display", "block");
    } else {
        $("#legend-refineries_refining_fd_stock").css("display", "none");
        removeLayer(l_refineries_refining_fd_stock_src);
    }
});

// toggle-ethanol_distilleries_fd_01a (Layer)
$("#toggle-ethanol_distilleries_fd_01a").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    //reset_all_legends();
    //removeLayers();

    options['layers'] = l_ethanol_output_fd_stock_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_refineries_refining_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);
                
        $("#legend-ethanol_output_fd_stock").css("display", "block");
    } else {
        $("#legend-ethanol_output_fd_stock").css("display", "none");
        removeLayer(l_ethanol_output_fd_stock_src);
    }
});

// toggle-ethanol_terminals_fd_01a (Layer)
$("#toggle-ethanol_terminals_fd_01a").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    //reset_all_legends();
    //removeLayers();

    options['layers'] = l_ethanol_pipelines_terminals_fd_stock_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_refineries_refining_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);
                
        $("#legend-ethanol_pipelines_terminals_fd_stock").css("display", "block");
    } else {
        $("#legend-ethanol_pipelines_terminals_fd_stock").css("display", "none");
        removeLayer(l_ethanol_pipelines_terminals_fd_stock_src);
    }
});


/*
 * JANELAS INFO - MAPAS
 */

// Eucalipto Residues - INFO
// Aptidão
$("#info-eucalipto_residues").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 600, height: 300},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'>Eucalyptus residues</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> The planted eucalyptus yield was calculated based on the average productivity of each municipality multiplied by the area of planted eucalyptus in each municipality in 2018. For residues potential, it was assumed a rate of 0.167 t(residue)/m³(eucalyptus) over the potential annual production. Finally, it was considered that 50% of this total amount would be collected from field..</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> SAFmaps (2021)" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://dx.doi.org/10.17632/r55dwty7wk.1'>Download page</a></p>" +
                                "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Thirteen Brazilian states considered in the project" +
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
$("#info-roads_fd_01a").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-roads").trigger("click");
}); 

// info-railroads_fd_01a
$("#info-railroads_fd_01a").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-railroads").trigger("click");
}); 

// info-pipelines_fd_01a
$("#info-pipelines_fd_01a").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-pipelines").trigger("click");
}); 

// info-ethanol_pipelines_fd_01a
$("#info-ethanol_pipelines_fd_01a").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-ethanol_pipelines").trigger("click");
}); 

// info-waterways_fd_01a
$("#info-waterways_fd_01a").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-waterways").trigger("click");
}); 

// info-airports_fd_01a
$("#info-airports_fd_01a").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-airports").trigger("click");
}); 

// info-refineries_refining_fd_01a
$("#info-refineries_refining_fd_01a").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-refineries_capacity").trigger("click");
}); 

// info-ethanol_distilleries_fd_01a
$("#info-ethanol_distilleries_fd_01a").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-ethanol_milling").trigger("click");
}); 

// info-ethanol_terminals_fd_01a
$("#info-ethanol_terminals_fd_01a").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-ethanol_pipelines_terminals").trigger("click");
}); 


