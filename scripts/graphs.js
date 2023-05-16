(function () {
	'use strict';
  angular.module('app')
    .controller('GraphController', function($scope, $rootScope) {
      // Acesso aos valores definidos no ValuesController
      $scope.y = []
      $scope.y = $rootScope.values
      //Código para gerar o gráfico utilizando a biblioteca Plotly
      function DrawGraph(dados) {
        
        var ctx = document.getElementById('meses-anteriores-gph')
        graph = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [{
              label: "Valor acumulado por mês",
            data: dados,
            backgroundColor: 'rgbA(21, 86, 115, 0.9)',
            
            }]
          },
          options:{
            responsive: true,
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
      }
      $scope.$on('updateGraph', (event, data) => {
        DrawGraph(data.dados)
      });
  });
})();

  /*
  var graph_anteriores = {
      y: [4.62, 7.81, 9.27, 13.9, 46.1, 4.62, 7.81, 9.27, 13.9, 26.1, 4.62, 7.81],
      x: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      mode: 'lines+markers',
      name: 'Meses anteriores (ano passado)',
      line: {
          color: 'rgb(155, 55, 188)',
          width: 1.5,
      },
      type: 'scatter'}
  var graph_atuais = {
      y: [7.62, 9.81, 11.27, 13.9, 22.1, 18.62, 14.81, 11.27, 13.9, 46.1, 14.62, 27.81],
      x: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      mode: 'lines+markers',
      name: 'Meses deste ano',
      line: {
          color: 'rgb(255, 0, 255)',
          width: 1.5
      },
      type: 'scatter'}
  var data = [graph_anteriores, graph_atuais]
  Plotly.newPlot('meses-anteriores-gph', data)
  */


