var accept_cookies = window.localStorage.getItem('accept_cookies');
var popup_accept_cookie = document.getElementById("da-btn-bar3");

if (!accept_cookies) {
    popup_accept_cookie.style.display = 'block';
};

var btn_accept_cookie = document.querySelector(".btn-accept-cookie2");

btn_accept_cookie.addEventListener('click', function () {
    window.localStorage.setItem('accept_cookies', true)
    popup_accept_cookie.style.display = 'none';
});
