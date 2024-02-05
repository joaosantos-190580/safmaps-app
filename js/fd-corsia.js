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

// Water maps
l_water_stations_src = 'DBMS:water_monitoring_stations2020';
l_water_balance_src = 'DBMS:quantitative_w_balance2020';
l_water_quality_src = 'DBMS:water_quality_index_2019_2020';

// Human labour maps
l_child_labour_src = 'DBMS:child_labour_2020_2022';
l_slavery_src = 'DBMS:slavery_likely_2020_2022';


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
      //$("#legend-biomas").css("display", "none");
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
      //$("#legend-biomas").css("display", "none");
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
      //$("#legend-biomas").css("display", "none");
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
      //$("#legend-biomas").css("display", "none");
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
      //$("#legend-biomas").css("display", "none");
      reset_all_legends();
  }
});


/*
 * JANELAS INFO - MAPAS
 */

// CORSIA MAPS
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
                          "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Sites of water monitoring stations containing (i) Fluviometric Stations with raw and consisted data in 2020 (ANA, 2020a), (ii) National Water Quality Monitoring Network in 2020 (ANA, 2020b), and Groundwater Monitoring Network Integrated – CPRM Stations in 2020 (ANA, 2020c).</p>" +
                          "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> National Water Agency/Agência Nacional das Águas – ANA (2023)" +
                          "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b></p>" +
                              "<span style='padding-left:20px'><a target='_blank' href='https://metadados.snirh.gov.br/geonetwork/srv/api/records/6749d278-ca5e-40e9-b648-20d6382f57df'>Streamflow (ANA, 2020a)</a></span><br/>" +
                              "<span style='padding-left:20px'><a target='_blank' href='https://metadados.snirh.gov.br/geonetwork/srv/api/records/7470ba67-b0c1-440c-af4c-e2ac4eadac95/attachments/RNQA_2020.zip'>Quality (ANA, 2020b)</a></span><br/>" +
                              "<span style='padding-left:20px'><a target='_blank' href='https://dadosabertos.ana.gov.br/datasets/d524ba27c4ab402c99a536f11e1ce700_0/about'>Groundwater (ANA, 2020c)</a></span>" +
                              "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Thirteen Brazilian states considered in the project (including Pará)" +
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
      contentSize: {width: 500, height: 450},
      headerTitle: "Map Information",
      content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                      "<div><h6 style='font-weight:bold;color: blue'>Quantitative water balance</h6>" +
                          "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Quantitative water balance is an indicator of water availability/supply, calculated by the ratio between the estimated consumptive demands (surface and/or underground catchment flows) (for 2020) and the water availability at micro-watersheds.<br/><br/>Legends classes in the map correspond to those adopted by the European Environment Agency and the United Nations for the Water Explotation Index, including an additional class denominated “Intermittent”, according to Brazilian National Water Agency (ANA) classification; the Brazilian classification can be less restrictive.<br/><br/><b>Note:</b> The original shapefile of the quantitative water balance indicator was prepared on the millionth scale and, therefore, is applicable to studies on a national scale, and it is not recommended use on a local scale (e.g. municipality and basins with a small drainage area).</p>" +
                          "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> National Water Agency/Agência Nacional das Águas – ANA (2023)" +
                          "<p style='font-size: 14px; margin-top:1rem'><b>Source link: </b>" +
                              "<a target='_blank' href='https://dadosabertos.ana.gov.br/maps/f6e75885b3554a01927741e47d829168/about'>Download page</a></p>" +
                              "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Thirteen Brazilian states considered in the project (including Pará)" +
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
      contentSize: {width: 500, height: 450},
      headerTitle: "Map Information",
      content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                      "<div><h6 style='font-weight:bold;color: blue'>Water quality index</h6>" +
                          "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Water Quality Index (WQI) for the years 2019 or 2020, assuming the most recent value available in each station. The WQI calculation adopted by the Brazilian Water Agency is adapted from the National Sanitation Foundation (NSF WQI) formulation, considering the best method for water quality assessment in Brazil. The index is calculated by the means of the weighted product of nine variables: biochemical oxygen demand, dissolved oxygen, hydrogenionic potential, temperature, thermotolerant coliforms, total nitrogen, total phosphorus, total residues and turbidity. The WQI, adapted from the National Sanitation Foundation (NSF WQI), is adopted and modified by the Environmental Company of the State of São Paulo (CETESB) considering the best method in Brazil for water quality assessment (ANA, 2017). Legends classes in the map correspond to those internationally adopted by the NSF WQI (more restrictive than the classification assumed by CETESB in Brazil), ranging from 0 to 100 (the higher the value, the better the water quality). See details at: http://pnqa.ana.gov.br/indicadores-indice-aguas.aspx.</p>" +
                          "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> National Water Agency/Agência Nacional das Águas – ANA (2023)" +
                          "<p style='font-size: 14px; margin-top:1rem'><b>Source link: </b>" +
                              "<a target='_blank' href='https://dados.ana.gov.br/dataset/indicadores-de-qualidade-da-agua-iqa-serie-historica-ate-2020/resource/4189dbf8-2712-4272-856b-1d80d4c9c3a2'>Download page</a></p>" +
                              "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Thirteen Brazilian states considered in the project (including Pará)" +
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
// Child labour  in agriculture and forest sectors (2020 – 2022)
$("#info-child_labour").click(function(e) {
  e.preventDefault();

  // Janela Info
  removePanelbyTitle("Map Information");
  $.jsPanel({
      theme:      '#93bd42',
      contentSize: {width: 500, height: 450},
      headerTitle: "Map Information",
      content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                      "<div><h6 style='font-weight:bold;color: blue'>Child labour in agriculture and forest sectors (2020 – 2022)</h6>" +
                          "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Number of children/adolescents found to be in a situation of child labour, in 2020-2022; cases in agriculture and forest plantation (except charcoal production) sectors.</p>" +
                          "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b>  Georeferenced information and data reorganization elaborated by SAFmaps (2024), based on Ministério Público do Trabalho (MPT) (2023)" +
                          "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b></p>" +
                              "<span style='padding-left:20px'><a target='_blank' href='https://falabr.cgu.gov.br'>Ministério Público do Trabalho (MPT)</a></span><br/>" +
                              "<span style='padding-left:20px'><a target='_blank' href='#'></a>SAFmaps</span>" +
                              "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Thirteen Brazilian states considered in the project (including Pará). Originally, there is no data available for four municipalities in the state of Mato Grosso and 2 in Mato Grosso do Sul located in floodable areas of the Pantanal biome, and in the south of the state of Rio Grande do Sul" +
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

// Slavery-likely working conditions 
$("#info-slavery").click(function(e) {
  e.preventDefault();

  // Janela Info
  removePanelbyTitle("Map Information");
  $.jsPanel({
      theme:      '#93bd42',
      contentSize: {width: 500, height: 450},
      headerTitle: "Map Information",
      content:	"<div style='margin-left:5%; overflow-y:auto; height: 100%''>" +
                      "<div><h6 style='font-weight:bold;color: blue'> Slavery-likely working conditions </h6>" +
                          "<p style='font-size: 14px; margin-top:1rem'><b>Description:</b> Number of workers found in slavery-likely working conditions, in 2020 – 2022, considering just agriculture and forest plantation (except charcoal production) sectors.</p>" +
                          "<p style='font-size: 14px; margin-top:1rem'><b>Data source:</b> Georeferenced information and data reorganization elaborated by SAFmaps (2024) based on RADAR SIT (2023)" +
                          "<p style='font-size: 14px; margin-top:1rem'><b>Source link:</b></p>" +
                          "<span style='padding-left:20px'><a target='_blank' href='https://sit.trabalho.gov.br/radar/'>Radar SIT</a></span><br/>" +
                          "<span style='padding-left:20px'><a target='_blank' href='https://falabr.cgu.gov.br'>Ministério Público do Trabalho (MPT)</a></span><br/>" +
                              "<span style='padding-left:20px'><a target='_blank' href='#'></a>SAFmaps</span>" +
                              "<p style='font-size: 14px; margin-top:1rem'><b>Geographic scope:</b> Thirteen Brazilian states considered in the project (including Pará). Originally, there is no data available for four municipalities in the state of Mato Grosso and 2 in Mato Grosso do Sul located in floodable areas of the Pantanal biome, and in the south of the state of Rio Grande do Sul" +
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

