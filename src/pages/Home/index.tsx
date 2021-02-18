import React from 'react';
import HomeItem from '../../components/HomeItem';
import {Grid} from '@material-ui/core';

import {connect} from 'react-redux';

import {Link} from 'react-router-dom';

const Home: React.FC = (props: any) => {
  const items = props.products.map((item: any) => {
    return (
      <Grid item xs={4} key={item.id}>
        <Link to={`product/${item.id}`}>
          <HomeItem
            description={item.description}
            name={item.name}
            imageUrl={item.imageUrl}
            price={item.price}
          />
        </Link>
      </Grid>
    );
  });

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="center"
      spacing={3}>
      {items}
    </Grid>
  );
};

let mapStateToProps = (state: any) => {
  return {
    products: state.shop.products,
  };
};

let mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
