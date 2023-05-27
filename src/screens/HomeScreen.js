import React from 'react';
import {StyleSheet, SafeAreaView, Text, ScrollView, View } from 'react-native';
import RouteButton from '../components/RouteButton';

const HomeScreen=()=>{
    return(
        <SafeAreaView>
            <ScrollView>
                <View style={styles.viewContainer}>
                    <RouteButton/>
                    <RouteButton/>
                    <RouteButton/>
                    <RouteButton/>
                    <RouteButton/>
                    <RouteButton/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen;

const styles=StyleSheet.create({
    viewContainer:{
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-between',
    }
})