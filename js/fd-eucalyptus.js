/*
 * All panels, controls and other issues related to: EUCALYPTUS
 *
 * 
 */

// MENU: Panel activation
$("#ft-spk").click(function(e) {
    e.preventDefault();

    reset_actived (e);
    $("#ft-spk-group").addClass("active");
    $("#ft-spk-group").removeClass("inactive");

    $("#panel-support-maps").css("display", "none");
    $("#panel-corsia").css("display", "none");
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
    $("#panel-eucalipto").css("display", "block");
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
    group_1 = ['DBMS:pastagem_eucalipto','DBMS:custos_eucalipto','DBMS:produtividade_eucalipto'];
    group_2 = ['DBMS:main_roads','DBMS:railroads_fd_stock','DBMS:pipelines_fd_stock','DBMS:waterways_fd_stock'];
    group_3 = ['DBMS:airports_fd_stock','DBMS:refineries_refining_fd_stock'];
    
}); 


/*
 *  EUCALYPTUS LAYERS (from GeoServer) and variables
 */

var l_aptidao_eucalipto = 'DBMS:pastagem_eucalipto';
var l_custos_eucalipto = 'DBMS:custos_eucalipto';
var l_produtividade_eucalipto = 'DBMS:produtividade_eucalipto';
                    
var l_espigao = [-22.190487, -51.335236];
var l_espigao_buffer_50km = 'DBMS:espigao_buffer_50km';
var l_custos_espigao = 'DBMS:custos_espigao_50km';

var l_revap = [-23.186327, -45.837129];
var l_revap_buffer_50km = 'DBMS:revap_buffer_50km';
var l_custos_revap = 'DBMS:custos_revap_50km';

var curva_oferta_png = '', resultado_png = '', comparison_png = '';
var tipo_instalacao = '', capacidade = '';

var l_main_roads_src = 'DBMS:main_roads';
var l_railroads_fd_stock_src = 'DBMS:railroads_fd_stock';
var l_pipelines_fd_stock_src = 'DBMS:pipelines_fd_stock';
var l_waterways_fd_stock_src = 'DBMS:waterways_fd_stock';
var l_airports_fd_stock_src = 'DBMS:airports_fd_stock';
var l_refineries_refining_fd_stock_src = 'DBMS:refineries_refining_fd_stock';

function removeLayers_group(group, opacity) {
// O parametro opacity é opcional e é utilizado para mudar a opacidade da camada de fundo com os labels
    var layers = [];
    map.eachLayer(function(layer) {
        if( layer instanceof L.TileLayer )
            layers.push(layer);
    });
    layers.forEach(function(l) {
        if (typeof l.options.layers != "undefined") {
            if (group === "gp_1") {
                if($.inArray(l.options.layers,group_1) != -1) {
                    l.remove();
                }
            } else if (group === "gp_2") {
                if($.inArray(l.options.layers,group_2) != -1) {
                    l.remove();
                }
            } else if (group === "gp_3") {
                if($.inArray(l.options.layers,group_3) != -1) {
                    l.remove();
                }
            }
        } else if (l.options.title === "fundo_labels") {
            if (typeof opacity === "undefined") {
                l.setOpacity(1);
            } else if (opacity) {
                l.setOpacity(0.5);
            }
        }
    });
}

function reorderLayers() {
    var layers = [];
    var layer_gp_1, layer_gp_2;
    var layers_gp_3 = [];
    var gp_1_layers = false;
    var gp_2_layers = false;
    var gp_3_layers = false;

    map.eachLayer(function(layer) {
        if( layer instanceof L.TileLayer )
            layers.push(layer);
    });

    // Check if all group layers are visible
    layers.forEach(function(l) {
        if($.inArray(l.options.layers,group_1) != -1)
            gp_1_layers = true;
        if($.inArray(l.options.layers,group_2) != -1)
            gp_2_layers = true;
        if($.inArray(l.options.layers,group_3) != -1)
            gp_3_layers = true;
    });

    // All layers visible
    if (gp_1_layers && gp_2_layers || gp_1_layers && gp_3_layers || gp_2_layers && gp_3_layers) {
        layers.forEach(function(l) {
            if (typeof l.options.layers != "undefined") {
                // Order of layers
                if($.inArray(l.options.layers,group_1) != -1)
                    layer_gp_1 = l;
                if($.inArray(l.options.layers,group_2) != -1)
                    layer_gp_2 = l;
                if($.inArray(l.options.layers,group_3) != -1)
                    layers_gp_3.push(l);
                
                // Remove Layer
                l.remove();
            }
        });
        
        // Add layer group 1
        if (typeof layer_gp_1 != "undefined") {
            map.addLayer(layer_gp_1);
        }
        
        // Add layer group 2
        if (typeof layer_gp_2 != "undefined") {
            map.addLayer(layer_gp_2);
        }

        // Add layers group 3
        if (layers_gp_3.length > 0) {
            layers_gp_3.forEach(function(l) {
                map.addLayer(l);
            });
        }
    }
}
    

/*
 *  EUCALYPTUS LAYERS
 */

// BASE MAPS
// Eucalyptus suitability (Layer)
$("#toggle-aptidao_eucalipto").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-produtividade_eucalipto').prop('checked', false);
    $('#toggle-custo_eucalipto').prop('checked', false);
    //reset_all_legends();
    removeLayers_group("gp_1");

    options['layers'] = l_aptidao_eucalipto;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_aptidao_eucalipto, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        $("#legend-produtividade_eucalipto").css("display", "none");
        $("#legend-custo_eucalipto").css("display", "none");
        $("#legend-aptidao_eucalipto").css("display", "block");
        reorderLayers();
    } else {
        $("#legend-aptidao_eucalipto").css("display", "none");
        removeLayer(l_aptidao_eucalipto);
    }
});

// Wood yield (Layer)
$("#toggle-produtividade_eucalipto").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-aptidao_eucalipto').prop('checked', false);
    $('#toggle-custo_eucalipto').prop('checked', false);
    //reset_all_legends();
    removeLayers_group("gp_1");

    options['layers'] = l_produtividade_eucalipto;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_produtividade_eucalipto, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        $("#legend-custo_eucalipto").css("display", "none");
        $("#legend-aptidao_eucalipto").css("display", "none");
        $("#legend-produtividade_eucalipto").css("display", "block");
        reorderLayers();
    } else {
        $("#legend-produtividade_eucalipto").css("display", "none");
        removeLayer(l_produtividade_eucalipto);
    }
});

// Cost of harvested wood (Layer)
$("#toggle-custo_eucalipto").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-aptidao_eucalipto').prop('checked', false);
    $('#toggle-produtividade_eucalipto').prop('checked', false);
    //reset_all_legends();
    removeLayers_group("gp_1");

    options['layers'] = l_custos_eucalipto;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_custos_eucalipto, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        $("#legend-produtividade_eucalipto").css("display", "none");
        $("#legend-aptidao_eucalipto").css("display", "none");
        $("#legend-custo_eucalipto").css("display", "block");
        reorderLayers();
    } else {
        $("#legend-custo_eucalipto").css("display", "none");
        removeLayer(l_custos_eucalipto);
    }
});

// INFRASTRUCTURE
// toggle-roads (Layer)
$("#toggle-roads_fd_01").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-railroads_fd_01').prop('checked', false);
    $('#toggle-pipelines_fd_01').prop('checked', false);
    $('#toggle-waterways_fd_01').prop('checked', false);
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
$("#toggle-railroads_fd_01").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-roads_fd_01').prop('checked', false);
    $('#toggle-pipelines_fd_01').prop('checked', false);
    $('#toggle-waterways_fd_01').prop('checked', false);
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
$("#toggle-pipelines_fd_01").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-roads_fd_01').prop('checked', false);
    $('#toggle-railroads_fd_01').prop('checked', false);
    $('#toggle-waterways_fd_01').prop('checked', false);
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
$("#toggle-waterways_fd_01").on('change', function(){
    //$('input:checkbox').not(this).prop('checked', false);
    $('#toggle-roads_fd_01').prop('checked', false);
    $('#toggle-railroads_fd_01').prop('checked', false);
    $('#toggle-pipelines_fd_01').prop('checked', false);
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
$("#toggle-airports_fd_01").on('change', function(){
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
$("#toggle-refineries_refining_fd_01").on('change', function(){
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
var route = '', feedstock = '';
var revap = '', espigao = '';
var capacidadeEucalipto_valor = '';
var cstudy_eucalipto = false;

// Selecao da rota
$("#rota").on('change', function(){
    route = this.value;
});

// Selecao do feedstock
$("#fstock").on('change', function(){
    feedstock = this.value;
});

// Seleção mapa de apoio	
$("#eucaliptoMaps").on('change', function(){
    console.debug(this.value);

    selecionado = this.value;

    // Case Study Eucalipto
    cstudy_eucalipto = true;
    if (cstudy_soja) {
        setFalse_cstudySoja();
    }

    // Eucalyptus suitability
    if (selecionado === "1") {
        $('input:checkbox').not(this).prop('checked', false);
        reset_all_legends();
        removeLayers();

        options['layers'] = l_aptidao_eucalipto;
        //var aptidao_eucalipto = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_aptidao_eucalipto, format: 'image/png', transparent: true });
        var aptidao_eucalipto = L.tileLayer.wms(url, options);
        map.addLayer(aptidao_eucalipto);

        $("#legend-aptidao_eucalipto").css("display", "block");
    // Costs of harvested wood
    } else if (selecionado === "3") {
        $('input:checkbox').not(this).prop('checked', false);
        reset_all_legends();
        removeLayers();

        options['layers'] = l_custos_eucalipto;
        //var custo_eucalipto = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_custos_eucalipto, format: 'image/png', transparent: true });
        var custo_eucalipto = L.tileLayer.wms(url, options);
        map.addLayer(custo_eucalipto);

        $("#legend-custo_eucalipto").css("display", "block");
    // Wood yield
    } else if (selecionado === "2") {
        $('input:checkbox').not(this).prop('checked', false);
        reset_all_legends();
        removeLayers();

        options['layers'] = l_produtividade_eucalipto;
        //var produtividade_eucalipto = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_produtividade_eucalipto, format: 'image/png', transparent: true });
        var produtividade_eucalipto = L.tileLayer.wms(url, options);
        map.addLayer(produtividade_eucalipto);

        $("#legend-produtividade_eucalipto").css("display", "block");
    // Continue without maps
    } else if (selecionado === "0") {
        $('input:checkbox').not(this).prop('checked', false);
        reset_all_legends();
        removeLayers();
    }
});

// Seleção do tipo de unidade industrial
$("#tipoInstalacao").on('change', function(){
    console.debug(this.value);

    tipo_instalacao = this.value;

    if (tipo_instalacao === "Greenfield") {
        // REMOCAO DE OUTROS PONTOS DO MAPA
        var layers = [];
        map.eachLayer(function(layer) {
            if( layer instanceof L.TileLayer )
                layers.push(layer);
        });
        layers.forEach(function(l) {
            if (l.options.layers === l_revap_buffer_50km || l.options.layers === l_custos_revap) {
                l.remove();
            }
        });
        
        // REMOVE MARCADOR
        if (revap != undefined && revap != '') {
            map.removeLayer(revap);
        };

        espigao = L.marker(l_espigao, { icon : redMarker }).bindPopup("Greenfield (Regente Feijó/SP) at <b>" + l_espigao.toString() + "</b>").openPopup();
        map.addLayer(espigao);

        options['layers'] = l_espigao_buffer_50km;
        //var espigao_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_espigao_buffer_50km, format: 'image/png', transparent: true });
        var espigao_buffer = L.tileLayer.wms(url, options);
        map.addLayer(espigao_buffer);

        // Posiciona o mapa na localização
        map.flyTo(l_espigao, 9);

        $("#nomeMunicipio").text("REGENTE FEIJÓ/SP");
        //$("#nomeMunicipio").css("color", "blue");
        $("#nomeMunicipio").css("font-weight", "bold");
    } else if (tipo_instalacao === "Co-locating") {
        // REMOCAO DE OUTROS PONTOS DO MAPA
        var layers = [];
        map.eachLayer(function(layer) {
            if( layer instanceof L.TileLayer )
                layers.push(layer);
        });
        layers.forEach(function(l) {
            if (l.options.layers === l_espigao_buffer_50km || l.options.layers === l_custos_espigao) {
                l.remove();
            }
        });

        // REMOVE MARCADOR
        if (espigao != undefined && espigao != '') {
            map.removeLayer(espigao);
        };
        
        var popup = L.popup({maxWidth: '100%'});

        var html = $('<div id="html" style="width: 30rem; height: 100%; padding-top: 2rem; padding-bottom: 0.5rem">' +
                '<a href="https://petrobras.com.br/pt/nossas-atividades/principais-operacoes/refinarias/refinaria-henrique-lage-revap.htm" target="_blank" style="cursor:pointer;">' +
                '<img width="100%" src="./images/REVAP.png" /></a>' +
                '<h6 style="margin-top: 0.3rem"><b>REVAP</b> (São José dos Campos/SP) at <b>(' + l_revap.toString() + ')</b></h6></div>')[0];

        popup.setContent(html);

        //revap = L.marker(l_revap, { icon : redMarker }).bindPopup("REVAP (Sào José dos Campos/SP) at <b>" + l_revap.toString() + "</b>").openPopup();
        revap = L.marker(l_revap, { icon : redMarker }).bindPopup(popup);
        map.addLayer(revap);

        options['layers'] = l_revap_buffer_50km;
        //var revap_buffer = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_revap_buffer_50km, format: 'image/png', transparent: true });
        var revap_buffer = L.tileLayer.wms(url, options);
        map.addLayer(revap_buffer);
        
        // Posiciona o mapa na localização
        map.flyTo(l_revap, 9);

        $("#nomeMunicipio").text("SÃO JOSÉ DOS CAMPOS/SP");
        //$("#nomeMunicipio").css("color", "blue");
        $("#nomeMunicipio").css("font-weight", "bold");
    } else {
        $("#nomeMunicipio").text(" ...");
        $("#nomeMunicipio").css("color", "black");
    }

    // Seleção de um ponto no mapa
    var marker = {};

});

$("#capacidade").on('change', function(){
    console.debug(this.value);

    capacidade = this.value;
    capacidadeEucalipto_valor = this.options[this.selectedIndex].text;

    if (capacidade != '' && capacidade != '--') {
        //Output
        var output_value = parseFloat(capacidade.replace(",", ".")) / 0.16 / 0.17;

        $("#inputReq").text(Math.round(output_value) + " t.day-1 (biomass, dry basis)");
        $("#inputReq").css("color", "blue");

        //Co-products
        var diesel_value = (parseFloat(capacidade.replace(",", ".")) * 0.62) / 0.16;
        var naphtha_value = (parseFloat(capacidade.replace(",", ".")) * 0.22) / 0.16;
        var electricity_value = parseFloat(capacidade.replace(",", ".")) / 0.16 / 0.17 * 18.07 * 0.015;

        $("#diesel").text("Diesel: " + parseInt(diesel_value) + "  t.day-1");
        $("#diesel").css("color", "blue");

        $("#naphtha").text("Naphtha: " + parseInt(naphtha_value) + "  t.day-1");
        $("#naphtha").css("color", "blue");

        $("#electricity").text("Electricity: " + parseInt(electricity_value) + "  MWh.day-1");
        $("#electricity").css("color", "blue");

        //tipo_instalacao = $("input[name='tipoInstalacao']").val();
        
        // REVAP
        if (capacidade === '1' && tipo_instalacao === "Co-locating") {
            curva_oferta_png = 'curva_oferta_revap_20.png';
            resultado_png = 'results_revap_20.png';
        } else if (capacidade === '2' && tipo_instalacao === "Co-locating") {
            curva_oferta_png = 'curva_oferta_revap_51.png';
            resultado_png = 'results_revap_51.png';
        } else if (capacidade === '3' && tipo_instalacao === "Co-locating") {
            curva_oferta_png = 'curva_oferta_revap_75.png';
            resultado_png = 'results_revap_75.png';
        } else if (capacidade === '4' && tipo_instalacao === "Co-locating") {
            curva_oferta_png = 'curva_oferta_revap_150.png';
            resultado_png = 'results_revap_150.png';
        }

        if (tipo_instalacao === "Co-locating") {
            comparison_png = 'comparison_colocating_revap.png';
        }


        // ESPIGAO
        if (capacidade === '1' && tipo_instalacao === "Greenfield") {
            curva_oferta_png = 'curva_oferta_espigao_20.png';
            resultado_png = 'results_espigao_20.png';
        } else if (capacidade === '2' && tipo_instalacao === "Greenfield") {
            curva_oferta_png = 'curva_oferta_espigao_51.png';
            resultado_png = 'results_espigao_51.png';
        } else if (capacidade === '3' && tipo_instalacao === "Greenfield") {
            curva_oferta_png = 'curva_oferta_espigao_75.png';
            resultado_png = 'results_espigao_75.png';
        } else if (capacidade === '4' && tipo_instalacao === "Greenfield") {
            curva_oferta_png = 'curva_oferta_espigao_150.png';
            resultado_png = 'results_espigao_150.png';
        }

        if (tipo_instalacao === "Greenfield") {
            comparison_png = 'comparison_greenfield_espigao.png';
        }

    } else {
        //Output
        $("#inputReq").text("... t.day<sup>-1</sup> (biomass, dry basis)");
        $("#inputReq").css("color", "black");

        //Co-products
        $("#diesel").text("Diesel");
        $("#diesel").css("color", "black");

        $("#naphtha").text("Naphtha");
        $("#naphtha").css("color", "black");

        $("#electricity").text("Electricity");
        $("#electricity").css("color", "black");
    }

});

// Botao next (Step #1)
$("button.step1-next").on("click", function() {
    if ((route === "" || route === "--") && (feedstock === "" || feedstock === "--")) {
        $.alert({
            boxWidth: '40%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>Conversion technology</b> and the <b>Feedstock</b>.',
            useBootstrap: false
        });
    } else if (route === "" || route === "--") {
        $.alert({
            boxWidth: '30%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>Conversion technology</b>.',
            useBootstrap: false
        });
    } else if (feedstock === "" || feedstock === "--") {
        $.alert({
            boxWidth: '30%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>Feedstock</b>.',
            useBootstrap: false
        });
    } else {
        $("#step1").css("display", "none");
        $("#step2").css("display", "block");
    }
});

// Botao back (Step #2)
$("button.step2-back").on("click", function() {
    $("#step2").css("display", "none");
    $("#step1").css("display", "block");
});

// Botao calculate (Step #2)
$("button.step2-calc").on("click", function() {
    if ((tipo_instalacao === "" || tipo_instalacao === "--") 
            && (capacidade === "" || capacidade === "--")) {
        $.alert({
            boxWidth: '40%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>Integration Strategy</b> and the <b>Output capacity</b>.',
            useBootstrap: false
        });
    } else if (tipo_instalacao === "" || tipo_instalacao === "--") {
        $.alert({
            boxWidth: '30%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>Integration Strategy</b>.',
            useBootstrap: false
        });
    } else if (capacidade === "" || capacidade === "--") {
        $.alert({
            boxWidth: '30%',
            title: '<i class="fas fa-exclamation-triangle" style="color:red"></i>',
            content: 'Please select the <b>Output capacity</b>.',
            useBootstrap: false
        });
    } else {
        // REMOCAO DE LAYERS DO MAPA
        var layers = [];
        map.eachLayer(function(layer) {
            if( layer instanceof L.TileLayer )
                layers.push(layer);
        });
        layers.forEach(function(l) {
            if (l.options.layers === l_aptidao_eucalipto 
                || l.options.layers === l_custos_eucalipto
                || l.options.layers === l_produtividade_eucalipto) {
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
        if (tipo_instalacao === "Greenfield") {
            options['layers'] = l_custos_espigao;
            //var custos_espigao = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_custos_espigao, format: 'image/png', transparent: true });
            var custos_espigao = L.tileLayer.wms(url, options);
            map.addLayer(custos_espigao);
        
        // REVAP
        } else if (tipo_instalacao === "Co-locating") {
            options['layers'] = l_custos_revap;
            //var custos_revap = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_custos_revap, format: 'image/png', transparent: true });
            var custos_revap = L.tileLayer.wms(url, options);
            map.addLayer(custos_revap);
        }

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
            content:	"<div style='margin-left:10%; overflow-y:auto; height: 100%''>" +
                            "<div><img src='images/logo_safmaps_degrade.png' width='13%' style='float: right; margin-right: 7.3rem'>" +
                                "<h6 style='font-weight:bold; color: blue'>Selection summary:</h6>" +
                                "<div class='div-feedstock-results'>" +
                                    "<b>Conversion tecnology:</b> " + route + 
                                    "<br/><b>Feedstock:</b> " + feedstock +
                                    "<br/><b>Integration strategy:</b> " + tipo_instalacao +
                                    "<br/><b>Output capacity (t.day<sup>-1</sup>):</b> " + capacidadeEucalipto_valor +
                                    "<br/><br/>" +
                                "</div>" +
                            "</div><br/><br/>" +
                            "<div><h6 style='font-weight:bold'>Wood supply curve</h6>" +
                                "<img src='images/cstudies_eucalipto/" + curva_oferta_png + "' width='80%'></div>" +
                            "<div style='margin-top:4rem; '>" +
                                "<div><h6 style='font-weight:bold; margin-left:5px'>Data table</h6>" +
                                "<img src='images/cstudies_eucalipto/" + resultado_png + "' width='80%' ></div>" +
                            "<div style='margin-top:4rem; '>" +
                                "<div><h6 style='font-weight:bold; margin-left:5px'>Comparison table</h6>" +
                                "<img src='images/cstudies_eucalipto/" + comparison_png + "' width='80%'></div>" +
                            "<br/><br/>" +
                        "</div>",
            callback:    function () {
                this.content.css("padding", "15px");
                
            }
        });
    }
});

// Reset controls
function setFalse_cstudyEucalipto() {
    // Aba Step #1 - Apenas os mapas são desabilitados
    $("#eucaliptoMaps").val('0');		//Continue without maps
    reset_all_legends();
    removeLayers();

    // Aba Step #2 - A Localidade é desabilitada
    $("#tipoInstalacao").val('--');
    $("#nomeMunicipio").text(" ...");
    $("#nomeMunicipio").css("color", "black");

    // REMOVE MARCADORES
    if (espigao != undefined && espigao != '') {
        map.removeLayer(espigao);
        espigao = '';
    } else if (revap != undefined && revap != '') {
        map.removeLayer(revap);
        revap = '';
    }

    cstudy_eucalipto = false;
}


/*
 * JANELAS INFO - MAPAS
 */

// Eucalipto - INFO
// Aptidão
$("#info-aptidao_eucalipto").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 500, height: 300},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'>Eucalyptus suitability</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Estimated based on climatic and geographic parameters, soil suitability for agriculture and slope." +
                                " A site classified as “low suitability” for the production of eucalyptus does not mean that a commercial activity would be impossible there.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> SAFmaps (2021)" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://dx.doi.org/10.17632/ghvrstw7pw.2'>Download page</a></p>" +
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
$("#info-produtividade_eucalipto").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 500, height: 300},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'>Expected wood yield</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Data estimated based on a statistic model developed using data of modelling eucalyptus growth, soil suitability and dummy variables that set differences among three levels of yields. The values reflect yield values of wood after harvesting (i.e., wood with high humidity).</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> SAFmaps (2021)" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://dx.doi.org/10.17632/ghvrstw7pw.2'>Download page</a></p>" +
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
$("#info-custo_eucalipto").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 520, height: 310},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'>Expected cost of harvested wood</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Estimated wood costs at the forest, after cutting trees, in R$(2018), considering that the expansion of eucalyptus would occur displacing pasturelands. The costs include the costs of the forest (i.e. preparing the field, planting and keeping the forest), the cost related to the opportunity cost of land (in pasturelands), and the cost of harvesting.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> SAFmaps (2021)" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://dx.doi.org/10.17632/ghvrstw7pw.2'>Download page</a></p>" +
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
$("#info-roads_fd_01").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-roads").trigger("click");
}); 

// info-railroads_fd_01
$("#info-railroads_fd_01").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-railroads").trigger("click");
}); 

// info-pipelines_fd_01
$("#info-pipelines_fd_01").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-pipelines").trigger("click");
}); 

// info-waterways_fd_01
$("#info-waterways_fd_01").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-waterways").trigger("click");
}); 

// info-airports_fd_01
$("#info-airports_fd_01").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-airports").trigger("click");
}); 

// info-refineries_refining_fd_01
$("#info-refineries_refining_fd_01").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#info-refineries_capacity").trigger("click");
}); 



