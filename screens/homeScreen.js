import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native'

export default HomeScreen = () => {
  const [showActionBar, setShowActionBar] = useState(false)
  const [selectedLoginMethod, setSelectedLoginMethod] = useState('web3')

  const toggleActionBar = () => {
    setShowActionBar(!showActionBar)
  }

  const renderWeb3ActionBar = () => {
    return (
      <Animated.View
        style={[
          styles.actionBarContainer,
          {
            transform: [
              {
                translateY: showActionBar
                  ? new Animated.Value(0)
                  : new Animated.Value(150),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => console.log('MetaMask login clicked')}
        >
          <Image
            source={require('../assets/icon.png')}
            style={{ width: 30, height: 30, marginBottom: 5 }}
          />
          <Text style={styles.actionButtonText}>MetaMask</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => console.log('WalletConnect login clicked')}
        >
          <Image
            source={require('../assets/icon.png')}
            style={{ width: 30, height: 30, marginBottom: 5 }}
          />
          <Text style={styles.actionButtonText}>WalletConnect</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => console.log('Torus login clicked')}
        >
          <Image
            source={require('../assets/icon.png')}
            style={{ width: 30, height: 30, marginBottom: 5 }}
          />
          <Text style={styles.actionButtonText}>Torus</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => console.log('Coinbase Wallet login clicked')}
        >
          <Image
            source={require('../assets/icon.png')}
            style={{ width: 30, height: 30, marginBottom: 5 }}
          />
          <Text style={styles.actionButtonText}>Coinbase Wallet</Text>
        </TouchableOpacity>
      </Animated.View>
    )
  }

  const renderWeb2ActionBar = () => {
    return (
      <Animated.View
        style={[
          styles.actionBarContainer,
          {
            transform: [
              {
                translateY: showActionBar
                  ? new Animated.Value(0)
                  : new Animated.Value(150),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => console.log('fb clicked')}
        >
          <Image
            source={require('../assets/icon.png')}
            style={{ width: 30, height: 30, marginBottom: 5 }}
          />
          <Text style={styles.actionButtonText}>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => console.log('Twitter login clicked')}
        >
          <Image
            source={require('../assets/icon.png')}
            style={{ width: 30, height: 30, marginBottom: 5 }}
          />
          <Text style={styles.actionButtonText}>Twitter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => console.log('Google login clicked')}
        >
          <Image
            source={require('../assets/icon.png')}
            style={{ width: 30, height: 30, marginBottom: 5 }}
          />
          <Text style={styles.actionButtonText}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => console.log('LinkedIn login clicked')}
        >
          <Image
            source={require('../assets/icon.png')}
            style={{ width: 30, height: 30, marginBottom: 5 }}
          />
          <Text style={styles.actionButtonText}>LinkedIn</Text>
        </TouchableOpacity>
      </Animated.View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/icon.png')}
          style={{ width: '80%', height: '80%' }}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Sign in or create an account with</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setSelectedLoginMethod('web3')
            toggleActionBar()
          }}
        >
          <Text style={styles.buttonText}>Login with Web 3.0 Wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setSelectedLoginMethod('web2')
            toggleActionBar()
          }}
        >
          <Text style={styles.buttonText}>Login With Web 2.0</Text>
        </TouchableOpacity>
      </View>
      {selectedLoginMethod === 'web3'
        ? renderWeb3ActionBar()
        : renderWeb2ActionBar()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logoContainer: {
    width: '100%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    // marginTop: '10%',
  },
  textContainer: {
    width: '100%',
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '100%',
    height: '15%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#00b5d3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  actionBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 250,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    // borderTopWidth: 1,
    borderTopColor: '#e3e3e3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
})
