import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { v4 as uuid } from 'uuid';
import { NewsInfo } from './models.ts';
import axios from 'axios';
import NewsCardGroup from './components/NewsCardGroup';
import classes from './styles.module.css';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import DateRangePicker from '@mui/lab/DateRangePicker';
import Box from '@mui/material/Box';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Button from '@mui/material/Button';




function App() {
  const searchRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const [newsInfo, setNewsInfo] = useState();
  const [value, setValue] = useState(["2022-03-01", "2022-03-14"]);
  const [searchValue, setSearchValue] = useState("soccer");
  const api = axios.create({ baseURL: 'http://localhost:8081/api' });

  useEffect(() => {
    api.post('/', { searchValueBody: searchValue, dateRange: value }).then(({ data }) => {
      console.log("GOTS INFO", data)
      const tempNewsInfo = []
      data['articles'].forEach(article => {
        tempNewsInfo.push(Object.assign(new NewsInfo, article))
      })
      setNewsInfo(tempNewsInfo);
    });
  }, [])

  useEffect(() => {
    console.log("something changed");
  }, [newsInfo])

  function handleSearchClick() {
    api.post('/', { searchvalueBody: searchValue, dateRange: value }).then(({ data }) => {
      const tempNewsInfo = []
      data['articles'].forEach(article => {

        tempNewsInfo.push(Object.assign(new NewsInfo, article))
      })
      setNewsInfo([]);
      setNewsInfo(tempNewsInfo)
    });
  }

  if (newsInfo == undefined) return (<> hai </>);
  return (
    <div className={classes.centeredContainer}>
      <div className={classes.inputAreaContainer}>
        <TextField value={searchValue} id="standard-basic" label="KeyWord Search" variant="standard" onChange={(e) => setSearchValue(e.target.value)} />
        <div className={classes.datePickerContainer}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
              startText="Start"
              endText="End"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(startProps, endProps) => (
                <React.Fragment>
                  <TextField {...startProps} />
                  <Box sx={{ mx: 2 }}> to </Box>
                  <TextField {...endProps} />
                </React.Fragment>
              )}
            />
          </LocalizationProvider>
        </div>
        <div className={classes.buttonContainer}>
          <Box sx={{ '& button': { m: 1 } }}>
            <Button size="large" variant="contained" onClick={handleSearchClick}>Search</Button>
          </Box>
        </div>
      </div>
      <div className={classes.newsCardContainer}>
        <NewsCardGroup newsInfo={newsInfo} />
      </div>
    </div >
  );
}

export default App;
