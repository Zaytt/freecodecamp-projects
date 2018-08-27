$("#welcome-link").click(function() {
    var offset = -100; //Offset of 20px

    $('html, body').animate({
        scrollTop: $("#welcome-section").offset().top + offset
    }, 1500);
});

$("#projects-link").click(function() {
    var offset = 100; //Offset of 20px

    $('html, body').animate({
        scrollTop: $("#projects").offset().top + offset
    }, 1500);
});