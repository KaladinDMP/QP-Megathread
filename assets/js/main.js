// Smooth reveal on scroll for sections & cards
const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
        if (e.isIntersecting) {
            e.target.classList.add('in-view');
            io.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.section, .card, .about-card').forEach((el) => io.observe(el));

// Subtle parallax tilt on cards
document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        const rx = ((y / r.height) - 0.5) * -6;
        const ry = ((x / r.width)  - 0.5) *  6;
        card.style.transform = `translateY(-6px) perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

// Navbar blur strength on scroll
const nav = document.querySelector('.navbar');
if (nav) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    }, { passive: true });
}

// Last-updated footer (index only) — pulls the latest commit date on `main`
// from the GitHub API so we don't need a committed timestamp file or a bot
// pushing to main (which the Ruleset blocks anyway).
const updatedEl = document.getElementById('last-updated');
if (updatedEl) {
    fetch('https://api.github.com/repos/KaladinDMP/QP-Megathread/commits/main')
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (d && d.commit && d.commit.committer && d.commit.committer.date) {
          const formatted = new Date(d.commit.committer.date).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
          });
          updatedEl.textContent = 'Updated: ' + formatted;
        }
      })
      .catch(() => {}); // fail silently if offline or rate-limited
}

// Per-card last-updated dates + NEW badge for changes within 7 days.
// Each card carries a data-page attribute pointing to its page file.
const pageCards = document.querySelectorAll('.card[data-page]');
if (pageCards.length) {
    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    const now = Date.now();

    Promise.all([...pageCards].map(card =>
        fetch(`https://api.github.com/repos/KaladinDMP/QP-Megathread/commits?path=${card.dataset.page}&per_page=1`)
            .then(r => r.ok ? r.json() : null)
            .then(d => ({ card, commit: d && d[0] ? d[0] : null }))
            .catch(() => ({ card, commit: null }))
    )).then(results => {
        results.forEach(({ card, commit }) => {
            if (!commit) return;
            const date = new Date(commit.commit.committer.date);
            const isNew = (now - date.getTime()) < sevenDays;
            const formatted = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

            const el = document.createElement('div');
            el.className = 'card-updated';
            if (isNew) {
                el.innerHTML = `<span class="badge-new">NEW</span><span class="updated-date">Updated ${formatted}</span>`;
            } else {
                el.innerHTML = `<span class="updated-date">Updated ${formatted}</span>`;
            }

            const cta = card.querySelector('.card-cta');
            if (cta) card.insertBefore(el, cta);
        });
    });
}
