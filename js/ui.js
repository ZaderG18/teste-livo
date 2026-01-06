document.addEventListener('DOMContentLoaded', () => {
  
  // 1. LÓGICA DO OLHINHO (Show/Hide Password)
  const toggleBtns = document.querySelectorAll('.toggle-pass');
  
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling; // O input vem antes do botão
      const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
      input.setAttribute('type', type);
      
      // Opcional: Trocar o ícone (aqui simplificado apenas mudando opacidade)
      btn.style.opacity = type === 'text' ? '1' : '0.5';
    });
  });

  // 2. LÓGICA DE LOGIN + TOAST
  const loginForm = document.querySelector('.login-card');
  const btn = document.querySelector('.livo-btn');

  if(loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Estado de Loading
      btn.classList.add('is-loading');
      
      // Simula requisição
      setTimeout(() => {
        btn.classList.remove('is-loading');
        
        // Simulação: Se o email tiver "@livo", sucesso. Senão, erro.
        const email = document.getElementById('email').value;
        
        if(email.includes('@livo')) {
           showToast('Login realizado com sucesso! Redirecionando...', 'success');
        } else {
           showToast('Falha na autenticação. Verifique seus dados.', 'error');
           // Mostra aquele alerta vermelho do form também, se quiser
           document.querySelector('.form-alert').style.display = 'block';
        }
      }, 1500);
    });
  }
});

// FUNÇÃO GERADORA DE TOASTS
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  
  const toast = document.createElement('div');
  toast.className = `livo-toast livo-toast--${type}`;
  
  // Ícones simples baseados no tipo
  const icon = type === 'success' ? '✓' : '✕';
  
  toast.innerHTML = `
    <span class="icon" style="font-weight:bold; font-size:1.2rem">${icon}</span>
    <span>${message}</span>
  `;
  
  container.appendChild(toast);
  
  // Remove automaticamente após 4 segundos
  setTimeout(() => {
    toast.classList.add('hiding');
    toast.addEventListener('animationend', () => toast.remove());
  }, 4000);
}
// LÓGICA DO MODAL
const modal = document.getElementById('forgot-modal');
const forgotBtn = document.querySelector('.forgot-link');

// Abrir Modal
if(forgotBtn) {
    forgotBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleModal(true);
    });
}

// Fechar ao clicar fora
if(modal) {
    modal.addEventListener('click', (e) => {
        if(e.target === modal) toggleModal(false);
    });
}

function toggleModal(show) {
    if(show) {
        modal.classList.add('is-open');
    } else {
        modal.classList.remove('is-open');
    }
}

// LÓGICA DE RECUPERAÇÃO (Simulada)
function handleRecover(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    
    // Loading
    btn.classList.add('is-loading');
    
    setTimeout(() => {
        btn.classList.remove('is-loading');
        toggleModal(false); // Fecha o modal
        showToast('Link de recuperação enviado! Verifique seu email.', 'success');
    }, 1500);
}