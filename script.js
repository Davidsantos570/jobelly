// ===== MENU MOBILE =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainMenu = document.getElementById('mainMenu');
const logoImg = document.getElementById('logoImg');

if (mobileMenuBtn && mainMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mainMenu.classList.toggle('active');
        mobileMenuBtn.innerHTML = mainMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            mainMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// ===== HEADER SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            if (logoImg) logoImg.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
            if (logoImg) logoImg.classList.remove('scrolled');
        }
    }
    
    // Ativar link do menu conforme scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== ANIMAÇÃO AO SCROLL =====
const animateElements = document.querySelectorAll('.animate-on-scroll');

const animateOnScroll = () => {
    animateElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
};

// Verificar animação ao carregar e ao scroll
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// ===== CONTADORES ANIMADOS =====
const statNumbers = document.querySelectorAll('.stat-number');
let animated = false;

const animateStats = () => {
    if (animated) return;
    
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    const sectionTop = heroSection.getBoundingClientRect().top;
    if (sectionTop < window.innerHeight - 100) {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + (stat.getAttribute('data-count') === '7' ? '+' : '+');
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 20);
        });
        
        animated = true;
    }
};

window.addEventListener('scroll', animateStats);

// ===== FILTRO PORTFÓLIO =====
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

if (filterButtons.length > 0 && portfolioItems.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adicionar active ao botão clicado
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===== FORMULÁRIO DE ORÇAMENTO COM RADIO BUTTONS =====
const budgetForm = document.getElementById('budgetForm');
if (budgetForm) {
    budgetForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const description = document.getElementById('description').value;
        
        // Capturar o valor do radio button selecionado
        let serviceValue = '';
        const serviceRadios = document.querySelectorAll('input[name="service"]');
        serviceRadios.forEach(radio => {
            if (radio.checked) {
                serviceValue = radio.value;
            }
        });
        
        // Validar se um serviço foi selecionado
        if (!serviceValue) {
            alert('Por favor, selecione um serviço de interesse!');
            return;
        }
        
        // Formatar mensagem para WhatsApp
        const message = `*SOLICITAÇÃO DE ORÇAMENTO - JOBELLY BORDADOS*%0A%0A` +
                       `*Nome:* ${name}%0A` +
                       `*Telefone:* ${phone}%0A` +
                       `*E-mail:* ${email}%0A` +
                       `*Serviço de Interesse:* ${serviceValue}%0A` +
                       `*Descrição do Projeto:*%0A${description}%0A%0A` +
                       `_Esta mensagem foi enviada através do site_`;
        
        // Redirecionar para WhatsApp
        window.open(`https://wa.me/5511964639260?text=${message}`, '_blank');
        
        // Limpar formulário
        this.reset();
        
        // Mostrar mensagem de sucesso
        alert('Você será redirecionado para o WhatsApp para finalizar a solicitação do orçamento!');
    });
}

// ===== FORMULÁRIO DE CONTATO =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simular envio do formulário
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        
        // Limpar formulário
        this.reset();
    });
}

// ===== ANIMAÇÃO INICIAL =====
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar classe visible aos elementos do hero
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('visible');
        }
    }, 300);
    
    // Adicionar efeito de hover nos radio buttons
    const radioLabels = document.querySelectorAll('.radio-group label');
    radioLabels.forEach(label => {
        label.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(211, 47, 47, 0.1)';
        });
        
        label.addEventListener('mouseleave', function() {
            const radio = this.querySelector('input[type="radio"]');
            if (!radio.checked) {
                this.style.backgroundColor = '';
            }
        });
        
        // Quando clicar em um radio button
        const radio = label.querySelector('input[type="radio"]');
        if (radio) {
            radio.addEventListener('change', function() {
                // Remover destaque de todos
                radioLabels.forEach(l => {
                    l.style.backgroundColor = '';
                    l.style.fontWeight = '500';
                });
                
                // Destacar o selecionado
                if (this.checked) {
                    const parentLabel = this.closest('label');
                    parentLabel.style.backgroundColor = 'rgba(211, 47, 47, 0.15)';
                    parentLabel.style.fontWeight = '600';
                }
            });
        }
    });
});

// ===== SCROLL SUAVE =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') return;
        
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});