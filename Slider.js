import React,{Component} from 'react'
import {PanResponder} from 'react-native'
import Svg,{Path,Circle,G,Text} from 'react-native-svg'
import Animated from 'react-native-reanimated';

class CircularSlider extends Component { 
  constructor(props){
    super(props)
    this.handlePanResponderMove = this.handlePanResponderMove.bind(this)
    this.cartesianToPolar = this.cartesianToPolar.bind(this)
    this.degToValue = this.degToValue.bind(this)
    const {width,height} = props
    const smallestSide = (Math.min(width,height))
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: this.handlePanResponderMove
    })
    this.state = {
      cx: width/2,
      cy: height/2,
      r: (smallestSide/2)*0.75
    }
  }

   
    
degToValue(angle){
    const {cx,cy,r} = this.state
        , a = (angle-90) * Math.PI / 180.0
        , x = cx + (r * Math.cos(a))
        , y = cy + (r * Math.sin(a))
    return {x,y}
  }

  cartesianToPolar(x,y){
    const {cx,cy} = this.state
    return Math.round((Math.atan((y-cy)/(x-cx)))/(Math.PI/180)+((x>cx) ? 270 : 90))
  }
  handlePanResponderMove({nativeEvent:{locationX,locationY}}){
    this.props.onValueChange(this.cartesianToPolar(locationX,locationY))
  }
  
  render(){
    const {width,height,value,meterColor,textColor,onValueChange} = this.props
        , {cx,cy,r} = this.state
        , startCoord = this.degToValue(0)
        , endCoord = this.degToValue(value)
    return (
      <Animated.View>
      <Svg onLayout={this.onLayout} width={width} height={height} {...this._panResponder.panHandlers}>
        <Circle cx={cx} cy={cy} r={r} stroke='#eee' strokeWidth={2} fill='none'/>
        <Path stroke={meterColor} strokeWidth={10} fill='none'
          d={`M${startCoord.x} ${startCoord.y} A ${r} ${r} 0 ${value>180?1:0} 1 ${endCoord.x} ${endCoord.y}`}
          />
        <G x={endCoord.x-7.5} y={endCoord.y-7.5}>
          <Circle cx={7.5} cy={7.5} r={20} fill={meterColor} />
          <Text key={value+''} x={7.5} y={12} fontSize={14} fill={textColor} textAnchor="middle">
            {value+''}
          </Text>
        </G>
        <Svg height="60" width="200">
  <Text
    fill="none"
    stroke="gray"
    fontSize="30"
    x="200"
    y="200"
    textAnchor="middle"
  >
       {value+''}
  </Text>
</Svg>
      </Svg>
      </Animated.View>
    )
  }
}

export default CircularSlider