(function () {
	'use strict';

	angular.module('app')
		.filter('abreviaValor', function () {
			return function (valoratualarr) {
				if (valoratualarr >= 1000000000) {
					let valor_inicial = valoratualarr/1000000000
					let valor_final = valor_inicial.toFixed(2)
					return 'R$' + valor_final + 'B';
				} else if (valoratualarr >= 1000000) {
					let valor_inicial = valoratualarr/1000000
					let valor_final = valor_inicial.toFixed(2)
					return 'R$' + valor_final + 'M';
				} else if (valoratualarr >= 1000) {
					let valor_inicial = valoratualarr/1000
					let valor_final = valor_inicial.toFixed(2)
					return 'R$' + valor_final + 'K';
				} else {
					return 'R$' + valoratualarr.toFixed(2);
				}
			}
		})
		.controller('PainelArrecadaController', function ($scope, $mdToast, $rootScope) {


			var socket = io('http://painelarrecadacao.sefaz.to.gov.br', {
				transports: ['websocket', 'flashsocket', 'xhr-polling'],
			});

			$scope.playAudio = function () {
				var audio = new Audio('audio/alerta.mp3');
			};

			$scope.DadosPainel = {};
			$scope.Consolidado = {};
			$scope.ICMS;
			$scope.IPVA;
			$scope.ITCD;
			$scope.OUTRO;
			$scope.ItemPagamentos = []
			$scope.DataSistema;
			$scope.values = [];
			$scope.dia;
			$scope.icmsformula;
			$scope.ICMSPercentual;
			$scope.IPVAPercentual;
			$scope.ITCDPercentual;
			$scope.OUTROPercentual;
			$scope.mediarestante;
			$scope.cabecalho;
			var last = {
				bottom: false,
				top: true,
				left: false,
				right: true
			};

			$scope.toastPosition = angular.extend({}, last);

			$scope.getToastPosition = function () {
				sanitizePosition();

				return Object.keys($scope.toastPosition)
					.filter(function (pos) { return $scope.toastPosition[pos]; })
					.join(' ');
			};

			function sanitizePosition() {
				var current = $scope.toastPosition;

				if (current.bottom && last.top) current.top = false;
				if (current.top && last.bottom) current.bottom = false;
				if (current.right && last.left) current.left = false;
				if (current.left && last.right) current.right = false;

				last = angular.extend({}, current);
			}

			function showSimpleToast(texto) {
				var pinTo = $scope.getToastPosition();
				console.log("toas" + texto);
				$mdToast.show(
					$mdToast.simple()
						.textContent(texto)
						.position(pinTo)
						.hideDelay(3000)
				);
			};

			init();

			function init() {

				socket.on('notificacao', function (data) {
					var Meta;
					var Meta2;
					var data1 = new Date();
					var diatotal = total_dias_mes(anovalor(data1),mesvalor(data1));
					var dia = data1.getDate();

					$scope.DadosPainel = angular.fromJson(data);

					$scope.ICMS = $scope.DadosPainel.Arrecadacaosumarizadamsg.MesAtual.AcumuladoICMS;
					$scope.IPVA = $scope.DadosPainel.Arrecadacaosumarizadamsg.MesAtual.AcumuladoIPVA;
					$scope.ITCD = $scope.DadosPainel.Arrecadacaosumarizadamsg.MesAtual.AcumuladoITCD;
					$scope.OUTRO = $scope.DadosPainel.Arrecadacaosumarizadamsg.MesAtual.AcumuladoOutros;
					//Meta2 = $scope.DadosPainel.Arrecadacaosumarizadamsg.ArrecadaMetaMsg.META_ARRECADACAO.META_GLOBAL
					
					try {
						Meta2 = $scope.DadosPainel.Arrecadacaosumarizadamsg.ArrecadaMetaMsg.META_ARRECADACAO.PERCENTUAL;
					} catch (e) {
						console.log(e);
					}					
					$scope.ICMSPercentual = ($scope.ICMS / $scope.DadosPainel.Arrecadacaosumarizadamsg.MesAtual.ValorAcumulado) * 100;
					$scope.IPVAPercentual = ($scope.IPVA / $scope.DadosPainel.Arrecadacaosumarizadamsg.MesAtual.ValorAcumulado) * 100;
					$scope.ITCDPercentual = ($scope.ITCD / $scope.DadosPainel.Arrecadacaosumarizadamsg.MesAtual.ValorAcumulado) * 100;
					$scope.OUTROPercentual = ($scope.OUTRO / $scope.DadosPainel.Arrecadacaosumarizadamsg.MesAtual.ValorAcumulado) * 100;
					console.log($scope.DadosPainel)
					ProcessaConsolidado();
					showSimpleToast('Arrecadação Atualizada!');
					//audio.play();
					$scope.$apply();
					var valor = Meta2-$scope.ICMS;
					var icmsarrecadar;
					var mediarestante;
					if((valor) <= 0 ){
						valor=valor *-1;
						icmsarrecadar = "ICMS superado Em " + valor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) ;
						$scope.cabecalho = "Média Diária excedente"
						mediarestante = ((valor) / (diatotal - dia + 1)).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
					}else{
						icmsarrecadar = valor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
						mediarestante = (valor / (diatotal - dia + 1)).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
						$scope.cabecalho = "Média Diária Restante"
					}
					$scope.icmsformula = icmsarrecadar;
					$scope.mediarestante = mediarestante;
				});

				socket.on('consolidado', function (Consolidado) {

					$scope.Consolidado = angular.fromJson(Consolidado);
					$scope.Consolidado = $scope.Consolidado.Arrecadaagrupada["ArrecadaAgrupada.ArrecadaAgrupadaItem"];
					ProcessaConsolidado();
				});
			}

			function total_dias_mes(ano, mes) {
				let date = new Date(ano, mes + 1, 0);
				return date.getDate();
			}
			
			function anovalor(data){
				return data.getFullYear();
			}

			function mesvalor(data){
				return data.getMonth();
			}

			function diavalor(data){
				return data.getDate();
			}

			function ProcessaConsolidado() {

				var data = new Date();
				var ano = anovalor(data);
				var mes = mesvalor(data);
				var dia = diavalor(data);
				$scope.dia = dia;
				

				var MAnterior = null;
				var AnoMesAnterior = null;
				var AnoAtual = null;
				var AnoAnterior = null;
				var MesAtual = null;
				var MesAnterior = null;
				$scope.Dias = [{value: 0, text: 1}, {value: 1, text: 2}, {value: 2, text: 3}, {value: 3, text: 4}, {value: 4, text: 5}, {value: 5, text: 6}, {value: 6, text: 7}, {value: 7, text: 8}, {value: 8, text: 9}, {value: 9, text: 10}, {value: 10, text: 11}, {value: 11, text: 12}, {value: 12, text: 13}, {value: 13, text: 14}, {value: 14, text: 15}, {value: 15, text: 16}, {value: 16, text: 17}, {value: 17, text: 18}, {value: 18, text: 19}, {value: 19, text: 20}, {value: 20, text: 21}, {value: 21, text: 22}, {value: 22, text: 23}, {value: 23, text: 24}, {value: 24, text: 25}, {value: 25, text: 26}, {value: 26, text: 27}, {value: 27, text: 28}, {value: 28, text: 29}, {value: 29, text: 30}, {value: 30, text: 31}];
				$scope.Anos = [/*{value:"0",text:(ano-4)}, {value:"1",text:(ano-3)}, {value:"2",text:(ano-2)},*/ { value: "3", text: (ano - 1) }, { value: "4", text: (ano - 0) }];
				$scope.Meses = [{ value: "0", text: "Janeiro" }, { value: "1", text: "Fevereiro" }, { value: "2", text: "Março" }, { value: "3", text: "Abril" }, { value: "4", text: "Maio" }, { value: "5", text: "Junho" }, { value: "6", text: "Julho" }, { value: "7", text: "Agosto" }, { value: "8", text: "Setembro" }, { value: "9", text: "Outubro" }, { value: "10", text: "Novembro" }, { value: "11", text: "Dezembro" }];
				$scope.MesAnterior = 0;
				$scope.AnoMesAnterior = 0;


				if (mes == '0') {
					MAnterior = 11;
					AnoMesAnterior = $scope.Anos[0].value
				} else {
					MAnterior = mes - 1
					AnoMesAnterior = $scope.Anos[1].value;
				}

				AnoAtual = $scope.Anos[1].value;
				AnoAnterior = $scope.Anos[1].value;
				MesAtual = $scope.Meses[(mes)].value;
				MesAnterior = $scope.Meses[(MAnterior)].value;
				for (let i = 0; i < 12; i++) {
					let valor = $scope.Consolidado[2].PorMes.PorMesItem[i].ARRECADA_VL_TOTALMES;
					$scope.values.push(valor)
				}
				let dados = $scope.values
				$rootScope.$broadcast('updateGraph', {dados});
console.log($scope.Consolidado);

 				var log = [];

try { 

				angular.forEach($scope.Consolidado[2].PorMes.PorMesItem[MAnterior].PorDia.PorDiaItem, function (value, key) {
					if (value.ARRECADA_DD_DIA <= dia) {
						$scope.MesAnterior += parseFloat(value.ARRECADA_VL_TOTALDIA);
					}

				}, log);
 

 

				angular.forEach($scope.Consolidado[2].PorMes.PorMesItem[MesAtual].PorDia.PorDiaItem, function (value, key) {
					if (value.ARRECADA_DD_DIA <= dia) {
						$scope.AnoMesAnterior += parseFloat(value.ARRECADA_VL_TOTALDIA);
					}
				}, log);
}
catch(e) {
    // You would have to define a timeout-state 'state', assuming you're
    // using states though;   
  };

				$scope.$apply();

			}

		});
})();