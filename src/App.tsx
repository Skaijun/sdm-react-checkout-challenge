import './App.css'
import { CheckoutCollectionType } from './types/checkout';
import CheckoutCollectionsGrid from './components/CheckoutCollectionsGrid';

const initData: CheckoutCollectionType[] = [
  {
    name: 'Checkout Collection 1',
    customers: [
      {
        name: "John Doe",
        productsQuantity: 3
      },
      {
        name: "Marry Jane",
        productsQuantity: 1
      }
    ]
  },
  {
    name: 'Checkout Collection 2',
    customers: [
      {
        name: "Herman Smith",
        productsQuantity: 4
      }
    ]
  },
  {
    name: 'Checkout Collection 3',
    customers: [
      {
        name: "Bob",
        productsQuantity: 13
      },
      {
        name: "Sam",
        productsQuantity: 5
      },
      {
        name: "Santa",
        productsQuantity: 9
      },
    ]
  },
  {
    name: 'Checkout Collection 4',
    customers: [
      {
        name: "Fourtuner",
        productsQuantity: 2
      }
    ]
  },
]

function App() {
  return (
    <>
      <h1>Checkout Challenge</h1>
      <CheckoutCollectionsGrid collections={initData} />
    </>
  )
}

export default App
