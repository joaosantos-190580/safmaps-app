/*
 * All panels, controls and other issues related to: CORSIA Sustainability Criteria
 *
 * 
 */

// MENU: Panel activation
$("#corsia").click(function(e) {
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
    $("#panel-corn").css("display", "none");		
    $("#panel-tallow").css("display", "none");		
    $("#panel-off_gases").css("display", "none");	
    $("#panel-uco-residues").css("display", "none");		
    $("#empty").css("display", "none");
    $("#panel-corsia").css("display", "block");
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
    document.getElementById("defaultOpenCO").click();
    
}); 

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    // TabContent for Infraestructure
    tabcontent = document.getElementsByClassName("tabcontent-inf");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// 2- Cabron stock
l_carbon_stock_src = 'DBMS:carbon_stock';
l_n_eligible_land_src = 'DBMS:corsia_restriction';

// 3- Water maps
l_water_stations_src = 'DBMS:water_monitoring_stations2020';
l_water_balance_src = 'DBMS:quantitative_w_balance2020';
l_water_quality_src = 'DBMS:water_quality_index_2019_2020';

// 4- Soil
l_soil_erosion_src = 'DBMS:soil_erosion';

// 5- Air
l_air_quality_src = 'DBMS:air_quality_monitoring';

// 6- Conservation
l_threatened_species_src = 'DBMS:threatened_species2022';
l_app_src = 'DBMS:permanent_preservation_areas';
l_protected_areas_src = 'DBMS:protected_areas';
l_restrictive_biomes_src = 'DBMS:restricted_biomes';

// 8- Human labour maps
l_child_labour_src = 'DBMS:child_labour_2020_2022';
l_slavery_src = 'DBMS:slavery_likely_2020_2022';

// 9- Land use rights
l_land_rights_violations_src = 'DBMS:land_use_rights';

// 10- Water use rights
l_water_rights_violations_src = 'DBMS:water_use_rights';

// 11- Social develop
l_mhdi_2010_src = 'DBMS:mhdi_2010';
l_average_income_src = 'DBMS:average_income';

// 12- Food security
l_child_malnutrition_src = 'DBMS:child_malnutrition';


/*
 *  Carbon Stock
 */

// Carbon Stock
$("#toggle-carbon_stock").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();
  
    options['layers'] = l_carbon_stock_src;
  
    if($(this).prop("checked") == true) {
        var prov = L.tileLayer.wms(url, options);
        map.addLayer(prov);
  
        remove_empty_legend();
        $("#legend-carbon_stock").css("display", "block");
    } else {
        reset_all_legends();
    }
});

// Non eligible land
$("#toggle-n_eligible_land").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_n_eligible_land_src;

    if($(this).prop("checked") == true) {
        var prov = L.tileLayer.wms(url, options);  
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-n_eligible_land").css("display", "block");
    } else {
        reset_all_legends();
    }
});


/*
 *  Water
 */

// Water monitoring stations (Layer)
$("#toggle-water_stations").on('change', function(){
  $('input:checkbox').not(this).prop('checked', false);
  reset_all_legends();
  removeLayers();

  options['layers'] = l_water_stations_src;

  if($(this).prop("checked") == true) {
      var prov = L.tileLayer.wms(url, options);
      map.addLayer(prov);

      remove_empty_legend();
      $("#legend-water_stations").css("display", "block");
  } else {
      reset_all_legends();
  }
});

// Quantitative water balance (Layer)
$("#toggle-water_balance").on('change', function(){
  $('input:checkbox').not(this).prop('checked', false);
  reset_all_legends();
  removeLayers();

  options['layers'] = l_water_balance_src;

  if($(this).prop("checked") == true) {
      var prov = L.tileLayer.wms(url, options);
      map.addLayer(prov);

      remove_empty_legend();
      $("#legend-water_balance").css("display", "block");
  } else {
      reset_all_legends();
  }
});

// Water quality index (Layer)
$("#toggle-water_quality").on('change', function(){
  $('input:checkbox').not(this).prop('checked', false);
  reset_all_legends();
  removeLayers();

  options['layers'] = l_water_quality_src;

  if($(this).prop("checked") == true) {
      var prov = L.tileLayer.wms(url, options);
      map.addLayer(prov);

      remove_empty_legend();
      $("#legend-water_quality").css("display", "block");
  } else {
      reset_all_legends();
  }
});


/*
 *  Soil
 */

// Soil erosion
$("#toggle-soil_erosion").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();
  
    options['layers'] = l_soil_erosion_src;
  
    if($(this).prop("checked") == true) {
        var prov = L.tileLayer.wms(url, options);
        map.addLayer(prov);
  
        remove_empty_legend();
        $("#legend-soil_erosion").css("display", "block");
    } else {
        reset_all_legends();
    }
});


/*
 *  Air
 */

// Air quality
$("#toggle-air_quality").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();
  
    options['layers'] = l_air_quality_src;
  
    if($(this).prop("checked") == true) {
        var prov = L.tileLayer.wms(url, options);
        map.addLayer(prov);
  
        remove_empty_legend();
        $("#legend-air_quality").css("display", "block");
    } else {
        reset_all_legends();
    }
});


/*
 *  Conservation
 */

// Threatened species
$("#toggle-threatened_species").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();
  
    options['layers'] = l_threatened_species_src;
  
    if($(this).prop("checked") == true) {
        var prov = L.tileLayer.wms(url, options);
        map.addLayer(prov);
  
        remove_empty_legend();
        $("#legend-threatened_species").css("display", "block");
    } else {
        reset_all_legends();
    }
  });

// APP
$("#toggle-app").on('change', function(){
  $('input:checkbox').not(this).prop('checked', false);
  reset_all_legends();
  removeLayers();

  options['layers'] = l_app_src;

  if($(this).prop("checked") == true) {
      var prov = L.tileLayer.wms(url, options);
      map.addLayer(prov);

      remove_empty_legend();
      $("#legend-app").css("display", "block");
  } else {
      reset_all_legends();
  }
});

// Protected Areas (Layer)
$("#toggle-protected_areas").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();

    options['layers'] = l_protected_areas_src;

    if($(this).prop("checked") == true) {
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
        var prov = L.tileLayer.wms(url, options);  
        map.addLayer(prov);

        remove_empty_legend();
        $("#legend-restrictive_biomes").css("display", "block");
    } else {
        reset_all_legends();
    }
});


/*
 *  Human labour
 */

// Child labour (Layer)
$("#toggle-child_labour").on('change', function(){
  $('input:checkbox').not(this).prop('checked', false);
  reset_all_legends();
  removeLayers();

  options['layers'] = l_child_labour_src;

  if($(this).prop("checked") == true) {
      var prov = L.tileLayer.wms(url, options);
      map.addLayer(prov);

      remove_empty_legend();
      $("#legend-child_labour").css("display", "block");
  } else {
      reset_all_legends();
  }
});

// Slavery-likely working conditions   
$("#toggle-slavery").on('change', function(){
  $('input:checkbox').not(this).prop('checked', false);
  reset_all_legends();
  removeLayers();

  options['layers'] = l_slavery_src;

  if($(this).prop("checked") == true) {
      var prov = L.tileLayer.wms(url, options);
      map.addLayer(prov);

      remove_empty_legend();
      $("#legend-slavery").css("display", "block");
  } else {
      reset_all_legends();
  }
});


/*
 *  Land use rights
 */

// Land use rights (Layer)
$("#toggle-land_rights_violations").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();
  
    options['layers'] = l_land_rights_violations_src;
  
    if($(this).prop("checked") == true) {
        var prov = L.tileLayer.wms(url, options);
        map.addLayer(prov);
  
        remove_empty_legend();
        $("#legend-land_rights_violations").css("display", "block");
    } else {
        reset_all_legends();
    }
  });


/*
 *  Water use rights
 */

// Water use rights (Layer)
$("#toggle-water_rights_violations").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();
  
    options['layers'] = l_water_rights_violations_src;
  
    if($(this).prop("checked") == true) {
        var prov = L.tileLayer.wms(url, options);
        map.addLayer(prov);
  
        remove_empty_legend();
        $("#legend-water_rights_violations").css("display", "block");
    } else {
        reset_all_legends();
    }
  });


/*
 *  Social develop
 */

// MHDI 2010 (Layer)
$("#toggle-mhdi_2010").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();
  
    options['layers'] = l_mhdi_2010_src;
  
    if($(this).prop("checked") == true) {
        var prov = L.tileLayer.wms(url, options);
        map.addLayer(prov);
  
        remove_empty_legend();
        $("#legend-mhdi_2010").css("display", "block");
    } else {
        reset_all_legends();
    }
  });

// Average income (Layer)
$("#toggle-average_income").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();
  
    options['layers'] = l_average_income_src;
  
    if($(this).prop("checked") == true) {
        var prov = L.tileLayer.wms(url, options);
        map.addLayer(prov);
  
        remove_empty_legend();
        $("#legend-average_income").css("display", "block");
    } else {
        reset_all_legends();
    }
  });


/*
 *  Food security
 */

// Child malnutrition (Layer)
$("#toggle-child_malnutrition").on('change', function(){
    $('input:checkbox').not(this).prop('checked', false);
    reset_all_legends();
    removeLayers();
  
    options['layers'] = l_child_malnutrition_src;
  
    if($(this).prop("checked") == true) {
        var prov = L.tileLayer.wms(url, options);
        map.addLayer(prov);
  
        remove_empty_legend();
        $("#legend-child_malnutrition").css("display", "block");
    } else {
        reset_all_legends();
    }
  });


/*
 * JANELAS INFO - MAPAS
 */

// CORSIA MAPS
// Carbon stock - INFO
$("#info-carbon_stock").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 590, height: 400},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Carbon stocks in 2022</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Carbon stocks by land use and cover in 2022, estimated based on reference soil organic carbon stocks (SOCref) up to a depth of 30 cm, by microregion (Embrapa, 2021); factors of change in soil carbon stocks and biomass carbon stocks (Cveg) (Guarenghi et al., 2023); quality of pastures and land use and cover in 2022 (MapBiomas – col 8).</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Mapped by:</b> SAFmaps (2024)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> SAFmaps (2024) based on Embrapa (2021), Guarenghi et al. (2023) and MapBiomas Project – Collection 8 (2023)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b><br/>" +
                                "<span style='padding-left:20px'><a href='#'>SAFmaps</a></span><br/>" +
                                "<span style='padding-left:20px'><a target='_blank' href='https://MapBiomas.org/en/download'>MapBiomas</a></span><br/>" +
                                "<span style='padding-left:20px'><a target='_blank' href='http://geoinfo.cnps.Embrapa.br/documents/3275'>Embrapa</a></span><br/>" +
                                "<span style='padding-left:20px'><a target='_blank' href='https://www.mdpi.com/2073-445X/12/3/584'>Guarenghi et al. (2023)</a></span>" +
                                "</p>" +
                                "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Thirteen Brazilian states considered</p>" +
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

// Non eligible land - INFO
$("#info-n_eligible_land").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 520, height: 300},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Non-elegible land according to CORSIA</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Conservatively, as a proxy to CORSIA's Principle 2, mangrove, wetlands and all areas covered by natural vegetation in December 2007 were excluded.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Mapped by:</b> SAFmaps (2021)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> MapBiomas Project (2020) - Collection 5.0</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='https://mapbiomas.org/'>MapBiomas</a></p>" +
                                "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Thirteen Brazilian states considered</p>" +
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


// WATER
// Water monitoring stations - INFO
$("#info-water_stations").click(function(e) {
  e.preventDefault();

  // Janela Info
  removePanelbyTitle("Map Information");
  $.jsPanel({
      theme:      '#93bd42',
      contentSize: {width: 500, height: 450},
      headerTitle: "Map Information",
      content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                      "<div><h6 style='font-weight:bold;color: blue'>Water monitoring stations</h6>" +
                          "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Water monitoring stations containing: (i) Fluviometric Stations with raw and consistent data in 2020 (ANA, 2020a), (ii) National Water Quality Monitoring Network in 2020 (ANA, 2020b), and (iii) Integrated Groundwater Monitoring Network – CPRM Stations in 2020 (ANA, 2020c).</p>" +
                          "<p style='font-size: 14px; margin-top:1rem'><b>Mapped by:</b> ANA (2020)</p>" +
                          "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> National Water Agency/Agência Nacional das Águas – ANA (2020)" +
                          "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b><br/>" +
                              "<span style='padding-left:20px'><a target='_blank' href='https://metadados.snirh.gov.br/geonetwork/srv/api/records/6749d278-ca5e-40e9-b648-20d6382f57df'>Streamflow (ANA, 2020a)</a></span><br/>" +
                              "<span style='padding-left:20px'><a target='_blank' href='https://metadados.snirh.gov.br/geonetwork/srv/api/records/7470ba67-b0c1-440c-af4c-e2ac4eadac95/attachments/RNQA_2020.zip'>Quality (ANA, 2020b)</a></span><br/>" +
                              "<span style='padding-left:20px'><a target='_blank' href='https://dadosabertos.ana.gov.br/datasets/d524ba27c4ab402c99a536f11e1ce700_0/about'>Groundwater (ANA, 2020c)</a></span>" +
                              "</p>" +
                              "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Thirteen Brazilian states considered" +
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

// Quantitative water balance - INFO
$("#info-water_balance").click(function(e) {
  e.preventDefault();

  // Janela Info
  removePanelbyTitle("Map Information");
  $.jsPanel({
      theme:      '#93bd42',
      contentSize: {width: 620, height: 450},
      headerTitle: "Map Information",
      content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                      "<div><h6 style='font-weight:bold;color: blue'>Quantitative water balance</h6>" +
                          "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Quantitative water balance is an indicator of water availability/supply, calculated by the ratio between the estimated consumptive demands (surface and/or underground catchment flows; exception for urban supply, for which only the surface portion was accounted for) (for 2020) and the water availability at micro-watersheds. <br/><br/>" +
                                                                                          "Legends classes in the map correspond to those adopted by the European Environment Agency and the United Nations for the Water Explotation Index, including an additional class denominated “Intermittent”, according to Brazilian National Water Agency (ANA) classification; the Brazilian classification can be less restrictive. <br/><br/>" +
                                                                                          "<b>Note:</b> The original shapefile of the quantitative water balance indicator was prepared on the millionth scale and, therefore, is applicable to studies on a national scale, and it is not recommended use on a local scale (e.g. municipality and basins with a small drainage area)</p>" +
                          "<p style='font-size: 14px; margin-top:1rem'><b>Mapped by:</b> ANA (2020)</p>" +
                          "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> National Water Agency/Agência Nacional das Águas – ANA (2022)" +
                          "<p style='font-size: 14px; margin-top:1rem'><b>Source link: </b>" +
                              "<a target='_blank' href='https://dadosabertos.ana.gov.br/maps/f6e75885b3554a01927741e47d829168/about'>ANA</a></p>" +
                              "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Thirteen Brazilian states considered" +
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

// Water quality index - INFO
$("#info-water_quality").click(function(e) {
  e.preventDefault();

  // Janela Info
  removePanelbyTitle("Map Information");
  $.jsPanel({
      theme:      '#93bd42',
      contentSize: {width: 620, height: 450},
      headerTitle: "Map Information",
      content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                      "<div><h6 style='font-weight:bold;color: blue'>Water quality index</h6>" +
                          "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Water Quality Index (WQI) for the years 2019 or 2020, assuming the most recent value available in each year. The IQA calculation adopted by the National Water Agency is adapted from the IQA formulation of the National Sanitation Foundation (NSF), considering the best method for assessing water quality in Brazil. The index is calculated through the weighted product of nine variables: biochemical oxygen demand, dissolved oxygen, hydrogen potential, temperature, thermotolerant coliforms, total nitrogen, total phosphorus, total residues and turbidity. The IQA, adapted from the National Sanitation Foundation (FNSF), is adopted and modified by the Environmental Company of the State of São Paulo (CETESB) considering the best method in Brazil for assessing water quality (ANA, 2017). The classes in the map legends correspond to those adopted internationally for the NSF IQA (more restrictive than the classification assumed by CETESB, in Brazil), ranging from 0 to 100 (the higher the value, the better the water quality). See details at: http://pnqa.ana.gov.br/indicadores-indice-aguas.aspx.</p>" +
                          "<p style='font-size: 14px; margin-top:1rem'><b>Mapped by:</b> SAFmaps (2024)</p>" +
                          "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> SAFmaps (2024) based on National Water Agency/Agência Nacional das Águas – ANA (2022)" +
                          "<p style='font-size: 14px; margin-top:1rem'><b>Source link: </b><br/>" +
                              "<span style='padding-left:20px'><a target='_blank' href='https://dados.ana.gov.br/dataset/indicadores-de-qualidade-da-agua-iqa-serie-historica-ate-2020/resource/4189dbf8-2712-4272-856b-1d80d4c9c3a2'>ANA</a></span><br/>" +
                              "<span style='padding-left:20px'><a href='#'>SAFmaps</a></span>" +
                              "</p>" +
                              "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Thirteen Brazilian states considered" +
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


// SOIL
// Soil erosion - INFO
$("#info-soil_erosion").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 600, height: 300},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Susceptibility to water erosion</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Soil susceptibility to water erosion, considering soil characteristics, local topographic and climatic conditions. Susceptibility levels are represented in five intensity classes, according to Embrapa (2022). Developed on a scale of 1:250,000.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Mapped by:</b> Embrapa (2022)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Embrapa (2022)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='http://geoinfo.cnps.Embrapa.br/documents/2916'>Embrapa</a></p>" +
                                "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Thirteen Brazilian states considered</p>" +
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


// AIR
// Air quality - INFO
$("#info-air_quality").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 600, height: 300},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Air quality monitoring station locations</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Locations of air monitoring stations, in 2020, daily monitoring particulate matter (PM10), ozone (O3), nitrogen dioxide (NO2) and sulfur dioxide (SO2). Other stations monitor the concentration of just two or other pollutants. Stations whose monitoring frequency is not daily are not shown (i.e. monitoring over short periods (e.g. a few days/months) may occur in specific locations).</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Mapped by:</b> SAFmaps (2024)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Georeferenced information and data reorganization elaborated by SAFmaps (2024), based on IEMA (2023)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link: </b><br/>" +
                                "<span style='padding-left:20px'><a target='_blank' href='https://energiaeambiente.org.br/produto/plataforma-da-qualidade-do-ar'>IEMA</a></span><br/>" +
                                "<span style='padding-left:20px'><a href='#'>SAFmaps</a></span>" +
                                "</p>" +
                                "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Thirteen Brazilian states considered</p>" +
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


// CONSERVATION
// Threatened species
$("#info-threatened_species").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 600, height: 400},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Threatened species (IUCN Red List)</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> International Union for Conservation of Nature’s Red List of Threatened Species (IUCN Red List 2022-2 version), based on the raw IUCN ranges for amphibians, birds, mammals and reptiles. The data are biased towards vertebrates as these are currently the terrestrial taxonomic groups that have been comprehensively assessed and for which there are polygon maps. The analyses are only relevant for terrestrial areas, as marine areas are only represented by birds and mammals (IUCN, 2022).</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Mapped by:</b> IUCN (2022)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> IUCN (2022)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='https://www.iucnredlist.org/resources/other-spatial-downloads'>IUCN</a></p>" +
                                "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Thirteen Brazilian states considered</p>" +
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

// APP
$("#info-app").click(function(e) {
    e.preventDefault();
  
    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 620, height: 450},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Riparian Areas of Permanent preservation (APP)</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Riparian Areas of Permanent Preservation (APP) correspond to marginal strips along all waterbodies that must be covered by native vegetation according to the New Forest Act (Native Vegetation Protection Law - the main Brazilian policy to protect native vegetation in private lands). The original data was developed by the Fundação Brasileira para o Desenvolvimento Sustentável (FBDS), in vector format, with a spatial resolution of 1:25,000. To improve webmap performance, the data were transformed in raster (30x30m) by SAFmaps (2023), which may result in some spatial distortions compared to the original data in vector format.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Mapped by:</b> SAFmaps (2024)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Raster data elaborated by SAFmaps (2020) based on FBDS (2023)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link: </b><br/>" +
                                "<span style='padding-left:20px'><a target='_blank' href='https://geo.fbds.org.br/'>FBDS</a></span><br/>" +
                                "<span style='padding-left:20px'><a href='#'>SAFmaps</a></span>" +
                                "</p>" +
                                "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Thirteen Brazilian states considered. Original database (FSDS, 2023) does not provide data for four municipalities in the state of Mato Grosso and two in Mato Grosso do Sul located in floodable areas of the Pantanal biome; and for some municipalities in the South of the state of Rio Grande do Sul.For five municipalities in Piauí state, only APPs in river sources areas are presented.</p>" +
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

// Protected areas - INFO
$("#info-protected_areas").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 620, height: 400},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Legally protected areas</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Include conservation units due to environmental reasons, as for March 2020, traditional Afro-Brazilian settlements in 2020 (quilombola areas), and the indigenous lands in 2019.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Mapped by:</b> SAFmaps (2021)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b><br/>" +
                                "<span style='padding-left:20px'> Conservation units: BRAZIL - Ministry of Environment (2020) and ICMBio (2020);</span><br/>" +
                                "<span style='padding-left:20px'>Afro-Brazilian settlements: INCRA (2020);</span><br/>" +
                                "<span style='padding-left:20px'>Indigenous lands: FUNAI (2019)</span><br/></p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b><br/>" +
                                "<span style='padding-left:20px'><a target='_blank' href='http://mapas.mma.gov.br/i3geo/datadownload.htm'>Conservation units</a></span><br/>" +
                                "<span style='padding-left:20px'><a target='_blank' href='http://sistemas.icmbio.gov.br/simrppn/publico/'>Conservation units</a></span><br/>" +
                                "<span style='padding-left:20px'><a target='_blank' href='http://certificacao.incra.gov.br/csv_shp/export_shp.py'>Afro-Brazilian settlements</a></span><br/>" +
                                "<span style='padding-left:20px'><a target='_blank' href='http://www.funai.gov.br/index.php/shape'>Indigenous lands</a></span>" +
                                "</p>" +
                                "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Thirteen Brazilian states considered</p>" +
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
        contentSize: {width: 520, height: 360},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Restricted biomes</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> The Amazon and Pantanal biomes were considered sensitive areas for cultivation. However, exceptions were made in the cases of areas already deforested and which are indicated for sustainable palm production in the Amazon biome, according to the Brazilian Agroecology Zoning for palm developed by the Federal Government.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Mapped by:</b> IBGE (2019)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> IBGE (2019)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b> " +
                                "<a target='_blank' href='https://geoservicos.ibge.gov.br/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=CREN:lm_bioma_250,CREN:Sistema_Costeiro_Marinho&outputFormat=SHAPE-ZIP&format_options=filename:mapa_biomas_250_s_costeiro.zip'>IBGE</a></p>" +
                                "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Brazilian Amazon and Pantanal</p>" +
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


// HUMAN LABOUR
// Child labour  in agriculture and forest sectors (2020 – 2022) - INFO
$("#info-child_labour").click(function(e) {
  e.preventDefault();

  // Janela Info
  removePanelbyTitle("Map Information");
  $.jsPanel({
      theme:      '#93bd42',
      contentSize: {width: 520, height: 380},
      headerTitle: "Map Information",
      content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                      "<div><h6 style='font-weight:bold;color: blue'>Child labour in agriculture and forest areas</h6>" +
                          "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Number of children/adolescents in child labor situations per municipality, in 2020-2022; number of cases in agriculture and forestry plantations (except charcoal production).</p>" +
                          "<p style='font-size: 14px; margin-top:1rem'><b>Mapped by:</b> SAFmaps (2024)</p>" +
                          "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Georeferenced information and data reorganization prepared by SAFmaps (2024) based on the Public Ministry of Labor (MPT) (2023)</p>" +
                          "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b><br/>" +
                              "<span style='padding-left:20px'><a target='_blank' href='https://falabr.cgu.gov.br'>MPT</a></span><br/>" +
                              "<span style='padding-left:20px'><a target='_blank' href='#'>SAFmaps</a></span>" +
                              "</p>" +
                              "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Thirteen Brazilian states considered" +
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

// Slavery-likely working conditions - INFO
$("#info-slavery").click(function(e) {
  e.preventDefault();

  // Janela Info
  removePanelbyTitle("Map Information");
  $.jsPanel({
      theme:      '#93bd42',
      contentSize: {width: 500, height: 400},
      headerTitle: "Map Information",
      content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                      "<div><h6 style='font-weight:bold;color: blue'> Slavery-likely working conditions </h6>" +
                          "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Number of workers found in slavery-likely working conditions per municipality, in 2020 – 2022, considering only agriculture and forestry plantations (except charcoal production). The records depend on inspection actions based on complaints or intelligence work; however, not all notifications are monitored, which can lead to underreporting of cases (CPT, 2020; IPEA, 2018).</p>" +
                          "<p style='font-size: 14px; margin-top:1rem'><b>Mapped by:</b> SAFmaps (2024)</p>" +
                          "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Georeferenced information and data reorganization elaborated by SAFmaps (2024), based on RADAR SIT (2023)" +
                          "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b><br/>" +
                            "<span style='padding-left:20px'><a target='_blank' href='https://sit.trabalho.gov.br/radar/'>Radar SIT</a></span><br/>" +
                            "<span style='padding-left:20px'><a target='_blank' href='https://falabr.cgu.gov.br'>MPT</a></span><br/>" +
                              "<span style='padding-left:20px'><a target='_blank' href='#'>SAFmaps</a></span>" +
                              "</p>" +
                              "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Thirteen Brazilian states considered" +
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


// LAND USE RIGHTS
// Land rights violations - INFO
$("#info-land_rights_violations").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 600, height: 400},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Land use rights (violations to)</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Based on reported violations to land use rights per municipality, in the 2020-2022 period; information was compiled from CPT (Comissão Pastoral da Terra). Seriousness varies from 1 (e.g. threats) to 5 (e.g. murders); the criteria for this scale was developed in the context of this project. Reported cases are the number of registers in each municipality; the maximum seriousness value identified between the 3-year period was considered.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Mapped by:</b> SAFmaps (2024)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Georeferenced information and data reorganization elaborated by SAFmaps (2024) based on CPT (2023)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link: </b><br/>" +
                                "<span style='padding-left:20px'><a target='_blank' href='https://www.cptnacional.org.br/downloads'>CPT</a></span><br/>" +
                                "<span style='padding-left:20px'><a href='#'>SAFmaps</a></span>" +
                                "</p>" +
                                "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Thirteen Brazilian states considered</p>" +
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


// WATER USE RIGHTS
// Water rights violations - INFO
$("#info-water_rights_violations").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 600, height: 400},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Water use rights (violations to)</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Number of reported violations to water use rights per municipality in the 2020 - 2021 period, based on information compiled by CPT (Comissão Pastoral da Terra). The cases are related to threats, reduced access to water bodies, pollution, destruction of socio-cultural heritage, illegal procedures, and so on.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Mapped by:</b> SAFmaps (2024)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Georeferenced information and data reorganization elaborated by SAFmaps (2024) based on CPT (2023)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link: </b><br/>" +
                                "<span style='padding-left:20px'><a target='_blank' href='https://www.cptnacional.org.br/downloads'>CPT</a></span><br/>" +
                                "<span style='padding-left:20px'><a href='#'>SAFmaps</a></span>" +
                                "</p>" +
                                "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Thirteen Brazilian states considered</p>" +
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


// SOCIAL DEVELOP
// MHDI 2010 - INFO
$("#info-mhdi_2010").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 600, height: 400},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Municipal Human Development Index (HDI)</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Brazilian Municipal Human Development Index, adapted by PNUD, IPEA and FJP (2013) based on microdata from the 2010 IBGE Demographic Census. The data was generated from an “adaptation of the global HDI methodology to calculate the Municipal HDI of Brazilian municipalities, based on data from the 2010 Demographic Census, which is the geometric mean of the indices for the Income, Education and Longevity dimensions, with equal weights”.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Mapped by:</b> SAFmaps (2024)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Georeferenced information elaborated by SAFmaps (2024) based on UNDP/IPEA (2013)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link: </b><br/>" +
                                "<span style='padding-left:20px'><a target='_blank' href='http://www.atlasbrasil.org.br/'>PNUD et al.</a></span><br/>" +
                                "<span style='padding-left:20px'><a href='#'>SAFmaps</a></span>" +
                                "</p>" +
                                "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Thirteen Brazilian states considered</p>" +
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


// Average income - INFO
$("#info-average_income").click(function(e) {
    e.preventDefault();

    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 600, height: 400},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Average income</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Average income of the local population (municipal level), in US$ 2020, developed by FGV (2023) based on Personal Income Tax (IRPF) data generated by the Brazilian Federal Revenue Service (RFB) in 2020. For methodological details , see: https://cps.fgv.br/riqueza.</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Mapped by:</b> SAFmaps (2024)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Georeferenced information elaborated by SAFmaps (2024) based on FGV (2023)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link: </b><br/>" +
                                "<span style='padding-left:20px'><a target='_blank' href='https://www.cps.fgv.br/cps/bd/docs/ranking/TOP_Municipio2020.htm'>FGV</a></span><br/>" +
                                "<span style='padding-left:20px'><a href='#'>SAFmaps</a></span>" +
                                "</p>" +
                                "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Thirteen Brazilian states considered</p>" +
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


// FOOD SECURITY
// Child malnutrition - INFO
$("#info-child_malnutrition").click(function(e) {
    e.preventDefault();
  
    // Janela Info
    removePanelbyTitle("Map Information");
    $.jsPanel({
        theme:      '#93bd42',
        contentSize: {width: 620, height: 400},
        headerTitle: "Map Information",
        content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                        "<div><h6 style='font-weight:bold;color: blue'> Child malnutrition</h6>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Percentage of children under 10 years of age with very low weight for their age, according to SISVAN, in relation to the total number of children in this age group in each municipality. The classification of nutritional status is expressed in terms of Body Mass Index (weight x age). The data presented correspond to Body Mass Index < 0.1 percentile, according to SISVAN. For details see Technical Note (DATASUS).</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Mapped by:</b> SAFmaps (2024)</p>" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Georeferenced information and data reorganization elaborated by SAFmaps (2024) based on SISVANPT (2023)" +
                            "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b><br/>" +
                                "<span style='padding-left:20px'><a target='_blank' href='https://sisaps.saude.gov.br/sisvan/relatoriopublico/index'>Download page (SISVAN)</a></span><br/>" +
                                "<span style='padding-left:20px'><a target='_blank' href='#'>SAFmaps</a></span><br/>" +
                                "<span style='padding-left:20px'><a target='_blank' href='http://tabnet.datasus.gov.br/cgi-win/SISVAN/CNV/notas_sisvan.html'>Technical note (DATASUS)</a></span>" +
                                "</p>" +
                                "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Thirteen Brazilian states considered" +
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



