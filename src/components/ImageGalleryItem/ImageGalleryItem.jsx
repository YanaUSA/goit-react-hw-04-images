import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  imageAlt,
  // onClick,
}) => {
  return (
    <GalleryItem>
      <GalleryItemImage src={webformatURL} alt={imageAlt} />
    </GalleryItem>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,

  // onClick: PropTypes.func.isRequired,
};
