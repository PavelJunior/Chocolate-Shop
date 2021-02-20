import React from 'react';

import './styles.css';
import {Card, CardHeader, CardContent, CardMedia} from '@material-ui/core';

interface HomeItemProps {
  price: number;
  name: string;
  description: string;
  imageUrl: string;
}

const HomeItem: React.FC<HomeItemProps> = ({
  price,
  name,
  description,
  imageUrl,
}) => {
  return (
    <Card className="home-item">
      <CardMedia image={imageUrl} className="home-item-media" />
      <CardHeader title={name} subheader={price} className="home-item-header" />
      <CardContent className="home-item-content">
        <p>{description}</p>
      </CardContent>
    </Card>
  );
};

export default HomeItem;
