document.addEventListener('DOMContentLoaded', () => {

    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {

        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {

            const isOpen = item.classList.contains('active');

            // Сначала закрываем все вопросы
            faqItems.forEach(otherItem => {

                const otherAnswer = otherItem.querySelector('.faq-answer');

                otherItem.classList.remove('active');
                otherAnswer.style.height = '0';

            });

            // Если нажатый вопрос был закрыт —
            // открываем его
            if (!isOpen) {

                item.classList.add('active');

                answer.style.height = answer.scrollHeight + 'px';

            }

        });

    });

});




