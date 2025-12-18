// Dados de conexões
const connectionsData = [
    {
        id: 1,
        name: "Ana Lúcia",
        title: "UI/UX Designer",
        skills: ["Figma", "Adobe XD", "Prototipagem", "Design Thinking"],
        match: 92,
        status: "online",
        avatar: "A"
    },
    {
        id: 2,
        name: "Carlos Mendes",
        title: "Front-end Developer",
        skills: ["JavaScript", "React", "Vue.js", "TypeScript"],
        match: 88,
        status: "online",
        avatar: "C"
    },
    {
        id: 3,
        name: "Roberto Alves",
        title: "Data Scientist",
        skills: ["Python", "Machine Learning", "SQL", "Pandas"],
        match: 85,
        status: "offline",
        avatar: "R"
    },
    {
        id: 4,
        name: "Fernanda Costa",
        title: "Marketing Digital",
        skills: ["SEO", "Google Ads", "Redes Sociais", "Copywriting"],
        match: 79,
        status: "online",
        avatar: "F"
    },
    {
        id: 5,
        name: "Marcos Silva",
        title: "Back-end Developer",
        skills: ["Node.js", "Python", "MongoDB", "APIs"],
        match: 76,
        status: "offline",
        avatar: "M"
    },
    {
        id: 6,
        name: "Juliana Santos",
        title: "Product Manager",
        skills: ["Scrum", "Product Strategy", "User Research", "Roadmap"],
        match: 72,
        status: "online",
        avatar: "J"
    }
];

// Carregar conexões
document.addEventListener('DOMContentLoaded', function() {
    loadConnections();
    
    // Adicionar eventos aos filtros
    document.getElementById('sortBy').addEventListener('change', loadConnections);
    document.getElementById('skillFilter').addEventListener('change', loadConnections);
});

function loadConnections() {
    const sortBy = document.getElementById('sortBy').value;
    const skillFilter = document.getElementById('skillFilter').value;
    
    // Filtrar conexões
    let filteredConnections = [...connectionsData];
    
    if (skillFilter) {
        filteredConnections = filteredConnections.filter(conn => 
            conn.skills.some(skill => 
                skill.toLowerCase().includes(skillFilter.toLowerCase())
            )
        );
    }
    
    // Ordenar conexões
    if (sortBy === 'match') {
        filteredConnections.sort((a, b) => b.match - a.match);
    } else if (sortBy === 'name') {
        filteredConnections.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'recent') {
        // Simulação de ordenação por mais recentes
        filteredConnections.sort((a, b) => b.id - a.id);
    }
    
    displayConnections(filteredConnections);
}

function displayConnections(connections) {
    const container = document.getElementById('connectionsList');
    
    if (connections.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="fas fa-user-friends"></i>
                </div>
                <p class="empty-text">Nenhuma conexão encontrada com os filtros selecionados.</p>
                <button class="action-btn connect-btn" onclick="resetFilters()">
                    Limpar Filtros
                </button>
            </div>
        `;
        return;
    }
    
    let html = '';
    
    connections.forEach(conn => {
        const statusColor = conn.status === 'online' ? '#4CAF50' : '#757575';
        
        html += `
            <div class="connection-card">
                <div class="connection-header">
                    <div class="connection-user">
                        <div class="user-avatar" style="background: linear-gradient(135deg, ${conn.status === 'online' ? '#4CAF50' : '#757575'}, ${conn.status === 'online' ? '#2E7D32' : '#424242'});">
                            ${conn.avatar}
                        </div>
                        <div class="user-info">
                            <div class="user-name">${conn.name}</div>
                            <div class="user-title">${conn.title}</div>
                            <div class="user-match">${conn.match}% match</div>
                        </div>
                    </div>
                    <div style="color: ${statusColor}; font-size: 12px;">
                        <i class="fas fa-circle"></i> ${conn.status === 'online' ? 'Online' : 'Offline'}
                    </div>
                </div>
                
                <div class="connection-skills">
                    <div class="skills-title">Habilidades:</div>
                    <div class="skills-tags">
                        ${conn.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                </div>
                
                <div class="connection-actions">
                    <button class="action-btn connect-btn" onclick="connectWith('${conn.name}')">
                        <i class="fas fa-user-plus"></i> Conectar
                    </button>
                    <button class="action-btn message-btn" onclick="messageTo('${conn.name}')">
                        <i class="fas fa-comment"></i> Mensagem
                    </button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function resetFilters() {
    document.getElementById('sortBy').value = 'match';
    document.getElementById('skillFilter').value = '';
    loadConnections();
}

function connectWith(userName) {
    alert(`Solicitação de conexão enviada para ${userName}!`);
}

function messageTo(userName) {
    alert(`Abrindo chat com ${userName}...`);
}