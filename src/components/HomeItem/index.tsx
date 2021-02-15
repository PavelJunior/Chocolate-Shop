import React from 'react'

import './styles.css'
import {Card, CardHeader, CardContent, CardMedia} from "@material-ui/core";

interface HomeItemProps {
  price: number,
  name: string,
  description: string,
  imageUrl: string,
}

const HomeItem: React.FC<HomeItemProps> = ({price, name, description, imageUrl,}) => {
  return (
    <Card className='home-item'>
      <CardHeader title={name} subheader={price}/>
      <CardContent>
        <p>{description}</p>
      </CardContent>
      <CardMedia image={imageUrl} className='home-item-media'/>
    </Card>
  )
}

export default HomeItem
