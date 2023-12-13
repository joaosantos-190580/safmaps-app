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
 *  SUGARCANE STRAW LAYERS (from GeoServer) and variables
 */

var l_sugarcane_straw = 'DBMS:straw_potential_availability';            // sample



/*
 *  SUGARCANE LAYERS
 */

// Sugarcane straw (Layer)
$("#toggle-sugarcane_straw").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-sugarcane_bagasse').prop('checked', false);
    $('#toggle-sugarcane_residues').prop('checked', false);
    //reset_all_legends();
    removeLayers_group("gp_1");

    options['layers'] = l_sugarcane_straw;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_aptidao_eucalipto, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        $("#legend-sugarcane_bagasse").css("display", "none");
        $("#legend-sugarcane_residues").css("display", "none");
        $("#legend-sugarcane_straw").css("display", "block");        
        reorderLayers();
    } else {
        $("#legend-sugarcane_straw").css("display", "none");
        removeLayer(l_sugarcane_straw);   
    }
});

// Pop-up de alerta - Sugarcane straw (Layer)
$('#popper-sugarcane_straw').hover(function() {
    $( "#alert-sugarcane_straw" ).toggle();
});


/*
 * JANELAS INFO - MAPAS
 */

// Sugarcane Residues - INFO
// 
$("#info-sugarcane_straw").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 600, height: 350},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'>Sugarcane straw</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b>  The potential availability of straw was calculated based on data from IBGE/PAM on municipal sugarcane yield and planted area. Assuming the adoption of best practices in terms of planting and harvesting, the straw production considered was : 140 kg(db)/t(sugarcane) and that : 7.5 t(straw)(db)/ha(sugarcane) would remain on the field for agronomic purposes. The data were spatialized by municipality, according to the sugarcane planted areas reported by IBGE. </p>" +
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


