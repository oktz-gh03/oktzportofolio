// =============================================
// NAVBAR SCROLL EFFECT
// =============================================
window.addEventListener('scroll', function () {
    document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 20);
});

// =============================================
// PAGE SCRIPTS (typing effect, skill bars, tabs,
// contact form, project filter)
// =============================================
        // ===== TYPING EFFECT =====
        const texts = ["Web Developerr", "Laravel Enthusiastt", "Frontend Learnerr", "Backend Beginnerr"];
        let index = 0,
            charIndex = 0,
            isDeleting = false,
            currentText = '';

        function typeEffect() {
            const fullText = texts[index];
            currentText = isDeleting ?
                fullText.substring(0, charIndex--) :
                fullText.substring(0, charIndex++);

            document.getElementById("typing").textContent = currentText;

            if (!isDeleting && charIndex === fullText.length) {
                isDeleting = true;
                setTimeout(typeEffect, 1200);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                index = (index + 1) % texts.length;
                setTimeout(typeEffect, 400);
            } else {
                setTimeout(typeEffect, isDeleting ? 45 : 90);
            }
        }

        typeEffect();

        // ===== SKILL BAR ANIMASI =====
        const fills = document.querySelectorAll('.chip-bar-fill');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    el.style.width = el.getAttribute('data-width') + '%';
                    observer.unobserve(el);
                }
            });
        }, {
            threshold: 0.3
        });

        fills.forEach(fill => observer.observe(fill));

        // ===== TAB EXPERIENCE =====
        function switchTab(panel, btn) {
            document.querySelectorAll('.exp-panel').forEach(p => p.classList.remove('active'));
            document.querySelectorAll('.exp-tab').forEach(b => b.classList.remove('active'));
            document.getElementById('panel-' + panel).classList.add('active');
            btn.classList.add('active');

            // AOS: hitung ulang posisi setelah panel berganti
            if (typeof AOS !== 'undefined') {
                setTimeout(() => AOS.refreshHard(), 50);
            }
        }

        // ===== CONTACT FORM =====
        function sendMessage() {
            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const subject = document.getElementById('contact-subject').value.trim();
            const message = document.getElementById('contact-message').value.trim();

            if (!name || !email || !subject || !message) {
                alert('Mohon lengkapi semua field terlebih dahulu.');
                return;
            }

            const text = `Halo Okt!%0ANama: ${name}%0AEmail: ${email}%0ASubjek: ${subject}%0A%0APesan:%0A${message}`;
            window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');

            document.getElementById('alert-success').classList.add('show');

            document.getElementById('contact-name').value = '';
            document.getElementById('contact-email').value = '';
            document.getElementById('contact-subject').value = '';
            document.getElementById('contact-message').value = '';
        }

        // ===== FILTER PROJECT =====
        function filterProject(cat, btn) {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            document.querySelectorAll('.project-item').forEach(item => {
                if (cat === 'all' || item.dataset.cat.includes(cat)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });

            // AOS: hitung ulang posisi setelah item disaring
            if (typeof AOS !== 'undefined') {
                setTimeout(() => AOS.refreshHard(), 50);
            }
        }
