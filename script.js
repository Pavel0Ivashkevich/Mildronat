document.addEventListener('DOMContentLoaded', () => {
    // Функция для переключения видимости списка источников
    function toggleReferences() {
        const referencesList = document.getElementById('referencesList');
        if (referencesList) {
            referencesList.classList.toggle('visible');
        }
    }

    // Добавляем обработчик события клика для кнопки "Источники"
    const referencesButton = document.querySelector('.references-button');
    if (referencesButton) {
        referencesButton.addEventListener('click', toggleReferences);
    }

    // Функция для проверки видимости элемента
    function isScrolledIntoView(el, percentVisible = 0) {
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
        let animationsComplete = 0;

        bars.forEach((bar) => {
            const targetHeight = parseInt(bar.getAttribute('data-height'), 10);
            let currentHeight = 0;

            function updateBarHeight() {
                if (currentHeight < targetHeight) {
                    currentHeight += Math.min(5, targetHeight - currentHeight);
                    bar.style.height = currentHeight + 'px';
                    requestAnimationFrame(updateBarHeight);
                } else {
                    bar.style.height = targetHeight + 'px';
                    if (++animationsComplete === bars.length) {
                        animateValues();
                    }
                }
            }

            updateBarHeight();
        });

        function animateValues() {
            bars.forEach((bar) => {
                const valueElement = bar.querySelector('.bar-value');
                let targetValue = parseFloat(valueElement.textContent.replace(',', '.'));

                if (isNaN(targetValue)) {
                    console.error('Invalid target value:', valueElement.textContent);
                    targetValue = 0;
                }

                let currentValue = 0;

                function updateValue() {
                    if (currentValue < targetValue) {
                        currentValue += Math.min(0.1, targetValue - currentValue);
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
            setTimeout(() => {
                section.querySelectorAll('.p-value-container, .to, .legend, .arrow-container, .table-button')
                    .forEach(el => el.classList.add('visible'));
            }, 300);
        }
    }

    // Функция для обработки прокрутки секций графиков
    function handleScrollCharts() {
        const sections = document.querySelectorAll('.chart-section');
        sections.forEach((section) => {
            const chartContainer = section.querySelector('.chart-container');
            if (chartContainer && isScrolledIntoView(chartContainer) && !section.classList.contains('visible')) {
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
        const sections = [
            '.intro',
            '.section-with-media',
            '.consequences',
            '.centered-section',
            '.image-text-section',
            '.influence-section',
            '.improvement',
            '.anniversary-section'
        ];

        const observerOptions = {
            threshold: 0.6
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    if (entry.target.classList.contains('anniversary-section')) {
                        const referencesButton = document.querySelector('.references-button');
                        if (referencesButton) {
                            referencesButton.classList.add('animate');
                        }
                    }
                }
            });
        }, observerOptions);

        sections.forEach(selector => {
            const section = document.querySelector(selector);
            if (section) observer.observe(section);
        });
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

// Обработка кнопки для перехода на другую страницу
document.getElementById('navigateButton').addEventListener('click', function() {
    window.location.href = 'index2.html';
});

// Отслеживание видимости футера
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

    if (footer) {
        observer.observe(footer);
    }
});
document.addEventListener('DOMContentLoaded', () => {
    function isScrolledIntoView(el, percentVisible = 0) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const elementTop = rect.top;
        const elementBottom = rect.bottom;
        const visibleHeight = Math.min(windowHeight, elementBottom) - Math.max(0, elementTop);
        const totalHeight = elementBottom - elementTop;
        return (visibleHeight / totalHeight) * 100 >= percentVisible;
    }

    function handleScrollAnimations() {
        const section = document.querySelector('.improvement2');
        const image = document.querySelector('.table_page2');

        if (section && isScrolledIntoView(section, 20) && !section.classList.contains('animate')) {
            section.classList.add('animate');
        }

        if (image && isScrolledIntoView(image, 20) && !image.classList.contains('animate')) {
            image.classList.add('animate');
        }
    }

    window.addEventListener('scroll', handleScrollAnimations);
    handleScrollAnimations(); // Проверка при загрузке страницы
});
