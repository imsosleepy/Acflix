import React from "react";
import Proptypes from "prop-types";
import styled from "styled-components"
import Helmet from "react-helmet"
import Loader from "../../Components/Loader"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Section from "../../Components/Section";
import Poster from "../../Components/Poster";

const Container = styled.div`
    height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    padding: 50px;
`;

const Content= styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    position:relative;
    z-index: 1;
`;

const Backdrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    filter: blur(3px);
    opacity: 0.45;
    z-index: 0;
`;

const Cover = styled.div`
    width: 30%;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    height: 100%;
    border-radius: 5px;
`;

const Data = styled.div`
    width: 70%;
    margin-left: 10px;
`;

const Title = styled.h3`
    font-size: 30px;
    margin-bottom: 10px;
`;

const Imdb = styled.a`
    background: #FF7F50;
    margin-left: 10px;
    font-size: 25px;
    height: 100%;
    border-radius: 5px;
    padding: 5px;
`;

const ItemContainer = styled.div`
margin:20px 0;
`;

const Item = styled.span`

`;

const Divider = styled.span`
    margin: 0 10px;
`;

const Overview = styled.p`
font-size: 12px;
opacity: 0.7;
line-height: 2;
width: 50%;
`;

const VideoContainer = styled.div`

`;

const VideoTitle = styled.div`
    font-size: 30px;
    margin-top: 20px;
`;

const Iframe = styled.iframe`
    margin-top: 20px;
`;

const TabContainer = styled.div`
    margin-top: 20px;
`
const ImageContainer = styled.div`
    margin-bottom: 5px;
`;

const Image = styled.div`
    float: left;
    margin-left: 5px;
    background-image: url(${props => props.bgUrl});
    width: 300px;
    height: 150px;
    object-fit: contain;
    background-repeat: no-repeat;
    border-radius: 4px;
    background-position: center center;
`;


const Country = styled.li`
  font-size: 22px;
`;

const DetailPresenter = ({ result, external, loading, error }) => 
loading ? 
<>
<title> Loading | Normfilx </title>
<Loader /> 
</>:
<Container>
    <Helmet><title>{result.original_title
              ? result.original_title
              : result.original_name}{" "} | Normfilx</title></Helmet>
    <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
    <Content>
        <Cover bgImage={result.poster_path ? `https://image.tmdb.org/t/p/original${result.poster_path}` : require("../../assets/noPosterSmall.png") }/>
        <Data>
        <Title>{result.original_title
              ? result.original_title
              : result.original_name}
              <Imdb href={`https://www.imdb.com/title/${external.imdb_id}`}>IMDB</Imdb>     
        </Title>
        
        <ItemContainer>
            <Item> {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
            {result.runtime
                ? result.runtime
                : result.episode_run_time[0]} min
            </Item>
            <Divider>•</Divider>
            <Item>
            {result.genres && result.genres.map((genre, index) => index === result.genres.length - 1 ? genre.name : `${genre.name} / `)}
            </Item>
            <Divider>•</Divider>
            <Item>
                {result.production_companies && result.production_companies.map((company, index) => index === result.production_companies.length - 1 ? company.name : `${company.name} / `)}
            </Item>
        </ItemContainer>
        <Overview>{result.overview}</Overview>
        <VideoContainer>
        <VideoTitle>Videos</VideoTitle>
        {result.videos.results &&
                  result.videos.results.map((video, index) => (
                    <Iframe
                      key={index}
                      width="600"
                      height="360"
                      src={`https://www.youtube.com/embed/${video.key}`}
                      frameborder="0"
                    ></Iframe>
                  ))}
        </VideoContainer>
        {result.seasons && result.seasons.length > 0 && <Section title="Seasons">
            {result.seasons.map((season) => {
                console.log(season);
                <Poster 
                key= {season.id} 
                id = {season.id} 
                title = {season.name} 
                imageUrl={season.poster_path}
                year={season.air_date && season.air_date.substring(0,4)}
                isMovie={false}
                />
            })
            }
            </Section>}
        <TabContainer>
        <Tabs>
            <TabList>
                <Tab>Production Companies</Tab>
                <Tab>Production Countries</Tab>
            </TabList>

            <TabPanel>
                {result.production_companies.map(company => 
                <ImageContainer key= {company.id}>
                <Image bgUrl={company.logo_path ? `https://image.tmdb.org/t/p/w300${company.logo_path}` : require("../../assets/noPosterSmall.png")} />
                {/* <Title>{company.name > 18 ? `${company.name(0, 18)}...` : company.name}</Title> */}
              </ImageContainer>)
               }
            </TabPanel>
            <TabPanel>
            {result.production_countries
                    ? result.production_countries.map((country, index) => (
                        <Country key={index}> {country.name}</Country>
                      ))
                    : result.origin_country.map((country, index) => (
                        <Country key={index}> {country}</Country>
                      ))}
            </TabPanel>
        </Tabs>
        </TabContainer>
    </Data>
    </Content>
    
    
</Container>;

DetailPresenter.propTypes = {
    result: Proptypes.object,
    external: Proptypes.object,
    loading: Proptypes.bool.isRequired, 
    error: Proptypes.string
}

export default DetailPresenter;