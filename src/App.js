// import InfinityScroll from "./components/InfinityScroll.js";
import ScrollView from "./components/ScrollView.js";
import { api } from "./api/movieApi.js";

export default class App {
  constructor($target) {
    let data = [];
    const scrollView = new ScrollView({
      $target,
      data,
      handleScroll: async () => {
        const response = await api.getMovies();
        if (!response.isError) {
          const newData = [...scrollView.datas, ...response.data];
          scrollView.setDatas(newData);
        } else {
          //에러처리하기
        }
      },
    });
    // const infinityScroll = new InfinityScroll({
    //   $target,
    //   data,
    //   instanceData: (number) => {
    //     let arr = [];
    //     for (let i = 0; i < number; i += 1) {
    //       arr.push([
    //         Math.floor(Math.random() * 255),
    //         Math.floor(Math.random() * 255),
    //         Math.floor(Math.random() * 255),
    //       ]);
    //     }
    //     return arr;
    //   },
    //   handleScroll: async () => {
    //     const response = await api.getMovies();
    //     if (!movies.isError) {
    //       const newData = [...data, response.data];

    //     }
    //   },
    // });
  }
}
