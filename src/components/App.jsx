import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AppContainer } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export const App = () => {
  const [imageName, setImageName] = useState('');

  // const handleFormSubmit = imageName => {
  //   setImageName(imageName);
  // };

  return (
    <AppContainer>
      <Searchbar onSubmit={setImageName} />
      <ImageGallery searchName={imageName} />
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </AppContainer>
  );
};

export default App;
