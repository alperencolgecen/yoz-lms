// YOZ-LMS Theme Manager - Professional Theme System
class ThemeManager {
    constructor() {
        this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.setupThemeToggle();
        this.setupSystemThemeListener();
    }

    getStoredTheme() {
        return localStorage.getItem('yoz-lms-theme');
    }

    getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    setStoredTheme(theme) {
        localStorage.setItem('yoz-lms-theme', theme);
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        this.setStoredTheme(theme);
        this.updateThemeToggle(theme);
        this.notifyThemeChange(theme);
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
    }

    setupThemeToggle() {
        const toggleButton = document.createElement('button');
        toggleButton.className = 'theme-toggle';
        toggleButton.setAttribute('aria-label', 'Toggle theme');
        toggleButton.innerHTML = `
            <svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <svg class="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
        `;

        toggleButton.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Add keyboard support
        toggleButton.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleTheme();
            }
        });

        document.body.appendChild(toggleButton);
    }

    updateThemeToggle(theme) {
        const toggleButton = document.querySelector('.theme-toggle');
        if (toggleButton) {
            toggleButton.setAttribute('aria-label', `Current theme: ${theme}. Click to toggle theme.`);
        }
    }

    setupSystemThemeListener() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        mediaQuery.addEventListener('change', (e) => {
            // Only auto-switch if user hasn't manually set a preference
            if (!this.getStoredTheme()) {
                const systemTheme = e.matches ? 'dark' : 'light';
                this.applyTheme(systemTheme);
            }
        });
    }

    notifyThemeChange(theme) {
        // Dispatch custom event for other components to listen to
        const event = new CustomEvent('themechange', {
            detail: { theme, previousTheme: this.currentTheme }
        });
        document.dispatchEvent(event);

        // Update meta theme-color for mobile browsers
        this.updateMetaThemeColor(theme);
    }

    updateMetaThemeColor(theme) {
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            const color = theme === 'dark' ? '#0f172a' : '#ffffff';
            metaThemeColor.setAttribute('content', color);
        }
    }

    // Public API
    getCurrentTheme() {
        return this.currentTheme;
    }

    setTheme(theme) {
        if (theme === 'light' || theme === 'dark') {
            this.applyTheme(theme);
        }
    }

    resetToSystemTheme() {
        localStorage.removeItem('yoz-lms-theme');
        const systemTheme = this.getSystemTheme();
        this.applyTheme(systemTheme);
    }

    // Theme detection utilities
    isDarkMode() {
        return this.currentTheme === 'dark';
    }

    isLightMode() {
        return this.currentTheme === 'light';
    }

    // Get theme-aware color values
    getColor(variable) {
        return getComputedStyle(document.documentElement)
            .getPropertyValue(`--${variable}`)
            .trim();
    }
}

// Initialize theme manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeManager;
}
