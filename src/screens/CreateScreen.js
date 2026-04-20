import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import PostForm from '../components/PostForm';
import { Context } from '../context/DiaryContext';

const CreateScreen = ({ navigation }) => {
  const { addDiaryPost } = useContext(Context);

  return (
    <PostForm
      onSubmit={(title, content, ingredients, difficulty, category) => {
        addDiaryPost(title, content, ingredients, difficulty, category, () => navigation.navigate('Index'));
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default CreateScreen;