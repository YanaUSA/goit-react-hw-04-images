import { Oval } from 'react-loader-spinner';
import { SpinnerContainer } from './Loader.styled';

export const Spinner = () => {
  return (
    <SpinnerContainer>
      <Oval
        height={150}
        width={150}
        color="#3f51b5"
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#7380cd"
        strokeWidth={3}
        strokeWidthSecondary={3}
      />
    </SpinnerContainer>
  );
};
