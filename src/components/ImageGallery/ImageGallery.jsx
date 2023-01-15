import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { ImageGalleryList, ActionCall } from './ImageGallery.styled';
import { Spinner } from '../Loader/Loader';
import { ErrorImage } from '../ErrorImage/ErrorImage';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { LoadMoreBtn } from '../Button/Button';

export const ImageGallery = ({ searchName }) => {
  const [hits, setHits] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const fetchImages = () => {
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

        setHits(prevHits => [...prevHits, ...fetchedData]);
        setTotalHits(totalHits);
      })
      .catch(error => setError(error), setTotalHits(0))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (searchName !== '') {
      setHits([]);
      setLoading(true);
      setPageNumber(1);
      fetchImages();
    }
  }, [searchName]);

  useEffect(() => {
    if (pageNumber > 1) {
      setLoading(true);
      fetchImages();
    }
  }, [pageNumber]);

  const loadMore = () => {
    setPageNumber(prevPageNumber => prevPageNumber + 1);
  };

  return (
    <div>
      {loading && <Spinner />}
      {!hits.length && !loading && !error && (
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
      {hits.length > 0 && hits.length < totalHits && !loading && (
        <LoadMoreBtn onClick={loadMore} />
      )}
    </div>
  );
};

ImageGallery.propTypes = {
  searchName: PropTypes.string.isRequired,
};

export default ImageGallery;
