import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalContainer } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  render() {
    return createPortal(
      <Overlay>
        <ModalContainer>
          <img src="" alt="" />
        </ModalContainer>
      </Overlay>,
      modalRoot
    );
  }
}
