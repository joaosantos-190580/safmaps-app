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
}); 


/*
 *  TALLOW LAYERS (from GeoServer)
 */

var l_cattle_herd = 'DBMS:cattle_herd';
var l_abatedouros = 'DBMS:abatedouros';
var l_beef_tallow = 'DBMS:beef_tallow';


/*
 *  TALLOW LAYERS
 */

// Tallow (Layer)
$("#toggle-cattle_herd").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_cattle_herd;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_cattle_herd, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);    
        map.addLayer(prov);

        $("#legend-cattle_herd").css("display", "block");
    } else {
        $("#legend-cattle_herd").css("display", "none");
    }
});

$("#toggle-abatedouros").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_abatedouros;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_abatedouros, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);    
        map.addLayer(prov);

        $("#legend-abatedouros").css("display", "block");
    } else {
        $("#legend-abatedouros").css("display", "none");
    }
});

$("#toggle-beef_tallow").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_beef_tallow;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_beef_tallow, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);    
        map.addLayer(prov);

        $("#legend-beef_tallow").css("display", "block");
    } else {
        $("#legend-beef_tallow").css("display", "none");
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

// Custos
$("#info-beef_tallow").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 520, height: 320},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Estimated beef tallow availability</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Municipalities (26) with estimated beef tallow availability equal to or larger than 5,000 t.year-1, in 2018. Those municipalities were selected for the case study (HEFA-SPK - combined supply). " +
                                "Beef tallow availability was estimated by Agroicone in the context of the project Mapping Feedstocks Availability for Sustainable Aviation Fuels Production in Brazil, with the support of the SAFmaps team.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Agroicone (2021)</p>" +
                            //"<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                //"<a target='_blank' href=''>Download page</a></p>" +
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




