import React from "react";
import Proptypes from "prop-types";
import styled from "styled-components"
import Helmet from "react-helmet"
import Loader from "../../Components/Loader"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

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
    margin-bottom: 20px;
`;

const SeasonContainer = styled.div`
    width: 100%;
    height: 80px;
`;

const SeasonTitle = styled.div`
    font-size: 30px;
    margin-bottom: 20px;
`;

const CaruselItem = styled.div`

`;

const SeasonImageContainer = styled.div`
    flex-direction: column;
    display:flex;
`;

const SeasonImage = styled.div`
    background-image: url(${props => props.bgUrl});
    height: 300px;
    background-size:cover;
    border-radius: 4px;
    background-position: center center;
    transition: opacity 0.1s linear;
`;

const SeasonImageTitle = styled.span`
    display:block;
    margin-bottom: 3px;
`;


const Iframe = styled.iframe`
    margin-top: 20px;
`;

const TabContainer = styled.div`
    margin-top: 20px;
`

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
        <VideoTitle>All {result.videos.results.length} Videos</VideoTitle>
        <Carousel width="600px"infiniteLoop showIndicators={false} showStatus={false} dynamicHeight>
        {result.videos.results &&
                  result.videos.results.map((video, index) => (
                      <Iframe
                      key={index}
                      width="600"
                      height="360"
                      src={video.key ? `https://www.youtube.com/embed/${video.key}` : require("../../assets/noPosterSmall.png")}
                      frameborder="0"
                    ></Iframe>
                    ))} 
        </Carousel>
        </VideoContainer>
        
        <SeasonContainer>
            <SeasonTitle> All {result.seasons.length + 1} Seasons </SeasonTitle>
            
            {console.log(result.seasons)}
            {result.seasons && result.seasons.length > 0 && <Carousel width="200px" infiniteLoop showIndicators={false} showStatus={false} dynamicHeight autoPlay>
                {
                result.seasons.map((season, index) => <CaruselItem key ={index}>
                    <SeasonImageContainer>
                    <SeasonImage bgUrl = {season.poster_path ? `https://image.tmdb.org/t/p/original${season.poster_path}` : require("../../assets/noPosterSmall.png") }/>
                    <SeasonImageTitle>{season.name}</SeasonImageTitle>
                    </SeasonImageContainer> 
                </CaruselItem>
                )}
            
            
            </Carousel>}
        
        
        </SeasonContainer>

        
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