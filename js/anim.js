document.addEventListener('DOMContentLoaded', () => {
    const components = document.querySelectorAll('.points-component');

    const options = {
        root: null, // стежимо відносно viewport
        rootMargin: '-30% 0px -30% 0px', // спрацьовує, коли елемент у центральній смузі (40% висоти екрану)
        threshold: 0.5 // елемент має бути видимим хоча б на 50% у цій зоні
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-active');
            } else {
                entry.target.classList.remove('is-active');
            }
        });
    }, options);

    components.forEach(component => {
        observer.observe(component);
    });
});