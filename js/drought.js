var Month_name = ["Months", "January","February","March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function init_menu() {
    var years = get_year_month("MERRA");
    $('#inputYear').empty();
    var Year_select = "";

    for (var i = (years.length - 1); i > -1; i--) {
        Year_select += '<option value="' + years[i] + '">' + years[i] + '</option>';
    }
    $('#inputYear').append(Year_select);

    $('#inputIndex').empty();
    $('#inputIndex').append('<option value="SPI"  selected="selected">SPI</option><option value="SSI">SSI</option><option value="PSI">MSDI</option>');

    var Months = get_year_month($("#inputDataSet").val(), $("#inputYear").val());
    $('#inputMonth').empty();
    var Month_select = "";

    for (var i = 0; i < (Months.length - 1); i++) {
        Month_select += '<option value="' + Months[i] + '">' + Month_name[Months[i]] + '</option>';
    }
    Month_select +='<option value="' + Months[(Months.length - 1)] + '" selected="selected">' + Month_name[Months[i]] + '</option>';
    $('#inputMonth').append(Month_select);
}

function drought_condition(condition) {
    if (condition == "-9999.0000")
        return "Data Unavailable";

    if (condition < -.5) {
        if (condition <= -0.5 && condition > -0.8)
            return "D0";
        else if (condition <= -0.8 && condition > -1.3)
            return "D1";
        else if (condition <= -1.3 && condition > -1.6)
            return "D2";
        else if (condition <= -1.6 && condition > -2.0)
            return "D3";
        else if (condition <= -2.0)
            return "D4";
    }
    else if (condition > .5) {
        if (condition >= 0.5 && condition < 0.8)
            return "W0";
        else if (condition >= 0.8 && condition < 1.3)
            return "W1";
        else if (condition >= 1.3 && condition < 1.6)
            return "W2";
        else if (condition >= 1.6 && condition < 2.0)
            return "W3";
        else if (condition >= 2.0)
            return "W4";
    }

    return "N";
}

function forecast_condition(condition) {
    if (condition == "-9999.0000")
        return "N/A";

    return Math.round(condition * 100) + "%";
}

$( document ).ready(function() {
    // initializing menu
    init_menu();

    // create maps
    var satellite_map = new ol.layer.Tile({
        source: new ol.source.MapQuest({layer: 'sat'})
    });

    var ocm_map = new ol.layer.Tile({
        source: new ol.source.OSM({
            attributions: [
                new ol.Attribution({
                    html: 'Tiles &copy; <a href="http://www.opencyclemap.org/">' +
                    'OpenCycleMap</a>'
                }),
                ol.source.OSM.DATA_ATTRIBUTION
            ],
            url: 'http://{a-c}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png'
        })
    });

    var osm_map = new ol.layer.Tile({
        source: new ol.source.OSM({
            attributions: [
                new ol.Attribution({
                    html: 'Tiles &copy; <a href="http://www.opencyclemap.org/">' +
                    'OpenStreetMap</a>'
                }),
                ol.source.OSM.DATA_ATTRIBUTION
            ],
            url: 'http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        })
    });

    var dry_map = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'http://climate.calit2.uci.edu/' + $("#inputDataSet").val() + '/tile_mercator/' + $("#inputIndex").val() + $("#inputYear").val() + $("#inputMonth").val() + '_dry/' + 'tile_{z}_{x}-{y}.png',
            maxZoom: 5
        }),
        opacity: .8
    });

    var wet_map = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'http://climate.calit2.uci.edu/' + $("#inputDataSet").val() + '/tile_mercator/' + $("#inputIndex").val() + $("#inputYear").val() + $("#inputMonth").val() + '_wet/' + 'tile_{z}_{x}-{y}.png',
            maxZoom: 5
        }),
        opacity: .8
    });

    var precipitation_map;

    // location pointer
    var vectorLayer;

    // load the map
    var map = new ol.Map({
        target: 'earth-map',
        layers: [
            osm_map,
            dry_map,
            wet_map
        ],
        view: new ol.View({
            center: ol.proj.transform([0, 0], 'EPSG:4326', 'EPSG:3857'),
            zoom: 2,
            maxZoom: 5,
            minZoom: 2
        })
    });

    $( ".LoadMap" ).click(function() {
        // remove past layers
        map.removeLayer(dry_map);
        map.removeLayer(wet_map);

        // load top layer map
        var year = $("#inputYear").val();
        var month = $("#inputMonth").val();
        var index = $("#inputIndex").val();
        var data_set = $("#inputDataSet").val();

        if (data_set == "MERRAF" || data_set == "NLDASF") {
            $(".map-info-bar").attr("src", "images/prediction_bar.jpg");

            // add new layer
            dry_map = new ol.layer.Tile({
                source: new ol.source.XYZ({
                    url: 'http://climate.calit2.uci.edu/' + data_set + '/tile_mercator/' + index + year + month + '/' + 'tile_{z}_{x}-{y}.png',
                    maxZoom: 5
                }),
                opacity: .8
            });
            map.addLayer(dry_map);
        }
        else {
            $(".map-info-bar").attr("src", "images/monitoring_bar.jpg");

            if ($("#DryCheckbox").prop('checked') == true)
            {
                dry_map = new ol.layer.Tile({
                    source: new ol.source.XYZ({
                        url: 'http://climate.calit2.uci.edu/' + data_set + '/tile_mercator/' + index + year + month + '_dry/' + 'tile_{z}_{x}-{y}.png',
                        maxZoom: 5
                    }),
                    opacity: .8
                });
                map.addLayer(dry_map);
            }
            if ($("#WetCheckbox").prop('checked') == true)
            {
                wet_map = new ol.layer.Tile({
                    source: new ol.source.XYZ({
                        url: 'http://climate.calit2.uci.edu/' + data_set + '/tile_mercator/' + index + year + month + '_wet/' + 'tile_{z}_{x}-{y}.png',
                        maxZoom: 5
                    }),
                    opacity: .8
                });
                map.addLayer(wet_map);
            }
        }

        // change the view to the United States if NLDAS or NLDASF
        var map_view = map.getView();
        if (data_set == "NLDASF" || data_set == "NLDAS") {
            map_view.setCenter(ol.proj.transform([-98.35, 39.50], 'EPSG:4326', 'EPSG:3857'));
            map_view.setZoom(4);
        }
        else {
            map_view.setCenter(ol.proj.transform([0,0], 'EPSG:4326', 'EPSG:3857'));
            map_view.setZoom(2);
        }

        // set the base map
        var base_map = $('input[name=baseMap]:checked').val();
        if (base_map == "satellite") {
            map.getLayers().setAt(0,satellite_map);
            map.removeLayer(osm_map);
            map.removeLayer(ocm_map);
        }
        else if (base_map == "aerial") {
            map.getLayers().setAt(0,ocm_map);
            map.removeLayer(satellite_map);
            map.removeLayer(osm_map);
        }
        else if (base_map == "road") {
            map.getLayers().setAt(0,osm_map);
            map.removeLayer(satellite_map);
            map.removeLayer(ocm_map);
        }

        // remove the advanced data
        $("#data-table-div").hide();


        // Prevent Default event
        if (event.preventDefault) {
            event.preventDefault();
        }
        else {
            event.returnValue = false;
        }
    });

    $( ".DownloadImage" ).click(function() {
        /*
        // download a capture of the map
        map.once('postcompose', function(event) {
          var canvas = event.context.canvas;
          window.open(canvas.toDataURL('image/png'));
        });
        map.renderSync();
        */

        // download old school maps
        var year = $("#inputYear").val();
        var month = $("#inputMonth").val();
        var index = $("#inputIndex").val();
        var data_set = $("#inputDataSet").val();

        var image_url = 'http://climate.calit2.uci.edu/';


        if (data_set == "MERRAF" || data_set == "NLDASF") {
            image_url = 'http://climate.calit2.uci.edu/' + data_set + '/map/' + index + year + month + ".png";
        }
        else {

            var DryCheckbox = $("#DryCheckbox").prop('checked');
            var WetCheckbox = $("#WetCheckbox").prop('checked');

            // check for the image layer
            if (DryCheckbox == true && WetCheckbox == true)
                image_url = 'http://climate.calit2.uci.edu/' + data_set + '/map/' + index + year + month + "_complete.png";
            else if (DryCheckbox == true && WetCheckbox == false)
                image_url = 'http://climate.calit2.uci.edu/' + data_set + '/map/' + index + year + month + "_dry.png";
            else if (DryCheckbox == false && WetCheckbox == true)
                image_url = 'http://climate.calit2.uci.edu/' + data_set + '/map/' + index + year + month + "_wet.png";
        }

        //open map in new window
        window.open(image_url);

        // Prevent Default event
        if (event.preventDefault) {
            event.preventDefault();
        }
        else {
            event.returnValue = false;
        }
    });

    $('#inputDataSet').change(function() {
        var years = get_year_month($("#inputDataSet").val());
        $('#inputYear').empty();
        var Year_select = "";

        for (var i = (years.length - 1); i > -1; i--) {
            Year_select += '<option value="' + years[i] + '">' + years[i] + '</option>';
        }
        $('#inputYear').append(Year_select);

        $('#inputIndex').empty();
        if ($("#inputDataSet").val() == "GDCDR") {
            $('#inputIndex').append('<option value="SPI">SPI</option>');
        }
        else {
            var checked_radio = $("#time-form input[type=radio]:checked").val();
            if (checked_radio == "monitoring")
                $('#inputIndex').append('<option value="SPI" selected="selected">SPI</option><option value="SSI">SSI</option><option value="PSI">MSDI</option>');
            else
                $('#inputIndex').append('<option value="SPI" selected="selected">SPI</option><option value="SSI">SSI</option><option value="PSI">MSDI</option>');
        }

        $('#inputYear').change();

        // Prevent Default event
        if (event.preventDefault) {
            event.preventDefault();
        }
        else {
            event.returnValue = false;
        }
    });

    $('#inputYear').change(function() {
        var Months = get_year_month($("#inputDataSet").val(), $("#inputYear").val());
        $('#inputMonth').empty();
        var Month_select = "";

        for (var i = 0; i < Months.length; i++) {
            Month_select += '<option value="' + Months[i] + '">' + Month_name[Months[i]] + '</option>';
        }
        $('#inputMonth').append(Month_select);
    });

    $("#monitoringOption, #predictionOption").change(function () {
        var checked_radio = $("#time-form input[type=radio]:checked").val();

        if (checked_radio == "monitoring"){
            $("#inputDataSet").empty();
            $("#inputDataSet").append('<option value="MERRA" selected="selected">MERRA</option><option value="GLDAS">GLDAS</option><option value="GDCDR">GPCP</option><option value="NLDAS">NLDAS</option>');

            // show and hide tabs
            $("#gidmaps-maps-option").show();
        }

        if (checked_radio == "prediction") {
            $("#inputDataSet").empty();
            $("#inputDataSet").append('<option value="MERRAF">MERRA</option><option value="NLDASF">NLDAS</option>');

            // show and hide tabs
            $("#gidmaps-maps-option").hide();
        }

        $("#inputDataSet").change();


        // Prevent Default event
        if (event.preventDefault) {
            event.preventDefault();
        }
        else {
            event.returnValue = false;
        }
    });

    $("#load-location-data").click(function() {
        if ($("#locationInput").val()) {
            $("#load-location-data").html("Loading...");

            $.ajax({
                url: "http://maps.googleapis.com/maps/api/geocode/json?address=" + $("#locationInput").val(),
                dataType: "text",
                success: function(data) {
                    var json = $.parseJSON(data);

                    if (json.status == "OK") {
                        var lat = json.results[0].geometry.location.lat;
                        var lon = json.results[0].geometry.location.lng;

                        $("#location-data-error").hide();
                        var data_set = $("#inputDataSet").val();

                        $.ajax({
                            url: "http://climate.calit2.uci.edu/api/location_data.php?lat=" + lat + "&lon=" + lon + "&set=" + data_set + "&index=" + $("#inputIndex").val(),
                            jsonpCallback: 'locationData',
                            dataType: "jsonp",
                            success: function(return_data) {
                                var data = return_data.data;
                                var data_table = "";

                                for(var i in data) {
                                    data_table += '<tr>' + '<td>' + (parseInt(i)+1) + '</td>' + '<td>' + data[i].year + '</td>' + '<td>' + Month_name[data[i].month] + '</td>' + '<td>';
                                    if (data_set == "MERRAF" || data_set == "NLDASF") {
                                        data_table += forecast_condition(data[i].condition);
                                    }
                                    else
                                        data_table += drought_condition(data[i].condition);
                                    data_table += '</td>' + '</tr>';
                                }
                                $("#location-data-table").html(data_table);
                                $("#data-table-div").show();

                                $("#return-data-lat-lon").html("Data Latitude: " + return_data['output-latitude'] + "<br>Data Longitude: " + return_data['output-longitude']);

                                // update map view
                                var map_view = map.getView();
                                map_view.setCenter(ol.proj.transform([parseFloat(lon), parseFloat(lat)], 'EPSG:4326', 'EPSG:3857'));
                                map_view.setZoom(3);

                                // add pointer to the map
                                map.removeLayer(vectorLayer);
                                var iconFeature = new ol.Feature({
                                    geometry: new ol.geom.Point(ol.proj.transform([parseFloat(lon), parseFloat(lat)], 'EPSG:4326', 'EPSG:3857'))
                                });


                                var vectorSource = new ol.source.Vector({
                                    features: [iconFeature]
                                });

                                vectorLayer = new ol.layer.Vector({
                                    source: vectorSource
                                });

                                map.addLayer(vectorLayer);

                                // change button back to normal
                                $("#load-location-data").html("Load Locational Data");
                            }
                        });
                    }
                    else {
                        $("#data-table-div").hide();
                        $("#load-location-data").html("Load Locational Data");

                        $("#location-data-error-msg").html("Entered location could not be located");
                        $("#location-data-error").show();
                    }
                }
            });
        }
        else {
            // box left empty
            $("#data-table-div").hide();
            $("#load-location-data").html("Load Locational Data");

            $("#location-data-error-msg").html("The location box was left empty, please try again");
            $("#location-data-error").show();
        }

        // Prevent Default event
        if (event.preventDefault) {
            event.preventDefault();
        }
        else {
            event.returnValue = false;
        }
    });
});