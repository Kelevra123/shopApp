import React, {useCallback, useEffect, useState} from 'react';
import { FlatList, Button, Platform, View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import Colors from '../../constants/Colors';
import { fetchProduct } from '../../store/actions/products';

const ProductsOverviewScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  const loadProducts  = useCallback( async () => {
    setError(null)
    setIsLoading(true)
    try {
      await dispatch(fetchProduct())
    } catch(err) {
      setError(err)
    }
    setIsLoading(false)
  }, [setError, setIsLoading, dispatch])

  useEffect(() => {
    const willFocusSub = props.navigation.addListener('willFocus', loadProducts)

    return () => {
      willFocusSub.remove()
    }
  }, [loadProducts])

  useEffect(() => {
    loadProducts()
  }, [dispatch, loadProducts])

  const selectItemHandler = (id, title) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title
    });
  };



  if (error) {
    return <View style={styles.centered}>
      <Text>Some Error</Text>
      <Button title='Try again' color={Colors.primary} onPress={loadProducts}/>
    </View>
  }

  if (isLoading) {
    return <View style={styles.centered}>
      <ActivityIndicator color={Colors.primary} size='large' />
    </View>
  }

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All Products',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            navData.navigation.navigate('Cart');
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default ProductsOverviewScreen;
