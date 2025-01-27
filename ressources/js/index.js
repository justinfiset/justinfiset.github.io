$(document).ready(function() {
    onResize();
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

