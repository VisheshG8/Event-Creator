import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';

const OnboardingScreen1 = ({navigation}:any) => {
  
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/os1.png')}
        style={styles.backgroundImage}
        resizeMode="stretch"
      />
      <View style={styles.contentArea}>
        <Text style={styles.headingText}>We serve incomparable delicacies</Text>
        <Text style={styles.descriptionText}>
          All the best restaurants with their top menu waiting for you, they
          cant wait for your order!!
        </Text>
        <View style={styles.IndicatorContainer}>
        <Image
          style={styles.IndicatorImage}
          source={require('../assets/Indicator.png')}
        />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.replace('Login')}>
            <Text style={styles.navigationButtons}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OnboardingScreen2')}>
            <Text style={styles.navigationButtons}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Make the container take up the entire screen
    justifyContent: 'center', // Center the content vertically
  },
  backgroundImage: {
    position: 'absolute', // Place the image behind the content area
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  contentArea: {
    display: 'flex',
    position: 'absolute',
    backgroundColor: 'background: rgba(254, 140, 0, 1)',
    padding: 20,
    width: 311,
    height: 400,
    left: 25,
    bottom: 36,
    borderRadius: 48,
  },
  headingText: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 32,
    fontWeight: '600',
    fontFamily: 'Inter',
    textAlign: 'center',
    marginBottom: 10,
  },
  descriptionText: {
    fontFamily: 'Inter',
    textAlign: 'center',
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 14,
    marginBottom: 20,
  },
  buttonContainer: {
    display: 'flex',
    top: 70,
    flexDirection: 'row', // Arrange buttons horizontally
    justifyContent: 'space-between', // Distribute buttons evenly across the width
  },
  navigationButtons: {
    color: '#FFFFFF',
  },
  IndicatorContainer: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center', // Center the Image component inside the container
  },

  IndicatorImage:{
    display:'flex',  
  }
});

export default OnboardingScreen1;
