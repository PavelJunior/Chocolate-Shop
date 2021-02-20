import React from 'react';

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
      <Grid item xs={4} key={item.id}>
        <Link to={`product/${item.id}`} className="home-item-link">
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
      spacing={4}>
      {items}
    </Grid>
  );
};

let mapStateToProps = (state: AppState): LinkStateProps => {
  return {
    products: state.shop.products,
  };
};

export default connect(mapStateToProps, null)(Home);
