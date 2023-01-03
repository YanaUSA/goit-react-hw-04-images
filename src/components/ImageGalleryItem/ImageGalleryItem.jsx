import PropTypes from 'prop-types';
import {GalleryItem, GalleryItemImage} from './ImageGalleryItem.styled'

export const ImageGalleryItem = (data: {id, webformatURL,largeImageURL }) => {
  return {
    <GalleryItem>
  <GalleryItemImage src="" alt="" />
</GalleryItem>
  }
}


export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  data: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired, largeImageURL: PropTypes.string.isRequired,  
  })).isRequired
};