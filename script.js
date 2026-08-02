document.documentElement.classList.add('js');

const toggle = document.querySelector('.lang-toggle');
const cvLink = document.querySelector('[data-cv-link]');
const caseToggles = document.querySelectorAll('[data-case-toggle]');
let language = 'es';

function updateCaseToggleText(button) {
  const expanded = button.getAttribute('aria-expanded') === 'true';
  const key = expanded
    ? (language === 'es' ? 'hideEs' : 'hideEn')
    : (language === 'es' ? 'showEs' : 'showEn');
  button.textContent = button.dataset[key];
}

function setLanguage(next) {
  language = next;
  document.documentElement.lang = next;
  document.querySelectorAll('[data-es][data-en]').forEach((node) => {
    node.textContent = node.dataset[next];
  });
  toggle.querySelectorAll('span').forEach((item) => {
    item.classList.toggle('active', item.textContent.toLowerCase() === next);
  });
  cvLink.href = next === 'es' ? 'Brayner_Azofeifa_CV_ES_2026-08-02.pdf' : 'Brayner_Azofeifa_CV_EN_2026-08-02.pdf';
  document.title = next === 'es' ? 'Brayner Azofeifa | Licenciado en Ingeniería de Sistemas' : 'Brayner Azofeifa | Systems Engineer';
  caseToggles.forEach(updateCaseToggleText);
}

caseToggles.forEach((button) => {
  const card = button.closest('.case-card');
  const target = document.getElementById(button.getAttribute('aria-controls'));
  if (!card || !target) return;

  card.classList.remove('is-expanded');
  button.setAttribute('aria-expanded', 'false');
  updateCaseToggleText(button);

  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    const nextExpanded = !expanded;
    button.setAttribute('aria-expanded', String(nextExpanded));
    card.classList.toggle('is-expanded', nextExpanded);
    updateCaseToggleText(button);
  });
});

toggle.addEventListener('click', () => setLanguage(language === 'es' ? 'en' : 'es'));
document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((node) => observer.observe(node));
