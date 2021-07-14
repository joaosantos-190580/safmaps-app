/*
 * All panels, controls and other issues related to: UCO (RESIDUES)
 *
 * 
 */

// MENU: Panel activation
$("#tab-uco-residues").click(function(e) {
    e.preventDefault();

    reset_actived (e);
    $("#panel-support-maps").css("display", "none");
    $("#panel-eucalipto").css("display", "none");
    $("#panel-eucalipto-residues").css("display", "none");
    $("#panel-soja").css("display", "none");
    $("#panel-macauba").css("display", "none");
    $("#panel-palma").css("display", "none");
    $("#panel-sugarcane").css("display", "none");	
    $("#panel-sugarcane-residues").css("display", "none");
    $("#panel-corn").css("display", "none");		
    $("#panel-tallow").css("display", "none");		
    $("#panel-off_gases").css("display", "none");		
    $("#empty").css("display", "none");
    $("#panel-uco-residues").css("display", "block");
    $("#legends").css("display", "block");
}); 


/*
 *  UCO LAYERS (from GeoServer) and variables
 */

var l_uco = 'DBMS:uco_potential_availability_agroicone';            // sample



/*
 *  UCO LAYERS
 */

// UCO (Layer)
$("#toggle-uco").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_uco;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_aptidao_eucalipto, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        $("#legend-uco").css("display", "block");
    } else {
        $("#legend-uco").css("display", "none");
    }
});






/*
 * JANELAS INFO - MAPAS
 */


// UCO - INFO
// 
$("#info-uco").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 500, height: 300},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'>UCO</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b>  Brazil does not have specific national regulation for UCO destination nor official information regarding the availability of used cooking oil. The assumptions for estimating the potential availability of this feedstock were based on information gathered from interviews with sector specialists, official databases, and literature reviews. The total potential availability is composed by a sum of two different uses: domestic (or households) and food services. The potential UCO from households was estimated based on the domestic consumption of vegetable oils, according to the Family Budget Survey (POF, acronym in Portuguese), conducted by IBGE (Brazilian Institute of Geography and Statistics), applying a rate of recovery of 35% and a collection rate of 10%. The potential UCO from food services was estimated based on a European study developed by GREENEA. Considering similarities with some European countries (UK, Portugal, Spain, Italy, Germany and France) related to the culinary and way of life, and the large incipient initiatives for UCO collection in Brazil, it was assumed that 50% of the recoverable UCO from households would correspond to the potential recoverable UCO from food services.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> SAFmaps (2021)" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href=''>Download page</a></p>" +
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





