const fileNames = [
    "197",
    "382",
    "394",
    "496",
    "523",
    "679",
    "727",
    "888",
    "994",
    "1358",
    "1869",
    "2115"
];

const folder = fileNames[Math.floor(Math.random() * fileNames.length)];

for (let i = 1; i <= 2; i++) {
    const src = "/img/pose/" + folder + "/" + i + ".png";
    document.getElementById("randomImage" + i).src = src;
}

// Set the random file name as the src attribute of the img tag

document.addEventListener("DOMContentLoaded", function () {
    var slideCount = document.querySelectorAll("#slider ul li").length;
    var slideWidth = document.querySelector("#slider ul li").offsetWidth;
    var slideHeight = document.querySelector("#slider ul li").offsetHeight;
    var sliderUlWidth = slideCount * slideWidth;

    document.querySelector("#slider").style.width = slideWidth + "px";
    document.querySelector("#slider").style.height = slideHeight + "px";

    document.querySelector("#slider ul").style.width = sliderUlWidth + "px";
    document.querySelector("#slider ul").style.marginLeft =
        -slideWidth + "px";

    document
        .querySelector("#slider ul li:last-child")
        .parentNode.insertBefore(
            document.querySelector("#slider ul li:last-child"),
            document.querySelector("#slider ul li:first-child")
        );

    function moveLeft() {
        var sliderUl = document.querySelector("#slider ul");
        var firstSlide = document.querySelector("#slider ul li:first-child");
        var lastSlide = document.querySelector("#slider ul li:last-child");

        sliderUl.style.left = -slideWidth + "px";
        sliderUl.insertBefore(lastSlide, firstSlide);
        sliderUl.style.left = "";
    }

    function moveRight() {
        var sliderUl = document.querySelector("#slider ul");
        var firstSlide = document.querySelector("#slider ul li:first-child");
        var lastSlide = document.querySelector("#slider ul li:last-child");

        sliderUl.style.left = slideWidth + "px";
        sliderUl.appendChild(firstSlide);
        sliderUl.style.left = "";
    }

    document
        .querySelector("a.control_prev")
        .addEventListener("click", function () {
            moveLeft();
        });

    document
        .querySelector("a.control_next")
        .addEventListener("click", function () {
            moveRight();
        });
});

