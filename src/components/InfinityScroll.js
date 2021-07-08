import { setItem } from '../util/sessionStorage.js';


export default class InfinityScroll {    
  constructor({$target, instanceData}) {
    this.datas = instanceData(10);
    this.section = document.createElement('section');
    this.interTarget;
    this.section.className = 'container';
    $target.appendChild(this.section);
    this.interscetion = new IntersectionObserver((entires, observer)=>{
      entires.forEach(entry=>{
        if(entry.isIntersecting) {
          console.log(entry);
          this.setDatas([...this.datas, ...instanceData(10)]);
          observer.unobserve(entry.target);
          this.setTarget(observer);
        }
      });
    },{});
    this.render();
  }

  setDatas(datas) {
    this.datas = datas;
    this.render();
  }

  setInterTarget(interTarget) {
    this.interTarget = interTarget;
  }

  setTarget(intersectionObserver) {
    const blocks = document.querySelectorAll('.block');
    if(blocks.length>0) {
      intersectionObserver.observe(blocks.pop());
    }
  }
  

  render() {
    this.section.innerHTML='';
    this.datas.forEach((data, idx)=>{
      const block = document.createElement('div');
      block.className = 'block';
      block.style.backgroundColor = `rgb(${data[0]},${data[1]},${data[2]})`;
      block.innerText=idx;
      this.section.appendChild(block);
    });
    this.setTarget(this.interscetion);
  }
}