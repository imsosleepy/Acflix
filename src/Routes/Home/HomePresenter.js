import React from "react";
import Proptypes from "prop-types";
import styled from "styled-components"
import Section from "../../Components/Section"
import Loader from "../../Components/Loader"
import Message from "../../Components/Message";
import Poster from "../../Components/Poster";

const Container = styled.div`
    padding: 20px;
    padding-top: 20px;
`;

const HomePresenter = ({ nowPlaying, popular, upcoming, loading, error }) => loading ? <Loader /> : 
<Container> 
    {nowPlaying && nowPlaying.length > 0 && 
    <Section title="Now Playing">
        {nowPlaying.map(movie => 
        <Poster 
            key={movie.id} 
            id ={movie.id} 
            title = {movie.original_title} 
            imageUrl={movie.poster_path}
            rating={movie.vote_average}
            year={movie.release_date && movie.release_date.substring(0,4)}
            isMovie={true}
        />)}
    </Section>}
    {upcoming && upcoming.length > 0 && 
    <Section title="Upcoming Movies">
        {upcoming.map(movie => <Poster 
            key={movie.id} 
            id ={movie.id} 
            title = {movie.original_title} 
            imageUrl={movie.poster_path}
            rating={movie.vote_average}
            year={movie.release_date && movie.release_date.substring(0,4)}
            isMovie={true}
        />)}
    </Section>}
    {popular && popular.length > 0 && 
    <Section title="Popular Movies">
        {popular.map(movie => <Poster 
            key={movie.id} 
            id ={movie.id} 
            title = {movie.original_title} 
            imageUrl={movie.poster_path}
            rating={movie.vote_average}
            year={movie.release_date && movie.release_date.substring(0,4)}
            isMovie={true}
        />)}
    </Section>}
    {error && <Message message="e74c3c" text={error}/>}
</Container>;
;

HomePresenter.propTypes = {
    nowPlaying: Proptypes.array, 
    popular: Proptypes.array, 
    upcoming: Proptypes.array,
    loading: Proptypes.bool.isRequired, 
    error: Proptypes.string
}

export default HomePresenter;