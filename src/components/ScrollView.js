import InfinityScroll from "../util/InfinityScroll.js";
import lazyLoading from "../util/LazyLoading.js";

export default class ScrollView {
  constructor({ $target, data, fetchData }) {
    this.section = document.createElement("section");
    this.section.classList.add("container");
    this.data = [];
    fetchData();
    lazyLoading();
    this.intersection = InfinityScroll(fetchData);
    $target.appendChild(this.section);

    //event delegation
    this.section.addEventListener("click", (e) => {
      const path = e.path;
      const card = path.find((comp) => comp.className == "block");
      if (card) {
        const item = this.findById(card.dataset.id);
        console.log(item);
      }
    });
  }

  findById(id) {
    return this.data.find((val) => {
      return (val.id = id);
    });
  }

  setData(data) {
    this.data = data;
    this.render();
    lazyLoading();
  }

  setIntersection() {
    const blocks = document.querySelectorAll(".block");
    this.intersection.observe(blocks[blocks.length - 1]);
  }

  render() {
    this.section.innerHTML = "";
    this.data.forEach((val, idx) => {
      const block = document.createElement("div");
      block.classList.add("block", "lazy");
      block.dataset.src = val.medium_cover_image;
      block.dataset.id = val.id;

      const title = document.createElement("h1");
      title.innerText = val.title;
      block.appendChild(title);
      this.section.appendChild(block);
    });
    this.setIntersection();
  }
}
