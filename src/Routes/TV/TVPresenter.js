import React from "react";
import Proptypes from "prop-types";
import styled from "styled-components"
import Helmet from "react-helmet";
import Section from "../../Components/Section"
import Loader from "../../Components/Loader"
import Message from "../../Components/Message";
import Poster from "../../Components/Poster";

const Container = styled.div`
    padding: 20px;
    padding-top: 20px;
`;

const TVPresenter = ({ topRated, popular, airingToday, loading, error }) => 
<> 
<Helmet>
    <title>TV Shows | Normfilx </title>
</Helmet>
{ loading ? <Loader /> : 
    <Container>
    {topRated && topRated.length > 0 && 
        <Section title="Top Rated Shows">
            {topRated.map(show=>
                <Poster 
                    key={show.id} 
                    id ={show.id} 
                    title = {show.original_name} 
                    imageUrl={show.poster_path}
                    rating={show.vote_average}
                    year={show.first_air_date && show.first_air_date.substring(0,4)}
                />)} 
        </Section>}
    {popular && popular.length > 0 && 
    <Section title="Popular Shows">
        {popular.map(show=> <Poster 
                    key={show.id} 
                    id ={show.id} 
                    title = {show.original_name} 
                    imageUrl={show.poster_path}
                    rating={show.vote_average}
                    year={show.first_air_date && show.first_air_date.substring(0,4)}
                />)}  
    </Section>}
    {airingToday && airingToday.length > 0 && 
    <Section title="AiringToday Shows">
        {airingToday.map(show=> <Poster 
                    key={show.id} 
                    id ={show.id} 
                    title = {show.original_name} 
                    imageUrl={show.poster_path}
                    rating={show.vote_average}
                    year={show.first_air_date && show.first_air_date.substring(0,4)}
                />)} 
    </Section>}     
    {error && <Message message="e74c3c" text={error}/>}
    
    </Container>}
    </>
    
    


TVPresenter.propTypes = {
    topRated: Proptypes.array, 
    popular: Proptypes.array, 
    airingToday: Proptypes.array,
    loading: Proptypes.bool.isRequired, 
    error: Proptypes.string
}

export default TVPresenter;