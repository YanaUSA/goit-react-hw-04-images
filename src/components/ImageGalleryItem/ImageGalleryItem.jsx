import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';
import { Modal } from '../Modal/Modal';
import { useState, memo } from 'react';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, imageAlt }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  return (
    <GalleryItem>
      <GalleryItemImage
        src={webformatURL}
        alt={imageAlt}
        onClick={toggleModal}
      />
      {showModal && (
        <Modal
          largeImageURL={largeImageURL}
          imageAlt={imageAlt}
          onClose={toggleModal}
        />
      )}
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
};

export default memo(ImageGalleryItem);
