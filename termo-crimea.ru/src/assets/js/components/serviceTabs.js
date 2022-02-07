//находит массив элементов содержащих класс .tab__btn
const tabBtns = Array.from(document.querySelectorAll(".tab__btn"));
//находит массив элементов содержащих класс .tab__slide
const tabSlide = Array.from(document.querySelectorAll(".tab__slide"));

//присваивает класс active 1-му элементу в массиве
tabBtns[0].classList.add("active");
tabSlide[0].classList.add("active");

// создаем переменные, помещаем в них элементы, содержащие класс active
let activeBtn = tabBtns[0];
let activeSlide = tabSlide[0];

// вещаем слушателя клика на все кнопки содержащие класс .tab__btn,
//при исполнении создаем функцию onTabBtnClick
tabBtns.forEach((el) => {
    el.addEventListener("click", onTabBtnClick);
});

function onTabBtnClick(e) {
    e.preventDefault(); // защита события

    // при клике на <a></a> в service-b1 находит этот тег и помещает в переменую btn
    const btn = e.target.closest(".tab__btn");
    changeBtn(btn);
}

function changeBtn(btn) {
    // если <a></a> содержит класс active, то возвращаем этот же тег
    if (btn.classList.contains("active")) {
        return;
    }

    // удалить из 1-ой переменной класс active
    activeBtn.classList.remove("active");

    // кликнутому <a></a> присваивается класс active
    btn.classList.add("active");

    //теперь activeBtn получает содержимое btn
    activeBtn = btn;
    changeIndicator(btn);
}

function changeIndicator(btn) {
    //indexBtn получает значение порядкового номера тега <a class="active"></a> в массиве tabBtns
    const indexBtn = tabBtns.indexOf(btn);

    // функция changeSlide принимает порядковый номер тега <a  class="active"></a>
    changeSlide(indexBtn);
}

// Функция изменения слайда
function changeSlide(index) {
    // удаляем класс active из переменной, содержащий класс active
    activeSlide.classList.remove("active");

    // tabSlide[index] - в массив tabSlide c изначально нулевым индексом запсиывается класс active
    tabSlide[index].classList.add("active");
    activeSlide = tabSlide[index];
}
