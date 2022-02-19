import { Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Redirect from 'react-router-dom'

function News() {
  const theme = useTheme();

  const [news, setNews] = useState([]);
  useEffect(() => {
    var requestOptions = {
      method: 'GET',
    };

    fetch("http://safestree.herokuapp.com/api/news", requestOptions)
      .then(response => response.json())
      .then(result => {
        setNews(result.articles)
        console.log(news);
      })
  }, [])
  return (
    <>
      <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

        {
          news.map((article) => {
            return <>
              <Grid spacing={6} item md={6}>
                <Card sx={{ display: 'flex' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography component="div" variant="h5">
                        {(article.title).slice(0, 30)}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        {article.description.slice(0, 50)}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        <h6>{article.author}</h6>
                        <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', }}>Know more</a>
                      </Box>
                    </CardContent>
                  </Box>
                  <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image={article.urlToImage}
                    style={{ width: '150px', height: '150px', borderRadius: '3.5px' }}
                    alt="Live from space album cover"
                  />

                </Card>
              </Grid>
            </>
          })
        }

      </Grid>
    </>
  )
}

export default News