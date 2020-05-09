import React from 'react';
import { StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Surface, Title, useTheme } from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FA5Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from 'react-navigation-hooks';
import { metrics, scale } from '../../helpers';

const ActionCard = ({ title, path, icon, faIcon, id, index }) => {
  const { navigate } = useNavigation();
  const { colors } = useTheme();
  const navigateToPath = () => (path ? navigate(path) : null);
  const iconProps = {
    name: icon,
    color: '#FFF',
    style: { fontSize: scale(50) },
  };
  const { width } = metrics;
  return (
    <Animatable.View key={id} animation="fadeInUp" delay={index * 100}>
      <TouchableOpacity
        key={id}
        activeOpacity={0.7}
        onPress={navigateToPath}
        style={[
          styles.container,
          { width: width / 2 - scale(20) },
          index % 2
            ? { marginRight: scale(15), marginLeft: scale(5) }
            : { marginLeft: scale(15), marginRight: scale(5) },
        ]}>
        <Surface
          style={[styles.surface, { backgroundColor: colors.textAccent2 }]}>
          {faIcon ? <FA5Icon {...iconProps} /> : <FeatherIcon {...iconProps} />}

          <Title style={{ textAlign: 'center', color: '#FFF' }}>{title}</Title>
        </Surface>
      </TouchableOpacity>
    </Animatable.View>
  );
};
const styles = StyleSheet.create({
  container: {
    aspectRatio: 1.34,
  },
  surface: {
    paddingHorizontal: scale(24),
    paddingVertical: scale(12),
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 6,
    borderRadius: 10,
  },
});
export default ActionCard;
