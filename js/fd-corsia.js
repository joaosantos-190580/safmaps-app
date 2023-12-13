/*
 * All panels, controls and other issues related to: CORSIA Sustainability Criteria
 *
 * 
 */

// MENU: Panel activation
$("#corsia").click(function(e) {
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
    $("#panel-uco-residues").css("display", "none");		
    $("#empty").css("display", "none");
    $("#panel-corsia").css("display", "block");
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

    // Get the element with id="defaultOpen" and click on it
    document.getElementById("defaultOpenCO").click();
    
}); 

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    // TabContent for Infraestructure
    tabcontent = document.getElementsByClassName("tabcontent-inf");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}


