import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { ImageGalleryList, ActionCall } from './ImageGallery.styled';
import { Spinner } from '../Loader/Loader';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends Component {
  static defaultProps = {
    searchName: PropTypes.string.isRequired,
    // onClick: PropTypes.func.isRequired,
  };

  state = {
    data: null,
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps) {
    const { searchName } = this.props;

    if (prevProps.searchName !== searchName) {
      this.setState({ status: 'pending' });

      const BASE_URL = 'https://pixabay.com/api/';
      const SearchParams = new URLSearchParams({
        q: `${searchName}`,
        page: 1,
        key: '31431099-cb6424a99d97f67db3bc0cdc7',
        image_type: 'photo',
        orientation: 'horizontal',
        PER_PAGE: 12,
      });

      setTimeout(() => {
        fetch(`${BASE_URL}?${SearchParams}`)
          .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(new Error('An error occurred...'));
          })
          .then(data => {
            if (!data.hits.length) {
              return toast.error(
                `Oops, dear! Humanity hasn't invented such a word yet...`
              );
            }
            this.setState({ data: data.hits, status: 'resolved' });
          })
          .catch(error => this.setState({ error, status: 'rejected' }));
      }, 2000);
    }
  }

  render() {
    const { data, error, status } = this.state;
    // const { onClick } = this.props;

    if (status === 'idle') {
      return (
        <ActionCall>Please enter a search word to find picture</ActionCall>
      );
    }

    if (status === 'pending') {
      return <Spinner />;
    }

    if (status === 'rejected') {
      return <div>{error('An error occurred...')}</div>;
    }

    if (status === 'resolved') {
      return (
        <ImageGalleryList>
          {data.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              imageAlt={tags}
              // onClick={onClick}
            />
          ))}
        </ImageGalleryList>
      );
    }
  }
}

export default ImageGallery;
