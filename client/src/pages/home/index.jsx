import React, { useEffect, useState } from 'react'
import HomeIntro from '../../components/HomeIntro'
import heroImg from '../../images/heroImg.png'
import buyHomeImg from '../../images/buyHome.png'
import HomeBuying from '../../components/HomeBuying'
import HomeRenting from '../../components/HomeRenting'
const HomePage = () => {
  
  return (
    <div className='px-5 sm:px-10 py-10'>
      <HomeIntro img={heroImg} text1={'RENT A HOME'} title={'Rental Homes for Everyone'} text2={'Explore from Apartments, builder floors, villas and more'} 
      btnText={'Explore Renting'} />
      <HomeRenting/>
      <HomeIntro img={buyHomeImg} text1={'BUY A HOME'} title={'Find, Buy & Own Your Dream Home'} text2={'Explore from Apartments, land, builder floors, villas and more'} 
      btnText={'Explore Buying'} />
      <HomeBuying/>

    </div>
  )
}

export default HomePage
