import PropTypes from 'prop-types';
import { Component } from 'react';
import { ImageGalleryList } from './ImageGallery.styled';

export class ImageGallery extends Component {
  static defaultProps = {
    searchName: PropTypes.string.isRequired,
  };

  state = {
    data: null,
  };

  componentDidUpdate(prevProps) {
    const { searchName } = this.props;

    if (prevProps.searchName !== searchName) {
      const BASE_URL = 'https://pixabay.com/api/';
      const SearchParams = new URLSearchParams({
        q: { searchName },
        page: 1,
        key: '31431099-cb6424a99d97f67db3bc0cdc7',
        image_type: 'photo',
        orientation: 'horizontal',
        PER_PAGE: 12,
      });

      setTimeout(() => {
        fetch(`${BASE_URL}?${SearchParams}`)
          .then(res => res.json())
          .then(data => this.setState({ data: data.hits }))
          .finally(this.setState({ loading: false }));
      }, 1000);
    }
  }

  render() {
    const { data } = this.state;

    return (
      <ImageGalleryList>
        {/* <ImageGalleryItem data={data} key={data.id} /> */}
      </ImageGalleryList>
    );
  }
}

export default ImageGallery;
