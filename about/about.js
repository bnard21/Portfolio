document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('nav-overlay');
    const trigger = document.getElementById('nav-trigger');
    const body = document.body;

    // Function to toggle the menu
    const toggleMenu = () => {
        const isHidden = overlay.classList.toggle('hidden');
        
        // Scroll Lock: Prevents the background from moving when menu is open
        if (!isHidden) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    };

    // 1. Click Event
    if (trigger) {
        trigger.addEventListener('click', toggleMenu);
    }

    // 2. Keyboard Events
    document.addEventListener('keydown', (e) => {
        // Command+K or Ctrl+K to toggle
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            toggleMenu();
        }

        // Escape to close (only if the menu is actually open)
        if (e.key === 'Escape' && !overlay.classList.contains('hidden')) {
            toggleMenu();
        }
    });
});