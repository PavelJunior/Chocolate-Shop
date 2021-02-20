import React, {useState} from 'react';

import './styles.css';
import {Card, CardHeader, CardContent, CardMedia} from '@material-ui/core';

interface HomeItemProps {
  price: number;
  name: string;
  description: string;
  images: string[];
}

const HomeItem: React.FC<HomeItemProps> = ({
  price,
  name,
  description,
  images,
}) => {
  const [imageIndex, setImageIndex] = useState(0);

  console.log(images);

  return (
    <Card
      className="home-item"
      onMouseEnter={() => setImageIndex(3)}
      onMouseLeave={() => setImageIndex(0)}>
      <CardMedia
        image={`/images/${images[imageIndex]}`}
        className="home-item-media"
      />
      <CardHeader
        title={name}
        subheader={`$${price}`}
        className="home-item-header"
      />
    </Card>
  );
};

export default HomeItem;
