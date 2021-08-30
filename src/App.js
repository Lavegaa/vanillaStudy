// import InfinityScroll from "./components/InfinityScroll.js";
import ScrollView from "./components/ScrollView.js";
import { api } from "./api/movieApi.js";

export default class App {
  constructor($target) {
    let data = [];
    let page = 1;
    const scrollView = new ScrollView({
      $target,
      data,
      handleScroll: async () => {
        const response = await api.getMovies(page);
        page += 1;
        if (!response.isError) {
          const newData = [...scrollView.datas, ...response.data];
          scrollView.setDatas(newData);
        } else {
          //에러처리하기
        }
      },
    });
  }
}
