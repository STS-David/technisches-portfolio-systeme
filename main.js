const sectionAnchors = document.querySelectorAll('.section-anchor[id]');
const navLinks = document.querySelectorAll('.site-nav a');

if (sectionAnchors.length && navLinks.length && 'IntersectionObserver' in window) {
    const linkMap = new Map(
        Array.from(navLinks).map((link) => [link.getAttribute('href')?.slice(1), link])
    );

    const observer = new IntersectionObserver(
        (entries) => {
            const visibleEntries = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

            if (!visibleEntries.length) {
                return;
            }

            const activeId = visibleEntries[0].target.id;

            navLinks.forEach((link) => link.classList.remove('is-active'));
            linkMap.get(activeId)?.classList.add('is-active');
        },
        {
            rootMargin: '-25% 0px -55% 0px',
            threshold: [0.15, 0.35, 0.6]
        }
    );

    sectionAnchors.forEach((section) => observer.observe(section));
}
