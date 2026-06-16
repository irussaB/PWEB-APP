const apiUrl = 'http://localhost/PWEB-API/api/produtos/';

document.getElementById('frmProduto').addEventListener('submit', function (event) {
    event.preventDefault();
    let nome = document.getElementById('nome').value;
    let valorvenda = document.getElementById('valorvenda').value;
    let categoria = document.getElementById('categoria').value;
    let operacao = 'i';
    fetch(`${apiUrl}index.php?json=${JSON.stringify({ op:operacao,nome:nome,vlvenda:valorvenda,cat:categoria })}`)
        .then(response => response.text())
        .then(() => {
            alert('Produto cadastrado!');
            window.location.reload();
        });
});

function carregarprodutos() {
    let operacao = 's';
    fetch(`${apiUrl}index.php?json=${JSON.stringify({ op:operacao })}`)
        .then(response => response.json())
        .then(data => {
            let gridCategoria = document.getElementById('gridCategoria');
            gridCategoria.innerHTML = '';
            data.forEach(ds => {
                gridCategoria.innerHTML += `
            <div class="row mt-2">
                <div class="col-sm-3">${ds.nome}</div>
                <div class="col-sm-2">${ds.vlvenda}</div>
                <div class="col-sm-1">${ds.cat}</div>
                <div class="col-sm-4">
                    <button class="btn btn-warning" onclick="editarcategoria(${ds.id}, '${ds.nome}', '${ds.vlvenda}', '${ds.cat}')">Editar</button>
                    <button class="btn btn-danger" onclick="deletarcategoria(${ds.id}, '${ds.nome}')">Excluir</button>
                </div>
            </div>`;
            });
        });
}

function editarcategoria(id, nome, vlvenda, cat) {
    document.getElementById('nome').value = nome;
    document.getElementById('valorvenda').value = vlvenda;
    document.getElementById('categoria').value = cat;
    const btn = document.querySelector('#frmProduto button[type="submit"]');
    btn.textContent = 'ATUALIZAR';
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-success');
    btn.onclick = function (event) {
        event.preventDefault();
        let unome = document.getElementById('nome').value;
        let uvalorvenda = document.getElementById('valorvenda').value;
        let ucategoria = document.getElementById('categoria').value;
        let operacao = 'u';
        fetch(`${apiUrl}index.php?json=${JSON.stringify({ op:operacao,nome:unome,vlvenda:uvalorvenda,cat:ucategoria,id:id })}`)
            .then(response => response.text())
            .then(() => {
                alert('Produto alterado!');
                window.location.reload();
            });
    }
}

function deletarcategoria(id, nome) {
    document.getElementById('nome').value = 'Deseja realmente excluir ' + nome;
    const btn = document.querySelector('#frmProduto button[type="submit"]');
    const txt = document.querySelector('#frmProduto input[type="text"]');
    btn.textContent = 'EXCLUIR';
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-danger');
    txt.classList.add('text-danger');
    btn.onclick = function (event) {
        event.preventDefault();
        let operacao = 'd';
        fetch(`${apiUrl}index.php?json=${JSON.stringify({ op:operacao,id:id })}`)
            .then(response => response.text())
            .then(() => {
                alert('Produto Excluida!');
                window.location.reload();
            });
    }
}
window.onload = carregarprodutos;