// Dados de exemplo
const demoUsers = [
    {
        email: "usuario@exemplo.com",
        password: "123456",
        name: "Usuário Demo",
        avatar: "U"
    },
    {
        email: "mentor@exemplo.com",
        password: "123456",
        name: "Mentor Demo",
        avatar: "M"
    }
];

// Estado
let currentForm = 'login';
let loginRememberMe = false;
let termsAccepted = false;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Carregar credenciais salvas
    const savedEmail = localStorage.getItem('savedEmail');
    const savedRemember = localStorage.getItem('rememberMe');
    
    if (savedEmail && savedRemember === 'true') {
        document.getElementById('loginEmail').value = savedEmail;
        loginRememberMe = true;
        document.getElementById('loginRememberCheckbox').classList.add('checked');
        document.getElementById('loginRememberCheckbox').querySelector('i').style.display = 'block';
    }
    
    // Event listeners
    document.getElementById('toggleLoginPassword').addEventListener('click', function() {
        togglePasswordVisibility('loginPassword', this);
    });
    
    document.getElementById('toggleRegisterPassword').addEventListener('click', function() {
        togglePasswordVisibility('registerPassword', this);
    });
    
    document.getElementById('loginFormElement').addEventListener('submit', handleLogin);
    document.getElementById('registerFormElement').addEventListener('submit', handleRegister);
    
    // Permitir Enter
    document.getElementById('loginPassword').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') document.getElementById('loginFormElement').dispatchEvent(new Event('submit'));
    });
    
    document.getElementById('registerConfirmPassword').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') document.getElementById('registerFormElement').dispatchEvent(new Event('submit'));
    });
});

// Mostrar formulário
function showForm(formName) {
    // Atualizar tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.form').forEach(form => {
        form.classList.remove('active');
    });
    
    // Ativar nova tab
    document.querySelector(`.tab:nth-child(${formName === 'login' ? 1 : 2})`).classList.add('active');
    document.getElementById(`${formName}Form`).classList.add('active');
    
    currentForm = formName;
    
    // Limpar erros
    hideError();
}

// Mostrar/ocultar senha
function togglePasswordVisibility(inputId, button) {
    const input = document.getElementById(inputId);
    const icon = button.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
    }
}

// Lembrar-me
function toggleRemember(type) {
    if (type === 'login') {
        const checkbox = document.getElementById('loginRememberCheckbox');
        const icon = checkbox.querySelector('i');
        
        loginRememberMe = !loginRememberMe;
        
        if (loginRememberMe) {
            checkbox.classList.add('checked');
            icon.style.display = 'block';
        } else {
            checkbox.classList.remove('checked');
            icon.style.display = 'none';
        }
    }
}

// Termos
function toggleTerms() {
    const checkbox = document.getElementById('termsCheckbox');
    const icon = checkbox.querySelector('i');
    
    termsAccepted = !termsAccepted;
    
    if (termsAccepted) {
        checkbox.classList.add('checked');
        icon.style.display = 'block';
    } else {
        checkbox.classList.remove('checked');
        icon.style.display = 'none';
    }
}

// Login
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    // Validação
    if (!email || !password) {
        showError('Por favor, preencha todos os campos.');
        return;
    }
    
    if (!isValidEmail(email)) {
        showError('Por favor, insira um email válido.');
        return;
    }
    
    showLoading('login', true);
    
    // Simular requisição
    setTimeout(() => {
        const user = demoUsers.find(u => u.email === email && u.password === password);
        
        if (user) {
            handleSuccessfulLogin(user, email);
        } else {
            showLoading('login', false);
            showError('Email ou senha incorretos.');
            shakeForm('loginFormElement');
        }
    }, 1500);
}

// Cadastro
function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    
    // Validação
    if (!name || !email || !password || !confirmPassword) {
        showError('Por favor, preencha todos os campos.');
        return;
    }
    
    if (!isValidEmail(email)) {
        showError('Por favor, insira um email válido.');
        return;
    }
    
    if (password.length < 6) {
        showError('A senha deve ter pelo menos 6 caracteres.');
        return;
    }
    
    if (password !== confirmPassword) {
        showError('As senhas não coincidem.');
        return;
    }
    
    if (!termsAccepted) {
        showError('Você precisa aceitar os termos de serviço.');
        return;
    }
    
    // Verificar se email já existe
    if (demoUsers.some(user => user.email === email)) {
        showError('Este email já está cadastrado.');
        return;
    }
    
    showLoading('register', true);
    
    // Simular cadastro
    setTimeout(() => {
        const newUser = {
            email,
            password,
            name,
            avatar: name.charAt(0).toUpperCase()
        };
        
        // Em um app real, enviaria para o servidor
        // demoUsers.push(newUser); // Não fazemos isso aqui para não modificar a demo
        
        showLoading('register', false);
        
        // Mostrar sucesso
        document.getElementById('registerButton').innerHTML = `
            <i class="fas fa-check"></i>
            <span>Conta criada com sucesso!</span>
        `;
        document.getElementById('registerButton').style.background = '#436BD9';
        
        // Auto-login após cadastro
        setTimeout(() => {
            handleSuccessfulLogin(newUser, email);
        }, 1000);
    }, 2000);
}

// Login bem-sucedido
function handleSuccessfulLogin(user, email) {
    const userData = {
        ...user,
        loggedIn: true,
        loginTime: new Date().toISOString(),
        isNewUser: currentForm === 'register'
    };
    
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    // Salvar credenciais se "Lembrar-me" estiver marcado
    if (loginRememberMe) {
        localStorage.setItem('savedEmail', email);
        localStorage.setItem('rememberMe', 'true');
    } else {
        localStorage.removeItem('savedEmail');
        localStorage.removeItem('rememberMe');
    }
    
    // Redirecionar
    setTimeout(() => {
        window.location.href = 'home.html';
    }, 1000);
}

// Utilitários
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    
    errorText.textContent = message;
    errorDiv.style.display = 'flex';
    
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

function hideError() {
    document.getElementById('errorMessage').style.display = 'none';
}

function showLoading(formType, show) {
    const loadingDiv = document.getElementById(`${formType}Loading`);
    const button = document.getElementById(`${formType}Button`);
    
    if (show) {
        loadingDiv.style.display = 'flex';
        button.style.display = 'none';
    } else {
        loadingDiv.style.display = 'none';
        button.style.display = 'flex';
    }
}

function shakeForm(formId) {
    const form = document.getElementById(formId);
    form.classList.add('shake');
    setTimeout(() => form.classList.remove('shake'), 500);
}

// Modal de recuperação (mesmo código do exemplo anterior)
function openForgotModal() {
    // Implementação simplificada
    const email = prompt('Digite seu email para recuperação:');
    if (email && isValidEmail(email)) {
        alert(`Link de recuperação enviado para: ${email}`);
    }
}

// Login social (simulado)
function loginWithGoogle() {
    alert('Login com Google - Em desenvolvimento\n\nUse: usuario@exemplo.com / 123456');
    document.getElementById('loginEmail').value = 'usuario@exemplo.com';
    document.getElementById('loginPassword').value = '123456';
}

function loginWithFacebook() {
    alert('Login com Facebook - Em desenvolvimento\n\nUse: mentor@exemplo.com / 123456');
    document.getElementById('loginEmail').value = 'mentor@exemplo.com';
    document.getElementById('loginPassword').value = '123456';
}

// Adicionar animação de shake
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    .shake {
        animation: shake 0.5s ease-in-out;
    }
`;
document.head.appendChild(style);

// Estilos para modal (simplificado)
const modalStyle = document.createElement('style');
modalStyle.textContent = `
    .modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        z-index: 1000;
        align-items: center;
        justify-content: center;
        padding: 20px;
    }
    
    .modal-content {
        background: white;
        border-radius: 16px;
        padding: 25px;
        width: 100%;
        max-width: 400px;
    }
    
    .modal-title {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 10px;
        color: #333;
    }
    
    .modal-text {
        color: #666;
        font-size: 14px;
        line-height: 1.5;
        margin-bottom: 20px;
    }
    
    .modal-actions {
        display: flex;
        gap: 10px;
        margin-top: 20px;
    }
    
    .btn-secondary {
        background: #f5f5f5;
        color: #333;
        border: 1px solid #ddd;
    }
`;
document.head.appendChild(modalStyle);