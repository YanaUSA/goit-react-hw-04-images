import { Oval } from 'react-loader-spinner';
import { SpinnerContainer } from './Loader.styled';

export const Spinner = () => {
  return (
    <SpinnerContainer>
      <Oval
        height={250}
        width={250}
        color="#3f51b5"
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#d0da0a"
        strokeWidth={5}
        strokeWidthSecondary={8}
      />
    </SpinnerContainer>
  );
};

// color = '#3f51b5';
// secondaryColor = '#7380cd';
