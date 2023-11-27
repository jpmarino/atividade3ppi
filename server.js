const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/processar-formulario', (req, res) => {
  const { nome, email, telefone, cidade, estado } = req.body;

  // Array para armazenar mensagens de validação
  const mensagensValidacao = [];

  if (nome === '') {
    mensagensValidacao.push('O campo Nome deve ser preenchido');
  }

  if (email === '') {
    mensagensValidacao.push('O campo Email deve ser preenchido');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      mensagensValidacao.push('Formato de e-mail inválido');
    }
  }

  if (telefone === '') {
    mensagensValidacao.push('O campo Telefone deve ser preenchido');
  }

  if (cidade === '') {
    mensagensValidacao.push('O campo Cidade deve ser preenchido');
  }

  if (estado === '') {
    mensagensValidacao.push('Selecione um estado');
  }

  if (mensagensValidacao.length > 0) {
    return res.status(400).send(`
      <h2>Formulário de Cadastro</h2>
      <p>Mensagens de validação:</p>
      <ul>
        ${mensagensValidacao.map(msg => `<li>${msg}</li>`).join('')}
      </ul>
      <form id="cadastroForm" action="/processar-formulario" method="post" onsubmit="return validarFormulario()">
        <!-- Seus campos do formulário aqui -->
        <label for="nome">Nome:</label>
        <input type="text" id="nome" name="nome" required value="${nome || ''}">
        <br>

        <!-- Outros campos do formulário -->

        <input type="submit" value="Cadastrar">
      </form>
    `);
  }


  res.status(200).send(`
    <h2>Formulário de Cadastro</h2>
    <p>Dados do formulário recebidos com sucesso!</p>
  `);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});