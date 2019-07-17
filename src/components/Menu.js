import React from 'react';
import SingleProduct from './SingleProduct';
import classnames from 'classnames';


class Menu extends React.Component {
    constructor() {
        super();
        this.state = {

        }
        // this.handleClick = this.handleClick.bind(this);

    }


    // handleClick (event) {
    //     this.setState({})
    // }


    render() {
        // console.log(this.props.menuItems);

        return (
            <main className='menu container'>
                <nav className='menu__navigation'>
                    <ul className='menu__listOfAllProducts'>

                        <li className='menu__burgers'>Burgers
                        {this.props.menuItems.map(item => {
                                if (item.type === 'burgers') {
                                    return <SingleProduct
                                        key={item.id}
                                        singleItem={item}
                                        basketItem={this.props.basketItem}
                                    />;
                                }
                            })}
                        </li>

                        <li className='menu__drinks'>Drinks
                        {this.props.menuItems.map(item => {
                                if (item.type === 'drinks') {
                                    return <SingleProduct
                                        key={item.id}
                                        singleItem={item}
                                        basketItem={this.props.basketItem}
                                    />;
                                }
                            })}
                        </li>

                        <li className='menu__desserts'>Desserts
                        {this.props.menuItems.map(item => {
                                if (item.type === 'desserts') {
                                    return <SingleProduct
                                        key={item.id}
                                        singleItem={item}
                                        basketItem={this.props.basketItem}
                                    />;
                                }
                            })}
                        </li>
                    </ul>
                </nav>

                {/* <div className="currentStock__deliveryCharge">
                    <p>Set delivery charge: £</p>
                    <input type="number" value={this.props.deliveryCharge} onChange={this.onChangeHandle} />
                </div>
                <div className='currentStock__address'>
                    <p>Delivery address</p>
                    <p><input type="text" value={this.props.deliveryAddress} onChange={this.onChangeHandleAddress} /></p>
                </div> */}
            </main>
        )
    }
}

export default Menu;