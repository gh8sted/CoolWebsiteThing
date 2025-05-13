document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        icon.classList.toggle('fa-sun');
        icon.classList.toggle('fa-moon');
    });

    // Wiki item interaction
    const wikiItems = document.querySelectorAll('.wiki-item');
    wikiItems.forEach(item => {
        item.addEventListener('click', () => {
            // Add a subtle animation when clicked
            item.style.transform = 'scale(0.98)';
            setTimeout(() => {
                item.style.transform = '';
            }, 100);

            // Here you can add functionality to show item details
            // For now, we'll just log the item name
            console.log('Selected item:', item.textContent);
        });
    });

    // Smooth scrolling for navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.animate-text, .animate-card').forEach(el => {
        observer.observe(el);
    });
}); 