import InfinityScroll from "../util/InfinityScroll.js";

export default class ScrollView {
  constructor({ $target, data, handleScroll }) {
    this.section = document.createElement("section");
    this.section.classList.add("container");
    this.datas = [];
    handleScroll();
    this.intersection = InfinityScroll(handleScroll);
    $target.appendChild(this.section);
  }

  setDatas(datas) {
    this.datas = datas;
    this.render();
  }

  setIntersection() {
    const blocks = document.querySelectorAll(".block");
    this.intersection.observe(blocks[blocks.length - 1]);
  }

  render() {
    this.section.innerHTML = "";
    this.datas.forEach((val, idx) => {
      const block = document.createElement("div");
      block.classList.add("block", "lazy");
      console.log(val);

      const title = document.createElement("h1");
      title.innerText = val.title;
      block.appendChild(title);
      this.section.appendChild(block);
    });
    this.setIntersection();
  }
}
