// //========================================== DIFERENÇA MES =====================================//

// const diferenca_mes = document.getElementById("diferenca-mes")
// const mes_atual_a_real = parseInt(document.getElementById("mes-atual-a").textContent)
// const mes_anterior_b_real = parseInt(document.getElementById("mes-anterior-b").textContent)

// const diferenca_mes_real = mes_atual_a_real - mes_anterior_b_real
// const diferenca_mes_format = diferenca_mes_real.toLocaleString('pt-br', {minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true});
// diferenca_mes.textContent = ( 'R$ ' + diferenca_mes_format)

// //====================================== OUTRAS RECEITAS =====================================//

// const outras_receitas = document.getElementById("outras-receitas")
// const outras_receitas_real = parseInt(outras_receitas.textContent)
// const outras_receitas_format = outras_receitas_real.toLocaleString('pt-br', {minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true});
// outras_receitas.textContent = ( 'R$ ' + outras_receitas_format)

// //================================= ICMS =====================================//

// const icms = document.getElementById("icms")
// const icms_real = parseInt(icms.textContent)
// const icms_format = icms_real.toLocaleString('pt-br', {minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true});
// icms.textContent = ( 'R$ ' + icms_format)

// //================================= IPVA =====================================//

// const ipva = document.getElementById("ipva")
// const ipva_real = parseInt(ipva.textContent)
// const ipva_format = ipva_real.toLocaleString('pt-br', {minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true});
// ipva.textContent = ( 'R$ ' + ipva_format)

// //================================= ITCD =====================================//

// const itcd = document.getElementById("itcd")
// const itcd_real = parseInt(itcd.textContent)
// const itcd_format = itcd_real.toLocaleString('pt-br', {minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true});
// itcd.textContent = ( 'R$ ' + itcd_format)

// //========================================== DIFERENÇA ANO =====================================//

// const diferenca_ano = document.getElementById("diferenca-ano")
// const ano_atual_c_real = parseInt(document.getElementById("ano-atual-c").textContent)
// const ano_anterior_d_real = parseInt(document.getElementById("ano-anterior-d").textContent)

// const diferenca_ano_real = ano_atual_c_real - ano_anterior_d_real
// const diferenca_ano_format = diferenca_ano_real.toLocaleString('pt-br', {minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true});
// diferenca_ano.textContent = ( 'R$ ' + diferenca_ano_format)

// //================================= MES REF  =====================================//

// const mes_ref = document.getElementById("mes-ref")
// const mes_ref_real = parseInt(mes_ref.textContent)
// const mes_ref_format = mes_ref_real.toLocaleString('pt-br', {minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true});
// mes_ref.textContent = ( 'R$ ' + mes_ref_format)

// //======================================== Hover Valor A ======================================//

// const mes_atual_a = parseFloat(document.getElementById("mes-atual-a").innerText);

//   if (mes_atual_a > 1000) {
//     let formatado = mes_atual_a.toLocaleString('pt-BR', {maximumFractionDigits: 2}).replace(".", ",");
//     if (mes_atual_a >= 1000 && mes_atual_a < 1000000) {
//       formatado = (mes_atual_a / 1000).toFixed(2).replace(",", ".") + "K";
//     } else if (mes_atual_a >= 1000000) {
//       formatado = (mes_atual_a / 1000000).toFixed(2).replace(",", ".") + "M";
//     }
//     document.getElementById("mes-atual-a").innerText = formatado
//   } else{
//     document.getElementById("mes-atual-a").innerText = mes_atual_a

//   }

const hover_valor_a = document.getElementById("hover-valor-a") 
   
const iconpagment_a = document.getElementById("iconpagment-a")

iconpagment_a.addEventListener("click", () => {
    
     if (hover_valor_a.style.display == "none"){
        hover_valor_a.style.display = "flex"
     }else{
         hover_valor_a.style.display = "none"
     }
})

// const valor_quadro_hover = document.getElementById("valor-quadro-hover")

// valor_quadro_hover.textContent = mes_atual_a

// valor_quadro_hover.textContent = mes_atual_a.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true});

// //========================================== Hover Valor B ======================================//
//   const mes_anterior_b = parseFloat(document.getElementById("mes-anterior-b").innerText);

//   if (mes_anterior_b > 1000) {
//     let formatado = mes_anterior_b.toLocaleString('pt-BR', {maximumFractionDigits: 2}).replace(".", ",");
//     if (mes_anterior_b >= 1000 && mes_anterior_b < 1000000) {
//       formatado = (mes_anterior_b / 1000).toFixed(2).replace(",", ".") + "K";
//     } else if (mes_anterior_b >= 1000000) {
//       formatado = (mes_anterior_b / 1000000).toFixed(2).replace(",", ".") + "M";
//     }
//     document.getElementById("mes-anterior-b").innerText = formatado
//   } else{
//     document.getElementById("mes-anterior-b").innerText = mes_anterior_b

//   }

const hover_valor_b = document.getElementById("hover-valor-b")
    
const iconpagment_b = document.getElementById("iconpagment-b")

iconpagment_b.addEventListener("click", () => {
      if (hover_valor_b.style.display == "none"){
          hover_valor_b.style.display = "flex"
      }else{
          hover_valor_b.style.display = "none"
      }
  })

// const valor_quadro_hover_b = document.getElementById("valor-quadro-hover-b")

// valor_quadro_hover_b.textContent = mes_anterior_b

// valor_quadro_hover_b.textContent = mes_anterior_b.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true});


// //========================================== Hover Valor C ======================================//
//   const ano_atual_c = parseFloat(document.getElementById("ano-atual-c").innerText);

//   if (ano_atual_c > 1000) {
//     let formatado = ano_atual_c.toLocaleString('pt-BR', {maximumFractionDigits: 2}).replace(".", ",");
//     if (ano_atual_c >= 1000 && ano_atual_c < 1000000) {
//       formatado = (ano_atual_c / 1000).toFixed(2).replace(",", ".") + "K";
//     } else if (ano_atual_c >= 1000000) {
//       formatado = (ano_atual_c / 1000000).toFixed(2).replace(",", ".") + "M";
//     }
//     document.getElementById("ano-atual-c").innerText = formatado
//   } else{
//     document.getElementById("ano-atual-c").innerText = ano_atual_c

//   }

const hover_valor_c = document.getElementById("hover-valor-c")
  
const iconpagment_c = document.getElementById("iconpagment-c")

iconpagment_c.addEventListener("click", () => {
      if (hover_valor_c.style.display == "none"){
          hover_valor_c.style.display = "flex"
      }else{
          hover_valor_c.style.display = "none"
      }
  })

// const valor_quadro_hover_c = document.getElementById("valor-quadro-hover-c")

// valor_quadro_hover_c.textContent = ano_atual_c

// valor_quadro_hover_c.textContent = ano_atual_c.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true});

// //========================================== Hover Valor D ======================================//
//   const ano_anterior_d = parseFloat(document.getElementById("ano-anterior-d").innerText);

//   if (ano_anterior_d > 1000) {
//     let formatado = ano_anterior_d.toLocaleString('pt-BR', {maximumFractionDigits: 2}).replace(".", ",");
//     if (ano_anterior_d >= 1000 && ano_anterior_d < 1000000) {
//       formatado = (ano_anterior_d / 1000).toFixed(2).replace(",", ".") + "K";
//     } else if (ano_anterior_d >= 1000000) {
//       formatado = (ano_anterior_d / 1000000).toFixed(2).replace(",", ".") + "M";
//     }
//     document.getElementById("ano-anterior-d").innerText = formatado
//   } else{
//     document.getElementById("ano-anterior-d").innerText = ano_anterior_d

//   }

const hover_valor_d = document.getElementById("hover-valor-d")
  
const iconpagment_d = document.getElementById("iconpagment-d")

iconpagment_d.addEventListener("click", () => {
      if (hover_valor_d.style.display == "none"){
          hover_valor_d.style.display = "flex"
      }else{
          hover_valor_d.style.display = "none"
      }
  })

// const valor_quadro_hover_d = document.getElementById("valor-quadro-hover-d")

// valor_quadro_hover_d.textContent = ano_anterior_d

// valor_quadro_hover_d.textContent = ano_anterior_d.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true});  

// //======================================================================================================================================================//

// //


    















 
