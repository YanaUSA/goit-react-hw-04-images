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
    error: null,
    status: 'idle',
    pageNumber: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchName } = this.props;
    const { pageNumber } = this.state;

    // console.log('prevProps.searchName:', prevProps.searchName);
    // console.log('searchName:', searchName);

    if (prevProps.searchName !== searchName && prevState.pageNumber > 1) {
      // console.log('reload');

      this.setState({ hits: [], status: 'pending', pageNumber: 1 });
    } else if (prevProps.searchName !== searchName) {
      // console.log('submit new name');

      this.setState({ hits: [], status: 'pending', pageNumber: 1 });
      this.fetchImages();
    } else if (prevState.pageNumber !== pageNumber) {
      // console.log('load more');

      this.setState({ status: 'pending' });
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

    fetch(`${BASE_URL}?${SearchParams}`)
      .then(res => res.json())
      .then(({ hits, totalHits }) => {
        if (!hits.length) {
          toast.error(
            `Oops, dear! Humanity hasn't invented such a word yet...`
          );
          return this.setState({ status: 'idle' });
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
          status: 'resolved',
        }));

        // console.log('data in fetch', fetchedData);
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  loadMore = () => {
    this.setState(prevState => ({
      pageNumber: prevState.pageNumber + 1,
    }));
  };

  render() {
    const { hits, totalHits, status } = this.state;

    // console.log('hits:', hits, 'totalHits', totalHits);

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
            {hits.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                imageAlt={tags}
              />
            ))}
          </ImageGalleryList>
          {hits.length < totalHits && <LoadMoreBtn onClick={this.loadMore} />}
        </div>
      );
    }
  }
}

export default ImageGallery;
