import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    imageName: '',
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleFormSubmit = imageName => {
    this.setState({ imageName });
  };

  render() {
    const { imageName, showModal } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchName={imageName} onClick={this.toggleModal} />
        {showModal && <Modal />}
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      </>
    );
  }
}

export default App;
