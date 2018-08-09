$("#about-link").click(function () {
    var offset = -100; //Offset of 20px

    $('html, body').animate({
        scrollTop: $("#about").offset().top + offset },
    1500);
});

$("#services-link").click(function () {
    var offset = 100; //Offset of 20px

    $('html, body').animate({
        scrollTop: $("#services").offset().top + offset },
    1500);
});

$("#pricing-link").click(function () {
    var offset = 0; //Offset of 20px

    $('html, body').animate({
        scrollTop: $("#pricing").offset().top + offset },
    1500);
});

$("#newsletter-link").click(function () {
    var offset = 20; //Offset of 20px

    $('html, body').animate({
        scrollTop: $("#newsletter").offset().top + offset },
    1500);
});

$("#top").click(function () {
    var offset = 20; //Offset of 20px

    $('html, body').animate({
        scrollTop: $("#main").offset().top + offset },
    1500);
});