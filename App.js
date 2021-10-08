import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import Slider from './Slider'

class CircularSliderApp extends Component {
  constructor(props){
    super(props)
    this.state = {
      slider1: 270,
     
    }
  }
  render() {
    return (
      <View style={styles.root}>
        <View style={styles.container}>
          <View style={styles.slider1}>
            <Slider width={400} height={400} meterColor='#0cd' textColor='#fff'
              value={this.state.slider1} onValueChange={(value)=>this.setState({slider1:value})}/>
          </View>
         
         </View> 
       
     
      
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  container: {
    position: 'relative',
    width: 400,
    height: 400
  },
  slider1: {
    position: 'absolute',
    top: 0,
    left: 0
  },
});

export default CircularSliderApp;