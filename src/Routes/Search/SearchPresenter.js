import React from "react";
import Proptypes from "prop-types";
import styled from "styled-components"

const SearchPresenter = ({ movieResults, tvResults, error, searchTerm, loading, handleSubmit }) => null;

SearchPresenter.propTypes = {
    movieResults: Proptypes.array, 
    tvResults: Proptypes.array,
    error: Proptypes.string,
    searchTerm: Proptypes.string,
    loading: Proptypes.bool.isRequired, 
    handleSubmit: Proptypes.func.isRequired
}

export default SearchPresenter;