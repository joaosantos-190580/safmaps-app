/*
 * All panels, controls and other issues related to: SUPPORT MAPS
 *
 * 
 */

// MENU: Panel activation
$("#support-maps").click(function(e) {
    e.preventDefault();

    reset_actived (e);
    $("#panel-corsia").css("display", "none");
    $("#panel-eucalipto").css("display", "none");
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
    $("#panel-support-maps").css("display", "block");
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
    
    // Get the element with id="defaultOpen" and click on it
    document.getElementById("defaultOpenSM").click();
    
}); 


/*
 *  SUPPORT MAPS LAYERS (from GeoServer)
 */

// Biophysical maps
l_biomas_src = 'DBMS:biomas';
l_solos_src = 'DBMS:solos_brasil';
l_declividade_src = 'DBMS:SRTM_declividade_color';
l_altitude_src = 'DBMS:altitude';
l_precipitacao_src = 'DBMS:precipitacao';
l_temperatura_med_src = 'DBMS:temperatura_med';
l_temperatura_min_src = 'DBMS:temperatura_min';
l_temperatura_max_src = 'DBMS:temperatura_max';
l_def_hidrico_src = 'DBMS:deficit_hidrico';
l_indice_idp_src = 'DBMS:indice_idp';
l_frost_risk_src = 'DBMS:risco_geada';
l_rios_ana_2013_src = 'DBMS:rios_ana_2013';
l_hidrografia_src = 'DBMS:hidrografia';

// Diagnostics
l_aptidao_solo_src = 'DBMS:aptidao_solo';
l_declividade_eucalipto_src = 'DBMS:declividade_eucalipto';
l_declividade_other_crops_src = 'DBMS:declividade_other_crops';
l_pastagem_degradada_src = 'DBMS:pastagem_degradada';
l_uso_cobertura_src = 'DBMS:mapbiomas_2018';
l_price_natural_past_src = 'DBMS:price_natural_pasture';
l_price_planted_past_src = 'DBMS:price_planted_pasture';

// Sensitive Areas
l_protected_areas_src = 'DBMS:protected_areas';
l_restrictive_biomes_src = 'DBMS:restricted_biomes';
l_corsia_restriction_src = 'DBMS:corsia_restriction';

// Infrastructure
l_roads_src = 'DBMS:roads';
l_railroads_src = 'DBMS:railroads';
l_pipelines_src = 'DBMS:pipelines';
l_ethanol_pipelines_src = 'DBMS:ethanol_pipelines';
l_ethanol_pipelines_terminals_src = 'DBMS:ethanol_pipelines_terminals';
l_waterways_src = 'DBMS:waterways';
l_airports_src = 'DBMS:airports';
// Production Units - SAFmaps
l_refineries_qav_src = 'DBMS:refineries_qav';
l_refineries_refining_src = 'DBMS:refineries_refining';
l_refineries_capacity_src = 'DBMS:refineries_capacity';
l_ethanol_feedstock_src = 'DBMS:ethanol_feedstock';
l_ethanol_milling_src = 'DBMS:ethanol_milling';
l_ethanol_anhydrous_src = 'DBMS:ethanol_anhydrous';
l_ethanol_hydrated_src = 'DBMS:ethanol_hydrated';
l_ethanol_output_src = 'DBMS:ethanol_output';
l_ethanol_anhydrous_output_src = 'DBMS:ethanol_anhydrous_output';
l_ethanol_hydrated_output_src = 'DBMS:ethanol_hydrated_output';
l_oilseed_plants_src = 'DBMS:oilseed_plants';

// Warning
l_land_rights_src = 'DBMS:land_rights';
l_water_rights_src = 'DBMS:water_rights';
l_rural_settlements_src = 'DBMS:rural_settlements';

// Political
l_estados_src =  'DBMS:estados_relevantes';
l_municipios_src = 'DBMS:municipios_relevantes_shp';


/*
 *  BIOPHYSICAL
 */

// Biomes (Layer)
$("#toggle-biomas").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_biomas_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_biomas_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-biomas").css("display", "block");
    } else {
        //$("#legend-biomas").css("display", "none");
        reset_all_legends();
    }
});

// Solo (Layer)
$("#toggle-solo").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_solos_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_solos_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-solo").css("display", "block");
    } else {
        //$("#legend-solo").css("display", "none");
        reset_all_legends();
    }
});

// Slope (Layer)
$("#toggle-declividade").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_declividade_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_declividade_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-declividade").css("display", "block");
    } else {
        //$("#legend-declividade").css("display", "none");
        reset_all_legends();
    }
});

// Altitude (Layer)
$("#toggle-altitude").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_altitude_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_altitude_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-altitude").css("display", "block");
    } else {
        //$("#legend-altitude").css("display", "none");
        reset_all_legends();
    }
});

// Rainfall (Layer)
$("#toggle-rainfall").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_precipitacao_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_precipitacao_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options); 
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-rainfall").css("display", "block");
    } else {
        //$("#legend-rainfall").css("display", "none");
        reset_all_legends();
    }
});

// Average temperature (Layer)
$("#toggle-an_temperature").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_temperatura_med_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_temperatura_med_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options); 
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-an_temperature").css("display", "block");
    } else {
        //$("#legend-an_temperature").css("display", "none");
        reset_all_legends();
    }
});

// Min temperature (Layer)
$("#toggle-min_temperature").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_temperatura_min_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_temperatura_min_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options); 
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-min_temperature").css("display", "block");
    } else {
        //$("#legend-min_temperature").css("display", "none");
        reset_all_legends();
    }
});

// Max temperature (Layer)
$("#toggle-max_temperature").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_temperatura_max_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_temperatura_max_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options); 
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-max_temperature").css("display", "block");
    } else {
        //$("#legend-max_temperature").css("display", "none");
        reset_all_legends();
    }
});

// Hydric deficit (Layer)
$("#toggle-hydric_deficit").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_def_hidrico_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_def_hidrico_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options); 
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-hydric_deficit").css("display", "block");
    } else {
        //$("#legend-hydric_deficit").css("display", "none");
        reset_all_legends();
    }
});

// IDP (Layer)
$("#toggle-idp").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_indice_idp_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_indice_idp_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options); 
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-idp").css("display", "block");
    } else {
        //$("#legend-idp").css("display", "none");
        reset_all_legends();
    }
});

// Frost risk (Layer)
$("#toggle-frost_risk").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_frost_risk_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_frost_risk_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options); 
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-frost_risk").css("display", "block");
    } else {
        //$("#legend-frost_risk").css("display", "none");
        reset_all_legends();
    }
});

// Main Rivers (Layer)
$("#toggle-main_rivers").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_rios_ana_2013_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_rios_ana_2013_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);  
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-main_rivers").css("display", "block");
    } else {
        //$("#legend-main_rivers").css("display", "none");
        reset_all_legends();
    }
});

// Hidrografia (Layer)
$("#toggle-hidrografia").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_hidrografia_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_hidrografia_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options); 
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-hidrografia").css("display", "block");
    } else {
        //$("#legend-hidrografia").css("display", "none");
        reset_all_legends();
    }
});


/*
 *  DIAGNOSTICS
 */

// Soil Suitability (Layer)
$("#toggle-soil_suitability").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_aptidao_solo_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_aptidao_solo_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);  
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-soil_suitability").css("display", "block");
    } else {
        //$("#legend-soil_suitability").css("display", "none");
        reset_all_legends();
    }
});

// Slope Eucalyptus (Layer)
$("#toggle-slope_eucalyptus").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_declividade_eucalipto_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_declividade_eucalipto_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);  
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-slope_eucalyptus").css("display", "block");
    } else {
        //$("#legend-slope_eucalyptus").css("display", "none");
        reset_all_legends();
    }
});

// Slope Others (Layer)
$("#toggle-slope_others").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_declividade_other_crops_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_declividade_other_crops_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);  
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-slope_others").css("display", "block");
    } else {
        //$("#legend-slope_others").css("display", "none");
        reset_all_legends();
    }
});

// Level Degradation Pasturelands (Layer)
$("#toggle-level_degrad").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_pastagem_degradada_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_pastagem_degradada_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);  
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-level_degrad").css("display", "block");
    } else {
        //$("#legend-level_degrad").css("display", "none");
        reset_all_legends();
    }
});

// Land use (Layer)
$("#toggle-uso_cobertura").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_uso_cobertura_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_uso_cobertura_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);  
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-uso_cobertura").css("display", "block");
    } else {
        //$("#legend-uso_cobertura").css("display", "none");
        reset_all_legends();
    }
});

// Price Natural Pasture (Layer)
$("#toggle-price_natural_past").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_price_natural_past_src;
    
    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_price_natural_past_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);  
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-price_natural_past").css("display", "block");
    } else {
        //$("#legend-price_natural_past").css("display", "none");
        reset_all_legends();
    }
});

// Price Planted Pasture (Layer)
$("#toggle-price_planted_past").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_price_planted_past_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_price_planted_past_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);  
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-price_planted_past").css("display", "block");
    } else {
        //$("#legend-price_planted_past").css("display", "none");
        reset_all_legends();
    }
});


/*
 *  SENSITIVE AREAS
 */

// Protected Areas (Layer)
$("#toggle-protected_areas").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_protected_areas_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_protected_areas_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);  
        map.addLayer(prov);

        // Mapa dos limites estaduais
        options['layers'] = l_estados_src;
        var prov = L.tileLayer.wms(url, options);  
        map.addLayer(prov);			  

        remove_empty_legend();
        $("#legend-protected_areas").css("display", "block");
        $("#legend-estados").css("display", "block");
    } else {
        //$("#legend-protected_areas").css("display", "none");
        //$("#legend-estados").css("display", "none");
        reset_all_legends();
    }
});

// Restricted Biomes (Layer)
$("#toggle-restrictive_biomes").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_restrictive_biomes_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_restrictive_biomes_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);  
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-restrictive_biomes").css("display", "block");
    } else {
        //$("#legend-restrictive_biomes").css("display", "none");
        reset_all_legends();
    }
});

// Corsia Restrictions (Layer)
$("#toggle-carbon_stock").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_corsia_restriction_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_corsia_restriction_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);  
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-carbon_stock").css("display", "block");
    } else {
        //$("#legend-carbon_stock").css("display", "none");
        reset_all_legends();
    }
});


/*
 *  INFRASTRUCTURE
 */

// toggle-roads (Layer)
$("#toggle-roads").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_roads_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_roads_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);  
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-roads").css("display", "block");
    } else {
        //$("#legend-roads").css("display", "none");
        reset_all_legends();
    }
});

// toggle-railroads (Layer)
$("#toggle-railroads").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_railroads_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_railroads_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);  
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-railroads").css("display", "block");
    } else {
        //$("#legend-railroads").css("display", "none");
        reset_all_legends();
    }
});

// toggle-pipelines (Layer)
$("#toggle-pipelines").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_pipelines_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_pipelines_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);  
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-pipelines").css("display", "block");
    } else {
        //$("#legend-pipelines").css("display", "none");
        reset_all_legends();
    }
});

// toggle-ethanol_pipelines (Layer)
$("#toggle-ethanol_pipelines").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_ethanol_pipelines_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_ethanol_pipelines_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-ethanol_pipelines").css("display", "block");
    } else {
        //$("#legend-ethanol_pipelines").css("display", "none");
        reset_all_legends();
    }
});

// toggle-ethanol_pipelines_terminals (Layer)
$("#toggle-ethanol_pipelines_terminals").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_ethanol_pipelines_terminals_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_ethanol_pipelines_terminals_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-ethanol_pipelines_terminals").css("display", "block");
    } else {
        //$("#legend-ethanol_pipelines_terminals").css("display", "none");
        reset_all_legends();
    }
});

// toggle-waterways (Layer)
$("#toggle-waterways").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    //removeLayers();
    removeLayers(true);

    options['layers'] = l_waterways_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_waterways_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-waterways").css("display", "block");
    } else {
        //$("#legend-waterways").css("display", "none");
        reset_all_legends();
    }
});

// toggle-airports (Layer)
$("#toggle-airports").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_airports_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_airports_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-airports").css("display", "block");
    } else {
        //$("#legend-airports").css("display", "none");
        reset_all_legends();
    }
});

// Production Units - SAFmaps
// toggle-refineries_qav (Layer)
$("#toggle-refineries_qav").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_refineries_qav_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_refineries_qav_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-refineries_qav").css("display", "block");
    } else {
        //$("#legend-refineries_qav").css("display", "none");
        reset_all_legends();
    }
});

// toggle-refineries_refining (Layer)
$("#toggle-refineries_refining").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_refineries_refining_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_refineries_refining_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-refineries_refining").css("display", "block");
    } else {
        //$("#legend-refineries_refining").css("display", "none");
        reset_all_legends();
    }
});

// toggle-refineries_capacity (Layer)
$("#toggle-refineries_capacity").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_refineries_capacity_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_refineries_capacity_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-refineries_capacity").css("display", "block");
    } else {
        //$("#legend-refineries_capacity").css("display", "none");
        reset_all_legends();
    }
});

// toggle-ethanol_feedstock (Layer)
$("#toggle-ethanol_feedstock").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_ethanol_feedstock_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_ethanol_feedstock_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-ethanol_feedstock").css("display", "block");
    } else {
        //$("#legend-ethanol_feedstock").css("display", "none");
        reset_all_legends();
    }
});

// toggle-ethanol_milling (Layer)
$("#toggle-ethanol_milling").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_ethanol_milling_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_ethanol_milling_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-ethanol_milling").css("display", "block");
    } else {
        //$("#legend-ethanol_milling").css("display", "none");
        reset_all_legends();
    }
});

// toggle-ethanol_anhydrous (Layer)
$("#toggle-ethanol_anhydrous").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_ethanol_anhydrous_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_ethanol_anhydrous_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-ethanol_anhydrous").css("display", "block");
    } else {
        //$("#legend-ethanol_anhydrous").css("display", "none");
        reset_all_legends();
    }
});

// toggle-ethanol_hydrated (Layer)
$("#toggle-ethanol_hydrated").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_ethanol_hydrated_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_ethanol_hydrated_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-ethanol_hydrated").css("display", "block");
    } else {
        //$("#legend-ethanol_hydrated").css("display", "none");
        reset_all_legends();
    }
});

// toggle-ethanol_output (Layer)
$("#toggle-ethanol_output").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_ethanol_output_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_ethanol_output_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-ethanol_output").css("display", "block");
    } else {
        //$("#legend-ethanol_output").css("display", "none");
        reset_all_legends();
    }
});

// toggle-ethanol_anhydrous_output (Layer)
$("#toggle-ethanol_anhydrous_output").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_ethanol_anhydrous_output_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_ethanol_anhydrous_output_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-ethanol_anhydrous_output").css("display", "block");
    } else {
        //$("#legend-ethanol_anhydrous_output").css("display", "none");
        reset_all_legends();
    }
});

// toggle-ethanol_hydrated_output (Layer)
$("#toggle-ethanol_hydrated_output").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_ethanol_hydrated_output_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_ethanol_hydrated_output_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-ethanol_hydrated_output").css("display", "block");
    } else {
        //$("#legend-ethanol_hydrated_output").css("display", "none");
        reset_all_legends();
    }
});

// toggle-oilseed_plants (Layer)
$("#toggle-oilseed_plants").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_oilseed_plants_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_oilseed_plants_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);                
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-oilseed_plants").css("display", "block");
    } else {
        //$("#legend-oilseed_plants").css("display", "none");
        reset_all_legends();
    }
});


/*
 *  WARNING AREAS
 */

// toggle-land_rights (Layer)
$("#toggle-land_rights").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_land_rights_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_land_rights_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-land_rights").css("display", "block");
    } else {
        //$("#legend-land_rights").css("display", "none");
        reset_all_legends();
    }
});

// toggle-water_rights (Layer)
$("#toggle-water_rights").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_water_rights_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_water_rights_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-water_rights").css("display", "block");
    } else {
        //$("#legend-water_rights").css("display", "none");
        reset_all_legends();
    }
});

// toggle-rural_settlements (Layer)
$("#toggle-rural_settlements").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_rural_settlements_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_rural_settlements_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-rural_settlements").css("display", "block");
    } else {
        //$("#legend-rural_settlements").css("display", "none");
        reset_all_legends();
    }
});


/*
 *  POLITICAL
 */

// States (Layer)
$("#toggle-estados").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_estados_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_estados_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-estados").css("display", "block");
    } else {
        //$("#legend-estados").css("display", "none");
        reset_all_legends();
    }
});

// Municipalities (Layer)
$("#toggle-municipios").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_municipios_src;

    if($(this).prop("checked") == true) {
        //var prov = L.tileLayer.wms('http://35.198.22.135/geoserver/ows?', { layers: l_municipios_src, format: 'image/png', transparent: true });
        var prov = L.tileLayer.wms(url, options);   
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-municipios").css("display", "block");
    } else {
        //$("#legend-municipios").css("display", "none");
        reset_all_legends();
    }
});


/*
 * JANELAS INFO - MAPAS
 */

// SUPPORT MAPS
// Biophysical Maps
// Biomas - INFO
$("#info-biomas").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 500, height: 250},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'>Biomes</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Brazilian biomes, at scale 1: 250.000.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> IBGE (2019)" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='https://geoservicos.ibge.gov.br/geoserver/web/wicket/bookmarkable/org.geoserver.web.demo.MapPreviewPage?2'>Download page</a></p>" +
                                "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Brazil" +
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

// Solos - INFO
$("#info-solo").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 500, height: 250},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'>Soil</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> First level (first order) of Brazilian soil classification developed on a carthografic base at scale 1:250.000.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> IBGE (2019)" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='https://bdiaweb.ibge.gov.br/#/consulta/pedologia'>Download page</a></p>" +
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

// Declividade - INFO
$("#info-declividade").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 520, height: 270},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'>Slope</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Slope obtained from the \“Shuttle Radar Topography Mission (SRTM)\” elevation data in a spatial resolution of 30 meters. Classification corresponds to EMBRAPA (1979).</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Topodata Project (2008)" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://www.dsr.inpe.br/topodata/'>Download page</a></p>" +
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

// Altitude - INFO
$("#info-altitude").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 500, height: 250},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'>Altitude</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Average altitude at the municipality scale.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Georreferenced information elaborated by SAFmaps (2020) based Alvares et al. (2013)" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://35.198.22.135/geoserver/DBMS/wms?service=WMS&version=1.1.0&request=GetMap&layers=DBMS:altitude&styles=&bbox=-61.633382981999944,-33.751177993999924,-37.34078844599995,-1.049323525999931&width=570&height=768&srs=EPSG:4326&format=application/openlayers#toggle'>Download page</a></p>" +
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

// Rainfall - INFO
$("#info-rainfall").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 500, height: 250},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Average annual rainfall</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Average annual rainfall at the municipality scale.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Georreferenced information elaborated by SAFmaps (2020) based Alvares et al. (2013)" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://35.198.22.135/geoserver/DBMS/wms?service=WMS&version=1.1.0&request=GetMap&layers=DBMS:precipitacao&styles=&bbox=-61.633382981999944,-33.751177993999924,-37.34078844599995,-1.049323525999931&width=570&height=768&srs=EPSG:4326&format=application/openlayers'>Download page</a></p>" +
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

// Average Temperature - INFO
$("#info-an_temperature").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 500, height: 250},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Average annual temperature</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Average annual temperature at the municipality scale.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Georreferenced information elaborated by SAFmaps (2020) based Alvares et al. (2013)" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://35.198.22.135/geoserver/DBMS/wms?service=WMS&version=1.1.0&request=GetMap&layers=DBMS:temperatura_med&styles=&bbox=-61.633382981999944,-33.751177993999924,-37.34078844599995,-1.049323525999931&width=570&height=768&srs=EPSG:4326&format=application/openlayers'>Download page</a></p>" +
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

// Minimum Temperature - INFO
$("#info-min_temperature").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 520, height: 270},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Average minimum annual temperature</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Average minimum annual temperature at the municipality scale.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Georreferenced information elaborated by SAFmaps (2020) based Alvares et al. (2013)" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://35.198.22.135/geoserver/DBMS/wms?service=WMS&version=1.1.0&request=GetMap&layers=DBMS:temperatura_min&styles=&bbox=-61.633382981999944,-33.751177993999924,-37.34078844599995,-1.049323525999931&width=570&height=768&srs=EPSG:4326&format=application/openlayers'>Download page</a></p>" +
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

// Maximum Temperature - INFO
$("#info-max_temperature").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 520, height: 270},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Average maximum annual temperature</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Average maximum annual temperature at the municipality scale.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Georreferenced information elaborated by SAFmaps (2020) based Alvares et al. (2013)" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://35.198.22.135/geoserver/DBMS/wms?service=WMS&version=1.1.0&request=GetMap&layers=DBMS:temperatura_max&styles=&bbox=-61.633382981999944,-33.751177993999924,-37.34078844599995,-1.049323525999931&width=570&height=768&srs=EPSG:4326&format=application/openlayers'>Download page</a></p>" +
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

// Water Deficit - INFO
$("#info-hydric_deficit").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 500, height: 250},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Annual water deficit</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Annual water deficit at the municipality scale.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Georreferenced information elaborated by SAFmaps (2020) based Alvares et al. (2013)" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://35.198.22.135/geoserver/DBMS/wms?service=WMS&version=1.1.0&request=GetMap&layers=DBMS:deficit_hidrico&styles=&bbox=-61.633382981999944,-33.751177993999924,-37.34078844599995,-1.049323525999931&width=570&height=768&srs=EPSG:4326&format=application/openlayers'>Download page</a></p>" +
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

// IDP - INFO
$("#info-idp").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 520, height: 270},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> IDP (Index of rainfall distribution)</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Index (vary from 0 to 1) that reflects the annual rainfall distribution. IDP = 1 would represent an absolutely even distribution.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Georreferenced information elaborated by SAFmaps (2020) based Alvares et al. (2013)" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://35.198.22.135/geoserver/DBMS/wms?service=WMS&version=1.1.0&request=GetMap&layers=DBMS:indice_idp&styles=&bbox=-61.633382981999944,-33.751177993999924,-37.34078844599995,-1.049323525999931&width=570&height=768&srs=EPSG:4326&format=application/openlayers'>Download page</a></p>" +
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

// Frost risk - INFO
$("#info-frost_risk").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 500, height: 250},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Frost risk</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Frost risk at municipality scale.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Georreferenced information elaborated by SAFmaps (2020) based Alvares et al. (2013)" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://35.198.22.135/geoserver/DBMS/wms?service=WMS&version=1.1.0&request=GetMap&layers=DBMS:risco_geada&styles=&bbox=-61.633382981999944,-33.751177993999924,-37.34078844599995,-1.049323525999931&width=570&height=768&srs=EPSG:4326&format=application/openlayers'>Download page</a></p>" +
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

// Main Rivers - INFO
$("#info-main_rivers").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 500, height: 250},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Main rivers</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Rivers longer than 50 km, at scale 1:250.000.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> IBGE/DCG (2019) " +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='https://www.ibge.gov.br/geociencias/cartas-e-mapas/bases-cartograficas-continuas/15759-brasil.html?edicao=16034&t=downloads'>Download page</a></p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> South America" +
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

// Hidrografia - INFO
$("#info-hidrografia").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 500, height: 250},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Hydrographic regions</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Twelve Brazilian hydrographic regions according to DNAEE (Departamento Nacional de Águas e Energia Elétrica).</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> ANA (2020)" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='https://metadados.snirh.gov.br/geonetwork/srv/por/catalog.search#/metadata/8b4d4fbd-8622-4116-8991-0a0530c02690'>Download page</a></p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Brazil" +
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


// Diagnostics
// Aptidao solo - INFO
$("#info-soil_suitability").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 520, height: 270},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Soil suitability</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Based on the literature, classification is according to soil suitability for agriculture. The same soil classification was used for all crops assessed in this project.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> SAFmaps (2020)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://dx.doi.org/10.17632/czrwfbd7ct.1'>Download page</a></p>" +
                                "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Twelve Brazilian states considered in the project</p>" +
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

// Declividade eucalipto - INFO
$("#info-slope_eucalyptus").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 500, height: 250},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Slope - used for eucaliptus</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Slope classification used in case of eucalyptus.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Elaborated by SAFmaps (2020) based on Topodata (2008)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://35.198.22.135/geoserver/DBMS/wms?service=WMS&version=1.1.0&request=GetMap&layers=DBMS:declividade_eucalipto&styles=&bbox=-61.633597053612256,-33.75138888888891,-37.34109705361224,-1.0491666666666646&width=570&height=768&srs=EPSG:4326&format=application/openlayers'>Download page</a></p>" +
                                "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Twelve Brazilian states considered in the project</p>" +
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

// Declividade outros - INFO
$("#info-slope_others").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 500, height: 250},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Slope - all other crops</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Slope classification used in all other cases.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Elaborated by SAFmaps (2020) based on Topodata (2008)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://dx.doi.org/10.17632/czrwfbd7ct.1'>Download page</a></p>" +
                                "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Twelve Brazilian states considered in the project</p>" +
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

// Pasture degradation - INFO
$("#info-level_degrad").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 520, height: 270},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Level of pasture degradation</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Classification of pasturelands mapped in 2018, according to the level of degradation. The information was obtained from LAPIG and UFG based on the vegetative vigor index (NDVI).</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> LAPIG and UFG (2018)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='https://pastagem.org/atlas'>Download page</a></p>" +
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

// Uso e cobertura - INFO
$("#info-uso_cobertura").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 500, height: 250},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Land use and land cover</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Brazilian land use and land cover map in 2018, by Mapbiomas Project - Collection 4.1.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Mapbiomas (2018)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='https://mapbiomas.org/'>Download page</a></p>" +
                                "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Twelve Brazilian states considered in the project</p>" +
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

// Pasto natural - INFO
$("#info-price_natural_past").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 520, height: 300},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Land price - Natural pastures</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Average land prices, in R$ (2018), for natural pasturelands (average values at a municipality level); estimated from different sources.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Elaborated by SAFmaps (2020) based on EMATER, Agrianual, BRASIL - Ministry of Economy, and INCRA</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://dx.doi.org/10.17632/czrwfbd7ct.1'>Download page</a></p>" +
                                "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Thirteen Brazilian states considered in the project (including Pará)</p>" +
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

// Pasto plantado - INFO
$("#info-price_planted_past").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 520, height: 300},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Land price - Planted pastures</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Average land prices, in R$ (2018), for planted pasturelands (average values at a municipality level); estimated from different sources.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Elaborated by SAFmaps (2020) based on EMATER, Agrianual, BRASIL - Ministry of Economy, and INCRA</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://dx.doi.org/10.17632/czrwfbd7ct.1'>Download page</a></p>" +
                                "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Thirteen Brazilian states considered in the project (including Pará)</p>" +
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


// Sensitive areas
// Protected areas - INFO
$("#info-protected_areas").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 550, height: 400},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Legally protected areas</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Include conservation units due to environmental reasons, as for March 2020, traditional Afro-Brazilian settlements in 2020 (quilombola areas), and the indigenous reserves in 2019.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> BRASIL - Ministério do Meio Ambiente (2020), INCRA -Instituto Nacional de Colonização e Reforma Agrária (2020) and FUNAI-Fundação Nacional do Índio (2019), respectively.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> <br/>" +
                                "<a target='_blank' href='http://mapas.mma.gov.br/i3geo/datadownload.htm'>Download page (MMA)</a><br/>" +
                                "<a target='_blank' href='http://sistemas.icmbio.gov.br/simrppn/publico/'>Download page (ICMBio)</a><br/>" +
                                "<a target='_blank' href='http://certificacao.incra.gov.br/csv_shp/export_shp.py'>Download page (INCRA)</a><br/>" +
                                "<a target='_blank' href='http://www.funai.gov.br/index.php/shape'>Download page (FUNAI)</a></p>" +
                                "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Thirteen Brazilian states considered in the project (including Pará)</p>" +
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

// Restrictive biomes - INFO
$("#info-restrictive_biomes").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 520, height: 300},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Restricted biomes</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Amazon and Pantanal were considered sensitive to the cultivation of crops for SAF production. In some already deforested areas, sustainable palm production is acceptable in the Amazon biome, according to the Agroecology Zoning developed by the Federal Government (EMBRAPA, 2008).</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> IBGE (2019)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='https://geoservicos.ibge.gov.br/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=CREN:lm_bioma_250,CREN:Sistema_Costeiro_Marinho&outputFormat=SHAPE-ZIP&format_options=filename:mapa_biomas_250_s_costeiro.zip'>Download file</a></p>" +
                                "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Amazon and Pantanal biomes</p>" +
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

// CORSIA restriction - INFO
$("#info-carbon_stock").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 520, height: 300},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Non-elegible land according to CORSIA (Principle 2)</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Excluded areas (based on land use and land cover map, as for January 2008) as proxy to CORSIA's Principle 2. In fact, what has been done is more restrictive than Principle 2.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> MAPBIOMAS Project (2020) - Collection 5.0</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='https://mapbiomas.org/'>Download page</a></p>" +
                                "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Thirteen Brazilian states considered in the project (including Pará)</p>" +
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


// Infrastructure
// Roads - INFO
$("#info-roads").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 520, height: 300},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Roads</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Existing and planned federal, state and municipal roads, in 2018.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> IBGE (2019) and BRASIL - Ministry of Infrastructure (2020)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> <br/>" +
                                "<a target='_blank' href='http://geoftp.ibge.gov.br/cartas_e_mapas/bases_cartograficas_continuas/bc250/versao2019/shapefile/'>Download page (IBGE)</a><br/>" +
                                "<a target='_blank' href='https://www.gov.br/infraestrutura/pt-br/assuntos/dados-de-transportes/bit/bitmodosmapas'>Download page (Infrastructure)</a></p>" +									
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

// Railroads - INFO
$("#info-railroads").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 500, height: 250},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Railroads</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Existing and planned railroads, in 2018.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> BRASIL - Ministry of Infrastructure (2020)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='https://www.gov.br/infraestrutura/pt-br/assuntos/dados-de-transportes/bit/bitmodosmapas'>Download page</a></p>" +
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

// Pipelines - INFO
$("#info-pipelines").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 500, height: 250},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Pipelines</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Gas and oil pipelines in operation, under construction and planned in 2017.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> BRASIL - Ministry of Infrastructure (2020)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='https://www.gov.br/infraestrutura/pt-br/assuntos/dados-de-transportes/bit/bitmodosmapas'>Download page</a></p>" +
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

// Ethanol pipelines - INFO
$("#info-ethanol_pipelines").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 550, height: 350},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Ethanol pipelines</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Ethanol pipelines that compose the multimodal logistic system developed by Logum Logística S.A. The system links the main ethanol producing regions of the Brazilian Mid-West region, Minas Gerais and São Paulo states, to the main consumer hubs and exporting harbors.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Logum Logística S.A (2020); BRASIL - Ministry of Infrastructure (2020)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> <br/>" +
                                "<a target='_blank' href='https://www.gov.br/infraestrutura/pt-br/assuntos/politica-e-planejamento/politica-e-planejamento/cle'>Download page (Infrastructure)</a><br/>" +
                                "<a target='_blank' href='http://www.logum.com.br/php/servicos.php'>Download page (Logum)</a></p>" +
                                "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Main ethanol production areas and consumer hubs</p>" +
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

// Ethanol pipelines terminals - INFO
$("#info-ethanol_pipelines_terminals").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 520, height: 300},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Ethanol pipeline-terminals</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Terminals of the ethanol pipeline system, developed by Logum Logística S.A. for the transportation and storage of ethanol. </p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Georreferenced information elaborated by SAFmaps (2020) based on Logum Logística S.A (2020) and BRASIL - Ministry of Infrastructure (2020)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://35.198.22.135/geoserver/DBMS/wms?service=WMS&version=1.1.0&request=GetMap&layers=DBMS:ethanol_pipelines_terminals&styles=&bbox=-51.720817999551,-23.916966085216643,-43.162422651084455,-17.886232000106702&width=768&height=541&srs=EPSG:4326&format=application/openlayers'>Download page</a></p>" +
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

// Waterways - INFO
$("#info-waterways").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 500, height: 250},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Waterways</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Waterways in operation in 2017.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> BRASIL - Ministry of Infrastructure (2020)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='https://www.gov.br/infraestrutura/pt-br/assuntos/dados-de-transportes/bit/bitmodosmapas'>Download page</a></p>" +
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

// Airports - INFO
$("#info-airports").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 520, height: 270},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Airports</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Brazilian aerodromes in operation in 2017, classified according to the type (national/ international) and extension of the airport runway.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> BRASIL - Ministry of Infrastructure (2020)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='https://www.gov.br/infraestrutura/pt-br/assuntos/dados-de-transportes/bit/bitmodosmapas'>Download page</a></p>" +
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

// Refineries QAV - INFO
$("#info-refineries_qav").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 520, height: 300},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Refineries (by QAV production)</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Oil refineries (17) authorized by ANP (until November 2020) for production of aviation kerosene.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Georreferenced information elaborated by SAFmaps (2020) based on tabulate data of ANP (2020)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> <br/>" +
                                "<a target='_blank' href='http://www.anp.gov.br/arquivos/dados-estatisticos/producao-derivados/producao-derivados-m3.xls'>Download page (ANP)</a><br/>" +
                                "<a target='_blank' href='http://35.198.22.135/geoserver/DBMS/wms?service=WMS&version=1.1.0&request=GetMap&layers=DBMS:refineries_qav&styles=&bbox=-59.953780859818515,-32.042993342194436,-35.02110800000001,-3.143209474073895&width=662&height=768&srs=EPSG:4326&format=application/openlayers'>Download page (SAFmaps)</a><br/>" +									
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

// Refineries oil refining - INFO
$("#info-refineries_refining").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 520, height: 300},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Refineries (by oil refining)</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Oil procesed, in 2019, in the refineries with aviation kerosene production.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Georreferenced information elaborated by SAFmaps (2020) based on tabulate data of ANP (2020)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> <br/>" +
                                "<a target='_blank' href='http://www.anp.gov.br/arquivos/dados-estatisticos/producao-derivados/producao-derivados-m3.xls'>Download page (ANP)</a><br/>" +
                                "<a target='_blank' href='http://35.198.22.135/geoserver/DBMS/wms?service=WMS&version=1.1.0&request=GetMap&layers=DBMS:refineries_refining&styles=&bbox=-59.953780859818515,-32.042993342194436,-35.02110800000001,-3.143209474073895&width=662&height=768&srs=EPSG:4326&format=application/openlayers'>Download page (SAFmaps)</a></p>" +
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

// Refineries refining capacity - INFO
$("#info-refineries_capacity").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 520, height: 300},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Refineries (by refining capacity)</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Refining capacity, in 2020, in refineries with aviation kerosene production, authorized by ANP until November 2020.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Georreferenced information elaborated by SAFmaps (2020) based on tabulate data of ANP (2020)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b><br/> " +
                                "<a target='_blank' href='http://www.anp.gov.br/arquivos/dados-estatisticos/producao-derivados/producao-derivados-m3.xls'>Download page (ANP)</a><br/>" +
                                "<a target='_blank' href='http://35.198.22.135/geoserver/DBMS/wms?service=WMS&version=1.1.0&request=GetMap&layers=DBMS:refineries_capacity&styles=&bbox=-59.953780859818515,-32.042993342194436,-35.02110800000001,-3.143209474073895&width=662&height=768&srs=EPSG:4326&format=application/openlayers'>Download page (SAFmaps)</a></p>" +
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

// Ethanol distilleries - INFO
$("#info-ethanol_feedstock").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 520, height: 300},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Ethanol distilleries (by feedstock)</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Feedstock used by the units authorized by ANP to produced ethanol in 2020.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Compilation data and georreferenced information elaborated by SAFmaps (2020) based on ANP (2020), CONAB (2020), MAPA (2020), NovaCana (2020) and EPE (2018).</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://dx.doi.org/10.17632/kwdd5mbg4h.1'>Download page</a></p>" +
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

// Ethanol distilleries - milling capacity - INFO
$("#info-ethanol_milling").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 520, height: 300},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Ethanol distilleries (by milling capacity)</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Sugarcane milling capacity of the units authorized by ANP to produced ethanol in 2020.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Compilation data and georreferenced information elaborated by SAFmaps (2020) based on ANP (2020), CONAB (2020), MAPA (2020), NovaCana (2020) and EPE (2018).</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://dx.doi.org/10.17632/kwdd5mbg4h.1'>Download page</a></p>" +
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

// Ethanol distilleries - anhydrous capacity - INFO
$("#info-ethanol_anhydrous").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 520, height: 300},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Ethanol distilleries (by anhydrous capacity)</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Production capacity of anhydrous ethanol in units authorized by ANP to produced ethanol from cane & corn in 2020.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Compilation data and georreferenced information elaborated by SAFmaps (2020) based on ANP (2020), CONAB (2020), MAPA (2020), NovaCana (2020) and EPE (2018).</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://dx.doi.org/10.17632/kwdd5mbg4h.1'>Download page</a></p>" +
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

// Ethanol distilleries - hydrated capacity - INFO
$("#info-ethanol_hydrated").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 520, height: 300},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Ethanol distilleries (by hydrated capacity)</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Production capacity of hydrated ethanol in units authorized by ANP to produced ethanol from cane & corn in 2020.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Compilation data and georreferenced information elaborated by SAFmaps (2020) based on ANP (2020), CONAB (2020), MAPA (2020), NovaCana (2020) and EPE (2018).</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://dx.doi.org/10.17632/kwdd5mbg4h.1'>Download page</a></p>" +
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

// Ethanol distilleries - total output - INFO
$("#info-ethanol_output").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 520, height: 300},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Ethanol distilleries (by total output)</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Production of anhydrous and hydrated ethanol from cane & corn in 2019-2020.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Compilation data and georreferenced information elaborated by SAFmaps (2020) based on ANP (2020), CONAB (2020), MAPA (2020), NovaCana (2020) and EPE (2018).</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://dx.doi.org/10.17632/kwdd5mbg4h.1'>Download page</a></p>" +
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

// Ethanol distilleries - anhydrous output - INFO
$("#info-ethanol_anhydrous_output").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 520, height: 300},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Ethanol distilleries (by anhydrous output)</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Production of anhydrous ethanol from cane & corn in 2019-2020.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Compilation data and georreferenced information elaborated by SAFmaps (2020) based on ANP (2020), CONAB (2020), MAPA (2020), NovaCana (2020) and EPE (2018).</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://dx.doi.org/10.17632/kwdd5mbg4h.1'>Download page</a></p>" +
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

// Ethanol distilleries - hydrated output - INFO
$("#info-ethanol_hydrated_output").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 520, height: 300},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Ethanol distilleries (by hydrated output)</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Production of hydrated ethanol from cane & corn in 2019-2020.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Compilation data and georreferenced information elaborated by SAFmaps (2020) based on ANP (2020), CONAB (2020), MAPA (2020), NovaCana (2020) and EPE (2018).</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://dx.doi.org/10.17632/kwdd5mbg4h.1'>Download page</a></p>" +
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

// Soy processing plants - INFO
$("#info-oilseed_plants").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 520, height: 300},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Soy processing plants</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Soy processing plants in 2018, being 89 under operation (with different annual capacity factors) and 22 fully stopped.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Georreferenced information elaborated by SAFmaps (2020) based on tabulate data of ABIOVE (2019)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> <br/>" +
                                "<a target='_blank' href='https://abiove.org.br/estatisticas/pesquisa-de-capacidade-instalada-da-industria-de-oleos-vegetais-2018/'>Download page (ABIOVE)</a><br/>" +
                                "<a target='_blank' href='http://dx.doi.org/10.17632/kwdd5mbg4h.1'>Download page (SAFmaps)</a></p>" +
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


// Warning areas
// Land use rights - INFO
$("#info-land_rights").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 600, height: 370},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Land use rights</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Based on reported violations to land use rights, in the 2016-2018 period; information was compiled from CPT (Comissão Pastoral da Terra). " +
                                "Seriousness varies from 1 (e.g. threats) to 5 (e.g. murders); the criteria for this scale was developed in the conext of this project. Reported cases are the number of registers in each municipality.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Georreferenced information and data reorganization elaborated by SAFmapas (2020) based on CPT (2019)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> <br/>" +
                                "<a target='_blank' href='https://www.cptnacional.org.br/'>Download page (CPT)</a><br/>" +
                                "<a target='_blank' href='http://35.198.22.135/geoserver/DBMS/wms?service=WMS&version=1.1.0&request=GetMap&layers=DBMS:land_rights&styles=&bbox=-59.790430999999955,-29.95679999999993,-38.21832899999998,-0.7545259999999416&width=567&height=768&srs=EPSG:4326&format=application/openlayers'>Download page (SAFmaps)</a></p>" +
                                "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Thirteen Brazilian states considered in the project (including Pará)</p>" +
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

// Water use rights - INFO
$("#info-water_rights").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 600, height: 370},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Water use rights</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Number of reported violations to water use rights in 2017, based on information compiled by CPT (Comissão Pastoral da Terra). " +
                                "The cases are related to threats, reduced access to water bodies, pollution, destruction of socio-cultural heritage, illegal procedures, and so on.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Georreferenced information and data reorganization elaborated by SAFmapas (2020) based on CPT (2019)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> <br/>" +
                                "<a target='_blank' href='https://www.cptnacional.org.br/'>Download page (CPT)</a><br/>" +
                                "<a target='_blank' href='http://35.198.22.135/geoserver/DBMS/wms?service=WMS&version=1.1.0&request=GetMap&layers=DBMS:water_rights&styles=&bbox=-57.76633999999996,-27.668586999999945,-37.60697799999997,-1.459844999999973&width=590&height=768&srs=EPSG:4326&format=application/openlayers'>Download page (SAFmaps)</a></p>" +
                                "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Thirteen Brazilian states considered in the project (including Pará)</p>" +
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

// Agrarian reform settlements - INFO
$("#info-rural_settlements").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 520, height: 300},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Agrarian reform settlements</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Small rural properties given to families without access to land, by the Brazilian government, with the objective of facilitating the settlement and promoting subsistence agricultural practices.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> INCRA (2020)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://certificacao.incra.gov.br/csv_shp/export_shp.py'>Download page</a></p>" +
                                "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Thirteen Brazilian states considered in the project (including Pará)</p>" +
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


// Political boundaries
// Estados - INFO
$("#info-estados").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 520, height: 300},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Brazilian states</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> The twelve Brazilian states that have been considered in this project. The state of Pará, in the North region, has been considered only in the case of palm oil, as the potential there is the highest in Brazil. In case of steel plants, beef tallow and residues, other states have been also considered.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> IBGE (2019)" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='https://www.ibge.gov.br/geociencias/organizacao-do-territorio/15774-malhas.html?=&t=downloads'>Download page</a></p>" +
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

// Municípios - INFO
$("#info-municipios").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 520, height: 270},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Municipalities</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Municipalities of the twelve Brazilian states that have been considered in this project. The borders reflect the political-administrative national structure in force by 04/30/2019.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> IBGE (2019)" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='https://www.ibge.gov.br/geociencias/organizacao-do-territorio/15774-malhas.html?=&t=downloads'>Download page</a></p>" +
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


/*
 * JANELAS HELP
 */

// SUPPORT MAPS - Widget1
$("#help-support_maps").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Help Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 500, height: 250},
        headerTitle: "Help Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'>About Available Layers</h6>" +
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

// SUPPORT MAPS - Widget2
$("#help-support_maps2").click(function(e) {
    e.preventDefault();

    // Janela Info
    $("#help-support_maps").trigger("click");
});


