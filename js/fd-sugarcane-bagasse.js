/*
 * All panels, controls and other issues related to: SUGARCANE (RESIDUES)
 *
 * 
 */

// MENU: Panel activation
$("#atj-spk-sugarcane-residues").click(function(e) {
    e.preventDefault();

    reset_actived (e);
    $("#atj-spk-sugarcane-group").addClass("active");
    $("#atj-spk-sugarcane-group").removeClass("inactive");
        
    $("#panel-support-maps").css("display", "none");
    $("#panel-corsia").css("display", "none");
    $("#panel-eucalipto").css("display", "none");
    $("#panel-eucalipto-residues").css("display", "none");
    $("#panel-soja").css("display", "none");
    $("#panel-macauba").css("display", "none");
    $("#panel-palma").css("display", "none");
    $("#panel-sugarcane").css("display", "none");	
    $("#panel-corn").css("display", "none");		
    $("#panel-tallow").css("display", "none");		
    $("#panel-off_gases").css("display", "none");	
    $("#panel-uco-residues").css("display", "none");		
    $("#empty").css("display", "none");
    $("#panel-sugarcane-residues").css("display", "block");
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
    group_1 = ['DBMS:bagasse_potential_availability_agroicone','DBMS:sugarcane_residues_agroicone','DBMS:straw_potential_availability'];
    group_2 = ['DBMS:main_roads','DBMS:railroads_fd_stock','DBMS:pipelines_fd_stock','DBMS:ethanol_pipelines_fd_stock','DBMS:waterways_fd_stock'];
    group_3 = ['DBMS:airports_fd_stock','DBMS:refineries_refining_fd_stock','DBMS:ethanol_output_fd_stock','DBMS:ethanol_pipelines_terminals_fd_stock'];
        
}); 


/*
 *  SUGARCANE BAGASSE LAYERS (from GeoServer) and variables
 */

var l_sugarcane_bagasse = 'DBMS:bagasse_potential_availability_agroicone';            // sample



/*
 *  SUGARCANE LAYERS
 */

// Sugarcane bagasse (Layer)
$("#toggle-sugarcane_bagasse").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-sugarcane_residues').prop('checked', false);
    $('#toggle-sugarcane_straw').prop('checked', false);
    //reset_all_legends();
    removeLayers_group("gp_1");

    options['layers'] = l_sugarcane_bagasse;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_aptidao_eucalipto, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        $("#legend-sugarcane_residues").css("display", "none");
        $("#legend-sugarcane_straw").css("display", "none");
        $("#legend-sugarcane_bagasse").css("display", "block");
        reorderLayers();
    } else {
        $("#legend-sugarcane_bagasse").css("display", "none");
        removeLayer(l_sugarcane_bagasse);        
    }
});

// Pop-up de alerta - Sugarcane bagasse (Layer)
$('#popper-sugarcane_bagasse').hover(function() {
    $( "#alert-sugarcane_bagasse" ).toggle();
});

// INFRASTRUCTURE
// toggle-roads (Layer)
$("#toggle-roads_fd_05a").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-railroads_fd_05a').prop('checked', false);
    $('#toggle-pipelines_fd_05a').prop('checked', false);
    $('#toggle-ethanol_pipelines_fd_05a').prop('checked', false);
    $('#toggle-waterways_fd_05a').prop('checked', false);
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
$("#toggle-railroads_fd_05a").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-roads_fd_05a').prop('checked', false);
    $('#toggle-pipelines_fd_05a').prop('checked', false);
    $('#toggle-ethanol_pipelines_fd_05a').prop('checked', false);
    $('#toggle-waterways_fd_05a').prop('checked', false);
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
$("#toggle-pipelines_fd_05a").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-roads_fd_05a').prop('checked', false);
    $('#toggle-railroads_fd_05a').prop('checked', false);
    $('#toggle-ethanol_pipelines_fd_05a').prop('checked', false);
    $('#toggle-waterways_fd_05a').prop('checked', false);
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
$("#toggle-ethanol_pipelines_fd_05a").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-roads_fd_05a').prop('checked', false);
    $('#toggle-railroads_fd_05a').prop('checked', false);
    $('#toggle-pipelines_fd_05a').prop('checked', false);
    $('#toggle-waterways_fd_05a').prop('checked', false);
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
$("#toggle-waterways_fd_05a").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-roads_fd_05a').prop('checked', false);
    $('#toggle-railroads_fd_05a').prop('checked', false);
    $('#toggle-pipelines_fd_05a').prop('checked', false);
    $('#toggle-ethanol_pipelines_fd_05a').prop('checked', false);
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
$("#toggle-airports_fd_05a").on('change', function(){
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
$("#toggle-refineries_refining_fd_05a").on('change', function(){
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

// toggle-ethanol_distilleries_fd_05a (Layer)
$("#toggle-ethanol_distilleries_fd_05a").on('change', function(){
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

// toggle-ethanol_terminals_fd_05a (Layer)
$("#toggle-ethanol_terminals_fd_05a").on('change', function(){
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

// Sugarcane Residues - INFO
// 
$("#info-sugarcane_bagasse").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 700, height: 400},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'>Sugarcane bagasse</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> The potential availability of bagasse was calculated based on milling data per State from UNICA (Brazilian Sugarcane Industry Association), considering the yields and availability mentioned above. These data were spatialized based on the milling capacity from the Nova Cana database of sugarcane/ethanol mills in Brazil. The milling data from 70 plants certified before July 16th of 2020 by RenovaBio were also used, in order to calibrate the distribution of bagasse based on idle rates, allowing this distribution per municipality to be more accurate. The considered rate of bagasse production from sugarcane processing  was of 280 kg(bagasse)(wb)/t(sugarcane)(on wet basis, 50% of moisture). Also, the bagasse surplus would be of 35% of the bagasse from sugarcane processed, while the remaining amount (65%) would supply the energy demand of the ethanol mill. </p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> SAFmaps (2021)" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://dx.doi.org/10.17632/sd54hytf4h.1'>Download page</a></p>" +
                                "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> The entire Brazilian territory" +
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


