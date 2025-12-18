// Dados das mentorias
const mentorshipData = {
    isMentor: false,
    activeMentorships: [
        {
            mentor: 'Roberto Alves',
            topic: 'Transição para Data Science',
            startDate: '01/11/2023',
            nextSession: '20/11/2023, 18:00',
            status: 'active'
        }
    ],
    mentorApplications: []
};

// Carregar dados ao iniciar
document.addEventListener('DOMContentLoaded', function() {
    const savedData = localStorage.getItem('mentorshipData');
    if (savedData) {
        Object.assign(mentorshipData, JSON.parse(savedData));
    }
    
    // Verificar se usuário é mentor
    if (mentorshipData.isMentor) {
        document.getElementById('becomeMentorBtn').click();
    }
});

// Alternar entre buscar/fornecer mentoria
function showSeekMentor() {
    document.getElementById('seekMentorSection').style.display = 'block';
    document.getElementById('becomeMentorSection').style.display = 'none';
    
    document.getElementById('seekMentorBtn').classList.add('active');
    document.getElementById('becomeMentorBtn').classList.remove('active');
}

function showBecomeMentor() {
    document.getElementById('seekMentorSection').style.display = 'none';
    document.getElementById('becomeMentorSection').style.display = 'block';
    
    document.getElementById('seekMentorBtn').classList.remove('active');
    document.getElementById('becomeMentorBtn').classList.add('active');
}

// Funções de mentoria
function requestMentorship(mentorName) {
    if (confirm(`Solicitar mentoria com ${mentorName}?`)) {
        alert(`Solicitação enviada para ${mentorName}! Ele(a) entrará em contato em breve.`);
        
        // Simular adição à lista de mentorias
        mentorshipData.activeMentorships.push({
            mentor: mentorName,
            topic: 'Nova mentoria',
            startDate: new Date().toLocaleDateString('pt-BR'),
            nextSession: 'A combinar',
            status: 'pending'
        });
        
        // Salvar dados
        localStorage.setItem('mentorshipData', JSON.stringify(mentorshipData));
        
        // Atualizar exibição
        updateMyMentorships();
    }
}

function viewProfile(mentorName) {
    alert(`Perfil de ${mentorName} - Em desenvolvimento`);
}

function scheduleNew() {
    alert('Agendar nova mentoria - Em desenvolvimento');
}

function startMentorApplication() {
    const userProfile = JSON.parse(localStorage.getItem('conectaProfile') || '{}');
    
    if (!userProfile.name || userProfile.skills.length === 0) {
        alert('Complete seu perfil primeiro antes de se inscrever como mentor!');
        window.location.href = 'perfil.html';
        return;
    }
    
    if (confirm('Iniciar inscrição como mentor? Você precisará fornecer informações sobre suas áreas de expertise, disponibilidade e valores.')) {
        alert('Formulário de inscrição como mentor - Em desenvolvimento\n\nEm um app real, aqui abriria um formulário completo para cadastro como mentor.');
        
        // Simular cadastro como mentor
        mentorshipData.isMentor = true;
        localStorage.setItem('mentorshipData', JSON.stringify(mentorshipData));
        
        // Atualizar visualização
        showBecomeMentor();
    }
}

function updateMyMentorships() {
    // Em um app real, atualizaria a lista de mentorias
    const container = document.getElementById('myMentorships');
    if (mentorshipData.activeMentorships.length > 0) {
        // Mostrar mentorias ativas
    }
}

// Salvar dados ao sair
window.addEventListener('beforeunload', function() {
    localStorage.setItem('mentorshipData', JSON.stringify(mentorshipData));
});