import React from 'react';
import MenuItem from './MenuItem';

class MenuItems extends React.Component {  
    constructor() {
        super()
        this.handleMenuSelection = this.handleMenuSelection.bind(this);
        this.menuSelectionCheckboxes = this.menuSelectionCheckboxes.bind(this);
        this.state = {
            courses: { starter: 'Starters', main: 'Mains', dessert: 'Desserts' },
            coursesSelected: {},
            loaded: null
        }
    }

    componentDidMount (){
        this.setState({ 
            loaded: true,
            coursesSelected: Object.assign({}, this.state.courses)
        })
    }

    handleMenuSelection(course, event) {
        let courses;
        if (event.target.checked) {
            courses = Object.assign({}, this.state.coursesSelected, {[course]: this.state.courses[course] })
        } else {
            courses = Object.assign({}, this.state.coursesSelected)
            delete courses[course]
        }
        this.setState({ coursesSelected: courses })

    }

    menuSelectionCheckboxes() {
        return Object.keys(this.state.courses).map(course => {
          const input = 
          <div className="menu__checkbox" key={course} >
            <label className="container" key={course}>{this.state.courses[course]}
                <input type="checkbox" id={course} defaultChecked="true"  onChange={(event) => this.handleMenuSelection(course, event)} />
                <span className="checkmark"></span>
            </label>
          </div>
          return input;
        })
    }

    createMenuSection () {
        return Object.keys(this.state.coursesSelected).sort().reverse().map(course => {
                const menuSection = this.props.menuArray.filter(itemObject => {
                return itemObject.course === course;
            })
            .map(itemObj => {
                const id = `${itemObj.course}-${itemObj.id}`;
                return <MenuItem
                        key={id}
                        item={itemObj}
                        getCurrency={this.props.getCurrency}
                        currentPurchase={this.props.currentPurchase}
                        receiveCurrentPurchase={this.props.receiveCurrentPurchase}
                    />
            })
            return (
                <section key={course} className="fadein">
                    {<h1 className="menu">{this.state.courses[course]}</h1>}
                    {menuSection}
                </section>
            )}
        )
    }

    render () {

        const menuItems = this.state.loaded &&
        <React.Fragment>
            <div className="hero-container">
                <img src="../static/images/homepage-hero.png" className="hero"/>
            </div>
            <div className="menu__selection">
                {this.menuSelectionCheckboxes()}
            </div>
            <main className="main">
                <div className="menu__sections">
                    {this.createMenuSection()}
                </div>
            </main>
        </React.Fragment>

        return (
            <React.Fragment>
                {menuItems}
            </React.Fragment>
        )
    }
}

export default MenuItems;