import { createMain } from "./logic/main.js";
import { debounce } from "./logic/debounce.js";
const storage = window.localStorage;
const storageLocation = "searchHistory";
function createElement(tag, attibutes = {}, innerText = null) {
    const element = document.createElement(tag);
    for (const [key, value] of Object.entries(attibutes))
        element.setAttribute(key, String(value));
    if (innerText)
        element.innerText = innerText;
    return element;
}
const cache = new Map(JSON.parse(storage.getItem(storageLocation) || "[]"));
function save() {
    storage.setItem(storageLocation, JSON.stringify([...cache.entries()]));
}
function createLoadingScreen() {
    const main = document.getElementsByTagName("main")[0];
    main?.replaceChildren();
    const wrapper = createElement("div", { class: "e404" });
    wrapper.append(createElement("img", { src: "assets/gear.gif", alt: "Loading Animation" }), createElement("label", {}, "Loading"));
    main?.append(wrapper);
}
const main = createMain(showResult, e404, showError, cache);
const search = debounce((query) => {
    createLoadingScreen();
    main(query);
}, 200);
export function init() {
    const header = createElement("header");
    const input = createElement("input", {
        id: "search",
        type: "text",
    });
    input.addEventListener("input", () => {
        search(input.value);
    });
    header.append(createElement("img", { src: "assets/glass.png" }), input);
    const main = createElement("main");
    const footer = createElement("footer");
    const course = createElement("a", {
        href: "https://rs.school/courses/javascript",
    });
    const courseImg = createElement("img", {
        src: "assets/logo.svg",
        alt: "RSSchool/Full-Stack JS",
    });
    course.append(courseImg);
    const github = createElement("a", {
        href: "https://github.com/shcheslenak-a11y",
    });
    const githubImg = createElement("img", {
        src: "assets/github.png",
        alt: "Github",
    });
    github.append(githubImg);
    footer.append(course, "2026", github);
    const modal = createElement("dialog", { id: "modal" });
    const buttonCloseModal = createElement("div", { class: "button" }, "Close");
    buttonCloseModal.addEventListener("click", () => {
        modal.close();
    });
    const inner = createElement("div");
    inner.append(createElement("div", { id: "modal-content" }), buttonCloseModal);
    modal.append(inner);
    const history = createElement("dialog");
    const buttonCloseHistory = createElement("div", { class: "button" }, "Close");
    buttonCloseHistory.addEventListener("click", () => {
        history.close();
    });
    const innerHistory = createElement("div");
    const table = createElement("table", { id: "history" });
    innerHistory.append(table, buttonCloseHistory);
    history.append(innerHistory);
    const openHistory = createElement("div", { class: "button" }, "History");
    openHistory.addEventListener("click", () => {
        table.replaceChildren();
        cache.keys().forEach((k) => {
            const row = createElement("tr");
            row.append(createElement("td", {}, k));
            row.addEventListener("click", () => {
                input.value = k;
                search(k);
                history.close();
            });
            table.append(row);
        });
        history.showModal();
    });
    document.body.append(header, openHistory, main, footer, modal, history);
}
function fillModal(data) {
    const modal = document.getElementById("modal");
    const content = document.getElementById("modal-content");
    content?.replaceChildren();
    content?.append(createElement("img", { src: data.flag, alt: "Flag image" }), createElement("h2", {}, data.name), createElement("label", {}, `Capital: ${data.capital}`), createElement("label", {}, `Region: ${data.region}`), createElement("label", {}, `Area: ${data.area || 0} km^2`), createElement("label", {}, `population: ${data.population}`), createElement("label", {}, `languages: ${data.languages.join(", ")}`), createElement("label", {}, `currencies: ${data.currencies.join(", ")}`));
    modal.showModal();
}
function createCard(data) {
    const card = createElement("div", { class: "card" });
    card.append(createElement("img", { src: data.flag, alt: "Flag image" }), createElement("h2", {}, data.name), createElement("label", {}, `Capital: ${data.capital}`), createElement("label", {}, `Region: ${data.region}`));
    card.addEventListener("click", () => {
        fillModal(data);
    });
    return card;
}
function showResult(data) {
    const main = document.getElementsByTagName("main")[0];
    main?.replaceChildren();
    const results = createElement("div", { class: "results" });
    results.append(...data.map((item) => createCard(item)));
    main?.append(results);
    save();
}
function e404(err) {
    const main = document.getElementsByTagName("main")[0];
    main?.replaceChildren();
    const msg = createElement("div", { class: "e404" });
    msg.append(createElement("h1", {}, "404"), createElement("label", {}, err.message));
    main?.append(msg);
}
function showError(err) {
    const main = document.getElementsByTagName("main")[0];
    main?.replaceChildren();
    const wrapper = createElement("div", { class: "error" });
    const msg = createElement("div", { class: "e404" });
    msg.append(createElement("h1", {}, "Something went wrong"), createElement("label", {}, err.message));
    const button = createElement("div", { class: "button" }, "Retry");
    button.addEventListener("click", () => {
        search(document.getElementById("search").value);
    });
    wrapper.append(msg, button);
    main?.append(wrapper);
}
//# sourceMappingURL=dom.js.map