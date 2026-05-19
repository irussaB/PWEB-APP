const apiUrl = 'http://localhost/PWEB-API/api/categorias/';

document.getElementById('frmCategoria').addEventListener('submit', function (event) {
    event.preventDefault();
    let nome = document.getElementById('nome').value;
    let operacao = 'i';
    fetch(`${apiUrl}index.php?json=${JSON.stringify({ op:operacao,nome:nome })}`)
        .then(response => response.text())
        .then(() => {
            alert('Categoria cadastrada!');
            window.location.reload();
        });
});

function carregarcategorias() {
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
                <div class="col-sm-2">${ds.ativo ? 'Ativo' : 'Inativo'}</div>
                <div class="col-sm-4">
                    <button class="btn btn-warning" onclick="editarcategoria(${ds.id}, '${ds.nome}', '${ds.ativo}')">Editar</button>
                    <button class="btn btn-danger" onclick="deletarcategoria(${ds.id}, '${ds.nome}')">Excluir</button>
                </div>
            </div>`;
            });
        });
}

function editarcategoria(id, nome, ativo) {
    document.getElementById('nome').value = nome;
    const btn = document.querySelector('#frmCategoria button[type="submit"]');
    btn.textContent = 'ATUALIZAR';
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-success');
    btn.onclick = function (event) {
        event.preventDefault();
        let unome = document.getElementById('nome').value;
        let operacao = 'u';
        fetch(`${apiUrl}index.php?json=${JSON.stringify({ op:operacao ,nome: unome, ativo:ativo, id:id })}`)
            .then(response => response.text())
            .then(() => {
                alert('Categoria alterada!');
                window.location.reload();
            });
    }
}

function deletarcategoria(id, nome) {
    document.getElementById('nome').value = 'Deseja realmente excluir ' + nome;
    const btn = document.querySelector('#frmCategoria button[type="submit"]');
    const txt = document.querySelector('#frmCategoria input[type="text"]');
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
                alert('Categoria Excluida!');
                window.location.reload();
            });
    }
}
window.onload = carregarcategorias;