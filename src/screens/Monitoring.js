import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import Reports from '../components/monitoring/Reports';
import Symptoms from '../components/monitoring/Symptoms';
import { metrics, scale } from '../helpers';

const FirstRoute = () => <Symptoms quizzId={'quiz1'} />;

const SecondRoute = () => <Reports quizzId={'quiz2'} />;

const initialLayout = { width: metrics.width };

export default () => {
  const [index, setIndex] = React.useState(0);
  const { colors } = useTheme();
  const [routes] = React.useState([
    { key: 'first', title: 'Symptômes' },
    { key: 'second', title: 'Rapports médecin' },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });
  const renderTabBar = props => {
    return (
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: colors.textAccent }}
        style={[
          styles.tabBarStyle,
          {
            backgroundColor: colors.textAccent2,
          },
        ]}
      />
    );
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={renderTabBar}
    />
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  tabBarStyle: {
    height: scale(58),
    alignContent: 'center',
    justifyContent: 'center',
  },
});
