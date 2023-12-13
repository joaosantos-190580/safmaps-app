/*
 * All panels, controls and other issues related to: TALLOW
 *
 * 
 */

// MENU: Panel activation
$("#tab-tallow-maps").click(function(e) {
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
    $("#panel-off_gases").css("display", "none");	
    $("#panel-uco-residues").css("display", "none");		
    $("#empty").css("display", "none");
    $("#panel-tallow").css("display", "block");		
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
    group_1 = ['DBMS:cattle_herd','DBMS:beef_tallow','DBMS:beef_tallow_potential_agroicone'];
    group_2 = ['DBMS:main_roads','DBMS:railroads_fd_stock','DBMS:pipelines_fd_stock','DBMS:waterways_fd_stock'];
    group_3 = ['DBMS:abatedouros','DBMS:airports_fd_stock','DBMS:refineries_refining_fd_stock'];

}); 


/*
 *  TALLOW LAYERS (from GeoServer)
 */

var l_cattle_herd = 'DBMS:cattle_herd';
var l_abatedouros = 'DBMS:abatedouros';
var l_beef_tallow = 'DBMS:beef_tallow';
var l_beef_tallow_residues = 'DBMS:beef_tallow_potential_agroicone';


/*
 *  TALLOW LAYERS
 */
// BASE MAPS
// Cattle herd (Layer)
$("#toggle-cattle_herd").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-beef_tallow').prop('checked', false);
    $('#toggle-beef_tallow_residues').prop('checked', false);
    //reset_all_legends();
    removeLayers_group("gp_1");

    options['layers'] = l_cattle_herd;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_cattle_herd, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);    
        map.addLayer(prov);

        $("#legend-beef_tallow").css("display", "none");
        $("#legend-beef_tallow_residues").css("display", "none");
        $("#legend-cattle_herd").css("display", "block");
        reorderLayers();
    } else {
        $("#legend-cattle_herd").css("display", "none");
        removeLayer(l_cattle_herd);
    }
});

// Beef tallow estimated (Layer)
$("#toggle-beef_tallow").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-cattle_herd').prop('checked', false);
    $('#toggle-beef_tallow_residues').prop('checked', false);
    //reset_all_legends();
    removeLayers_group("gp_1");

    options['layers'] = l_beef_tallow;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_beef_tallow, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);    
        map.addLayer(prov);

        $("#legend-cattle_herd").css("display", "none");
        $("#legend-beef_tallow_residues").css("display", "none");
        $("#legend-beef_tallow").css("display", "block");
		reorderLayers();
    } else {
        $("#legend-beef_tallow").css("display", "none");
        removeLayer(l_beef_tallow);
    }
});

// Pop-up de alerta - Beef tallow estimated (Layer)
$('#popper-beef_tallow').hover(function() {
    $( "#alert-beef_tallow" ).toggle();
});

// Beef tallow - residues (Layer)
$("#toggle-beef_tallow_residues").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-cattle_herd').prop('checked', false);
    $('#toggle-beef_tallow').prop('checked', false);
    //reset_all_legends();
    removeLayers_group("gp_1");

    options['layers'] = l_beef_tallow_residues;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_beef_tallow, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);    
        map.addLayer(prov);

        $("#legend-cattle_herd").css("display", "none");
        $("#legend-beef_tallow").css("display", "none");
        $("#legend-beef_tallow_residues").css("display", "block");
        reorderLayers();
    } else {
        $("#legend-beef_tallow_residues").css("display", "none");
        removeLayer(l_beef_tallow_residues);
    }
});

// Pop-up de alerta - Beef tallow - residues (Layer)
$('#popper-beef_tallow_residues').hover(function() {
    $( "#alert-beef_tallow_residues" ).toggle();
});

// INFRASTRUCTURE
// toggle-roads (Layer)
$("#toggle-roads_fd_07").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-railroads_fd_07').prop('checked', false);
    $('#toggle-pipelines_fd_07').prop('checked', false);
    $('#toggle-waterways_fd_07').prop('checked', false);
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
$("#toggle-railroads_fd_07").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-roads_fd_07').prop('checked', false);
    $('#toggle-pipelines_fd_07').prop('checked', false);
    $('#toggle-waterways_fd_07').prop('checked', false);
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
$("#toggle-pipelines_fd_07").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-roads_fd_07').prop('checked', false);
    $('#toggle-railroads_fd_07').prop('checked', false);
    $('#toggle-waterways_fd_07').prop('checked', false);
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
$("#toggle-waterways_fd_07").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-roads_fd_07').prop('checked', false);
    $('#toggle-railroads_fd_07').prop('checked', false);
    $('#toggle-pipelines_fd_07').prop('checked', false);
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
// Slaughterhouse (Layer)
$("#toggle-abatedouros").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    //reset_all_legends();
    //removeLayers();

    options['layers'] = l_abatedouros;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_abatedouros, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);    
        map.addLayer(prov);

        $("#legend-abatedouros").css("display", "block");
    } else {
        $("#legend-abatedouros").css("display", "none");
        removeLayer(l_abatedouros);
    }
});

// toggle-airports (Layer)
$("#toggle-airports_fd_07").on('change', function(){
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
$("#toggle-refineries_refining_fd_07").on('change', function(){
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


/*
 * JANELAS INFO - MAPAS
 */

// Tallow - INFO
// Cattle herd
$("#info-cattle_herd").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 500, height: 250},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Cattle herd</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Distribution of cattle herd, in 2018, by municipality</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> IBGE - Pesquisa da Pecuária Municipal (2020)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='https://sidra.ibge.gov.br/tabela/3939'>Download page</a></p>" +
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

// Estimated (26 municipalities)
$("#info-beef_tallow").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 520, height: 370},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Estimated beef tallow availability</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Municipalities (26) with estimated beef tallow availability equal to or larger than 5,000 t.year-1, in 2018. Those municipalities were selected for the case study (HEFA-SPK - combined supply). " +
                                "Beef tallow availability was estimated by Agroicone in the context of the project Mapping Feedstocks Availability for Sustainable Aviation Fuels Production in Brazil, with the support of the SAFmaps team.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Agroicone (2021)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://dx.doi.org/10.17632/ynzwvkgcsc.1'>Download page</a></p>" +
                                "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Six states suitable for corn as second crop (GO, MT, MS, MG, PR, SP)</p>" +
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

// By municipality
$("#info-beef_tallow_residues").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 520, height: 370},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Beef tallow</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> For the beef tallow estimative were considered only slaughters with federal inspection (SIF). The values ​​of carcass weight slaughtered in each State were converted to tallow, using a rate of 0.088 t(beef tallow)/t(carcass). Subsequently, this data was allocated to municipalities that had at least one slaughterhouse with federal inspection, using as a criterion the number of jobs related to cattle slaughter for each municipality. This data showed a correlation rate of 98%.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Agroicone (2021)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://dx.doi.org/10.17632/ynzwvkgcsc.1'>Download page</a></p>" +
                                "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> The entire Brazilian territory</p>" +
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
$("#info-roads_fd_07").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-roads").trigger("click");
}); 

// info-railroads_fd_07
$("#info-railroads_fd_07").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-railroads").trigger("click");
}); 

// info-pipelines_fd_07
$("#info-pipelines_fd_07").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-pipelines").trigger("click");
}); 

// info-waterways_fd_07
$("#info-waterways_fd_07").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-waterways").trigger("click");
}); 

// Abatedouros
$("#info-abatedouros").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 520, height: 300},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Slaughterhouses with SIF</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Slaughterhouses inspected by the Federal Inspection Service (SIF) in 2019, classified according to the slaughter capacity (heads/hour).</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Georreferenced information elaborated by SAFmaps (2020) based on MAPA (2019) and LAPIG/UFG (2017) database</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://dx.doi.org/10.17632/2zc8p9dgg9.2'>Download page</a></p>" +
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

// info-airports_fd_07
$("#info-airports_fd_07").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-airports").trigger("click");
}); 

// info-refineries_refining_fd_07
$("#info-refineries_refining_fd_07").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-refineries_capacity").trigger("click");
}); 

