import PropTypes from 'prop-types';

import { Button, ButtonContainer } from './Button.styled';

export const LoadMoreBtn = ({ onClick }) => {
  return (
    <ButtonContainer>
      <Button type="button" onClick={onClick}>
        Load more
      </Button>
    </ButtonContainer>
  );
};

LoadMoreBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
};
