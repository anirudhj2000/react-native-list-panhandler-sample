import { View, Text, StyleSheet,FlatList, Animated, PanResponder} from 'react-native'
import React,{useState, useCallback,useRef} from 'react';
import data from './data';

const Home = () => {
  const [listData, setData] = useState(data);
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    }),
  ).current;

  const renderListItem = useCallback(({item}) => {
    return(
        <Animated.View {...panResponder.panHandlers} style={[styles.listItem,{
            transform: [{translateX: pan.x}, {translateY: pan.y}],
          }]}>
            <Text style={{fontSize:24}}>{item.title}</Text>
            <Text>{item.description}</Text>
        </Animated.View>
    )
  })

  return (
    <View style={[styles.container,]}
       >
        <Text style={{alignSelf:'center',marginVertical:'5%',fontSize:24,color:'#000'}}>Pan handler sample</Text>
        <View style={{height:'100%',width:'95%',alignSelf:'center'}}>
            <FlatList
                data={listData}
                renderItem={renderListItem}/>
        </View>
    </View>
  )
}

export default Home;

const styles = new StyleSheet.create({
    container : {
        height:'100%',
        width:'100%',
    },

    listItem:{
        marginVertical:'2.5%',
        backgroundColor:'#766ded',
        padding:16,
        borderRadius:4,
    }
})