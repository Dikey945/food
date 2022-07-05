window.addEventListener('DOMContentLoaded', () => {
    //TABS
    const tabs = document.querySelectorAll('.tabheader__item');
    const tabsContent = document.querySelectorAll('.tabcontent');
    const tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.display = 'none';
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });


   /*  function hideContent() {
        tabsContent.forEach(item => {
            item.style.display = 'none';
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });

    }

    function showContent(i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }

    hideContent();
    showContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.matches('.tabheader__item')) {
            tabs.forEach((item, i) => {
                if (item === target) {
                    hideContent();
                    showContent(i);
                }
            });
        }
    }); */




    // Timer

    const deadLine = '2022-07-03';

    //Создаем функцию которая будет получать нужные нам расчеты

    function getTimeRemaining(endtime) {
        
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());
        // Создаем условие при котором в случае непарвильного ввода даты получим нули 
        // в таймере
        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        }else{
            days = Math.floor(t / (1000 * 60 * 60 * 24));
            hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            minutes = Math.floor((t / (1000 * 60)) % 60);
            seconds = Math.floor((t / 1000) % 60);
        }

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    // Данная фунцция будет добавлять 0 к еденицам времени если они меньше 10
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    // Создаем функцию которая будет помещать значения на страничку

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            // Запускаем интервал для обновления времени на странице ежесекундно
            timeInterval = setInterval(updateClock, 1000);
        
        //Вызоа данной функции в этом месте позволит нам избежать изменений даты 
        //при обновлении страницы
        updateClock();

        //Данная функция будет обновлять наш таймер каждую секунду
        function updateClock() {
            
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
        
            // Условие остановки интервал
            if (t.t <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadLine);

    //Modal

    const modal = document.querySelector('.modal'),
        btn = document.querySelectorAll('[data-modal]'),
        close = document.querySelector('[data-close]'),
        body = document.querySelector('body');
    

        
    function showModal() {
        modal.style.display = 'block';

        //Данный кусок кода позволит избежать возможности скрола страницы
        //когда модальное окно активно

        body.style.overflow = 'hidden';

        //Очистка интервала в функции позволит нам избежать повторного вызова модалки
        //если пользователь уже вызвал его

        clearInterval(modalTimerId);
    }

    function closeModal() {
        modal.style.display = 'none';
        // Возвращаем возможность скрола при закрытии модалки
        body.style.overflow = 'visible';  
    }

    //Данный способ через делегирование

/*     body.addEventListener('click', (e) => {
        const target1 = e.target;
        if (target1 && target1.matches('[data-modal]')) {
            btn.forEach((item) => {
                if (item === target1) {
                    showModal();
                    // Делаем так чтобы сайт не скролился при активной модалке
                    body.style.overflow = 'hidden';
                }
            });
        }
    }); */

    //Через перебор

    btn.forEach(elem => {
        elem.addEventListener('click', () => {
            showModal();   
        });
    });

    close.addEventListener('click', closeModal); 

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });


    //Закртие  модалти при нажатии клавиши ESCAPE

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.style.display === 'block') {
            closeModal();
            
       } 
    });

    //Появление модалки через определенный промежуток времени
    const modalTimerId = setTimeout(showModal, 5000);


    //РЕализация открытия модалки по скролу с ремувом обработчика событий
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }


    window.addEventListener('scroll', showModalByScroll);
});