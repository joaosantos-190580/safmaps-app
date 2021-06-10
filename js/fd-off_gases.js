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
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();

    options['layers'] = l_steel_plants;

    if($(this).prop("checked") == true) {
        removeLayers(true);

        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_steel_plants, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);    
        map.addLayer(prov);

        $("#legend-off_gases").css("display", "block");
    } else {
        // Nos caso de layers que mudam a opacidade do fundo com labels, ao desativar o controle a opacidade
        // deve retornar ao normal (1)
        removeLayers();			  
        $("#legend-off_gases").css("display", "none");
    }
});

$("#toggle-flaring").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();

    options['layers'] = l_flaring;

    if($(this).prop("checked") == true) {
        removeLayers(true);

        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_flaring, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);    
        map.addLayer(prov);

        $("#legend-flaring").css("display", "block");
    } else {
        // Nos caso de layers que mudam a opacidade do fundo com labels, ao desativar o controle a opacidade
        // deve retornar ao normal (1)
        removeLayers();
        $("#legend-flaring").css("display", "none");
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


