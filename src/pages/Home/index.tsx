import React, {memo} from 'react';

import HomeItem from '../../components/HomeItem';
import {Grid} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {RouteComponentProps} from '../../routes/types';
import {ShopStateProduct} from '../../store/types/shop';
import {AppState} from '../../store/configureStore';

import './styles.css';

interface HomePageProps extends RouteComponentProps {}

interface LinkStateProps {
  products: ShopStateProduct[];
}

type Props = HomePageProps & LinkStateProps;

const Home: React.FC<Props> = (props) => {
  const items = props.products.map((item) => {
    return (
      <Grid item xs={12} sm={6} md={4} key={item.id}>
        <Link to={`product/${item.id}`} className="home-item-link">
          <HomeItem name={item.name} images={item.images} price={item.price} />
        </Link>
      </Grid>
    );
  });

  return (
    <>
      <h1>Our Products</h1>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        spacing={4}>
        {items}
      </Grid>
    </>
  );
};

let mapStateToProps = (state: AppState): LinkStateProps => {
  return {
    products: state.shop.products,
  };
};

export default connect(mapStateToProps, null)(memo(Home));
