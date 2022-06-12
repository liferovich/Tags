const input = document.querySelector(".tag__input");
const list = document.querySelector(".tag__list");
const button = document.querySelector(".btn__add");

class TagList {
    constructor() {
        this.tags = [];
        this.readonly = false;
    }

    getTagList() {
        const tagList = localStorage.getItem('tags');

        if (tagList) {
            this.tags = JSON.parse(tagList);
        }

        return this.showTagList();
    }

    showTag(tag) {
        list.appendChild(tag);
    }

    showTagList() {
        list.innerHTML = "";
        this.tags.map(tag => this.createTag(tag));
    }

    createTag(tag) {
        const tagElement = document.createElement("div");
        tagElement.classList.add("tag__item");
        tagElement.setAttribute("data-id", tag.id);

        const tagtext = document.createElement("div");
        tagtext.classList.add("tag__text");
        tagtext.innerText = tag.text;

        const tagBtns = document.createElement("div");
        tagBtns.classList.add("tag__btns");

        const delBtn = document.createElement("button");
        delBtn.innerText = "x";
        const t = this;
        delBtn.addEventListener("click", function () {
            t.deleteTag(tag.id);
        });

        if (this.readonly) {
            delBtn.setAttribute('disabled', true)
        }

        tagBtns.appendChild(delBtn);
        tagElement.appendChild(tagtext);
        tagElement.appendChild(tagBtns);
        this.showTag(tagElement);

        return tagElement;
    }

    setNewTag(text) {
        const tag = {
            id: this.tags.length,
            text
        };
        this.tags.push(tag)
        this.saveTagList();
        return this.createTag(tag);
    }

    saveTagList() {
        localStorage.setItem('tags', JSON.stringify(this.tags));
    }

    deleteTagList() {
        this.tags = [];
        this.saveTagList();
        this.showTagList();
        return;
    }

    deleteTag(id) {
        const index = this.tags.findIndex(x => x.id === id);
        this.tags.splice(index, 1);
        this.saveTagList();
        this.showTagList();
    }

    changeMode() {
        this.readonly = !this.readonly;
        input.toggleAttribute('readonly');
        button.toggleAttribute('disabled');
        this.showTagList();
    }
}