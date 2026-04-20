import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Context } from '../context/DiaryContext';

const ViewScreen = ({ navigation }) => {
  const { state } = useContext(Context);
  const id = navigation.getParam('id');
  const post = state.find((diaryPost) => diaryPost.id === id);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.category}>Category: {post.category}</Text>
        <Text style={styles.difficulty}>Difficulty: {post.difficulty}</Text>
        <Text style={styles.sectionHeader}>Ingredients:</Text>
        {post.ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.ingredient}>
            {ingredient.quantity} {ingredient.unit} of {ingredient.name}
          </Text>
        ))}
      </View>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('Edit', { id: post.id })}
      >
        <MaterialIcons name="edit" size={20} color="white" />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8EDEB',
  },
  card: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  category: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
  },
  difficulty: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  ingredient: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  editButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#da5552',
    borderRadius: 30,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
});

export default ViewScreen;