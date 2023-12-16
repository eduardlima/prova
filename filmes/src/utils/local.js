import AsyncStorage from '@react-native-async-storage/async-storage';

const MOVIES_KEY = '@movies';

export const getMovies = async () => {
  try {
    const moviesData = await AsyncStorage.getItem(MOVIES_KEY);
    return moviesData ? JSON.parse(moviesData) : [];
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};

export const clearMovies = async () => {
  try {
    await AsyncStorage.removeItem(MOVIES_KEY);
    return true;
  } catch (error) {
    console.error('Erro ao limpar filmes:', error);
    return false;
  }
};

export const addMovie = async (movie) => {
  try {
    const movies = await getMovies();
    movies.push(movie);
    await AsyncStorage.setItem(MOVIES_KEY, JSON.stringify(movies));
    return true;
  } catch (error) {
    console.error('Erro ao adicionar filme:', error);
    return false;
  }
};
