/*
 * All panels, controls and other issues related to: CORN
 *
 * 
 */

// MENU: Panel activation
$("#tab-corn-maps").click(function(e) {
    e.preventDefault();

    reset_actived (e);
    $("#panel-support-maps").css("display", "none");
    $("#panel-corsia").css("display", "none");
    $("#panel-eucalipto").css("display", "none");
    $("#panel-eucalipto-residues").css("display", "none");
    $("#panel-soja").css("display", "none");
    $("#panel-macauba").css("display", "none");
    $("#panel-palma").css("display", "none");		
    $("#panel-sugarcane").css("display", "none");	
    $("#panel-sugarcane-residues").css("display", "none");
    $("#panel-tallow").css("display", "none");		
    $("#panel-off_gases").css("display", "none");	
    $("#panel-uco-residues").css("display", "none");		
    $("#empty").css("display", "none");
    $("#panel-corn").css("display", "block");		
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
    group_1 = ['DBMS:aptidao_milho','DBMS:custos_milho','DBMS:produtividade_milho'];
    group_2 = ['DBMS:main_roads','DBMS:railroads_fd_stock','DBMS:pipelines_fd_stock','DBMS:ethanol_pipelines_fd_stock','DBMS:waterways_fd_stock'];
    group_3 = ['DBMS:airports_fd_stock','DBMS:refineries_refining_fd_stock','DBMS:ethanol_output_fd_stock','DBMS:ethanol_pipelines_terminals_fd_stock'];
    
}); 


/*
 *  CORN LAYERS (from GeoServer) and variables
 */

var l_aptidao_milho = 'DBMS:aptidao_milho';
var l_custos_milho = 'DBMS:custos_milho';
var l_produtividade_milho = 'DBMS:produtividade_milho';		

var l_california = [32.735637968345415, -117.17653769862518];
var l_santos = [-23.96542599813314, -46.29960581675506];
var l_rotterdam = [51.948380, 4.142125];
var l_singapore = [-1.277156, 103.863668];

var curva_oferta_milho_png = '', resultado_milho_png = '', comparacao_milho_png = '', result_panel_milho = '';
var tabela_carbonFT_corn = '', graficoCarbonFT_corn = '';


/*
 *  CORN LAYERS
 */

// Corn suitability (Layer)
$("#toggle-aptidao_milho").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-produtividade_milho').prop('checked', false);
    $('#toggle-custo_milho').prop('checked', false);
    //reset_all_legends();
    removeLayers_group("gp_1");

    options['layers'] = l_aptidao_milho;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_aptidao_milho, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);    
        map.addLayer(prov);

        $("#legend-produtividade_milho").css("display", "none");
        $("#legend-custo_milho").css("display", "none");
        $("#legend-aptidao_milho").css("display", "block");
        reorderLayers();
    } else {
        $("#legend-aptidao_milho").css("display", "none");
        removeLayer(l_aptidao_milho);
    }
});

// Pop-up de alerta - Corn suitability (Layer)
$('#popper-aptidao_milho').hover(function() {
    $( "#alert-aptidao_milho" ).toggle();
});

// Corn yield (Layer)
$("#toggle-produtividade_milho").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-aptidao_milho').prop('checked', false);
    $('#toggle-custo_milho').prop('checked', false);
    //reset_all_legends();
    removeLayers_group("gp_1");

    options['layers'] = l_produtividade_milho;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_produtividade_milho, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);    
        map.addLayer(prov);

        $("#legend-custo_milho").css("display", "none");
        $("#legend-aptidao_milho").css("display", "none");
        $("#legend-produtividade_milho").css("display", "block");
        reorderLayers();
    } else {
        $("#legend-produtividade_milho").css("display", "none");
        removeLayer(l_produtividade_milho);
    }
});

// Pop-up de alerta - Corn yield (Layer)
$('#popper-produtividade_milho').hover(function() {
    $( "#alert-produtividade_milho" ).toggle();
});

// Cost of sugarcane production (Layer)
$("#toggle-custo_milho").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-aptidao_milho').prop('checked', false);
    $('#toggle-produtividade_milho').prop('checked', false);
    //reset_all_legends();
    removeLayers_group("gp_1");

    options['layers'] = l_custos_milho;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_custos_milho, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);    
        map.addLayer(prov);

        $("#legend-aptidao_milho").css("display", "none");
        $("#legend-produtividade_milho").css("display", "none");
        $("#legend-custo_milho").css("display", "block");
        reorderLayers();
    } else {
        $("#legend-custo_milho").css("display", "none");
        removeLayer(l_custos_milho);
    }
});

// Pop-up de alerta - Cost of sugarcane production (Layer)
$('#popper-custo_milho').hover(function() {
    $( "#alert-custo_milho" ).toggle();
});

// INFRASTRUCTURE
// toggle-roads (Layer)
$("#toggle-roads_fd_06").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-railroads_fd_06').prop('checked', false);
    $('#toggle-pipelines_fd_06').prop('checked', false);
    $('#toggle-ethanol_pipelines_fd_06').prop('checked', false);
    $('#toggle-waterways_fd_06').prop('checked', false);
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
$("#toggle-railroads_fd_06").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-roads_fd_06').prop('checked', false);
    $('#toggle-pipelines_fd_06').prop('checked', false);
    $('#toggle-ethanol_pipelines_fd_06').prop('checked', false);
    $('#toggle-waterways_fd_06').prop('checked', false);
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
$("#toggle-pipelines_fd_06").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-roads_fd_06').prop('checked', false);
    $('#toggle-railroads_fd_06').prop('checked', false);
    $('#toggle-ethanol_pipelines_fd_06').prop('checked', false);
    $('#toggle-waterways_fd_06').prop('checked', false);
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
$("#toggle-ethanol_pipelines_fd_06").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-roads_fd_06').prop('checked', false);
    $('#toggle-railroads_fd_06').prop('checked', false);
    $('#toggle-pipelines_fd_06').prop('checked', false);
    $('#toggle-waterways_fd_06').prop('checked', false);
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
$("#toggle-waterways_fd_06").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-roads_fd_06').prop('checked', false);
    $('#toggle-railroads_fd_06').prop('checked', false);
    $('#toggle-pipelines_fd_06').prop('checked', false);
    $('#toggle-ethanol_pipelines_fd_06').prop('checked', false);
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
$("#toggle-airports_fd_06").on('change', function(){
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
$("#toggle-refineries_refining_fd_06").on('change', function(){
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

// toggle-ethanol_distilleries_fd_06 (Layer)
$("#toggle-ethanol_distilleries_fd_06").on('change', function(){
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

// toggle-ethanol_terminals_fd_06 (Layer)
$("#toggle-ethanol_terminals_fd_06").on('change', function(){
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
var routeMilho = '', feedstockMilho = '', feedstockMilho_valor = '', carbonFootprint_corn = '';
var selecionadoMilho = '', tipoInstalacaoMilho = '', tipoInstalacaoMilho_valor = '', capacidadeMilho = '', capacidadeMilho_valor = '';
var locationMilho = '', productionMilho = '', productionMilho_valor = '';

var cstudy_milho = false;

// Selecao da rota
$("#cornRota").on('change', function(){
    routeMilho = this.value;
});

// Carbon footprint
$("#cornCarbon").on('change', function(){
    if (this.value === '1') {
        carbonFootprint_corn = true;
        $("#feedstock_corn_1").css("display", "none");
        $("#feedstock_corn_2").css("display", "block");
    } else {
        carbonFootprint_corn = false;
        $("#feedstock_corn_1").css("display", "block");
        $("#feedstock_corn_2").css("display", "none");
    };

    resetPoints_cstudyMilho();
    resetControls_cstudyMilho();
    resetControlsCapacity_cstudyMilho();
    capacitySelectionMilho();
});

// Selecao do feedstock
$("#cornFStock").on('change', function(){
    feedstockMilho = this.value;
    feedstockMilho_valor = 'Anhydrous ethanol from sugarcane + corn';
});

// Selecao do feedstock (Carbon Footprint)
$("#cornFStock_1").on('change', function(){
    feedstockMilho = this.value;
    feedstockMilho_valor = 'Anhydrous ethanol from corn';
});

// Seleção mapa de apoio
$("#cornMaps").on('change', function(){
    console.debug(this.value);

    selecionadoMilho = this.value;

    // Case Study Corn
    cstudy_milho = true;
    if (cstudy_eucalipto) {
        setFalse_cstudyEucalipto();
    }	

    // Corn suitability
    if (selecionadoMilho === "1") {
        $('input:checkbox').not(this).prop('checked', false);
        reset_all_legends();
        removeLayers();

        options['layers'] = l_aptidao_milho;
        var aptidao_milho= L.tileLayer.wms(url, options);
        map.addLayer(aptidao_milho);

        $("#legend-aptidao_milho").css("display", "block");
    // Costs of corn production
    } else if (selecionadoMilho === "3") {
        $('input:checkbox').not(this).prop('checked', false);
        reset_all_legends();
        removeLayers();

        options['layers'] = l_custos_milho;
        var custos_milho= L.tileLayer.wms(url, options);
        map.addLayer(custos_milho);

        $("#legend-custo_milho").css("display", "block");
    // Milho yield
    } else if (selecionadoMilho === "2") {
        $('input:checkbox').not(this).prop('checked', false);
        reset_all_legends();
        removeLayers();

        options['layers'] = l_produtividade_milho;
        var produtividade_milho = L.tileLayer.wms(url, options);
        map.addLayer(produtividade_milho);

        $("#legend-produtividade_milho").css("display", "block");
    // Continue without maps
    } else if (selecionadoMilho === "0") {
        $('input:checkbox').not(this).prop('checked', false);
        reset_all_legends();
        removeLayers();
    }
});	

$("#tipoInstalacaoCorn").on('change', function(){
    console.debug(this.value);

    tipoInstalacaoMilho = this.value;
    tipoInstalacaoMilho_valor =  this.options[this.selectedIndex].text;

    resetControls_cstudySoja();
    resetControlsCapacity_cstudySoja();
    capacitySelectionMilho();
});

// Carbon Footprint
$("#tipoInstalacaoCorn_1").on('change', function(){
    console.debug(this.value);

    tipoInstalacaoMilho = this.value;
    tipoInstalacaoMilho_valor =  this.options[this.selectedIndex].text;

    resetControls_cstudySoja();
    resetControlsCapacity_cstudySoja();
    capacitySelectionMilho();
});

$("#productionCorn").on('change', function(){
    console.debug(this.value);

    productionMilho = this.value;
    productionMilho_valor =  this.options[this.selectedIndex].text;

    if (capacidadeMilho != '' && capacidadeMilho != '--') {
        capacitySelectionMilho();
    }

    resetPoints_cstudySoja();

    // INSERIR FUNÇÃO PRA REMOVER MARCADOR
    if (productionMilho != '' && productionMilho != '--') {
        replanCana = L.marker(l_replan, { icon : blackMarker }).bindPopup("REPLAN at <b>" + l_replan.toString() + "</b>").openPopup();
        map.addLayer(replanCana);

        //var revap_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_revap_buffer_50km, format: 'image/png', transparent: true });
        //map.addLayer(revap_buffer);
        
        // Posiciona o mapa na localização
        map.flyTo(l_replan, 6);

        $("#nomeMunicipioCorn").text("PAULÍNIA/SP");
        //$("#nomeMunicipioCorn").css("color", "blue");
        $("#nomeMunicipioCorn").css("font-weight", "bold");
    } else {
        map.removeLayer(replanCana);

        $("#nomeMunicipioCorn").text(" ...");
        $("#nomeMunicipioCorn").css("color", "black");
    }
});

// Carbon Footprint
$("#productionCorn_1").on('change', function(){
    console.debug(this.value);

    productionMilho = this.value;
    productionMilho_valor =  this.options[this.selectedIndex].text;

    if (capacidadeMilho != '' && capacidadeMilho != '--') {
        capacitySelectionMilho();
    }

    resetPoints_cstudySoja();

    // INSERIR FUNÇÃO PRA REMOVER MARCADOR
    //if (productionMilho != '' && productionMilho != '--') {
    if (productionMilho === '1') {
        if (typeof(californiaCana) !== 'undefined' && californiaCana !== "") {
            map.removeLayer(californiaCana);
        }

        if (typeof(santosCana) !== 'undefined' && santosCana !== "") {
            map.removeLayer(santosCana);
        }
        
        replanCana = L.marker(l_replan, { icon : blackMarker }).bindPopup("REPLAN at <b>" + l_replan.toString() + "</b>").openPopup();
        map.addLayer(replanCana);

        //var revap_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_revap_buffer_50km, format: 'image/png', transparent: true });
        //map.addLayer(revap_buffer);
        
        // Posiciona o mapa na localização
        map.flyTo(l_replan, 6);

        $("#nomeMunicipioCorn_1").text("PAULÍNIA/SP");
        //$("#nomeMunicipioCorn_1").css("color", "blue");
        $("#nomeMunicipioCorn_1").css("font-weight", "bold");
    } else if (productionMilho === '2') {
        if (typeof(replanCana) !== 'undefined' && replanCana !== "") {
            map.removeLayer(replanCana);
        }

        santosCana = L.marker(l_santos, { icon : blackMarker }).bindPopup("Port of Santos/BR at <b>" + l_santos.toString() + "</b>").openPopup();
        map.addLayer(santosCana);

        californiaCana = L.marker(l_california, { icon : blackMarker }).bindPopup("Port of San Diego/USA at <b>" + l_california.toString() + "</b>").openPopup();
        map.addLayer(californiaCana);

        // Posiciona o mapa na localização central entre Santos e San Diego
        map.flyTo([-2.814375, -61.628761], 3);

        $("#nomeMunicipioCorn_1").text("SAN DIEGO/USA");
        //$("#nomeMunicipioCorn_1").css("color", "blue");
        $("#nomeMunicipioCorn_1").css("font-weight", "bold");
    }
     else {
        if (typeof(replanCana) !== 'undefined' && replanCana !== "") {
            map.removeLayer(replanCana);
        }

        if (typeof(santosCana) !== 'undefined' && santosCana !== "") {
            map.removeLayer(santosCana);
        }

        if (typeof(californiaCana) !== 'undefined' && californiaCana !== "") {
            map.removeLayer(californiaCana);
        }

        $("#nomeMunicipioCorn_1").text(" ...");
        $("#nomeMunicipioCorn_1").css("color", "black");
    }
});

$("#locationCorn").on('change', function(){
    console.debug(this.value);

    locationMilho = this.value;

    // INSERIR FUNÇÃO PRA REMOVER MARCADOR

    // All 4 locations
    if (locationMilho === "1") {
        resetLocations_cstudyCana();

        $("#productionCorn").val('--');
        $("#nomeMunicipioCorn").text(" ...");
        $("#nomeMunicipioCorn").css("color", "black");

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
$("#locationCorn_1").on('change', function(){
    console.debug(this.value);

    locationMilho = this.value;

    // INSERIR FUNÇÃO PRA REMOVER MARCADOR

    if(carbonFootprint_corn) {
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

$("#capacidadeCorn").on('change', function(){
    console.debug(this.value);

    capacidadeMilho = this.value;
    capacidadeMilho_valor = this.options[this.selectedIndex].text;
    var inputReqCalc = $(this).find(':selected').data('input');

    if (capacidadeMilho != '' && capacidadeMilho != '--') {
        //Output
        var output_value = parseFloat(inputReqCalc) / 365 / 0.9;

        $("#inputReqCorn").text(Math.round(output_value) + " t.day-1 (biomass, dry basis)");
        $("#inputReqCorn").css("color", "blue");

        //Co-products
        var diesel_value = output_value * 0.791 * 0.5042 * 0.088;
        var naphtha_value = output_value * 0.791 * 0.5042 * 0.161;

        $("#dieselCorn").text("Diesel: " + parseInt(diesel_value) + "  t.day-1");
        $("#dieselCorn").css("color", "blue");

        $("#naphthaCorn").text("Naphtha: " + parseInt(naphtha_value) + "  t.day-1");
        $("#naphthaCorn").css("color", "blue");

        capacitySelectionMilho();
    } else {
        //Output
        $("#inputReqCorn").text("... t.day-1 (biomass, dry basis)");
        $("#inputReqCorn").css("color", "black");

        //Co-products
        $("#dieselCorn").text("Diesel");
        $("#dieselSugarcane").css("color", "black");

        $("#naphthaCorn").text("Naphtha");
        $("#naphthaCorn").css("color", "black");
    }

});

// Carbon Footprint
$("#capacidadeCorn_1").on('change', function(){
    console.debug(this.value);

    capacidadeMilho = this.value;
    capacidadeMilho_valor = this.options[this.selectedIndex].text;
    var inputReqCalc = $(this).find(':selected').data('input');

    if (capacidadeMilho != '' && capacidadeMilho != '--') {
        //Output
        var output_value = parseFloat(inputReqCalc) / 365 / 0.9;

        $("#inputReqCorn_1").text(Math.round(output_value) + " t.day-1 (biomass, dry basis)");
        $("#inputReqCorn_1").css("color", "blue");

        //Co-products
        var diesel_value = output_value * 0.791 * 0.5042 * 0.088;
        var naphtha_value = output_value * 0.791 * 0.5042 * 0.161;

        $("#dieselCorn_1").text("Diesel: " + parseInt(diesel_value) + "  t.day-1");
        $("#dieselCorn_1").css("color", "blue");

        $("#naphthaCorn_1").text("Naphtha: " + parseInt(naphtha_value) + "  t.day-1");
        $("#naphthaCorn_1").css("color", "blue");

        capacitySelectionMilho();
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
$("button.corn-step1-next").on("click", function() {
    if ((routeMilho === "" || routeMilho === "--") && (carbonFootprint_corn === "" || carbonFootprint_corn === "--")
        && (feedstockMilho === "" || feedstockMilho === "--")) {
        $.alert({
            boxWidth: '40%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>Conversion technology</b>, the <b>Carbon Footprint</b> and the <b>Feedstock</b>.',
            useBootstrap: false
        });
    } else if (routeMilho === "" || routeMilho === "--") {
        $.alert({
            boxWidth: '30%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>Conversion technology</b>.',
            useBootstrap: false
        });
    } else if (carbonFootprint_corn === "" || carbonFootprint_corn === "--") {
        $.alert({
            boxWidth: '30%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>Carbon Footprint</b> option.',
            useBootstrap: false
        });
    } else if (feedstockMilho === "" || feedstockMilho === "--") {
        $.alert({
            boxWidth: '30%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>Feedstock</b>.',
            useBootstrap: false
        });
    } else {
        if (typeof(selecionadoMilho) == 'undefined' || selecionadoMilho != "0" && cstudy_milho == false) {
            // Case Study Corn
            cstudy_milho = true;
            if (cstudy_eucalipto) {
                setFalse_cstudyEucalipto();
            }
        }

        $("#corn-step1").css("display", "none");

        if (carbonFootprint_corn) {
            $("#corn-step2a").css("display", "block");
            $("#corn-step2").css("display", "none");
        } else {
            $("#corn-step2").css("display", "block");
            $("#corn-step2a").css("display", "none");
        }
        
    }
});

// Botao back (Step #2)
$("button.corn-step2-back").on("click", function() {
    $("#corn-step2").css("display", "none");
    $("#corn-step2a").css("display", "none");
    $("#corn-step1").css("display", "block");
});

// Botao calculate (Step #2)
$("button.corn-step2-calc").on("click", function() {
    if ((tipoInstalacaoMilho === "" || tipoInstalacaoMilho === "--") 
            && (capacidadeMilho === "" || capacidadeMilho === "--")
            && (productionMilho === "" || productionMilho === "--")) {
        $.alert({
            boxWidth: '40%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>Case Study</b>, the <b>Ethanol Production</b> and the <b>Output capacity</b>.',
            useBootstrap: false
        });
    } else if (tipoInstalacaoMilho === "" || tipoInstalacaoMilho === "--") {
        $.alert({
            boxWidth: '30%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>Case Study</b>.',
            useBootstrap: false
        });
    } else if (productionMilho === "" || productionMilho === "--") {
        $.alert({
            boxWidth: '30%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>Ethanol Production</b>.',
            useBootstrap: false
        });
    } else if (capacidadeMilho === "" || capacidadeMilho === "--") {
        $.alert({
            boxWidth: '30%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>Output capacity</b>.',
            useBootstrap: false
        });
    } else {
        capacitySelectionMilho();

        if (carbonFootprint_corn) {
            /* Carbon Footprint -> Yes */
            result_panel_milho = "<div style='margin-left:10%; overflow-y:auto; height: 100%''>" +
                                    "<div><img src='images/logo_safmaps_degrade.png' width='13%' style='float: right; margin-right: 7.3rem'>" +
                                        "<h6 style='font-weight:bold; color: blue'>Selection summary:</h6>" +
                                            "<div class='div-feedstock-results'>" +
                                                "<b>Conversion tecnology:</b> " + routeMilho + 
                                                "<br/><b>Feedstock:</b> " + feedstockMilho_valor +
                                                "<br/><b>Case Study:</b> " + tipoInstalacaoMilho_valor +
                                                "<br/><b>Ethanol production:</b> " + productionMilho_valor +
                                                "<br/><b>Output capacity (t.day<sup>-1</sup>):</b> " + capacidadeMilho_valor +
                                                "<br/><br/>" +
                                                "<div class='div-carbon-results'>" +
                                                    "<span class='span-carbon-title'>SAF Carbon Footprint</span><br>" +
                                                    "<span class='span-carbon-alert'>Preliminary estimates of the carbon intensity of jet-fuel produced, primarily based on CORSIA default factors. These estimates will be revisited in due course.</span><br>" +
                                                    "<img src='images/cstudies_milho/" + tabela_carbonFT_corn + "' width='70%' ><br>" +
                                                    "<div class='div-carbon-notes'>" +
                                                        "<span class='span-carbon-notes'>1) CORSIA defeult value for corn grain ethanol ATJ pathway, modelled using MIT data.</span><br>" +
                                                        "<span class='span-carbon-notes'>2) Includes corn transportation from farm to fermentation plant (default value of 1.2 g CO2eq/MJSAF, according to MIT data), and ethanol transportation from the fermentation plant to the upgrading plant (in California or REPLAN). Transport from fermentation plant to REPLAN made by truck (56 km) and train (548 km). Transport from fermentation plant to California made by truck (56 km), train (800 km) and ocean tanker (14000 km).</span><br>" +
                                                        "<span class='span-carbon-notes'>3) Based on a standalone conversion design. Fermentation to ethanol based on MIT data (assuming process energy requirements supplied by a biomass CHP) and upgrading based on JRC data. Upgrading in California assumes US average electricity mix, and upgrading in REPLAN assumes Brazilian electricity mix. GHG emissions estimated using GREET1_2019 model.</span><br>" +
                                                        "<span class='span-carbon-notes'>4) CORSIA defeult value for corn grain ethanol ATJ pathway.</span><br>" +
                                                        "<span class='span-carbon-notes'>5) LUC emissions not included.</span><br><br><br>" +
                                                    "</div>" +
                                                    "<img src='images/cstudies_milho/" + grafico_carbonFT_corn + "' width='90%' ><br>" +
                                                    "<span class='span-carbon-notes-2'>Main reference: ICAO (2021). CORSIA supporting document - Life cycle assessment methodology, Version 3 - March 2021.</span><br>" +
                                                "</div>" +
                                                "<br/><br/>" +
                                            "</div>" +
                                        "</div><br/><br/>" +
                                    "<div><h6 style='font-weight:bold'>Ethanol supply curve</h6>" +
                                        "<img src='images/cstudies_cana/" + curva_oferta_milho_png + "' width='85%' ></div>" +
                                    "<div style='margin-top:4rem; '>" +
                                        "<div><h6 style='font-weight:bold; margin-left:5px'>Data table</h6>" +
                                        "<img src='images/cstudies_cana/" + resultado_milho_png + "' width='70%' ></div>" +
                                    "<div style='margin-top:4rem; '>" +
                                    "<br/><br/>" +
                                "</div>"
        } else {
            /* Carbon Footprint -> No */
            result_panel_milho = "<div style='margin-left:10%; overflow-y:auto; height: 100%''>" +
                                    "<div><img src='images/logo_safmaps_degrade.png' width='13%' style='float: right; margin-right: 7.3rem'>" +
                                        "<h6 style='font-weight:bold; color: blue'>Selection summary:</h6>" +
                                            "<div class='div-feedstock-results'>" +
                                                "<b>Conversion tecnology:</b> " + routeMilho + 
                                                "<br/><b>Feedstock:</b> " + feedstockMilho_valor +
                                                "<br/><b>Case Study:</b> " + tipoInstalacaoMilho_valor +
                                                "<br/><b>Ethanol production:</b> " + productionMilho_valor +
                                                "<br/><b>Output capacity (t.day<sup>-1</sup>):</b> " + capacidadeMilho_valor +
                                                "<br/><br/>" +
                                            "</div>" +
                                        "</div><br/><br/>" +
                                    "<div><h6 style='font-weight:bold'>Ethanol supply curve</h6>" +
                                        "<img src='images/cstudies_cana/" + curva_oferta_milho_png + "' width='85%' ></div>" +
                                    "<div style='margin-top:4rem; '>" +
                                        "<div><h6 style='font-weight:bold; margin-left:5px'>Data table</h6>" +
                                        "<img src='images/cstudies_cana/" + resultado_milho_png + "' width='70%' ></div>" +
                                    "<div style='margin-top:4rem; '>" +
                                        "<div><h6 style='font-weight:bold; margin-left:5px'>Comparison table</h6>" +
                                            "<img src='images/cstudies_cana/" + comparacao_milho_png + "' width='70%'></div>" +
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
            content:	result_panel_milho,
            callback:    function () {
                this.content.css("padding", "15px");
                
            }
        });
    }
});

// Reset controls
function resetControls_cstudyMilho() {
    $("#nomeMunicipioCorn").text(" ...");
    $("#nomeMunicipioCorn").css("color", "black");

    $("#locationcorn").val('--');
    $("#productionCorn").val('--');    

    // Carbon Footprint option
    $("#nomeMunicipioCorn_1").text(" ...");
    $("#nomeMunicipioCorn_1").css("color", "black");

    $("#locationCorn_1").val('--');
    $("#productionCorn_1").val('--');

}

function resetPoints_cstudyMilho() {
    // REMOVE MARCADORES
    if (typeof(prataCana) !== 'undefined' && prataCana !== "") {
        map.removeLayer(prataCana);
        prataCana = '';
    }

    if (typeof(cacuCana) !== 'undefined' && cacuCana !== "") {
        map.removeLayer(cacuCana);
        cacuCana = '';
    }

    if (typeof(paranaibaCana) !== 'undefined' && paranaibaCana !== "") {
        map.removeLayer(paranaibaCana);
        paranaibaCana = '';
    }

    if (typeof(pVenceslauCana) !== 'undefined' && pVenceslauCana !== "") {
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
}

function resetControlsCapacity_cstudyMilho() {
    //Output
    $("#capacidadeCorn").val('--');
    $("#inputReqCorn").text("... t.day-1 (biomass, dry basis)");
    $("#inputReqCorn").css("color", "black");

    //Co-products
    $("#dieselCorn").text("Gasoline");
    $("#dieselCorn").css("color", "black");

    $("#naphthaCorn").text("LPG");
    $("#naphthaCorn").css("color", "black");


    // Carbon Footprint Option
    //Output
    $("#capacidadeCorn_1").val('--');
    $("#inputReqCorn_1").text("... t.day-1 (biomass, dry basis)");
    $("#inputReqCorn_1").css("color", "black");

    //Co-products
    $("#dieselCorn_1").text("Gasoline");
    $("#dieselCorn_1").css("color", "black");

    $("#naphthaCorn_1").text("LPG");
    $("#naphthaCorn_1").css("color", "black");			    
}

function capacitySelectionMilho() {
    // Case 3b - REPLAN
    if (capacidadeMilho === '1') {
        curva_oferta_milho_png = 'Case3_Cana_Milho_REPLAN_182_fig.png';
        resultado_milho_png = 'Case3_Cana_Milho_REPLAN_182_tabela.png';
    } else if (capacidadeMilho === '2') {
        curva_oferta_milho_png = 'Case3_Cana_Milho_REPLAN_334_fig.png';
        resultado_milho_png = 'Case3_Cana_Milho_REPLAN_334_tabela.png';
    } else if (capacidadeMilho === '3') {
        curva_oferta_milho_png = 'Case3_Cana_Milho_REPLAN_465_fig.png';
        resultado_milho_png = 'Case3_Cana_Milho_REPLAN_465_tabela.png';
    } else if (capacidadeMilho === '4') {
        curva_oferta_milho_png = 'Case3_Cana_Milho_REPLAN_930_fig.png';
        resultado_milho_png = 'Case3_Cana_Milho_REPLAN_930_tabela.png';
    }

    if(carbonFootprint_corn) {
        if (productionMilho == '1') {
            tabela_carbonFT_corn = 'tabela_carbonFT_corn_replan.png';
            grafico_carbonFT_corn = 'grafico_carbonFT_corn_replan.png';
        } else if (productionMilho == '2') {
            tabela_carbonFT_corn = 'tabela_carbonFT_corn_california.png';
            grafico_carbonFT_corn = 'grafico_carbonFT_corn_california.png';
        }
    } else {
        comparacao_milho_png = 'Case3_Cana_Milho_Comparacao.png';
    }

};


/*
 * JANELAS INFO - MAPAS
 */

// Milho - INFO
// Aptidão
$("#info-aptidao_milho").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 520, height: 270},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Corn suitability</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Suitability of corn as second crop was estimated based on climatic and geographic parameters, soil suitability for agriculture and slope, considering sowing period from mid December to February." +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> SAFmaps (2021)" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='https://data.mendeley.com/datasets/g25wt3t7k5/1'>Download page</a></p>" +
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
$("#info-produtividade_milho").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 550, height: 400},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Expected corn yield</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Estimated based on a statistic model developed using data of rainfall and air temperature in the months of the corn cycle, the IDP (index related to the rainfall distribution throughout the year), and a set of dummy variables. Dummies make it possible to differentiate between conventional and transgenic corn (higher yield) and also take into account soil suitability. The states of SC, RS, BA and PI are unsuitable to corn as second crop production according to climatic conditions. Thus, yield was not estimated for these regions.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> SAFmaps (2021)" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='https://data.mendeley.com/datasets/g25wt3t7k5/1'>Download page</a></p>" +
                                "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Six states suitable for corn as second crop (GO, MT, MS, MG, PR, SP)" +
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
$("#info-custo_milho").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 520, height: 370},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Expected costs of corn production</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Costs for transgenic corn, in R$ (2018), considering that expansion of corn production would occur in former pasturelands. " +
                                "Costs include harvesting, transport to nearby warehouses and storage for one month. Thus, costs reflect the availability of corn at an intermediate point between the harvest and the processing unit. The states of SC, RS, BA and PI are unsuitable to corn as second crop production according to climatic conditions. Thus, yields were not estimated for these regions.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> SAFmaps (2021)" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='https://data.mendeley.com/datasets/g25wt3t7k5/1'>Download page</a></p>" +
                                "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Six states suitable for corn as second crop (GO, MT, MS, MG, PR, SP)" +
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
$("#info-roads_fd_06").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-roads").trigger("click");
}); 

// info-railroads_fd_06
$("#info-railroads_fd_06").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-railroads").trigger("click");
}); 

// info-pipelines_fd_06
$("#info-pipelines_fd_06").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-pipelines").trigger("click");
}); 

// info-ethanol_pipelines_fd_06
$("#info-ethanol_pipelines_fd_06").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-ethanol_pipelines").trigger("click");
}); 

// info-waterways_fd_06
$("#info-waterways_fd_06").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-waterways").trigger("click");
}); 

// info-airports_fd_06
$("#info-airports_fd_06").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-airports").trigger("click");
}); 

// info-refineries_refining_fd_06
$("#info-refineries_refining_fd_06").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-refineries_capacity").trigger("click");
}); 

// info-ethanol_distilleries_fd_06
$("#info-ethanol_distilleries_fd_06").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-ethanol_milling").trigger("click");
}); 

// info-ethanol_terminals_fd_06
$("#info-ethanol_terminals_fd_06").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-ethanol_pipelines_terminals").trigger("click");
}); 



