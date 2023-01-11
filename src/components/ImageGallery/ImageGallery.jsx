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
    hits: [],
    totalHits: 0,
    loading: false,
    error: null,
    pageNumber: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchName } = this.props;
    const { pageNumber } = this.state;

    if (prevProps.searchName !== searchName && prevState.pageNumber > 1) {
      this.setState({ hits: [], loading: true, pageNumber: 1 });
    } else if (prevProps.searchName !== searchName) {
      this.setState({ hits: [], loading: true, pageNumber: 1 });
      this.fetchImages();
    } else if (prevState.pageNumber !== pageNumber) {
      this.setState({ loading: true });
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { searchName } = this.props;
    const { pageNumber } = this.state;
    const BASE_URL = 'https://pixabay.com/api/';
    const SearchParams = new URLSearchParams({
      q: `${searchName}`,
      page: `${pageNumber}`,
      key: '31431099-cb6424a99d97f67db3bc0cdc7',
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    });

    setTimeout(() => {
      fetch(`${BASE_URL}?${SearchParams}`)
        .then(res => res.json())
        .then(({ hits, totalHits }) => {
          if (!hits.length) {
            toast.error(
              `Oops, dear! Humanity hasn't invented such a word yet...`
            );
            return hits;
          }

          const fetchedData = hits.map(
            ({ id, webformatURL, largeImageURL, tags }) => ({
              id,
              webformatURL,
              largeImageURL,
              tags,
            })
          );

          this.setState(prevState => ({
            hits: [...prevState.hits, ...fetchedData],
            totalHits,
          }));
        })
        .catch(error => this.setState({ error, totalHits: 0 }))
        .finally(() => this.setState({ loading: false }));
    }, 1000);
  };

  loadMore = () => {
    this.setState(prevState => ({
      pageNumber: prevState.pageNumber + 1,
    }));
  };

  render() {
    const { hits, totalHits, loading, error } = this.state;

    return (
      <div>
        {loading && <Spinner />}
        {!hits.length && (
          <ActionCall>Please enter a search word to find picture</ActionCall>
        )}
        {error && <ErrorImage />}
        <ImageGalleryList>
          {hits.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              imageAlt={tags}
            />
          ))}
        </ImageGalleryList>
        {hits.length > 0 && hits.length < totalHits && (
          <LoadMoreBtn onClick={this.loadMore} />
        )}
      </div>
    );
  }
}

export default ImageGallery;
