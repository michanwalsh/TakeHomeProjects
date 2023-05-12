import React, {useState, useEffect} from 'react';
import './App.css';
import RenderArticle from './RenderArticle.jsx';
import CountryFilter from './CountryFilter.jsx';
import  { Button , TextField }  from '@mui/material';
import '@emotion/react';
import '@emotion/styled';
import '@mui/material';


export default function App(props) {
  const [searchField, setSearchField] = useState('');
  const [disableButton, setDisableButton] = useState(false);
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(0);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [showNews, setShowNews] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCountries, setSelectedCountries] = useState(["US"]);
  const ITEMS_PER_PAGE = 5;
  
  function handleSearchButton () {
    setError(null);
    setPage(0);
    setNews([]);
    setShowNews(false);
    setDisableButton(true);
    fetchData(searchField);
    setDisableButton(false);
    setSearchField('');
  }

  async function fetchData() {
    const countryQuery = selectedCountries.join(",");
     try {
    const response = await fetch(`https://api.newscatcherapi.com/v2/search?q=${searchField}&from=2023/04/17${countryQuery ? `&countries=${countryQuery}` : ''}&page_size=50`, {
      headers: {
        'x-api-key': '48vY3_RZz_ICF_7D80v_8VEQBKPjAy9WnPeCiu8nFLo'
      }
    });
    const data = await response.json();
    const articles = data.articles;
    const sortedArticles = articles.sort((a, b) => {
      if (a.clean_url < b.clean_url) {
        return -1;
      }
      if (a.clean_url > b.clean_url) {
        return 1;
      }
      return 0;
    });

    setNews(sortedArticles);console.log('new',news);
    setShowNews(true);
  } catch(error) {
       setError(error);
  }
}

  function getPageItems(news, page) {
    // nit: In a larger codebase, constants (unchanging variables) are usually
    // placed at the top of the file so they're easier to find. And the format
    // is `ITEMS_PER_PAGE`

    //Got it, constant vs variable formatting. Didn't know that before
    
    const startIndex = (page) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const answer= news.slice(startIndex, endIndex > news.length ? news.length : endIndex);
    return answer
}

  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1
      if (nextPage > pageNumbers.length - 1) {
        nextPage = 0
      }
      return nextPage
    })
  }
  const prevPage = () => {
    console.log('pagen',pageNumbers);
    setPage((oldPage) => {
      let prevPage = oldPage - 1
      if (prevPage < 0) {
        prevPage = pageNumbers.length - 1
      }
      return prevPage
    })
  }

  const handlePage = (index) => {
    setPage(index)
  }
  function getPageNumbers(totalContents, contentsPerPage) {
    const totalPages = Math.ceil(totalContents / contentsPerPage);
    const pn = [];
  
    for (let i = 1; i <= totalPages; i++) {
      pn.push(i);
    
    }
  console.log('pn',pn);
    return pn;
  }
  
  useEffect(() => {
    setPageNumbers(getPageNumbers(news.length, 5));
  }, [news, page]);

  // Since you're using repl.it, it would be better practice to set your styles directly in a css file
  //Ok will do from now on
  return (
    <div style={{backgroundColor: "white", width: '100%', '@media (min-width: 600px)': { width: '50%' }, height: '1400px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center',marginLeft: "100px", }}>
      <div style={{display:'flex', flexDirection: 'column', justifyContent:'flex-start', alignItems:  'center', minHeight: '160px',width: '90%',borderBottom: '1px solid #CCCCCC'}}>
      <div style={{display:'flex', justifyContent:'center', }}><h1 style={{justifySelf: 'center'}}>News </h1></div>
      <div style={{width: '70%', justifySelf: 'center',  display: 'flex', gap: '15px', justifyContent: 'space-between',}}>
       <div>
        <CountryFilter
          selected={selectedCountries}
          setSelected={setSelectedCountries}
        />
      </div>
        <TextField
          style={{flexGrow: 1, height: '100%', border:  '1px solid rgba(0, 128, 255, 0.5)',
    borderRadius: '5px',}}
          id="search"
          label="Search for news..."
          type="search"
          variant="standard"
          value={searchField}
          onChange={(e)=> {setSearchField(e.target.value);}}/>
        <Button disabled={disableButton || searchField === ''} onClick={handleSearchButton} variant="contained" >Search</Button>
      </div>
        </div>
      {
        // Since `showNews` is a boolean, you could also render your component like this
        // showNews && <div>....</div>

        //Interesting^, I didn't know of that approach. I'll try it 
        showNews ? 
        <div style={{marginTop: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
          <div style={{maxHeight: '3000px'}}>
          {getPageItems(news,page).map((article, index) => <RenderArticle article={article}/>)}
          </div>
          { news.length === 0 ? <div>Error, no news found</div> : null }
          { error ? <div>Error: {error}</div> : null}
              { news.length === 0 ? null :
          <div class='btn-container'>
            <button class='prev-btn' 
              onClick={prevPage} >prev
            </button>
            {pageNumbers.map((item, index) => {
              return (
                <button
                  key={index}
                  className={`page-btn ${index === page ? 'active-btn' : null}`}
                  onClick={() => handlePage(index)}
                >
                  {index + 1}
                </button>
              )
            })}
            <button class='next-btn' onClick={nextPage}>next
            </button>
          </div> }  
        </div>
      
      : null }
      
    </div>
  );
}
