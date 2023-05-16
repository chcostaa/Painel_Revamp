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
			$scope.META_PERCENTUAL = 0;
			$scope.META_ARRECADACAO = 0;
			$scope.DIA_ATUAL_MES;
			$scope.DIAS_RESTANTES_MES;
			$scope.ItemPagamentos = []
			$scope.DataSistema;

			$scope.ICMSPercentual;
			$scope.IPVAPercentual;
			$scope.ITCDPercentual;
			$scope.OUTROPercentual;

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
				
				socket.on('consolidado', function (Consolidado) {
					
					console.log("Processa-Consolidado");
					$scope.Consolidado = angular.fromJson(Consolidado);
					$scope.Consolidado = $scope.Consolidado.Arrecadaagrupada["ArrecadaAgrupada.ArrecadaAgrupadaItem"];
					console.log(Consolidado);
					ProcessaConsolidado();
				});

				socket.on('notificacao', function (data) {

					$scope.DadosPainel = angular.fromJson(data);
					console.log("Processa-Atualizacao");

					$scope.ICMS = $scope.DadosPainel.Arrecadacaosumarizadamsg.MesAtual.AcumuladoICMS;
					$scope.IPVA = $scope.DadosPainel.Arrecadacaosumarizadamsg.MesAtual.AcumuladoIPVA;
					$scope.ITCD = $scope.DadosPainel.Arrecadacaosumarizadamsg.MesAtual.AcumuladoITCD;
					$scope.OUTRO = $scope.DadosPainel.Arrecadacaosumarizadamsg.MesAtual.AcumuladoOutros;
					try {
						$scope.META_PERCENTUAL = $scope.DadosPainel.Arrecadacaosumarizadamsg.ArrecadaMetaMsg.META_ARRECADACAO.PERCENTUAL;
					} catch (e) {
						console.log(e);
					}
					$scope.META_ARRECADACAO = $scope.DadosPainel.Arrecadacaosumarizadamsg.MetaArrecadacao;

					$scope.ICMSPercentual = ($scope.ICMS / $scope.DadosPainel.Arrecadacaosumarizadamsg.MesAtual.ValorAcumulado) * 100;
					$scope.IPVAPercentual = ($scope.IPVA / $scope.DadosPainel.Arrecadacaosumarizadamsg.MesAtual.ValorAcumulado) * 100;
					$scope.ITCDPercentual = ($scope.ITCD / $scope.DadosPainel.Arrecadacaosumarizadamsg.MesAtual.ValorAcumulado) * 100;
					$scope.OUTROPercentual = ($scope.OUTRO / $scope.DadosPainel.Arrecadacaosumarizadamsg.MesAtual.ValorAcumulado) * 100;

					ProcessaConsolidado();
					showSimpleToast('Arrecadação Atualizada!');
					audio.play();
					$scope.$apply();
				});

				
			}

			function formataDinheiro(n) {
				return "R$ " + n.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
			}


			function ProcessaConsolidado() {

				var data = new Date();
				var ano = data.getFullYear();
				var mes = data.getMonth();
				var dia = data.getDate();

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

				$scope.DIA_ATUAL_MES = dia;
				$scope.DIAS_RESTANTES_MES = new Date(ano, mes, 0).getDate() - dia;

				// Calculos das medias
				// $scope.ICMS = 0;
				// $scope.META_ARRECADACAO = 2000000.00;
				// $scope.META_ARRECADACAO = 0.00;
				if (Number($scope.META_ARRECADACAO) >= Number($scope.ICMS)) {
					$scope.ICMSRestante = "ICMS à arrecadar: " + formataDinheiro($scope.META_ARRECADACAO - $scope.ICMS) + " (em " + $scope.DIAS_RESTANTES_MES + " dias)";
					$scope.ICMSMediaRestante = ($scope.META_ARRECADACAO - $scope.ICMS)/$scope.DIAS_RESTANTES_MES;
				} else if ($scope.META_ARRECADACAO == 0) {
					$scope.ICMSRestante = "Aguardando definição da META";
					$scope.ICMSMediaRestante = 0;
				} else {
					$scope.ICMSRestante = "Meta superada em: " + formataDinheiro($scope.ICMS - $scope.META_ARRECADACAO) + " (faltando " + $scope.DIAS_RESTANTES_MES + " dias)";
					$scope.ICMSMediaRestante = 0;
				}


				$scope.ICMSPdaaf = ($scope.META_ARRECADACAO * 105) / 100;
				$scope.ICMSPdaafRestante = $scope.ICMSPdaaf - $scope.ICMS;


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
				$scope.MesAnterior = 0;


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


				/*
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
				*/
				$scope.$apply();
			}
		});
})();