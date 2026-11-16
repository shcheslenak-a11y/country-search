import { CardInfo } from "./interfaces.js";

function createElement(
  tag: string,
  attibutes = {},
  innerText: string | null = null,
) {
  const element = document.createElement(tag);
  for (const [key, value] of Object.entries(attibutes))
    element.setAttribute(key, String(value));
  if (innerText) element.innerText = innerText;
  return element;
}

export function init() {
  const header = createElement("header");
  header.append(
    createElement("img", { src: "assets/search" }),
    createElement("input", { id: "search", type: "text" }),
  );

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
  const button = createElement("div", { class: "button" }, "Close");
  button.addEventListener("click", () => {
    (modal as HTMLDialogElement).close();
  });
  const inner = createElement("div");
  inner.append(createElement("div", { id: "modal-content" }), button);
  modal.append(inner);
  document.body.append(header, main, footer, modal);
  console.log("i");
  showResult([
    {
      name: "test",
      capital: "test",
      languages: [],
      currencies: [],
      flag: "",
      region: "A/b",
      population: 0,
    },
  ]);
}

function fillModal(data: CardInfo) {
  const modal = document.getElementById("modal");
  const content = document.getElementById("modal-content");
  content?.replaceChildren();

  content?.append(
    createElement("img", { src: data.flag }),
    createElement("h2", {}, data.name),
    createElement("label", {}, `Capital: ${data.capital}`),
    createElement("label", {}, `Region: ${data.region}`),
    createElement("label", {}, `Area: ${data.area || 0} km^2`),
    createElement("label", {}, `population: ${data.population}`),
    createElement("label", {}, `languages: ${data.languages.join(", ")}`),
    createElement("label", {}, `currencies: ${data.currencies.join(", ")}`),
  );

  (modal as HTMLDialogElement).showModal();
}

function createCard(data: CardInfo) {
  const card = createElement("div", { class: "card" });
  card.append(
    createElement("img", { src: data.flag }),
    createElement("h2", {}, data.name),
    createElement("label", {}, `Capital: ${data.capital}`),
    createElement("region", {}, `Region: ${data.region}`),
  );
  card.addEventListener("click", () => {
    fillModal(data);
  });
  return card;
}

function showResult(data: Array<CardInfo>) {
  console.log("s");
  const main = document.getElementsByTagName("main")[0];
  main?.replaceChildren();
  const results = createElement("div", { class: "results" });
  results.append(...data.map((item) => createCard(item)));
  main?.append(results);
}
