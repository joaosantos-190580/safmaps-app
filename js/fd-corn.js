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
}); 


/*
 *  CORN LAYERS (from GeoServer) and variables
 */

var l_aptidao_milho = 'DBMS:aptidao_milho';
var l_custos_milho = 'DBMS:custos_milho';
var l_produtividade_milho = 'DBMS:produtividade_milho';		

var curva_oferta_milho_png = '', resultado_milho_png = '', comparacao_milho_png = '', result_panel_milho = '';


/*
 *  CORN LAYERS
 */

// Corn suitability (Layer)
$("#toggle-aptidao_milho").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_aptidao_milho;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_aptidao_milho, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);    
        map.addLayer(prov);

        $("#legend-aptidao_milho").css("display", "block");
    } else {
        $("#legend-aptidao_milho").css("display", "none");
    }
});

// Corn yield (Layer)
$("#toggle-produtividade_milho").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_produtividade_milho;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_produtividade_milho, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);    
        map.addLayer(prov);

        $("#legend-produtividade_milho").css("display", "block");
    } else {
        $("#legend-produtividade_milho").css("display", "none");
    }
});

// Cost of sugarcane production (Layer)
$("#toggle-custo_milho").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_custos_milho;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_custos_milho, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);    
        map.addLayer(prov);

        $("#legend-custo_milho").css("display", "block");
    } else {
        $("#legend-custo_milho").css("display", "none");
    }
});


/* 
 * CASE STUDY
 */

// Variaveis
var routeMilho = '', feedstockMilho = '', feedstockMilho_valor = '';
var selecionadoMilho = '', tipoInstalacaoMilho = '', tipoInstalacaoMilho_valor = '', capacidadeMilho = '', capacidadeMilho_valor = '';
var locationMilho = '', productionMilho = '', productionMilho_valor = '';

var cstudy_milho = false;

// Selecao da rota
$("#cornRota").on('change', function(){
    routeMilho = this.value;
});

// Selecao do feedstock
$("#cornFStock").on('change', function(){
    feedstockMilho = this.value;
    feedstockMilho_valor = 'Anhydrous ethanol from sugarcane + corn';
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
        replanCana = L.marker(l_replan).bindPopup("REPLAN at <b>" + l_replan.toString() + "</b>").openPopup();
        map.addLayer(replanCana);

        //var revap_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_revap_buffer_50km, format: 'image/png', transparent: true });
        //map.addLayer(revap_buffer);
        
        // Posiciona o mapa na localização
        map.flyTo(l_replan, 6);

        $("#nomeMunicipioCorn").text("PAULÍNIA/SP");
        $("#nomeMunicipioCorn").css("color", "blue");
    } else {
        map.removeLayer(replanCana);

        $("#nomeMunicipioCorn").text(" ...");
        $("#nomeMunicipioCorn").css("color", "black");
    }
});

$("#locationCorn").on('change', function(){
    console.debug(this.value);

    locationMilho = this.value;

    // INSERIR FUNÇÃO PRA REMOVER MARCADOR

    // Prata (MG)
    if (locationMilho === "1") {
        resetLocations_cstudyCana();

        prataCana = L.marker(l_prata).bindPopup("Prata/MG at <b>" + l_prata.toString() + "</b>").openPopup();
        map.addLayer(prataCana);

        //var brumado_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_brumado_buffer_50km, format: 'image/png', transparent: true });
        //map.addLayer(brumado_buffer);
        
        // Posiciona o mapa na localização
        map.flyTo(l_prata, 6);
    // Caçú (GO)
    } else if (locationMilho === "2") {
        resetLocations_cstudyCana();

        cacuCana = L.marker(l_cacu).bindPopup("Caçú/GO at <b>" + l_cacu.toString() + "</b>").openPopup();
        map.addLayer(cacuCana);

        //var paranaiba_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_paranaiba_buffer_50km, format: 'image/png', transparent: true });
        //map.addLayer(paranaiba_buffer);
        
        // Posiciona o mapa na localização
        map.flyTo(l_cacu, 6);
    // Paranaíba (MS)
    } else if (locationMilho === "3") {
        resetLocations_cstudyCana();

        paranaibaCana = L.marker(l_paranaiba).bindPopup("Paranaíba/MS at <b>" + l_paranaiba.toString() + "</b>").openPopup();
        map.addLayer(paranaibaCana);

        //var paranaiba_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_paranaiba_buffer_50km, format: 'image/png', transparent: true });
        //map.addLayer(paranaiba_buffer);
        
        // Posiciona o mapa na localização
        map.flyTo(l_paranaiba, 6);
    // Presidente Venceslau (SP)
    } else if (locationMilho === "4") {
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
$("button.corn-step1-next").on("click", function() {
    if ((routeMilho === "" || routeMilho === "--") && (feedstockMilho === "" || feedstockMilho === "--")) {
        $.alert({
            boxWidth: '40%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>Conversion technology</b> and the <b>Feedstock</b>.',
            useBootstrap: false
        });
    } else if (routeMilho === "" || routeMilho === "--") {
        $.alert({
            boxWidth: '30%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>Conversion technology</b>.',
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
        $("#corn-step2").css("display", "block");
    }
});

// Botao back (Step #2)
$("button.corn-step2-back").on("click", function() {
    $("#corn-step2").css("display", "none");
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
        result_panel_milho = "<div style='margin-left:10%; overflow-y:auto; height: 100%''>" +
                                "<div><h6 style='font-weight:bold'>Selection summary:</h6>" +
                                        "<div style='font-size: 0.9rem;padding-left:2rem;border-bottom: lightgray;border-bottom-width: 1px;border-bottom-style: solid;width: 86%;'>" +
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
    comparacao_milho_png = 'Case3_Cana_Milho_Comparacao.png';
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





