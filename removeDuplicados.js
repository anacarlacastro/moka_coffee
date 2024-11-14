const db = require('./db');

// Verifique se há produtos duplicados com o mesmo nome
db.all('SELECT nome, COUNT(*) as count FROM produtos GROUP BY nome HAVING count > 1', [], (err, rows) => {
    if (err) {
        console.error('Erro ao buscar produtos duplicados:', err.message);
    } else {
        rows.forEach(row => {
            // Para cada nome de produto duplicado, exclua todos os registros com esse nome, exceto um
            db.all('SELECT rowid, nome FROM produtos WHERE nome = ?', [row.nome], (err, produtosDuplicados) => {
                if (err) {
                    console.error('Erro ao buscar produtos duplicados:', err.message);
                } else {
                    // Mantém o primeiro produto e exclui os outros
                    produtosDuplicados.slice(1).forEach(produto => {
                        db.run('DELETE FROM produtos WHERE rowid = ?', [produto.rowid], (err) => {
                            if (err) {
                                console.error('Erro ao excluir produto duplicado:', err.message);
                            } else {
                                console.log(`Produto duplicado ${produto.nome} com rowid ${produto.rowid} foi removido.`);
                            }
                        });
                    });
                }
            });
        });
    }
});

