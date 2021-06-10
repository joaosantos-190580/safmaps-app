/*
 * All panels, controls and other issues related to: MACAW
 *
 * 
 */

// MENU: Panel activation
$("#atj-spk").click(function(e) {
    e.preventDefault();

    reset_actived (e);
    $("#panel-support-maps").css("display", "none");
    $("#panel-eucalipto").css("display", "none");
    $("#panel-eucalipto-residues").css("display", "none");
    $("#panel-soja").css("display", "none");
    $("#panel-palma").css("display", "none");
    $("#panel-sugarcane").css("display", "none");	
    $("#panel-sugarcane-residues").css("display", "none");
    $("#panel-corn").css("display", "none");		
    $("#panel-tallow").css("display", "none");		
    $("#panel-off_gases").css("display", "none");	
    $("#panel-uco-residues").css("display", "none");		
    $("#empty").css("display", "none");
    $("#panel-macauba").css("display", "block");
    $("#legends").css("display", "block");
}); 


/*
 *  MACAW LAYERS (from GeoServer) and variables
 */

var revapMacauba = '', regapMacauba = '', rnestMacauba = '';

var l_aptidao_macauba = 'DBMS:aptidao_macauba';
var l_custos_macauba = 'DBMS:custos_macauba';
var l_produtividade_macauba = 'DBMS:produtividade_macauba';

var l_regap = [-19.963915, -44.094813];
var l_campinaVerde = [-19.456969, -49.780359];
var l_itaruma = [-18.836906, -51.327071];
var l_doresIndaia = [-19.492157, -45.554277];
var l_figueiropolis = [-12.131984, -49.174940];
var l_goias = [-15.934055, -50.140097];
var l_joaoPinheiro = [-17.740737, -46.174217];
var l_limaDuarte = [-21.841143, -43.792823];
var l_mirabela = [-16.256728, -44.160670];
var l_porangatu = [-13.433075, -49.142338];
var l_taipasTocantins = [-12.194076, -46.992217];

var curva_oferta_macauba_png = '', resultado_macauba_png = '', comparacao_macauba_png = '', result_panel_macauba = '';


/*
 *  MACAW LAYERS
 */

// Macaw suitability (Layer)
$("#toggle-aptidao_macauba").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_aptidao_macauba;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_aptidao_macauba, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        $("#legend-aptidao_macauba").css("display", "block");
    } else {
        $("#legend-aptidao_macauba").css("display", "none");
    }
});

// Macaw Oil yield (Layer)
$("#toggle-produtividade_macauba").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_produtividade_macauba;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_produtividade_macauba, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        $("#legend-produtividade_macauba").css("display", "block");
    } else {
        $("#legend-produtividade_macauba").css("display", "none");
    }
});

// Cost of macaw production (Layer)
$("#toggle-custo_macauba").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_custos_macauba;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_custos_macauba, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        $("#legend-custo_macauba").css("display", "block");
    } else {
        $("#legend-custo_macauba").css("display", "none");
    }
});


/* 
 * CASE STUDY
 */

// Variaveis
var routeMacauba = '', feedstockMacauba = '';
var selecionadoMacauba = '', tipoInstalacaoMacauba = '', capacidadeMacauba = '', capacidadeMacauba_valor = '';
var locationMacauba = '', locationMacauba_valor = '', oilSourceMacauba = '', oilSourceMacauba_valor = '';
var oilSourceMacauba_lista = '', inputReqCalc_macauba = '';

var campinaVerdeMacauba = '', itarumaMacauba = '';
var doresIndaiaMacauba = '', figueiropolisMacauba = '', goiasMacauba = '', joaoPinheiroMacauba = '';
var limaDuarteMacauba = '', mirabelaMacauba = '', porangatuMacauba = '', taipasTocantinsMacauba = '';

var cstudy_macauba = false;

// Selecao da rota
$("#macaubaRota").on('change', function(){
    routeMacauba = this.value;
});

// Selecao do feedstock
$("#macaubaFStock").on('change', function(){
    feedstockMacauba = this.value;
});

// Seleção mapa de apoio
$("#macaubaMaps").on('change', function(){
    console.debug(this.value);

    selecionadoMacauba = this.value;

    // Case Study Macauba
    cstudy_macauba = true;
    if (cstudy_eucalipto) {
        setFalse_cstudyEucalipto();
    }	

    // Macaw oil suitability
    if (selecionadoMacauba === "1") {
        $('input:checkbox').not(this).prop('checked', false);
        reset_all_legends();
        removeLayers();

        options['layers'] = l_aptidao_macauba;
        var aptidao_macauba = L.tileLayer.wms(url, options);
        map.addLayer(aptidao_macauba);

        $("#legend-aptidao_macauba").css("display", "block");
    // Costs of macaw production
    } else if (selecionadoMacauba === "3") {
        $('input:checkbox').not(this).prop('checked', false);
        reset_all_legends();
        removeLayers();

        options['layers'] = l_custos_macauba;
        var custos_macauba= L.tileLayer.wms(url, options);
        map.addLayer(custos_macauba);

        $("#legend-custo_macauba").css("display", "block");
    // Macaw oil yield
    } else if (selecionadoMacauba === "2") {
        $('input:checkbox').not(this).prop('checked', false);
        reset_all_legends();
        removeLayers();

        options['layers'] = l_produtividade_macauba;
        var produtividade_macauba = L.tileLayer.wms(url, options);
        map.addLayer(produtividade_macauba);

        $("#legend-produtividade_macauba").css("display", "block");
    // Continue without maps
    } else if (selecionadoMacauba === "0") {
        $('input:checkbox').not(this).prop('checked', false);
        reset_all_legends();
        removeLayers();
    }
});		

$("#locationMacauba").on('change', function(){
    console.debug(this.value);

    locationMacauba = this.value;
    locationMacauba_valor = this.options[this.selectedIndex].text;

    // Janela Curva Oferta
    removePanelbyTitle("Results");

    // if (capacidadeMacauba != '' && capacidadeMacauba != '--') {
    // 	capacitySelectionMacauba();
    // }

    // INSERIR FUNÇÃO PRA REMOVER MARCADOR
    resetPoints_cstudySoja();
    resetExtratoras_cstudySoja();
    resetExtratoras_cstudyMacauba();	
    resetControls_oilSource_cstudyMacauba();
    resetControls_capacidade_cstudyMacauba();
    
    if (locationMacauba === "1") {
        // REMOVE MARCADORES
        if (revapMacauba != undefined && revapMacauba != '') {
            map.removeLayer(revapMacauba);
        };

        if (rnestMacauba != undefined && rnestMacauba != '') {
            map.removeLayer(rnestMacauba);
        };

        //regapMacauba = L.marker(l_regap).bindPopup("REGAP at <b>" + l_regap.toString() + "</b>").openPopup();
        regapMacauba = L.marker(l_regap, { icon : blackMarker }).bindPopup("REGAP at <b>" + l_regap.toString() + "</b>").openPopup();
        map.addLayer(regapMacauba);

        //var regap_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_regap_buffer_50km, format: 'image/png', transparent: true });
        //map.addLayer(regap_buffer);
        
        // Posiciona o mapa na localização
        map.flyTo(l_regap, 5);

        // Controls of Oil Source
        $("#oilSource").css("display", "none");	
        $("#oilSourceRegap").css("display", "inline-block");

        $("#nomeMunicipioMacauba").text("Betim/MG");
        //$("#nomeMunicipioMacauba").css("color", "blue");
        $("#nomeMunicipioMacauba").css("font-weight", "bold");
    } else if (locationMacauba === "2") {
        // REMOVE MARCADORES
        if (regapMacauba != undefined && regapMacauba != '') {
            map.removeLayer(regapMacauba);
        };

        if (rnestMacauba != undefined && rnestMacauba != '') {
            map.removeLayer(rnestMacauba);
        };

        var popup = L.popup({maxWidth: '100%'});

        /*
            var html = $('<div id="html" style="width: 30rem; height: 100%; padding-top: 2rem; padding-bottom: 0.5rem">' +
                    '<a href="https://petrobras.com.br/pt/nossas-atividades/principais-operacoes/refinarias/refinaria-henrique-lage-revap.htm" target="_blank" style="cursor:pointer;">' +
                    '<img width="100%" src="./images/REVAP.png" /></a>' +
                    '<h6 style="margin-top: 0.3rem"><b>REVAP</b> (São José dos Campos/SP) at <b>(' + l_revap.toString() + ')</b></h6></div>')[0];
        */

        var html = $('<div id="html" style="width: 16rem; padding-top: 0.5rem;padding-bottom: 0.5rem;">' +
                    '<h6 style="margin-top: 0.3rem; font-size: 0.9rem;"><b><a href="https://petrobras.com.br/pt/nossas-atividades/principais-operacoes/refinarias/refinaria-henrique-lage-revap.htm" target="_blank">REVAP</a></b> (São José dos Campos/SP) at <b>(' + l_revap.toString() + ')</b></h6></div>')[0];	

        popup.setContent(html);

        //revapMacauba = L.marker(l_revap).bindPopup("REVAP at <b>" + l_revap.toString() + "</b>").openPopup();
        //revapMacauba = L.marker(l_revap, { icon : redMarker }).bindPopup("REVAP at <b>" + l_revap.toString() + "</b>").openPopup();
        revapMacauba = L.marker(l_revap, { icon : blackMarker }).bindPopup(popup);
        map.addLayer(revapMacauba);

        //var revap_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_revap_buffer_50km, format: 'image/png', transparent: true });
        //map.addLayer(revap_buffer);
        
        // Posiciona o mapa na localização
        map.flyTo(l_revap, 5);

        // Controls of Oil Source
        $("#oilSourceRegap").css("display", "none");
        $("#oilSource").css("display", "inline-block");	

        $("#nomeMunicipioMacauba").text("SÃO JOSÉ DOS CAMPOS/SP");
        //$("#nomeMunicipioMacauba").css("color", "blue");
        $("#nomeMunicipioMacauba").css("font-weight", "bold");
    } else if (locationMacauba === "3") {
        // REMOVE MARCADORES
        if (revapMacauba != undefined && revapMacauba != '') {
            map.removeLayer(revapMacauba);
        };

        if (regapMacauba != undefined && regapMacauba != '') {
            map.removeLayer(regapMacauba);
        };
        
        //rnestMacauba = L.marker(l_rnest).bindPopup("RNEST at <b>" + l_rnest.toString() + "</b>").openPopup();
        rnestMacauba = L.marker(l_rnest, { icon : blackMarker }).bindPopup("RNEST at <b>" + l_rnest.toString() + "</b>").openPopup();
        map.addLayer(rnestMacauba);

        //var revap_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_revap_buffer_50km, format: 'image/png', transparent: true });
        //map.addLayer(revap_buffer);
        
        // Posiciona o mapa na localização
        map.flyTo(l_rnest, 5);

        // Controls of Oil Source
        $("#oilSourceRegap").css("display", "none");
        $("#oilSource").css("display", "inline-block");	

        $("#nomeMunicipioMacauba").text("IPOJUCA/PE");
        //$("#nomeMunicipioMacauba").css("color", "blue");
        $("#nomeMunicipioMacauba").css("font-weight", "bold");
    } else {
        $("#nomeMunicipioMacauba").text(" ...");
        $("#nomeMunicipioMacauba").css("color", "black");
    }

    // Variable for results window
    locationMacauba_valor += " (" + $("#nomeMunicipioMacauba").text() + ")";
});

$("#oilSourceMacauba").on('change', function(){
    console.debug(this.value);

    oilSourceMacauba = this.value;
    oilSourceMacauba_valor = this.options[this.selectedIndex].text;

    // Janela Curva Oferta
    removePanelbyTitle("Results");

    resetControls_capacidade_cstudyMacauba();
    oilSourceMacauba_rules();
    capacidadeMacauba_rules();

    //resetControlsCapacity_cstudyMacauba();
    // if (capacidadeMacauba != '' && capacidadeMacauba != '--') {
    // 	capacitySelectionMacauba();
    // }
});

$("#oilSourceMacauba2").on('change', function(){
    console.debug(this.value);

    oilSourceMacauba = this.value;
    oilSourceMacauba_valor = this.options[this.selectedIndex].text;

    // Janela Curva Oferta
    removePanelbyTitle("Results");

    resetControls_capacidade_cstudyMacauba();
    oilSourceMacauba_rules();
    capacidadeMacauba_rules();

    //resetControlsCapacity_cstudyMacauba();
    // if (capacidadeMacauba != '' && capacidadeMacauba != '--') {
    // 	capacitySelectionMacauba();
    // }
    capacidadeMacauba = '';
});

$("#capacidadeMacauba").on('change', function(){
    console.debug(this.value);

    capacidadeMacauba = this.value;
    capacidadeMacauba_valor = this.options[this.selectedIndex].text;
    inputReqCalc_macauba = $(this).find(':selected').data('input');

    capacidadeMacauba_rules();
});

$("#capacidadeMacauba2").on('change', function(){
    console.debug(this.value);

    capacidadeMacauba = this.value;
    capacidadeMacauba_valor = this.options[this.selectedIndex].text;
    inputReqCalc_macauba = $(this).find(':selected').data('input');

    capacidadeMacauba_rules();
});

$("#capacidadeMacauba3").on('change', function(){
    console.debug(this.value);

    capacidadeMacauba = this.value;
    capacidadeMacauba_valor = this.options[this.selectedIndex].text;
    inputReqCalc_macauba = $(this).find(':selected').data('input');

    capacidadeMacauba_rules();
});

// Botao next (Step #1)
$("button.macauba-step1-next").on("click", function() {
    if ((routeMacauba === "" || routeMacauba === "--") && (feedstockMacauba === "" || feedstockMacauba === "--")) {
        $.alert({
            boxWidth: '40%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>Conversion technology</b> and the <b>Feedstock</b>.',
            useBootstrap: false
        });
    } else if (routeMacauba === "" || routeMacauba === "--") {
        $.alert({
            boxWidth: '30%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>Conversion technology</b>.',
            useBootstrap: false
        });
    } else if (feedstockMacauba === "" || feedstockMacauba === "--") {
        $.alert({
            boxWidth: '30%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>Feedstock</b>.',
            useBootstrap: false
        });
    } else {
        if (typeof(selecionadoMacauba) == 'undefined' || selecionadoMacauba != "0" && cstudy_macauba == false) {
            // Case Study Macauba
            cstudy_macauba = true;
            if (cstudy_eucalipto) {
                setFalse_cstudyEucalipto();
            }
        }

        $("#macauba-step1").css("display", "none");
        $("#macauba-step2").css("display", "block");
    }
});

// Botao back (Step #2)
$("button.macauba-step2-back").on("click", function() {
    $("#macauba-step2").css("display", "none");
    $("#macauba-step1").css("display", "block");
});

// Botao calculate (Step #2)
$("button.macauba-step2-calc").on("click", function() {
    if ((locationMacauba === "" || locationMacauba === "--") 
            || (oilSourceMacauba === "" || oilSourceMacauba === "--")
            || (capacidadeMacauba === "" || capacidadeMacauba === "--")) {
        $.alert({
            boxWidth: '40%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>SAF Production</b>, the <b>Oil Extraction</b> and the <b>SAF Output capacity</b>.',
            useBootstrap: false
        });
    } else {
        capacitySelectionMacauba();
        result_panel_macauba = "<div style='margin-left:10%; overflow-y:auto; height: 100%''>" +
                                "<div><img src='images/logo_safmaps_degrade.png' width='13%' style='float: right; margin-right: 7.3rem'>" +
                                "<h6 style='font-weight:bold'>Selection summary:</h6>" +
                                    "<div style='font-size: 0.9rem;padding-left:2rem;border-bottom: lightgray;border-bottom-width: 1px;border-bottom-style: solid;width: 86%;'>" +
                                        "<b>Conversion tecnology:</b> " + routeMacauba + 
                                        "<br/><b>Feedstock:</b> " + feedstockMacauba +
                                        "<br/><b>SAF Production at:</b> " + locationMacauba_valor +
                                        "<br/><b>Oil Extraction:</b> " + oilSourceMacauba_valor +
                                        "<br/><b>SAF Output capacity (t.day<sup>-1</sup>):</b> " + capacidadeMacauba_valor +
                                        "<br/><br/>" +
                                    "</div>" +
                                "</div><br/><br/>" +
                                "<div><h6 style='font-weight:bold'>Oil supply curve</h6>" +
                                    "<img src='images/cstudies_macauba/" + curva_oferta_macauba_png + "' width='85%' ></div>" +
                                "<div style='margin-top:4rem; '>" +
                                    "<div><h6 style='font-weight:bold; margin-left:5px'>Data table</h6>" +
                                    "<img src='images/cstudies_macauba/" + resultado_macauba_png + "' width='80%' ></div>" +
                                "<div style='margin-top:4rem; '>" +
                                    "<div><h6 style='font-weight:bold; margin-left:5px'>Comparison table</h6>" +
                                        "<img src='images/cstudies_macauba/" + comparacao_macauba_png + "' width='80%'></div>" +
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
            content:	result_panel_macauba,
            callback:    function () {
                this.content.css("padding", "15px");
                
            }
        });
    }
});

// Reset controls
function resetExtratoras_cstudyMacauba() {
    // REMOVE MARCADORES
    if (campinaVerdeMacauba != undefined && campinaVerdeMacauba != '') {
        map.removeLayer(campinaVerdeMacauba);
        campinaVerdeMacauba = '';
    }
    if (itarumaMacauba != undefined && itarumaMacauba != '') {
        map.removeLayer(itarumaMacauba);
        itarumaMacauba = '';
    }
    if (doresIndaiaMacauba != undefined && doresIndaiaMacauba != '') {
        map.removeLayer(doresIndaiaMacauba);
        doresIndaiaMacauba = '';
    }
    if (figueiropolisMacauba != undefined && figueiropolisMacauba != '') {
        map.removeLayer(figueiropolisMacauba);
        figueiropolisMacauba = '';
    }
    if (goiasMacauba != undefined && goiasMacauba != '') {
        map.removeLayer(goiasMacauba);
        goiasMacauba = '';
    }
    if (joaoPinheiroMacauba != undefined && joaoPinheiroMacauba != '') {
        map.removeLayer(joaoPinheiroMacauba);
        joaoPinheiroMacauba = '';
    }
    if (limaDuarteMacauba != undefined && limaDuarteMacauba != '') {
        map.removeLayer(limaDuarteMacauba);
        limaDuarteMacauba = '';
    }
    if (mirabelaMacauba != undefined && mirabelaMacauba != '') {
        map.removeLayer(mirabelaMacauba);
        mirabelaMacauba = '';
    }
    if (porangatuMacauba != undefined && porangatuMacauba != '') {
        map.removeLayer(porangatuMacauba);
        porangatuMacauba = '';
    }
    if (taipasTocantinsMacauba != undefined && taipasTocantinsMacauba != '') {
        map.removeLayer(taipasTocantinsMacauba);
        taipasTocantinsMacauba = '';
    }
}

function resetControls_oilSource_cstudyMacauba () {
    // Controls of Oil Source
    $("#oilSourceMacauba option:selected").removeAttr("selected");
    $("#oilSourceMacauba option[value='0']").attr('selected', 'selected');  

    $("#oilSourceMacauba2 option:selected").removeAttr("selected");
    $("#oilSourceMacauba2 option[value='0']").attr('selected', 'selected');  

    // Reset variables
    oilSourceMacauba = "";
}

function resetControls_capacidade_cstudyMacauba () {
    // Controls of Capacity
    $("#capacidadeMacauba option:selected").removeAttr("selected");
    $("#capacidadeMacauba option[value='0']").attr('selected', 'selected');

    $("#capacidadeMacauba2 option:selected").removeAttr("selected");
    $("#capacidadeMacauba2 option[value='0']").attr('selected', 'selected');

    $("#capacidadeMacauba3 option:selected").removeAttr("selected");
    $("#capacidadeMacauba3 option[value='0']").attr('selected', 'selected');

    // Reset variables
    capacidadeMacauba = "";
}

function oilSourceMacauba_rules() {
    // REMOVER MARCADOR
    resetExtratoras_cstudySoja();
    resetExtratoras_cstudyMacauba();			

    campinaVerdeMacauba = L.marker(l_campinaVerde, { icon : blueMarker }).bindPopup("Campina Verde/MG at <b>" + l_campinaVerde.toString() + "</b>").openPopup();
    itarumaMacauba = L.marker(l_itaruma, { icon : blueMarker }).bindPopup("Itarumã/GO at <b>" + l_itaruma.toString() + "</b>").openPopup();

    doresIndaiaMacauba = L.marker(l_doresIndaia, { icon : blueMarker }).bindPopup("Dores do Indaiá/MG at <b>" + l_doresIndaia.toString() + "</b>").openPopup();
    figueiropolisMacauba = L.marker(l_figueiropolis, { icon : blueMarker }).bindPopup("Figueirópolis/TO at <b>" + l_figueiropolis.toString() + "</b>").openPopup();
    goiasMacauba = L.marker(l_goias, { icon : blueMarker }).bindPopup("Goiás/GO at <b>" + l_goias.toString() + "</b>").openPopup();
    joaoPinheiroMacauba = L.marker(l_joaoPinheiro, { icon : blueMarker }).bindPopup("João Pinheiro/MG at <b>" + l_joaoPinheiro.toString() + "</b>").openPopup();
    limaDuarteMacauba = L.marker(l_limaDuarte, { icon : blueMarker }).bindPopup("Lima Duarte/MG at <b>" + l_limaDuarte.toString() + "</b>").openPopup();
    mirabelaMacauba = L.marker(l_mirabela, { icon : blueMarker }).bindPopup("Mirabela/MG at <b>" + l_mirabela.toString() + "</b>").openPopup();
    porangatuMacauba = L.marker(l_porangatu, { icon : blueMarker }).bindPopup("Porangatu/GO at <b>" + l_porangatu.toString() + "</b>").openPopup();
    taipasTocantinsMacauba = L.marker(l_taipasTocantins, { icon : blueMarker }).bindPopup("Taipas do Tocantins/TO at <b>" + l_taipasTocantins.toString() + "</b>").openPopup();

    // List of all Oil Source (for result window)
    oilSourceMacauba_lista = "<table style='margin-top: 0.25rem; margin-left: 0.8rem'>" +
                                "<tr><td style='padding: 0 25px 0 0'>Campina Verde/MG</td><td>Dores do Indaiá/MG</td></tr>" +
                                "<tr><td>João Pinheiro/MG</td><td>Lima Duarte/MG</td></tr>" +
                                "<tr><td>Mirabela/MG</td><td>Goiás/GO</td></tr>" +
                                "<tr><td>Itarumã/GO</td><td>Porangatu/GO</td></tr>" +
                                "<tr><td>Figueirópolis/TO</td><td>Taipas do Tocantins/TO</td></tr>" +
                                "</table>";

    if (oilSourceMacauba === "1") {
        map.addLayer(campinaVerdeMacauba);

        //var campinaVerde_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_campinaVerde_buffer_50km, format: 'image/png', transparent: true });
        //map.addLayer(campinaVerde_buffer);
        
        // Posiciona o mapa na localização
        if (locationMacauba !== "3") {
            map.flyTo(l_campinaVerde, 5);
        }
    
        $("#capacidadeMacaubaAll").css("display", "none");
        $("#capacidadeMacaubaCampina").css("display", "block");	
        $("#capacidadeMacaubaItaruma").css("display", "none");	
    } else if (oilSourceMacauba === "2") {
        map.addLayer(itarumaMacauba);

        //var itaruma_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_itaruma_buffer_50km, format: 'image/png', transparent: true });
        //map.addLayer(itaruma_buffer);
        
        // Posiciona o mapa na localização
        if (locationMacauba !== "3") {
            map.flyTo(l_itaruma, 5);
        }

        $("#capacidadeMacaubaAll").css("display", "none");
        $("#capacidadeMacaubaCampina").css("display", "none");	
        $("#capacidadeMacaubaItaruma").css("display", "block");					
    } else if (oilSourceMacauba === "3") {			// all 10 location
        map.addLayer(campinaVerdeMacauba);
        map.addLayer(itarumaMacauba);

        map.addLayer(doresIndaiaMacauba);
        map.addLayer(figueiropolisMacauba);
        map.addLayer(goiasMacauba);
        map.addLayer(joaoPinheiroMacauba);
        map.addLayer(limaDuarteMacauba);
        map.addLayer(mirabelaMacauba);
        map.addLayer(porangatuMacauba);
        map.addLayer(taipasTocantinsMacauba);

        //var itaruma_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_itaruma_buffer_50km, format: 'image/png', transparent: true });
        //map.addLayer(itaruma_buffer);
        
        // Posiciona o mapa na localização
        map.flyTo(l_joaoPinheiro, 5);
        $("#capacidadeMacaubaAll").css("display", "block");
        $("#capacidadeMacaubaCampina").css("display", "none");	
        $("#capacidadeMacaubaItaruma").css("display", "none");	

        // Text of Oil Source for results window
        oilSourceMacauba_valor += "<br>" + oilSourceMacauba_lista;
    } else {
        oilSourceMacauba = "";
        cstudy_macauba = false;
    }
}

function capacidadeMacauba_rules() {
    if (capacidadeMacauba != '' && capacidadeMacauba != '--') {
        //Output
        //var output_value = parseFloat(capacidadeMacauba.replace(",", ".")) / 0.16 / 0.17;
        var output_value = parseFloat(inputReqCalc_macauba);

        $("#inputReqMacauba").text(inputReqCalc_macauba + " t.day-1 (biomass, dry basis)");
        $("#inputReqMacauba").css("color", "blue");

        //Co-products
        var diesel_value = output_value * 0.83 * 0.769491525423729;
        var lpg_value = output_value * 0.83 * 0.0180790960451977;

        //$("#gasolineMacauba").text("Gasoline: " + parseInt(gasoline_value) + "  t.day<sup>-1</sup>");
        $("#dieselMacauba").text("Diesel: " + Math.round(diesel_value) + "  t.day-1");
        $("#dieselMacauba").css("color", "blue");

        $("#lpgMacauba").text("LPG: " + Math.round(lpg_value) + "  t.day-1");
        $("#lpgMacauba").css("color", "blue");

        capacitySelectionMacauba();
    } else {
        //Output
        $("#inputReqMacauba").text("... t.day-1 (biomass, dry basis)");
        $("#inputReqMacauba").css("color", "black");

        //Co-products
        $("#dieselMacauba").text("Diesel");
        $("#dieselMacauba").css("color", "black");

        $("#lpgMacauba").text("LPG");
        $("#lpgMacauba").css("color", "black");
    }
}

function capacitySelectionMacauba() {
    if (locationMacauba === "1") {
        // REGAP
        if (capacidadeMacauba === '1') {
            curva_oferta_macauba_png = 'Todos_REGAP_20_fig.png';
            resultado_macauba_png = 'Todos_REGAP_20_tabela.png';
        } else if (capacidadeMacauba === '2') {
            curva_oferta_macauba_png = 'Todos_REGAP_51_fig.png';
            resultado_macauba_png = 'Todos_REGAP_51_tabela.png';
        } else if (capacidadeMacauba === '3') {
            curva_oferta_macauba_png = 'Todos_REGAP_75_fig.png';
            resultado_macauba_png = 'Todos_REGAP_75_tabela.png';
        } else if (capacidadeMacauba === '4') {
            curva_oferta_macauba_png = 'Todos_REGAP_150_fig.png';
            resultado_macauba_png = 'Todos_REGAP_150_tabela.png';
        } else if (capacidadeMacauba === '5') {
            curva_oferta_macauba_png = 'Todos_REGAP_300_fig.png';
            resultado_macauba_png = 'Todos_REGAP_300_tabela.png';
        }
        comparacao_macauba_png = 'Todos10_REGAP_Comparacao_tabela.png';
    } else if (locationMacauba === "2") {
        // REVAP
        if (oilSourceMacauba === "1") {
            if (capacidadeMacauba === '1') {
                curva_oferta_macauba_png = 'Campina_REVAP_20_fig.png';
                resultado_macauba_png = 'Campina_REVAP_20_tabela.png';
            } else if (capacidadeMacauba === '2') {
                curva_oferta_macauba_png = 'Campina_REVAP_51_fig.png';
                resultado_macauba_png = 'Campina_REVAP_51_tabela.png';
            } else if (capacidadeMacauba === '3') {
                curva_oferta_macauba_png = 'Campina_REVAP_75_fig.png';
                resultado_macauba_png = 'Campina_REVAP_75_tabela.png';
            }
            comparacao_macauba_png = 'Campina_REVAP_Comparacao_tabela.png';
        } else if (oilSourceMacauba === "2") {
            if (capacidadeMacauba === '1') {
                curva_oferta_macauba_png = 'Itaruma_REVAP_20_fig.png';
                resultado_macauba_png = 'Itaruma_REVAP_20_tabela.png';
            } else if (capacidadeMacauba === '2') {
                curva_oferta_macauba_png = 'Itaruma_REVAP_51_fig.png';
                resultado_macauba_png = 'Itaruma_REVAP_51_tabela.png';
            } else if (capacidadeMacauba === '3') {
                curva_oferta_macauba_png = 'Itaruma_REVAP_75_fig.png';
                resultado_macauba_png = 'Itaruma_REVAP_75_tabela.png';
            } else if (capacidadeMacauba === '4') {
                curva_oferta_macauba_png = 'Itaruma_REVAP_150_fig.png';
                resultado_macauba_png = 'Itaruma_REVAP_150_tabela.png';
            }
            comparacao_macauba_png = 'Itaruma_REVAP_Comparacao_tabela.png';
        } else if (oilSourceMacauba === "3") {
            if (capacidadeMacauba === '1') {
                curva_oferta_macauba_png = 'Todos_REVAP_20_fig.png';
                resultado_macauba_png = 'Todos_REVAP_20_tabela.png';
            } else if (capacidadeMacauba === '2') {
                curva_oferta_macauba_png = 'Todos_REVAP_51_fig.png';
                resultado_macauba_png = 'Todos_REVAP_51_tabela.png';
            } else if (capacidadeMacauba === '3') {
                curva_oferta_macauba_png = 'Todos_REVAP_75_fig.png';
                resultado_macauba_png = 'Todos_REVAP_75_tabela.png';
            } else if (capacidadeMacauba === '4') {
                curva_oferta_macauba_png = 'Todos_REVAP_150_fig.png';
                resultado_macauba_png = 'Todos_REVAP_150_tabela.png';
            } else if (capacidadeMacauba === '5') {
                curva_oferta_macauba_png = 'Todos_REVAP_300_fig.png';
                resultado_macauba_png = 'Todos_REVAP_300_tabela.png';
            }
            comparacao_macauba_png = 'Todos10_REVAP_Comparacao_tabela.png';
        }
    } else if (locationMacauba === "3") {
        // RNEST
        if (oilSourceMacauba === "1") {
            if (capacidadeMacauba === '1') {
                curva_oferta_macauba_png = 'Campina_RNEST_20_fig.png';
                resultado_macauba_png = 'Campina_RNEST_20_tabela.png';
            } else if (capacidadeMacauba === '2') {
                curva_oferta_macauba_png = 'Campina_RNEST_51_fig.png';
                resultado_macauba_png = 'Campina_RNEST_51_tabela.png';
            } else if (capacidadeMacauba === '3') {
                curva_oferta_macauba_png = 'Campina_RNEST_75_fig.png';
                resultado_macauba_png = 'Campina_RNEST_75_tabela.png';
            }
            comparacao_macauba_png = 'Campina_RNEST_Comparacao_tabela.png';
        } else if (oilSourceMacauba === "2") {
            if (capacidadeMacauba === '1') {
                curva_oferta_macauba_png = 'Itaruma_RNEST_20_fig.png';
                resultado_macauba_png = 'Itaruma_RNEST_20_tabela.png';
            } else if (capacidadeMacauba === '2') {
                curva_oferta_macauba_png = 'Itaruma_RNEST_51_fig.png';
                resultado_macauba_png = 'Itaruma_RNEST_51_tabela.png';
            } else if (capacidadeMacauba === '3') {
                curva_oferta_macauba_png = 'Itaruma_RNEST_75_fig.png';
                resultado_macauba_png = 'Itaruma_RNEST_75_tabela.png';
            } else if (capacidadeMacauba === '4') {
                curva_oferta_macauba_png = 'Itaruma_RNEST_150_fig.png';
                resultado_macauba_png = 'Itaruma_RNEST_150_tabela.png';
            }
            comparacao_macauba_png = 'Itaruma_RNEST_Comparacao_tabela.png';
        } else if (oilSourceMacauba === "3") {
            if (capacidadeMacauba === '1') {
                curva_oferta_macauba_png = 'Todos_RNEST_20_fig.png';
                resultado_macauba_png = 'Todos_RNEST_20_tabela.png';
            } else if (capacidadeMacauba === '2') {
                curva_oferta_macauba_png = 'Todos_RNEST_51_fig.png';
                resultado_macauba_png = 'Todos_RNEST_51_tabela.png';
            } else if (capacidadeMacauba === '3') {
                curva_oferta_macauba_png = 'Todos_RNEST_75_fig.png';
                resultado_macauba_png = 'Todos_RNEST_75_tabela.png';
            } else if (capacidadeMacauba === '4') {
                curva_oferta_macauba_png = 'Todos_RNEST_150_fig.png';
                resultado_macauba_png = 'Todos_RNEST_150_tabela.png';
            } else if (capacidadeMacauba === '5') {
                curva_oferta_macauba_png = 'Todos_RNEST_300_fig.png';
                resultado_macauba_png = 'Todos_RNEST_300_tabela.png';
            }
            comparacao_macauba_png = 'Todos10_RNEST_Comparacao_tabela.png';
        }
    }
}


/*
 * JANELAS INFO - MAPAS
 */

// Macauba - INFO
// Aptidão
$("#info-aptidao_macauba").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 500, height: 250},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Macaw palm oil suitability</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Macaw palm suitability estimated based on climatic and geographic parameters, soil suitability for agriculture and slope." +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> SAFmaps (2021)" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://dx.doi.org/10.17632/5498jdrm87.2'>Download page</a></p>" +
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
$("#info-produtividade_macauba").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 520, height: 300},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Expected macaw palm oil yield</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Weighted averages oil yield for the whole production cycle (26 years) and only for pulp oil (mesocarp). Data were estimated based on information available in the literature. " +
                                "It was assumed that the producing cycle is from year 5 to 30 (excluding the implantation stage until the end of the fourth year after planting), and that yields are lower in the years 5 to 9.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> SAFmaps (2021)" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://dx.doi.org/10.17632/5498jdrm87.2'>Download page</a></p>" +
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
$("#info-custo_macauba").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 520, height: 310},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Expected costs of macaw palm production</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Costs in R$ (2018), per tonne of fresh fruits produced per year (on average, considering the producing cycle), considering that the expansion would occur displacing pasturelands. The costs include the opportunity cost of land, all procedures before planting, manual and mechanized operations, necessary inputs, maintenance and harvesting.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> SAFmaps (2021)" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://dx.doi.org/10.17632/5498jdrm87.2'>Download page</a></p>" +
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




