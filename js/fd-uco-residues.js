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

var l_aptidao_eucalipto = 'DBMS:pastagem_eucalipto';            // sample



/*
 *  UCO LAYERS
 */





/*
 * JANELAS INFO - MAPAS
 */



