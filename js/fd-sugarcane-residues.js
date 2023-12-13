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
        
}); 


/*
 *  SUGARCANE LAYERS (from GeoServer) and variables
 */

var l_sugarcane_residues = 'DBMS:sugarcane_residues_agroicone';            // sample



/*
 *  SUGARCANE LAYERS
 */

// Sugarcane residues (Layer)
$("#toggle-sugarcane_residues").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-sugarcane_bagasse').prop('checked', false);
    $('#toggle-sugarcane_straw').prop('checked', false);
    //reset_all_legends();
    removeLayers_group("gp_1");

    options['layers'] = l_sugarcane_residues;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_aptidao_eucalipto, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        $("#legend-sugarcane_straw").css("display", "none");
        $("#legend-sugarcane_bagasse").css("display", "none");
        $("#legend-sugarcane_residues").css("display", "block");
        reorderLayers();
    } else {
        $("#legend-sugarcane_residues").css("display", "none");
        removeLayer(l_sugarcane_residues);   
    }
});

// Pop-up de alerta - Sugarcane residues (Layer)
$('#popper-sugarcane_residues').hover(function() {
    $( "#alert-sugarcane_residues" ).toggle();
});



/*
 * JANELAS INFO - MAPAS
 */

// Sugarcane Residues - INFO
// 
$("#info-sugarcane_residues").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 500, height: 300},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'>Sugarcane total residues</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> The total sugarcane residues potential availability considered was the simple sum of the sugarcane bagasse and straw in dry basis.</p>" +
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


// INFRASTRUCTURE
// toggle-roads (Layer)
$("#info-roads_fd_05a").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-roads").trigger("click");
}); 

// info-railroads_fd_05a
$("#info-railroads_fd_05a").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-railroads").trigger("click");
}); 

// info-pipelines_fd_05a
$("#info-pipelines_fd_05a").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-pipelines").trigger("click");
}); 

// info-ethanol_pipelines_fd_05a
$("#info-ethanol_pipelines_fd_05a").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-ethanol_pipelines").trigger("click");
}); 

// info-waterways_fd_05a
$("#info-waterways_fd_05a").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-waterways").trigger("click");
}); 

// info-airports_fd_05a
$("#info-airports_fd_05a").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-airports").trigger("click");
}); 

// info-refineries_refining_fd_05a
$("#info-refineries_refining_fd_05a").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-refineries_capacity").trigger("click");
}); 

// info-ethanol_distilleries_fd_05a
$("#info-ethanol_distilleries_fd_05a").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-ethanol_milling").trigger("click");
}); 

// info-ethanol_terminals_fd_05a
$("#info-ethanol_terminals_fd_05a").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-ethanol_pipelines_terminals").trigger("click");
}); 


