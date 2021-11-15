
var UrlGetArticulos = 'http://localhost:80/G6_19/Controller/ma_articulos.php?op=GetArticulos';
var UrlPostArticulos = 'http://localhost:80/G6_19/Controller/ma_articulos.php?op=InsertArticulos';
var UrlGetUno = 'http://localhost:80/G6_19/Controller/ma_articulos.php?op=GetArticulo';
var UrlPutArticulo = 'http://localhost:80/G6_19/Controller/ma_articulos.php?op=UpdateArticulos';
var UrlDeleteArticulo = 'http://localhost:80/G6_19/Controller/ma_articulos.php?op=EliminarArticulos';


$(document).ready(function(){
    CargarArticulos();
});

function CargarArticulos(){
    $.ajax({
        url: UrlGetArticulos,
        type: 'GET',
        datatype: 'JSON',
        success: function(response){
            var MiItems = response;
            var Valores ='';

            for(i= 0; i < MiItems.length; i++){
                Valores += '<tr>'+
                '<td>'+ MiItems[i].ID+'</td>'+
                '<td>'+ MiItems[i].DESCRIPCION+'</td>'+
                '<td>'+ MiItems[i].UNIDAD+'</td>'+
                '<td>'+ MiItems[i].COSTO+'</td>'+
                '<td>'+ MiItems[i].PRECIO+'</td>'+
                '<td>'+ MiItems[i].APLICA_ISV+'</td>'+
                '<td>'+ MiItems[i].PORCENTAJE_ISV+'</td>'+
                '<td>'+ MiItems[i].ESTADO+'</td>'+
                '<td>'+ MiItems[i].ID_SOCIO+'</td>'+
                '<td>'+ 
                '<button class="btn-warning" onclick="CargarArticulo('+MiItems[i].ID +')">Editar</button>'+
                '<button class="btn-outline-danger" onclick="EliminarArticulo('+MiItems[i].ID +')">Eliminar</button>'+
                '</td>'
             '</tr>';
                $('.articulos').html(Valores);
            }
        }
    })
}

function AgregarArticulo(){
    var datosarticulos={
    ID: $('#ID').val(),
        DESCRIPCION: $('#DESCRIPCION').val(),
        UNIDAD: $('#UNIDAD').val(),
        COSTO: $('#COSTO').val(),
        PRECIO: $('#PRECIO').val(),
        APLICA_ISV: $('#APLICA_ISV').val(),
        PORCENTAJE_ISV: $('#PORCENTAJE_ISV').val(),
        ESTADO: $('#ESTADO').val(),
        ID_SOCIO: $('#ID_SOCIO').val()
    }
    
    var datosarticulosjson= JSON.stringify(datosarticulos);

    $.ajax({
        url:UrlPostArticulos,
        type: 'POST',
        data: datosarticulosjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console-log(response)
        }
    });
    alert('Articulos Agregados')
}

function CargarArticulo(idarticulo){
    var datosarticulo ={
        id: idarticulo
    };
    var datosarticulosjson= JSON.stringify(datosarticulo);

    $.ajax({
        url: UrlGetUno,
        type: 'POST',
        data: datosarticulosjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            var MiItems = response;
            $('#ID').val(MiItems[0].ID),
            $('#DESCRIPCION').val(MiItems[0].DESCRIPCION),
            $('#UNIDAD').val(MiItems[0].UNIDAD),
            $('#COSTO').val(MiItems[0].COSTO),
            $('#PRECIO').val(MiItems[0].PRECIO),
            $('#APLICA_ISV').val(MiItems[0].APLICA_ISV),
            $('#PORCENTAJE_ISV').val(MiItems[0].PORCENTAJE_ISV),
            $('#ESTADO').val(MiItems[0].ESTADO),
            $('#ID_SOCIO').val(MiItems[0].ID_SOCIO)
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarArticulo(' + MiItems[0].ID + ')"'+ 
            'value="Actualizar Articulo" class="btn btn-primary"></input>';
            $('.button').html(btnactualizar);
        }
    });
}


function ActualizarArticulo(idarticulos){
    var datosarticulos = {
        id: idarticulos,
        ID: $('#ID').val(),
        DESCRIPCION: $('#DESCRIPCION').val(),
        UNIDAD: $('#UNIDAD').val(),
        COSTO: $('#COSTO').val(),
        PRECIO: $('#PRECIO').val(),
        APLICA_ISV: $('#APLICA_ISV').val(),
        PORCENTAJE_ISV: $('#PORCENTAJE_ISV').val(),
        ESTADO: $('#ESTADO').val(),
        ID_SOCIO: $('#ID_SOCIO').val()
    };
    var datosarticulosjson = JSON.stringify(datosarticulos);

    $.ajax({
        url: UrlPutArticulo,
        type: 'PUT',
        data: datosarticulosjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response)
        }
    });
    alert("Articulo Actualizado");
}

function EliminarArticulo(idarticulos) {
    var datosarticulo = {
        ID: idarticulos
    };
    var datosarticulosjson = JSON.stringify(datosarticulo);

    $.ajax({
        url: UrlDeleteArticulo,
        type: 'DELETE',
        data: datosarticulosjson,
        datatype: 'JSON',
        contentType: 'application/json',
  
        success: function(response) {
            console.log(response)
        }
    });
    alert("Articulo Eliminado");
}
