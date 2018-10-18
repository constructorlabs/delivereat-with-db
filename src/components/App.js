import React from 'react';

import '../styles/App.scss';

class App extends React.Component {
  constructor(){
    super();

    this.state = { 
      menu: {}
    }
  }

  /* get menu data
  ///////////////////////////////////////////*/

  componentDidMount () {
    fetch("/api/menu")
    .then(response => response.json())
    .then(menu => {
      this.setState({ menu })
    })
  }

  render(){
    return (
      <div>
        { 
          Object.values(this.state.menu).map(item => {
            return (
            <section key={item.id}>
              <ul>
                <li>{item.id}</li>
                <li>{item.item}</li>
                <li>{item.price}</li>
                <li>{item.img}</li>
                <li>{item.course}</li>
              </ul>
            </section>);
          }) 
        }
      </div>
    )
  }
}

export default App;