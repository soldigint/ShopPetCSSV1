function cabecera(){
var html = '<!DOCTYPE html><html lang="es">';

    html += '<html>';
    html += '<head>';
    html += '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">';
    html += ' <link href="/css/Laura.css" rel="stylesheet">';
   
    html += '  <link rel="Shortcut Icon"  href="images/oso.png"  type=”image/png” />';
    html += '<title  >ShopPet</title>';
html += '</head>';
html += '<header>';
html += ' <nav class="titulares"> ';
html += '<img src="images/oso.png"  width="50" height="50"  align="left"> ';
html += '<a class=class="titulares-link" href="shopMain.html">Main</a> ';
html += '</header><body> ';

return html;
}
exports.cabecera = cabecera;
