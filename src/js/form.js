window.onload = () => {
    const form = document.querySelector('.box-form');

    document.querySelector('.box-form h2').onclick = () => form.classList.add('box-form-open');

    document.querySelector('.close').onclick = () => form.classList.remove('box-form-open');

    function newFun(form) {
        form.addEventListener('submit', function(e) {
            // Забороняємо типову дію відправки форми
            e.preventDefault();

            // Отримуємо дані форми
            const formData = new FormData(form);

            // Створюємо синхронний POST-запит
            const xhr = new XMLHttpRequest();
            xhr.open('POST', form.action, false); // false означає синхронний режим
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            // Відправляємо дані форми
            xhr.send(new URLSearchParams(formData).toString());

            // Перезавантажуємо сторінку
            window.location.reload(true);
        });
    } 

    // Запускаємо функцію обробки форми
    newFun(document.querySelector('#form-create'));
}
