/*
 * All panels, controls and other issues related to: PALM
 *
 * 
 */

// MENU: Panel activation
$("#sip-hfs").click(function(e) {
    e.preventDefault();

    reset_actived (e);
    $("#panel-support-maps").css("display", "none");
    $("#panel-corsia").css("display", "none");
    $("#panel-eucalipto").css("display", "none");
    $("#panel-eucalipto-residues").css("display", "none");
    $("#panel-soja").css("display", "none");
    $("#panel-macauba").css("display", "none");
    $("#panel-sugarcane").css("display", "none");
    $("#panel-sugarcane-residues").css("display", "none");	
    $("#panel-corn").css("display", "none");		
    $("#panel-tallow").css("display", "none");		
    $("#panel-off_gases").css("display", "none");
    $("#panel-uco-residues").css("display", "none");			
    $("#empty").css("display", "none");
    $("#panel-palma").css("display", "block");		
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

    // Load layers groups
    group_1 = ['DBMS:aptidao_palma','DBMS:custos_palma','DBMS:produtividade_palma'];
    group_2 = ['DBMS:main_roads','DBMS:railroads_fd_stock','DBMS:pipelines_fd_stock','DBMS:waterways_fd_stock'];
    group_3 = ['DBMS:airports_fd_stock','DBMS:refineries_refining_fd_stock']; 
    
});  


/*
 *  PALM LAYERS (from GeoServer) and variables
 */

var revapPalma = '', rnestPalma = '';

var l_aptidao_palma = 'DBMS:aptidao_palma';
var l_custos_palma = 'DBMS:custos_palma';
var l_produtividade_palma = 'DBMS:produtividade_palma';

var l_altoAraguaia = [-17.271993, -53.237640];
var l_terraNova = [-10.524189, -55.221556];
var l_saoMiguel = [-1.614285, -47.481303];
var l_xinguara = [-7.099728, -49.942025];

var curva_oferta_palma_png = '', resultado_palma_png = '', comparacao_palma_png = '', result_panel_palma = '';


/*
 *  PALM LAYERS
 */

// Palm suitability (Layer)
$("#toggle-aptidao_palma").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-produtividade_palma').prop('checked', false);
    $('#toggle-custo_palma').prop('checked', false);
    //reset_all_legends();
    removeLayers_group("gp_1");

    options['layers'] = l_aptidao_palma;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_aptidao_palma, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        $("#legend-produtividade_palma").css("display", "none");
        $("#legend-custo_palma").css("display", "none");
        $("#legend-aptidao_palma").css("display", "block");
        reorderLayers();
    } else {
        $("#legend-aptidao_palma").css("display", "none");
        removeLayer(l_aptidao_palma);
    }
});

// Palm Oil yield (Layer)
$("#toggle-produtividade_palma").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-aptidao_palma').prop('checked', false);
    $('#toggle-custo_palma').prop('checked', false);
    //reset_all_legends();
    removeLayers_group("gp_1");

    options['layers'] = l_produtividade_palma;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_produtividade_palma, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        $("#legend-custo_palma").css("display", "none");
        $("#legend-aptidao_palma").css("display", "none");
        $("#legend-produtividade_palma").css("display", "block");
        reorderLayers();
    } else {
        $("#legend-produtividade_palma").css("display", "none");
        removeLayer(l_produtividade_palma);
    }
});

// Cost of palm production (Layer)
$("#toggle-custo_palma").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-aptidao_palma').prop('checked', false);
    $('#toggle-produtividade_palma').prop('checked', false);
    //reset_all_legends();
    removeLayers_group("gp_1");

    options['layers'] = l_custos_palma;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_custos_palma, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        $("#legend-aptidao_palma").css("display", "none");
        $("#legend-produtividade_palma").css("display", "none");
        $("#legend-custo_palma").css("display", "block");
        reorderLayers();
    } else {
        $("#legend-custo_palma").css("display", "none");
        removeLayer(l_custos_palma);
    }
});

// INFRASTRUCTURE
// toggle-roads (Layer)
$("#toggle-roads_fd_04").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-railroads_fd_04').prop('checked', false);
    $('#toggle-pipelines_fd_04').prop('checked', false);
    $('#toggle-waterways_fd_04').prop('checked', false);
    //reset_all_legends();
    removeLayers_group("gp_2");

    options['layers'] = l_main_roads_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_roads_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);  
        map.addLayer(prov);

        $("#legend-railroads_fd_stock").css("display", "none");
        $("#legend-pipelines_fd_stock").css("display", "none");
        $("#legend-waterways_fd_stock").css("display", "none");
        $("#legend-main_roads").css("display", "block");
        reorderLayers();
    } else {
        $("#legend-main_roads").css("display", "none");
        removeLayer(l_main_roads_src);
    }
});

// toggle-railroads (Layer)
$("#toggle-railroads_fd_04").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-roads_fd_04').prop('checked', false);
    $('#toggle-pipelines_fd_04').prop('checked', false);
    $('#toggle-waterways_fd_04').prop('checked', false);
    //reset_all_legends();
    removeLayers_group("gp_2");

    options['layers'] = l_railroads_fd_stock_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_railroads_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);  
        map.addLayer(prov);

        $("#legend-pipelines_fd_stock").css("display", "none");
        $("#legend-waterways_fd_stock").css("display", "none");
        $("#legend-main_roads").css("display", "none");
        $("#legend-railroads_fd_stock").css("display", "block");
        reorderLayers();
    } else {
        $("#legend-railroads_fd_stock").css("display", "none");
        removeLayer(l_railroads_fd_stock_src);
    }
});

// toggle-pipelines (Layer)
$("#toggle-pipelines_fd_04").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-roads_fd_04').prop('checked', false);
    $('#toggle-railroads_fd_04').prop('checked', false);
    $('#toggle-waterways_fd_04').prop('checked', false);
    //reset_all_legends();
    removeLayers_group("gp_2");

    options['layers'] = l_pipelines_fd_stock_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_pipelines_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);  
        map.addLayer(prov);

        $("#legend-railroads_fd_stock").css("display", "none");
        $("#legend-waterways_fd_stock").css("display", "none");
        $("#legend-main_roads").css("display", "none");
        $("#legend-pipelines_fd_stock").css("display", "block");
        reorderLayers();
    } else {
        $("#legend-pipelines_fd_stock").css("display", "none");
        removeLayer(l_pipelines_fd_stock_src);
    }
});

// toggle-waterways (Layer)
$("#toggle-waterways_fd_04").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-roads_fd_04').prop('checked', false);
    $('#toggle-railroads_fd_04').prop('checked', false);
    $('#toggle-pipelines_fd_04').prop('checked', false);
    //reset_all_legends();
    removeLayers_group("gp_2");

    options['layers'] = l_waterways_fd_stock_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_waterways_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        $("#legend-railroads_fd_stock").css("display", "none");
        $("#legend-pipelines_fd_stock").css("display", "none");
        $("#legend-main_roads").css("display", "none");
        $("#legend-waterways_fd_stock").css("display", "block");
        reorderLayers();
    } else {
        $("#legend-waterways_fd_stock").css("display", "none");
        removeLayer(l_waterways_fd_stock_src);
    }
});

// Complementary information
// toggle-airports (Layer)
$("#toggle-airports_fd_04").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    //reset_all_legends();
    //removeLayers();

    options['layers'] = l_airports_fd_stock_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_airports_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);
                
        $("#legend-airports_fd_stock").css("display", "block");
    } else {
        $("#legend-airports_fd_stock").css("display", "none");
        removeLayer(l_airports_fd_stock_src);
    }
});

// toggle-refineries_refining (Layer)
$("#toggle-refineries_refining_fd_04").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    //reset_all_legends();
    //removeLayers();

    options['layers'] = l_refineries_refining_fd_stock_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_refineries_refining_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);
                
        $("#legend-refineries_refining_fd_stock").css("display", "block");
    } else {
        $("#legend-refineries_refining_fd_stock").css("display", "none");
        removeLayer(l_refineries_refining_fd_stock_src);
    }
});


/* 
 * CASE STUDY
 */

// Variaveis
var routePalma = '', feedstockPalma = '';
var selecionadoPalma = '', tipoInstalacaoPalma = '', capacidadePalma = '', capacidadePalma_valor = '';
var locationPalma = '', oilSourcePalma = '';
var inputReqCalc_palma = '';

var altoAraguaiaPalma = '', terraNovaPalma = '', saoMiguelPalma = '', xinguaraPalma = '';

var cstudy_palma = false;

// Selecao da rota
$("#palmaRota").on('change', function(){
    routePalma = this.value;
});

// Selecao do feedstock
$("#palmaFStock").on('change', function(){
    feedstockPalma = this.value;
});

// Seleção mapa de apoio
$("#palmaMaps").on('change', function(){
    console.debug(this.value);

    selecionadoPalma = this.value;

    // Case Study Macauba
    cstudy_palma = true;
    if (cstudy_eucalipto) {
        setFalse_cstudyEucalipto();
    }	

    // Palm oil suitability
    if (selecionadoPalma === "1") {
        $('input:checkbox').not(this).prop('checked', false);
        reset_all_legends();
        removeLayers();

        options['layers'] = l_aptidao_palma;
        var aptidao_palma= L.tileLayer.wms(url, options);
        map.addLayer(aptidao_palma);

        $("#legend-aptidao_palma").css("display", "block");
    // Costs of palm production
    } else if (selecionadoPalma === "3") {
        $('input:checkbox').not(this).prop('checked', false);
        reset_all_legends();
        removeLayers();

        options['layers'] = l_custos_palma;
        var custos_palma= L.tileLayer.wms(url, options);
        map.addLayer(custos_palma);

        $("#legend-custo_palma").css("display", "block");
    // Palm oil yield
    } else if (selecionadoPalma === "2") {
        $('input:checkbox').not(this).prop('checked', false);
        reset_all_legends();
        removeLayers();

        options['layers'] = l_produtividade_palma;
        var produtividade_palma = L.tileLayer.wms(url, options);
        map.addLayer(produtividade_palma);

        $("#legend-produtividade_palma").css("display", "block");
    // Continue without maps
    } else if (selecionadoPalma === "0") {
        $('input:checkbox').not(this).prop('checked', false);
        reset_all_legends();
        removeLayers();
    }
});	

$("#locationPalma").on('change', function(){
    console.debug(this.value);

    locationPalma = this.value;
    locationPalma_valor = this.options[this.selectedIndex].text;

    // Janela Curva Oferta
    removePanelbyTitle("Results");

    // if (capacidadePalma != '' && capacidadePalma != '--') {
    // 	capacitySelectionPalma();
    // }

    // INSERIR FUNÇÃO PRA REMOVER MARCADOR
    resetPoints_cstudySoja();
    resetExtratoras_cstudySoja();
    resetExtratoras_cstudyPalma();	
    resetControls_oilSource_cstudyPalma();
    resetControls_capacidade_cstudyPalma();
    
    if (locationPalma === "1") {
        // REMOVE MARCADORES
        if (rnestPalma != undefined && rnestPalma != '') {
            map.removeLayer(rnestPalma);
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

        //revapPalma = L.marker(l_revap).bindPopup("REVAP at <b>" + l_revap.toString() + "</b>").openPopup();
        //revapPalma = L.marker(l_revap, { icon : redMarker }).bindPopup("REVAP at <b>" + l_revap.toString() + "</b>").openPopup();
        revapPalma = L.marker(l_revap, { icon : blackMarker }).bindPopup(popup);
        map.addLayer(revapPalma);

        //var revap_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_revap_buffer_50km, format: 'image/png', transparent: true });
        //map.addLayer(revap_buffer);
        
        // Posiciona o mapa na localização
        map.flyTo(l_revap, 5);

        // Controls of Oil Source
        $("#oilSourcePalmaRnest").css("display", "none");
        $("#oilSourcePalmaRevap").css("display", "inline-block");	

        $("#nomeMunicipioPalma").text("SÃO JOSÉ DOS CAMPOS/SP");
        //$("#nomeMunicipioPalma").css("color", "blue");
        $("#nomeMunicipioPalma").css("font-weight", "bold");
    } else if (locationPalma === "2") {
        // REMOVE MARCADORES
        if (revapPalma != undefined && revapPalma != '') {
            map.removeLayer(revapPalma);
        };

        //rnestPalma = L.marker(l_rnest).bindPopup("RNEST at <b>" + l_rnest.toString() + "</b>").openPopup();
        rnestPalma = L.marker(l_rnest, { icon : blackMarker }).bindPopup("RNEST at <b>" + l_rnest.toString() + "</b>").openPopup();
        map.addLayer(rnestPalma);

        //var revap_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_revap_buffer_50km, format: 'image/png', transparent: true });
        //map.addLayer(revap_buffer);
        
        // Posiciona o mapa na localização
        map.flyTo(l_rnest, 5);

        // Controls of Oil Source
        $("#oilSourcePalmaRevap").css("display", "none");
        $("#oilSourcePalmaRnest").css("display", "inline-block");	

        $("#nomeMunicipioPalma").text("IPOJUCA/PE");
        //$("#nomeMunicipioPalma").css("color", "blue");
        $("#nomeMunicipioPalma").css("font-weight", "bold");
    } else {
        $("#nomeMunicipioPalma").text(" ...");
        $("#nomeMunicipioPalma").css("color", "black");
    }

    // Variable for results window
    locationPalma_valor += " (" + $("#nomeMunicipioPalma").text() + ")";
});

$("#oilSourcePalma").on('change', function(){
    console.debug(this.value);

    oilSourcePalma = this.value;
    oilSourcePalma_valor = this.options[this.selectedIndex].text;

    // Janela Curva Oferta
    removePanelbyTitle("Results");

    resetControls_capacidade_cstudyPalma();
    oilSourcePalma_rules();
    capacidadePalma_rules();

    //resetControlsCapacity_cstudyPalma();
    // if (capacidadePalma != '' && capacidadePalma != '--') {
    // 	capacitySelectionPalma();
    // }
});

$("#oilSourcePalma2").on('change', function(){
    console.debug(this.value);

    oilSourcePalma = this.value;
    oilSourcePalma_valor = this.options[this.selectedIndex].text;

    // Janela Curva Oferta
    removePanelbyTitle("Results");

    resetControls_capacidade_cstudyPalma();
    oilSourcePalma_rules();
    capacidadePalma_rules();

    //resetControlsCapacity_cstudyPalma();
    // if (capacidadePalma != '' && capacidadePalma != '--') {
    // 	capacitySelectionPalma();
    // }
});

$("#capacidadePalma").on('change', function(){
    console.debug(this.value);

    capacidadePalma = this.value;
    capacidadePalma_valor = this.options[this.selectedIndex].text;
    inputReqCalc_palma = $(this).find(':selected').data('input');

    capacidadePalma_rules();
});

$("#capacidadePalma2").on('change', function(){
    console.debug(this.value);

    capacidadePalma = this.value;
    capacidadePalma_valor = this.options[this.selectedIndex].text;
    inputReqCalc_palma = $(this).find(':selected').data('input');

    capacidadePalma_rules();
});

// Botao next (Step #1)
$("button.palma-step1-next").on("click", function() {
    if ((routePalma === "" || routePalma === "--") && (feedstockPalma === "" || feedstockPalma === "--")) {
        $.alert({
            boxWidth: '40%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>Conversion technology</b> and the <b>Feedstock</b>.',
            useBootstrap: false
        });
    } else if (routePalma === "" || routePalma === "--") {
        $.alert({
            boxWidth: '30%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>Conversion technology</b>.',
            useBootstrap: false
        });
    } else if (feedstockPalma === "" || feedstockPalma === "--") {
        $.alert({
            boxWidth: '30%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>Feedstock</b>.',
            useBootstrap: false
        });
    } else {
        if (typeof(selecionadoPalma) == 'undefined' || selecionadoPalma != "0" && cstudy_palma == false) {
            // Case Study Palma
            cstudy_palma = true;
            if (cstudy_eucalipto) {
                setFalse_cstudyEucalipto();
            }
        }

        $("#palma-step1").css("display", "none");
        $("#palma-step2").css("display", "block");
    }
});

// Botao back (Step #2)
$("button.palma-step2-back").on("click", function() {
    $("#palma-step2").css("display", "none");
    $("#palma-step1").css("display", "block");
});

// Botao calculate (Step #2)
$("button.palma-step2-calc").on("click", function() {
    if ((locationPalma === "" || locationPalma === "--") 
            || (oilSourcePalma === "" || oilSourcePalma === "--")
            || (capacidadePalma === "" || capacidadePalma === "--")) {
        $.alert({
            boxWidth: '40%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>SAF Production</b>, the <b>Oil Extraction</b> and the <b>SAF Output capacity</b>.',
            useBootstrap: false
        });
    } else {
        capacitySelectionPalma();
        result_panel_palma = "<div style='margin-left:10%; overflow-y:auto; height: 100%''>" +
                                "<div><img src='images/logo_safmaps_degrade.png' width='13%' style='float: right; margin-right: 7.3rem'>" +
                                    "<h6 style='font-weight:bold; color: blue'>Selection summary:</h6>" +
                                    "<div class='div-feedstock-results'>" +
                                        "<b>Conversion tecnology:</b> " + routePalma + 
                                        "<br/><b>Feedstock:</b> " + feedstockPalma +
                                        "<br/><b>SAF Production at:</b> " + locationPalma_valor +
                                        "<br/><b>Oil Extraction:</b> " + oilSourcePalma_valor +
                                        "<br/><b>SAF Output capacity (t.day<sup>-1</sup>):</b> " + capacidadePalma_valor +
                                        "<br/><br/>" +
                                    "</div>" +
                                "</div><br/><br/>" +
                                "<div><h6 style='font-weight:bold'>Oil supply curve</h6>" +
                                    "<img src='images/cstudies_palma/" + curva_oferta_palma_png + "' width='85%' ></div>" +
                                "<div style='margin-top:4rem; '>" +
                                    "<div><h6 style='font-weight:bold; margin-left:5px'>Data table</h6>" +
                                    "<img src='images/cstudies_palma/" + resultado_palma_png + "' width='82%' ></div>" +
                                "<div style='margin-top:4rem; '>" +
                                    "<div><h6 style='font-weight:bold; margin-left:5px'>Comparison table</h6>" +
                                        "<img src='images/cstudies_palma/" + comparacao_palma_png + "' width='82%'></div>" +
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
            content:	result_panel_palma,
            callback:    function () {
                this.content.css("padding", "15px");
                
            }
        });
    }
});

// Reset controls
function resetPoints_cstudyPalma() {
    if (revapPalma != undefined && revapPalma != '') {
        map.removeLayer(revapPalma);
        revapPalma = '';
    }
    if (rnestPalma != undefined && rnestPalma != '') {
        map.removeLayer(rnestPalma);
        rnestPalma = '';
    }
}

function resetExtratoras_cstudyPalma() {
    // REMOVE MARCADORES
    if (altoAraguaiaPalma != undefined && altoAraguaiaPalma != '') {
        map.removeLayer(altoAraguaiaPalma);
        altoAraguaiaPalma = '';
    }
    if (terraNovaPalma != undefined && terraNovaPalma != '') {
        map.removeLayer(terraNovaPalma);
        terraNovaPalma = '';
    }
    if (saoMiguelPalma != undefined && saoMiguelPalma != '') {
        map.removeLayer(saoMiguelPalma);
        saoMiguelPalma = '';
    }
    if (xinguaraPalma != undefined && xinguaraPalma != '') {
        map.removeLayer(xinguaraPalma);
        xinguaraPalma = '';
    }
}

function resetControls_oilSource_cstudyPalma() {
    // Controls of Oil Source
    $("#oilSourcePalma option:selected").removeAttr("selected");
    $("#oilSourcePalma option[value='0']").attr('selected', 'selected');  

    $("#oilSourcePalma2 option:selected").removeAttr("selected");
    $("#oilSourcePalma2 option[value='0']").attr('selected', 'selected');  

    // Reset variables
    oilSourcePalma = "";
}

function resetControls_capacidade_cstudyPalma() {
    // Controls of Capacity
    $("#capacidadePalma option:selected").removeAttr("selected");
    $("#capacidadePalma option[value='0']").attr('selected', 'selected');

    $("#capacidadePalma2 option:selected").removeAttr("selected");
    $("#capacidadePalma2 option[value='0']").attr('selected', 'selected');

    // Reset variables
    capacidadePalma = "";
}

function oilSourcePalma_rules() {
    // REMOVER MARCADOR
    resetExtratoras_cstudySoja();
    resetExtratoras_cstudyMacauba();			
    resetExtratoras_cstudyPalma();			

    altoAraguaiaPalma = L.marker(l_altoAraguaia, { icon : blueMarker }).bindPopup("Alto Araguaia/MT at <b>" + l_altoAraguaia.toString() + "</b>").openPopup();
    terraNovaPalma = L.marker(l_terraNova, { icon : blueMarker }).bindPopup("Terra Nova do Norte/MT at <b>" + l_terraNova.toString() + "</b>").openPopup();
    saoMiguelPalma = L.marker(l_saoMiguel, { icon : blueMarker }).bindPopup("São Miguel do Guamá/PA at <b>" + l_saoMiguel.toString() + "</b>").openPopup();
    xinguaraPalma = L.marker(l_xinguara, { icon : blueMarker }).bindPopup("Xinguara/PA at <b>" + l_xinguara.toString() + "</b>").openPopup();

    if (oilSourcePalma === "1") {
        // Alto Araguaia (MT)
        map.addLayer(altoAraguaiaPalma);

        //var altoAraguaia_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_altoAraguaia_buffer_50km, format: 'image/png', transparent: true });
        //map.addLayer(altoAraguaia_buffer);
        
        // Posiciona o mapa na localização
        /*
            if (locationPalma !== "2") {
                map.flyTo(l_altoAraguaia, 5);
            }
        */

        // Posiciona o mapa em uma região central dos pontos
        map.flyTo([-16.117708, -45.953429], 5);
    
        $("#capacidadePalmaAll").css("display", "none");	
        $("#capacidadePalmaAlto").css("display", "block");	
    } else if (oilSourcePalma === "2") {
        // Terra Nova do Norte (MT)
        map.addLayer(terraNovaPalma);

        //var terraNova_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_terraNova_buffer_50km, format: 'image/png', transparent: true });
        //map.addLayer(terraNova_buffer);
        
        // Posiciona o mapa na localização
        /*
            if (locationPalma !== "2") {
                map.flyTo(l_terraNova, 5);
            }
        */

        // Posiciona o mapa em uma região central dos pontos
        map.flyTo([-16.117708, -45.953429], 5);

        $("#capacidadePalmaAlto").css("display", "none");
        $("#capacidadePalmaAll").css("display", "block");	
    } else if (oilSourcePalma === "3") {
        // São Miguel do Guamá (PA)
        map.addLayer(saoMiguelPalma);

        //var saoMiguel_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_saoMiguel_buffer_50km, format: 'image/png', transparent: true });
        //map.addLayer(saoMiguel_buffer);
        
        // Posiciona o mapa na localização
        /*
            if (locationPalma !== "2") {
                map.flyTo(l_saoMiguel, 5);
            }
        */

        // Posiciona o mapa em uma região central dos pontos
        map.flyTo([-11.519247, -44.935055], 5);

        $("#capacidadePalmaAlto").css("display", "none");
        $("#capacidadePalmaAll").css("display", "block");		
    } else if (oilSourcePalma === "4") {
        // Xinguara (PA)
        map.addLayer(xinguaraPalma);

        //var xinguara_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_xinguara_buffer_50km, format: 'image/png', transparent: true });
        //map.addLayer(xinguara_buffer);
        
        // Posiciona o mapa na localização
        /*
            if (locationPalma !== "2") {
                map.flyTo(l_xinguara, 5);
            }
        */

        // Posiciona o mapa em uma região central dos pontos
        map.flyTo([-11.519247, -44.935055], 5);

        $("#capacidadePalmaAlto").css("display", "none");
        $("#capacidadePalmaAll").css("display", "block");	
    } else {
        oilSourcePalma = "";
        cstudy_palma = false;
    }
}

function capacidadePalma_rules() {
    if (capacidadePalma != '' && capacidadePalma != '--') {
        //Output
        //var output_value = parseFloat(capacidadePalma.replace(",", ".")) / 0.16 / 0.17;
        var output_value = parseFloat(inputReqCalc_palma);

        $("#inputReqPalma").text(inputReqCalc_palma + " t.day-1 (biomass, dry basis)");
        $("#inputReqPalma").css("color", "blue");

        //Co-products
        var diesel_value = output_value * 0.83 * 0.769491525423729;
        var lpg_value = output_value * 0.83 * 0.0180790960451977;

        $("#dieselPalma").text("Diesel: " + Math.round(diesel_value) + "  t.day-1");
        $("#dieselPalma").css("color", "blue");

        $("#lpgPalma").text("LPG: " + Math.round(lpg_value) + "  t.day-1");
        $("#lpgPalma").css("color", "blue");

        capacitySelectionPalma();
    } else {
        //Output
        $("#inputReqPalma").text("... t.day-1 (biomass, dry basis)");
        $("#inputReqPalma").css("color", "black");

        //Co-products
        $("#dieselPalma").text("Diesel");
        $("#dieselPalma").css("color", "black");

        $("#lpgPalma").text("LPG");
        $("#lpgPalma").css("color", "black");
    }
}

function capacitySelectionPalma() {
    if (locationPalma === "1") {
        // REVAP
        if (oilSourcePalma === "1") {
            // Alto Araguaia
            if (capacidadePalma === '1') {
                curva_oferta_palma_png = 'Alto_REVAP_20_fig.png';
                resultado_palma_png = 'Alto_REVAP_20_tabela.png';
            } else if (capacidadePalma === '2') {
                curva_oferta_palma_png = 'Alto_REVAP_51_fig.png';
                resultado_palma_png = 'Alto_REVAP_51_tabela.png';
            } else if (capacidadePalma === '3') {
                curva_oferta_palma_png = 'Alto_REVAP_75_fig.png';
                resultado_palma_png = 'Alto_REVAP_75_tabela.png';
            }
            comparacao_palma_png = 'Alto_REVAP_Comparacao.png';
        } else if (oilSourcePalma === "2") {
            // Terra Nova do Norte
            if (capacidadePalma === '1') {
                curva_oferta_palma_png = 'TerraNova_REVAP_20_fig.png';
                resultado_palma_png = 'TerraNova_REVAP_20_tabela.png';
            } else if (capacidadePalma === '2') {
                curva_oferta_palma_png = 'TerraNova_REVAP_51_fig.png';
                resultado_palma_png = 'TerraNova_REVAP_51_tabela.png';
            } else if (capacidadePalma === '3') {
                curva_oferta_palma_png = 'TerraNova_REVAP_75_fig.png';
                resultado_palma_png = 'TerraNova_REVAP_75_tabela.png';
            } else if (capacidadePalma === '4') {
                curva_oferta_palma_png = 'TerraNova_REVAP_150_fig.png';
                resultado_palma_png = 'TerraNova_REVAP_150_tabela.png';
            } else if (capacidadePalma === '5') {
                curva_oferta_palma_png = 'TerraNova_REVAP_300_fig.png';
                resultado_palma_png = 'TerraNova_REVAP_300_tabela.png';
            }
            comparacao_palma_png = 'TerraNova_REVAP_Comparacao.png';
        } else if (oilSourcePalma === "4") {
            // Xinguara
            if (capacidadePalma === '1') {
                curva_oferta_palma_png = 'Xingara_REVAP_20_fig.png';
                resultado_palma_png = 'Xingara_REVAP_20_tabela.png';
            } else if (capacidadePalma === '2') {
                curva_oferta_palma_png = 'Xingara_REVAP_51_fig.png';
                resultado_palma_png = 'Xingara_REVAP_51_tabela.png';
            } else if (capacidadePalma === '3') {
                curva_oferta_palma_png = 'Xingara_REVAP_75_fig.png';
                resultado_palma_png = 'Xingara_REVAP_75_tabela.png';
            } else if (capacidadePalma === '4') {
                curva_oferta_palma_png = 'Xingara_REVAP_150_fig.png';
                resultado_palma_png = 'Xingara_REVAP_150_tabela.png';
            } else if (capacidadePalma === '5') {
                curva_oferta_palma_png = 'Xingara_REVAP_300_fig.png';
                resultado_palma_png = 'Xingara_REVAP_300_tabela.png';
            }
            comparacao_palma_png = 'Xingara_REVAP_Comparacao.png';
        }
    } else if (locationPalma === "2") {
        // RNEST
        if (oilSourcePalma === "1") {
            // Alto Araguaia
            if (capacidadePalma === '1') {
                curva_oferta_palma_png = 'Alto_RNEST_20_fig.png';
                resultado_palma_png = 'Alto_RNEST_20_tabela.png';
            } else if (capacidadePalma === '2') {
                curva_oferta_palma_png = 'Alto_RNEST_51_fig.png';
                resultado_palma_png = 'Alto_RNEST_51_tabela.png';
            } else if (capacidadePalma === '3') {
                curva_oferta_palma_png = 'Alto_RNEST_75_fig.png';
                resultado_palma_png = 'Alto_RNEST_75_tabela.png';
            }
            comparacao_palma_png = 'Alto_RNEST_Comparacao.png';
        } else if (oilSourcePalma === "3") {
            // Sao Miguel do Guama
            if (capacidadePalma === '1') {
                curva_oferta_palma_png = 'Saomiguel_RNEST_20_fig.png';
                resultado_palma_png = 'Saomiguel_RNEST_20_tabela.png';
            } else if (capacidadePalma === '2') {
                curva_oferta_palma_png = 'Saomiguel_RNEST_51_fig.png';
                resultado_palma_png = 'Saomiguel_RNEST_51_tabela.png';
            } else if (capacidadePalma === '3') {
                curva_oferta_palma_png = 'Saomiguel_RNEST_75_fig.png';
                resultado_palma_png = 'Saomiguel_RNEST_75_tabela.png';
            } else if (capacidadePalma === '4') {
                curva_oferta_palma_png = 'Saomiguel_RNEST_150_fig.png';
                resultado_palma_png = 'Saomiguel_RNEST_150_tabela.png';
            } else if (capacidadePalma === '5') {
                curva_oferta_palma_png = 'Saomiguel_RNEST_300_fig.png';
                resultado_palma_png = 'Saomiguel_RNEST_300_tabela.png';
            }
            comparacao_palma_png = 'Saomiguel_RNEST_Comparacao.png';
        } else if (oilSourcePalma === "4") {
            // Xinguara
            if (capacidadePalma === '1') {
                curva_oferta_palma_png = 'Xingara_RNEST_20_fig.png';
                resultado_palma_png = 'Xingara_RNEST_20_tabela.png';
            } else if (capacidadePalma === '2') {
                curva_oferta_palma_png = 'Xingara_RNEST_51_fig.png';
                resultado_palma_png = 'Xingara_RNEST_51_tabela.png';
            } else if (capacidadePalma === '3') {
                curva_oferta_palma_png = 'Xingara_RNEST_75_fig.png';
                resultado_palma_png = 'Xingara_RNEST_75_tabela.png';
            } else if (capacidadePalma === '4') {
                curva_oferta_palma_png = 'Xingara_RNEST_150_fig.png';
                resultado_palma_png = 'Xingara_RNEST_150_tabela.png';
            } else if (capacidadePalma === '5') {
                curva_oferta_palma_png = 'Xingara_RNEST_300_fig.png';
                resultado_palma_png = 'Xingara_RNEST_300_tabela.png';
            }
            comparacao_palma_png = 'Xingara_RNEST_Comparacao.png';
        }
    }
}


/*
 * JANELAS INFO - MAPAS
 */

// Palma - INFO
// Aptidão
$("#info-aptidao_palma").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 650, height: 450},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Palm oil suitability</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Combination of the suitable areas for palm production classified in the Agroecological Zoning for palm (EMBRAPA, 2010; MAPA, 2011) with the areas considered priority for expansion in this project. The available areas correspond to the set hypotheses assumed in the case study: (i) expansion just over pasturelands (in 2018), (iii) exclusion of areas covered by natural vegetation in January 2008 according to CORSIA's Principle 2, (iv) exclusion of all areas that are classified as conservation units, indigenous reserves and traditional Afro-Brazilian settlements (i.e., quilombolas) and (v) in the case of Pará, the production must be possible just in already deforested areas of the Amazon biome in 2008, according to the Agroecological Zoning." +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> SAFmaps (2021)" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://dx.doi.org/10.17632/t59v47sshp.2'>Download page</a></p>" +
                                "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> States of PA, MA, TO, MT and BA, i.e. five states addressed according to the results of the Agroecology Zoning developed by the Federal Government (EMBRAPA, 2010; MAPA, 2011)." +
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
$("#info-produtividade_palma").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 650, height: 450},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Expected palm oil yield</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> The average annual production of palm fresh fruits (FF) along the producing cycle (20 years) was estimated based on a statistical function adjusted to commercial production data of 45 municipalities, in Pará and Bahia. The estimated yields for Bahia correspond to the hypothesis that in the future commercial activity could be based on the best practices and on the use of best species; anyhow, the values for Bahia are low compared to Pará (PA) and Mato Grosso (MT). " +
                                "The yield function was defined according to the area harvested, the annual water deficit, the IDP (index related to the rainfall distribution throughout the year) and a dummy variable to differentiate the two states.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> SAFmaps (2021)" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://dx.doi.org/10.17632/t59v47sshp.2'>Download page</a></p>" +
                                "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> States of PA, MT and BA, i.e., states with palm suitability classified as \"Medium\" and \"High\", excluding the areas \"unsuitable\" according the Agroecological Zoning for palm." +
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
$("#info-custo_palma").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 650, height: 400},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Expected costs of palm production</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Expected costs in R$ (2018) per tonne of fresh fruits produced per year (on average, considering the producing cycle of 20 years), assuming that the expansion of palm plantation would occur displacing pasturelands. " +
                                "The costs include the opportunity cost of land, all procedures before planting, manual and mechanized operations, necessary inputs, maintenance and harvesting. The available areas exclude no-go areas (i.e., conservation units, indigenous reserves and traditional Afro-Brazilian settlements), and non-elegible land according to CORSIA's Principle 2.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> SAFmaps (2021)" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://dx.doi.org/10.17632/t59v47sshp.2'>Download page</a></p>" +
                                "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> States of PA, MT and BA, i.e., states with palm suitability classified as \"Medium\" and \"High\", excluding the areas \"unsuitable\" according the Agroecological Zoning for palm." +
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


// INFRASTRUCTURE
// toggle-roads (Layer)
$("#info-roads_fd_04").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-roads").trigger("click");
}); 

// info-railroads_fd_04
$("#info-railroads_fd_04").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-railroads").trigger("click");
}); 

// info-pipelines_fd_04
$("#info-pipelines_fd_04").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-pipelines").trigger("click");
}); 

// info-waterways_fd_04
$("#info-waterways_fd_04").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-waterways").trigger("click");
}); 

// info-airports_fd_04
$("#info-airports_fd_04").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-airports").trigger("click");
}); 

// info-refineries_refining_fd_04
$("#info-refineries_refining_fd_04").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-refineries_capacity").trigger("click");
}); 


