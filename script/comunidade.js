// Dados da comunidade
const communityData = {
    userGroups: ['Data Science BR'], // Grupos que o usuário participa
    joinedEvents: [] // Eventos que o usuário confirmou presença
};

// Grupos disponíveis
const groups = [
    {
        id: 1,
        name: 'JavaScript Brasil',
        avatar: 'JS',
        members: 245,
        description: 'Grupo para desenvolvedores JavaScript compartilharem conhecimento e projetos.',
        tags: ['JavaScript', 'Node.js', 'React'],
        joined: false
    },
    {
        id: 2,
        name: 'UX/UX Designers',
        avatar: 'UX',
        members: 189,
        description: 'Comunidade de designers para trocar experiências, portfolios e dicas.',
        tags: ['UI Design', 'UX Research', 'Figma'],
        joined: false
    },
    {
        id: 3,
        name: 'Data Science BR',
        avatar: 'DS',
        members: 156,
        description: 'Discussões sobre Data Science, Machine Learning e análise de dados.',
        tags: ['Python', 'Machine Learning', 'Data Analysis'],
        joined: true
    },
    {
        id: 4,
        name: 'Startup Founders',
        avatar: 'SF',
        members: 98,
        description: 'Rede de empreendedores e fundadores de startups.',
        tags: ['Startups', 'Empreendedorismo', 'Negócios'],
        joined: false
    }
];

// Eventos disponíveis
const events = [
    {
        id: 1,
        title: 'Workshop: Introdução ao React',
        date: '15 Nov, 19:00',
        description: 'Aprenda os conceitos básicos do React com exemplos práticos.',
        location: 'Online',
        duration: '2 horas',
        attending: false
    },
    {
        id: 2,
        title: 'Meetup: Carreira em Tech',
        date: '20 Nov, 14:00',
        description: 'Palestras sobre carreira e networking com profissionais da área.',
        location: 'São Paulo, SP',
        duration: '3 horas',
        attending: false
    },
    {
        id: 3,
        title: 'Hackathon: Soluções para Educação',
        date: '25 Nov, 09:00',
        description: '48h de hackathon para desenvolver soluções inovadoras em educação.',
        location: 'Online',
        duration: '48 horas',
        attending: false
    }
];

// Carregar dados ao iniciar
document.addEventListener('DOMContentLoaded', function() {
    // Carregar grupos que o usuário já participa
    const savedGroups = localStorage.getItem('userGroups');
    if (savedGroups) {
        communityData.userGroups = JSON.parse(savedGroups);
    }
    
    // Carregar eventos confirmados
    const savedEvents = localStorage.getItem('joinedEvents');
    if (savedEvents) {
        communityData.joinedEvents = JSON.parse(savedEvents);
    }
    
    // Atualizar botões dos grupos
    updateGroupButtons();
});

// Funções de grupos
function joinGroup(button, groupName) {
    if (!communityData.userGroups.includes(groupName)) {
        communityData.userGroups.push(groupName);
        button.textContent = 'Participando';
        button.className = 'joined-btn';
        button.onclick = function() { leaveGroup(this, groupName); };
        alert(`Você agora participa do grupo "${groupName}"!`);
        
        // Salvar no localStorage
        localStorage.setItem('userGroups', JSON.stringify(communityData.userGroups));
    }
}

function leaveGroup(button, groupName) {
    if (confirm(`Tem certeza que deseja sair do grupo "${groupName}"?`)) {
        communityData.userGroups = communityData.userGroups.filter(name => name !== groupName);
        button.textContent = 'Participar';
        button.className = 'join-btn';
        button.onclick = function() { joinGroup(this, groupName); };
        
        // Salvar no localStorage
        localStorage.setItem('userGroups', JSON.stringify(communityData.userGroups));
    }
}

function updateGroupButtons() {
    // Esta função atualizaria os botões baseado nos grupos que o usuário já participa
    // Em um app real, isso seria feito no servidor
}

function createGroup() {
    alert('Criar novo grupo - Em desenvolvimento');
}

// Barra de pesquisa
document.querySelector('.search-input').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    
    // Filtrar grupos
    const filteredGroups = groups.filter(group => 
        group.name.toLowerCase().includes(searchTerm) ||
        group.description.toLowerCase().includes(searchTerm) ||
        group.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
    
    // Atualizar exibição (em um app real, faríamos uma nova requisição)
    if (searchTerm) {
        document.getElementById('groupsList').innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="fas fa-search"></i>
                </div>
                <p class="empty-text">Buscando por "${searchTerm}"...</p>
                <p style="font-size: 12px;">(Funcionalidade de busca em desenvolvimento)</p>
            </div>
        `;
    }
});