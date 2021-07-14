/*
 * All panels, controls and other issues related to: SUGARCANE (RESIDUES)
 *
 * 
 */

// MENU: Panel activation
$("#atj-spk-sugarcane-residues").click(function(e) {
    e.preventDefault();

    reset_actived (e);
    $("#panel-support-maps").css("display", "none");
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
}); 


/*
 *  SUGARCANE BAGASSE LAYERS (from GeoServer) and variables
 */

var l_sugarcane_bagasse = 'DBMS:bagasse_potential_availability_agroicone';            // sample



/*
 *  SUGARCANE LAYERS
 */

// Sugarcane residues (Layer)
$("#toggle-sugarcane_bagasse").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_sugarcane_bagasse;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_aptidao_eucalipto, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        $("#legend-sugarcane_bagasse").css("display", "block");
    } else {
        $("#legend-sugarcane_bagasse").css("display", "none");
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
        contentSize: {width: 500, height: 300},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'>Sugarcane bagasse</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> The potential availability of bagasse was calculated based on milling data per State from UNICA (Brazilian Sugarcane Industry Association), considering the yields and availability mentioned above. These data were spatialized based on the milling capacity from the Nova Cana database of sugarcane/ethanol mills in Brazil. The milling data from 70 plants certified before July 16th of 2020 by RenovaBio were also used, in order to calibrate the distribution of bagasse based on idle rates, allowing this distribution per municipality to be more accurate. The considered rate of bagasse production from sugarcane processing  was of 280 kg(bagasse)(wb)/t(sugarcane)(on wet basis, 50% of moisture). Also, the bagasse surplus would be of 35% of the bagasse from sugarcane processed, while the remaining amount (65%) would supply the energy demand of the ethanol mill. </p>" +
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


