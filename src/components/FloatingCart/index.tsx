import React, { useState, useMemo } from 'react';

import { useNavigation } from '@react-navigation/native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import {
  Container,
  CartPricing,
  CartButton,
  CartButtonText,
  CartTotalPrice,
} from './styles';

import formatValue from '../../utils/formatValue';

import { useCart } from '../../hooks/cart';

// Calculo do total
// Navegação no clique do TouchableHighlight

const FloatingCart: React.FC = () => {
  const { products } = useCart();

  const navigation = useNavigation();
  // const [valorCart, setValorCart] = useState();

  const cartTotal = useMemo(() => {
    let valorTotal = 0;
    products.map(prod => {
      const value = prod.quantity * prod.price;
      valorTotal += value;
      return 1;
    });
    // setValorCart(valorTotal);
    return formatValue(valorTotal);
  }, [products]);

  const totalItensInCart = useMemo(() => {
    const { quantityItems } = products.reduce(
      (accumulator, product) => {
        if (product.quantity > 0) {
          accumulator.quantityItems += product.quantity;
        }
        return accumulator;
      },
      {
        quantityItems: 0,
      },
    );
    return quantityItems;
  }, [products]);

  return (
    <Container>
      <CartButton
        testID="navigate-to-cart-button"
        onPress={() => navigation.navigate('Cart')}
      >
        <FeatherIcon name="shopping-cart" size={24} color="#fff" />
        <CartButtonText>{`${totalItensInCart} itens`}</CartButtonText>
      </CartButton>

      <CartPricing>
        <CartTotalPrice>{cartTotal}</CartTotalPrice>
      </CartPricing>
    </Container>
  );
};

export default FloatingCart;
