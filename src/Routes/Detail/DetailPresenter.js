import React from "react";
import Proptypes from "prop-types";
import styled from "styled-components"

const DetailPresenter = ({ result, loading, error }) => null;

DetailPresenter.propTypes = {
    result: Proptypes.object,
    loading: Proptypes.bool.isRequired, 
    error: Proptypes.string
}

export default DetailPresenter;