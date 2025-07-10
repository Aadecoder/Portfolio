document.addEventListener("DOMContentLoaded", () => {
    const linkedin = document.querySelector(".linkedin-logo");
    linkedin.addEventListener("click", () => {
        window.open("https://www.linkedin.com/in/aditya-rajput-70372930a", "_blank");
    });

    const github = document.querySelector(".github-logo");
    github.addEventListener("click", () => {
        window.open("https://github.com/Aadecoder", "_blank");
    });

    const twitter = document.querySelector(".twitter-logo");
    twitter.addEventListener("click", () => {
        window.open("https://x.com/aadi_rajputr?t=_LE9oiP701BC5Nr2A7GkAA&s=09", "_blank");
    });

    const gmail = document.querySelector(".gmail-logo");
    gmail.addEventListener("click", () => {
        window.open("mailto:adityandr8274@gmail.com", "_blank");
    });

    const chess = document.querySelector(".github-chess");
    chess.addEventListener("click", () => {
        window.open("https://github.com/Aadecoder/Chess_Advisor", "_blank");
    });
});
