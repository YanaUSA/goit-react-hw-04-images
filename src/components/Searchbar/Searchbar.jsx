import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  HeaderSearchbar,
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
} from './Searchbar.styled';

import { IoSearch } from 'react-icons/io5';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    imageName: '',
  };

  handleNameChange = evt => {
    this.setState({ imageName: evt.currentTarget.value.toLowerCase() });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { onSubmit } = this.props;
    const { imageName } = this.state;

    if (imageName.trim() === '') {
      toast.warn('Please enter search name!');
      return;
    }
    onSubmit(imageName);

    this.setState({ imageName: '' });
  };

  render() {
    const { imageName } = this.state;
    return (
      <HeaderSearchbar>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormBtn type="submit">
            <IoSearch
              style={{ fill: 'darkblue', height: '20px', width: '20px' }}
            />
          </SearchFormBtn>
          <SearchFormInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={imageName}
            onChange={this.handleNameChange}
          />
        </SearchForm>
      </HeaderSearchbar>
    );
  }
}

export default Searchbar;
