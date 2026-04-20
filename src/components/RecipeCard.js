import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const RecipeCard = ({ recipe, onPress, onFavoriteToggle, onDelete }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.difficulty}>Difficulty: {recipe.difficulty}</Text>
        <View style={styles.icons}>
          <TouchableOpacity onPress={onFavoriteToggle}>
            <MaterialIcons
              // Checks to see if the recipe is favorited or not
              name={recipe.favorite ? 'favorite' : 'favorite-border'}
              size={24}
              color={recipe.favorite ? '#FF6347' : '#333'}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete}>
            <MaterialIcons
              name="delete"
              size={24}
              color="#FF6347"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  info: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  difficulty: {
    fontSize: 16,
    color: '#666666',
    marginVertical: 5,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  icon: {
    marginLeft: 10,
  },
});

export default RecipeCard;