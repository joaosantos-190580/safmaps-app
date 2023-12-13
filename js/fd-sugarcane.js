/*
 * All panels, controls and other issues related to: SUGARCANE
 *
 * 
 */

// MENU: Panel activation
$("#atj-spk-sugarcane").click(function(e) {
    e.preventDefault();

    reset_actived (e);
    $("#atj-spk-sugarcane-group").addClass("active");
    $("#atj-spk-sugarcane-group").removeClass("inactive");

    $("#panel-support-maps").css("display", "none");
    $("#panel-corsia").css("display", "none");
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
    group_1 = ['DBMS:aptidao_cana','DBMS:custos_cana','DBMS:produtividade_cana'];
    group_2 = ['DBMS:main_roads','DBMS:railroads_fd_stock','DBMS:pipelines_fd_stock','DBMS:ethanol_pipelines_fd_stock','DBMS:waterways_fd_stock'];
    group_3 = ['DBMS:airports_fd_stock','DBMS:refineries_refining_fd_stock','DBMS:ethanol_output_fd_stock','DBMS:ethanol_pipelines_terminals_fd_stock'];
    
});  


/*
 *  SUGARCANE LAYERS (from GeoServer) and variables
 */

var l_aptidao_cana = 'DBMS:aptidao_cana';
var l_custos_cana = 'DBMS:custos_cana';
var l_produtividade_cana = 'DBMS:produtividade_cana';

var curva_oferta_sugarcane_png = '', resultado_sugarcane_png = '', comparacao_sugarcane_png = '', result_panel_sugarcane = '';
var tabela_carbonFT_cana = '', graficoCarbonFT_cana = '';


/*
 *  SUGARCANE LAYERS
 */

// Sugarcane suitability (Layer)
$("#toggle-aptidao_cana").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-produtividade_cana').prop('checked', false);
    $('#toggle-custo_cana').prop('checked', false);
    //reset_all_legends();
    removeLayers_group("gp_1");

    options['layers'] = l_aptidao_cana;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_aptidao_cana, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        $("#legend-produtividade_cana").css("display", "none");
        $("#legend-custo_cana").css("display", "none");
        $("#legend-aptidao_cana").css("display", "block");
        reorderLayers();
    } else {
        $("#legend-aptidao_cana").css("display", "none");
        removeLayer(l_aptidao_cana);
    }
});

// Sugarcane yield (Layer)
$("#toggle-produtividade_cana").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-aptidao_cana').prop('checked', false);
    $('#toggle-custo_cana').prop('checked', false);
    //reset_all_legends();
    removeLayers_group("gp_1");

    options['layers'] = l_produtividade_cana;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_produtividade_cana, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);    
        map.addLayer(prov);

        $("#legend-custo_cana").css("display", "none");
        $("#legend-aptidao_cana").css("display", "none");
        $("#legend-produtividade_cana").css("display", "block");
        reorderLayers();
    } else {
        $("#legend-produtividade_cana").css("display", "none");
        removeLayer(l_produtividade_cana);
    }
});

// Cost of sugarcane production (Layer)
$("#toggle-custo_cana").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-aptidao_cana').prop('checked', false);
    $('#toggle-produtividade_cana').prop('checked', false);
    //reset_all_legends();
    removeLayers_group("gp_1");

    options['layers'] = l_custos_cana;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_custos_cana, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);    
        map.addLayer(prov);

        $("#legend-aptidao_cana").css("display", "none");
        $("#legend-produtividade_cana").css("display", "none");
        $("#legend-custo_cana").css("display", "block");
        reorderLayers();
    } else {
        $("#legend-custo_cana").css("display", "none");
        removeLayer(l_custos_cana);
    }
});

// INFRASTRUCTURE
// toggle-roads (Layer)
$("#toggle-roads_fd_05").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-railroads_fd_05').prop('checked', false);
    $('#toggle-pipelines_fd_05').prop('checked', false);
    $('#toggle-ethanol_pipelines_fd_05').prop('checked', false);
    $('#toggle-waterways_fd_05').prop('checked', false);
    //reset_all_legends();
    removeLayers_group("gp_2");

    options['layers'] = l_main_roads_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_roads_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);  
        map.addLayer(prov);

        $("#legend-railroads_fd_stock").css("display", "none");
        $("#legend-pipelines_fd_stock").css("display", "none");
        $("#legend-ethanol_pipelines_fd_stock").css("display", "none");
        $("#legend-waterways_fd_stock").css("display", "none");
        $("#legend-main_roads").css("display", "block");
        reorderLayers();
    } else {
        $("#legend-main_roads").css("display", "none");
        removeLayer(l_main_roads_src);
    }
});

// toggle-railroads (Layer)
$("#toggle-railroads_fd_05").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-roads_fd_05').prop('checked', false);
    $('#toggle-pipelines_fd_05').prop('checked', false);
    $('#toggle-ethanol_pipelines_fd_05').prop('checked', false);
    $('#toggle-waterways_fd_05').prop('checked', false);
    //reset_all_legends();
    removeLayers_group("gp_2");

    options['layers'] = l_railroads_fd_stock_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_railroads_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);  
        map.addLayer(prov);

        $("#legend-main_roads").css("display", "none");
        $("#legend-pipelines_fd_stock").css("display", "none");
        $("#legend-ethanol_pipelines_fd_stock").css("display", "none");
        $("#legend-waterways_fd_stock").css("display", "none");
        $("#legend-railroads_fd_stock").css("display", "block");
        reorderLayers();
    } else {
        $("#legend-railroads_fd_stock").css("display", "none");
        removeLayer(l_railroads_fd_stock_src);
    }
});

// toggle-pipelines (Layer)
$("#toggle-pipelines_fd_05").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-roads_fd_05').prop('checked', false);
    $('#toggle-railroads_fd_05').prop('checked', false);
    $('#toggle-ethanol_pipelines_fd_05').prop('checked', false);
    $('#toggle-waterways_fd_05').prop('checked', false);
    //reset_all_legends();
    removeLayers_group("gp_2");

    options['layers'] = l_pipelines_fd_stock_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_pipelines_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);  
        map.addLayer(prov);

        $("#legend-main_roads").css("display", "none");
        $("#legend-railroads_fd_stock").css("display", "none");
        $("#legend-ethanol_pipelines_fd_stock").css("display", "none");
        $("#legend-waterways_fd_stock").css("display", "none");
        $("#legend-pipelines_fd_stock").css("display", "block");
        reorderLayers();
    } else {
        $("#legend-pipelines_fd_stock").css("display", "none");
        removeLayer(l_pipelines_fd_stock_src);
    }
});

// toggle-ethanol_pipelines (Layer)
$("#toggle-ethanol_pipelines_fd_05").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-roads_fd_05').prop('checked', false);
    $('#toggle-railroads_fd_05').prop('checked', false);
    $('#toggle-pipelines_fd_05').prop('checked', false);
    $('#toggle-waterways_fd_05').prop('checked', false);
    //reset_all_legends();
    removeLayers_group("gp_2");

    options['layers'] = l_ethanol_pipelines_fd_stock_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_refineries_refining_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        $("#legend-main_roads").css("display", "none");
        $("#legend-railroads_fd_stock").css("display", "none");
        $("#legend-pipelines_fd_stock").css("display", "none");
        $("#legend-waterways_fd_stock").css("display", "none");
        $("#legend-ethanol_pipelines_fd_stock").css("display", "block");
        reorderLayers();
    } else {
        $("#legend-ethanol_pipelines_fd_stock").css("display", "none");
        removeLayer(l_ethanol_pipelines_fd_stock_src);
    }
});

// toggle-waterways (Layer)
$("#toggle-waterways_fd_05").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-roads_fd_05').prop('checked', false);
    $('#toggle-railroads_fd_05').prop('checked', false);
    $('#toggle-pipelines_fd_05').prop('checked', false);
    $('#toggle-ethanol_pipelines_fd_05').prop('checked', false);
    //reset_all_legends();
    removeLayers_group("gp_2");

    options['layers'] = l_waterways_fd_stock_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_waterways_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        $("#legend-main_roads").css("display", "none");
        $("#legend-railroads_fd_stock").css("display", "none");
        $("#legend-pipelines_fd_stock").css("display", "none");
        $("#legend-ethanol_pipelines_fd_stock").css("display", "none");
        $("#legend-waterways_fd_stock").css("display", "block");
        reorderLayers();
    } else {
        $("#legend-waterways_fd_stock").css("display", "none");
        removeLayer(l_waterways_fd_stock_src);
    }
});

// Complementary information
// toggle-airports (Layer)
$("#toggle-airports_fd_05").on('change', function(){
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
$("#toggle-refineries_refining_fd_05").on('change', function(){
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

// toggle-ethanol_distilleries_fd_05 (Layer)
$("#toggle-ethanol_distilleries_fd_05").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    //reset_all_legends();
    //removeLayers();

    options['layers'] = l_ethanol_output_fd_stock_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_refineries_refining_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);
                
        $("#legend-ethanol_output_fd_stock").css("display", "block");
    } else {
        $("#legend-ethanol_output_fd_stock").css("display", "none");
        removeLayer(l_ethanol_output_fd_stock_src);
    }
});

// toggle-ethanol_terminals_fd_05 (Layer)
$("#toggle-ethanol_terminals_fd_05").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    //reset_all_legends();
    //removeLayers();

    options['layers'] = l_ethanol_pipelines_terminals_fd_stock_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_refineries_refining_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);
                
        $("#legend-ethanol_pipelines_terminals_fd_stock").css("display", "block");
    } else {
        $("#legend-ethanol_pipelines_terminals_fd_stock").css("display", "none");
        removeLayer(l_ethanol_pipelines_terminals_fd_stock_src);
    }
});


/* 
 * CASE STUDY
 */

// Variaveis
var routeCana = '', feedstockCana = '', feedstockCana_valor = '', carbonFootprint_cana = '';
var selecionadoCana = '', tipoInstalacaoSugarcane = '', tipoInstalacaoSugarcane_valor = '', capacidadeCana = '';
var capacidadeCana_valor = '';

var locationCana = '', productionCana = '', productionCana_valor = '';

var prataCana = '', cacuCana = '', paranaibaCana = '', pVenceslauCana = '';

var replanCana = '', santosCana = '', californiaCana = '', rotterdamCana = '', singaporeCana = '';

var cstudy_cana = false;

// Selecao da rota
$("#sugarcaneRota").on('change', function(){
    routeCana = this.value;
});

// Carbon footprint
$("#canaCarbon").on('change', function(){
    if (this.value === '1') {
        carbonFootprint_cana = true;
        $("#feedstock_cana_1").css("display", "none");
        $("#feedstock_cana_2").css("display", "block");
    } else {
        carbonFootprint_cana = false;
        $("#feedstock_cana_1").css("display", "block");
        $("#feedstock_cana_2").css("display", "none");
    };

    resetLocations_cstudyCana();
    resetControls_cstudyCana();
    resetControlsCapacity_cstudyCana();
    capacitySelectionSugarcane();
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

// Selecao do feedstock (Carbon Footprint)
$("#sugarcaneFStock_1").on('change', function(){
    feedstockCana = this.value;
    feedstockCana_valor = 'Anhydrous ethanol from sugarcane';
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

// Carbon Footprint
$("#tipoInstalacaoSugarcane_3").on('change', function(){
    console.debug(this.value);

    tipoInstalacaoSugarcane = this.value;
    tipoInstalacaoSugarcane_valor =  this.options[this.selectedIndex].text;

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
        replanCana = L.marker(l_replan, { icon : blackMarker }).bindPopup("REPLAN at <b>" + l_replan.toString() + "</b>").openPopup();
        map.addLayer(replanCana);

        //var revap_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_revap_buffer_50km, format: 'image/png', transparent: true });
        //map.addLayer(revap_buffer);
        
        // Posiciona o mapa na localização
        map.flyTo(l_replan, 6);

        $("#nomeMunicipioSugarcane").text("PAULÍNIA/SP");
        //$("#nomeMunicipioSugarcane").css("color", "blue");
        $("#nomeMunicipioSugarcane").css("font-weight", "bold");
    } else {
        map.removeLayer(replanCana);

        $("#nomeMunicipioSugarcane").text(" ...");
        $("#nomeMunicipioSugarcane").css("color", "black");
    }
});

// Carbon Footprint
$("#productionSugarcane_1").on('change', function(){
    console.debug(this.value);

    productionCana = this.value;
    productionCana_valor =  this.options[this.selectedIndex].text;

    if (capacidadeSugarcane != '' && capacidadeSugarcane != '--') {
        capacitySelectionSugarcane();
    }

    resetPoints_cstudySoja();

    // INSERIR FUNÇÃO PRA REMOVER MARCADOR

    //if (productionMilho != '' && productionMilho != '--') {
    // REPLAN
    if (productionCana === '1') {
        if (typeof(santosCana) !== 'undefined' && santosCana !== "") {
            map.removeLayer(santosCana);
        }

        if (typeof(californiaCana) !== 'undefined' && californiaCana !== "") {
            map.removeLayer(californiaCana);
        }

        if (typeof(rotterdamCana) !== 'undefined' && rotterdamCana !== "") {
            map.removeLayer(rotterdamCana);
        }

        if (typeof(singaporeCana) !== 'undefined' && singaporeCana !== "") {
            map.removeLayer(singaporeCana);
        }

        // ATJ Route
        if (typeof(curvedPath) !== 'undefined') {
            curvedPath.remove();
        }

        replanCana = L.marker(l_replan, { icon : blackMarker }).bindPopup("REPLAN at <b>" + l_replan.toString() + "</b>").openPopup();
        map.addLayer(replanCana);

        //var revap_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_revap_buffer_50km, format: 'image/png', transparent: true });
        //map.addLayer(revap_buffer);
        
        // Posiciona o mapa na localização
        map.flyTo(l_replan, 6);

        $("#nomeMunicipioSugarcane_1").text("PAULÍNIA/SP");
        //$("#nomeMunicipioCorn_1").css("color", "blue");
        $("#nomeMunicipioSugarcane_1").css("font-weight", "bold");
    
    // CALIFORNIA
    } else if (productionCana === '2') {
        if (typeof(santosCana) !== 'undefined' && santosCana !== "") {
            map.removeLayer(santosCana);
        }

        if (typeof(replanCana) !== 'undefined' && replanCana !== "") {
            map.removeLayer(replanCana);
        }

        if (typeof(rotterdamCana) !== 'undefined' && rotterdamCana !== "") {
            map.removeLayer(rotterdamCana);
        }

        if (typeof(singaporeCana) !== 'undefined' && singaporeCana !== "") {
            map.removeLayer(singaporeCana);
        }

        santosCana = L.marker(l_santos, { icon : blackMarker }).bindPopup("Port of Santos/BR at <b>" + l_santos.toString() + "</b>").openPopup();
        map.addLayer(santosCana);

        californiaCana = L.marker(l_california, { icon : blackMarker }).bindPopup("Port of San Diego/USA at <b>" + l_california.toString() + "</b>").openPopup();
        map.addLayer(californiaCana);

        // Posiciona o mapa na localização central entre Santos e San Diego
        map.flyTo([-2.814375, -61.628761], 3);

        $("#nomeMunicipioSugarcane_1").text("SAN DIEGO/USA");
        //$("#nomeMunicipioCorn_1").css("color", "blue");
        $("#nomeMunicipioSugarcane_1").css("font-weight", "bold");

        // Rota
        carbonFT_route(l_santos, l_california);
    
    // ROTTERDAM
    } else if (productionCana === '3') {
        if (typeof(santosCana) !== 'undefined' && santosCana !== "") {
            map.removeLayer(santosCana);
        }

        if (typeof(replanCana) !== 'undefined' && replanCana !== "") {
            map.removeLayer(replanCana);
        }

        if (typeof(californiaCana) !== 'undefined' && californiaCana !== "") {
            map.removeLayer(californiaCana);
        }

        if (typeof(singaporeCana) !== 'undefined' && singaporeCana !== "") {
            map.removeLayer(singaporeCana);
        }

        santosCana = L.marker(l_santos, { icon : blackMarker }).bindPopup("Port of Santos/BR at <b>" + l_santos.toString() + "</b>").openPopup();
        map.addLayer(santosCana);

        rotterdamCana = L.marker(l_rotterdam, { icon : blackMarker }).bindPopup("Port of Rotterdam/NLD at <b>" + l_rotterdam.toString() + "</b>").openPopup();
        map.addLayer(rotterdamCana);

        // Posiciona o mapa na localização central entre Santos e Rotterdam
        map.flyTo([24.045417, -7.720214], 3);

        $("#nomeMunicipioSugarcane_1").text("ROTTERDAM/NLD");
        //$("#nomeMunicipioCorn_1").css("color", "blue");
        $("#nomeMunicipioSugarcane_1").css("font-weight", "bold");

        // Rota
        carbonFT_route(l_santos, l_rotterdam);

    // SINGAPORE
    } else if (productionCana === '4') {
        if (typeof(santosCana) !== 'undefined' && santosCana !== "") {
            map.removeLayer(santosCana);
        }

        if (typeof(replanCana) !== 'undefined' && replanCana !== "") {
            map.removeLayer(replanCana);
        }

        if (typeof(californiaCana) !== 'undefined' && californiaCana !== "") {
            map.removeLayer(californiaCana);
        }

        if (typeof(rotterdamCana) !== 'undefined' && rotterdamCana !== "") {
            map.removeLayer(rotterdamCana);
        }

        santosCana = L.marker(l_santos, { icon : blackMarker }).bindPopup("Port of Santos/BR at <b>" + l_santos.toString() + "</b>").openPopup();
        map.addLayer(santosCana);

        singaporeCana = L.marker(l_singapore, { icon : blackMarker }).bindPopup("Port of SINGAPORE/SGP at <b>" + l_singapore.toString() + "</b>").openPopup();
        map.addLayer(singaporeCana);

        // Posiciona o mapa na localização central entre Santos e Singapore
        map.flyTo([-8.611361, 58.737805], 2.7);

        $("#nomeMunicipioSugarcane_1").text("ROTTERDAM/NLD");
        //$("#nomeMunicipioCorn_1").css("color", "blue");
        $("#nomeMunicipioSugarcane_1").css("font-weight", "bold");

        // Rota
        carbonFT_route(l_santos, l_singapore);

    // NENHUM
    } else {
        if (typeof(replanCana) !== 'undefined' && replanCana !== "") {
            map.removeLayer(replanCana);
        }

        if (typeof(santosCana) !== 'undefined' && santosCana !== "") {
            map.removeLayer(santosCana);
        }

        if (typeof(californiaCana) !== 'undefined' && californiaCana !== "") {
            map.removeLayer(californiaCana);
        }

        if (typeof(rotterdamCana) !== 'undefined' && rotterdamCana !== "") {
            map.removeLayer(rotterdamCana);
        }

        if (typeof(singaporeCana) !== 'undefined' && singaporeCana !== "") {
            map.removeLayer(singaporeCana);
        }

        // ATJ Route
        if (typeof(curvedPath) !== 'undefined') {
            curvedPath.remove();
        }

        $("#nomeMunicipioSugarcane_1").text(" ...");
        $("#nomeMunicipioSugarcane_1").css("color", "black");
    }
});

$("#locationSugarcane").on('change', function(){
    console.debug(this.value);

    locationSugarcane = this.value;

    // INSERIR FUNÇÃO PRA REMOVER MARCADOR

    // All 4 locations
    if (locationSugarcane === "1") {
        resetLocations_cstudyCana();

        $("#productionSugarcane").val('--');
        $("#nomeMunicipioSugarcane").text(" ...");
        $("#nomeMunicipioSugarcane").css("color", "black");          

        // Prata (MG)
        prataCana = L.marker(l_prata, { icon : blueMarker }).bindPopup("Prata/MG at <b>" + l_prata.toString() + "</b>").openPopup();
        map.addLayer(prataCana);

        //var brumado_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_brumado_buffer_50km, format: 'image/png', transparent: true });
        //map.addLayer(brumado_buffer);
        
        // Posiciona o mapa na localização
        //map.flyTo(l_prata, 6);

        // Caçú (GO)
        cacuCana = L.marker(l_cacu, { icon : blueMarker }).bindPopup("Caçú/GO at <b>" + l_cacu.toString() + "</b>").openPopup();
        map.addLayer(cacuCana);

        //var paranaiba_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_paranaiba_buffer_50km, format: 'image/png', transparent: true });
        //map.addLayer(paranaiba_buffer);
        
        // Posiciona o mapa na localização
        //map.flyTo(l_cacu, 6);
    
        // Paranaíba (MS)
        paranaibaCana = L.marker(l_paranaiba, { icon : blueMarker }).bindPopup("Paranaíba/MS at <b>" + l_paranaiba.toString() + "</b>").openPopup();
        map.addLayer(paranaibaCana);

        //var paranaiba_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_paranaiba_buffer_50km, format: 'image/png', transparent: true });
        //map.addLayer(paranaiba_buffer);
        
        // Posiciona o mapa na localização
        //map.flyTo(l_paranaiba, 6);
    
        // Presidente Venceslau (SP)
        pVenceslauCana = L.marker(l_pVenceslau, { icon : blueMarker }).bindPopup("Presidente Venceslau/SP at <b>" + l_pVenceslau.toString() + "</b>").openPopup();
        map.addLayer(pVenceslauCana);

        //var pVenceslau_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_pVenceslau_buffer_50km, format: 'image/png', transparent: true });
        //map.addLayer(pVenceslau_buffer);
        
        // Posiciona o mapa na localização
        //map.flyTo(l_pVenceslau, 6);

        // Posiciona o mapa na localização central dos pontos
        map.flyTo(l_paranaiba, 6);
    } else {
        resetLocations_cstudyCana();
    }
});

// Carbon Footprint
$("#locationSugarcane_1").on('change', function(){
    console.debug(this.value);

    locationCana = this.value;

    // INSERIR FUNÇÃO PRA REMOVER MARCADOR

    if(carbonFootprint_cana) {
        paranaibaCana = L.marker(l_paranaiba, { icon : blueMarker }).bindPopup("Paranaíba/MS at <b>" + l_paranaiba.toString() + "</b>").openPopup();
        map.addLayer(paranaibaCana);

        //var paranaiba_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_paranaiba_buffer_50km, format: 'image/png', transparent: true });
        //map.addLayer(paranaiba_buffer);
        
        // Posiciona o mapa na localização
        if (typeof(californiaCana) == 'undefined' || californiaCana == "") {
            map.flyTo(l_paranaiba, 6);
        }
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

// Carbon Footprint
$("#capacidadeSugarcane_1").on('change', function(){
    console.debug(this.value);

    capacidadeCana = this.value;
    capacidadeCana_valor = this.options[this.selectedIndex].text;
    var inputReqCalc = $(this).find(':selected').data('input');

    if (capacidadeCana != '' && capacidadeCana != '--') {
        //Output
        var output_value = parseFloat(inputReqCalc) / 365 / 0.9;

        $("#inputReqSugarcane_1").text(Math.round(output_value) + " t.day-1 (biomass, dry basis)");
        $("#inputReqSugarcane_1").css("color", "blue");

        //Co-products
        var diesel_value = output_value * 0.791 * 0.5042 * 0.088;
        var naphtha_value = output_value * 0.791 * 0.5042 * 0.161;

        $("#dieselSugarcane_1").text("Diesel: " + parseInt(diesel_value) + "  t.day-1");
        $("#dieselSugarcane_1").css("color", "blue");

        $("#naphthaSugarcane_1").text("Naphtha: " + parseInt(naphtha_value) + "  t.day-1");
        $("#naphthaSugarcane_1").css("color", "blue");

        capacitySelectionSugarcane();
    } else {
        //Output
        $("#inputReqSugarcane_1").text("... t.day-1 (biomass, dry basis)");
        $("#inputReqSugarcane_1").css("color", "black");

        //Co-products
        $("#dieselSugarcane_1").text("Diesel");
        $("#dieselSugarcane_1").css("color", "black");

        $("#naphthaSugarcane_1").text("Naphtha");
        $("#naphthaSugarcane_1").css("color", "black");
    }

});

// Botao next (Step #1)
$("button.sugarcane-step1-next").on("click", function() {
    if ((routeCana === "" || routeCana === "--") && (carbonFootprint_cana === "" || carbonFootprint_cana === "--")
        && (feedstockCana === "" || feedstockCana === "--")) {
        $.alert({
            boxWidth: '40%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>Conversion technology</b>, the <b>Carbon Footprint</b> and the <b>Feedstock</b>.',
            useBootstrap: false
        });
    } else if (routeCana === "" || routeCana === "--") {
        $.alert({
            boxWidth: '30%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>Conversion technology</b>.',
            useBootstrap: false
        });
    } else if (carbonFootprint_cana === "" || carbonFootprint_cana === "--") {
        $.alert({
            boxWidth: '30%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>Carbon Footprint</b> option.',
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

        if (carbonFootprint_cana) {
            $("#sugarcane-step2a").css("display", "block");
            $("#sugarcane-step2").css("display", "none");
        } else {
            $("#sugarcane-step2").css("display", "block");
            $("#sugarcane-step2a").css("display", "none");
        }

    }
});

// Botao back (Step #2)
$("button.sugarcane-step2-back").on("click", function() {
    $("#sugarcane-step2").css("display", "none");
    $("#sugarcane-step2a").css("display", "none");
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
        capacitySelectionMilho();

        if (carbonFootprint_cana) {
            /* Carbon Footprint -> Yes */
            if (productionCana <= '2') {
                result_panel_sugarcane = "<div style='margin-left:10%; overflow-y:auto; height: 100%''>" +
                                        "<div><img src='images/logo_safmaps_degrade.png' width='13%' style='float: right; margin-right: 7.3rem'>" +
                                            "<h6 style='font-weight:bold; color: blue'>Selection summary:</h6>" +
                                                "<div class='div-feedstock-results'>" +
                                                    "<b>Conversion tecnology:</b> " + routeCana + 
                                                    "<br/><b>Feedstock:</b> " + feedstockCana_valor +
                                                    "<br/><b>Case Study:</b> " + tipoInstalacaoSugarcane_valor +
                                                    "<br/><b>Ethanol production:</b> " + productionCana_valor +
                                                    "<br/><b>Output capacity (t.day<sup>-1</sup>):</b> " + capacidadeCana_valor +
                                                    "<br/><br/>" +
                                                    "<div class='div-carbon-results'>" +
                                                        "<span class='span-carbon-title'>SAF Carbon Footprint</span><br>" +
                                                        "<span class='span-carbon-alert'>Preliminary estimates of the carbon intensity of jet-fuel produced, primarily based on CORSIA default factors. These estimates will be revisited in due course.</span><br>" +
                                                        "<img src='images/cstudies_cana/" + tabela_carbonFT_cana + "' width='70%' ><br>" +
                                                        "<div class='div-carbon-notes'>" +
                                                            "<span class='span-carbon-notes'>1) CORSIA defeult value for sugarcane ethanol-to-jet fuel pathway, modelled using CTBE data.</span><br>" +
                                                            "<span class='span-carbon-notes'>2) Includes sugarcane transportation from farm to fermentation plant (default value of 2.1 g CO2eq/MJSAF, according to CTBE data), and ethanol transportation from the fermentation plant to the upgrading plant (in California or REPLAN). Transport from fermentation plant to REPLAN made by truck (56 km) and train (548 km). Transport from fermentation plant to California made by truck (56 km), train (800 km) and ocean tanker (14000 km).</span><br>" +
                                                            "<span class='span-carbon-notes'>3) Based on a standalone conversion design. Fermentation to ethanol based on CTBE data and upgrading based on JRC data. GHG emissions estimated using GREET1_2019 model.</span><br>" +
                                                            "<span class='span-carbon-notes'>4) CORSIA defeult value for sugarcane ethanol-to-jet fuel pathway.</span><br>" +
                                                            "<span class='span-carbon-notes'>5) LUC emissions not included.</span><br><br><br>" +
                                                        "</div>" +
                                                        "<img src='images/cstudies_cana/" + grafico_carbonFT_cana + "' width='90%' ><br>" +
                                                        "<span class='span-carbon-notes-2'>Main reference: ICAO (2021). CORSIA supporting document - Life cycle assessment methodology, Version 3 - March 2021.</span><br>" +
                                                    "</div>" +
                                                    "<br/><br/>" +
                                                "</div>" +
                                            "</div><br/><br/>" +
                                        "<div><h6 style='font-weight:bold'>Ethanol supply curve</h6>" +
                                            "<img src='images/cstudies_cana/" + curva_oferta_sugarcane_png + "' width='85%' ></div>" +
                                        "<div style='margin-top:4rem; '>" +
                                            "<div><h6 style='font-weight:bold; margin-left:5px'>Data table</h6>" +
                                            "<img src='images/cstudies_cana/" + resultado_sugarcane_png + "' width='70%' ></div>" +
                                        "<div style='margin-top:4rem; '>" +
                                        "<br/><br/>" +
                                    "</div>"
            } else if (productionCana >= '3') {
                result_panel_sugarcane = "<div style='margin-left:10%; overflow-y:auto; height: 100%''>" +
                                        "<div><img src='images/logo_safmaps_degrade.png' width='13%' style='float: right; margin-right: 7.3rem'>" +
                                            "<h6 style='font-weight:bold; color: blue'>Selection summary:</h6>" +
                                                "<div class='div-feedstock-results'>" +
                                                    "<b>Conversion tecnology:</b> " + routeCana + 
                                                    "<br/><b>Feedstock:</b> " + feedstockCana_valor +
                                                    "<br/><b>Case Study:</b> " + tipoInstalacaoSugarcane_valor +
                                                    "<br/><b>Ethanol production:</b> " + productionCana_valor +
                                                    "<br/><b>Output capacity (t.day<sup>-1</sup>):</b> " + capacidadeCana_valor +
                                                    "<br/><span style='color: red; font-weight: bold; padding-left: 38rem;'>(Review data)</span>" +
                                                    "<br/><br/>" +
                                                    "<div class='div-carbon-results'>" +
                                                        "<span class='span-carbon-title'>SAF Carbon Footprint</span><br>" +
                                                        "<span class='span-carbon-alert'>Preliminary estimates of the carbon intensity of jet-fuel produced, primarily based on CORSIA default factors. These estimates will be revisited in due course.</span><br>" +
                                                        "<img src='images/cstudies_cana/" + tabela_carbonFT_cana + "' width='70%' ><br>" +
                                                        "<div class='div-carbon-notes'>" +
                                                            "<span class='span-carbon-notes'>1) CORSIA defeult value for sugarcane ethanol-to-jet fuel pathway, modelled using CTBE data.</span><br>" +
                                                            "<span class='span-carbon-notes'>2) Includes sugarcane transportation from farm to fermentation plant (default value of 2.1 g CO2eq/MJSAF, according to CTBE data), and ethanol transportation from the fermentation plant to the upgrading plant (in <span style='color: red; font-weight: bold;'>Rotterdam</span>). Transport from fermentation plant to <span style='color: red; font-weight: bold;'>Rotterdam made by truck (56 km), train (800 km) and ocean tanker (14000 km)</span>.</span><br>" +
                                                            "<span class='span-carbon-notes'>3) Based on a standalone conversion design. Fermentation to ethanol based on CTBE data and upgrading based on JRC data. GHG emissions estimated using GREET1_2019 model.</span><br>" +
                                                            "<span class='span-carbon-notes'>4) CORSIA defeult value for sugarcane ethanol-to-jet fuel pathway.</span><br>" +
                                                            "<span class='span-carbon-notes'>5) LUC emissions not included.</span><br><br><br>" +
                                                        "</div>" +
                                                        "<img src='images/cstudies_cana/" + grafico_carbonFT_cana + "' width='90%' ><br>" +
                                                        "<span class='span-carbon-notes-2'>Main reference: ICAO (2021). CORSIA supporting document - Life cycle assessment methodology, Version 3 - March 2021.</span><br>" +
                                                    "</div>" +
                                                    "<br/><br/>" +
                                                "</div>" +
                                            "</div><br/><br/>" +
                                        "<div><h6 style='font-weight:bold'>Ethanol supply curve</h6>" +
                                            "<img src='images/cstudies_cana/" + curva_oferta_sugarcane_png + "' width='85%' ></div>" +
                                        "<div style='margin-top:4rem; '>" +
                                            "<div><h6 style='font-weight:bold; margin-left:5px'>Data table</h6>" +
                                            "<img src='images/cstudies_cana/" + resultado_sugarcane_png + "' width='70%' ></div>" +
                                        "<div style='margin-top:4rem; '>" +
                                        "<br/><br/>" +
                                    "</div>"
            }
        } else {
            /* Carbon Footprint -> No */
            result_panel_sugarcane = "<div style='margin-left:10%; overflow-y:auto; height: 100%''>" +
                                    "<div><img src='images/logo_safmaps_degrade.png' width='13%' style='float: right; margin-right: 7.3rem'>" +
                                        "<h6 style='font-weight:bold; color: blue'>Selection summary:</h6>" +                                
                                        "<div class='div-feedstock-results'>" +
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
function resetControls_cstudyCana() {
    $("#nomeMunicipioSugarcane").text(" ...");
    $("#nomeMunicipioSugarcane").css("color", "black");

    $("#locationSugarcane").val('--');
    $("#productionSugarcane").val('--');    

    // Carbon Footprint option
    $("#nomeMunicipioSugarcane_1").text(" ...");
    $("#nomeMunicipioSugarcane_1").css("color", "black");

    $("#locationSugarcane_1").val('--');
    $("#productionSugarcane_1").val('--');

}

function resetLocations_cstudyCana() {
    // REMOVE MARCADORES
    if (prataCana !== "undefined" && prataCana !== '') {
        map.removeLayer(prataCana);
        prataCana = '';
    }
    
    if (cacuCana !== "undefined" && cacuCana !== '') {
        map.removeLayer(cacuCana);
        cacuCana = '';
    }
    
    if (paranaibaCana !== "undefined" && paranaibaCana !== '') {
        map.removeLayer(paranaibaCana);
        paranaibaCana = '';
    }
    
    if (pVenceslauCana !== "undefined" && pVenceslauCana !== '') {
        map.removeLayer(pVenceslauCana);
        pVenceslauCana = '';
    }

    if (typeof(replanCana) !== 'undefined' && replanCana !== "") {
        map.removeLayer(replanCana);
        replanCana = '';
    }

    if (typeof(santosCana) !== 'undefined' && santosCana !== "") {
        map.removeLayer(santosCana);
        santosCana = '';
    }

    if (typeof(californiaCana) !== 'undefined' && californiaCana !== "") {
        map.removeLayer(californiaCana);
        californiaCana = '';
    }

    if (typeof(rotterdamCana) !== 'undefined' && rotterdamCana !== "") {
        map.removeLayer(rotterdamCana);
        rotterdamCana = '';
    }

    if (typeof(singaporeCana) !== 'undefined' && singaporeCana !== "") {
        map.removeLayer(singaporeCana);
        singaporeCana = '';
    }

}	

function resetControlsCapacity_cstudyCana() {
    //Output
    $("#capacidadeSugarcane").val('--');
    $("#inputReqSugarcane").text("... t.day-1 (biomass, dry basis)");
    $("#inputReqSugarcane").css("color", "black");

    //Co-products
    $("#dieselSugarcane").text("Gasoline");
    $("#dieselSugarcane").css("color", "black");

    $("#naphthaSugarcane").text("LPG");
    $("#naphthaSugarcane").css("color", "black");


    // Carbon Footprint Option
    //Output
    $("#capacidadeSugarcane_1").val('--');
    $("#inputReqSugarcane_1").text("... t.day-1 (biomass, dry basis)");
    $("#inputReqSugarcane_1").css("color", "black");

    //Co-products
    $("#dieselSugarcane_1").text("Gasoline");
    $("#dieselSugarcane_1").css("color", "black");

    $("#naphthaSugarcane_1").text("LPG");
    $("#naphthaSugarcane_1").css("color", "black");			    
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

    if(carbonFootprint_cana) {
        if (productionCana == '1') {
            tabela_carbonFT_cana = 'tabela_carbonFT_cana_replan.png';
            grafico_carbonFT_cana = 'grafico_carbonFT_cana_replan.png';
        } else if (productionCana == '2') {
            tabela_carbonFT_cana = 'tabela_carbonFT_cana_california.png';
            grafico_carbonFT_cana = 'grafico_carbonFT_cana_california.png';
        } else if (productionCana == '3') {
            tabela_carbonFT_cana = 'tabela_carbonFT_cana_rotterdam.png';
            grafico_carbonFT_cana = 'grafico_carbonFT_cana_rotterdam.png';
        } else if (productionCana == '4') {
            tabela_carbonFT_cana = 'tabela_carbonFT_cana_singapore.png';
            grafico_carbonFT_cana = 'grafico_carbonFT_cana_singapore.png';
        }
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


// INFRASTRUCTURE
// toggle-roads (Layer)
$("#info-roads_fd_05").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-roads").trigger("click");
}); 

// info-railroads_fd_05
$("#info-railroads_fd_05").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-railroads").trigger("click");
}); 

// info-pipelines_fd_05
$("#info-pipelines_fd_05").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-pipelines").trigger("click");
}); 

// info-ethanol_pipelines_fd_05
$("#info-ethanol_pipelines_fd_05").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-ethanol_pipelines").trigger("click");
}); 

// info-waterways_fd_05
$("#info-waterways_fd_05").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-waterways").trigger("click");
}); 

// info-airports_fd_05
$("#info-airports_fd_05").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-airports").trigger("click");
}); 

// info-refineries_refining_fd_05
$("#info-refineries_refining_fd_05").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-refineries_capacity").trigger("click");
}); 

// info-ethanol_distilleries_fd_05
$("#info-ethanol_distilleries_fd_05").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-ethanol_milling").trigger("click");
}); 

// info-ethanol_terminals_fd_05
$("#info-ethanol_terminals_fd_05").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-ethanol_pipelines_terminals").trigger("click");
}); 



