import ScrollView from "./components/ScrollView.js";
import { api } from "./api/movieApi.js";

export default class App {
  constructor($target) {
    let page = 1;
    const scrollView = new ScrollView({
      $target,
      fetchData: async () => {
        const response = await api.getMovies(page);
        page += 1;
        if (!response.isError) {
          const newData = [...scrollView.data, ...response.data];
          scrollView.setData(newData);
        } else {
          //에러처리하기
        }
      },
    });
  }
}
