/*
 * All panels, controls and other issues related to: SOYBEAN
 *
 * 
 */

// MENU: Panel activation
$("#hefa-spk").click(function(e) {
    e.preventDefault();

    reset_actived (e);
    $("#panel-support-maps").css("display", "none");
    $("#panel-eucalipto").css("display", "none");
    $("#panel-eucalipto-residues").css("display", "none");
    $("#panel-macauba").css("display", "none");
    $("#panel-palma").css("display", "none");
    $("#panel-sugarcane").css("display", "none");	
    $("#panel-sugarcane-residues").css("display", "none");
    $("#panel-corn").css("display", "none");		
    $("#panel-tallow").css("display", "none");		
    $("#panel-off_gases").css("display", "none");	
    $("#panel-uco-residues").css("display", "none");		
    $("#empty").css("display", "none");
    $("#panel-soja").css("display", "block");
    $("#legends").css("display", "block");
}); 


/*
 *  SOYBEAN LAYERS (from GeoServer) and variables
 */

var l_aptidao_soja = 'DBMS:aptidao_soja';
var l_custos_soja = 'DBMS:custos_soja';
var l_produtividade_soja = 'DBMS:produtividade_soja';

var l_replan = [-22.729314, -47.148029];
var l_rnest = [-8.379276, -35.021108];
var l_brumado = [-14.205438, -41.66707];
var l_paranaiba = [-19.677372, -51.188708];
var l_pVenceslau = [-21.87594, -51.840259];
var l_prata = [-19.309488, -48.926217];
var l_cacu = [-18.565656, -51.134316];

var curva_oferta_soja_png = '', resultado_soja_png = '', comparacao_soja_png = '', result_panel_soja = '';
var tipo_instalacao_soja = '', capacidade_soja = '', location_soja = '', oil_source_soja = '';


/*
 *  SOYBEAN LAYERS
 */

// Soybean suitability (Layer)
$("#toggle-aptidao_soja").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_aptidao_soja;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_aptidao_soja, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        $("#legend-aptidao_soja").css("display", "block");
    } else {
        $("#legend-aptidao_soja").css("display", "none");
    }
});

// Soybean Oil yield (Layer)
$("#toggle-produtividade_soja").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_produtividade_soja;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_produtividade_soja, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        $("#legend-produtividade_soja").css("display", "block");
    } else {
        $("#legend-produtividade_soja").css("display", "none");
    }
});

// Cost of soybean production (Layer)
$("#toggle-custo_soja").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_custos_soja;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_custos_soja, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        $("#legend-custo_soja").css("display", "block");
    } else {
        $("#legend-custo_soja").css("display", "none");
    }
});


/* 
 * CASE STUDY
 */

// Variaveis
var routeSoja = '', feedstockSoja = '';

var revapSoja = '', rnestSoja = '';
var brumadoSoja = '', paranaibaSoja = '', pVenceslauSoja = '';

var selecionadoSoja = '', tipoInstalacaoSoja = '', capacidadeSoja = '', capacidadeSoja_valor = '';
var locationSoja = '', oilSourceSoja = '', inputReqCalc_soja = '';
var cstudy_soja = false;

// Selecao da rota
$("#sojaRota").on('change', function(){
    routeSoja = this.value;

    setFalse_cstudyEucalipto();
});

// Selecao do feedstock
$("#sojaFStock").on('change', function(){
    feedstockSoja = this.value;
});

// Seleção mapa de apoio		
$("#sojaMaps").on('change', function(){
    console.debug(this.value);

    selecionadoSoja = this.value;

    // Case Study Soja
    cstudy_soja = true;
    if (cstudy_eucalipto) {
        setFalse_cstudyEucalipto();
    }	

    // Soybean suitability
    if (selecionadoSoja === "1") {
        $('input:checkbox').not(this).prop('checked', false);
        reset_all_legends();
        removeLayers();

        options['layers'] = l_aptidao_soja;
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_aptidao_soja, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);
        map.addLayer(prov);

        $("#legend-aptidao_soja").css("display", "block");
    // Costs of soybean production
    } else if (selecionadoSoja === "3") {
        $('input:checkbox').not(this).prop('checked', false);
        reset_all_legends();
        removeLayers();

        options['layers'] = l_custos_soja;
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_custos_soja, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);
        map.addLayer(prov);

        $("#legend-custo_soja").css("display", "block");
    // Soybean yield
    } else if (selecionadoSoja === "2") {
        $('input:checkbox').not(this).prop('checked', false);
        reset_all_legends();
        removeLayers();

        options['layers'] = l_produtividade_soja;
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_produtividade_soja, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);
        map.addLayer(prov);

        $("#legend-produtividade_soja").css("display", "block");
    // Continue without maps
    } else if (selecionadoSoja === "0") {
        $('input:checkbox').not(this).prop('checked', false);
        reset_all_legends();
        removeLayers();
    }
});		

// Seleção do case study
$("#tipoInstalacaoSoja").on('change', function(){
    console.debug(this.value);

    tipoInstalacaoSoja = this.value;

    resetControls_cstudySoja();
    resetControlsCapacity_cstudySoja();

    if (tipoInstalacaoSoja === "1- Soybean oil exported (2018)") {
        $("#location_case1").css("display", "block");
    } else if (tipoInstalacaoSoja === "2a- Surplus oil (2018) / market price"
                || tipoInstalacaoSoja === "2b- Surplus oil (2018) / supply chain") {
        $("#location_case2").css("display", "block");
    } else if (tipoInstalacaoSoja === "3- Greenfield / vertical supply chain") {
        $("#location_case3").css("display", "block");
        $("#oilSource_case3").css("display", "block");
    }

    $("#capacidadeSojaAll").css("display", "block");
    $("#capacidadeSojaBrumado").css("display", "none");
});

$("#locationSoja_case1").on('change', function(){
    console.debug(this.value);

    locationSoja = this.value;

    if (capacidadeSoja != '' && capacidadeSoja != '--') {
        capacitySelection();
    }

    // REMOCAO DE OUTROS PONTOS DO MAPA
    /*
        var layers = [];
        map.eachLayer(function(layer) {
            if( layer instanceof L.TileLayer )
                layers.push(layer);
        });
        layers.forEach(function(l) {
            if (l.options.title != 'fundo_layer' && l.options.title != 'fundo_labels') {
                l.remove();
            }
        });
    */

    resetPoints_cstudySoja();

    // INSERIR FUNÇÃO PRA REMOVER MARCADOR
    
    revapSoja = L.marker(l_revap).bindPopup("REVAP at <b>" + l_revap.toString() + "</b>").openPopup();
    map.addLayer(revapSoja);

    //var revap_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_revap_buffer_50km, format: 'image/png', transparent: true });
    //map.addLayer(revap_buffer);
    
    // Posiciona o mapa na localização
    map.flyTo(l_revap, 9);

    $("#nomeMunicipioSoja").text("SÃO JOSÉ DOS CAMPOS/SP");
    $("#nomeMunicipioSoja").css("color", "blue");
});

$("#locationSoja_case2").on('change', function(){
    console.debug(this.value);

    locationSoja = this.value;

    if (capacidadeSoja != '' && capacidadeSoja != '--') {
        capacitySelection();
    }

    // INSERIR FUNÇÃO PRA REMOVER MARCADOR
    
    if (locationSoja === "REVAP") {
        resetPoints_cstudySoja();

        revapSoja = L.marker(l_revap).bindPopup("REVAP at <b>" + l_revap.toString() + "</b>").openPopup();
        map.addLayer(revapSoja);

        //var revap_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_revap_buffer_50km, format: 'image/png', transparent: true });
        //map.addLayer(revap_buffer);
        
        // Posiciona o mapa na localização
        map.flyTo(l_revap, 9);

        $("#nomeMunicipioSoja").text("SÃO JOSÉ DOS CAMPOS/SP");
        $("#nomeMunicipioSoja").css("color", "blue");
    } else if (locationSoja === "RNEST") {
        resetPoints_cstudySoja();

        rnestSoja = L.marker(l_rnest).bindPopup("RNEST at <b>" + l_rnest.toString() + "</b>").openPopup();
        map.addLayer(rnestSoja);

        //var revap_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_revap_buffer_50km, format: 'image/png', transparent: true });
        //map.addLayer(revap_buffer);
        
        // Posiciona o mapa na localização
        map.flyTo(l_rnest, 9);

        $("#nomeMunicipioSoja").text("IPOJUCA/PE");
        $("#nomeMunicipioSoja").css("color", "blue");
    } else {
        $("#nomeMunicipioSoja").text(" ...");
        $("#nomeMunicipioSoja").css("color", "black");

        resetPoints_cstudySoja();
    }
});

$("#locationSoja_case3").on('change', function(){
    console.debug(this.value);

    locationSoja = this.value;

    if (capacidadeSoja != '' && capacidadeSoja != '--') {
        capacitySelection();
    }

    // INSERIR FUNÇÃO PRA REMOVER MARCADOR
    
    if (locationSoja === "REVAP") {
        resetPoints_cstudySoja();

        revapSoja = L.marker(l_revap).bindPopup("REVAP at <b>" + l_revap.toString() + "</b>").openPopup();
        map.addLayer(revapSoja);

        //var revap_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_revap_buffer_50km, format: 'image/png', transparent: true });
        //map.addLayer(revap_buffer);
        
        // Posiciona o mapa na localização
        map.flyTo(l_revap, 9);

        $("#nomeMunicipioSoja").text("SÃO JOSÉ DOS CAMPOS/SP");
        $("#nomeMunicipioSoja").css("color", "blue");
    } else if (locationSoja === "RNEST") {
        resetPoints_cstudySoja();

        rnestSoja = L.marker(l_rnest).bindPopup("RNEST at <b>" + l_rnest.toString() + "</b>").openPopup();
        map.addLayer(rnestSoja);

        //var revap_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_revap_buffer_50km, format: 'image/png', transparent: true });
        //map.addLayer(revap_buffer);
        
        // Posiciona o mapa na localização
        map.flyTo(l_rnest, 9);

        $("#nomeMunicipioSoja").text("IPOJUCA/PE");
        $("#nomeMunicipioSoja").css("color", "blue");
    } else {
        $("#nomeMunicipioSoja").text(" ...");
        $("#nomeMunicipioSoja").css("color", "black");

        resetPoints_cstudySoja();
    }			
});

$("#oilSourceSoja_case3").on('change', function(){
    console.debug(this.value);

    oilSourceSoja = this.value;

    capacidadeSoja_rules();

    //resetControlsCapacity_cstudySoja();
    if (capacidadeSoja != '' && capacidadeSoja != '--') {
        capacitySelection();
    }

    // INSERIR FUNÇÃO PRA REMOVER MARCADOR
    
    if (oilSourceSoja === "Brumado (BA)") {
        resetExtratoras_cstudySoja();

        brumadoSoja = L.marker(l_brumado).bindPopup("Brumado/BA at <b>" + l_brumado.toString() + "</b>").openPopup();
        map.addLayer(brumadoSoja);

        //var brumado_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_brumado_buffer_50km, format: 'image/png', transparent: true });
        //map.addLayer(brumado_buffer);
        
        // Posiciona o mapa na localização
        //map.flyTo(l_brumado, 9);
    } else if (oilSourceSoja === "Paranaíba (MS)") {
        resetExtratoras_cstudySoja();

        paranaibaSoja = L.marker(l_paranaiba).bindPopup("Paranaíba/MS at <b>" + l_paranaiba.toString() + "</b>").openPopup();
        map.addLayer(paranaibaSoja);

        //var paranaiba_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_paranaiba_buffer_50km, format: 'image/png', transparent: true });
        //map.addLayer(paranaiba_buffer);
        
        // Posiciona o mapa na localização
        //map.flyTo(l_paranaiba, 9);
    } else if (oilSourceSoja === "Presidente Venceslau (SP)") {
        resetExtratoras_cstudySoja();

        pVenceslauSoja = L.marker(l_pVenceslau).bindPopup("Presidente Venceslau/SP at <b>" + l_pVenceslau.toString() + "</b>").openPopup();
        map.addLayer(pVenceslauSoja);

        //var pVenceslau_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_pVenceslau_buffer_50km, format: 'image/png', transparent: true });
        //map.addLayer(pVenceslau_buffer);
        
        // Posiciona o mapa na localização
        //map.flyTo(l_pVenceslau, 9);
    } else {
        resetExtratoras_cstudySoja();
    }
});

// Todos os outros
$("#capacidadeSoja").on('change', function(){
    //console.debug($("input[name='capacidade']").val());
    console.debug(this.value);

    //capacidade = $("input[name='capacidade']").val();
    capacidadeSoja = this.value;
    capacidadeSoja_valor = this.options[this.selectedIndex].text;
    inputReqCalc_soja = $(this).find(':selected').data('input');

    capacidadeSoja_rules();
});

// Brumado
$("#capacidadeSoja2").on('change', function(){
    //console.debug($("input[name='capacidade']").val());
    console.debug(this.value);

    //capacidade = $("input[name='capacidade']").val();
    capacidadeSoja = this.value;
    capacidadeSoja_valor = this.options[this.selectedIndex].text;

    capacidadeSoja_rules();
});

// Botao next (Step #1)
$("button.soja-step1-next").on("click", function() {
    if ((routeSoja === "" || routeSoja === "--") && (feedstockSoja === "" || feedstockSoja === "--")) {
        $.alert({
            boxWidth: '40%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>Conversion technology</b> and the <b>Feedstock</b>.',
            useBootstrap: false
        });
    } else if (routeSoja === "" || routeSoja === "--") {
        $.alert({
            boxWidth: '30%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>Conversion technology</b>.',
            useBootstrap: false
        });
    } else if (feedstockSoja === "" || feedstockSoja === "--") {
        $.alert({
            boxWidth: '30%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>Feedstock</b>.',
            useBootstrap: false
        });
    } else {
        if (typeof(selecionadoSoja) == 'undefined' || selecionadoSoja != "0") {
            // Case Study Soja
            cstudy_soja = true;
            if (cstudy_eucalipto) {
                setFalse_cstudyEucalipto();
            }
        }

        $("#soja-step1").css("display", "none");
        $("#soja-step2").css("display", "block");
    }
});

// Botao back (Step #2)
$("button.soja-step2-back").on("click", function() {
    $("#soja-step2").css("display", "none");
    $("#soja-step1").css("display", "block");
});

// Botao calculate (Step #2)
$("button.soja-step2-calc").on("click", function() {
    if ((tipoInstalacaoSoja === "" || tipoInstalacaoSoja === "--") 
            && (capacidadeSoja === "" || capacidadeSoja === "--")
            && (locationSoja === "" || locationSoja === "--")) {
        $.alert({
            boxWidth: '40%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>Case Study</b>, the <b>Location</b> and the <b>Output capacity</b>.',
            useBootstrap: false
        });
    } else if (tipoInstalacaoSoja === "" || tipoInstalacaoSoja === "--") {
        $.alert({
            boxWidth: '30%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>Case Study</b>.',
            useBootstrap: false
        });
    } else if (locationSoja === "" || locationSoja === "--") {
        $.alert({
            boxWidth: '30%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>Location</b>.',
            useBootstrap: false
        });
    } else if (capacidadeSoja === "" || capacidadeSoja === "--") {
        $.alert({
            boxWidth: '30%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>Output capacity</b>.',
            useBootstrap: false
        });
    } else if (tipoInstalacaoSoja === "3- Greenfield / vertical supply chain" 
                && oilSourceSoja === "" || oilSourceSoja === "--") {
        $.alert({
            boxWidth: '30%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>Processing Units</b>.',
            useBootstrap: false
        });
    } else {
        capacitySelection();
        if (tipoInstalacaoSoja === "1- Soybean oil exported (2018)") {
            result_panel_soja = "<div style='margin-left:10%; overflow-y:auto; height: 100%''>" +
                                    "<div><img src='images/logo_safmaps_degrade.png' width='13%' style='float: right; margin-right: 7.3rem'>" +
                                        "<h6 style='font-weight:bold'>Selection summary:</h6>" +
                                        "<div style='font-size: 0.9rem;padding-left:2rem;border-bottom: lightgray;border-bottom-width: 1px;border-bottom-style: solid;width: 86%;'>" +
                                            "<b>Conversion tecnology:</b> " + routeSoja + 
                                            "<br/><b>Feedstock:</b> " + feedstockSoja +
                                            "<br/><b>Case Study:</b> " + tipoInstalacaoSoja +
                                            "<br/><b>SAF production:</b> " + locationSoja +
                                            "<br/><b>Output capacity (t.day<sup>-1</sup>):</b> " + capacidadeSoja_valor +
                                            "<br/><br/>" +
                                        "</div>" +
                                    "</div><br/><br/>" +
                                    "<div><h6 style='font-weight:bold; margin-left:5px'>Data table</h6>" +
                                        "<img src='images/cstudies_soja/" + resultado_soja_png + "' width='80%'></div>" +
                                    "<div style='margin-top:4rem; '>" +
                                        "<div><h6 style='font-weight:bold; margin-left:5px'>Comparison table</h6>" +
                                        "<img src='images/cstudies_soja/" + comparacao_soja_png + "' width='80%'></div>" +
                                    "<br/><br/>" +
                                "</div>"
        } else {
            if (oilSourceSoja === "Brumado (BA)") {
                result_panel_soja = "<div style='margin-left:10%; overflow-y:auto; height: 100%''>" +
                                        "<div><img src='images/logo_safmaps_degrade.png' width='13%' style='float: right; margin-right: 7.3rem'>" +
                                        "<h6 style='font-weight:bold'>Selection summary:</h6>" +
                                        "<div style='font-size: 0.9rem;padding-left:2rem;border-bottom: lightgray;border-bottom-width: 1px;border-bottom-style: solid;width: 86%;'>" +
                                            "<b>Conversion tecnology:</b> " + routeSoja + 
                                            "<br/><b>Feedstock:</b> " + feedstockSoja +
                                            "<br/><b>Case Study:</b> " + tipoInstalacaoSoja +
                                            "<br/><b>SAF production:</b> " + locationSoja +
                                            "<br/><b>Oil Extraction:</b> " + oilSourceSoja +
                                            "<br/><b>Output capacity (t.day<sup>-1</sup>):</b> " + capacidadeSoja_valor +
                                            "<br/><br/>" +
                                        "</div>" +
                                    "</div><br/><br/>" +
                                    "<div><h6 style='font-weight:bold'>Soybean oil supply curve</h6>" +
                                        "<img src='images/cstudies_soja/" + curva_oferta_soja_png + "' width='85%'></div>" +
                                    "<div style='margin-top:4rem; '>" +
                                        "<div><h6 style='font-weight:bold; margin-left:5px'>Data table</h6>" +
                                        "<img src='images/cstudies_soja/" + resultado_soja_png + "' width='80%' ></div>" +
                                    "<br/><br/>" +
                                "</div>"
            } else {
                result_panel_soja = "<div style='margin-left:10%; overflow-y:auto; height: 100%''>" +
                                        "<div><img src='images/logo_safmaps_degrade.png' width='13%' style='float: right; margin-right: 7.3rem'>" +
                                        "<h6 style='font-weight:bold'>Selection summary:</h6>" +
                                        "<div style='font-size: 0.9rem;padding-left:2rem;border-bottom: lightgray;border-bottom-width: 1px;border-bottom-style: solid;width: 86%;'>" +
                                            "<b>Conversion tecnology:</b> " + routeSoja + 
                                            "<br/><b>Feedstock:</b> " + feedstockSoja +
                                            "<br/><b>Case Study:</b> " + tipoInstalacaoSoja +
                                            "<br/><b>SAF production:</b> " + locationSoja +
                                            "<br/><b>Oil Extraction:</b> " + oilSourceSoja +
                                            "<br/><b>Output capacity (t.day<sup>-1</sup>):</b> " + capacidadeSoja_valor +
                                            "<br/><br/>" +
                                        "</div>" +
                                    "</div><br/><br/>" +
                                    "<div><h6 style='font-weight:bold'>Soybean oil supply curve</h6>" +
                                        "<img src='images/cstudies_soja/" + curva_oferta_soja_png + "' width='85%'></div>" +
                                    "<div style='margin-top:4rem; '>" +
                                        "<div><h6 style='font-weight:bold; margin-left:5px'>Data table</h6>" +
                                        "<img src='images/cstudies_soja/" + resultado_soja_png + "' width='80%' ></div>" +
                                    "<div style='margin-top:4rem; '>" +
                                        "<div><h6 style='font-weight:bold; margin-left:5px'>Comparison table</h6>" +
                                            "<img src='images/cstudies_soja/" + comparacao_soja_png + "' width='80%'></div>" +
                                    "<br/><br/>" +
                                "</div>"
            }

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
        }
    }

    // Janela Curva Oferta
    removePanelbyTitle("Results");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 1000, height: 600},
        headerTitle: "Results",
        //content:    "<div id='placeholder' style='width:90%;height:90%'></div>",
        content:	result_panel_soja,
        callback:    function () {
            this.content.css("padding", "15px");
            
        }
    });
});

// Reset controls
function resetControls_cstudySoja() {
    $("#nomeMunicipioSoja").text(" ...");
    $("#nomeMunicipioSoja").css("color", "black");

    $("#location_case1").css("display", "none");
    $("#locationSoja_case1").val('--');

    $("#location_case2").css("display", "none");
    $("#locationSoja_case2").val('--');

    $("#location_case3").css("display", "none");
    $("#locationSoja_case3").val('--');

    $("#oilSource_case3").css("display", "none");
    $("#oilSourceSoja_case3").val('--');

    cstudy_soja = false;
}

function resetControlsCapacity_cstudySoja() {
    //Output
    $("#capacidadeSoja").val('--');
    $("#inputReqSoja").text("... t.day-1 (biomass, dry basis)");
    $("#inputReqSoja").css("color", "black");

    //Co-products
    $("#gasolineSoja").text("Gasoline");
    $("#gasolineSoja").css("color", "black");

    $("#lpgSoja").text("LPG");
    $("#lpgSoja").css("color", "black");			  
}

function resetPoints_cstudySoja() {
    // REMOVE MARCADORES
    if (revapSoja != undefined && revapSoja != '') {
        map.removeLayer(revapSoja);
        revapSoja = '';
    } else if (rnestSoja != undefined && rnestSoja != '') {
        map.removeLayer(rnestSoja);
        rnestSoja = '';
    }
}	  

function resetExtratoras_cstudySoja() {
    // REMOVE MARCADORES
    if (brumadoSoja != undefined && brumadoSoja != '') {
        map.removeLayer(brumadoSoja);
        brumadoSoja = '';
    } else if (paranaibaSoja != undefined && paranaibaSoja != '') {
        map.removeLayer(paranaibaSoja);
        paranaibaSoja = '';
    } else if (pVenceslauSoja != undefined && pVenceslauSoja != '') {
        map.removeLayer(pVenceslauSoja);
        pVenceslauSoja = '';
    }
}	 

function capacidadeSoja_rules() {
    // Seleção dos output capacities
    if (oilSourceSoja === "Brumado (BA)") {
        $("#capacidadeSojaAll").css("display", "none");
        $("#capacidadeSojaBrumado").css("display", "block");
    } else {
        $("#capacidadeSojaAll").css("display", "block");
        $("#capacidadeSojaBrumado").css("display", "none");
    }

    if (capacidadeSoja != '' && capacidadeSoja != '--') {
        //Output
        //var output_value = parseFloat(capacidadeSoja.replace(",", ".")) / 0.16 / 0.17;
        var output_value = parseFloat(inputReqCalc_soja);

        $("#inputReqSoja").text(inputReqCalc_soja + " t.day-1 (biomass, dry basis)");
        $("#inputReqSoja").css("color", "blue");

        //Co-products
        var diesel_value = output_value * 0.83 * 0.769491525423729;
        var lpg_value = output_value * 0.83 * 0.0180790960451977;

        //$("#gasolineSoja").text("Gasoline: " + parseInt(gasoline_value) + "  t.day<sup>-1</sup>");
        $("#dieselSoja").text("Diesel: " + Math.round(diesel_value) + "  t.day-1");
        $("#dieselSoja").css("color", "blue");

        $("#lpgSoja").text("LPG: " + Math.round(lpg_value) + "  t.day-1");
        $("#lpgSoja").css("color", "blue");

        capacitySelection();
    } else {
        //Output
        $("#inputReqSoja").text("... t.day-1 (biomass, dry basis)");
        $("#inputReqSoja").css("color", "black");

        //Co-products
        $("#dieselSoja").text("Diesel");
        $("#dieselSoja").css("color", "black");

        $("#lpgSoja").text("LPG");
        $("#lpgSoja").css("color", "black");
    }
}

function capacitySelection() {
    if (tipoInstalacaoSoja === "1- Soybean oil exported (2018)") {
        // Case 1 - REVAP
        if (capacidadeSoja === '1') {
            resultado_soja_png = 'tab_case1_20t.png';
        } else if (capacidadeSoja === '2') {
            resultado_soja_png = 'tab_case1_51t.png';
        } else if (capacidadeSoja === '3') {
            resultado_soja_png = 'tab_case1_75t.png';
        } else if (capacidadeSoja === '4') {
            resultado_soja_png = 'tab_case1_150t.png';
        } else if (capacidadeSoja === '5') {
            resultado_soja_png = 'tab_case1_300t.png';
        }
        comparacao_soja_png = 'comparacao_REVAP_case1.png';
    } else if (tipoInstalacaoSoja === "2a- Surplus oil (2018) / market price") {
        // Case 2a - REVAP
        if (locationSoja === "REVAP") {
            if (capacidadeSoja === '1') {
                curva_oferta_soja_png = 'fig_REVAP_case2a_20t.png';
                resultado_soja_png = 'tab_REVAP_case2a_20t.png';
            } else if (capacidadeSoja === '2') {
                curva_oferta_soja_png = 'fig_REVAP_case2a_51t.png';
                resultado_soja_png = 'tab_REVAP_case2a_51t.png';
            } else if (capacidadeSoja === '3') {
                curva_oferta_soja_png = 'fig_REVAP_case2a_75t.png';
                resultado_soja_png = 'tab_REVAP_case2a_75t.png';
            } else if (capacidadeSoja === '4') {
                curva_oferta_soja_png = 'fig_REVAP_case2a_150t.png';
                resultado_soja_png = 'tab_REVAP_case2a_150t.png';
            } else if (capacidadeSoja === '5') {
                curva_oferta_soja_png = 'fig_REVAP_case2a_300t.png';
                resultado_soja_png = 'tab_REVAP_case2a_300t.png';
            }
            comparacao_soja_png = 'comparacao_REVAP_case2a.png';
        } else if (locationSoja === "RNEST") {
            // Case 2a - RNEST
            if (capacidadeSoja === '1') {
                curva_oferta_soja_png = 'fig_RNEST_case2a_20t.png';
                resultado_soja_png = 'tab_RNEST_case2a_20t.png';
            } else if (capacidadeSoja === '2') {
                curva_oferta_soja_png = 'fig_RNEST_case2a_51t.png';
                resultado_soja_png = 'tab_RNEST_case2a_51t.png';
            } else if (capacidadeSoja === '3') {
                curva_oferta_soja_png = 'fig_RNEST_case2a_75t.png';
                resultado_soja_png = 'tab_RNEST_case2a_75t.png';
            } else if (capacidadeSoja === '4') {
                curva_oferta_soja_png = 'fig_RNEST_case2a_150t.png';
                resultado_soja_png = 'tab_RNEST_case2a_150t.png';
            } else if (capacidadeSoja === '5') {
                curva_oferta_soja_png = 'fig_RNEST_case2a_300t.png';
                resultado_soja_png = 'tab_RNEST_case2a_300t.png';
            }
            comparacao_soja_png = 'comparacao_RNEST_case2a.png';
        }
    } else if (tipoInstalacaoSoja === "2b- Surplus oil (2018) / supply chain") {
        // Case 2b - REVAP
        if (locationSoja === "REVAP") {
            if (capacidadeSoja === '1') {
                curva_oferta_soja_png = 'fig_REVAP_case2b_20t.png';
                resultado_soja_png = 'tab_REVAP_case2b_20t.png';
            } else if (capacidadeSoja === '2') {
                curva_oferta_soja_png = 'fig_REVAP_case2b_51t.png';
                resultado_soja_png = 'tab_REVAP_case2b_51t.png';
            } else if (capacidadeSoja === '3') {
                curva_oferta_soja_png = 'fig_REVAP_case2b_75t.png';
                resultado_soja_png = 'tab_REVAP_case2b_75t.png';
            } else if (capacidadeSoja === '4') {
                curva_oferta_soja_png = 'fig_REVAP_case2b_150t.png';
                resultado_soja_png = 'tab_REVAP_case2b_150t.png';
            } else if (capacidadeSoja === '5') {
                curva_oferta_soja_png = 'fig_REVAP_case2b_300t.png';
                resultado_soja_png = 'tab_REVAP_case2b_300t.png';
            }
            comparacao_soja_png = 'comparacao_REVAP_case2b.png';
        } else if (locationSoja === "RNEST") {
            // Case 2b - RNEST
            if (capacidadeSoja === '1') {
                curva_oferta_soja_png = 'fig_RNEST_case2b_20t.png';
                resultado_soja_png = 'tab_RNEST_case2b_20t.png';
            } else if (capacidadeSoja === '2') {
                curva_oferta_soja_png = 'fig_RNEST_case2b_51t.png';
                resultado_soja_png = 'tab_RNEST_case2b_51t.png';
            } else if (capacidadeSoja === '3') {
                curva_oferta_soja_png = 'fig_RNEST_case2b_75t.png';
                resultado_soja_png = 'tab_RNEST_case2b_75t.png';
            } else if (capacidadeSoja === '4') {
                curva_oferta_soja_png = 'fig_RNEST_case2b_150t.png';
                resultado_soja_png = 'tab_RNEST_case2b_150t.png';
            } else if (capacidadeSoja === '5') {
                curva_oferta_soja_png = 'fig_RNEST_case2b_300t.png';
                resultado_soja_png = 'tab_RNEST_case2b_300t.png';
            }
            comparacao_soja_png = 'comparacao_RNEST_case2b.png';
        }
    } else if (tipoInstalacaoSoja === "3- Greenfield / vertical supply chain") {
        // Case 3 - REVAP
        if (locationSoja === "REVAP") {
            if (oilSourceSoja === "Brumado (BA)") {
                if (capacidadeSoja === '1') {
                    curva_oferta_soja_png = 'fig_REVAP_Brumado_20t.png';
                    resultado_soja_png = 'tab_REVAP_Brumado_20t.png';
                } 
                //comparacao_soja_png = 'comparacao_Brumado_Paranaiba.png';
            } else if (oilSourceSoja === "Paranaíba (MS)") {
                if (capacidadeSoja === '1') {
                    curva_oferta_soja_png = 'fig_REVAP_caseParanaiba_20t.png';
                    resultado_soja_png = 'tab_REVAP_caseParanaiba_20t.png';
                } else if (capacidadeSoja === '2') {
                    curva_oferta_soja_png = 'fig_REVAP_caseParanaiba_51t.png';
                    resultado_soja_png = 'tab_REVAP_caseParanaiba_51t.png';
                } else if (capacidadeSoja === '3') {
                    curva_oferta_soja_png = 'fig_REVAP_caseParanaiba_75t.png';
                    resultado_soja_png = 'tab_REVAP_caseParanaiba_75t.png';
                } else if (capacidadeSoja === '4') {
                    curva_oferta_soja_png = 'fig_REVAP_caseParanaiba_150t.png';
                    resultado_soja_png = 'tab_REVAP_caseParanaiba_150t.png';
                } else if (capacidadeSoja === '5') {
                    curva_oferta_soja_png = 'fig_REVAP_caseParanaiba_300t.png';
                    resultado_soja_png = 'tab_REVAP_caseParanaiba300t.png';
                }
                comparacao_soja_png = 'comparacao_REVAP_caseParanaiba.png';
            } else if (oilSourceSoja === "Presidente Venceslau (SP)") {
                if (capacidadeSoja === '1') {
                    curva_oferta_soja_png = 'fig_REVAP_Pres_Venc_20t.png';
                    resultado_soja_png = 'tab_REVAP_Pres_Venc_20t.png';
                } else if (capacidadeSoja === '2') {
                    curva_oferta_soja_png = 'fig_REVAP_Pres_Venc_51t.png';
                    resultado_soja_png = 'tab_REVAP_Pres_Venc_51t.png';
                } else if (capacidadeSoja === '3') {
                    curva_oferta_soja_png = 'fig_REVAP_Pres_Venc_75t.png';
                    resultado_soja_png = 'tab_REVAP_Pres_Venc_75t.png';
                } else if (capacidadeSoja === '4') {
                    curva_oferta_soja_png = 'fig_REVAP_Pres_Venc_150t.png';
                    resultado_soja_png = 'tab_REVAP_Pres_Venc_150t.png';
                } else if (capacidadeSoja === '5') {
                    curva_oferta_soja_png = 'fig_REVAP_Pres_Venc_300t.png';
                    resultado_soja_png = 'tab_REVAP_Pres_Venc_300t.png';
                }
                comparacao_soja_png = 'comparacao_REVAP_Pres_Venc.png';
            }
        } else if (locationSoja === "RNEST") {
            // Case 3 - RNEST
            if (oilSourceSoja === "Brumado (BA)") {
                if (capacidadeSoja === '1') {
                    curva_oferta_soja_png = 'fig_RNEST_Brumado_20t.png';
                    resultado_soja_png = 'tab_RNEST_Brumado_20t.png';
                } 
                //comparacao_soja_png = 'comparacao_REVAP_Brumado.png';
            } else if (oilSourceSoja === "Paranaíba (MS)") {
                if (capacidadeSoja === '1') {
                    curva_oferta_soja_png = 'fig_RNEST_Paranaiba_20t.png';
                    resultado_soja_png = 'tab_RNEST_Paranaiba_20t.png';
                } else if (capacidadeSoja === '2') {
                    curva_oferta_soja_png = 'fig_RNEST_Paranaiba_51t.png';
                    resultado_soja_png = 'tab_RNEST_Paranaiba_51t.png';
                } else if (capacidadeSoja === '3') {
                    curva_oferta_soja_png = 'fig_RNEST_Paranaiba_75t.png';
                    resultado_soja_png = 'tab_RNEST_Paranaiba_75t.png';
                } else if (capacidadeSoja === '4') {
                    curva_oferta_soja_png = 'fig_RNEST_Paranaiba_150t.png';
                    resultado_soja_png = 'tab_RNEST_Paranaiba_150t.png';
                } else if (capacidadeSoja === '5') {
                    curva_oferta_soja_png = 'fig_RNEST_Paranaiba_300t.png';
                    resultado_soja_png = 'tab_RNEST_Paranaiba_300t.png';
                }
                comparacao_soja_png = 'comparacao_RNEST_Paranaiba.png';
            } else if (oilSourceSoja === "Presidente Venceslau (SP)") {
                if (capacidadeSoja === '1') {
                    curva_oferta_soja_png = 'fig_RNEST_Pres_Venc_20t.png';
                    resultado_soja_png = 'tab_RNEST_Pres_Venc_20t.png';
                } else if (capacidadeSoja === '2') {
                    curva_oferta_soja_png = 'fig_RNEST_Pres_Venc_51t.png';
                    resultado_soja_png = 'tab_RNEST_Pres_Venc_51t.png';
                } else if (capacidadeSoja === '3') {
                    curva_oferta_soja_png = 'fig_RNEST_Pres_Venc_75t.png';
                    resultado_soja_png = 'tab_RNEST_Pres_Venc_75t.png';
                } else if (capacidadeSoja === '4') {
                    curva_oferta_soja_png = 'fig_RNEST_Pres_Venc_150t.png';
                    resultado_soja_png = 'tab_RNEST_Pres_Venc_150t.png';
                } else if (capacidadeSoja === '5') {
                    curva_oferta_soja_png = 'fig_RNEST_Pres_Venc_300t.png';
                    resultado_soja_png = 'tab_RNEST_Pres_Venc_300t.png';
                }
                comparacao_soja_png = 'comparacao_RNEST_Pres_Venc.png';
            }
        }
    }
}


/*
 * JANELAS INFO - MAPAS
 */

// Soja - INFO
// Aptidão
$("#info-aptidao_soja").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 500, height: 300},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Soybean suitability</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Suitability estimated based on climatic and geographic parameters, soil suitability for agriculture and slope, considering planting period from September to January." +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> SAFmaps (2021)" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://dx.doi.org/10.17632/jpwggmp9zy.3'>Download page</a></p>" +
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
$("#info-produtividade_soja").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 500, height: 300},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Expected soybean yield</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Estimated based on a statistical model defined in a municipal basis. The set of explanatory variables includes climatic parameters, soil suitability and dummy variables that set differences among three levels of yields.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> SAFmaps (2021)" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://dx.doi.org/10.17632/jpwggmp9zy.3'>Download page</a></p>" +
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
$("#info-custo_soja").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 520, height: 310},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Expected costs of soybean production</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Expected costs of soy production in new areas of production, in R$ (2018), considering that the expansion of soy crop would occur displacing pasturelands. " +
                                "The costs include typical costs of sowing, crop management, harvest and short-term grain storage, and also land prices (land used as pastures).</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> SAFmaps (2021)" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://dx.doi.org/10.17632/jpwggmp9zy.3'>Download page</a></p>" +
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


