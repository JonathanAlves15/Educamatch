// Dados do perfil
let userProfile = {
    name: '',
    title: '',
    about: '',
    skills: ['JavaScript', 'HTML/CSS', 'Git'],
    interests: ['React', 'UI/UX Design', 'Node.js'],
    connections: 0,
    projects: 0,
    mentors: 0
};

// Estado de edição
let editingSkills = false;
let editingInterests = false;
let currentEdit = '';

// Carregar dados ao iniciar
document.addEventListener('DOMContentLoaded', function() {
    loadProfile();
    updateProfileDisplay();
});

// Carregar perfil do localStorage
function loadProfile() {
    const savedProfile = localStorage.getItem('conectaProfile');
    if (savedProfile) {
        userProfile = JSON.parse(savedProfile);
    } else {
        // Dados padrão
        userProfile = {
            name: 'Usuário',
            title: 'Estudante/Profissional',
            about: 'Adicione uma descrição sobre você, seus objetivos e como você gosta de aprender...',
            skills: ['JavaScript', 'HTML/CSS', 'Git'],
            interests: ['React', 'UI/UX Design', 'Node.js'],
            connections: 5,
            projects: 2,
            mentors: 1
        };
    }
}

// Atualizar exibição do perfil
function updateProfileDisplay() {
    // Atualizar avatar com primeira letra do nome
    if (userProfile.name) {
        document.getElementById('profileAvatar').textContent = userProfile.name.charAt(0).toUpperCase();
    }
    
    document.getElementById('profileName').textContent = userProfile.name;
    document.getElementById('profileTitle').textContent = userProfile.title;
    document.getElementById('aboutText').textContent = userProfile.about;
    document.getElementById('connectionsCount').textContent = userProfile.connections;
    document.getElementById('projectsCount').textContent = userProfile.projects;
    document.getElementById('mentorsCount').textContent = userProfile.mentors;
    
    // Atualizar habilidades
    const skillsContainer = document.getElementById('skillsContainer');
    skillsContainer.innerHTML = '';
    userProfile.skills.forEach(skill => {
        const skillTag = document.createElement('div');
        skillTag.className = 'tag';
        skillTag.innerHTML = `
            ${skill}
            ${editingSkills ? `<button class="tag-remove" onclick="removeSkill('${skill}')"><i class="fas fa-times"></i></button>` : ''}
        `;
        skillsContainer.appendChild(skillTag);
    });
    
    // Atualizar interesses
    const interestsContainer = document.getElementById('interestsContainer');
    interestsContainer.innerHTML = '';
    userProfile.interests.forEach(interest => {
        const interestTag = document.createElement('div');
        interestTag.className = 'tag';
        interestTag.innerHTML = `
            ${interest}
            ${editingInterests ? `<button class="tag-remove" onclick="removeInterest('${interest}')"><i class="fas fa-times"></i></button>` : ''}
        `;
        interestsContainer.appendChild(interestTag);
    });
    
    // Mostrar/ocultar campos de adição
    document.getElementById('skillInputContainer').style.display = editingSkills ? 'flex' : 'none';
    document.getElementById('interestInputContainer').style.display = editingInterests ? 'flex' : 'none';
}

// Funções de edição
function editAbout() {
    currentEdit = 'about';
    document.getElementById('modalTitle').textContent = 'Editar Sobre Mim';
    document.getElementById('modalContent').innerHTML = `
        <textarea class="modal-textarea" id="editAboutText">${userProfile.about}</textarea>
    `;
    document.getElementById('editModal').style.display = 'flex';
}

function editSkills() {
    editingSkills = !editingSkills;
    updateProfileDisplay();
}

function editInterests() {
    editingInterests = !editingInterests;
    updateProfileDisplay();
}

function addSkill() {
    const input = document.getElementById('newSkillInput');
    const skill = input.value.trim();
    
    if (skill && !userProfile.skills.includes(skill)) {
        userProfile.skills.push(skill);
        updateProfileDisplay();
        saveProfile();
        input.value = '';
        input.focus();
    }
}

function removeSkill(skill) {
    userProfile.skills = userProfile.skills.filter(s => s !== skill);
    updateProfileDisplay();
    saveProfile();
}

function addInterest() {
    const input = document.getElementById('newInterestInput');
    const interest = input.value.trim();
    
    if (interest && !userProfile.interests.includes(interest)) {
        userProfile.interests.push(interest);
        updateProfileDisplay();
        saveProfile();
        input.value = '';
        input.focus();
    }
}

function removeInterest(interest) {
    userProfile.interests = userProfile.interests.filter(i => i !== interest);
    updateProfileDisplay();
    saveProfile();
}

function openSettings() {
    alert('Configurações - Em desenvolvimento');
}

function closeModal() {
    document.getElementById('editModal').style.display = 'none';
}

function saveChanges() {
    if (currentEdit === 'about') {
        userProfile.about = document.getElementById('editAboutText').value;
        updateProfileDisplay();
        saveProfile();
    }
    closeModal();
}

function saveProfile() {
    localStorage.setItem('conectaProfile', JSON.stringify(userProfile));
    alert('Perfil salvo com sucesso!');
}

function findConnections() {
    // Salvar perfil primeiro
    saveProfile();
    // Redirecionar para conexões
    window.location.href = 'conexoes.html';
}

function shareProfile() {
    if (navigator.share) {
        navigator.share({
            title: `Perfil de ${userProfile.name}`,
            text: `Conheça meu perfil no Educamatch!`,
            url: window.location.href
        });
    } else {
        alert('Link do perfil copiado! Compartilhe manualmente.');
    }
}

// Permitir Enter para adicionar skills/interesses
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        if (editingSkills && document.getElementById('newSkillInput').value.trim()) {
            addSkill();
        } else if (editingInterests && document.getElementById('newInterestInput').value.trim()) {
            addInterest();
        }
    }
});