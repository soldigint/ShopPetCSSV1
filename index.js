const { Pool, Client } = require('pg');
var header = require('./modulos/header');
var Firmas = require('./modulos/TablaFirmas');
var Noes = require('./modulos/Noes');


const client = new Client({
user:'yo',
host:'localhost',
database:'shopPet',
password:'pet',
port:5433,
});

var IDusuario;
var TiempoCrono;
var http=require('http');
var url=require('url');
var fs=require('fs');
var querystring = require('querystring');

var mime = {
   'html' : 'text/html',
   'css'  : 'text/css', 
   'js'   : 'javascript/js',
   'jpg'  : 'image/jpg',
   'gif'  : 'image/gif',
   'png'  : 'image/png',
   'ico'  : 'image/x-icon',
   'mp3'  : 'audio/mpeg3',
   'mp4'  : 'video/mp4',
    'ico'  : 'image/ico'
};

var servidor=http.createServer(function(pedido,respuesta){
    var objetourl = url.parse(pedido.url);
	var camino='public'+objetourl.pathname;
	if (camino=='public/')
		camino='public/shopMain.html';
        
        
	encaminar(pedido,respuesta,camino);
});

servidor.listen(2222);


function encaminar (pedido,respuesta,camino) {
	console.log(camino);
	switch (camino) {
  case 'public/recuperardatos': {
			recuperar(pedido,respuesta);
			break;
		}
        	
	    default : {  
			fs.exists(camino,function(existe){
				if (existe) {
					fs.readFile(camino,function(error,contenido){
						if (error) {
							respuesta.writeHead(500, {'Content-Type': 'text/plain'});
							respuesta.write('Error interno');
							respuesta.end();					
						} else {
							var vec = camino.split('.');
							var extension=vec[vec.length-1];
							var mimearchivo=mime[extension];
							respuesta.writeHead(200, {'Content-Type': mimearchivo});
							respuesta.write(contenido);
							respuesta.end();
						}
					});
				} else {
					respuesta.writeHead(404, {'Content-Type': 'text/html'});
					respuesta.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>');		
					respuesta.end();
				}
			});	
		}
	}	
}



function recuperar(pedido,respuesta) {

var info = '';
pedido.on('data', function(datosparciales){ info += datosparciales; });
pedido.on('end', function(){    
var formulario = querystring.parse(info);
var producto=formulario['producto'];


console.log(" producto es ",producto);
if ((producto==""))
{
    respuesta.write( header.cabecera());  respuesta.write( Noes.Noes());
    respuesta.write( Firmas.Firmas());
}
else
{
var sql;
client.connect();

sql="select name from products where name='"+producto+"';";
    console.log(sql);
client.query(sql, (err, res) => {

if (res.rows[0]==undefined) 
    {
respuesta.write( header.cabecera());	
respuesta.write( Noes.Noes());
respuesta.write( Firmas.Firmas());
    }
else
   {
    precio=res.rows[0].price;
       
    respuesta.write( header.cabecera());
    respuesta.write(precio);	
    respuesta.write( Firmas.Firmas());    

   }
});

}

});

}


console.log('web server start');
