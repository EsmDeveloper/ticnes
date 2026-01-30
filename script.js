// script.js - JavaScript puro para funcionalidades premium

document.addEventListener('DOMContentLoaded', function() {
    // Elementos principais
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const navMobile = document.getElementById('navMobile');
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Header scroll effect
    function handleScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Menu mobile toggle
    function toggleMobileMenu() {
        navMobile.classList.toggle('active');
        document.body.style.overflow = navMobile.classList.contains('active') ? 'hidden' : '';
    }
    
    // Fechar menu ao clicar em link
    function closeMobileMenu() {
        navMobile.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Validação de formulário
    function validateForm(formData) {
        const errors = [];
        
        // Validar nome
        if (!formData.name.trim()) {
            errors.push('Nome é obrigatório');
        }
        
        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            errors.push('Email inválido');
        }
        
        // Validar interesse
        if (!formData.interest) {
            errors.push('Selecione um interesse');
        }
        
        // Validar mensagem
        if (!formData.message.trim()) {
            errors.push('Mensagem é obrigatória');
        }
        
        return errors;
    }
    
    // Formatar dados do formulário
    function formatFormData(form) {
        return {
            name: form.querySelector('#name').value,
            email: form.querySelector('#email').value,
            company: form.querySelector('#company').value,
            interest: form.querySelector('#interest').value,
            message: form.querySelector('#message').value
        };
    }
    
    // Enviar formulário
    function handleFormSubmit(event) {
        event.preventDefault();
        
        const formData = formatFormData(contactForm);
        const errors = validateForm(formData);
        
        // Limpar feedback anterior
        formFeedback.className = 'form-feedback';
        formFeedback.textContent = '';
        
        if (errors.length > 0) {
            // Mostrar erros
            formFeedback.classList.add('error');
            formFeedback.textContent = errors.join(', ');
            formFeedback.style.display = 'block';
            
            // Focar no primeiro campo com erro
            if (!formData.name.trim()) {
                contactForm.querySelector('#name').focus();
            } else if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                contactForm.querySelector('#email').focus();
            } else if (!formData.interest) {
                contactForm.querySelector('#interest').focus();
            } else {
                contactForm.querySelector('#message').focus();
            }
            
            return;
        }
        
        // Simular envio (em produção, seria uma chamada fetch)
        formFeedback.classList.add('success');
        formFeedback.textContent = 'Mensagem enviada com sucesso! Entraremos em contacto em breve.';
        formFeedback.style.display = 'block';
        
        // Reset do formulário após 3 segundos
        setTimeout(() => {
            contactForm.reset();
            formFeedback.style.display = 'none';
            formFeedback.className = 'form-feedback';
        }, 3000);
    }
    
    // Animações de scroll suave para seções
    function initSmoothScroll() {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId.startsWith('#')) {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        // Fechar menu mobile se aberto
                        closeMobileMenu();
                        
                        // Scroll suave
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
    
    // Animar elementos ao entrar na viewport
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);
        
        // Observar elementos para animação
        const animatedElements = document.querySelectorAll('.manifesto-block, .servico-card, .solucao-block, .formacao-card, .conteudo-card');
        animatedElements.forEach(el => observer.observe(el));
    }
    
    // Inicializar label flutuante do formulário
    function initFloatingLabels() {
        const formGroups = document.querySelectorAll('.form-group');
        
        formGroups.forEach(group => {
            const input = group.querySelector('input, select, textarea');
            const label = group.querySelector('label');
            
            if (input && label) {
                // Verificar se já tem valor (útil para recarregamento)
                if (input.value) {
                    label.style.top = '-0.5rem';
                    label.style.fontSize = '0.875rem';
                    label.style.color = 'var(--color-primary)';
                }
                
                // Adicionar eventos
                input.addEventListener('focus', () => {
                    label.style.top = '-0.5rem';
                    label.style.fontSize = '0.875rem';
                    label.style.color = 'var(--color-primary)';
                });
                
                input.addEventListener('blur', () => {
                    if (!input.value) {
                        label.style.top = '1rem';
                        label.style.fontSize = '1rem';
                        label.style.color = 'var(--color-text-secondary)';
                    }
                });
            }
        });
    }
    
    // Efeito parallax sutil no hero
    function initParallax() {
        const heroVisual = document.querySelector('.hero-visual');
        if (!heroVisual) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.1;
            
            heroVisual.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Inicializar tudo
    function init() {
        // Event listeners
        window.addEventListener('scroll', handleScroll);
        menuToggle.addEventListener('click', toggleMobileMenu);
        menuClose.addEventListener('click', closeMobileMenu);
        
        if (contactForm) {
            contactForm.addEventListener('submit', handleFormSubmit);
        }
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (navMobile.classList.contains('active') && 
                !e.target.closest('.nav-mobile') && 
                !e.target.closest('.menu-toggle')) {
                closeMobileMenu();
            }
        });
        
        // Inicializar funcionalidades
        initSmoothScroll();
        initScrollAnimations();
        initFloatingLabels();
        initParallax();
        
        // Trigger inicial
        handleScroll();
    }
    
    // Iniciar quando o DOM estiver pronto
    init();
});