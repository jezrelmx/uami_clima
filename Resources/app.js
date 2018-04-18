function init(wetherData) {
	var imgBgRandom = Math.floor((Math.random() * 3) + 1);
	switch(imgBgRandom) {
		case 1:
			var bgFile = 'assets/backCDMX/bg1.jpg'
			break;
		case 2:
			var bgFile = 'assets/backCDMX/turismo_23.jpg'
			break;
		case 3:
			var bgFile = 'assets/backCDMX/bellas.jpg'
			break;
		default:
			var bgFile = 'assets/backCDMX/facebook.jpg'
			break;
	};


	var win_principal = Titanium.UI.createWindow({
		backgroundImage: bgFile,
		width: '100%',
		height: Titanium.UI.FILL,
		layout: 'vertical'
	});


	/**
	*	CLIMA
	**/
	var v_clima = Ti.UI.createView({
		// backgroundColor: 'red',
		width: '100%',
		height: '75%',
		layout: 'vertical'
	});

	// -------- Temperatura --------
	var v_temp = Ti.UI.createView({
		// backgroundColor: 'yellow',
		width: '100%',
		height: '60%'
	});

	var lb_temp_data = Ti.UI.createLabel({
		text: wetherData.temp,
		bottom: '-10dp',
		color: '#FFFFFF',
		font: {
			fontSize: '120dp'
		},
		textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER
	});

	v_temp.add(lb_temp_data);

	// -------- Viento Humedad -------- 
	var v_air_data = Ti.UI.createView({
		// backgroundColor: 'pink',
		width: '100%',
		height: '10%',
		layout: 'absolute'
	});

	var v_wrap_air_data = Ti.UI.createView({
		// backgroundColor: 'green',
		width: Titanium.UI.SIZE,
		height: Titanium.UI.SIZE,
		layout: 'horizontal'
	});	

	var img_air_ico = Ti.UI.createImageView({
		height: '14dp',
		image: 'assets/backCDMX/wind.png',
	});

	var lb_air = Ti.UI.createLabel({
		text: wetherData.air,
		color: '#FFFFFF',
		right: '10dp',
		font: {
			fontSize: '20dp'
		}
	});

	var img_hum_ico = Ti.UI.createImageView({
		height: '14dp',
		image: 'assets/backCDMX/drop.png',
	});

	var lb_hum = Ti.UI.createLabel({
		text: wetherData.hum,
		color: '#FFFFFF',
		font: {
			fontSize: '20dp'
		}
	});

	v_wrap_air_data.add(img_air_ico);
	v_wrap_air_data.add(lb_air);
	v_wrap_air_data.add(img_hum_ico);
	v_wrap_air_data.add(lb_hum);

	v_air_data.add(v_wrap_air_data);

	// -------- Lugar --------
	var v_place = Ti.UI.createView({
		// backgroundColor: 'purple',
		width: '100%',
		height: '30%'
	});

	var lb_place = Ti.UI.createLabel({
		text: wetherData.place,
		color: '#FFFFFF',
		bottom: '10dp',
		font: {
			fontSize: '20dp'
		}
	});

	v_place.add(lb_place);



	v_clima.add(v_temp);
	v_clima.add(v_air_data);
	v_clima.add(v_place);



	/**
	*	PRONOSTICO
	**/
	var v_pronostico = Ti.UI.createView({
		backgroundColor: '#FFFFFF',
		opacity: 0.4,
		width: '100%',
		height: '25%'
	});



	/**
	*	PRINCIPAL
	**/

	win_principal.add(v_clima);
	win_principal.add(v_pronostico);

	if (Ti.Platform.osname = 'android') {
		win_principal.open({
			theme: 'materialThemeNoAB'
		});
	} else {
		win_principal.open();
	}
	
};

// var aux = "22" + "º";


var url = "http://api.apixu.com/v1/current.json?key=4c1af01122744ff0938220636181804&q=Mexico";




var client = Ti.Network.createHTTPClient({
    onload : function(e) {
        var datos = this.responseText;
        try {
        	consultaAireCDMX = JSON.parse(datos);
        	datos = null;
            var temp = Math.round(consultaAireCDMX.current.temp_c);
            temp = temp + 'º';
            var place = consultaAireCDMX.location.name + ", " + consultaAireCDMX.location.country;
            var hum = consultaAireCDMX.current.humidity;
            var air = consultaAireCDMX.current.wind_kph + consultaAireCDMX.current.wind_dir;
            var jsonWetherData = {
            	temp : temp,
            	place: place,
            	hum: hum,
            	air: air
            };

            init(jsonWetherData);
            
        } catch(e_2) {
        	var a = Ti.UI.createAlertDialog({
				title : 'SmartCDMX',
				ok : 'Aceptar',
				message : 'Verifique su conexión a internet'
			});
			a.show();
        };
        
    },
    onerror : function(e) {
        
        Ti.API.debug(e.error);
        var a = Titanium.UI.createAlertDialog({
            title : 'SmartCDMX',
            ok : 'Aceptar',
            message : 'Verifique su conexión a internet.'
        });
        a.show();

    },
    timeout : 10000
});

client.open("GET", url);
client.send();