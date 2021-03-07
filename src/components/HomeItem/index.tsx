import React, {useState, memo, useEffect} from 'react';
import {Card, CardHeader, CardMedia} from '@material-ui/core';
import './styles.css';

interface HomeItemProps {
  price: number;
  name: string;
  images: string[];
}

const HomeItem: React.FC<HomeItemProps> = ({price, name, images}) => {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    images.forEach((image: string) => {
      const newImage = new Image();
      newImage.src = `/images/${image}`;
    });
  }, []);

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

export default memo(HomeItem);
