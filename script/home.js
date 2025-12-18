// Dados do usuário (simulação)
const userData = {
    name: localStorage.getItem('userName') || '',
    skills: JSON.parse(localStorage.getItem('userSkills')) || ['JavaScript', 'HTML/CSS'],
    interests: JSON.parse(localStorage.getItem('userInterests')) || ['React', 'UI/UX Design']
};

// Dados de exemplo para matches
const sampleMatches = [
    {
        name: "Ana Lúcia",
        skills: ["Design UI/UX", "Figma", "Photoshop"],
        matchScore: 85
    },
    {
        name: "Carlos Mendes",
        skills: ["JavaScript", "React", "Node.js"],
        matchScore: 78
    },
    {
        name: "Roberto Alves",
        skills: ["Python", "Data Science", "SQL"],
        matchScore: 72
    },
    {
        name: "Fernanda Costa",
        skills: ["Marketing Digital", "Gestão", "Copywriting"],
        matchScore: 65
    }
];

// Carregar dados ao iniciar
document.addEventListener('DOMContentLoaded', function() {
    // Se não tem perfil completo, mostrar mensagem
    if (!userData.name) {
        document.getElementById('matchesContainer').innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="fas fa-user-plus"></i>
                </div>
                <p class="empty-text">Complete seu perfil para ver sugestões personalizadas</p>
                <a href="perfil.html" class="btn">Completar Perfil</a>
            </div>
        `;
    }
});

// Função para calcular matches (simplificada)
function calculateMatches() {
    // Esta função seria mais complexa em um app real
    return sampleMatches;
}