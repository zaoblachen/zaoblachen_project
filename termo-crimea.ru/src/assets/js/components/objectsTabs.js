//находит массив элементов содержащих класс .tab__btn
const objectsBtn = Array.from(document.querySelectorAll(".objects__btn"));
//находит массив элементов содержащих класс .tab__slide
const objectsTab = Array.from(document.querySelectorAll(".objects__tab"));

objectsBtn[0].classList.add("active__btn");
objectsTab[0].classList.add("active__tab");

let activeObjectsBtn = objectsBtn[0];
let activeObjectsTab = objectsTab[0];

console.log(activeObjectsTab);

objectsBtn.forEach((el) => {
    el.addEventListener("click", onObjectsBtnClick);
});

function onObjectsBtnClick(e) {
    e.preventDefault(); // защита события

    // при клике на <a></a> в service-b1 находит этот тег и помещает в переменую internalBtn
    const internalBtn = e.target.closest(".objects__btn");

    changeObjectsBtn(internalBtn);
}

function changeObjectsBtn(internalBtn) {
    // если <a></a> содержит класс active, то возвращаем этот же тег
    if (internalBtn.classList.contains("active__btn")) {
        return;
    }

    // удалить из 1-ой переменной класс active
    activeObjectsBtn.classList.remove("active__btn");

    // кликнутому <a></a> присваивается класс active
    internalBtn.classList.add("active__btn");

    //теперь activeBtn получает содержимое btn
    activeObjectsBtn = internalBtn;

    console.log(activeObjectsBtn);
    changeObjectsIndicator(internalBtn);
}

function changeObjectsIndicator(internalBtn) {
    //indexBtn получает значение порядкового номера тега <a class="active"></a> в массиве tabBtns
    const indexObjectsBtn = objectsBtn.indexOf(internalBtn);

    // функция changeSlide принимает порядковый номер тега <a  class="active"></a>
    changeObjectsSlide(indexObjectsBtn);
}

// Функция изменения слайда
function changeObjectsSlide(indexObjects) {
    // удаляем класс active из переменной, содержащий класс active
    activeObjectsTab.classList.remove("active__tab");

    // tabSlide[index] - в массив tabSlide c изначально нулевым индексом запсиывается класс active
    objectsTab[indexObjects].classList.add("active__tab");
    activeObjectsTab = objectsTab[indexObjects];
}