import React from 'react'
import './ExploreMenu.css'

import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category,setCategory}) => {
    
  return (
    <div className='explore-menu' id="explore-menu">
      <h1>Explore Our Menu</h1>
      <p className='explore-menu-text'>Choose from diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
    <div className="explore-menu-list">
        {menu_list.map((each_item,index)=>{
            return(
                <div onClick={()=>setCategory(prev=>prev===each_item.menu_name?"All":each_item.menu_name)} key={index} className="explore-menu-list-item">
                    <img className={category===each_item.menu_name?"active":""} src={each_item.menu_image} alt="" />  
                    <p>{each_item.menu_name}</p>  
                </div>
            )
        })}
    </div>
    <hr/>
    </div>
  )
}

export default ExploreMenu
