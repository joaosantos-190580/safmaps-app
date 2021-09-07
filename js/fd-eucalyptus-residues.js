/*
 * All panels, controls and other issues related to: EUCALYPTUS (RESIDUES)
 *
 * 
 */

// MENU: Panel activation
$("#ft-spk-residues").click(function(e) {
    e.preventDefault();

    reset_actived_dropdown (e);
    $("#panel-support-maps").css("display", "none");
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
}); 


/*
 *  EUCALYPTUS LAYERS (from GeoServer) and variables
 */

var l_aptidao_eucalipto_residues = 'DBMS:eucalyptus_residue_agroicone';            // sample



/*
 *  EUCALYPTUS LAYERS
 */

// Eucalyptus residues (Layer)
$("#toggle-aptidao_eucalipto_residues").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_aptidao_eucalipto_residues;

    if($(this).prop("checked") == true) {
       
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        $("#legend-aptidao_eucalipto_residues").css("display", "block");
    } else {
        $("#legend-aptidao_eucalipto_residues").css("display", "none");
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

// Teste
$("#info-roads_fd_01a").click(function(e) {
    e.preventDefault();

    // Janela Info
    alert("Era aqui");
    //$("#info-roads").trigger("click");
}); 


