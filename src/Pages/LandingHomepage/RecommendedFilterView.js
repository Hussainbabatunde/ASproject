import React, { useEffect, useRef, useState } from 'react'
import Header from '../../Components/Header/Header'
import FilterHeroSection from '../../Components/Homepage/FilterHeroSection'
import { Link } from 'react-router-dom'
import {RxDotFilled} from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { FilteredPlayersApi, GetPlayersApi, GetRecommendedApi } from '../../Slice/Player/PlayerHomePage/GetAllPlayersHomePage';
import Footer from '../../Components/Homepage/Footer';
import ScoutHeader from '../../Components/Header/ScoutHeader';
import { CircularProgress } from '@mui/material';
import { FiMenu } from 'react-icons/fi';
import { Portal } from './ModalFilter';
import {GrLocation} from 'react-icons/gr'
import {PiBarbellDuotone} from 'react-icons/pi'
import {PiPersonArmsSpreadBold} from 'react-icons/pi'

const RecommendedFilterView = () => {
    const [allPlayers, setAllPlayers] = useState([])
    const dispatch = useDispatch()
    const Sortdata = useSelector((state)=> state.reducer?.GetPlayerSlice?.recommendedPlayersData?.data)
    const filteredPlayer = useSelector((state)=> state.reducer?.GetPlayerSlice?.filteredPlayersData?.data)
    const filteredClubPlayer = useSelector((state)=> state.reducer?.GetPlayerSlice?.filteredClubPlayerData?.data)
    // console.log('sortdata ', filteredClubPlayer)
    const [searchLoader, setSearchloader] = useState(false)
    const [checkedPosition, setCheckedPosition] = useState('')
    const [checkStrongFoot, setCheckStrongFoot] = useState('')
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const [minAge, setMinAge] = useState('')
    const [maxAge, setMaxAge] = useState('')
    const [height, setHeight] = useState('')
    const [country, setCountry] = useState('')
    const [position, setPosition] = useState('')
    const [foot, setFoot] = useState('')
    const [openNav, setOpenNav] = useState('HomePage_ShownDetails_NavMenu')
  const [iconOpen, setIconOpen] = useState(false)
  const modal = useRef();

    const [data, setData] = useState({})
    const logindata = useSelector(
        (state) => state?.reducer?.LoginSlice?.logindata
      );

    useEffect(()=>{
        const getPlayerDataHome = async () =>{
          await dispatch(GetRecommendedApi())
          setAllPlayers(Sortdata)
        }
        getPlayerDataHome()
    },[])

    useEffect(() => {
        
        window.scrollTo(0, 0)
      }, []);

    useEffect(()=>{
        setAllPlayers(filteredPlayer)
        // console.log(filteredPlayer)
    }, [filteredPlayer])

    useEffect(()=>{
        setAllPlayers(filteredClubPlayer)
        // console.log(filteredClubPlayer)
    }, [filteredClubPlayer])

    function shortenName(name, secname, maxLength) {
        let x = name + " " + secname;
        if (x.length <= maxLength) {
          return x;
        } else {
          return x.substring(0, maxLength) + ".....";
        }
      }
      
      // const fullName = AllPlayersdata?.firstname + " " + AllPlayersdata?.surname;
      const maxLength = 16; // Set the maximum length for the shortened name
      


    const handleCheckedPosition = (positionChecked) =>{
        //  setCheckedPosition(positionChecked)
        //  setPosition(positionChecked)
        let updatedCheckedPositions = [...checkedPosition];
        let updatedPositions = [...position];

  if (updatedCheckedPositions.includes(positionChecked)) {
    // Uncheck the position and remove it from the arrays
    updatedCheckedPositions = updatedCheckedPositions.filter(
      (position) => position !== positionChecked
    );
    updatedPositions = updatedPositions.filter(
      (position) => position !== positionChecked
    );
  } else {
    // Check the position and add it to the arrays
    updatedCheckedPositions.push(positionChecked);
    updatedPositions.push(positionChecked);
  }

  setCheckedPosition(updatedCheckedPositions);
  setPosition(updatedPositions);
    }
    const handleCheckedStrongFoot = (footChecked) =>{
        setCheckStrongFoot(footChecked)
        setFoot(footChecked)
   }
    const handleMinPriceChange = (e) =>{
        setMinPrice(e.target.value)
    }
    const handleMaxPriceChange = (e) =>{
        setMaxPrice(e.target.value)
    }
    const handleMinAgeChange = (e) =>{
        setMinAge(e.target.value)
    }
    const handleMaxAgeChange = (e) =>{
        setMaxAge(e.target.value)
    }
    const handleHeightChange = (e) =>{
        setHeight(e.target.value)
    }
    const handleCountryChange = (e) =>{
        setCountry(e.target.value)
    }
    // const handleFootChange = (e) =>{
    //     setFoot(e.target.value)
    // }
    const handleSearchFilter = async (e) =>{
        e.preventDefault()
        data.foot= foot
        data.positions= position
        data.min_age = minAge
        data.max_age = maxAge
        data.min_price = minPrice
        data.max_price = maxPrice
        data.height = height
        data.country = country
        data.recommended = 1
        // console.log('data ',data)
        await dispatch(FilteredPlayersApi(data))
        setSearchloader(true)
        setSearchloader(false)
		const { current: popUp } = modal;
		popUp.close();
    }
    const handleOpen = () =>{
        setIconOpen(true)
        setOpenNav('HomePage_ShownDetails_OpenNavMenu')
      }

      const openDialog = () => {
		const { current: popUp } = modal;
		popUp.showModal();
	};

  return (
    <div>
        {logindata != null ? <ScoutHeader />: <Header />}
        <div className='py-[1rem]  sm:px-[1rem] md:px-[3rem] lg:px-[8rem] bg-[#EFF0F3]'>
            <FilterHeroSection />
            <div className='FilterPage_ContentSection'>
                <div className='FilterPage_ContentFilter'>
                <form onSubmit={handleSearchFilter} className='FilterPage_ResultFilter'>
                    <p className='FilterPage_TopicSearchResult'>Found 376 results for <span className='FilterPage_PositionSearchedFor'>Strikers</span></p>
                    <p className='FilterPage_LabelSearch'>Price, $</p>
                    <div style={{display:'flex'}}>
                        <input name='min_price' value={minPrice} onChange={handleMinPriceChange} placeholder='Min' className='FilterPage_MinPriceValue' type='text' />
                        <input name='max_price' value={maxPrice} onChange={handleMaxPriceChange} placeholder='Max' className='FilterPage_MaxPriceValue' type='text' />
                    </div>
                    <p className='FilterPage_LabelSearch'>Age Range</p>
                    <div style={{display:'flex'}}>
                        <input name='min_age' value={minAge} onChange={handleMinAgeChange} placeholder='Min' className='FilterPage_MinPriceValue' type='text' />
                        <input name='max_age' value={maxAge} onChange={handleMaxAgeChange} placeholder='Max' className='FilterPage_MaxPriceValue' type='text' />
                    </div>
                    <p className='FilterPage_LabelSearch'>Height (ft)</p>
                    <input name='height' value={height} onChange={handleHeightChange} className='FilterPage_HeightSearch' type="text" placeholder='ft' />
                    <p className='FilterPage_LabelSearch'>Country</p>
                    <select name='country' value={country} onChange={handleCountryChange} className='FilterPage_HeightSearch'>
                        <option ></option>
    <option value="Afghanistan">Afghanistan</option>
    <option value="Aland Islands">Aland Islands</option>
    <option value="Albania">Albania</option>
    <option value="Algeria">Algeria</option>
    <option value="American Samoa">American Samoa</option>
    <option value="Andorra">Andorra</option>
    <option value="Angola">Angola</option>
    <option value="Anguilla">Anguilla</option>
    <option value="Antarctica">Antarctica</option>
    <option value="Antigua and Barbuda">Antigua and Barbuda</option>
    <option value="Argentina">Argentina</option>
    <option value="Armenia">Armenia</option>
    <option value="Aruba">Aruba</option>
    <option value="Australia">Australia</option>
    <option value="Austria">Austria</option>
    <option value="Azerbaijan">Azerbaijan</option>
    <option value="Bahamas">Bahamas</option>
    <option value="Bahrain">Bahrain</option>
    <option value="Bangladesh">Bangladesh</option>
    <option value="Barbados">Barbados</option>
    <option value="Belarus">Belarus</option>
    <option value="Belgium">Belgium</option>
    <option value="Belize">Belize</option>
    <option value="Benin">Benin</option>
    <option value="Bermuda">Bermuda</option>
    <option value="Bhutan">Bhutan</option>
    <option value="Bolivia">Bolivia</option>
    <option value="Bonaire, Sint Eustatius and Saba">Bonaire, Sint Eustatius and Saba</option>
    <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
    <option value="Botswana">Botswana</option>
    <option value="Bouvet Island">Bouvet Island</option>
    <option value="Brazil">Brazil</option>
    <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
    <option value="Brunei Darussalam">Brunei Darussalam</option>
    <option value="Bulgaria">Bulgaria</option>
    <option value="Burkina Faso">Burkina Faso</option>
    <option value="Burundi">Burundi</option>
    <option value="Cambodia">Cambodia</option>
    <option value="Cameroon">Cameroon</option>
    <option value="Canada">Canada</option>
    <option value="Cape Verde">Cape Verde</option>
    <option value="Cayman Islands">Cayman Islands</option>
    <option value="Central African Republic">Central African Republic</option>
    <option value="Chad">Chad</option>
    <option value="Chile">Chile</option>
    <option value="China">China</option>
    <option value="Christmas Island">Christmas Island</option>
    <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
    <option value="Colombia">Colombia</option>
    <option value="Comoros">Comoros</option>
    <option value="Congo">Congo</option>
    <option value="Congo, Democratic Republic of the Congo">Congo, Democratic Republic of the Congo</option>
    <option value="Cook Islands">Cook Islands</option>
    <option value="Costa Rica">Costa Rica</option>
    <option value="Cote D'Ivoire">Cote D'Ivoire</option>
    <option value="Croatia">Croatia</option>
    <option value="Cuba">Cuba</option>
    <option value="Curacao">Curacao</option>
    <option value="Cyprus">Cyprus</option>
    <option value="Czech Republic">Czech Republic</option>
    <option value="Denmark">Denmark</option>
    <option value="Djibouti">Djibouti</option>
    <option value="Dominica">Dominica</option>
    <option value="Dominican Republic">Dominican Republic</option>
    <option value="Ecuador">Ecuador</option>
    <option value="Egypt">Egypt</option>
    <option value="El Salvador">El Salvador</option>
    <option value="Equatorial Guinea">Equatorial Guinea</option>
    <option value="Eritrea">Eritrea</option>
    <option value="Estonia">Estonia</option>
    <option value="Ethiopia">Ethiopia</option>
    <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
    <option value="Faroe Islands">Faroe Islands</option>
    <option value="Fiji">Fiji</option>
    <option value="Finland">Finland</option>
    <option value="France">France</option>
    <option value="French Guiana">French Guiana</option>
    <option value="French Polynesia">French Polynesia</option>
    <option value="French Southern Territories">French Southern Territories</option>
    <option value="Gabon">Gabon</option>
    <option value="Gambia">Gambia</option>
    <option value="Georgia">Georgia</option>
    <option value="Germany">Germany</option>
    <option value="Ghana">Ghana</option>
    <option value="Gibraltar">Gibraltar</option>
    <option value="Greece">Greece</option>
    <option value="Greenland">Greenland</option>
    <option value="Grenada">Grenada</option>
    <option value="Guadeloupe">Guadeloupe</option>
    <option value="Guam">Guam</option>
    <option value="Guatemala">Guatemala</option>
    <option value="Guernsey">Guernsey</option>
    <option value="Guinea">Guinea</option>
    <option value="Guinea-Bissau">Guinea-Bissau</option>
    <option value="Guyana">Guyana</option>
    <option value="Haiti">Haiti</option>
    <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
    <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
    <option value="Honduras">Honduras</option>
    <option value="Hong Kong">Hong Kong</option>
    <option value="Hungary">Hungary</option>
    <option value="Iceland">Iceland</option>
    <option value="India">India</option>
    <option value="Indonesia">Indonesia</option>
    <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
    <option value="Iraq">Iraq</option>
    <option value="Ireland">Ireland</option>
    <option value="Isle of Man">Isle of Man</option>
    <option value="Israel">Israel</option>
    <option value="Italy">Italy</option>
    <option value="Jamaica">Jamaica</option>
    <option value="Japan">Japan</option>
    <option value="Jersey">Jersey</option>
    <option value="Jordan">Jordan</option>
    <option value="Kazakhstan">Kazakhstan</option>
    <option value="Kenya">Kenya</option>
    <option value="Kiribati">Kiribati</option>
    <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
    <option value="Korea, Republic of">Korea, Republic of</option>
    <option value="Kosovo">Kosovo</option>
    <option value="Kuwait">Kuwait</option>
    <option value="Kyrgyzstan">Kyrgyzstan</option>
    <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
    <option value="Latvia">Latvia</option>
    <option value="Lebanon">Lebanon</option>
    <option value="Lesotho">Lesotho</option>
    <option value="Liberia">Liberia</option>
    <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
    <option value="Liechtenstein">Liechtenstein</option>
    <option value="Lithuania">Lithuania</option>
    <option value="Luxembourg">Luxembourg</option>
    <option value="Macao">Macao</option>
    <option value="Macedonia, the Former Yugoslav Republic of">Macedonia, the Former Yugoslav Republic of</option>
    <option value="Madagascar">Madagascar</option>
    <option value="Malawi">Malawi</option>
    <option value="Malaysia">Malaysia</option>
    <option value="Maldives">Maldives</option>
    <option value="Mali">Mali</option>
    <option value="Malta">Malta</option>
    <option value="Marshall Islands">Marshall Islands</option>
    <option value="Martinique">Martinique</option>
    <option value="Mauritania">Mauritania</option>
    <option value="Mauritius">Mauritius</option>
    <option value="Mayotte">Mayotte</option>
    <option value="Mexico">Mexico</option>
    <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
    <option value="Moldova, Republic of">Moldova, Republic of</option>
    <option value="Monaco">Monaco</option>
    <option value="Mongolia">Mongolia</option>
    <option value="Montenegro">Montenegro</option>
    <option value="Montserrat">Montserrat</option>
    <option value="Morocco">Morocco</option>
    <option value="Mozambique">Mozambique</option>
    <option value="Myanmar">Myanmar</option>
    <option value="Namibia">Namibia</option>
    <option value="Nauru">Nauru</option>
    <option value="Nepal">Nepal</option>
    <option value="Netherlands">Netherlands</option>
    <option value="Netherlands Antilles">Netherlands Antilles</option>
    <option value="New Caledonia">New Caledonia</option>
    <option value="New Zealand">New Zealand</option>
    <option value="Nicaragua">Nicaragua</option>
    <option value="Niger">Niger</option>
    <option value="Nigeria">Nigeria</option>
    <option value="Niue">Niue</option>
    <option value="Norfolk Island">Norfolk Island</option>
    <option value="Northern Mariana Islands">Northern Mariana Islands</option>
    <option value="Norway">Norway</option>
    <option value="Oman">Oman</option>
    <option value="Pakistan">Pakistan</option>
    <option value="Palau">Palau</option>
    <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
    <option value="Panama">Panama</option>
    <option value="Papua New Guinea">Papua New Guinea</option>
    <option value="Paraguay">Paraguay</option>
    <option value="Peru">Peru</option>
    <option value="Philippines">Philippines</option>
    <option value="Pitcairn">Pitcairn</option>
    <option value="Poland">Poland</option>
    <option value="Portugal">Portugal</option>
    <option value="Puerto Rico">Puerto Rico</option>
    <option value="Qatar">Qatar</option>
    <option value="Reunion">Reunion</option>
    <option value="Romania">Romania</option>
    <option value="Russian Federation">Russian Federation</option>
    <option value="Rwanda">Rwanda</option>
    <option value="Saint Barthelemy">Saint Barthelemy</option>
    <option value="Saint Helena">Saint Helena</option>
    <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
    <option value="Saint Lucia">Saint Lucia</option>
    <option value="Saint Martin">Saint Martin</option>
    <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
    <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
    <option value="Samoa">Samoa</option>
    <option value="San Marino">San Marino</option>
    <option value="Sao Tome and Principe">Sao Tome and Principe</option>
    <option value="Saudi Arabia">Saudi Arabia</option>
    <option value="Senegal">Senegal</option>
    <option value="Serbia">Serbia</option>
    <option value="Serbia and Montenegro">Serbia and Montenegro</option>
    <option value="Seychelles">Seychelles</option>
    <option value="Sierra Leone">Sierra Leone</option>
    <option value="Singapore">Singapore</option>
    <option value="Sint Maarten">Sint Maarten</option>
    <option value="Slovakia">Slovakia</option>
    <option value="Slovenia">Slovenia</option>
    <option value="Solomon Islands">Solomon Islands</option>
    <option value="Somalia">Somalia</option>
    <option value="South Africa">South Africa</option>
    <option value="South Georgia and the South Sandwich Islands">South Georgia and the South Sandwich Islands</option>
    <option value="South Sudan">South Sudan</option>
    <option value="Spain">Spain</option>
    <option value="Sri Lanka">Sri Lanka</option>
    <option value="Sudan">Sudan</option>
    <option value="Suriname">Suriname</option>
    <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
    <option value="Swaziland">Swaziland</option>
    <option value="Sweden">Sweden</option>
    <option value="Switzerland">Switzerland</option>
    <option value="Syrian Arab Republic">Syrian Arab Republic</option>
    <option value="Taiwan, Province of China">Taiwan, Province of China</option>
    <option value="Tajikistan">Tajikistan</option>
    <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
    <option value="Thailand">Thailand</option>
    <option value="Timor-Leste">Timor-Leste</option>
    <option value="Togo">Togo</option>
    <option value="Tokelau">Tokelau</option>
    <option value="Tonga">Tonga</option>
    <option value="Trinidad and Tobago">Trinidad and Tobago</option>
    <option value="Tunisia">Tunisia</option>
    <option value="Turkey">Turkey</option>
    <option value="Turkmenistan">Turkmenistan</option>
    <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
    <option value="Tuvalu">Tuvalu</option>
    <option value="Uganda">Uganda</option>
    <option value="Ukraine">Ukraine</option>
    <option value="United Arab Emirates">United Arab Emirates</option>
    <option value="United Kingdom">United Kingdom</option>
    <option value="United States">United States</option>
    <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
    <option value="Uruguay">Uruguay</option>
    <option value="Uzbekistan">Uzbekistan</option>
    <option value="Vanuatu">Vanuatu</option>
    <option value="Venezuela">Venezuela</option>
    <option value="Viet Nam">Viet Nam</option>
    <option value="Virgin Islands, British">Virgin Islands, British</option>
    <option value="Virgin Islands, U.s.">Virgin Islands, U.s.</option>
    <option value="Wallis and Futuna">Wallis and Futuna</option>
    <option value="Western Sahara">Western Sahara</option>
    <option value="Yemen">Yemen</option>
    <option value="Zambia">Zambia</option>
    <option value="Zimbabwe">Zimbabwe</option>
                    </select>
                    <p className='FilterPage_LabelSearch'>Stronger Foot</p>
                    <div className='FilterPage_StrongerfootSec'>
                        <div>
                            <input name='foot' checked={checkStrongFoot === 'left'} onChange={()=> handleCheckedStrongFoot('left')} type='checkbox' />
                            <label style={{marginLeft:"10px"}}>Left</label>
                        </div>
                        <div >
                            <input name='foot' checked={checkStrongFoot === 'right'} onChange={()=> handleCheckedStrongFoot('right')}  type='checkbox' />
                            <label style={{marginLeft:"10px"}}>Right</label>
                        </div>
                    </div>
                    
                    <p className='FilterPage_LabelSearch'>Position</p>
                    <div className='FilterPage_StrongerfootSec'>
                        <div>
                            <input  name='position'  checked={checkedPosition?.includes('Goalkeeper')} onChange={()=> handleCheckedPosition('Goalkeeper')} type='checkbox' />
                            <label style={{marginLeft:"10px"}}>Goalkeeper</label>
                        </div>
                        <div>
                            <input  name='position'  checked={checkedPosition?.includes('Center back Defender')} onChange={()=> handleCheckedPosition('Centerback Defender')} type='checkbox' />
                            <label style={{marginLeft:"10px"}}>Center Back(Defenders)</label>
                        </div>
                        <div>
                            <input  name='position' checked={checkedPosition?.includes('Left Winger Defender')} onChange={()=> handleCheckedPosition('Left Winger Defender')} type='checkbox' />
                            <label style={{marginLeft:"10px"}}>Left Winger Back(Defenders)</label>
                        </div>
                        <div>
                            <input  name='position' checked={checkedPosition?.includes('Right Winger Defender')} onChange={()=> handleCheckedPosition('Right Winger Defender')} type='checkbox' />
                            <label style={{marginLeft:"10px"}}>Right Winger Back(Defenders)</label>
                        </div>
                        <div>
                            <input name='position' checked={checkedPosition?.includes('Central Midfielders')} onChange={()=> handleCheckedPosition('Central Midfielders')} type='checkbox' />
                            <label style={{marginLeft:"10px"}}>Central midfielders</label>
                        </div>
                        <div>
                            <input name='position' checked={checkedPosition?.includes('Attacking Midfielders')} onChange={()=> handleCheckedPosition('Attacking Midfielders')} type='checkbox' />
                            <label style={{marginLeft:"10px"}}>Attacking midfielders</label>
                        </div>
                        <div>
                            <input name='position' checked={checkedPosition?.includes('Defensive Midfielders')} onChange={()=> handleCheckedPosition('Defensive Midfielders')} type='checkbox' />
                            <label style={{marginLeft:"10px"}}>Defensive midfielders</label>
                        </div>
                        <div>
                            <input name='position' checked={checkedPosition?.includes('Wingers')} onChange={()=> handleCheckedPosition('Wingers')} type='checkbox' />
                            <label style={{marginLeft:"10px"}}>Wingers</label>
                        </div>
                        <div>
                            <input  name='position' checked={checkedPosition?.includes('Striker')} onChange={()=> handleCheckedPosition('Striker')} type='checkbox' />
                            <label style={{marginLeft:"10px"}}>Striker</label>
                        </div>
                        <button type='submit' className='Scoutpage_Profileform_savebutton'>
            {searchLoader ? <CircularProgress size={15} /> : <span>Search</span>}
            </button>
                    </div>
                </form>
            </div>

            <FiMenu  className='Filterpage_MenuIcon' onClick={openDialog} />
            <Portal getModal={modal} >
            <div className='ToogleFilterPage_ContentFilter'>
                <form onSubmit={handleSearchFilter} className='FilterPage_ResultFilter'>
                    <p className='FilterPage_TopicSearchResult'>Found 376 results for <span className='FilterPage_PositionSearchedFor'>Strikers</span></p>
                    <p className='FilterPage_LabelSearch'>Price, $</p>
                    <div style={{display:'flex'}}>
                        <input name='min_price' value={minPrice} onChange={handleMinPriceChange} placeholder='Min' className='FilterPage_MinPriceValue' type='text' />
                        <input name='max_price' value={maxPrice} onChange={handleMaxPriceChange} placeholder='Max' className='FilterPage_MaxPriceValue' type='text' />
                    </div>
                    <p className='FilterPage_LabelSearch'>Age Range</p>
                    <div style={{display:'flex'}}>
                        <input name='min_age' value={minAge} onChange={handleMinAgeChange} placeholder='Min' className='FilterPage_MinPriceValue' type='text' />
                        <input name='max_age' value={maxAge} onChange={handleMaxAgeChange} placeholder='Max' className='FilterPage_MaxPriceValue' type='text' />
                    </div>
                    <p className='FilterPage_LabelSearch'>Height (ft)</p>
                    <input name='height' value={height} onChange={handleHeightChange} className='FilterPage_HeightSearch' type="text" placeholder='ft' />
                    <p className='FilterPage_LabelSearch'>Country</p>
                    <select name='country' value={country} onChange={handleCountryChange} className='FilterPage_HeightSearch'>
                        <option ></option>
    <option value="Afghanistan">Afghanistan</option>
    <option value="Aland Islands">Aland Islands</option>
    <option value="Albania">Albania</option>
    <option value="Algeria">Algeria</option>
    <option value="American Samoa">American Samoa</option>
    <option value="Andorra">Andorra</option>
    <option value="Angola">Angola</option>
    <option value="Anguilla">Anguilla</option>
    <option value="Antarctica">Antarctica</option>
    <option value="Antigua and Barbuda">Antigua and Barbuda</option>
    <option value="Argentina">Argentina</option>
    <option value="Armenia">Armenia</option>
    <option value="Aruba">Aruba</option>
    <option value="Australia">Australia</option>
    <option value="Austria">Austria</option>
    <option value="Azerbaijan">Azerbaijan</option>
    <option value="Bahamas">Bahamas</option>
    <option value="Bahrain">Bahrain</option>
    <option value="Bangladesh">Bangladesh</option>
    <option value="Barbados">Barbados</option>
    <option value="Belarus">Belarus</option>
    <option value="Belgium">Belgium</option>
    <option value="Belize">Belize</option>
    <option value="Benin">Benin</option>
    <option value="Bermuda">Bermuda</option>
    <option value="Bhutan">Bhutan</option>
    <option value="Bolivia">Bolivia</option>
    <option value="Bonaire, Sint Eustatius and Saba">Bonaire, Sint Eustatius and Saba</option>
    <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
    <option value="Botswana">Botswana</option>
    <option value="Bouvet Island">Bouvet Island</option>
    <option value="Brazil">Brazil</option>
    <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
    <option value="Brunei Darussalam">Brunei Darussalam</option>
    <option value="Bulgaria">Bulgaria</option>
    <option value="Burkina Faso">Burkina Faso</option>
    <option value="Burundi">Burundi</option>
    <option value="Cambodia">Cambodia</option>
    <option value="Cameroon">Cameroon</option>
    <option value="Canada">Canada</option>
    <option value="Cape Verde">Cape Verde</option>
    <option value="Cayman Islands">Cayman Islands</option>
    <option value="Central African Republic">Central African Republic</option>
    <option value="Chad">Chad</option>
    <option value="Chile">Chile</option>
    <option value="China">China</option>
    <option value="Christmas Island">Christmas Island</option>
    <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
    <option value="Colombia">Colombia</option>
    <option value="Comoros">Comoros</option>
    <option value="Congo">Congo</option>
    <option value="Congo, Democratic Republic of the Congo">Congo, Democratic Republic of the Congo</option>
    <option value="Cook Islands">Cook Islands</option>
    <option value="Costa Rica">Costa Rica</option>
    <option value="Cote D'Ivoire">Cote D'Ivoire</option>
    <option value="Croatia">Croatia</option>
    <option value="Cuba">Cuba</option>
    <option value="Curacao">Curacao</option>
    <option value="Cyprus">Cyprus</option>
    <option value="Czech Republic">Czech Republic</option>
    <option value="Denmark">Denmark</option>
    <option value="Djibouti">Djibouti</option>
    <option value="Dominica">Dominica</option>
    <option value="Dominican Republic">Dominican Republic</option>
    <option value="Ecuador">Ecuador</option>
    <option value="Egypt">Egypt</option>
    <option value="El Salvador">El Salvador</option>
    <option value="Equatorial Guinea">Equatorial Guinea</option>
    <option value="Eritrea">Eritrea</option>
    <option value="Estonia">Estonia</option>
    <option value="Ethiopia">Ethiopia</option>
    <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
    <option value="Faroe Islands">Faroe Islands</option>
    <option value="Fiji">Fiji</option>
    <option value="Finland">Finland</option>
    <option value="France">France</option>
    <option value="French Guiana">French Guiana</option>
    <option value="French Polynesia">French Polynesia</option>
    <option value="French Southern Territories">French Southern Territories</option>
    <option value="Gabon">Gabon</option>
    <option value="Gambia">Gambia</option>
    <option value="Georgia">Georgia</option>
    <option value="Germany">Germany</option>
    <option value="Ghana">Ghana</option>
    <option value="Gibraltar">Gibraltar</option>
    <option value="Greece">Greece</option>
    <option value="Greenland">Greenland</option>
    <option value="Grenada">Grenada</option>
    <option value="Guadeloupe">Guadeloupe</option>
    <option value="Guam">Guam</option>
    <option value="Guatemala">Guatemala</option>
    <option value="Guernsey">Guernsey</option>
    <option value="Guinea">Guinea</option>
    <option value="Guinea-Bissau">Guinea-Bissau</option>
    <option value="Guyana">Guyana</option>
    <option value="Haiti">Haiti</option>
    <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
    <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
    <option value="Honduras">Honduras</option>
    <option value="Hong Kong">Hong Kong</option>
    <option value="Hungary">Hungary</option>
    <option value="Iceland">Iceland</option>
    <option value="India">India</option>
    <option value="Indonesia">Indonesia</option>
    <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
    <option value="Iraq">Iraq</option>
    <option value="Ireland">Ireland</option>
    <option value="Isle of Man">Isle of Man</option>
    <option value="Israel">Israel</option>
    <option value="Italy">Italy</option>
    <option value="Jamaica">Jamaica</option>
    <option value="Japan">Japan</option>
    <option value="Jersey">Jersey</option>
    <option value="Jordan">Jordan</option>
    <option value="Kazakhstan">Kazakhstan</option>
    <option value="Kenya">Kenya</option>
    <option value="Kiribati">Kiribati</option>
    <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
    <option value="Korea, Republic of">Korea, Republic of</option>
    <option value="Kosovo">Kosovo</option>
    <option value="Kuwait">Kuwait</option>
    <option value="Kyrgyzstan">Kyrgyzstan</option>
    <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
    <option value="Latvia">Latvia</option>
    <option value="Lebanon">Lebanon</option>
    <option value="Lesotho">Lesotho</option>
    <option value="Liberia">Liberia</option>
    <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
    <option value="Liechtenstein">Liechtenstein</option>
    <option value="Lithuania">Lithuania</option>
    <option value="Luxembourg">Luxembourg</option>
    <option value="Macao">Macao</option>
    <option value="Macedonia, the Former Yugoslav Republic of">Macedonia, the Former Yugoslav Republic of</option>
    <option value="Madagascar">Madagascar</option>
    <option value="Malawi">Malawi</option>
    <option value="Malaysia">Malaysia</option>
    <option value="Maldives">Maldives</option>
    <option value="Mali">Mali</option>
    <option value="Malta">Malta</option>
    <option value="Marshall Islands">Marshall Islands</option>
    <option value="Martinique">Martinique</option>
    <option value="Mauritania">Mauritania</option>
    <option value="Mauritius">Mauritius</option>
    <option value="Mayotte">Mayotte</option>
    <option value="Mexico">Mexico</option>
    <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
    <option value="Moldova, Republic of">Moldova, Republic of</option>
    <option value="Monaco">Monaco</option>
    <option value="Mongolia">Mongolia</option>
    <option value="Montenegro">Montenegro</option>
    <option value="Montserrat">Montserrat</option>
    <option value="Morocco">Morocco</option>
    <option value="Mozambique">Mozambique</option>
    <option value="Myanmar">Myanmar</option>
    <option value="Namibia">Namibia</option>
    <option value="Nauru">Nauru</option>
    <option value="Nepal">Nepal</option>
    <option value="Netherlands">Netherlands</option>
    <option value="Netherlands Antilles">Netherlands Antilles</option>
    <option value="New Caledonia">New Caledonia</option>
    <option value="New Zealand">New Zealand</option>
    <option value="Nicaragua">Nicaragua</option>
    <option value="Niger">Niger</option>
    <option value="Nigeria">Nigeria</option>
    <option value="Niue">Niue</option>
    <option value="Norfolk Island">Norfolk Island</option>
    <option value="Northern Mariana Islands">Northern Mariana Islands</option>
    <option value="Norway">Norway</option>
    <option value="Oman">Oman</option>
    <option value="Pakistan">Pakistan</option>
    <option value="Palau">Palau</option>
    <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
    <option value="Panama">Panama</option>
    <option value="Papua New Guinea">Papua New Guinea</option>
    <option value="Paraguay">Paraguay</option>
    <option value="Peru">Peru</option>
    <option value="Philippines">Philippines</option>
    <option value="Pitcairn">Pitcairn</option>
    <option value="Poland">Poland</option>
    <option value="Portugal">Portugal</option>
    <option value="Puerto Rico">Puerto Rico</option>
    <option value="Qatar">Qatar</option>
    <option value="Reunion">Reunion</option>
    <option value="Romania">Romania</option>
    <option value="Russian Federation">Russian Federation</option>
    <option value="Rwanda">Rwanda</option>
    <option value="Saint Barthelemy">Saint Barthelemy</option>
    <option value="Saint Helena">Saint Helena</option>
    <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
    <option value="Saint Lucia">Saint Lucia</option>
    <option value="Saint Martin">Saint Martin</option>
    <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
    <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
    <option value="Samoa">Samoa</option>
    <option value="San Marino">San Marino</option>
    <option value="Sao Tome and Principe">Sao Tome and Principe</option>
    <option value="Saudi Arabia">Saudi Arabia</option>
    <option value="Senegal">Senegal</option>
    <option value="Serbia">Serbia</option>
    <option value="Serbia and Montenegro">Serbia and Montenegro</option>
    <option value="Seychelles">Seychelles</option>
    <option value="Sierra Leone">Sierra Leone</option>
    <option value="Singapore">Singapore</option>
    <option value="Sint Maarten">Sint Maarten</option>
    <option value="Slovakia">Slovakia</option>
    <option value="Slovenia">Slovenia</option>
    <option value="Solomon Islands">Solomon Islands</option>
    <option value="Somalia">Somalia</option>
    <option value="South Africa">South Africa</option>
    <option value="South Georgia and the South Sandwich Islands">South Georgia and the South Sandwich Islands</option>
    <option value="South Sudan">South Sudan</option>
    <option value="Spain">Spain</option>
    <option value="Sri Lanka">Sri Lanka</option>
    <option value="Sudan">Sudan</option>
    <option value="Suriname">Suriname</option>
    <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
    <option value="Swaziland">Swaziland</option>
    <option value="Sweden">Sweden</option>
    <option value="Switzerland">Switzerland</option>
    <option value="Syrian Arab Republic">Syrian Arab Republic</option>
    <option value="Taiwan, Province of China">Taiwan, Province of China</option>
    <option value="Tajikistan">Tajikistan</option>
    <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
    <option value="Thailand">Thailand</option>
    <option value="Timor-Leste">Timor-Leste</option>
    <option value="Togo">Togo</option>
    <option value="Tokelau">Tokelau</option>
    <option value="Tonga">Tonga</option>
    <option value="Trinidad and Tobago">Trinidad and Tobago</option>
    <option value="Tunisia">Tunisia</option>
    <option value="Turkey">Turkey</option>
    <option value="Turkmenistan">Turkmenistan</option>
    <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
    <option value="Tuvalu">Tuvalu</option>
    <option value="Uganda">Uganda</option>
    <option value="Ukraine">Ukraine</option>
    <option value="United Arab Emirates">United Arab Emirates</option>
    <option value="United Kingdom">United Kingdom</option>
    <option value="United States">United States</option>
    <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
    <option value="Uruguay">Uruguay</option>
    <option value="Uzbekistan">Uzbekistan</option>
    <option value="Vanuatu">Vanuatu</option>
    <option value="Venezuela">Venezuela</option>
    <option value="Viet Nam">Viet Nam</option>
    <option value="Virgin Islands, British">Virgin Islands, British</option>
    <option value="Virgin Islands, U.s.">Virgin Islands, U.s.</option>
    <option value="Wallis and Futuna">Wallis and Futuna</option>
    <option value="Western Sahara">Western Sahara</option>
    <option value="Yemen">Yemen</option>
    <option value="Zambia">Zambia</option>
    <option value="Zimbabwe">Zimbabwe</option>
                    </select>
                    <p className='FilterPage_LabelSearch'>Stronger Foot</p>
                    <div className='FilterPage_StrongerfootSec'>
                        <div>
                            <input name='foot' checked={checkStrongFoot === 'left'} onChange={()=> handleCheckedStrongFoot('left')} type='checkbox' />
                            <label style={{marginLeft:"10px"}}>Left</label>
                        </div>
                        <div >
                            <input name='foot' checked={checkStrongFoot === 'right'} onChange={()=> handleCheckedStrongFoot('right')}  type='checkbox' />
                            <label style={{marginLeft:"10px"}}>Right</label>
                        </div>
                    </div>
                    
                    <p className='FilterPage_LabelSearch'>Position</p>
                    <div className='FilterPage_StrongerfootSec'>
                        <div>
                            <input  name='position'  checked={checkedPosition?.includes('Goalkeeper')} onChange={()=> handleCheckedPosition('Goalkeeper')} type='checkbox' />
                            <label style={{marginLeft:"10px"}}>Goalkeeper</label>
                        </div>
                        <div>
                            <input  name='position'  checked={checkedPosition?.includes('Centerback Defender')} onChange={()=> handleCheckedPosition('Centerback Defender')} type='checkbox' />
                            <label style={{marginLeft:"10px"}}>Center Back(Defenders)</label>
                        </div>
                        <div>
                            <input  name='position' checked={checkedPosition?.includes('Left Winger Defender')} onChange={()=> handleCheckedPosition('Left Winger Defender')} type='checkbox' />
                            <label style={{marginLeft:"10px"}}>Left Winger Back(Defenders)</label>
                        </div>
                        <div>
                            <input  name='position' checked={checkedPosition?.includes('Right Winger Defender')} onChange={()=> handleCheckedPosition('Right Winger Defender')} type='checkbox' />
                            <label style={{marginLeft:"10px"}}>Right Winger Back(Defenders)</label>
                        </div>
                        <div>
                            <input name='position' checked={checkedPosition?.includes('Central Midfielders')} onChange={()=> handleCheckedPosition('Central Midfielders')} type='checkbox' />
                            <label style={{marginLeft:"10px"}}>Central midfielders</label>
                        </div>
                        <div>
                            <input name='position' checked={checkedPosition?.includes('Attacking Midfielders')} onChange={()=> handleCheckedPosition('Attacking Midfielders')} type='checkbox' />
                            <label style={{marginLeft:"10px"}}>Attacking midfielders</label>
                        </div>
                        <div>
                            <input name='position' checked={checkedPosition?.includes('Defensive Midfielders')} onChange={()=> handleCheckedPosition('Defensive Midfielders')} type='checkbox' />
                            <label style={{marginLeft:"10px"}}>Defensive midfielders</label>
                        </div>
                        <div>
                            <input name='position' checked={checkedPosition?.includes('Wingers')} onChange={()=> handleCheckedPosition('Wingers')} type='checkbox' />
                            <label style={{marginLeft:"10px"}}>Wingers</label>
                        </div>
                        <div>
                            <input  name='position' checked={checkedPosition?.includes('Striker')} onChange={()=> handleCheckedPosition('Striker')} type='checkbox' />
                            <label style={{marginLeft:"10px"}}>Striker</label>
                        </div>
                        <button type='submit' className='Scoutpage_Profileform_savebutton'>
            {searchLoader ? <CircularProgress size={15} /> : <span>Search</span>}
            </button>
                    </div>
                </form>
            </div>
            </Portal>

            <div style={{marginLeft: '10px'}}>
            <div className='Homepage_Sortfootballers'>
             {allPlayers?.map((each, index)=>( 
             <Link
             to={`/viewplayerprofile/${each?.user_id || each?.id}`}
               data-aos-easing="ease-in-out"
               data-aos-duration="1000"
               data-aos="flip-down"
             className="PlayerCardsInfo w-[370px] lg:w-[390px] my-2 mr-0 md:mr-2"
             key={index}
           >
             <img src={each?.image_url} className='ImgPlayerCard_infoDetails' />
           <div className='playerCard_infoDetails px-2 py-4 w-full'>
             <div className='flex justify-between w-full'>
               <p className='text-sm text-[#6E798C]'>PLAYERS</p>
               <p className='text-sm text-[#6E798C]'>Language: {each?.language}</p>
               </div> 
               <p className='text-2xl font-bold text-[#081F32] py-3'> {shortenName(each?.firstname, each?.surname, maxLength)}</p>    
               <p className=' flex items-center'><GrLocation className='text-md' /><span className='ml-2 text-sm'> Location: {each?.location}</span></p> 
               <p className=' flex items-center py-1'><PiBarbellDuotone className='text-md' /><span className='ml-2'> Strong foot: {each?.strong_foot}</span></p>
                 <p className=' flex items-center py-1'><PiPersonArmsSpreadBold className='text-md' /><span className='ml-2 text-sm'> Weight: {each?.weight}kg</span></p>           
           </div>
           </Link>))}
              
            </div>
            </div>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default RecommendedFilterView