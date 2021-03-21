(function($) {
    $(function() {

        $('.sidenav').sidenav();

    }); // end of document ready
})(jQuery); // end of jQuery name space


$(document).ready(function() {
    $(".dropdown-trigger").dropdown();
    $('.timepicker').timepicker();
    $('.fixed-action-btn').floatingActionButton();

});




$('.menu').click(function() {
    var elem = $('.sidenav');
    var instance = M.Sidenav.getInstance(elem);
    instance.open();
});

function calcular() {


    //valor do boleto para realizar o calculo
    var valBoleto = parseFloat(document.getElementById("valBoleto").value);

    //valor em % da taxa do parcelamento, por parcela
    var valTaxaParcel = parseFloat(document.getElementById("valTaxaParcel").value);

    //% de taxa do valor do cartão
    var valTaxaCartao = parseFloat(document.getElementById("valTaxaCartao").value);

    //máximo de volta possível
    var maxVolta = parseFloat(document.getElementById("maxVolta").value);

    //quantia de parcelas

    var qtdParcelas = parseInt(document.getElementById("qtdParcelas").value);


    if (validar()) {


        var vlrTaxaCartao = ((valBoleto / 100) * valTaxaCartao);

        var vlrBoletoComTaxaCartao = parseFloat(valBoleto) + parseFloat(vlrTaxaCartao);

        document.getElementById("vlrTaxaCartao").setAttribute('value', vlrTaxaCartao.toFixed(2));


        //        i / (1 - (1 + i) ^ (-n))
        //        Onde i = taxa de juros (ex: 3,49% por parcela, nesse caso é dividido o valor por 100, ficando 0.0349)
        //        quantia de meses, período: n
        var a = 1 + (parseFloat(valTaxaParcel) / 100);
        var b = (parseFloat(qtdParcelas) * -1);
        var c = 1 - (Math.pow(a, b));
        var coefFinanc = (parseFloat(valTaxaParcel) / 100) / c;

        var vlrTotalParcelamento = (qtdParcelas * (vlrBoletoComTaxaCartao * coefFinanc)) - vlrBoletoComTaxaCartao;

        //os 30% de volta incide em valor do boleto + taxa total de parcelamento no cartão, não na taxa de cartão
        var totalVlrBol = parseFloat(valBoleto) + parseFloat(vlrTotalParcelamento);
        var totalVlrBolComTxCartao = vlrBoletoComTaxaCartao + vlrTotalParcelamento;

        document.getElementById("vlrTotalParcelamento").setAttribute('value', vlrTotalParcelamento.toFixed(2));
        document.getElementById("totalVlrBolComTxCartao").setAttribute('value', totalVlrBolComTxCartao.toFixed(2));
        document.getElementById("totalVlrBol").setAttribute('value', totalVlrBol.toFixed(2));

        if ((qtdParcelas >= 2) && (qtdParcelas <= 5)) {
            var porcentDoisACincoParcelas = parseFloat(document.getElementById("porcentDoisACincoParcelas").value);

            if (((totalVlrBol / 100) * porcentDoisACincoParcelas) >= maxVolta) {
                $('#pVlrRetorno').append('Valor de retorno teórico: ' + 'R$' + ((totalVlrBol / 100) * porcentDoisACincoParcelas).toFixed(2));
                $('#pVlrRetorno').append('<br/>' + 'Excedeu o máximo de retorno (' + 'R$' + maxVolta + ')' + ' em: ' + 'R$' + (((totalVlrBol / 100) * porcentDoisACincoParcelas) - maxVolta).toFixed(2));
                var vlrRetorno = maxVolta - (vlrTotalParcelamento + vlrTaxaCartao);
                $('#pVlrRetorno').append('<br/>' + 'Retorno: ' + 'R$' + vlrRetorno.toFixed(2));

            } else {
                var vlrRetorno = ((totalVlrBol / 100) * porcentDoisACincoParcelas) - (vlrTotalParcelamento + vlrTaxaCartao);

                $('#pVlrRetorno').append('% de retorno para valor do boleto + taxa de parcelamento (' + 'R$' + totalVlrBol.toFixed(2) + ') : ' + porcentDoisACincoParcelas + '%');
                $('#pVlrRetorno').append('<br/>' + 'Valor de retorno: ' + 'R$' + vlrRetorno.toFixed(2));
            }
        } else if ((qtdParcelas >= 6) && (qtdParcelas <= 9)) {
            var porcentSeisANoveParcelas = parseFloat(document.getElementById("porcentSeisANoveParcelas").value);

            if (((totalVlrBol / 100) * porcentSeisANoveParcelas) >= maxVolta) {
                $('#pVlrRetorno').append('Valor de retorno teórico: ' + 'R$' + ((totalVlrBol / 100) * porcentSeisANoveParcelas).toFixed(2));
                $('#pVlrRetorno').append('<br/>' + 'Excedeu o máximo de retorno (' + 'R$' + maxVolta + ')' + ' em: ' + 'R$' + (((totalVlrBol / 100) * porcentSeisANoveParcelas) - maxVolta).toFixed(2));
                var vlrRetorno = maxVolta - (vlrTotalParcelamento + vlrTaxaCartao);
                $('#pVlrRetorno').append('<br/>' + 'Retorno: ' + 'R$' + vlrRetorno.toFixed(2));

            } else {
                var vlrRetorno = ((totalVlrBol / 100) * porcentSeisANoveParcelas) - (vlrTotalParcelamento + vlrTaxaCartao);

                $('#pVlrRetorno').append('% de retorno para valor do boleto + taxa de parcelamento (' + 'R$' + totalVlrBol.toFixed(2) + ') : ' + porcentSeisANoveParcelas + '%');
                $('#pVlrRetorno').append('<br/>' + 'Valor de retorno: ' + 'R$' + vlrRetorno.toFixed(2));
            }
        } else if ((qtdParcelas >= 10) && (qtdParcelas <= 11)) {
            var porcentDezAOnzeParcelas = parseFloat(document.getElementById("porcentDezAOnzeParcelas").value);

            if (((totalVlrBol / 100) * porcentDezAOnzeParcelas) >= maxVolta) {
                $('#pVlrRetorno').append('Valor de retorno teórico: ' + 'R$' + ((totalVlrBol / 100) * porcentDezAOnzeParcelas).toFixed(2));
                $('#pVlrRetorno').append('<br/>' + 'Excedeu o máximo de retorno (' + 'R$' + maxVolta + ')' + ' em: ' + 'R$' + (((totalVlrBol / 100) * porcentDezAOnzeParcelas) - maxVolta).toFixed(2));
                var vlrRetorno = maxVolta - (vlrTotalParcelamento + vlrTaxaCartao);
                $('#pVlrRetorno').append('<br/>' + 'Retorno: ' + 'R$' + vlrRetorno.toFixed(2));

            } else {
                var vlrRetorno = ((totalVlrBol / 100) * porcentDezAOnzeParcelas) - (vlrTotalParcelamento + vlrTaxaCartao);

                $('#pVlrRetorno').append('% de retorno para valor do boleto + taxa de parcelamento (' + 'R$' + totalVlrBol.toFixed(2) + ') : ' + porcentDezAOnzeParcelas + '%');
                $('#pVlrRetorno').append('<br/>' + 'Valor de retorno: ' + 'R$' + vlrRetorno.toFixed(2));
            }
        } else if (qtdParcelas == 12) {
            var porcentDozeParcelas = parseFloat(document.getElementById("porcentDozeParcelas").value);

            if (((totalVlrBol / 100) * porcentDozeParcelas) >= maxVolta) {
                $('#pVlrRetorno').append('Valor de retorno teórico: ' + 'R$' + ((totalVlrBol / 100) * porcentDozeParcelas).toFixed(2));
                $('#pVlrRetorno').append('<br/>' + 'Excedeu o máximo de retorno (' + 'R$' + maxVolta + ')' + ' em: ' + 'R$' + (((totalVlrBol / 100) * porcentDozeParcelas) - maxVolta).toFixed(2));
                var vlrRetorno = maxVolta - (vlrTotalParcelamento + vlrTaxaCartao);
                $('#pVlrRetorno').append('<br/>' + 'Retorno: ' + 'R$' + vlrRetorno.toFixed(2));

            } else {
                var vlrRetorno = ((totalVlrBol / 100) * porcentDozeParcelas) - (vlrTotalParcelamento + vlrTaxaCartao);

                $('#pVlrRetorno').append('% de retorno para valor do boleto + taxa de parcelamento (' + 'R$' + totalVlrBol.toFixed(2) + ') : ' + porcentDozeParcelas + '%');
                $('#pVlrRetorno').append('<br/>' + 'Valor de retorno: ' + 'R$' + vlrRetorno.toFixed(2));
            }
        }
    } else {
        M.toast({
            html: 'Favor preencher os valores corretamente!',
            classes: 'red'
        });

    }




}

function limpar() {
     $('#pVlrRetorno').empty();
     $('#valBoleto').empty();
     

}

function validar() {
    var porcentDoisACincoParcelas = parseFloat(document.getElementById("porcentDoisACincoParcelas").value);

    var porcentSeisANoveParcelas = parseFloat(document.getElementById("porcentSeisANoveParcelas").value);

    var porcentDezAOnzeParcelas = parseFloat(document.getElementById("porcentDezAOnzeParcelas").value);

    var porcentDozeParcelas = parseFloat(document.getElementById("porcentDozeParcelas").value);

    var qtdParcelas = parseInt(document.getElementById("qtdParcelas").value);

    var valBoleto = parseFloat(document.getElementById("valBoleto").value);

    if (((isNaN(valBoleto)) || (valBoleto <= 0)) || ((isNaN(qtdParcelas)) || (qtdParcelas <= 0)) || ((isNaN(porcentDoisACincoParcelas)) || (porcentDoisACincoParcelas <= 0)) || ((isNaN(porcentSeisANoveParcelas)) || (porcentSeisANoveParcelas <= 0)) || ((isNaN(porcentDezAOnzeParcelas)) || (porcentDezAOnzeParcelas <= 0)) || ((isNaN(porcentDozeParcelas)) || (porcentDozeParcelas <= 0))) {
        return false;
    } else {
        return true;
    }
}