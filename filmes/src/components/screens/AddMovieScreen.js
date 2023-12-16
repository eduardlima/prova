import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { addMovie, clearMovies } from '../../utils/local';

const AddMovieScreen = () => {
  const [movieTitle, setMovieTitle] = useState('');

  const handleAddMovie = async () => {
    if (movieTitle.trim() === '') {
      Alert.alert('Erro', 'Por favor, insira um título de filme válido.');
      return;
    }

    const success = await addMovie({ title: movieTitle });
    if (success) {
      Alert.alert('Sucesso', 'Filme adicionado com sucesso!');
      setMovieTitle('');
    } else {
      Alert.alert(
        'Erro',
        'Ocorreu um erro ao adicionar o filme. Por favor, tente novamente.'
      );
    }
  };

  const handleClearMovies = async () => {
    try {
      await clearMovies();
      Alert.alert('Sucesso', 'Filmes apagados com sucesso!');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Ocorreu um erro ao limpar os filmes. Por favor, tente novamente.');
    }
  };

 

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Título do filme"
        value={movieTitle}
        onChangeText={(text) => setMovieTitle(text)}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddMovie}>
        <Text style={styles.buttonText}>Adicionar Filme</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.clearButton} onPress={handleClearMovies}>
        <Text style={styles.buttonText}>Limpar Todos os Filmes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  addButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
  clearButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
  buttonText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default AddMovieScreen;
