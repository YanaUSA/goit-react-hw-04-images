import PropTypes from 'prop-types';
import { Component } from 'react';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';
import { Modal } from '../Modal/Modal';

export class ImageGalleryItem extends Component {
  static defaultProps = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    imageAlt: PropTypes.string.isRequired,
  };

  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { webformatURL, largeImageURL, imageAlt } = this.props;
    const { showModal } = this.state;

    return (
      <GalleryItem>
        <GalleryItemImage
          src={webformatURL}
          alt={imageAlt}
          onClick={this.toggleModal}
        />
        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            imageAlt={imageAlt}
            onClose={this.toggleModal}
          />
        )}
      </GalleryItem>
    );
  }
}

export default ImageGalleryItem;
