document.addEventListener('DOMContentLoaded', () => {
    // Функция для переключения видимости списка источников
    function toggleReferences() {
        const referencesList = document.getElementById('referencesList');
        referencesList.classList.toggle('visible');
    }

    
    document.querySelector('.references-button').addEventListener('click', toggleReferences);

    // Функция для проверки видимости элемента
    function isScrolledIntoView(el, percentVisible = 80) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const elementTop = rect.top;
        const elementBottom = rect.bottom;
        const visibleHeight = Math.min(windowHeight, elementBottom) - Math.max(0, elementTop);
        const totalHeight = elementBottom - elementTop;
        return (visibleHeight / totalHeight) * 100 >= percentVisible;
    }

    // Функция для анимации баров
    function animateBars(section) {
        const bars = section.querySelectorAll('.bar');
        const barGroups = section.querySelectorAll('.bar-group');
        let animationsComplete = 0;

        function animateHeight(bar) {
            const targetHeight = parseInt(bar.getAttribute('data-height'), 10);
            let currentHeight = 0;

            function updateBarHeight() {
                if (currentHeight < targetHeight) {
                    currentHeight += Math.min(2, targetHeight - currentHeight);
                    bar.style.height = currentHeight + 'px';
                    requestAnimationFrame(updateBarHeight);
                } else {
                    bar.style.height = targetHeight + 'px';
                    if (++animationsComplete === bars.length) {
                        setTimeout(animateValues, 500);
                    }
                }
            }

            updateBarHeight();
        }

        function animateValues() {
            bars.forEach((bar) => {
                const valueElement = bar.querySelector('.bar-value');
                const targetValue = parseFloat(valueElement.getAttribute('data-target-value'));
                let currentValue = 0;

                function updateValue() {
                    if (currentValue < targetValue) {
                        currentValue += Math.min(0.02, targetValue - currentValue);
                        valueElement.textContent = currentValue.toFixed(2).replace('.', ',');
                        requestAnimationFrame(updateValue);
                    } else {
                        valueElement.textContent = targetValue.toFixed(2).replace('.', ',');
                        valueElement.classList.add('visible');
                    }
                }

                updateValue();
            });

            // Плавное появление дополнительных элементов
            section.querySelector('.p-value-container').classList.add('visible');
            section.querySelector('.to').classList.add('visible');
            section.querySelector('.legend').classList.add('visible');
            section.querySelector('.arrow-container').classList.add('visible');
            section.querySelector('.table-button').classList.add('visible');
        }

        bars.forEach((bar) => {
            const valueElement = bar.querySelector('.bar-value');
            const targetValue = parseFloat(valueElement.textContent.replace(',', '.')) || 0;
            valueElement.setAttribute('data-target-value', targetValue.toFixed(2));
            valueElement.textContent = '0,00';
            animateHeight(bar);
        });
    }

    // Функция для обработки прокрутки секций графиков
    function handleScrollCharts() {
        const sections = document.querySelectorAll('.chart-section');
        sections.forEach((section) => {
            const chartContainer = section.querySelector('.chart-container');
            if (isScrolledIntoView(chartContainer) && !section.classList.contains('visible')) {
                section.classList.add('visible');
                animateBars(section);
            }
        });
    }

    // Функция для обработки прокрутки секций механизмов
    function handleScrollMechanisms() {
        const sections = document.querySelectorAll('.mechanisms-section');
        sections.forEach((section) => {
            if (isScrolledIntoView(section)) {
                section.classList.add('visible');
            }
        });
    }

    // Функция для обработки прокрутки секций схемы лечения
    function handleScrollTreatmentScheme() {
        const sections = document.querySelectorAll('.treatment-scheme');
        sections.forEach((section) => {
            if (isScrolledIntoView(section) && !section.classList.contains('visible')) {
                section.classList.add('visible');
            }
        });
    }

    // Функция для обработки прокрутки секции
    function handleScrollAnniversarySection() {
        const section = document.querySelector('.anniversary-section');
        if (section && isScrolledIntoView(section) && !section.classList.contains('visible')) {
            section.classList.add('visible');
        }
    }

    // Функция для обработки прокрутки секций с анимацией
    function handleScrollAnimations() {
        const introSection = document.querySelector('.intro');
        const sectionWithMedia = document.querySelector('.section-with-media');
        const consequencesSection = document.querySelector('.consequences');
        const centeredSection = document.querySelector('.centered-section');
        const imageTextSection = document.querySelector('.image-text-section');
        const influenceSection = document.querySelector('.influence-section');
        const improvementSection = document.querySelector('.improvement');

        const observerOptions = {
            threshold: 0.6
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        if (introSection) observer.observe(introSection);
        if (sectionWithMedia) observer.observe(sectionWithMedia);
        if (consequencesSection) observer.observe(consequencesSection);
        if (centeredSection) observer.observe(centeredSection);
        if (imageTextSection) observer.observe(imageTextSection);
        if (influenceSection) observer.observe(influenceSection);
        if (improvementSection) observer.observe(improvementSection);
    }


    function init() {
        handleScrollCharts();
        handleScrollMechanisms();
        handleScrollTreatmentScheme();
        handleScrollAnniversarySection();
        handleScrollAnimations();
    }

    window.addEventListener('scroll', () => {
        handleScrollCharts();
        handleScrollMechanisms();
        handleScrollTreatmentScheme();
        handleScrollAnniversarySection();
    });

   
    init();
});
document.addEventListener('DOMContentLoaded', () => {
    const footer = document.querySelector('.footer');

  
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
               
                observer.unobserve(entry.target);
            }
        });
    };


    const observer = new IntersectionObserver(observerCallback, {
        threshold: 0.2 
    });

  
    observer.observe(footer);
});
