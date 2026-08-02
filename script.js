const toggle = document.querySelector('.lang-toggle');
const cvLink = document.querySelector('[data-cv-link]');
let language = 'es';

function setLanguage(next) {
  language = next;
  document.documentElement.lang = next;
  document.querySelectorAll('[data-es][data-en]').forEach((node) => {
    node.textContent = node.dataset[next];
  });
  toggle.querySelectorAll('span').forEach((item) => {
    item.classList.toggle('active', item.textContent.toLowerCase() === next);
  });
  cvLink.href = next === 'es' ? 'Brayner_Azofeifa_CV_ES.pdf' : 'Brayner_Azofeifa_CV_EN.pdf';
  document.title = next === 'es' ? 'Brayner Azofeifa | Licenciado en Ingeniería de Sistemas' : 'Brayner Azofeifa | Systems Engineer';
}

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
