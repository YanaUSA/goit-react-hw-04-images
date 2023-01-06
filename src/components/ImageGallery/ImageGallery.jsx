import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { ImageGalleryList, ActionCall } from './ImageGallery.styled';
import { Spinner } from '../Loader/Loader';
import { ErrorImage } from '../ErrorImage/ErrorImage';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { LoadMoreBtn } from '../Button/Button';

export class ImageGallery extends Component {
  static defaultProps = {
    searchName: PropTypes.string.isRequired,
  };

  state = {
    data: null,
    error: null,
    status: 'idle',
    pageNumber: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchName } = this.props;
    const { pageNumber } = this.state;

    const BASE_URL = 'https://pixabay.com/api/';
    const SearchParams = new URLSearchParams({
      q: `${searchName}`,
      page: `${pageNumber}`,
      key: '31431099-cb6424a99d97f67db3bc0cdc7',
      image_type: 'photo',
      orientation: 'horizontal',
      PER_PAGE: 12,
    });

    if (prevProps.searchName !== searchName) {
      this.setState({ status: 'pending', pageNumber: 1 });

      setTimeout(() => {
        fetch(`${BASE_URL}?${SearchParams}`)
          .then(res => res.json())
          .then(data => {
            if (!data.hits.length) {
              toast.error(
                `Oops, dear! Humanity hasn't invented such a word yet...`
              );
              return this.setState({ status: 'idle' });
            }
            this.setState({ data: data.hits, status: 'resolved' });
          })
          .catch(error => this.setState({ error, status: 'rejected' }));
      }, 500);
    } else if (prevState.pageNumber !== pageNumber) {
      this.setState({ status: 'pending' });
      setTimeout(() => {
        fetch(`${BASE_URL}?${SearchParams}`)
          .then(res => res.json())
          .then(data => {
            if (!data.hits.length) {
              toast.error(
                `Oops, dear! Humanity hasn't invented such a word yet...`
              );
              return this.setState({ status: 'idle' });
            }
            this.setState({ data: data.hits, status: 'resolved' });
          })
          .catch(error => this.setState({ error, status: 'rejected' }));
      }, 500);
    }
  }

  loadMore = () => {
    this.setState(prevState => ({
      pageNumber: prevState.pageNumber + 1,
    }));
  };

  render() {
    const { data, status } = this.state;

    if (status === 'idle') {
      return (
        <ActionCall>Please enter a search word to find picture</ActionCall>
      );
    }

    if (status === 'pending') {
      return <Spinner />;
    }

    if (status === 'rejected') {
      return <ErrorImage />;
    }

    if (status === 'resolved') {
      return (
        <div>
          <ImageGalleryList>
            {data.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                imageAlt={tags}
              />
            ))}
          </ImageGalleryList>
          {data && <LoadMoreBtn onClick={this.loadMore} />}
        </div>
      );
    }
  }
}

export default ImageGallery;
