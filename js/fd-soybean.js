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
    $("#panel-corsia").css("display", "none");
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
    group_1 = ['DBMS:aptidao_soja','DBMS:custos_soja','DBMS:produtividade_soja'];
    group_2 = ['DBMS:main_roads','DBMS:railroads_fd_stock','DBMS:pipelines_fd_stock','DBMS:waterways_fd_stock'];
    group_3 = ['DBMS:airports_fd_stock','DBMS:refineries_refining_fd_stock','DBMS:oilseed_plants_fd_stock']; 

}); 


/*
 *  SOYBEAN LAYERS (from GeoServer) and variables
 */

var l_aptidao_soja = 'DBMS:aptidao_soja';
var l_custos_soja = 'DBMS:custos_soja';
var l_produtividade_soja = 'DBMS:produtividade_soja';

var l_oilseed_plants_fd_stock_src = 'DBMS:oilseed_plants_fd_stock';

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
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-produtividade_soja').prop('checked', false);
    $('#toggle-custo_soja').prop('checked', false);
    //reset_all_legends();
    removeLayers_group("gp_1");

    options['layers'] = l_aptidao_soja;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_aptidao_soja, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        $("#legend-produtividade_soja").css("display", "none");
        $("#legend-custo_soja").css("display", "none");
        $("#legend-aptidao_soja").css("display", "block");
        reorderLayers();
    } else {
        $("#legend-aptidao_soja").css("display", "none");
        removeLayer(l_aptidao_soja);
    }
});

// Soybean Oil yield (Layer)
$("#toggle-produtividade_soja").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-aptidao_soja').prop('checked', false);
    $('#toggle-custo_soja').prop('checked', false);
    //reset_all_legends();
    removeLayers_group("gp_1");

    options['layers'] = l_produtividade_soja;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_produtividade_soja, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        $("#legend-custo_soja").css("display", "none");
        $("#legend-aptidao_soja").css("display", "none");
        $("#legend-produtividade_soja").css("display", "block");
        reorderLayers();
    } else {
        $("#legend-produtividade_soja").css("display", "none");
        removeLayer(l_produtividade_soja);
    }
});

// Cost of soybean production (Layer)
$("#toggle-custo_soja").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-aptidao_soja').prop('checked', false);
    $('#toggle-produtividade_soja').prop('checked', false);
    //reset_all_legends();
    removeLayers_group("gp_1");

    options['layers'] = l_custos_soja;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_custos_soja, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        $("#legend-aptidao_soja").css("display", "none");
        $("#legend-produtividade_soja").css("display", "none");
        $("#legend-custo_soja").css("display", "block");
        reorderLayers();
    } else {
        $("#legend-custo_soja").css("display", "none");
        removeLayer(l_custos_soja);
    }
});

// INFRASTRUCTURE
// toggle-roads (Layer)
$("#toggle-roads_fd_02").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-railroads_fd_02').prop('checked', false);
    $('#toggle-pipelines_fd_02').prop('checked', false);
    $('#toggle-waterways_fd_02').prop('checked', false);
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
$("#toggle-railroads_fd_02").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-roads_fd_02').prop('checked', false);
    $('#toggle-pipelines_fd_02').prop('checked', false);
    $('#toggle-waterways_fd_02').prop('checked', false);
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
$("#toggle-pipelines_fd_02").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-roads_fd_02').prop('checked', false);
    $('#toggle-railroads_fd_02').prop('checked', false);
    $('#toggle-waterways_fd_02').prop('checked', false);
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
$("#toggle-waterways_fd_02").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-roads_fd_02').prop('checked', false);
    $('#toggle-railroads_fd_02').prop('checked', false);
    $('#toggle-pipelines_fd_02').prop('checked', false);
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
$("#toggle-airports_fd_02").on('change', function(){
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
$("#toggle-refineries_refining_fd_02").on('change', function(){
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

// toggle-soy_processing_plants_fd_02 (Layer)
$("#toggle-soy_processing_plants_fd_02").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    //reset_all_legends();
    //removeLayers();

    options['layers'] = l_oilseed_plants_fd_stock_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_refineries_refining_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);
                
        $("#legend-soy_processing_plants_fd_stock").css("display", "block");
    } else {
        $("#legend-soy_processing_plants_fd_stock").css("display", "none");
        removeLayer(l_oilseed_plants_fd_stock_src);
    }
});


/* 
 * CASE STUDY
 */

// Variaveis
var routeSoja = '', feedstockSoja = '', feedstockSoja_valor = '', carbonFootprint_soja = '';

var selecionadoSoja = '', tipoInstalacaoSoja = '', tipoInstalacaoSoja_valor = '';
var capacidadeSoja = '', capacidadeSoja_valor = '';

var locationSoja = '', locationSoja_valor = '', oilSourceSoja = '', oilSourceSoja_valor = '', inputReqCalc_soja = '';
var productionSoja = '', productionSoja_valor = '';

var revapSoja = '', rnestSoja = '';
var brumadoSoja = '', paranaibaSoja = '', pVenceslauSoja = '';

var santosSoja = '', californiaSoja = '', rotterdamSoja = '', singaporeSoja = '';

var cstudy_soja = false;

// Selecao da rota
$("#sojaRota").on('change', function(){
    routeSoja = this.value;

    setFalse_cstudyEucalipto();
});

// Carbon footprint
$("#sojaCarbon").on('change', function(){
    if (this.value === '1') {
        carbonFootprint_soja = true;
        $("#tipoInstalacaoSoja").val('--');
        tipoInstalacaoSoja = "";
    } else {
        carbonFootprint_soja = false;
        $("#tipoInstalacaoSoja_1").val('--');
        tipoInstalacaoSoja = "";

        // ATJ Route
        if (typeof(curvedPath) !== 'undefined') {
            curvedPath.remove();
        }
    };

    resetControls_cstudySoja();
    resetPoints_cstudySoja();
    resetProductions_cstudySoja();
    resetExtratoras_cstudySoja();

    resetControlsCapacity_cstudySoja();
});

// Selecao do feedstock
$("#sojaFStock").on('change', function(){
    feedstockSoja = this.value;
    feedstockSoja_valor = 'Soybean';

    $("#tipoInstalacaoSoja").val('--');
    $("#tipoInstalacaoSoja_1").val('--');
    tipoInstalacaoSoja = "";
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

// Carbon Footprint
$("#tipoInstalacaoSoja_1").on('change', function(){
    console.debug(this.value);

    tipoInstalacaoSoja = this.value;
    tipoInstalacaoSoja_valor =  this.options[this.selectedIndex].text;

    resetControls_cstudySoja();
    resetControlsCapacity_cstudySoja();
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
    
    revapSoja = L.marker(l_revap, { icon : blackMarker }).bindPopup("REVAP at <b>" + l_revap.toString() + "</b>").openPopup();
    map.addLayer(revapSoja);

    //var revap_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_revap_buffer_50km, format: 'image/png', transparent: true });
    //map.addLayer(revap_buffer);
    
    // Posiciona o mapa na localização
    map.flyTo(l_revap, 7);

    $("#nomeMunicipioSoja").text("SÃO JOSÉ DOS CAMPOS/SP");
    //$("#nomeMunicipioSoja").css("color", "blue");
    $("#nomeMunicipioSoja").css("font-weight", "bold");
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

        revapSoja = L.marker(l_revap, { icon : blackMarker }).bindPopup("REVAP at <b>" + l_revap.toString() + "</b>").openPopup();
        map.addLayer(revapSoja);

        //var revap_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_revap_buffer_50km, format: 'image/png', transparent: true });
        //map.addLayer(revap_buffer);
        
        // Posiciona o mapa na localização
        map.flyTo(l_revap, 7);

        $("#nomeMunicipioSoja").text("SÃO JOSÉ DOS CAMPOS/SP");
        //$("#nomeMunicipioSoja").css("color", "blue");
        $("#nomeMunicipioSoja").css("font-weight", "bold");
    } else if (locationSoja === "RNEST") {
        resetPoints_cstudySoja();

        rnestSoja = L.marker(l_rnest, { icon : blackMarker }).bindPopup("RNEST at <b>" + l_rnest.toString() + "</b>").openPopup();
        map.addLayer(rnestSoja);

        //var revap_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_revap_buffer_50km, format: 'image/png', transparent: true });
        //map.addLayer(revap_buffer);
        
        // Posiciona o mapa na localização
        map.flyTo(l_rnest, 7);

        $("#nomeMunicipioSoja").text("IPOJUCA/PE");
        //$("#nomeMunicipioSoja").css("color", "blue");
        $("#nomeMunicipioSoja").css("font-weight", "bold");
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

        revapSoja = L.marker(l_revap, { icon : blackMarker }).bindPopup("REVAP at <b>" + l_revap.toString() + "</b>").openPopup();
        map.addLayer(revapSoja);

        //var revap_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_revap_buffer_50km, format: 'image/png', transparent: true });
        //map.addLayer(revap_buffer);
        
        // Posiciona o mapa na localização
        //map.flyTo(l_revap, 9);

        // Posiciona o mapa em uma região central dos pontos
        map.flyTo([-16.117708, -45.953429], 5);

        $("#nomeMunicipioSoja").text("SÃO JOSÉ DOS CAMPOS/SP");
        //$("#nomeMunicipioSoja").css("color", "blue");
        $("#nomeMunicipioSoja").css("font-weight", "bold");
    } else if (locationSoja === "RNEST") {
        resetPoints_cstudySoja();

        rnestSoja = L.marker(l_rnest, { icon : blackMarker }).bindPopup("RNEST at <b>" + l_rnest.toString() + "</b>").openPopup();
        map.addLayer(rnestSoja);

        //var revap_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_revap_buffer_50km, format: 'image/png', transparent: true });
        //map.addLayer(revap_buffer);
        
        // Posiciona o mapa na localização
        //map.flyTo(l_rnest, 9);
        
        // Posiciona o mapa em uma região central dos pontos
        map.flyTo([-16.117708, -45.953429], 5);

        $("#nomeMunicipioSoja").text("IPOJUCA/PE");
        //$("#nomeMunicipioSoja").css("color", "blue");
        $("#nomeMunicipioSoja").css("font-weight", "bold");
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

        brumadoSoja = L.marker(l_brumado, { icon : blueMarker }).bindPopup("Brumado/BA at <b>" + l_brumado.toString() + "</b>").openPopup();
        map.addLayer(brumadoSoja);

        //var brumado_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_brumado_buffer_50km, format: 'image/png', transparent: true });
        //map.addLayer(brumado_buffer);
        
        // Posiciona o mapa na localização
        //map.flyTo(l_brumado, 9);

        // Posiciona o mapa em uma região central dos pontos
        map.flyTo([-16.117708, -45.953429], 5);
    } else if (oilSourceSoja === "Paranaíba (MS)") {
        resetExtratoras_cstudySoja();

        paranaibaSoja = L.marker(l_paranaiba, { icon : blueMarker }).bindPopup("Paranaíba/MS at <b>" + l_paranaiba.toString() + "</b>").openPopup();
        map.addLayer(paranaibaSoja);

        //var paranaiba_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_paranaiba_buffer_50km, format: 'image/png', transparent: true });
        //map.addLayer(paranaiba_buffer);
        
        // Posiciona o mapa na localização
        //map.flyTo(l_paranaiba, 9);

        // Posiciona o mapa em uma região central dos pontos
        map.flyTo([-16.117708, -45.953429], 5);
    } else if (oilSourceSoja === "Presidente Venceslau (SP)") {
        resetExtratoras_cstudySoja();

        pVenceslauSoja = L.marker(l_pVenceslau, { icon : blueMarker }).bindPopup("Presidente Venceslau/SP at <b>" + l_pVenceslau.toString() + "</b>").openPopup();
        map.addLayer(pVenceslauSoja);

        //var pVenceslau_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_pVenceslau_buffer_50km, format: 'image/png', transparent: true });
        //map.addLayer(pVenceslau_buffer);
        
        // Posiciona o mapa na localização
        //map.flyTo(l_pVenceslau, 9);

        // Posiciona o mapa em uma região central dos pontos
        map.flyTo([-16.117708, -45.953429], 5);
    } else {
        resetExtratoras_cstudySoja();
    }
});

// Carbon Footprint
$("#oilSourceSoja_1").on('change', function(){
    console.debug(this.value);

    oilSourceSoja = this.value;
    oilSourceSoja_valor =  this.options[this.selectedIndex].text;

    // INSERIR FUNÇÃO PRA REMOVER MARCADOR
    
    if(carbonFootprint_soja) {
        resetExtratoras_cstudySoja();

        pVenceslauSoja = L.marker(l_pVenceslau, { icon : blueMarker }).bindPopup("Presidente Venceslau/SP at <b>" + l_pVenceslau.toString() + "</b>").openPopup();
        map.addLayer(pVenceslauSoja);

        //var pVenceslau_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_pVenceslau_buffer_50km, format: 'image/png', transparent: true });
        //map.addLayer(pVenceslau_buffer);
        
        // Posiciona o mapa na localização
        if (typeof(californiaSoja) === 'undefined' && californiaSoja === ""
            && typeof(rotterdamSoja) === 'undefined' && rotterdamSoja === ""
            && typeof(singaporeSoja) === 'undefined' && singaporeSoja === "") {
            map.flyTo(l_pVenceslau, 9);
        }
    }
});

// Carbon Footprint
$("#productionSoja_1").on('change', function(){
    console.debug(this.value);

    productionSoja = this.value;
    productionSoja_valor =  this.options[this.selectedIndex].text;

    if (capacidadeSoja != '' && capacidadeSoja != '--') {
        capacitySelection();
    }

    // INSERIR FUNÇÃO PRA REMOVER MARCADOR

    // REVAP
    if (productionSoja === '1') {
        if (typeof(rnestSoja) !== 'undefined' && rnestSoja !== "") {
            map.removeLayer(rnestSoja);
        }

        if (typeof(santosSoja) !== 'undefined' && santosSoja !== "") {
            map.removeLayer(santosSoja);
        }

        if (typeof(californiaSoja) !== 'undefined' && californiaSoja !== "") {
            map.removeLayer(californiaSoja);
        }

        if (typeof(rotterdamSoja) !== 'undefined' && rotterdamSoja !== "") {
            map.removeLayer(rotterdamSoja);
        }

        if (typeof(singaporeSoja) !== 'undefined' && singaporeSoja !== "") {
            map.removeLayer(singaporeSoja);
        }

        // ATJ Route
        if (typeof(curvedPath) !== 'undefined') {
            curvedPath.remove();
        }

        revapSoja = L.marker(l_revap, { icon : blackMarker }).bindPopup("REVAP at <b>" + l_revap.toString() + "</b>").openPopup();
        map.addLayer(revapSoja);

        // Posiciona o mapa na localização
        map.flyTo(l_revap, 6);

        $("#nomeMunicipioSoja_1").text("SÃO JOSÉ DOS CAMPOS/SP");
        $("#nomeMunicipioSoja_1").css("font-weight", "bold");
    
    // RNEST
    } else if (productionSoja === '2') {
        if (typeof(revapSoja) !== 'undefined' && revapSoja !== "") {
            map.removeLayer(revapSoja);
        }

        if (typeof(santosSoja) !== 'undefined' && santosSoja !== "") {
            map.removeLayer(santosSoja);
        }

        if (typeof(californiaSoja) !== 'undefined' && californiaSoja !== "") {
            map.removeLayer(californiaSoja);
        }

        if (typeof(rotterdamSoja) !== 'undefined' && rotterdamSoja !== "") {
            map.removeLayer(rotterdamSoja);
        }

        if (typeof(singaporeSoja) !== 'undefined' && singaporeSoja !== "") {
            map.removeLayer(singaporeSoja);
        }

        // ATJ Route
        if (typeof(curvedPath) !== 'undefined') {
            curvedPath.remove();
        }

        rnestSoja = L.marker(l_rnest, { icon : blackMarker }).bindPopup("RNEST at <b>" + l_rnest.toString() + "</b>").openPopup();
        map.addLayer(rnestSoja);

        // Posiciona o mapa na localização
        //map.flyTo(l_rnest, 5);
        map.flyTo([-12.607181, -44.394330], 5);

        $("#nomeMunicipioSoja_1").text("IPOJUCA/PE");
        $("#nomeMunicipioSoja_1").css("font-weight", "bold");
    // CALIFORNIA
    } else if (productionSoja === '3') {
        if (typeof(revapSoja) !== 'undefined' && revapSoja !== "") {
            map.removeLayer(revapSoja);
        }

        if (typeof(rnestSoja) !== 'undefined' && rnestSoja !== "") {
            map.removeLayer(rnestSoja);
        }

        if (typeof(santosSoja) !== 'undefined' && santosSoja !== "") {
            map.removeLayer(santosSoja);
        }

        if (typeof(rotterdamSoja) !== 'undefined' && rotterdamSoja !== "") {
            map.removeLayer(rotterdamSoja);
        }

        if (typeof(singaporeSoja) !== 'undefined' && singaporeSoja !== "") {
            map.removeLayer(singaporeSoja);
        }

        santosSoja = L.marker(l_santos, { icon : blackMarker }).bindPopup("Port of Santos/BR at <b>" + l_santos.toString() + "</b>").openPopup();
        map.addLayer(santosSoja);

        californiaSoja = L.marker(l_california, { icon : blackMarker }).bindPopup("Port of San Diego/USA at <b>" + l_california.toString() + "</b>").openPopup();
        map.addLayer(californiaSoja);

        // Posiciona o mapa na localização central entre Santos e San Diego
        map.flyTo([-2.814375, -61.628761], 3);

        $("#nomeMunicipioSoja_1").text("SAN DIEGO/USA");
        $("#nomeMunicipioSoja_1").css("font-weight", "bold");

        // Rota
        carbonFT_route(l_santos, l_california);
    
    // ROTTERDAM
    } else if (productionSoja === '4') {
        if (typeof(revapSoja) !== 'undefined' && revapSoja !== "") {
            map.removeLayer(revapSoja);
        }

        if (typeof(rnestSoja) !== 'undefined' && rnestSoja !== "") {
            map.removeLayer(rnestSoja);
        }

        if (typeof(santosSoja) !== 'undefined' && santosSoja !== "") {
            map.removeLayer(santosSoja);
        }

        if (typeof(californiaSoja) !== 'undefined' && californiaSoja !== "") {
            map.removeLayer(californiaSoja);
        }

        if (typeof(singaporeSoja) !== 'undefined' && singaporeSoja !== "") {
            map.removeLayer(singaporeSoja);
        }

        santosSoja = L.marker(l_santos, { icon : blackMarker }).bindPopup("Port of Santos/BR at <b>" + l_santos.toString() + "</b>").openPopup();
        map.addLayer(santosSoja);

        rotterdamSoja = L.marker(l_rotterdam, { icon : blackMarker }).bindPopup("Port of Rotterdam/The Netherlands at <b>" + l_rotterdam.toString() + "</b>").openPopup();
        map.addLayer(rotterdamSoja);

        // Posiciona o mapa na localização central entre Santos e Rotterdam
        map.flyTo([24.045417, -7.720214], 3);

        $("#nomeMunicipioSoja_1").text("ROTTERDAM/The Netherlands");
        $("#nomeMunicipioSoja_1").css("font-weight", "bold");

        // Rota
        carbonFT_route(l_santos, l_rotterdam);

    // SINGAPORE
    } else if (productionSoja === '5') {
        if (typeof(revapSoja) !== 'undefined' && revapSoja !== "") {
            map.removeLayer(revapSoja);
        }

        if (typeof(rnestSoja) !== 'undefined' && rnestSoja !== "") {
            map.removeLayer(rnestSoja);
        }

        if (typeof(santosSoja) !== 'undefined' && santosSoja !== "") {
            map.removeLayer(santosSoja);
        }

        if (typeof(californiaSoja) !== 'undefined' && californiaSoja !== "") {
            map.removeLayer(californiaSoja);
        }

        if (typeof(rotterdamSoja) !== 'undefined' && rotterdamSoja !== "") {
            map.removeLayer(rotterdamSoja);
        }

        santosSoja = L.marker(l_santos, { icon : blackMarker }).bindPopup("Port of Santos/BR at <b>" + l_santos.toString() + "</b>").openPopup();
        map.addLayer(santosSoja);

        singaporeSoja = L.marker(l_singapore, { icon : blackMarker }).bindPopup("Port of SINGAPORE at <b>" + l_singapore.toString() + "</b>").openPopup();
        map.addLayer(singaporeSoja);

        // Posiciona o mapa na localização central entre Santos e Singapore
        map.flyTo([-8.611361, 58.737805], 2.7);

        $("#nomeMunicipioSoja_1").text("SINGAPORE");
        //$("#nomeMunicipioCorn_1").css("color", "blue");
        $("#nomeMunicipioSoja_1").css("font-weight", "bold");

        // Rota
        carbonFT_route(l_santos, l_singapore);

    // NENHUM
    } else {
        if (typeof(revapSoja) !== 'undefined' && revapSoja !== "") {
            map.removeLayer(revapSoja);
        }

        if (typeof(rnestSoja) !== 'undefined' && rnestSoja !== "") {
            map.removeLayer(rnestSoja);
        }

        if (typeof(santosSoja) !== 'undefined' && santosSoja !== "") {
            map.removeLayer(santosSoja);
        }

        if (typeof(californiaSoja) !== 'undefined' && californiaSoja !== "") {
            map.removeLayer(californiaSoja);
        }

        if (typeof(rotterdamSoja) !== 'undefined' && rotterdamSoja !== "") {
            map.removeLayer(rotterdamSoja);
        }

        if (typeof(singaporeSoja) !== 'undefined' && singaporeSoja !== "") {
            map.removeLayer(singaporeSoja);
        }

        // ATJ Route
        if (typeof(curvedPath) !== 'undefined') {
            curvedPath.remove();
        }

        $("#nomeMunicipioSoja_1").text(" ...");
        $("#nomeMunicipioSoja_1").css("color", "black");
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

// Carbon Footprint
$("#capacidadeSoja_1").on('change', function(){
    console.debug(this.value);

    capacidadeSoja = this.value;
    capacidadeSoja_valor = this.options[this.selectedIndex].text;
    var inputReqCalc = $(this).find(':selected').data('input');

    if (capacidadeSoja != '' && capacidadeSoja != '--') {
        //Output
        var output_value = parseFloat(inputReqCalc);

        $("#inputReqSoja_1").text(Math.round(output_value) + " t.day-1 (biomass, dry basis)");
        $("#inputReqSoja_1").css("color", "blue");

        //Co-products
        var diesel_value = output_value * 0.83 * 0.769491525423729;
        var lpg_value = output_value * 0.83 * 0.0180790960451977;

        $("#dieselSoja_1").text("Diesel: " + parseInt(diesel_value) + "  t.day-1");
        $("#dieselSoja_1").css("color", "blue");

        $("#lpgSoja_1").text("Naphtha: " + parseInt(lpg_value) + "  t.day-1");
        $("#lpgSoja_1").css("color", "blue");

        capacitySelectionSoja();
    } else {
        //Output
        $("#inputReqSoja_1").text("... t.day-1 (biomass, dry basis)");
        $("#inputReqSoja_1").css("color", "black");

        //Co-products
        $("#dieselSoja_1").text("Diesel");
        $("#dieselSoja_1").css("color", "black");

        $("#lpgSoja_1").text("Naphtha");
        $("#lpgSoja_1").css("color", "black");
    }
});

// Botao next (Step #1)
$("button.soja-step1-next").on("click", function() {
    if ((routeSoja === "" || routeSoja === "--") && (carbonFootprint_soja === "" || carbonFootprint_soja === "--")
        && (feedstockSoja === "" || feedstockSoja === "--")) {
        $.alert({
            boxWidth: '40%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>Conversion technology</b>, the <b>Carbon Footprint</b> and the <b>Feedstock</b>.',
            useBootstrap: false
        });
    } else if (routeSoja === "" || routeSoja === "--") {
        $.alert({
            boxWidth: '30%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>Conversion technology</b>.',
            useBootstrap: false
        });
    } else if (carbonFootprint_soja === "" || carbonFootprint_soja === "--") {
        $.alert({
            boxWidth: '30%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>Carbon Footprint</b> option.',
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

        if (carbonFootprint_soja) {
            $("#soja-step2a").css("display", "block");
            $("#soja-step2").css("display", "none");
        } else {
            $("#soja-step2").css("display", "block");
            $("#soja-step2a").css("display", "none");
        }

    }
});

// Botao back (Step #2)
$("button.soja-step2-back").on("click", function() {
    $("#soja-step2").css("display", "none");
    $("#soja-step2a").css("display", "none");
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
    } else if ((locationSoja === "" || locationSoja === "--")
        && (tipoInstalacaoSoja < '4')) {
            $.alert({
                boxWidth: '30%',
                title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
                content: 'Please select the <b>Location</b>.',
                useBootstrap: false
            });
    } else if ((productionSoja === "" || productionSoja === "--")
        && (tipoInstalacaoSoja === '4')) {
        $.alert({
            boxWidth: '30%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>SAF Production</b>.',
            useBootstrap: false
        });
    } else if ((oilSourceSoja === "" || oilSourceSoja === "--")
        && (tipoInstalacaoSoja === '4')) {
        $.alert({
            boxWidth: '30%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>Oil Extraction</b>.',
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

        if (carbonFootprint_soja) {
            /* Carbon Footprint -> Yes */

            if(productionSoja <= '2') {
                result_panel_soja = "<div style='margin-left:10%; overflow-y:auto; height: 100%''>" +
                                        "<div><img src='images/logo_safmaps_degrade.png' width='13%' style='float: right; margin-right: 7.3rem'>" +
                                            "<h6 style='font-weight:bold; color: blue'>Selection summary:</h6>" +
                                                "<div class='div-feedstock-results'>" +
                                                    "<b>Conversion tecnology:</b> " + routeSoja + 
                                                    "<br/><b>Feedstock:</b> " + feedstockSoja_valor +
                                                    "<br/><b>Case Study:</b> " + tipoInstalacaoSoja_valor +
                                                    "<br/><b>SAF production:</b> " + productionSoja_valor +
                                                    "<br/><b>Oil Extration:</b> " + oilSourceSoja_valor +
                                                    "<br/><b>Output capacity (t.day<sup>-1</sup>):</b> " + capacidadeSoja_valor +
                                                    "<br/><br/>" +
                                                    "<div class='div-carbon-results'>" +
                                                        "<span class='span-carbon-title'>SAF Carbon Footprint</span><br>" +
                                                        "<span class='span-carbon-alert'>Estimates of the carbon intensity of jet-fuel produced, primarily based on CORSIA default factors.</span><br>" +
                                                        "<img src='images/cstudies_soja/carbon-footprint/" + tabela_carbonFT_soja + "' width='70%' ><br>" +
                                                        "<div class='div-carbon-notes'>" +
                                                            "<span class='span-carbon-notes'>1) CORSIA default value for soybean HEFA (Latin America).</span><br>" +
                                                            "<span class='span-carbon-notes'>2) Feedstock transportation by trucks from farm to oil extraction plant. Average transportation distance assumed as 2/3 of the radius adopted in the case study.</span><br>" +
                                                            "<span class='span-carbon-notes'>3) Assuming CORSIA parameters for Latin America and energy resource parameters adapted from the literature, as well as the Brazilian electricity mix.</span><br>" +
                                                            "<span class='span-carbon-notes'>4) Soybean oil transportation with trucks. For the cases involving soybean oil exports, oil extraction is assumed to take place in Presidente Venceslau (SP). Oil transport from the extraction plant to the Brazilian port is made by truck (700 km from Presidente Venceslau), followed by ocean tanker: 13,700 km (California), 10,500 km (Rotterdam) and 20,200 km (Singapore) from Santos Port (SP).</span><br>" +
                                                            "<span class='span-carbon-notes'>5) Assuming Brazilian electricity mix and CORSIA parameters for US soybean HEFA pathway. For the cases involving soybean oil export, we adopted the CORSIA default LCA results for US (GREET model) for California and Singapore cases, and EU (JRC data, GREET model) for the Rotterdam case.</span><br>" +
                                                            "<span class='span-carbon-notes'>6) CORSIA default value for soybean HEFA.</span><br>" +
                                                            "<span class='span-carbon-notes'>7) The CORSIA default value (core LCA) is applied to soybean HEFA (Brazil).</span><br>" +
                                                        "</div><br/>" +
                                                        "<img src='images/cstudies_soja/carbon-footprint/" + grafico_carbonFT_soja + "' width='100%' ><br>" +
                                                        "<span class='span-carbon-notes-3'>Same (1) to (6) notes as above.</span><br>" +
                                                        "<span class='span-carbon-notes-3'>Main reference: ICAO (2021). CORSIA supporting document - Life cycle assessment methodology, Version 3 - March 2021.</span><br>" +
                                                    "</div>" +
                                                    "<br/><br/>" +
                                                "</div>" +
                                            "</div><br/><br/>" +
                                        "<div><h6 style='font-weight:bold'>Soybean oil supply curve</h6>" +
                                            "<img src='images/cstudies_soja/" + curva_oferta_soja_png + "' width='85%' ></div>" +
                                        "<div style='margin-top:3rem; '>" +
                                            "<div><h6 style='font-weight:bold'>Data table</h6>" +
                                            "<img src='images/cstudies_soja/" + resultado_soja_png + "' width='82%' ></div>" +
                                        "<div style='margin-top:3rem; '>" +
                                            "<div><h6 style='font-weight:bold; margin-left:5px'>Comparison table</h6>" +
                                            "<img src='images/cstudies_soja/" + comparacao_soja_png + "' width='80%'></div>" +
                                        "<br/><br/>" +
                                    "</div>"
            } else if (productionSoja > '2') {
                result_panel_soja = "<div style='margin-left:10%; overflow-y:auto; height: 100%''>" +
                                        "<div><img src='images/logo_safmaps_degrade.png' width='13%' style='float: right; margin-right: 7.3rem'>" +
                                            "<h6 style='font-weight:bold; color: blue'>Selection summary:</h6>" +
                                                "<div class='div-feedstock-results' style='border-bottom: none'>" +
                                                    "<b>Conversion tecnology:</b> " + routeSoja + 
                                                    "<br/><b>Feedstock:</b> " + feedstockSoja_valor +
                                                    "<br/><b>Case Study:</b> " + tipoInstalacaoSoja_valor +
                                                    "<br/><b>SAF production:</b> " + productionSoja_valor +
                                                    "<br/><b>Oil Extration:</b> " + oilSourceSoja_valor +
                                                    "<br/><b>Output capacity (t.day<sup>-1</sup>):</b> " + capacidadeSoja_valor +
                                                    "<br/><br/>" +
                                                    "<div class='div-carbon-results'>" +
                                                        "<span class='span-carbon-title'>SAF Carbon Footprint</span><br>" +
                                                        "<span class='span-carbon-alert'>Estimates of the carbon intensity of jet-fuel produced, primarily based on CORSIA default factors.</span><br>" +
                                                        "<img src='images/cstudies_soja/carbon-footprint/" + tabela_carbonFT_soja + "' width='70%' ><br>" +
                                                        "<div class='div-carbon-notes'>" +
                                                            "<span class='span-carbon-notes'>1) CORSIA default value for soybean HEFA (Latin America).</span><br>" +
                                                            "<span class='span-carbon-notes'>2) Feedstock transportation by trucks from farm to oil extraction plant. Average transportation distance assumed as 2/3 of the radius adopted in the case study.</span><br>" +
                                                            "<span class='span-carbon-notes'>3) Assuming CORSIA parameters for Latin America and energy resource parameters adapted from the literature, as well as the Brazilian electricity mix.</span><br>" +
                                                            "<span class='span-carbon-notes'>4) Soybean oil transportation with trucks. For the cases involving soybean oil exports, oil extraction is assumed to take place in Presidente Venceslau (SP). Oil transport from the extraction plant to the Brazilian port is made by truck (700 km from Presidente Venceslau), followed by ocean tanker: 13,700 km (California), 10,500 km (Rotterdam) and 20,200 km (Singapore) from Santos Port (SP).</span><br>" +
                                                            "<span class='span-carbon-notes'>5) Assuming Brazilian electricity mix and CORSIA parameters for US soybean HEFA pathway. For the cases involving soybean oil export, we adopted the CORSIA default LCA results for US (GREET model) for California and Singapore cases, and EU (JRC data, GREET model) for the Rotterdam case.</span><br>" +
                                                            "<span class='span-carbon-notes'>6) CORSIA default value for soybean HEFA.</span><br>" +
                                                            "<span class='span-carbon-notes'>7) The CORSIA default value (core LCA) is applied to soybean HEFA (Brazil).</span><br>" +
                                                        "</div><br/>" +
                                                        "<img src='images/cstudies_soja/carbon-footprint/" + grafico_carbonFT_soja + "' width='100%' ><br>" +
                                                        "<span class='span-carbon-notes-3'>Same (1) to (6) notes as above.</span><br>" +
                                                        "<span class='span-carbon-notes-3'>Main reference: ICAO (2021). CORSIA supporting document - Life cycle assessment methodology, Version 3 - March 2021.</span><br>" +
                                                    "</div>" +
                                                    "<br/><br/>" +
                                                "</div>" +
                                            "</div><br/><br/>" +
                                    "</div>"
            }
        } else {
            /* Carbon Footprint -> No */
            if (tipoInstalacaoSoja === "1- Soybean oil exported (2018)") {
                result_panel_soja = "<div style='margin-left:10%; overflow-y:auto; height: 100%''>" +
                                        "<div><img src='images/logo_safmaps_degrade.png' width='13%' style='float: right; margin-right: 7.3rem'>" +
                                            "<h6 style='font-weight:bold; color: blue'>Selection summary:</h6>" +
                                            "<div class='div-feedstock-results'>" +
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
                                            "<h6 style='font-weight:bold; color: blue'>Selection summary:</h6>" +
                                            "<div class='div-feedstock-results'>" +
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
                                            "<h6 style='font-weight:bold; color: blue'>Selection summary:</h6>" +
                                            "<div class='div-feedstock-results'>" +
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
            }
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
    }
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
    $("#capacidadeSoja").val('--');
    $("#inputReqSoja").text("... t.day-1 (biomass, dry basis)");
    $("#inputReqSoja").css("color", "black");

    $("#productionSoja_1").val('--');
    productionSoja = "";

    $("#oilSourceSoja_case3").val('--');
    $("#oilSourceSoja_1").val('--');
    oilSourceSoja = "";

    $("#capacidadeSoja").val('--');
    $("#capacidadeSoja_1").val('--');
    capacidadeSoja = "";

    //Co-products
    $("#gasolineSoja").text("Gasoline");
    $("#gasolineSoja").css("color", "black");

    $("#lpgSoja").text("LPG");
    $("#lpgSoja").css("color", "black");		
    
    // Carbon Footprint option
    $("#nomeMunicipioSoja_1").text(" ...");
    $("#nomeMunicipioSoja_1").css("color", "black");

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

function resetProductions_cstudySoja() {
    // REMOVE MARCADORES
    if (typeof(santosSoja) !== 'undefined' && santosSoja !== "") {
        map.removeLayer(santosSoja);
        santosSoja = '';
    }

    if (typeof(californiaSoja) !== 'undefined' && californiaSoja !== "") {
        map.removeLayer(californiaSoja);
        californiaSoja = '';
    }

    if (typeof(rotterdamSoja) !== 'undefined' && rotterdamSoja !== "") {
        map.removeLayer(rotterdamSoja);
        rotterdamSoja = '';
    }

    if (typeof(singaporeSoja) !== 'undefined' && singaporeSoja !== "") {
        map.removeLayer(singaporeSoja);
        singaporeSoja = '';
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
    // Carbon Footprint
    } else if (tipoInstalacaoSoja === "4") {
        // OilSourceSoja = P. Venceslau
        if (productionSoja === "1") {
            curva_oferta_soja_png = 'fig_REVAP_Pres_Venc_300t.png';
            resultado_soja_png = 'tab_REVAP_Pres_Venc_300t.png';
            comparacao_soja_png = 'comparacao_REVAP_Pres_Venc.png';
        } else if (productionSoja === "2") {
            curva_oferta_soja_png = 'fig_RNEST_Pres_Venc_300t.png';
            resultado_soja_png = 'tab_RNEST_Pres_Venc_300t.png';
            comparacao_soja_png = 'comparacao_RNEST_Pres_Venc.png';
        } else {
            curva_oferta_soja_png = '';
            resultado_soja_png = '';
            comparacao_soja_png = '';
        }
    }

    if(carbonFootprint_soja) {
        if (productionSoja == '1') {
            tabela_carbonFT_soja = 'tabela_carbonFT_soja_revap.png';
            grafico_carbonFT_soja = 'grafico_carbonFT_soja_revap.png';
        } else if (productionSoja == '2') {
            tabela_carbonFT_soja = 'tabela_carbonFT_soja_rnest.png';
            grafico_carbonFT_soja = 'grafico_carbonFT_soja_rnest.png';
        } else if (productionSoja == '3') {
            tabela_carbonFT_soja = 'tabela_carbonFT_soja_california.png';
            grafico_carbonFT_soja = 'grafico_carbonFT_soja_california.png';
        } else if (productionSoja == '4') {
            tabela_carbonFT_soja = 'tabela_carbonFT_soja_rotterdam.png';
            grafico_carbonFT_soja = 'grafico_carbonFT_soja_rotterdam.png';
        } else if (productionSoja == '5') {
            tabela_carbonFT_soja = 'tabela_carbonFT_soja_singapore.png';
            grafico_carbonFT_soja = 'grafico_carbonFT_soja_singapore.png';
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


// INFRASTRUCTURE
// toggle-roads (Layer)
$("#info-roads_fd_02").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-roads").trigger("click");
}); 

// info-railroads_fd_02
$("#info-railroads_fd_02").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-railroads").trigger("click");
}); 

// info-pipelines_fd_02
$("#info-pipelines_fd_02").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-pipelines").trigger("click");
}); 

// info-waterways_fd_02
$("#info-waterways_fd_02").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-waterways").trigger("click");
}); 

// info-airports_fd_02
$("#info-airports_fd_02").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-airports").trigger("click");
}); 

// info-refineries_refining_fd_02
$("#info-refineries_refining_fd_02").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-refineries_capacity").trigger("click");
}); 

// info-soy_processing_plants_fd_02
$("#info-soy_processing_plants_fd_02").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-oilseed_plants").trigger("click");
});

