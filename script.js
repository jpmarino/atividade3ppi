function validarFormulario() {
    var nome = document.getElementById('nome').value;
    var email = document.getElementById('email').value;
    var telefone = document.getElementById('telefone').value;
    var cidade = document.getElementById('cidade').value;
    var estado = document.getElementById('estado').value;

    if (nome === '' || email === '' || telefone === '' || cidade === '' || estado === '') {
      alert('Todos os campos devem ser preenchidos');
      return false;
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Formato de e-mail inválido');
      return false;
    }

    return true;
  }