import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { getMovies } from '../../utils/local';

const MainScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);

  const fetchMovies = useCallback(async () => {
    try {
      const fetchedMovies = await getMovies();
      setMovies(fetchedMovies);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchMovies();
    });

    return unsubscribe;
  }, [navigation, fetchMovies]);

  const handleAddMovie = () => {
    navigation.navigate('AddMovie');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.topMovies}>Melhores Filmes</Text>
      {movies.length === 0 ? (
        <Text></Text>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={styles.movieItem}>
              <Text style={styles.movieTitle}>{`${index + 1}. ${item.title || 'Título indisponível'}`}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.list}
        />
      )}
      <TouchableOpacity onPress={handleAddMovie} style={styles.addButton}>
        <Text style={styles.addButtonText}>Adicionar Filme</Text>
      </TouchableOpacity>
    </View>
  );
};

const buttonWidth = 200; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topMovies: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#ff0000',
  },
  list: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  movieItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  movieTitle: {
    fontSize: 24, 
    color: 'red',
    fontWeight: 'bold', 
    fontStyle: 'italic',
  },
  addButton: {
    backgroundColor: '#fff',
    width: buttonWidth,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ff0000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MainScreen;
