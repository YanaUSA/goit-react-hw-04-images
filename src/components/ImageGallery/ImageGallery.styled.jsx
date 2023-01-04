import styled from 'styled-components';

export const ImageGalleryList = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 10;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;

export const ActionCall = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 50px;
  font-size: 20px;
  font-weight: 400;
  color: gray;
  background-color: transparent;
`;
