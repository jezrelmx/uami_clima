function init(temperaturaCDMX){
var win_principal=Titanium.UI.createWindow({
backgroundImage:'assets/backCDMX/bg1.jpg',
width:'100%',
height:Titanium.UI.FILL,
layout:'vertical'}),






v_clima=Ti.UI.createView({

width:'100%',
height:'70%',
layout:'vertical'}),



v_temp=Ti.UI.createView({

width:'100%',
height:'60%'}),


lb_temp_data=Ti.UI.createLabel({
text:temperaturaCDMX,
bottom:'-10dp',
font:{
fontSize:'120dp'},

textAlign:Titanium.UI.TEXT_ALIGNMENT_CENTER});


v_temp.add(lb_temp_data);


var v_air_data=Ti.UI.createView({

width:'100%',
height:'10%',
layout:'absolute'}),


v_wrap_air_data=Ti.UI.createView({

width:Titanium.UI.SIZE,
height:Titanium.UI.SIZE,
layout:'horizontal'}),


img_air_ico=Ti.UI.createImageView({
height:'14dp',
image:'assets/backCDMX/wind.png'}),


lb_air=Ti.UI.createLabel({
text:'8NW',
right:'10dp',
font:{
fontSize:'20dp'}}),



img_hum_ico=Ti.UI.createImageView({
height:'14dp',
image:'assets/backCDMX/drop.png'}),


lb_hum=Ti.UI.createLabel({
text:'10%',
font:{
fontSize:'20dp'}});



v_wrap_air_data.add(img_air_ico),
v_wrap_air_data.add(lb_air),
v_wrap_air_data.add(img_hum_ico),
v_wrap_air_data.add(lb_hum),

v_air_data.add(v_wrap_air_data);


var v_place=Ti.UI.createView({

width:'100%',
height:'30%'}),


lb_place=Ti.UI.createLabel({
text:'San Francisco, CA',
bottom:'10dp',
font:{
fontSize:'20dp'}});



v_place.add(lb_place),



v_clima.add(v_temp),
v_clima.add(v_air_data),
v_clima.add(v_place);






var v_pronostico=Ti.UI.createView({

width:'100%',
height:'30%'});








win_principal.add(v_clima),
win_principal.add(v_pronostico),

win_principal.open();
};




var url='http://148.243.232.113/calidadaire/xml/simat.json',




client=Ti.Network.createHTTPClient({
onload:function(e){
var datos=this.responseText;
try{
consultaAireCDMX=JSON.parse(datos),
datos=null;
var temperatura=consultaAireCDMX.pollutionMeasurements.information[0].temperatura+' \xBA';
init(temperatura);

}catch(e_2){
var a=Ti.UI.createAlertDialog({
title:'SmartCDMX',
ok:'Aceptar',
message:'Verifique su conexi\xF3n a internet'});

a.show();
};

},
onerror:function(e){

Ti.API.debug(e.error);
var a=Titanium.UI.createAlertDialog({
title:'SmartCDMX',
ok:'Aceptar',
message:'Verifique su conexi\xF3n a internet.'});

a.show();

},
timeout:1e4});


client.open('GET',url),
client.send();