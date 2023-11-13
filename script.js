function showEstatisticas(municipio) {
    var statsPanel = document.querySelector(".statistics-panel");

    // Verifica se existem estatísticas para o município clicado
    if (estatisticas.hasOwnProperty(municipio)) {
        var dados = estatisticas[municipio];
        
        statsPanel.innerHTML = `
            <h2>Estatísticas da cobertura de telefonia móvel<br>em ${dados.nome} (PI)</h2>
            ${formatCobertura("5G", dados)}
            ${formatCobertura("4G", dados)}
            ${formatCobertura("3G", dados)}
            ${formatCobertura("2G", dados)}
            <cite>Fonte: <a href="https://informacoes.anatel.gov.br/paineis/infraestrutura" target="_blank">Anatel</a> (março/2023)</cite>
        `;
    }
    else {
        statsPanel.innerHTML = "<p>Não há estatísticas disponíveis para este município.</p>";
    }
}

function formatCobertura(tecnologia, dados) {
    var coberturaHTML = "";
    var totalArea = dados[`coberturaTotal${tecnologia}a`];
    var totalMoradores = dados[`coberturaTotal${tecnologia}m`];
    var totalDomicilios = dados[`coberturaTotal${tecnologia}d`];

    if (totalArea === "0,00" && totalMoradores === "0,00" && totalDomicilios === "0,00") {
        coberturaHTML = `
            <h3>Tecnologia ${tecnologia}</h3>
            <p>Não há cobertura de ${tecnologia} neste município. 😕</p>
        `;
    }
    else {
        coberturaHTML += `<h3>Tecnologia ${tecnologia}</h3>`

        // Encontrar a operadora com maior cobertura de moradores
        var maiorCobertura = Math.max(
            parseFloat(dados[`coberturaClaro${tecnologia}m`]),
            parseFloat(dados[`coberturaTim${tecnologia}m`]),
            parseFloat(dados[`coberturaVivo${tecnologia}m`])
        );

        // Verificar qual operadora tem a maior cobertura e adicionar o parágrafo correspondente
        if (maiorCobertura === parseFloat(dados[`coberturaClaro${tecnologia}m`])) {
            coberturaHTML += `<p>A operadora Claro é a que possui maior cobertura de ${tecnologia} no município, abrangendo ${dados[`coberturaClaro${tecnologia}m`]}% dos moradores, ${dados[`coberturaClaro${tecnologia}d`]}% dos domicílios e ${dados[`coberturaClaro${tecnologia}a`]}% da área do município.</p>`;
        } else if (maiorCobertura === parseFloat(dados[`coberturaTim${tecnologia}m`])) {
            coberturaHTML += `<p>A operadora Tim é a que possui maior cobertura de ${tecnologia} no município, abrangendo ${dados[`coberturaTim${tecnologia}m`]}% dos moradores, ${dados[`coberturaTim${tecnologia}d`]}% dos domicílios e ${dados[`coberturaTim${tecnologia}a`]}% da área do município.</p>`;
        } else if (maiorCobertura === parseFloat(dados[`coberturaVivo${tecnologia}m`])) {
            coberturaHTML += `<p>A operadora Vivo é a que possui maior cobertura de ${tecnologia} no município, abrangendo ${dados[`coberturaVivo${tecnologia}m`]}% dos moradores, ${dados[`coberturaVivo${tecnologia}d`]}% dos domicílios e ${dados[`coberturaVivo${tecnologia}a`]}% da área do município.</p>`;
        }

        coberturaHTML += `
            <table class="table-cobertura">
                <thead><tr><th>Operadora</th><th>Área coberta</th><th>Moradores cobertos</th><th>Domicílios cobertos</th></tr></thead>
                <tbody>
                    <tr id="claro"><th>Claro</th><td>${dados[`coberturaClaro${tecnologia}a`]}%</td><td>${dados[`coberturaClaro${tecnologia}m`]}%</td><td>${dados[`coberturaClaro${tecnologia}d`]}%</td></tr>
                    <tr id="tim"><th>Tim</th><td>${dados[`coberturaTim${tecnologia}a`]}%</td><td>${dados[`coberturaTim${tecnologia}m`]}%</td><td>${dados[`coberturaTim${tecnologia}d`]}%</td></tr>
                    <tr id="vivo"><th>Vivo</th><td>${dados[`coberturaVivo${tecnologia}a`]}%</td><td>${dados[`coberturaVivo${tecnologia}m`]}%</td><td>${dados[`coberturaVivo${tecnologia}d`]}%</td></tr>
                </tbody>
                <tfoot><tr><th>Todas</th><td>${totalArea}%</td><td>${totalMoradores}%</td><td>${totalDomicilios}%</td></tr></tfoot>
            </table>
        `;
    }

    return coberturaHTML;
}

// Modals
const modal_loja = document.getElementById('modal_loja');
const modal_sobre = document.getElementById('modal_sobre');

document.getElementById('link_loja').addEventListener("click",function(){
    modal_loja.classList.add('active')
})

document.getElementById('link_sobre').addEventListener("click",function(){
    modal_sobre.classList.add('active')
})

document.getElementById('close_modal_loja').addEventListener("click",function(){
    modal_loja.classList.remove('active')
})

document.getElementById('close_modal_sobre').addEventListener("click",function(){
    modal_sobre.classList.remove('active')
})

// Define a altura de algumas divs com base na altura da janela do navegador
function setDivHeight() {
    var windowHeight = window.innerHeight;
    var container = document.querySelector('.container');
    var mapImage = document.querySelector('.map-image');
    
    container.style.height = windowHeight + 'px';
    mapImage.style.height = windowHeight + 'px';
}

// Chama a função 'setDivHeight' quando a janela for redimensionada
window.addEventListener('resize', setDivHeight);

// Chama a função 'setDivHeight' quando a página for carregada
window.addEventListener('load', setDivHeight);