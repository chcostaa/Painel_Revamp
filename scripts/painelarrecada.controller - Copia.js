(function () {
	'use strict';

	angular.module('app')
		.controller('PainelArrecadaController', function ($scope, $mdToast) {


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
					Meta2 = $scope.DadosPainel.Arrecadacaosumarizadamsg.ArrecadaMetaMsg.META_ARRECADACAO.META_GLOBAL
					
					$scope.ICMSPercentual = ($scope.ICMS / $scope.DadosPainel.Arrecadacaosumarizadamsg.MesAtual.ValorAcumulado) * 100;
					$scope.IPVAPercentual = ($scope.IPVA / $scope.DadosPainel.Arrecadacaosumarizadamsg.MesAtual.ValorAcumulado) * 100;
					$scope.ITCDPercentual = ($scope.ITCD / $scope.DadosPainel.Arrecadacaosumarizadamsg.MesAtual.ValorAcumulado) * 100;
					$scope.OUTROPercentual = ($scope.OUTRO / $scope.DadosPainel.Arrecadacaosumarizadamsg.MesAtual.ValorAcumulado) * 100;
					console.log($scope.DadosPainel)
					ProcessaConsolidado();
					showSimpleToast('Arrecadação Atualizada!');
					audio.play();
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
				AnoAnterior = $scope.Anos[0].value;
				MesAtual = $scope.Meses[(mes)].value;
				MesAnterior = $scope.Meses[(MAnterior)].value;
				$scope.MesAnterior = 0;


				var log = [];

				angular.forEach($scope.Consolidado[AnoMesAnterior].PorMes.PorMesItem[MAnterior].PorDia.PorDiaItem, function (value, key) {
					if (value.ARRECADA_DD_DIA <= dia) {
						$scope.MesAnterior += parseFloat(value.ARRECADA_VL_TOTALDIA);
					}

				}, log);

				angular.forEach($scope.Consolidado[AnoAnterior].PorMes.PorMesItem[MesAtual].PorDia.PorDiaItem, function (value, key) {
					if (value.ARRECADA_DD_DIA <= dia) {
						$scope.AnoMesAnterior += parseFloat(value.ARRECADA_VL_TOTALDIA);
					}
				}, log);

				$scope.$apply();

			}

		});
})();