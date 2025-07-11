document.addEventListener("DOMContentLoaded", () => {
    const terminal = document.querySelector(".terminal");
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

    const email = document.querySelector(".email-logo");
    email.addEventListener("click", () => {
        window.open("mailto:adityandr8274@gmail.com", "_blank");
    });

    const chess = document.querySelector(".github-chess");
    chess.addEventListener("click", () => {
        window.open("https://github.com/Aadecoder/Chess_Advisor", "_blank");
    });

    const stm32f411 = document.querySelector(".github-stm32f411");
    stm32f411.addEventListener("click", () => {
        window.open("https://github.com/Aadecoder/STM32F411xx-Drivers", "_blank");
    });

    const tbutton = document.querySelector(".terminal-button");
    tbutton.addEventListener("click", () => {
        tbutton.classList.add("hidden");
        terminal.classList.remove("hidden");
    });

    const close = document.querySelector(".close");
    close.addEventListener("click", ()=>{
        terminal.classList.add("hidden");
        tbutton.classList.remove("hidden");
    })
    const output = document.getElementById("output");
    const input = document.querySelector(".area");
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            const command = input.value.trim();
            if (command !== "") {
                handleCommand(command);
                input.value = "";
            }
        }
    });
    function handleCommand(cmd) {
        printOutput(`> ${cmd}`);

        if (cmd === "/help") {
            printOutput("Available commands:\n/help - Show commands\n#id - Scroll to element with ID\n/clear - Clear terminal");
        } else if (cmd === "/clear") {
            output.innerHTML = "";
        } else if (cmd.startsWith("#")) {
            const id = cmd.slice(1);
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
                printOutput(`Scrolled to element with ID "${id}".`);
            } else {
                printOutput(`No element found with ID "${id}".`);
            }
        }else{
            printOutput(`Unknown command: "${cmd}"`);
        }
    }

    function printOutput(text) {
        const para = document.createElement("div");
        para.textContent = text;
        output.appendChild(para);
        output.scrollTop = output.scrollHeight;
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
            });
        });
    });
});
