import InfinityScroll from './components/InfinityScroll.js';

import { getItem, setItem } from './util/sessionStorage.js';

export default class App {
  constructor($target) {

    const infinityScroll = new InfinityScroll({
      $target,
      instanceData: (number) => {
        let arr = [];
        for(let i=0; i<number; i+=1) {
          arr.push([Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()*255)]);
        }
        return arr;
      },
    });
  }
}