import React, {useState} from 'react';
import infoIcon from './infopng.png';
import {FormatDate} from './utils';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles } from '@material-ui/core';

const RenderArticle = ({ article }) => {
  const [showLink, setShowLink] = useState(false);
  const title = article.title;
  const author = article.author;
  const authors = article.authors.length > 40 ? article.authors.slice(0, 40) + '...' : article.authors;
  const source = article.clean_url;
  const str = authors;
  const imageLink = article.media;
  const index = str.indexOf(',');
  const writer = index === -1 ? str : str.substring(0, index);
  const organization = index === -1 ? '' : str.substring(index + 1);
  const summary = article.summary;
  const link = article.link;
  const dateTimeString = FormatDate(article.published_date);

  return (
    <>
      { showLink ?
      <Dialog open={true} onClose={()=>setShowLink(false)} PaperProps={{ style: { width: '100%' }  }}  >
        <DialogTitle id="dialog-title">Link to Article</DialogTitle>
        <DialogContent >
          <DialogContentText >
            {link ? link : 'No Link'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowLink(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
        : 
      null
      }
    <div  onClick={() => setShowLink(true)} style={{borderRadius: '10px', border: '1px solid grey', width: '600px', padding: '15px 40px 25px 15px', margin: '30px', height: '250px'}}>
      <div style={{display: 'flex', textAlign: 'center', gap: '20px'}}>
        <img src={imageLink ? imageLink : infoIcon} style={{width: '60px', height: '60px', borderRadius: '50%'}}></img>
          <div style={{fontSize: '22px', fontWeight:'bold', height: '48px', lineHeight: '1.2', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}>
  {title}
</div>
      </div>
      <div style={{margin: '10px 10px 22px 10px', color: 'grey', display: 'flex',alignItems: 'center', justifyContent: 'flex-start' , height: '15px', overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'}}>
        <div>{dateTimeString}</div>
        <div> &nbsp;&bull;&nbsp;{writer}</div>
        { organization ==='' ? null : <div> &nbsp;&bull;&nbsp;{organization}</div>}
        <div> &nbsp;&bull;&nbsp;{source}</div>
      </div>
        <div style={{ 
  height: '146px', 
  overflow: 'hidden', 
  display: '-webkit-box',
  '-webkit-line-clamp': '8',
  '-webkit-box-orient': 'vertical',
  textOverflow: 'ellipsis' 
}}>
  {summary}
</div>
    </div>
      </>
  );
};

export default RenderArticle;
