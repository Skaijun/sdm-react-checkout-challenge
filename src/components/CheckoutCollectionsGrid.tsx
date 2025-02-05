
import { useEffect, useState } from "react"
import { CheckoutCollectionType, Customer } from "../types/checkout"
import CheckoutCollection from "./CheckoutCollection"
import './CheckoutCollectionsGrid.css'

const fetchRandomName = async () => {
    const index = Math.ceil((1 - Math.random()) * 10)
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${index}`);
    const userData = await response.json();

    return userData.name;
}

function CheckoutCollectionsGrid({ collections }: { collections: CheckoutCollectionType[] }) {
    const [newCustomerProductQt, setNewCustomerProductQt] = useState(0);
    const [dynamicCollections, setDynamicCollections] = useState(collections);

    const handleClick = async () => {
        // validation
        if (!newCustomerProductQt || newCustomerProductQt < 1 || newCustomerProductQt > 99) {
            alert('PLease provide the correct number between 1 and 100!')
            return false;
        }

        // we must allocate new Customer's checkout into the lowest available queue / checkout collection
        // so let's say we have [0]-[3 Customers]-[1 Customer]-[0]
        // by entering 10 (number of products) and on checkount btn click
        // new entry should apear in the fist column (first checkout collection)

        const customerName = await fetchRandomName();
        const newCustomer: Customer = {
            name: customerName,
            productsQuantity: newCustomerProductQt
        }

        // 2) push new Customer into that queue
        setDynamicCollections(prevCollectionsState => {
            // 1) loop through the all collections(columns)
            //    to find a column with the lowest number of Customers
            const leastLoadedCollection = [...prevCollectionsState].sort((a, b) => a.customers.length - b.customers.length)[0]
            return [...prevCollectionsState].map(collection => {
                if (collection.name === leastLoadedCollection.name) {
                    const updatedCustomersList = [...collection.customers];
                    updatedCustomersList.push(newCustomer);
                    return {
                        ...collection,
                        customers: updatedCustomersList
                    }
                } else {
                    return collection;
                }

            });
        })
    }

    // 3) Also we want to decrease product quantity for each collection FIRST Customer
    //    every 1 second

    useEffect(() => {
        const interval = setInterval(() => {
            setDynamicCollections((prevState) => {
                return prevState.map(prevCollectionState => {
                    if (!prevCollectionState.customers.length) {
                        return prevCollectionState;
                    }

                    const firstCustomer = prevCollectionState.customers[0];
                    const updatedCustomersList = [...prevCollectionState.customers];

                    // if customer has last item in the basket
                    // we should remove him from the queue
                    if (firstCustomer.productsQuantity === 1) {
                        updatedCustomersList.shift();
                        return { ...prevCollectionState, customers: updatedCustomersList };
                    }

                    const updatedCustomer = { ...firstCustomer, productsQuantity: firstCustomer.productsQuantity - 1 };
                    updatedCustomersList[0] = updatedCustomer;
                    return { ...prevCollectionState, customers: updatedCustomersList };
                });
            })
        }, 500);

        return () => {
            clearInterval(interval)
        }
    }, []);

    return (
        <>
            <div className='control-section'>
                <input type="number" min={0} name="product-quantity" onChange={(e) => setNewCustomerProductQt(Number(e.target.value))} />
                <button type="button" onClick={handleClick}>Checkout</button>
            </div>
            <div className="checkout-collections">
                {
                    dynamicCollections.map(collection => <CheckoutCollection key={Math.random()} collection={collection} />)
                }

            </div>
        </>
    )
}

export default CheckoutCollectionsGrid