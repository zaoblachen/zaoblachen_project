
///= ../../../../node_modules/slick-carousel/slick/slick.js

$(document).ready(function () {
    $(".slider").slick({
        //arrows:true,
        dots: true,
        //adaptiveHeight: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        speed: 4000,
        easing: "ease",
        infinite: true,
        initialSlie: 2,
        autoplay: true,
        autoplaySpeed: 3,
        pauseOnFocus: true,
        pauseOnHover: true,
        pauseOnDotsHover: true,
        //draggable: false,
        //swipe: false,
        touchThreshold: 10, //расстояние для свайпа
        //touchMove: false,
        waitForAnimate:false,
        //centerMode: true,
    });
});