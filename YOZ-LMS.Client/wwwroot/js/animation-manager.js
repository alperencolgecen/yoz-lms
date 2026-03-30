// YOZ-LMS Animation Manager - Professional Micro-interactions
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupLoadingStates();
        this.setupNotificationAnimations();
        this.setupModalAnimations();
    }

    // Intersection Observer for scroll animations
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements with animation classes
        document.querySelectorAll('.fade-in, .slide-in-up, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
            this.intersectionObserver.observe(el);
        });
    }

    animateElement(element) {
        element.classList.add('animate');
        this.intersectionObserver.unobserve(element);
    }

    // Scroll animations
    setupScrollAnimations() {
        let ticking = false;
        
        const updateScrollAnimations = () => {
            const scrollTop = window.pageYOffset;
            
            // Parallax effects
            document.querySelectorAll('.parallax').forEach(el => {
                const speed = el.dataset.speed || 0.5;
                const yPos = -(scrollTop * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });

            // Progress indicators
            document.querySelectorAll('.scroll-progress').forEach(el => {
                const height = document.documentElement.scrollHeight - window.innerHeight;
                const progress = (scrollTop / height) * 100;
                el.style.width = `${progress}%`;
            });

            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScrollAnimations);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick, { passive: true });
    }

    // Enhanced hover effects
    setupHoverEffects() {
        // 3D card tilt effect
        document.querySelectorAll('.card-3d').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });

        // Magnetic buttons
        document.querySelectorAll('.btn-magnetic').forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0)';
            });
        });

        // Ripple effect for buttons
        document.querySelectorAll('.btn-ripple').forEach(button => {
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // Loading states
    setupLoadingStates() {
        // Skeleton loading
        this.showSkeletonLoader = (container, count = 3) => {
            const skeletonHTML = Array(count).fill('').map(() => `
                <div class="skeleton-item">
                    <div class="skeleton-avatar loading-skeleton"></div>
                    <div class="skeleton-content">
                        <div class="skeleton-title loading-skeleton"></div>
                        <div class="skeleton-text loading-skeleton"></div>
                        <div class="skeleton-text loading-skeleton"></div>
                    </div>
                </div>
            `).join('');
            
            container.innerHTML = skeletonHTML;
        };

        // Progress loading
        this.showProgressLoader = (container, message = 'Loading...') => {
            container.innerHTML = `
                <div class="progress-loader">
                    <div class="progress-bar">
                        <div class="progress-bar-striped" style="width: 0%"></div>
                    </div>
                    <div class="progress-message">${message}</div>
                </div>
            `;
            
            const progressBar = container.querySelector('.progress-bar-striped');
            let progress = 0;
            
            const interval = setInterval(() => {
                progress += Math.random() * 10;
                if (progress >= 90) {
                    progress = 90;
                    clearInterval(interval);
                }
                progressBar.style.width = `${progress}%`;
            }, 200);
            
            return interval;
        };
    }

    // Notification animations
    setupNotificationAnimations() {
        this.showNotification = (message, type = 'info', duration = 5000) => {
            const notification = document.createElement('div');
            notification.className = `notification notification-${type} slide-in-right`;
            notification.innerHTML = `
                <div class="notification-content">
                    <div class="notification-message">${message}</div>
                    <button class="notification-close" aria-label="Close notification">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
            `;

            document.body.appendChild(notification);

            // Auto remove
            const removeNotification = () => {
                notification.classList.add('notification-exit');
                setTimeout(() => {
                    notification.remove();
                }, 400);
            };

            const closeBtn = notification.querySelector('.notification-close');
            closeBtn.addEventListener('click', removeNotification);

            if (duration > 0) {
                setTimeout(removeNotification, duration);
            }

            return notification;
        };
    }

    // Modal animations
    setupModalAnimations() {
        this.showModal = (content, options = {}) => {
            const overlay = document.createElement('div');
            overlay.className = 'modal-overlay';
            
            const modal = document.createElement('div');
            modal.className = 'modal';
            
            if (options.size) {
                modal.classList.add(`modal-${options.size}`);
            }
            
            modal.innerHTML = `
                <div class="modal-header">
                    <h3 class="modal-title">${options.title || 'Modal'}</h3>
                    <button class="modal-close" aria-label="Close modal">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                ${options.footer ? `<div class="modal-footer">${options.footer}</div>` : ''}
            `;

            overlay.appendChild(modal);
            document.body.appendChild(overlay);

            // Trigger animation
            requestAnimationFrame(() => {
                overlay.classList.add('active');
            });

            // Close handlers
            const closeModal = () => {
                overlay.classList.remove('active');
                setTimeout(() => {
                    overlay.remove();
                }, 300);
            };

            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    closeModal();
                }
            });

            modal.querySelector('.modal-close').addEventListener('click', closeModal);

            if (options.closeOnEscape) {
                const handleEscape = (e) => {
                    if (e.key === 'Escape') {
                        closeModal();
                        document.removeEventListener('keydown', handleEscape);
                    }
                };
                document.addEventListener('keydown', handleEscape);
            }

            return { overlay, closeModal };
        };
    }

    // Staggered animations
    staggerAnimation(elements, delay = 100) {
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('animate');
            }, index * delay);
        });
    }

    // Page transitions
    pageTransition(from, to) {
        return new Promise((resolve) => {
            const exitElements = document.querySelectorAll(from);
            const enterElements = document.querySelectorAll(to);

            // Exit animation
            exitElements.forEach(el => {
                el.classList.add('page-transition-exit-active');
            });

            setTimeout(() => {
                // Hide exit elements
                exitElements.forEach(el => {
                    el.style.display = 'none';
                    el.classList.remove('page-transition-exit-active');
                });

                // Show enter elements
                enterElements.forEach(el => {
                    el.style.display = 'block';
                    el.classList.add('page-transition-enter-active');
                });

                setTimeout(() => {
                    enterElements.forEach(el => {
                        el.classList.remove('page-transition-enter-active');
                    });
                    resolve();
                }, 300);
            }, 300);
        });
    }

    // Performance optimization
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Utility methods
    animateTo(element, properties, duration = 300) {
        return new Promise((resolve) => {
            const start = performance.now();
            const initialValues = {};
            
            // Get initial values
            Object.keys(properties).forEach(prop => {
                const value = getComputedStyle(element)[prop];
                initialValues[prop] = parseFloat(value) || 0;
            });

            const animate = (currentTime) => {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function
                const easeInOutCubic = progress < 0.5
                    ? 4 * progress * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;

                Object.keys(properties).forEach(prop => {
                    const startValue = initialValues[prop];
                    const endValue = properties[prop];
                    const currentValue = startValue + (endValue - startValue) * easeInOutCubic;
                    
                    if (prop === 'opacity') {
                        element.style.opacity = currentValue;
                    } else if (prop.includes('translate')) {
                        element.style.transform = currentValue;
                    } else {
                        element.style[prop] = currentValue + 'px';
                    }
                });

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    resolve();
                }
            };

            requestAnimationFrame(animate);
        });
    }
}

// Initialize animation manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.animationManager = new AnimationManager();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimationManager;
}
