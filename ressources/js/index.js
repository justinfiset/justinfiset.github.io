let $grid;

$(document).ready(function() {
    $grid = $('.masonry').masonry({
        itemSelector: ".masonry-item",
        columnWidth: ".masonry-item",
        percentPosition: true,
        horizontalOrder: true,
        gutter: 10
    });

    $grid.imagesLoaded().progress(function() {
        $grid.masonry('layout');
    });

    onResize(); 
});

$(window).resize(onResize);

function onResize() {
    $grid.masonry('layout');

    if ($(window).width() < 1200) {
        $("#navbar").addClass("navbar-hidden");
    } else {
        $("#navbar").removeClass("navbar-hidden");
    }
}

$("#navbar-toggle").on("click", function() {
    $("#navbar").toggleClass("navbar-hidden");
});

$(".nav-button").on("click", function () {
    if ($(window).width() < 1200) {
        $("#navbar").addClass("navbar-hidden");
    }
});

