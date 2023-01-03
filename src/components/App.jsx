import { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    imageName: '',
    // loading: false,
  };

  handleFormSubmit = imageName => {
    this.setState({ imageName });
  };

  render() {
    const { imageName, loading } = this.state;

    console.log('imageName in App', imageName);
    return (
      <>
        <div>
          {loading && <h1>Loading...</h1>}
          {imageName && <div>Imageeeeeee</div>}
        </div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchName={imageName} />
        <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      </>
    );
  }
}

export default App;
