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
    const loadImages = async () => {
      const promises: Promise<string>[] = await images.map((image: string) => {
        return new Promise((resolve: any, reject: any) => {
          const newImage = new Image();
          newImage.src = `/images/${image}`;
          newImage.onload = resolve();
          newImage.onerror = reject();
        });
      });

      await Promise.all(promises);
    };

    loadImages();
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
