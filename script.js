document.addEventListener('DOMContentLoaded', () => {
    // Функция для переключения видимости списка источников
    function toggleReferences() {
        const referencesList = document.getElementById('referencesList');
        if (referencesList) {
            referencesList.classList.toggle('visible');
        }
    }

    // Видео
    const video = document.getElementById('myVideo');
    if (video) {
        video.play().catch(error => {
            console.log('Автопроигрывание заблокировано:', error);
        });

        video.addEventListener('ended', () => {
            video.currentTime = 0;
            video.play();
        });
    }

    // Обработчик события клика для кнопки "Источники"
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

    // Оптимизированная функция для анимации баров и значений
    function animateBars(section) {
        const bars = section.querySelectorAll('.bar');
        bars.forEach((bar) => {
            const targetHeight = parseInt(bar.getAttribute('data-height'), 10);
            let currentHeight = 0;
            const valueElement = bar.querySelector('.bar-value');
            let targetValue = parseFloat(valueElement.textContent.replace(',', '.'));
            let currentValue = 0;

            if (isNaN(targetValue)) {
                console.error('Invalid target value:', valueElement.textContent);
                targetValue = 0;
            }

            // Анимация столбца и значения параллельно
            function updateBar() {
                const heightStep = Math.min(5, targetHeight - currentHeight);
                const valueStep = Math.min(0.1, targetValue - currentValue);

                if (currentHeight < targetHeight || currentValue < targetValue) {
                    currentHeight += heightStep;
                    bar.style.height = `${currentHeight}px`;

                    currentValue += valueStep;
                    valueElement.textContent = currentValue.toFixed(1).replace('.', ',');

                    // Одновременное появление значения
                    valueElement.classList.add('visible');
                    
                    requestAnimationFrame(updateBar);
                } else {
                    // Окончательная установка высоты и значения
                    bar.style.height = `${targetHeight}px`;
                    valueElement.textContent = targetValue.toFixed(1).replace('.', ',');
                    valueElement.classList.add('visible');
                }
            }

            updateBar();
        });

        // Плавное появление дополнительных элементов через 100 мс после завершения анимации баров
        setTimeout(() => {
            section.querySelectorAll('.p-value-container, .to, .legend, .arrow-container, .table-button')
                .forEach(el => el.classList.add('visible'));
        }, 100);
    }

    // Функция для обработки прокрутки секций графиков
    function handleScrollCharts() {
        const sections = document.querySelectorAll('.chart-section');
        sections.forEach((section) => {
            const chartContainer = section.querySelector('.chart-container');
            if (chartContainer && isScrolledIntoView(chartContainer, 10) && !section.classList.contains('visible')) {
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

    // Функция для обработки прокрутки секции юбилея
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

    // Новая функция для обработки прокрутки секций с классом .improvement2
    function handleScrollImprovementSections() {
        const sections = document.querySelectorAll('.improvement2');
        const images = document.querySelectorAll('.table_page2');

        // Анимируем секции с классом .improvement2
        sections.forEach((section) => {
            if (isScrolledIntoView(section, 20) && !section.classList.contains('animate')) {
                section.classList.add('animate');
            }
        });

        // Анимируем изображения с классом .table_page2
        images.forEach((image) => {
            if (isScrolledIntoView(image, 20) && !image.classList.contains('animate')) {
                image.classList.add('animate');
            }
        });
    }

    // Инициализация всех обработчиков прокрутки
    function init() {
        handleScrollCharts();
        handleScrollMechanisms();
        handleScrollTreatmentScheme();
        handleScrollAnniversarySection();
        handleScrollAnimations();
        handleScrollImprovementSections();
    }

    window.addEventListener('scroll', () => {
        handleScrollCharts();
        handleScrollMechanisms();
        handleScrollTreatmentScheme();
        handleScrollAnniversarySection();
        handleScrollImprovementSections();
    });

    init();
});

// Обработка кнопки для перехода на другую страницу
const navigateButton = document.getElementById('navigateButton');
if (navigateButton) {
    navigateButton.addEventListener('click', function() {
        window.location.href = 'index2.html';
    });
}

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
