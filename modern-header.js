// ============================================
// RUVA Modern Header - Scroll Effects & Mobile Menu
// Vanilla JavaScript Implementation
// ============================================

class ModernHeader {
    constructor() {
        this.header = document.querySelector('.modern-header');
        this.hamburgerBtn = document.querySelector('.hamburger-btn');
        this.mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
        this.mobileMenuLinks = document.querySelectorAll('.mobile-menu-links a');
        this.scrollThreshold = 10;
        this.isMenuOpen = false;

        this.init();
    }

    init() {
        if (!this.header) return;

        // Add scroll event listener
        window.addEventListener('scroll', () => this.handleScroll());

        // Add hamburger click listener
        if (this.hamburgerBtn) {
            this.hamburgerBtn.addEventListener('click', () => this.toggleMenu());
        }

        // Close menu when clicking on links
        this.mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (this.isMenuOpen) {
                    this.toggleMenu();
                }
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.toggleMenu();
            }
        });

        // Check scroll state on load
        this.handleScroll();

        // Highlight active menu item
        this.highlightActiveLink();
    }

    handleScroll() {
        const scrolled = window.scrollY > this.scrollThreshold;

        if (scrolled) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;

        if (this.isMenuOpen) {
            // Open menu
            this.hamburgerBtn.classList.add('open');
            this.mobileMenuOverlay.classList.add('open');
            document.body.classList.add('menu-open');
        } else {
            // Close menu
            this.hamburgerBtn.classList.remove('open');
            this.mobileMenuOverlay.classList.remove('open');
            document.body.classList.remove('menu-open');
        }
    }

    highlightActiveLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';

        // Desktop menu
        const desktopLinks = document.querySelectorAll('.desktop-menu a');
        desktopLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            if (linkPage === currentPage) {
                link.classList.add('active');
            }
        });

        // Mobile menu
        this.mobileMenuLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            if (linkPage === currentPage) {
                link.classList.add('active');
            }
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new ModernHeader();
    console.log('✨ RUVA Modern Header Initialized!');
});
