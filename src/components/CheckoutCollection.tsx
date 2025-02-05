
import { CheckoutCollectionType } from '../types/checkout'
import './CheckoutCollection.css'

function CheckoutCollection({ collection }: { collection: CheckoutCollectionType }) {

    return (
        <div className="checkout-collections__item">
            <h3>{collection.name}</h3>
            {
                collection.customers.map(customerData => (
                    <div key={Math.random()} className='customer'>
                        {customerData.name}{' '}<span className='quantity'>{customerData.productsQuantity}</span>
                    </div>
                ))
            }

        </div>
    )
}

export default CheckoutCollection