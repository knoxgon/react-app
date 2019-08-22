import React from 'react';
import './App.css';
import Product from './Product/Product';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      products: [
        { title: 'Barrier plank', /*image: '../imgs/barrierplank.jpg',*/ price: '$61.00', isAvailable: true, description: 'Crowd control is an integral aspect of many events.' },
        { title: 'Cable protector', /*image: '../imgs/cable-protector.jpg',*/ price: '$95.00', isAvailable: true, description: '30mm High Cable Guard with Yellow Safety Stripes, Premium Cable Protector. Fabricated from the highest grade flexible PVC, with the stripes made out of NBR. These premium cable covers can be used indoors as well as outdoors to cover wires and cables. Features a snap-open design on the top. Only available in 6m long rolls.' },
        { title: 'Crane', /*image: '../imgs/crane.jpg',*/ price: '$925.000.00', isAvailable: true, description: 'THIS DEMAG AC1600 IS COMPLETELY OVERHAULED IN 2012, 500T CAPACITY, 50M MAIN BOOM, SECOND WINCH, 90M FLY JIB, TELMA BRAKE' },
        { title: 'Drum truck', /*image: '../imgs/drumtruck.jpg',*/ price: '$215.00', isAvailable: true, description: 'Allows operator to tilt and lower drum to its horizontal position for dispensing or storage' },
        { title: 'Hazard tape', /*image: '../imgs/hazard-tape.jpg',*/ price: '$19.85', isAvailable: true, description: 'Safety & Hazard Tapes Hazard warning tape is specifically used to highlight potential hazards and prevent accidents, perfect for use in the workplace.' },
        { title: 'High visible cloth', /*image: '../imgs/hicloths.jpg',*/ price: '$34.99', isAvailable: true, description: 'Complete your high visibility outfit with the addition of our high visible clothing items.' },
      ]
    }
  }

  render() {
    return (
      <div>
        {this.state.products.map(item => {
          return < Product prodTitle={item.title} desc={item.description} price={item.price} isAvailable={item.isAvailable} >
          </Product>
        })}
      </div>
    );
  }
}