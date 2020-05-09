import React from 'react';
import { Appbar } from 'react-native-paper';
import { enableScreens } from 'react-native-screens';
import { createAppContainer } from 'react-navigation';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { TransitionPresets } from 'react-navigation-stack';
import Home from './screens/Home';
import Quizz from './screens/Quizz';
import Settings from './screens/Settings';

enableScreens();
const commonRouteConfig = {
  cardStyleInterpolator: ({ current: { progress } }) => {
    const opacity = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return { cardStyle: { opacity } };
  },
  gestureEnabled: false,
  cardStyle: {
    backgroundColor: 'transparent',
  },
};
const homeStack = createSharedElementStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: { headerShown: false, ...commonRouteConfig },
    },
    Quizz: {
      screen: Quizz,
      navigationOptions: { headerShown: false, ...commonRouteConfig },
    },
    Settings: { screen: Settings, navigationOptions: { title: 'Paramétres' } },
  },
  {
    hederMode: 'float',
    defaultNavigationOptions: {
      ...TransitionPresets.FadeFromBottomAndroid,
      header: ({ navigation, scene, previous }) => (
        <Appbar.Header>
          {previous ? (
            <Appbar.BackAction
              color={'#FFF'}
              onPress={() => navigation.goBack()}
            />
          ) : null}
          <Appbar.Content
            titleStyle={{ color: '#FFF' }}
            title={scene.descriptor.options.title}
          />
        </Appbar.Header>
      ),
    },
  },
);

// homeStack.navigationOptions = ({ navigation }) => {
//   let headerVisible = true;
//   if (navigation.state.index > 0) {
//     headerVisible = false;
//   }

//   return {
//     headerVisible,
//   };
// };
/*
const secondStack = createSharedElementStackNavigator(
  {
    Home: Home,
    Quizz: { screen: Quizz, navigationOptions: { tabBar: { visible: false } } },
  },
  {
    mode: 'modal',
    headerMode: 'none',
    theme: 'dark',
    defaultNavigationOptions: {
      cardStyleInterpolator: ({ current: { progress } }) => {
        const opacity = progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        });
        return { cardStyle: { opacity } };
      },
      gestureEnabled: false,
      cardStyle: {
        backgroundColor: 'transparent',
      },
    },
  },
);

const TabNavigator = createMaterialBottomTabNavigator({
  Tab1: {
    screen: homeStack,
    navigationOptions: {
      title: 'Stack',
      tabBarIcon: props => (
        <Icon name="md-arrow-forward" size={20} color={props.tintColor} />
      ),
    },
  },
  Tab2: {
    screen: SecondTab,
    navigationOptions: {
      title: 'Modal',
      tabBarIcon: props => (
        <Icon name="md-arrow-up" size={20} color={props.tintColor} />
      ),
    },
  },
});
*/
const Navigation = createAppContainer(homeStack);
export default Navigation;
