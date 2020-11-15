import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import Colors from '../../constants/Colors'

export default Card = ({item, onAddToCart, onViewDetail}) => {
  const {imageUrl, title, price} = item
  return (
    <View style={styles.product}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: imageUrl}}/>
      </View>
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>${price.toFixed(2)}</Text>
      </View>
      <View style={styles.actions}>
        <Button title='View Details' onPress={onViewDetail} color={Colors.primary}/>
        <Button title='To Cart' onPress={onAddToCart} color={Colors.primary}/>
      </View>
     </View>
  );
}

const styles = StyleSheet.create({
  product: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 300,
    margin: 20,
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: 'hidden'
  },
  image: {
    width: "100%",
    height: "100%"
  },
  button: {
    
  },
  details: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '15%'
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
  },
  price: {
    fontSize: 16,
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: "25%",
    marginHorizontal: 15
  }
})
