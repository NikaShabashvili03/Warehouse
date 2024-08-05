import React from 'react'
import getBasketedParts from '@/app/actions/getBasketedParts'
import Cart from '../components/cart/Cart';

export default async function page() {
  const basketedParts = await getBasketedParts();
  
  return <Cart allParts={basketedParts}/>
}
