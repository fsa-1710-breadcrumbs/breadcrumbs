import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { FontAwesome } from 'react-native-vector-icons';

import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Create from './screens/StartTrail';
import SingleTrail from './screens/SingleTrail';
import EditTrail from './screens/EditTrail';


const headerStyle = {
  marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
};

export const SignedOut = StackNavigator({
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: 'Welcome',
      headerStyle
    }
  },
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: 'Sign In',
      headerStyle
    }
  }
}, {
  headerMode: 'none',
});

export const SignedIn = TabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        headerLeft: null,
        tabBarLabel: 'Trails',
        tabBarIcon: ({ tintColor }) =>
          <FontAwesome name="connectdevelop" size={30} color={tintColor} />
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: 'Me',
        tabBarIcon: ({ tintColor }) =>
          <FontAwesome name="user" size={30} color={tintColor} />
      }
    }
  },
  {
    tabBarOptions: {
      style: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
      }
    }
  }
);

export const createRootNavigator = (signedIn = false) => {
  return StackNavigator(
    {
      SignedIn: {
        screen: SignedIn,
        navigationOptions: {
          gesturesEnabled: false,
          headerLeft: null,
          headerStyle
        }
      },
      SignedOut: {
        screen: SignedOut,
        navigationOptions: {
          gesturesEnabled: false,
          headerLeft: null,
          headerStyle
        }
      },
      Create: {
        screen: Create,
        navigationOptions: {
          gesturesEnabled: false
        },
      },
      SingleTrail: {
        screen: SingleTrail,
        navigationOptions: {
          title: 'Follow Trail',
          gesturesEnabled: false,
          headerStyle
        }
      },
      EditTrail: {
        screen: EditTrail,
        navigationOptions: {
          title: 'Edit Trail',
          headerStyle
        }
      }
    },
    {
      mode: 'modal',
      initialRouteName: signedIn ? 'SignedIn' : 'SignedOut'
    }
  );
};
