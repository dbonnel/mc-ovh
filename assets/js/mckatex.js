
$class("mc-katex").forEach(function (item) {
    katex.render(item.textContent, item, { displayMode: true });
    item.classList.remove("mc-katex")
    item.classList.add("katex-wrapper");
});

