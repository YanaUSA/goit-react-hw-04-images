import image from '../ErrorImage/404_pages.jpg';
import { ErrorContainer } from './ErrorImage.styled';

export const ErrorImage = () => {
  return (
    <ErrorContainer>
      <img src={image} alt="error 404" style={{ borderRadius: '5px' }} />
    </ErrorContainer>
  );
};
