window.addEventListener('scroll', function () {
  const header = document.getElementById('header');
  const containerLinks = document.getElementById('container-opcoes');
  if (window.scrollY > 30) {
    header.classList.add('scrolled');
    containerLinks.style.boxShadow = "0 0";
  } else {
    header.classList.remove('scrolled');
    containerLinks.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.2)";
  }
});
const inputNome = document.getElementById('nome');
const inputEmail = document.getElementById('email');
const inputTelefone = document.getElementById('telefone');
const formulario = document.getElementById('formulario');
const mensagemFeedback = document.getElementById('mensagemFeedback');

// ---------- MÁSCARAS (impedem digitar caractere errado) ----------

// Nome: só deixa passar letra (com acento) e espaço
inputNome.addEventListener('input', () => {
  inputNome.value = inputNome.value
    .replace(/[^A-Za-zÀ-ÿ\s]/g, '')   // remove número, símbolo, tudo que não é letra/espaço
    .replace(/^\s+/, '')              // não deixa começar com espaço
    .replace(/\s{2,}/g, ' ');         // colapsa espaço duplo
});

// Telefone: só deixa passar dígito, formatado como (00) 00000-0000
inputTelefone.addEventListener('input', () => {
  let numeros = inputTelefone.value.replace(/\D/g, '');
  numeros = numeros.substring(0, 11);

  if (numeros.length > 6) {
    if (numeros.length === 11) {
      inputTelefone.value = numeros.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else {
      inputTelefone.value = numeros.replace(/^(\d{2})(\d{4})(\d{1,4})$/, '($1) $2-$3');
    }
  } else if (numeros.length > 2) {
    inputTelefone.value = numeros.replace(/^(\d{2})(\d+)/, '($1) $2');
  } else if (numeros.length > 0) {
    inputTelefone.value = numeros.replace(/^(\d+)/, '($1');
  } else {
    inputTelefone.value = '';
  }
});

// ---------- VALIDAÇÃO (a fonte da verdade — não depende de atributo de HTML) ----------

function validarNome(valor) {
  const nome = valor.trim();
  // pelo menos 2 letras, só letras/acentos separadas por 1 espaço — sem símbolo, sem número, sem espaço sobrando
  return nome.length >= 2 && /^[A-Za-zÀ-ÿ]+(\s[A-Za-zÀ-ÿ]+)*$/.test(nome);
}

function validarEmail(valor) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim());
}

function validarTelefone(valor) {
  const digitos = valor.replace(/\D/g, '');
  return digitos.length === 10 || digitos.length === 11; // fixo (10) ou celular (11)
}

function animarValidacao(elemento, valido) {
  gsap.to(elemento, {
    borderColor: valido ? '#198754' : '#dc3545',
    boxShadow: valido
      ? '0 0 0 0.25rem rgba(25, 135, 84, 0.25)'
      : '0 0 0 0.25rem rgba(220, 53, 69, 0.25)',
    duration: 0.2
  });
}

function limparValidacao(elemento) {
  gsap.set(elemento, { clearProps: 'borderColor,boxShadow' });
}

inputNome.addEventListener('blur', () => {
  animarValidacao(inputNome, validarNome(inputNome.value));
});

inputEmail.addEventListener('blur', () => {
  animarValidacao(inputEmail, validarEmail(inputEmail.value));
});

inputTelefone.addEventListener('blur', () => {
  animarValidacao(inputTelefone, validarTelefone(inputTelefone.value));
});

formulario.addEventListener('submit', function (e) {
  e.preventDefault();

  const nomeValido = validarNome(inputNome.value);
  const emailValido = validarEmail(inputEmail.value);
  const telefoneValido = validarTelefone(inputTelefone.value);

  animarValidacao(inputNome, nomeValido);
  animarValidacao(inputEmail, emailValido);
  animarValidacao(inputTelefone, telefoneValido);

  const valido = nomeValido && emailValido && telefoneValido;

  if (valido) {
    mensagemFeedback.textContent = "✅ Formulário enviado com sucesso! Dados salvos.";
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    mensagemFeedback.style.color = "green";
    formulario.reset();
    [inputNome, inputEmail, inputTelefone].forEach(limparValidacao);
  } else {
    mensagemFeedback.textContent = "❌ Erro: Por favor, preencha todos os campos corretamente antes de enviar.";
    mensagemFeedback.style.color = "red";
  }
});
