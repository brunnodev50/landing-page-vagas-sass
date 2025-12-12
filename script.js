// --- Dados Mockados (Simulando uma API) ---
const jobs = [
    {
        id: 1,
        title: "Desenvolvedor Front-end Sênior",
        location: "Remoto",
        type: "Full-time",
        tags: ["React", "TypeScript", "SASS"]
    },
    {
        id: 2,
        title: "Product Designer (UX/UI)",
        location: "São Paulo, SP",
        type: "Híbrido",
        tags: ["Figma", "Design System", "Research"]
    },
    {
        id: 3,
        title: "Engenheiro de Backend",
        location: "Remoto",
        type: "Full-time",
        tags: ["Node.js", "PostgreSQL", "Docker"]
    }
];

// --- Elementos do DOM ---
const jobsContainer = document.getElementById('jobs-container');
const modal = document.getElementById('apply-modal');
const closeModalBtn = document.getElementById('close-modal');
const form = document.getElementById('application-form');
const modalTitle = document.getElementById('modal-job-title');
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('resume');
const fileNameDisplay = document.getElementById('file-name');
const toast = document.getElementById('toast');

// --- Renderização Dinâmica ---
function renderJobs() {
    jobsContainer.innerHTML = jobs.map(job => `
        <article class="job-card">
            <h3>${job.title}</h3>
            <div class="meta">
                <span><i class="ph ph-map-pin"></i> ${job.location}</span>
                <span><i class="ph ph-clock"></i> ${job.type}</span>
            </div>
            <div class="tags">
                ${job.tags.map(tag => `<span>${tag}</span>`).join('')}
            </div>
            <button class="btn btn--outline btn--full" onclick="openModal('${job.title}')">
                Candidatar-se
            </button>
        </article>
    `).join('');
}

// --- Lógica do Modal ---
window.openModal = (jobTitle) => {
    modalTitle.textContent = jobTitle;
    modal.showModal();
    document.body.style.overflow = 'hidden'; // Evita scroll atrás
}

closeModalBtn.addEventListener('click', () => {
    modal.close();
    document.body.style.overflow = 'auto';
});

// Fecha ao clicar fora (backdrop)
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.close();
        document.body.style.overflow = 'auto';
    }
});

// --- File Upload (Drag & Drop + Click) ---
dropZone.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', handleFileSelect);

// Prevenir comportamento padrão de drag
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

// Efeitos visuais de Drag
['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, () => dropZone.classList.add('dragover'), false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, () => dropZone.classList.remove('dragover'), false);
});

dropZone.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    fileInput.files = files; // Atribui ao input real
    handleFileSelect();
}

function handleFileSelect() {
    if (fileInput.files.length > 0) {
        fileNameDisplay.textContent = `Arquivo selecionado: ${fileInput.files[0].name}`;
        dropZone.style.borderColor = 'var(--color-primary)';
    }
}

// --- Submissão do Formulário ---
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simula loading
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Enviando...';
    btn.disabled = true;

    // Simula API delay
    setTimeout(() => {
        modal.close();
        form.reset();
        fileNameDisplay.textContent = '';
        btn.innerHTML = originalText;
        btn.disabled = false;
        document.body.style.overflow = 'auto';
        showToast();
    }, 1500);
});

function showToast() {
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// --- Inicialização ---
document.addEventListener('DOMContentLoaded', renderJobs);