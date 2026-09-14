const containerCards = document.getElementById('container-cards');
const loading = document.getElementById('loading');

// 1. Função assíncrona para consumir a API REST
async function buscarUsuarios() {
    try {
        // Faz a requisição para a API pública
        const resposta = await fetch('https://jsonplaceholder.typicode.com/users');
        
        // 2. Tratamento de Erros: Verifica se a resposta HTTP foi bem-sucedida (status 200-299)
        if (!resposta.ok) {
            throw new Error(`Erro HTTP! Status: ${resposta.status}`);
        }

        // Converte a resposta para JSON
        const dados = await resposta.json();
        
        // Remove o texto de loading
        loading.style.display = 'none';

        // 3. Renderiza os dados na interface
        renderizarCards(dados);

    } catch (erro) {
        // Trata erros de rede ou falhas no fetch
        loading.style.display = 'none';
        containerCards.innerHTML = `<div class="mensagem-erro">Falha ao carregar os dados: ${erro.message}</div>`;
        console.error("Erro na requisição:", erro);
    }
}

// Função responsável por criar e injetar os cards no HTML
function renderizarCards(usuarios) {
    // Itera sobre a lista de usuários retornada pela API
    usuarios.forEach(usuario => {
        // Cria o elemento do card
        const card = document.createElement('div');
        card.classList.add('card');

        // Preenche o card com os dados (Interpolação de strings)
        card.innerHTML = `
            <h3>${usuario.name}</h3>
            <p><strong>Username:</strong> ${usuario.username}</p>
            <p><strong>E-mail:</strong> ${usuario.email}</p>
            <p><strong>Empresa:</strong> ${usuario.company.name}</p>
        `;

        // Adiciona o card ao container principal
        containerCards.appendChild(card);
    });
}

// Inicia a busca assim que o script é carregado
buscarUsuarios();