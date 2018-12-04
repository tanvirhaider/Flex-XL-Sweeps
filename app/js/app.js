

// @codekit-prepend "_Sizmek.js"

// document.getElementById("myBtn").addEventListener("click", displayDate);

function init () {
    console.log("start the ad");

    var hero = document.querySelector(".hero");
    hero.addEventListener("click", heroClicked);

    function heroClicked (event) {
        console.log("logo clicked");
        window.EB.clickthrough();
    }

}