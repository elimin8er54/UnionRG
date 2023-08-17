import React, { useState, useEffect } from "react";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { postRequest } from '../../helpers/main';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { NavLink } from "react-router-dom";


//This is cause I dont want to write 20 lines of prices. : )
let minVals: JSX.Element[] = [];
let maxVals: JSX.Element[] = [];
for (let i = 100000; i <= 2000000; i += 100000) {
  minVals.push(<option key={i} value={i}>{i.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 })}</option>);
  maxVals.push(<option key={i} value={i}>{i.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 })}</option>);
}
const urlParams = (name: string) => {
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (results == null) {
    return null;
  }
  else {
    return decodeURI(results[1]) || '';
  }
}

type Props = {
  detectChange?: () => void
}

const SearchBarBuy = (props: Props) => {
  const [type, setType] = useState(urlParams('type') || '');
  const [location, setLocation] = useState(urlParams('location') || 'Boston');
  const [minPrice, setMinPrice] = useState(urlParams('minprice') || '');
  const [maxPrice, setMaxPrice] = useState(urlParams('maxprice') || '');
  const [bedroom, setBedroom] = useState(urlParams('bedroom') || '');
  const [bathroom, setBathroom] = useState(urlParams('bathroom') || '');
  const [bathroomhalf, setBathroomHalf] = useState(urlParams('bathroomhalf') || '');
  const [srvData, setSrvData] = useState(null);
  //Material UI AUtoComplete is scuffed for array of objects so I ahve to do this.
  const [defaultValue, setDefaultValue] = useState(urlParams('location'));

  //We have location being set for 2 reasons.
  //One is that the user typed the location manually.
  //THe other is that they clicked an option from the box


  function changeDetection() {
    props.detectChange();
  }

  function handleLocationChange(event: React.ChangeEvent<HTMLInputElement>) {
    setLocation(event.target.value);
  }
  function handleLocationChange2(event: React.ChangeEvent<unknown>, value: any) {
    setLocation(value);
  }

  function handleMaxPriceChange(event: React.ChangeEvent<HTMLInputElement>) {
    setMaxPrice(event.target.value);
  }
  function handleMinPriceChange(event: React.ChangeEvent<HTMLInputElement>) {
    setMinPrice(event.target.value);
  }
  function handleBedroomChange(event: React.ChangeEvent<HTMLInputElement>) {
    setBedroom(event.target.value);
  }
  function handleBathroomChange(event: React.ChangeEvent<HTMLInputElement>) {
    setBathroom(event.target.value);
  }
  function handleBathroomHalfChange(event: React.ChangeEvent<HTMLInputElement>) {
    setBathroomHalf(event.target.value);
  }
  function handleDefaultValueChange(event: React.ChangeEvent<unknown>, value: any) {
    setDefaultValue(value);
  }
  function handleTypeChange(event: React.ChangeEvent<HTMLInputElement>) {
    setType(event.target.value);
  }


  function clearSearch(event: React.MouseEvent<HTMLInputElement>) {
    changeDetection();
    setLocation('');
    setMaxPrice('');
    setMinPrice('');
    setBedroom('');
    setType('');
    setBathroom('');
    setBathroomHalf('');
    setDefaultValue('');
  }

  useEffect(() => {
    if (!srvData) {
      postRequest("/mls/gettowns", {}).then((data) => {

        const finalArray = data.map(function (obj: { LONG: string }) {
          return obj.LONG;
        });
        setSrvData(finalArray)

      });

    }
  }, [srvData]);


  const preventForm = (event: React.FormEvent) => {
    event.preventDefault();



  }

  return (
    <React.Fragment>
      <form onSubmit={preventForm} id="buy-form" >
        <div className="searchbar-body">
          <div className="searchbar-innercontiainer searchbar-innercontainer-left">

            <div className="searchbar-input">

              <Autocomplete
                className="input-buy"
                disableClearable
                value={defaultValue}
                //If the data has not been loaded yet. Just make it say Loading so it does not crash.
                //Option needs an array. Does not accept null.
                options={srvData || ["Loading"]}
                getOptionSelected={(option: any) => { return (option) }}

                onChange={(e, a) => { handleLocationChange2(e, a); handleDefaultValueChange(e, a) }}
                renderInput={(params) => <TextField
                  {...params}
                  name="location"
                  label="Location"
                  type="text"
                  variant="outlined"
                  className="input-buy"
                  onChange={handleLocationChange}
                />}
              />

            </div>

            <FormControl variant="outlined" className="searchbar-input">
              <InputLabel htmlFor="outlined-age-native-simple">Min. Price</InputLabel>
              <Select className="input-buy"

                native
                value={minPrice}
                onChange={handleMinPriceChange}
                label="Min. Price"
                inputProps={{
                  name: 'minprice',
                  id: 'outlined-age-native-simple',
                }}
              >
                <option key={"0"} aria-label="None" value="" />
                {minVals}

              </Select>
            </FormControl>
            <FormControl variant="outlined" className="searchbar-input">
              <InputLabel htmlFor="outlined-maxprice-native-simple">Max. Price</InputLabel>
              <Select className="input-buy"
                native
                value={maxPrice}
                onChange={handleMaxPriceChange}
                label="Max. Price"
                inputProps={{
                  name: 'maxprice',
                  id: 'outlined-maxprice-native-simple',
                }}
              >
                <option key={"0"} aria-label="None" value="" />
                {maxVals}

              </Select>
            </FormControl>

          </div>
          <div style={{ float: "right" }} className="searchbar-innercontiainer searchbar-innercontainer-right">
            <FormControl variant="outlined" className="searchbar-input">
              <InputLabel htmlFor="outlined-bedroom-native-simple">Bedrooms</InputLabel>
              <Select className="input-buy"
                native
                value={bedroom}
                onChange={handleBedroomChange}
                label="Bedroom"
                inputProps={{
                  name: 'bedroom',
                  id: 'outlined-bedroom-native-simple',
                }}
              >
                <option key={"0"} aria-label="None" value="" />
                <option key={"1"} value="1" >1</option>
                <option key={"2"} value="2" >2</option>
                <option key={"3"} value="3" >3</option>
                <option key={"4"} value="4" >4</option>
                <option key={"5"} value="5" >5</option>
                <option key={"6"} value="6" >6</option>
                <option key={"7"} value="7" >7</option>
                <option key={"8"} value="8" >8</option>
                <option key={"9"} value="9" >9</option>

              </Select>
            </FormControl>
            <FormControl variant="outlined" className="searchbar-input">
              <InputLabel htmlFor="outlined-bathroom-native-simple">Bathrooms</InputLabel>
              <Select className="input-buy"
                native
                value={bathroom}
                onChange={handleBathroomChange}
                label="Bathrooms"
                inputProps={{
                  name: 'bathroom',
                  id: 'outlined-bathroom-native-simple',
                }}
              >
                <option key={"0"} aria-label="None" value="" />
                <option key={"1"} value="1" >1</option>
                <option key={"2"} value="2" >2</option>
                <option key={"3"} value="3" >3</option>
                <option key={"4"} value="4" >4</option>
                <option key={"5"} value="5" >5</option>
                <option key={"6"} value="6" >6</option>
                <option key={"7"} value="7" >7</option>
                <option key={"8"} value="8" >8</option>
                <option key={"9"} value="9" >9</option>

              </Select>
            </FormControl>
            <FormControl variant="outlined" className="searchbar-input">
              <InputLabel htmlFor="outlined-type-native-simple">Type</InputLabel>
              <Select className="input-type"
                native
                value={type}
                onChange={handleTypeChange}
                label="Type"
                inputProps={{
                  name: 'type',
                  id: 'outlined-type-native-simple',
                }}
              >
                <option key={"0"} aria-label="None" value="" />
                <option key={"CC"} value="CC" >Condominium</option>
                <option key={"SF"} value="SF" >Single-Family</option>
                <option key={"MM"} value="MF" >Multi-family</option>

              </Select>
            </FormControl>
            {/*  <FormControl variant="outlined" className="searchbar-input">
              <InputLabel htmlFor="outlined-bathroomhalf-native-simple">Half Bathrooms</InputLabel>
              <Select className="input-buy"
                native
                value={bathroomhalf}
                onChange={handleBathroomHalfChange}
                label="bathroomshalf"
                inputProps={{
                  name: 'bathroomhalf',
                  id: 'outlined-bathroomhalf-native-simple',
                }}
              >
                <option aria-label="None" value="" />
                <option value="1" >1</option>
                <option value="2" >2</option>
                <option value="3" >3</option>
                <option value="4" >4</option>
                <option value="5" >5</option>
                <option value="6" >6</option>
                <option value="7" >7</option>
                <option value="8" >8</option>
                <option value="9" >9</option>

              </Select>
              </FormControl> */}
          </div>
          <div style={{ marginTop: "20px", marginLeft: "-15px" }}>
            <NavLink to={`/properties?location=${location}&minprice=${minPrice}&maxprice=${maxPrice}&type=${type}&bedroom=${bedroom}&bathroom=${bathroom}&bathroomhalf=${bathroomhalf}`}>
              <button onClick={props.detectChange} className="searchbar-button searchbar-search" >Search</button>
            </NavLink>
            <button onClick={clearSearch} type="button" className="searchbar-button searchbar-search searchbar-button-clear" >Clear</button>
          </div>
        </div>
      </form>
    </React.Fragment >
  );
};

export default SearchBarBuy;
