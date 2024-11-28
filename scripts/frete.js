document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('freteForm');
    const resultadoDiv = document.getElementById('resultado');

    // Coordenadas da loja (Recife)
    const lojaLat = -8.0476;
    const lojaLon = -34.8770;

    // Inicializar o mapa
    const map = L.map('map').setView([lojaLat, lojaLon], 12);

    // Adicionar camada de mapa OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Adicionar marcador para a loja
    const lojaMarker = L.marker([lojaLat, lojaLon]).addTo(map)
        .bindPopup('Local da Loja')
        .openPopup();

    // Variável para o marcador do cliente
    let clienteMarker;

    // Atualizar o marcador do cliente no mapa
    function atualizarMapa(clienteLat, clienteLon) {
        // Remover marcador do cliente se já existir
        if (clienteMarker) {
            clienteMarker.remove();
        }

        // Adicionar marcador para o cliente
        clienteMarker = L.marker([clienteLat, clienteLon]).addTo(map)
            .bindPopup('Local do Cliente');

        // Ajustar o zoom para mostrar loja e cliente
        const bounds = L.latLngBounds(
            [lojaLat, lojaLon],
            [clienteLat, clienteLon]
        );
        map.fitBounds(bounds);
    }

    // Evento ao submeter o formulário
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const cep = document.getElementById('cep').value.trim();

        // Validação de CEP
        const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;
        if (!cepRegex.test(cep)) {
            resultadoDiv.innerHTML = `<p style="color: red;">Por favor, insira um CEP válido.</p>`;
            return;
        }

        try {
            // Obter coordenadas do CEP via OpenCage Geocoder API
            const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${cep}&key=fba228337ae246228201b86bfc3d2e01`);
            const data = await response.json();

            if (data.results.length === 0) {
                resultadoDiv.innerHTML = `<p style="color: red;">CEP não encontrado. Verifique e tente novamente.</p>`;
                return;
            }

            // Coordenadas do CEP informado
            const clienteLat = data.results[0].geometry.lat;
            const clienteLon = data.results[0].geometry.lng;

            // Cálculo da distância
            const distancia = calcularDistancia(lojaLat, lojaLon, clienteLat, clienteLon);

            if (distancia > 20) {
                resultadoDiv.innerHTML = `
                    <p style="color: red;">Desculpe, não há disponibilidade para o CEP ${cep}.</p>
                `;
            } else {
                resultadoDiv.innerHTML = `
                    <p>Frete disponível para o CEP ${cep}.</p>
                    <p>Distância estimada: ${distancia.toFixed(2)} km</p>
                    <p>Preço do frete: R$ ${(distancia <= 5 ? 6.0 : 6.0 + (distancia - 5) * 1.5).toFixed(2)}</p>
                `;

                // Atualizar o mapa com o marcador do cliente
                atualizarMapa(clienteLat, clienteLon);
            }
        } catch (error) {
            resultadoDiv.innerHTML = `<p style="color: red;">Erro ao calcular o frete. Tente novamente mais tarde.</p>`;
            console.error("Erro ao buscar CEP ou calcular distância:", error);
        }
    });

    // Fórmula de Haversine para calcular distância em km
    function calcularDistancia(lat1, lon1, lat2, lon2) {
        const R = 6371; // Raio da Terra em km
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distância em km
    }
});
