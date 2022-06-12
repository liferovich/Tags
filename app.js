const form = document.querySelector(".tag__form");
const readonly = document.querySelector(".readonly__input");
const btnNewList = document.querySelector(".btn__newlist");

function onPageLoaded() {
    const tagList = new TagList();
    tagList.getTagList();

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = input.value;

        if (text) {
            tagList.setNewTag(text);
            input.value = "";
        }
    })

    readonly.addEventListener("change", () => {
        tagList.changeMode();
    });

    btnNewList.addEventListener("click", () => {
        tagList.deleteTagList();
    });
}

document.addEventListener("DOMContentLoaded", onPageLoaded);