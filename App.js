/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Vibration
} from 'react-native'

import Torch from 'react-native-torch'
import {accelerometer,gyroscope, setUpdateIntervalForType, SensorTypes } from "react-native-sensors"

setUpdateIntervalForType(SensorTypes.accelerometer, 300);

export default class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            luz: false,
            contador: 0
        }
    }

    componentDidMount(){
        const subscription = accelerometer.subscribe(async ({y}) => {
           // console.log(y)
            if(y > 8){
                await this.setState({contador: this.state.contador + 1});
                if(this.state.contador % 10 == 0){
                    await this.setState({luz: !this.state.luz})
                    Torch.switchState(this.state.luz)
                    Vibration.vibrate()
                    console.log(this.state.luz)
                }
                
            }
          });
      
    }
    
    render(){
        return(
            <View
                style = {{paddingTop: 20}}
            >

                <Text>La luz está {this.state.luz?"encendida":"apagada"}</Text>
            </View>
        )
    }
}