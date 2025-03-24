$(document).ready(function() {
    onResize();

    var $grid = $(".masonry").masonry({
        itemSelector: ".masonry-item",
        columnWidth: ".masonry-item",
        percentPosition: true,
        horizontalOrder: true,
        gutter: 10
    });

    $grid.imagesLoaded().progress( function() {
        $grid.masonry('layout');
    });

    $(window).resize(function() {
        $grid.masonry('layout');
    });
});

$(window).resize(onResize);

function onResize() {
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

