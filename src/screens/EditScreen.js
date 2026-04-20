import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import PostForm from '../components/PostForm';
import { Context } from '../context/DiaryContext';

const EditScreen = ({ navigation }) => {
  const id = navigation.getParam('id');
  const { state, editDiaryPost } = useContext(Context);
  const post = state.find((diaryPost) => diaryPost.id === id);

  return (
    <PostForm
      inititalValues={{ title: post.title, content: post.content, ingredients: post.ingredients, difficulty: post.difficulty, category: post.category }}
      onSubmit={(title, content, ingredients, difficulty, category) => {
        editDiaryPost(id, title, content, ingredients, difficulty, category, () =>
          navigation.navigate('View', { id: id })
        );
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default EditScreen;