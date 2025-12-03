const msg: string = "Hello!";
alert(msg);

type StyleKey = "Dark" | "White" | "Violet";
interface StyleDefinition {
    key: StyleKey;
    label: string;
    file: string;
}
const styles: StyleDefinition[] = [
    { key: "Dark", label: "Dark style", file: "/style1.css" },
    { key: "White", label: "White style", file: "/style2.css" },
    { key: "Violet", label: "Violet style", file: "/style3.css" },
];
function applyStyle(style: StyleDefinition): void {
    const head = document.querySelector("head");
    if (!head) {
        console.error("Error <head> not find");
        return;
    }
    const existingLink = document.querySelector<HTMLLinkElement>(
        'link[data-style="active"]'
    );
    if (existingLink) {
        existingLink.remove();
    }
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = style.file;
    link.setAttribute("data-style", "active");
    head.appendChild(link);
    console.log(`Style: ${style.label} (${style.file})`);
}
function createStyleLinks(): void {
    const container = document.createElement("nav");
    container.id = "style-links";
    container.style.margin = "12px 0";
    container.style.display = "flex";
    container.style.gap = "12px";
    container.style.alignItems = "center";

    const label = document.createElement("span");
    label.textContent = "Wybierz styl:";
    label.style.fontWeight = "600";
    container.appendChild(label);

    styles.forEach((styleDef) => {
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = styleDef.label;
        link.style.padding = "4px 8px";
        link.style.borderRadius = "999px";
        link.style.textDecoration = "none";
        link.style.fontSize = "0.9rem";

        link.style.border = "1px solid rgba(255,255,255,0.4)";
        link.style.color = "inherit";

        link.addEventListener("click", (event) => {
            event.preventDefault();
            applyStyle(styleDef);
        });

        container.appendChild(link);
    });
    const header = document.querySelector("header");
    if (header && header.parentElement) {
        header.parentElement.insertBefore(container, header.nextSibling);
    } else {
        document.body.prepend(container);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    createStyleLinks();

    const defaultStyle = styles[1] ?? styles[0];
    applyStyle(defaultStyle);
});