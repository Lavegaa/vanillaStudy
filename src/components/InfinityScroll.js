export default class InfinityScroll {
  constructor({ $target, instanceData }) {
    this.datas = instanceData(10);
    this.section = document.createElement("section");
    this.interTarget;
    this.section.className = "container";
    $target.appendChild(this.section);
    this.interscetion = new IntersectionObserver((entires, observer) => {
      entires.forEach((entry) => {
        if (entry.isIntersecting) {
          this.setDatas([...this.datas, ...instanceData(10)]);
          observer.unobserve(entry.target);
          this.setTarget(observer);
        }
      });
    }, {});
    this.lazyLoading = () => {
      const blocks = document.querySelectorAll(".lazy");
      console.log("blocks:   ", blocks);
      const lazy = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.backgroundColor = entry.target.dataset.color;
            entry.target.classList.remove("lazy");
            lazy.unobserve(entry.target);
          }
        });
      }, {});
      blocks.forEach((block) => {
        lazy.observe(block);
      });
    };
    this.render();
    this.lazyLoading();
  }

  setDatas(datas) {
    this.datas = datas;
    this.render();
    this.lazyLoading();
  }

  setInterTarget(interTarget) {
    this.interTarget = interTarget;
  }

  setTarget(intersectionObserver) {
    const blocks = document.querySelectorAll(".block");
    if (blocks.length > 0) {
      intersectionObserver.observe(blocks[blocks.length - 1]);
    }
  }

  render() {
    this.section.innerHTML = "";
    this.datas.forEach((data, idx) => {
      const block = document.createElement("div");
      block.classList.add("block", "lazy");
      block.dataset.color = `rgb(${data[0]},${data[1]},${data[2]})`;
      block.innerText = idx;
      this.section.appendChild(block);
    });
    this.setTarget(this.interscetion);
  }
}
