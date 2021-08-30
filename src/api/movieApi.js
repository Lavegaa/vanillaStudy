const request = async (url) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw errorData;
    }
  } catch (e) {
    throw {
      message: e.message,
      status: e.status,
    };
  }
};

const api = {
  getMovies: async () => {
    try {
      const movies = await request(
        "https://yts.mx/api/v2/list_movies.json?limit=15"
      );
      return {
        isError: false,
        data: movies?.data?.movies,
      };
    } catch (e) {
      return {
        isError: true,
        data: e,
      };
    }
  },
};

export { api };
