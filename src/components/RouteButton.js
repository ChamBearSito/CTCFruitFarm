import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const RouteButton = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.viewContainer}>
        <Text>RouteButton</Text>
      </View>
    </TouchableOpacity>
  )
}

export default RouteButton

const styles = StyleSheet.create({
  container:{
    width:120,
    height:120,
    backgroundColor:'green',
    borderRadius:10,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  viewContainer:{
    
  }
})