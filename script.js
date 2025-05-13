document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');
    const popupOverlay = document.querySelector('.popup-overlay');
    const popup = document.querySelector('.popup');
    const popupTitle = document.querySelector('.popup-title');
    const popupImage = document.querySelector('.popup-image');
    const popupDescription = document.querySelector('.popup-description');
    const popupClose = document.querySelector('.popup-close');

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

    // Category toggle functionality
    document.querySelectorAll('.category-header').forEach(header => {
        const toggle = header.querySelector('.category-toggle');
        const content = header.nextElementSibling;
        const category = header.parentElement;
        
        // Add collapsed class to toggle by default
        toggle.classList.add('collapsed');
        
        header.addEventListener('click', () => {
            category.classList.toggle('expanded');
            content.classList.toggle('expanded');
            toggle.classList.toggle('collapsed');
        });
    });

    // Wiki item interaction
    document.querySelectorAll('.wiki-item').forEach(item => {
        item.addEventListener('click', () => {
            const itemData = JSON.parse(item.dataset.item);
            
            // Update popup content
            popupTitle.textContent = itemData.name;
            popupImage.src = itemData.image;
            popupImage.alt = itemData.name;
            popupDescription.textContent = itemData.description;
            
            // Show popup
            popupOverlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    // Close popup
    popupClose.addEventListener('click', () => {
        popupOverlay.style.display = 'none';
        document.body.style.overflow = '';
    });

    // Close popup when clicking outside
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            popupOverlay.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Filter functionality
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active state
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('filter-active'));
            link.classList.add('filter-active');
            
            const filter = link.dataset.filter;
            const categories = document.querySelectorAll('.category');
            
            categories.forEach(category => {
                if (filter === 'all' || category.dataset.type === filter) {
                    category.style.display = 'block';
                } else {
                    category.style.display = 'none';
                }
            });
        });
    });

    // Close popup with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popupOverlay.style.display === 'flex') {
            popupOverlay.style.display = 'none';
            document.body.style.overflow = '';
        }
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