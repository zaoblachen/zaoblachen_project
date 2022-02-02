"use strict";

//spollers

const spollersArray = document.querySelectorAll("[data-spollers]");
if (spollersArray.length > 0) {
    //Получение обычных спойлеров
    const spollersRegular = Array.from(spollersArray).filter(function (
        item,
        index,
        self
    ) {
        return !item.dataset.spollers.split(",")[0];
    });

    //Инициализация обычных спойлеров
    if (spollersRegular.length > 0) {
        initSpollers(spollersRegular);
    }

    // Получение спойлеров с медиазапросами
    const spollersMedia = Array.from(spollersArray).filter(function (
        item,
        index,
        self
    ) {
        return item.dataset.spollers.split(",")[0];
    });

    //Инициализация спойлеров с медиазапросами
    if (spollersMedia.length > 0) {
        const breakpointsArray = [];
        spollersMedia.forEach((item) => {
            const params = item.dataset.spollers;
            const breakpoint = {};
            const paramsArray = params.split(",");
            breakpoint.value = paramsArray[0];
            breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
            breakpoint.item = item;
            breakpointsArray.push(breakpoint);
        });

        //Получаем уникальные брейкпоинты
        let mediaQueries = breakpointsArray.map(function (item) {
            return (
                "(" +
                item.type +
                "width: " +
                item.value +
                "px)," +
                item.value +
                "," +
                item.type
            );
        });
        mediaQueries = mediaQueries.filter(function (item, index, self) {
            return self.indexOf(item) === index;
        });

        //Работаем с каждым брейкпоинтом
        mediaQueries.forEach((breakpoint) => {
            const paramsArray = breakpoint.split(",");
            const mediaBreakpoint = paramsArray[1];
            const mediaType = paramsArray[2];
            const matchMedia = window.matchMedia(paramsArray[0]);

            //Объекты с нужнми условиями
            const spollersArray = breakpointsArray.filter(function (item) {
                if (item.value === mediaBreakpoint && item.type === mediaType) {
                    return true;
                }
            });

            matchMedia.addListener(function () {
                initSpollers(spollersArray, matchMedia);
            });
            initSpollers(spollersArray, matchMedia);
        });
    }

    //Инициалиация

    function initSpollers(spollersArray, matchMedia = false) {
        spollersArray.forEach((spollersBlock) => {
            spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
            if (matchMedia.matches || !matchMedia) {
                spollersBlock.classList.add("_init");
                initSpollerBody(spollersBlock);
                spollersBlock.addEventListener("click", setSpollerAction);
            } else {
                spollersBlock.classList.remove("_init");
                initSpollerBody(spollersBlock, false);
                spollersBlock.removeEventListener("click", setSpollerAction);
            }
        });
    }

    //Работа с контентом
    function initSpollerBody(spollersBlock, hideSpollerBody = true) {
        const spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
        if (spollerTitles.length > 0) {
            spollerTitles.forEach((spollerTitle) => {
                if (hideSpollerBody) {
                    spollerTitle.removeAttribute("tabindex");
                    if (!spollerTitle.classList.contains("_active")) {
                        spollerTitle.nextElementSibling.hidden = true;
                    }
                } else {
                    spollerTitle.setAttribute("tabindex", "-1");
                    spollerTitle.nextElementSibling.hidden = false;
                }
            });
        }
    }

    function setSpollerAction(e) {
        const el = e.target;
        if (el.hasAttribute("data-spoller") || el.closest("[data-spoller]")) {
            const spollerTitle = el.hasAttribute("data-spoller")
                ? el
                : el.closest("[data-spoller]");
            const spollersBlock = spollerTitle.closest("[data-spollers]");
            const oneSpoller = spollersBlock.hasAttribute("data-one-spoller")
                ? true
                : false;
            if (!spollersBlock.querySelectorAll("_slide").length) {
                if (oneSpoller && !spollerTitle.classList.contains("_active")) {
                    hideSpollersBody(spollersBlock);
                }
                spollerTitle.classList.toggle("_active");
                _slideToggle(spollerTitle.nextElementSibling, 800);
            }
            e.preventDefault();
        }
    }

    function hideSpollersBody(spollersBlock) {
        const spollerActiveTitle = spollersBlock.querySelector(
            "[data-spoller]._active"
        );
        if (spollerActiveTitle) {
            spollerActiveTitle.classList.remove("_active");
            _slideUp(spollerActiveTitle.nextElementSibling, 800);
        }
    }
}

//Получение пойлеров с медиазапросами
/*   const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
    return item.dataset.spollers.split(",")[0];
  }); 
  
  продолжение https://www.youtube.com/watch?v=0fg9bZcL1RM&t=461s 14:07

  */

//slideToggle
let _slideUp = (target, duration = 500) => {
    if (!target.classList.contains("_slide")) {
        target.classList.add("_slide");
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + "ms";
        target.style.height = target.offsetHeight + "px";
        target.offsetHeight;
        target.style.overflow = "hidden";
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.padingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.hidden = true;
            target.style.removeProperty("height");
            target.style.removeProperty("padding-top");
            target.style.removeProperty("padding-bottom");
            target.style.removeProperty("margin-top");
            target.style.removeProperty("margin-bottom");
            target.style.removeProperty("overflow");
            target.style.removeProperty("transition-duration");
            target.style.removeProperty("transition-property");
            target.classList.remove("_slide");
        }, duration);
    }
};

let _slideDown = (target, duration = 500) => {
    if (!target.classList.contains("_slide")) {
        target.classList.add("_slide");
        if (target.hidden) {
            target.hidden = false;
        }
        let height = target.offsetHeight;
        target.style.overflow = "hidden";
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.padingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + "ms";
        target.style.height = height + "px";
        target.style.removeProperty("padding-top");
        target.style.removeProperty("padding-bottom");
        target.style.removeProperty("margin-top");
        target.style.removeProperty("margin-bottom");
        window.setTimeout(() => {
            target.style.removeProperty("height");
            target.style.removeProperty("overflow");
            target.style.removeProperty("transition-duration");
            target.style.removeProperty("transition-property");
            target.classList.remove("_slide");
        }, duration);
    }
};

let _slideToggle = (target, duration = 500) => {
    if (target.hidden) {
        return _slideDown(target, duration);
    } else {
        return _slideUp(target, duration);
    }
};

///////////// service__block

//находит массив элементов содержащих класс .tab__btn
const tabBtns = Array.from(document.querySelectorAll(".tab__btn"));
//находит массив элементов содержащих класс .tab__slide
const tabSlide = Array.from(document.querySelectorAll(".tab__slide"));

//присваивает класс active 1-му элементу в массиве
tabBtns[0].classList.add("_active");
tabSlide[0].classList.add("active");

// создаем переменные, помещаем в них элементы, содержащие класс active
let activeBtn = tabBtns[0];
let activeSlide = tabSlide[0];

// вещаем слушателя клика на все кнопки содержащие класс .tab__btn,
//при исполнении создаем функцию onTabBtnClick
tabBtns.forEach((el) => {
    el.addEventListener("click", onTabBtnClick);
});

// 2200 0202 2499 5128 Полев
// 89780818515
function onTabBtnClick(e) {
    e.preventDefault(); // защита события

    // при клике на <a></a> в service-b1 находит этот тег и помещает в переменую btn
    const btn = e.target.closest(".tab__btn");
    changeBtn(btn);
}

function changeBtn(btn) {
    // если <a></a> содержит класс active, то возвращаем этот же тег
    if (btn.classList.contains("_active")) {
        return;
    }

    // удалить из 1-ой переменной класс active
    activeBtn.classList.remove("_active");

    // кликнутому <a></a> присваивается класс active
    btn.classList.add("_active");

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

///// service-b1 ///// кнопки ////////////////////////////////////////////

/* document.querySelectorAll("active").onclick = () => {
  console.log(this); // смотри, this это не кнопка
}; */

///// service-b2 /////

const activeServiceBlock = document.querySelectorAll(".active");

console.log(activeServiceBlock);

//console.log(childActiveSB1);
