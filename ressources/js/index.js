let $grid;

$(document).ready(function() {
    $grid = $('.masonry');
    $grid.imagesLoaded().done(function() {
        $grid.masonry({
            itemSelector: ".masonry-item",
            columnWidth: ".masonry-item",
            percentPosition: true,
            horizontalOrder: true,
            gutter: 10
        });
    });

    onResize();
});

$(window).resize(onResize);

function onResize() {
    $grid.masonry('layout');

    if ($(window).width() < 1200) {
        $("#navbar").addClass("hidden");
    } else {
        $("#navbar").removeClass("hidden");
    }
}

$("#navbar-toggle").on("click", function() {
    $("#navbar").toggleClass("hidden");
});

$(".nav-button").on("click", function () {
    if ($(window).width() < 1200) {
        $("#navbar").addClass("hidden");
    }
});

