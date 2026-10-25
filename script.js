// Compartilha a preferência de movimento entre as animações do tema e da rolagem.
const reducedMotionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

// Atualiza o resultado educativo conforme o valor e o momento da medição.
const glicemiaInput = document.getElementById('glicemia');
const glicemiaStatus = document.getElementById('glicemia-status');
const glicemiaChip = document.getElementById('glicemia-chip');
const radiosMedida = document.querySelectorAll('input[name="medida-glicemia"]');
const glicemiaPanel = document.querySelector('.mini-panel');

const definirChip = (mensagem, classe) => {
    glicemiaStatus.textContent = mensagem;
    glicemiaChip.textContent = classe.texto;
    glicemiaChip.className = `chip ${classe.nome}`;
    glicemiaPanel.dataset.state = classe.nome.replace('chip-', '');

    glicemiaStatus.classList.remove('is-updating');
    void glicemiaStatus.offsetWidth;
    glicemiaStatus.classList.add('is-updating');
};

function obterTempoSelecionado() {
    const radioSelecionado = document.querySelector('input[name="medida-glicemia"]:checked');
    return radioSelecionado ? radioSelecionado.value : 'antes';
}

function atualizarStatusDaGlicemia() {
    const valor = glicemiaInput.valueAsNumber;
    const tempo = obterTempoSelecionado();

    if (!Number.isFinite(valor)) {
        definirChip('Digite um valor para avaliar a glicemia.', {
            texto: 'Valores variam',
            nome: 'chip-adequado'
        });
        return;
    }

    if (valor < 70) {
        definirChip('Atenção para risco de hipoglicemia. A glicemia está abaixo de 70 mg/dL.', {
            texto: '⚠ Abaixo',
            nome: 'chip-critico'
        });
        return;
    }

    if (tempo === 'depois') {
        if (valor >= 180) {
            definirChip('Acima da faixa de referência sugerida para adultos com DM1 após as refeições. Converse com a sua equipe de saúde.', {
                texto: '⚠ Acima',
                nome: 'chip-alerta'
            });
            return;
        }

        definirChip('Valor dentro da faixa de referência para muitos adultos com DM1 após as refeições (<180 mg/dL).', {
            texto: '✓ Adequado',
            nome: 'chip-adequado'
        });
        return;
    }

    if (valor > 130) {
        definirChip('Acima da faixa de referência para muitos adultos com DM1 antes das refeições. Esse valor pode exigir avaliação da sua equipe.', {
            texto: '⚠ Acima',
            nome: 'chip-alerta'
        });
        return;
    }

    definirChip('Dentro da faixa de referência para muitos adultos com DM1 antes das refeições (70–130 mg/dL).', {
        texto: '✓ Adequado',
        nome: 'chip-adequado'
    });
}

if (glicemiaInput && glicemiaStatus && glicemiaChip && glicemiaPanel) {
    let valorAntesDaEdicao = '';

    glicemiaInput.addEventListener('focus', () => {
        valorAntesDaEdicao = glicemiaInput.value;
        glicemiaInput.value = '';
        atualizarStatusDaGlicemia();
    });

    glicemiaInput.addEventListener('blur', () => {
        if (!glicemiaInput.value && valorAntesDaEdicao) {
            glicemiaInput.value = valorAntesDaEdicao;
            atualizarStatusDaGlicemia();
        }
    });

    glicemiaInput.addEventListener('input', atualizarStatusDaGlicemia);
    radiosMedida.forEach((radio) => radio.addEventListener('change', atualizarStatusDaGlicemia));
    atualizarStatusDaGlicemia();
}

// Atualiza o ano do rodapé sem deixar uma data fixa no HTML.
const yearElement = document.getElementById('year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Em telas estreitas, recolhe apenas o parágrafo complementar para priorizar o início.
const heroMore = document.querySelector('.hero-more');
if (heroMore) {
    const compactScreen = window.matchMedia('(max-width: 680px)');
    const syncHeroMore = () => {
        heroMore.open = !compactScreen.matches;
    };

    syncHeroMore();
    compactScreen.addEventListener('change', syncHeroMore);
}

// Usa o tema salvo pelo usuário ou inicia no tema claro.
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    const THEME_STORAGE_KEY = 'dm1-theme';
    const themeIcon = themeToggle.querySelector('.theme-toggle-icon');

    const getInitialTheme = () => {
        let savedTheme;

        try {
            savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        } catch {
            return 'light';
        }

        if (savedTheme === 'dark' || savedTheme === 'light') {
            return savedTheme;
        }

        return 'light';
    };

    function applyTheme(theme) {
        const isDarkTheme = theme === 'dark';
        document.documentElement.dataset.theme = theme;
        themeToggle.setAttribute('aria-pressed', String(isDarkTheme));
        themeToggle.setAttribute('aria-label', isDarkTheme ? 'Ativar tema claro' : 'Ativar tema escuro');

        if (themeIcon) {
            themeIcon.textContent = isDarkTheme ? '☀' : '☾';
        }
    }

    applyTheme(getInitialTheme());

    themeToggle.addEventListener('click', () => {
        const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
        const updateTheme = () => {
            applyTheme(nextTheme);

            try {
                localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
            } catch {
                // Keep the selected theme for this page even when storage is blocked.
            }
        };

        // A transição por snapshots também suaviza gradientes, que não interpolam em CSS.
        if (document.startViewTransition && !reducedMotionPreference.matches) {
            document.startViewTransition(updateTheme);
        } else {
            updateTheme();
        }
    });
}

// Vira cada cartão ao clique e mantém seu estado acessível para leitores de tela.
const flashcards = document.querySelectorAll('.flashcard');
flashcards.forEach((card) => {
    const front = card.querySelector('.flashcard-front');
    const back = card.querySelector('.flashcard-back');
    const inner = card.querySelector('.flashcard-inner');

    front?.setAttribute('aria-hidden', 'false');
    back?.setAttribute('aria-hidden', 'true');

    inner?.addEventListener('transitionend', (event) => {
        if (event.target === inner && event.propertyName === 'transform') {
            card.classList.remove('is-animating');
        }
    });

    card.addEventListener('click', () => {
        if (!reducedMotionPreference.matches) {
            card.classList.add('is-animating');
        }

        const isFlipped = card.classList.toggle('is-flipped');
        card.setAttribute('aria-pressed', String(isFlipped));
        front?.setAttribute('aria-hidden', String(isFlipped));
        back?.setAttribute('aria-hidden', String(!isFlipped));
    });
});

// Valida os dados e abre o aplicativo de e-mail com a mensagem preenchida.
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    const submitButton = contactForm.querySelector('.contact-submit');
    const submitLabel = submitButton?.querySelector('span');
    const status = contactForm.querySelector('.form-status');
    let retryTimer;

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!contactForm.reportValidity()) {
            return;
        }

        const formData = new FormData(contactForm);
        const getFieldValue = (name) => String(formData.get(name) || '').trim();
        const nome = getFieldValue('nome');
        const email = getFieldValue('email');
        const mensagem = getFieldValue('mensagem');
        const assunto = `Contato pelo site Tipo 1 - ${nome}`;
        const corpo = `Nome: ${nome}\nE-mail para resposta: ${email}\n\nMensagem:\n${mensagem}`;
        const mailto = `mailto:tipo1diabetes.suporte@gmail.com?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;

        window.clearTimeout(retryTimer);
        contactForm.setAttribute('aria-busy', 'true');
        submitButton?.classList.add('is-opening');
        submitButton?.setAttribute('aria-busy', 'true');
        submitButton?.setAttribute('disabled', '');

        if (submitLabel) {
            submitLabel.textContent = 'Abrindo seu aplicativo de e-mail…';
        }

        if (status) {
            status.textContent = 'Preparando a mensagem. O envio ainda precisa ser confirmado no aplicativo de e-mail.';
        }

        // Libera uma nova tentativa caso o dispositivo não abra um aplicativo de e-mail.
        retryTimer = window.setTimeout(() => {
            contactForm.removeAttribute('aria-busy');
            submitButton?.classList.remove('is-opening');
            submitButton?.removeAttribute('aria-busy');
            submitButton?.removeAttribute('disabled');

            if (submitLabel) {
                submitLabel.textContent = 'Abrir e-mail para enviar';
            }

            if (status) {
                status.textContent = 'Se o aplicativo não abriu, verifique se há um aplicativo de e-mail configurado e tente novamente.';
            }
        }, 2500);

        window.location.href = mailto;
    });
}

const scrollProgressBar = document.getElementById('scroll-progress-bar');
if (scrollProgressBar) {
    let progressUpdateQueued = false;

    const updateScrollProgress = () => {
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
        scrollProgressBar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
        progressUpdateQueued = false;
    };

    window.addEventListener('scroll', () => {
        if (!progressUpdateQueued) {
            progressUpdateQueued = true;
            window.requestAnimationFrame(updateScrollProgress);
        }
    }, { passive: true });
    window.addEventListener('resize', updateScrollProgress);
    updateScrollProgress();
}

// Exibe um atalho discreto para o topo depois que a pessoa começa a navegar.
const backToTopButton = document.getElementById('back-to-top');
if (backToTopButton) {
    const updateBackToTopVisibility = () => {
        const isVisible = window.scrollY > 640;
        backToTopButton.classList.toggle('is-visible', isVisible);
        backToTopButton.setAttribute('aria-hidden', String(!isVisible));
        backToTopButton.tabIndex = isVisible ? 0 : -1;
    };

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: reducedMotionPreference.matches ? 'auto' : 'smooth'
        });
    });

    window.addEventListener('scroll', updateBackToTopVisibility, { passive: true });
    updateBackToTopVisibility();
}

// Destaca no menu a seção mais próxima da área de leitura atual.
const navigationLinks = document.querySelectorAll('.nav-links a[href^="#"]');
if ('IntersectionObserver' in window && navigationLinks.length > 0) {
    const navigationTargets = Array.from(navigationLinks)
        .map((link) => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    const navigationObserver = new IntersectionObserver((entries) => {
        const activeEntry = entries
            .filter((entry) => entry.isIntersecting)
            .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (!activeEntry) {
            return;
        }

        navigationLinks.forEach((link) => {
            const isCurrent = link.hash === `#${activeEntry.target.id}`;
            if (isCurrent) {
                link.setAttribute('aria-current', 'location');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }, {
        rootMargin: '-18% 0px -68% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1]
    });

    navigationTargets.forEach((target) => navigationObserver.observe(target));

    window.addEventListener('scroll', () => {
        if (window.scrollY < 180) {
            navigationLinks.forEach((link) => link.removeAttribute('aria-current'));
        }
    }, { passive: true });
}

// Revela elementos uma vez, sem repetir a animação ao sair da tela ou subir a página.
if ('IntersectionObserver' in window && !reducedMotionPreference.matches) {
    const revealElements = document.querySelectorAll(
        'main > section .section-header, .stat-item, .pillar-card, .info-card, .quick-card, .routine-card, .tip-card, .alert-box, #faq details, .contact-form, .cta, .footer-inner, .footer-bottom'
    );
    let previousScrollY = window.scrollY;
    let scrollDirection = 'down';

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        scrollDirection = currentScrollY >= previousScrollY ? 'down' : 'up';
        previousScrollY = currentScrollY;
    }, { passive: true });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            if (scrollDirection === 'down') {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('scroll-reveal');
            }
            revealObserver.unobserve(entry.target);
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -4% 0px'
    });

    revealElements.forEach((element) => {
        const siblingIndex = Array.from(element.parentElement.children).indexOf(element);
        element.style.setProperty('--reveal-delay', `${Math.min(siblingIndex, 3) * 80}ms`);
        element.classList.add('scroll-reveal');
        revealObserver.observe(element);
    });

    document.documentElement.classList.add('has-scroll-reveal');
}
