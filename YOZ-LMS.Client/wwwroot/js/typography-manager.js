// YOZ-LMS Typography Manager - Professional Text System
class TypographyManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupReadingMode();
        this.setupFontSizeControls();
        this.setupLineHeightControls();
        this.setupFontFamilyControls();
        this.loadUserPreferences();
        this.setupAccessibilityFeatures();
    }

    // Reading Mode for better readability
    setupReadingMode() {
        const readingModeButton = document.createElement('button');
        readingModeButton.className = 'reading-mode-toggle';
        readingModeButton.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
        `;
        readingModeButton.setAttribute('aria-label', 'Toggle reading mode');
        readingModeButton.style.cssText = `
            position: fixed;
            top: 80px;
            right: 16px;
            z-index: 1000;
            background: var(--bg-secondary);
            border: 1px solid var(--border-primary);
            border-radius: 50%;
            padding: 12px;
            cursor: pointer;
            transition: all 0.25s ease;
            box-shadow: var(--shadow);
        `;

        readingModeButton.addEventListener('click', () => {
            this.toggleReadingMode();
        });

        document.body.appendChild(readingModeButton);
    }

    toggleReadingMode() {
        document.body.classList.toggle('reading-mode');
        const isReadingMode = document.body.classList.contains('reading-mode');
        
        // Apply reading mode styles
        if (isReadingMode) {
            document.body.style.cssText += `
                max-width: 800px;
                margin: 0 auto;
                padding: 40px 20px;
                line-height: 1.8;
                font-size: 18px;
            `;
        } else {
            document.body.style.maxWidth = '';
            document.body.style.margin = '';
            document.body.style.padding = '';
            document.body.style.lineHeight = '';
            document.body.style.fontSize = '';
        }

        // Save preference
        localStorage.setItem('yoz-lms-reading-mode', isReadingMode);
    }

    // Font Size Controls
    setupFontSizeControls() {
        const fontSizeControls = document.createElement('div');
        fontSizeControls.className = 'font-size-controls';
        fontSizeControls.innerHTML = `
            <button class="font-size-decrease" aria-label="Decrease font size">A-</button>
            <button class="font-size-reset" aria-label="Reset font size">A</button>
            <button class="font-size-increase" aria-label="Increase font size">A+</button>
        `;
        fontSizeControls.style.cssText = `
            position: fixed;
            top: 140px;
            right: 16px;
            z-index: 1000;
            display: flex;
            flex-direction: column;
            gap: 8px;
        `;

        // Style buttons
        fontSizeControls.querySelectorAll('button').forEach(button => {
            button.style.cssText = `
                background: var(--bg-secondary);
                border: 1px solid var(--border-primary);
                border-radius: 8px;
                padding: 8px 12px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 600;
                color: var(--text-primary);
                transition: all 0.25s ease;
                box-shadow: var(--shadow);
                min-width: 40px;
            `;
        });

        // Add event listeners
        fontSizeControls.querySelector('.font-size-decrease').addEventListener('click', () => {
            this.adjustFontSize(-0.125);
        });

        fontSizeControls.querySelector('.font-size-reset').addEventListener('click', () => {
            this.resetFontSize();
        });

        fontSizeControls.querySelector('.font-size-increase').addEventListener('click', () => {
            this.adjustFontSize(0.125);
        });

        document.body.appendChild(fontSizeControls);
    }

    adjustFontSize(delta) {
        const currentSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
        const newSize = Math.max(12, Math.min(24, currentSize + delta));
        document.documentElement.style.fontSize = `${newSize}px`;
        localStorage.setItem('yoz-lms-font-size', newSize);
    }

    resetFontSize() {
        document.documentElement.style.fontSize = '';
        localStorage.removeItem('yoz-lms-font-size');
    }

    // Line Height Controls
    setupLineHeightControls() {
        const lineHeightControls = document.createElement('div');
        lineHeightControls.className = 'line-height-controls';
        lineHeightControls.innerHTML = `
            <button class="line-height-tight" aria-label="Tight line height">≡</button>
            <button class="line-height-normal" aria-label="Normal line height">≡≡</button>
            <button class="line-height-loose" aria-label="Loose line height">≡≡≡</button>
        `;
        lineHeightControls.style.cssText = `
            position: fixed;
            top: 240px;
            right: 16px;
            z-index: 1000;
            display: flex;
            flex-direction: column;
            gap: 8px;
        `;

        lineHeightControls.querySelectorAll('button').forEach(button => {
            button.style.cssText = `
                background: var(--bg-secondary);
                border: 1px solid var(--border-primary);
                border-radius: 8px;
                padding: 8px 12px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 600;
                color: var(--text-primary);
                transition: all 0.25s ease;
                box-shadow: var(--shadow);
                min-width: 40px;
            `;
        });

        lineHeightControls.querySelector('.line-height-tight').addEventListener('click', () => {
            this.setLineHeight(1.25);
        });

        lineHeightControls.querySelector('.line-height-normal').addEventListener('click', () => {
            this.setLineHeight(1.5);
        });

        lineHeightControls.querySelector('.line-height-loose').addEventListener('click', () => {
            this.setLineHeight(1.75);
        });

        document.body.appendChild(lineHeightControls);
    }

    setLineHeight(value) {
        document.body.style.lineHeight = value;
        localStorage.setItem('yoz-lms-line-height', value);
    }

    // Font Family Controls
    setupFontFamilyControls() {
        const fontFamilyControls = document.createElement('div');
        fontFamilyControls.className = 'font-family-controls';
        fontFamilyControls.innerHTML = `
            <button class="font-sans" aria-label="Sans serif font">Aa</button>
            <button class="font-serif" aria-label="Serif font">Aa</button>
            <button class="font-mono" aria-label="Monospace font">Aa</button>
        `;
        fontFamilyControls.style.cssText = `
            position: fixed;
            top: 340px;
            right: 16px;
            z-index: 1000;
            display: flex;
            flex-direction: column;
            gap: 8px;
        `;

        fontFamilyControls.querySelectorAll('button').forEach(button => {
            button.style.cssText = `
                background: var(--bg-secondary);
                border: 1px solid var(--border-primary);
                border-radius: 8px;
                padding: 8px 12px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 600;
                color: var(--text-primary);
                transition: all 0.25s ease;
                box-shadow: var(--shadow);
                min-width: 40px;
            `;
        });

        fontFamilyControls.querySelector('.font-sans').addEventListener('click', () => {
            this.setFontFamily('var(--font-sans)');
        });

        fontFamilyControls.querySelector('.font-serif').addEventListener('click', () => {
            this.setFontFamily('Georgia, serif');
        });

        fontFamilyControls.querySelector('.font-mono').addEventListener('click', () => {
            this.setFontFamily('var(--font-mono)');
        });

        document.body.appendChild(fontFamilyControls);
    }

    setFontFamily(family) {
        document.body.style.fontFamily = family;
        localStorage.setItem('yoz-lms-font-family', family);
    }

    // Load User Preferences
    loadUserPreferences() {
        // Load font size
        const fontSize = localStorage.getItem('yoz-lms-font-size');
        if (fontSize) {
            document.documentElement.style.fontSize = `${fontSize}px`;
        }

        // Load line height
        const lineHeight = localStorage.getItem('yoz-lms-line-height');
        if (lineHeight) {
            document.body.style.lineHeight = lineHeight;
        }

        // Load font family
        const fontFamily = localStorage.getItem('yoz-lms-font-family');
        if (fontFamily) {
            document.body.style.fontFamily = fontFamily;
        }

        // Load reading mode
        const readingMode = localStorage.getItem('yoz-lms-reading-mode') === 'true';
        if (readingMode) {
            this.toggleReadingMode();
        }
    }

    // Accessibility Features
    setupAccessibilityFeatures() {
        // Add skip links
        this.addSkipLinks();
        
        // Add focus indicators
        this.enhanceFocusIndicators();
        
        // Add keyboard navigation
        this.enhanceKeyboardNavigation();
    }

    addSkipLinks() {
        const skipLinks = document.createElement('div');
        skipLinks.className = 'skip-links';
        skipLinks.innerHTML = `
            <a href="#main-content" class="skip-link">Skip to main content</a>
            <a href="#navigation" class="skip-link">Skip to navigation</a>
        `;
        skipLinks.style.cssText = `
            position: fixed;
            top: -40px;
            left: 0;
            right: 0;
            z-index: 9999;
            background: var(--bg-primary);
            border: 2px solid var(--color-primary);
            padding: 8px 16px;
            text-align: center;
        `;

        skipLinks.querySelectorAll('.skip-link').forEach(link => {
            link.style.cssText = `
                color: var(--color-primary);
                text-decoration: none;
                font-weight: 600;
                margin: 0 16px;
            `;
        });

        // Show skip links when focused
        skipLinks.addEventListener('focusin', () => {
            skipLinks.style.top = '0';
        });

        skipLinks.addEventListener('focusout', () => {
            skipLinks.style.top = '-40px';
        });

        document.body.insertBefore(skipLinks, document.body.firstChild);
    }

    enhanceFocusIndicators() {
        const style = document.createElement('style');
        style.textContent = `
            *:focus {
                outline: 2px solid var(--color-primary);
                outline-offset: 2px;
                border-radius: 4px;
            }
            
            *:focus:not(:focus-visible) {
                outline: none;
            }
            
            *:focus-visible {
                outline: 2px solid var(--color-primary);
                outline-offset: 2px;
                border-radius: 4px;
            }
        `;
        document.head.appendChild(style);
    }

    enhanceKeyboardNavigation() {
        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + Plus: Increase font size
            if ((e.ctrlKey || e.metaKey) && e.key === '=') {
                e.preventDefault();
                this.adjustFontSize(0.125);
            }
            
            // Ctrl/Cmd + Minus: Decrease font size
            if ((e.ctrlKey || e.metaKey) && e.key === '-') {
                e.preventDefault();
                this.adjustFontSize(-0.125);
            }
            
            // Ctrl/Cmd + 0: Reset font size
            if ((e.ctrlKey || e.metaKey) && e.key === '0') {
                e.preventDefault();
                this.resetFontSize();
            }
            
            // Alt + T: Toggle theme
            if (e.altKey && e.key === 't') {
                e.preventDefault();
                if (window.themeManager) {
                    window.themeManager.toggleTheme();
                }
            }
            
            // Alt + R: Toggle reading mode
            if (e.altKey && e.key === 'r') {
                e.preventDefault();
                this.toggleReadingMode();
            }
        });
    }

    // Public API
    getCurrentFontSize() {
        return parseFloat(getComputedStyle(document.documentElement).fontSize);
    }

    getCurrentLineHeight() {
        return getComputedStyle(document.body).lineHeight;
    }

    getCurrentFontFamily() {
        return getComputedStyle(document.body).fontFamily;
    }

    isReadingMode() {
        return document.body.classList.contains('reading-mode');
    }

    // Reset all typography settings
    resetAll() {
        this.resetFontSize();
        document.body.style.lineHeight = '';
        document.body.style.fontFamily = '';
        document.body.classList.remove('reading-mode');
        
        // Clear all preferences
        localStorage.removeItem('yoz-lms-font-size');
        localStorage.removeItem('yoz-lms-line-height');
        localStorage.removeItem('yoz-lms-font-family');
        localStorage.removeItem('yoz-lms-reading-mode');
    }
}

// Initialize typography manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.typographyManager = new TypographyManager();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TypographyManager;
}
