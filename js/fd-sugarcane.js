/*
 * All panels, controls and other issues related to: SUGARCANE
 *
 * 
 */

// MENU: Panel activation
$("#atj-spk-sugarcane").click(function(e) {
    e.preventDefault();

    reset_actived (e);
    $("#panel-support-maps").css("display", "none");
    $("#panel-eucalipto").css("display", "none");
    $("#panel-eucalipto-residues").css("display", "none");
    $("#panel-soja").css("display", "none");
    $("#panel-macauba").css("display", "none");
    $("#panel-palma").css("display", "none");		
    $("#panel-sugarcane-residues").css("display", "none");
    $("#panel-corn").css("display", "none");		
    $("#panel-tallow").css("display", "none");		
    $("#panel-off_gases").css("display", "none");	
    $("#panel-uco-residues").css("display", "none");		
    $("#empty").css("display", "none");
    $("#panel-sugarcane").css("display", "block");	
    $("#legends").css("display", "block");		
});  


/*
 *  SUGARCANE LAYERS (from GeoServer) and variables
 */

var l_aptidao_cana = 'DBMS:aptidao_cana';
var l_custos_cana = 'DBMS:custos_cana';
var l_produtividade_cana = 'DBMS:produtividade_cana';

var curva_oferta_sugarcane_png = '', resultado_sugarcane_png = '', comparacao_sugarcane_png = '', result_panel_sugarcane = '';


/*
 *  SUGARCANE LAYERS
 */

// Sugarcane suitability (Layer)
$("#toggle-aptidao_cana").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_aptidao_cana;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_aptidao_cana, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        $("#legend-aptidao_cana").css("display", "block");
    } else {
        $("#legend-aptidao_cana").css("display", "none");
    }
});

// Sugarcane yield (Layer)
$("#toggle-produtividade_cana").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_produtividade_cana;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_produtividade_cana, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);    
        map.addLayer(prov);

        $("#legend-produtividade_cana").css("display", "block");
    } else {
        $("#legend-produtividade_cana").css("display", "none");
    }
});

// Cost of sugarcane production (Layer)
$("#toggle-custo_cana").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_custos_cana;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_custos_cana, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);    
        map.addLayer(prov);

        $("#legend-custo_cana").css("display", "block");
    } else {
        $("#legend-custo_cana").css("display", "none");
    }
});


/* 
 * CASE STUDY
 */

// Variaveis
var routeCana = '', feedstockCana = '', feedstockCana_valor = '';
var selecionadoCana = '', tipoInstalacaoSugarcane = '', tipoInstalacaoSugarcane_valor = '', capacidadeCana = '';
var capacidadeCana_valor = '';

var locationCana = '', productionCana = '', productionCana_valor = '';

var prataCana = '', cacuCana = '', paranaibaCana = '', pVenceslauCana = '';
var cstudy_cana = false;

// Selecao da rota
$("#sugarcaneRota").on('change', function(){
    routeCana = this.value;
});

// Selecao do feedstock
$("#sugarcaneFStock").on('change', function(){
    feedstockCana = this.value;

    if (feedstockCana === "1") {
        $("#tipoInstalacaoSugarcane_2").css("display", "none");
        $("#tipoInstalacaoSugarcane_1").css("display", "inline");
        feedstockCana_valor = 'Anhydrous ethanol from sugarcane';
    } else if (feedstockCana === "2") {
        $("#tipoInstalacaoSugarcane_1").css("display", "none");
        $("#tipoInstalacaoSugarcane_2").css("display", "inline");
        feedstockCana_valor = 'Anhydrous ethanol from sugarcane + corn';
    }			
});

// Seleção mapa de apoio		
$("#sugarcaneMaps").on('change', function(){
    console.debug(this.value);

    selecionadoCana = this.value;

    // Case Study Cana
    cstudy_cana = true;
    if (cstudy_eucalipto) {
        setFalse_cstudyEucalipto();
    }	

    // Sugarcane suitability
    if (selecionadoCana === "1") {
        $('input:checkbox').not(this).prop('checked', false);
        reset_all_legends();
        removeLayers();

        options['layers'] = l_aptidao_cana;
        //var aptidao_cana = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_aptidao_cana, format: 'image/png', transparent: true });
        var aptidao_cana = L.tileLayer.wms(url, options);
        map.addLayer(aptidao_cana);

        $("#legend-aptidao_cana").css("display", "block");
    // Costs of sugarcane production
    } else if (selecionadoCana === "3") {
        $('input:checkbox').not(this).prop('checked', false);
        reset_all_legends();
        removeLayers();

        options['layers'] = l_custos_cana;
        //var custos_cana= L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_custos_cana, format: 'image/png', transparent: true });
        var custos_cana= L.tileLayer.wms(url, options);
        map.addLayer(custos_cana);

        $("#legend-custo_cana").css("display", "block");
    // Sugarcane yield
    } else if (selecionadoCana === "2") {
        $('input:checkbox').not(this).prop('checked', false);
        reset_all_legends();
        removeLayers();

        options['layers'] = l_produtividade_cana;
        //var produtividade_cana = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_produtividade_cana, format: 'image/png', transparent: true });
        var produtividade_cana = L.tileLayer.wms(url, options);
        map.addLayer(produtividade_cana);

        $("#legend-produtividade_cana").css("display", "block");
    // Continue without maps
    } else if (selecionadoCana === "0") {
        $('input:checkbox').not(this).prop('checked', false);
        reset_all_legends();
        removeLayers();
    }
});		

$("#tipoInstalacaoSugarcane_1").on('change', function(){
    console.debug(this.value);

    tipoInstalacaoSugarcane = this.value;
    tipoInstalacaoSugarcane_valor = this.options[this.selectedIndex].text;

    if (tipoInstalacaoSugarcane == 3 || tipoInstalacaoSugarcane == 4) {
        $("#location_sugarcane").css("display", "inline-block");
    } else {
        $("#location_sugarcane").css("display", "none");
    }

    resetControls_cstudySoja();
    resetControlsCapacity_cstudySoja();
    capacitySelectionSugarcane();
});

$("#tipoInstalacaoSugarcane_2").on('change', function(){
    console.debug(this.value);

    tipoInstalacaoSugarcane = this.value;
    tipoInstalacaoSugarcane_valor = this.options[this.selectedIndex].text;

    if (tipoInstalacaoSugarcane == 3 || tipoInstalacaoSugarcane == 4) {
        $("#locationSugarcane").css("display", "inline-block");
    } else {
        $("#locationSugarcane").css("display", "none");
    }

    resetControls_cstudySoja();
    resetControlsCapacity_cstudySoja();
    capacitySelectionSugarcane();
});

$("#productionSugarcane").on('change', function(){
    console.debug(this.value);

    productionCana = this.value;
    productionCana_valor =  this.options[this.selectedIndex].text;

    if (capacidadeSugarcane != '' && capacidadeSugarcane != '--') {
        capacitySelectionSugarcane();
    }

    resetPoints_cstudySoja();

    // INSERIR FUNÇÃO PRA REMOVER MARCADOR
    if (productionCana != '' && productionCana != '--') {
        replanCana = L.marker(l_replan).bindPopup("REPLAN at <b>" + l_replan.toString() + "</b>").openPopup();
        map.addLayer(replanCana);

        //var revap_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_revap_buffer_50km, format: 'image/png', transparent: true });
        //map.addLayer(revap_buffer);
        
        // Posiciona o mapa na localização
        map.flyTo(l_replan, 6);

        $("#nomeMunicipioSugarcane").text("PAULÍNIA/SP");
        $("#nomeMunicipioSugarcane").css("color", "blue");
    } else {
        map.removeLayer(replanCana);

        $("#nomeMunicipioSugarcane").text(" ...");
        $("#nomeMunicipioSugarcane").css("color", "black");
    }
});

$("#locationSugarcane").on('change', function(){
    console.debug(this.value);

    locationSugarcane = this.value;

    // INSERIR FUNÇÃO PRA REMOVER MARCADOR

    // Prata (MG)
    if (locationSugarcane === "1") {
        resetLocations_cstudyCana();

        prataCana = L.marker(l_prata).bindPopup("Prata/MG at <b>" + l_prata.toString() + "</b>").openPopup();
        map.addLayer(prataCana);

        //var brumado_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_brumado_buffer_50km, format: 'image/png', transparent: true });
        //map.addLayer(brumado_buffer);
        
        // Posiciona o mapa na localização
        map.flyTo(l_prata, 6);
    // Caçú (GO)
    } else if (locationSugarcane === "2") {
        resetLocations_cstudyCana();

        cacuCana = L.marker(l_cacu).bindPopup("Caçú/GO at <b>" + l_cacu.toString() + "</b>").openPopup();
        map.addLayer(cacuCana);

        //var paranaiba_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_paranaiba_buffer_50km, format: 'image/png', transparent: true });
        //map.addLayer(paranaiba_buffer);
        
        // Posiciona o mapa na localização
        map.flyTo(l_cacu, 6);
    // Paranaíba (MS)
    } else if (locationSugarcane === "3") {
        resetLocations_cstudyCana();

        paranaibaCana = L.marker(l_paranaiba).bindPopup("Paranaíba/MS at <b>" + l_paranaiba.toString() + "</b>").openPopup();
        map.addLayer(paranaibaCana);

        //var paranaiba_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_paranaiba_buffer_50km, format: 'image/png', transparent: true });
        //map.addLayer(paranaiba_buffer);
        
        // Posiciona o mapa na localização
        map.flyTo(l_paranaiba, 6);
    // Presidente Venceslau (SP)
    } else if (locationSugarcane === "4") {
        resetLocations_cstudyCana();

        pVenceslauCana = L.marker(l_pVenceslau).bindPopup("Presidente Venceslau/SP at <b>" + l_pVenceslau.toString() + "</b>").openPopup();
        map.addLayer(pVenceslauCana);

        //var pVenceslau_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_pVenceslau_buffer_50km, format: 'image/png', transparent: true });
        //map.addLayer(pVenceslau_buffer);
        
        // Posiciona o mapa na localização
        map.flyTo(l_pVenceslau, 6);
    } else {
        resetLocations_cstudyCana();
    }
});

$("#capacidadeSugarcane").on('change', function(){
    console.debug(this.value);

    capacidadeCana = this.value;
    capacidadeCana_valor = this.options[this.selectedIndex].text;
    var inputReqCalc = $(this).find(':selected').data('input');

    if (capacidadeCana != '' && capacidadeCana != '--') {
        //Output
        var output_value = parseFloat(inputReqCalc) / 365 / 0.9;

        $("#inputReqSugarcane").text(Math.round(output_value) + " t.day-1 (biomass, dry basis)");
        $("#inputReqSugarcane").css("color", "blue");

        //Co-products
        var diesel_value = output_value * 0.791 * 0.5042 * 0.088;
        var naphtha_value = output_value * 0.791 * 0.5042 * 0.161;

        $("#dieselSugarcane").text("Diesel: " + parseInt(diesel_value) + "  t.day-1");
        $("#dieselSugarcane").css("color", "blue");

        $("#naphthaSugarcane").text("Naphtha: " + parseInt(naphtha_value) + "  t.day-1");
        $("#naphthaSugarcane").css("color", "blue");

        capacitySelectionSugarcane();
    } else {
        //Output
        $("#inputReqSugarcane").text("... t.day-1 (biomass, dry basis)");
        $("#inputReqSugarcane").css("color", "black");

        //Co-products
        $("#dieselSugarcane").text("Diesel");
        $("#dieselSugarcane").css("color", "black");

        $("#naphthaSugarcane").text("Naphtha");
        $("#naphthaSugarcane").css("color", "black");
    }

});

// Botao next (Step #1)
$("button.sugarcane-step1-next").on("click", function() {
    if ((routeCana === "" || routeCana === "--") && (feedstockCana === "" || feedstockCana === "--")) {
        $.alert({
            boxWidth: '40%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>Conversion technology</b> and the <b>Feedstock</b>.',
            useBootstrap: false
        });
    } else if (routeCana === "" || routeCana === "--") {
        $.alert({
            boxWidth: '30%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>Conversion technology</b>.',
            useBootstrap: false
        });
    } else if (feedstockCana === "" || feedstockCana === "--") {
        $.alert({
            boxWidth: '30%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>Feedstock</b>.',
            useBootstrap: false
        });
    } else {
        if (typeof(selecionadoCana) == 'undefined' || selecionadoCana != "Continue without maps" && cstudy_cana == false) {
            // Case Study Sugarcane
            cstudy_cana = true;
            if (cstudy_eucalipto) {
                setFalse_cstudyEucalipto();
            }
        }

        $("#sugarcane-step1").css("display", "none");
        $("#sugarcane-step2").css("display", "block");
    }
});

// Botao back (Step #2)
$("button.sugarcane-step2-back").on("click", function() {
    $("#sugarcane-step2").css("display", "none");
    $("#sugarcane-step1").css("display", "block");
});

// Botao calculate (Step #2)
$("button.sugarcane-step2-calc").on("click", function() {
    if ((tipoInstalacaoSugarcane === "" || tipoInstalacaoSugarcane === "--") 
            && (capacidadeCana === "" || capacidadeCana === "--")
            && (productionCana === "" || productionCana === "--")) {
        $.alert({
            boxWidth: '40%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>Case Study</b>, the <b>Ethanol Production</b> and the <b>Output capacity</b>.',
            useBootstrap: false
        });
    } else if (tipoInstalacaoSugarcane === "" || tipoInstalacaoSugarcane === "--") {
        $.alert({
            boxWidth: '30%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>Case Study</b>.',
            useBootstrap: false
        });
    } else if (productionCana === "" || productionCana === "--") {
        $.alert({
            boxWidth: '30%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>Ethanol Production</b>.',
            useBootstrap: false
        });
    } else if (capacidadeCana === "" || capacidadeCana === "--") {
        $.alert({
            boxWidth: '30%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>Output capacity</b>.',
            useBootstrap: false
        });
    } else {
        result_panel_sugarcane = "<div style='margin-left:10%; overflow-y:auto; height: 100%''>" +
                                "<div><h6 style='font-weight:bold'>Selection summary:</h6>" +
                                    "<div style='font-size: 0.9rem;padding-left:2rem;border-bottom: lightgray;border-bottom-width: 1px;border-bottom-style: solid;width: 86%;'>" +
                                        "<b>Conversion tecnology:</b> " + routeCana + 
                                        "<br/><b>Feedstock:</b> " + feedstockCana_valor +
                                        "<br/><b>Case Study:</b> " + tipoInstalacaoSugarcane_valor +
                                        "<br/><b>Ethanol production:</b> " + productionCana_valor +
                                        "<br/><b>Output capacity (t.day<sup>-1</sup>):</b> " + capacidadeCana_valor +
                                        "<br/><br/>" +
                                    "</div>" +
                                "</div><br/><br/>" +
                                "<div><h6 style='font-weight:bold'>Ethanol supply curve</h6>" +
                                    "<img src='images/cstudies_cana/" + curva_oferta_sugarcane_png + "' width='85%' ></div>" +
                                "<div style='margin-top:4rem; '>" +
                                    "<div><h6 style='font-weight:bold; margin-left:5px'>Data table</h6>" +
                                    "<img src='images/cstudies_cana/" + resultado_sugarcane_png + "' width='70%' ></div>" +
                                "<div style='margin-top:4rem; '>" +
                                    "<div><h6 style='font-weight:bold; margin-left:5px'>Comparison table</h6>" +
                                        "<img src='images/cstudies_cana/" + comparacao_sugarcane_png + "' width='70%'></div>" +
                                "<br/><br/>" +
                            "</div>"

        // REMOCAO DE LAYERS DO MAPA
        var layers = [];
        map.eachLayer(function(layer) {
            if( layer instanceof L.TileLayer )
                layers.push(layer);
        });
        layers.forEach(function(l) {
            if (l.options.layers === l_aptidao_soja
                || l.options.layers === l_custos_soja
                || l.options.layers === l_produtividade_soja) {
                l.remove();
            }
        });

        /*
            if (layers_avail.aptidao_eucalipto.visible) {
                layers_avail.aptidao_eucalipto.visible = false;
                removePanel(layers_avail.aptidao_eucalipto.id_panel);
                layers_avail.aptidao_eucalipto.id_panel = null;
            } else if (layers_avail.produtividade_eucalipto.visible) {
                layers_avail.produtividade_eucalipto.visible = false;
                removePanel(layers_avail.produtividade_eucalipto.id_panel);
                layers_avail.produtividade_eucalipto.id_panel = null;
            }			
        */					

        // ESPIGAO
        /*
            if (tipo_instalacao === "Greenfield") {
                options['layers'] = l_custos_espigao;
                //var custos_espigao = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_custos_espigao, format: 'image/png', transparent: true });
                var custos_espigao= L.tileLayer.wms(url, options);
                map.addLayer(custos_espigao);
            
            // REVAP
            } else if (tipo_instalacao === "Co-locating") {
                options['layers'] = l_custos_revap;
                //var custos_revap = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_custos_revap, format: 'image/png', transparent: true });
                var custos_revap = L.tileLayer.wms(url, options);
                map.addLayer(custos_revap);
            }
        */

        // ABRE LEGENDA
        /*
            if (layers_avail.custos_eucalipto.visible) {
                removePanelbyTitle(layers_avail.custos_eucalipto.title);
                layers_avail.custos_eucalipto.visible = false;
                layers_avail.custos_eucalipto.id_panel = null;
            }
            
            if (layers_avail.custos_eucalipto_transporte.visible 
                    && $("#jsPanel-" + layers_avail.custos_eucalipto_transporte.id_panel).length > 0) {
                $("#jsPanel-" + layers_avail.custos_eucalipto_transporte.id_panel).css("left", windowWidth / 1.5);
            } else {
                layers_avail.custos_eucalipto_transporte.visible = true;
                var current_layer = layers_avail.custos_eucalipto_transporte.title;
                legend_img_src = './images/legendas/custos_eucalipto_transporte.png';
                img_size = "height='85%' style='margin-left: 1.5em'";
                img_id = 'custos_eucalipto_transporte';
                leg_w = 152;
                leg_h = 230;
                leg_pos_l = windowWidth / 1.5;
                leg_pos_h = windowHeight - (leg_h + 50);
            }
        */

        // Janela Curva Oferta
        removePanelbyTitle("Results");
        $.jsPanel({
            theme:      '#93bd42',
            contentSize: {width: 1000, height: 600},
            headerTitle: "Results",
            //content:    "<div id='placeholder' style='width:90%;height:90%'></div>",
            content:	result_panel_sugarcane,
            callback:    function () {
                this.content.css("padding", "15px");
                
            }
        });
    }
});

// Reset controls
function resetLocations_cstudyCana() {
    // REMOVE MARCADORES
    if (prataCana != undefined && prataCana != '') {
        map.removeLayer(prataCana);
        prataCana = '';
    } else if (cacuCana != undefined && cacuCana != '') {
        map.removeLayer(cacuCana);
        cacuCana = '';
    } else if (paranaibaCana != undefined && paranaibaCana != '') {
        map.removeLayer(paranaibaCana);
        paranaibaCana = '';
    } else if (pVenceslauCana != undefined && pVenceslauCana != '') {
        map.removeLayer(pVenceslauCana);
        pVenceslauCana = '';
    }
}	

function capacitySelectionSugarcane() {
    if (tipoInstalacaoSugarcane === "1") {
        // Case 1 - REPLAN
        if (capacidadeCana === '1') {
            curva_oferta_sugarcane_png = 'Case1_REPLAN_182_fig.png';
            resultado_sugarcane_png = 'Case1_REPLAN_182_tabela.png';
        } else if (capacidadeCana === '2') {
            curva_oferta_sugarcane_png = 'Case1_REPLAN_334_fig.png';
            resultado_sugarcane_png = 'Case1_REPLAN_334_tabela.png';
        } else if (capacidadeCana === '3') {
            curva_oferta_sugarcane_png = 'Case1_REPLAN_465_fig.png';
            resultado_sugarcane_png = 'Case1_REPLAN_465_tabela.png';
        } else if (capacidadeCana === '4') {
            curva_oferta_sugarcane_png = 'Case1_REPLAN_930_fig.png';
            resultado_sugarcane_png = 'Case1_REPLAN_930_tabela.png';
        }
        comparacao_sugarcane_png = 'Case1_Comparacao.png';
    } else if (tipoInstalacaoSugarcane === "2") {
        // Case 2 - REPLAN
        if (capacidadeCana === '1') {
            curva_oferta_sugarcane_png = 'Case2_REPLAN_182_fig.png';
            resultado_sugarcane_png = 'Case2_REPLAN_182_tabela.png';
        } else if (capacidadeCana === '2') {
            curva_oferta_sugarcane_png = 'Case2_REPLAN_334_fig.png';
            resultado_sugarcane_png = 'Case2_REPLAN_334_tabela.png';
        } else if (capacidadeCana === '3') {
            curva_oferta_sugarcane_png = 'Case2_REPLAN_465_fig.png';
            resultado_sugarcane_png = 'Case2_REPLAN_465_tabela.png';
        } else if (capacidadeCana === '4') {
            curva_oferta_sugarcane_png = 'Case2_REPLAN_930_fig.png';
            resultado_sugarcane_png = 'Case2_REPLAN_930_tabela.png';
        }
        comparacao_sugarcane_png = 'Case2_Comparacao.png';
    } else if (tipoInstalacaoSugarcane === "3") {
        // Case 3a - REPLAN
        if (capacidadeCana === '1') {
            curva_oferta_sugarcane_png = 'Case3_Cana_REPLAN_182_fig.png';
            resultado_sugarcane_png = 'Case3_Cana_REPLAN_182_tabela.png';
        } else if (capacidadeCana === '2') {
            curva_oferta_sugarcane_png = 'Case3_Cana_REPLAN_334_fig.png';
            resultado_sugarcane_png = 'Case3_Cana_REPLAN_334_tabela.png';
        } else if (capacidadeCana === '3') {
            curva_oferta_sugarcane_png = 'Case3_Cana_REPLAN_465_fig.png';
            resultado_sugarcane_png = 'Case3_Cana_REPLAN_465_tabela.png';
        } else if (capacidadeCana === '4') {
            curva_oferta_sugarcane_png = 'Case3_Cana_REPLAN_930_fig.png';
            resultado_sugarcane_png = 'Case3_Cana_REPLAN_930_tabela.png';
        }
        comparacao_sugarcane_png = 'Case3_Cana_Comparacao.png';
    } else if (tipoInstalacaoSugarcane === "4") {
        // Case 3b - REPLAN
        if (capacidadeCana === '1') {
            curva_oferta_sugarcane_png = 'Case3_Cana_Milho_REPLAN_182_fig.png';
            resultado_sugarcane_png = 'Case3_Cana_Milho_REPLAN_182_tabela.png';
        } else if (capacidadeCana === '2') {
            curva_oferta_sugarcane_png = 'Case3_Cana_Milho_REPLAN_334_fig.png';
            resultado_sugarcane_png = 'Case3_Cana_Milho_REPLAN_334_tabela.png';
        } else if (capacidadeCana === '3') {
            curva_oferta_sugarcane_png = 'Case3_Cana_Milho_REPLAN_465_fig.png';
            resultado_sugarcane_png = 'Case3_Cana_Milho_REPLAN_465_tabela.png';
        } else if (capacidadeCana === '4') {
            curva_oferta_sugarcane_png = 'Case3_Cana_Milho_REPLAN_930_fig.png';
            resultado_sugarcane_png = 'Case3_Cana_Milho_REPLAN_930_tabela.png';
        }
        comparacao_sugarcane_png = 'Case3_Cana_Milho_Comparacao.png';
    }
}


/*
 * JANELAS INFO - MAPAS
 */

// Sugarcane - INFO
// Aptidão
$("#info-aptidao_cana").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 500, height: 250},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Sugarcane suitability</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Suitability estimated based on climatic and geographic parameters, soil suitability for agriculture and slope." +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> SAFmaps (2021)" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://dx.doi.org/10.17632/dp4y36fjw5.2'>Download page</a></p>" +
                                "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Twelve Brazilian states considered in the project" +
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

// Produtividade
$("#info-produtividade_cana").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 520, height: 300},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Expected sugarcane yield</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Estimated based on a statistic model. Explanatory variables include climatic parameters, soil suitability and a set of dummy variables. The model would be used to predict yields in new sugarcane producing areas.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> SAFmaps (2021)" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://dx.doi.org/10.17632/dp4y36fjw5.2'>Download page</a></p>" +
                                "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Twelve Brazilian states considered in the project" +
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
$("#info-custo_cana").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 520, height: 300},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Expected costs of sugarcane production</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Costs in R$ (2018) per hectare per year, in a five-year cycle, considering that the expansion of sugarcane crop would occur displacing pasturelands. The estimated costs include harvest and transport to the mill and are impacted by sugarcane yields.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> SAFmaps (2021)" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://dx.doi.org/10.17632/dp4y36fjw5.2'>Download page</a></p>" +
                                "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Twelve Brazilian states considered in the project" +
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



