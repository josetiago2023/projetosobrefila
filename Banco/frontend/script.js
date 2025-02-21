const btnEnqueue = document.getElementById('btn-enqueue');
const btnDequeue = document.getElementById('btn-dequeue');
const btnSize = document.getElementById('btn-size');
const btnFront = document.getElementById('btn-front');
const btnRear = document.getElementById('btn-rear');
const btnIsEmpty = document.getElementById('btn-isEmpty');
const elementoInput = document.getElementById('elemento');
const filaDisplay = document.getElementById('fila');
const msgText = document.getElementById('msg-text');

function atualizarFila() {
    fetch('https://glorious-space-telegram-x5vvp4qq7jg2gjg-8000.app.github.dev/queue')
        .then(response => response.json())
        .then(data => {
            filaDisplay.innerHTML = '';
            data.items.forEach((item, index) => {
                const li = document.createElement('li');
                li.textContent = `${index + 1}. ${item}`;
                filaDisplay.appendChild(li);
            });
        })
        .catch(error => {
            mostrarMensagem('Erro ao carregar a fila');
        });
}

function mostrarMensagem(mensagem) {
    msgText.textContent = mensagem;
}

btnEnqueue.addEventListener('click', () => {
    const elemento = elementoInput.value.trim();
    if (elemento) {
        fetch('https://glorious-space-telegram-x5vvp4qq7jg2gjg-8000.app.github.dev/enqueue', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ element: elemento })
        })
        .then(response => response.json())
        .then(data => {
            mostrarMensagem(`Cliente ${data.element} adicionado à fila. Posição: ${data.pos}`);
            atualizarFila();
            elementoInput.value = '';
        })
        .catch(error => {
            mostrarMensagem('Erro ao adicionar cliente à fila');
        });
    } else {
        mostrarMensagem('Por favor, insira um nome para o cliente.');
    }
});

btnDequeue.addEventListener('click', () => {
    fetch('https://glorious-space-telegram-x5vvp4qq7jg2gjg-8000.app.github.dev/dequeue')
        .then(response => response.json())
        .then(data => {
            mostrarMensagem(`Atendido: ${data.element}`);
            atualizarFila();
        })
        .catch(error => {
            mostrarMensagem('Erro ao atender cliente');
        });
});

btnSize.addEventListener('click', () => {
    fetch('https://glorious-space-telegram-x5vvp4qq7jg2gjg-8000.app.github.dev/size')
        .then(response => response.json())
        .then(data => {
            mostrarMensagem(`Tamanho da fila: ${data.size}`);
        })
        .catch(error => {
            mostrarMensagem('Erro ao obter tamanho da fila');
        });
});

btnFront.addEventListener('click', () => {
    fetch('https://glorious-space-telegram-x5vvp4qq7jg2gjg-8000.app.github.dev/front')
        .then(response => response.json())
        .then(data => {
            mostrarMensagem(`Cliente da frente: ${data.front}`);
        })
        .catch(error => {
            mostrarMensagem('Erro ao obter cliente da frente');
        });
});

btnRear.addEventListener('click', () => {
    fetch('https://glorious-space-telegram-x5vvp4qq7jg2gjg-8000.app.github.dev/rear')
        .then(response => response.json())
        .then(data => {
            mostrarMensagem(`Cliente do final: ${data.rear}`);
        })
        .catch(error => {
            mostrarMensagem('Erro ao obter cliente do final');
        });
});

btnIsEmpty.addEventListener('click', () => {
    fetch('https://glorious-space-telegram-x5vvp4qq7jg2gjg-8000.app.github.dev/isEmpty')
        .then(response => response.json())
        .then(data => {
            mostrarMensagem(`A fila está vazia? ${data.isEmpty ? 'Sim' : 'Não'}`);
        })
        .catch(error => {
            mostrarMensagem('Erro ao verificar se a fila está vazia');
        });
});

atualizarFila();
