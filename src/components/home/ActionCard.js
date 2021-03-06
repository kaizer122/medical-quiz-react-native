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
    color: colors.textOnSurfaceTitle,
    style: styles.icon,
  };
  return (
    <Animatable.View key={id} animation="fadeInUp" delay={index * 100}>
      <TouchableOpacity
        key={id}
        activeOpacity={0.7}
        onPress={navigateToPath}
        style={[
          styles.card,
          index % 2
            ? { marginRight: scale(15), marginLeft: scale(5) }
            : { marginLeft: scale(15), marginRight: scale(5) },
          index >= 2 ? { marginTop: scale(5) } : { marginBottom: scale(5) },
        ]}>
        <Surface
          style={[styles.surface, { backgroundColor: colors.textAccent2 }]}>
          {faIcon ? <FA5Icon {...iconProps} /> : <FeatherIcon {...iconProps} />}

          <Title
            numberOfLines={1}
            style={[styles.title, { color: colors.textOnSurfaceTitle }]}>
            {title}
          </Title>
        </Surface>
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default ActionCard;

const styles = StyleSheet.create({
  card: { width: metrics.width / 2 - scale(20) },
  surface: {
    paddingHorizontal: scale(24),
    paddingVertical: scale(12),
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 6,
    borderRadius: 10,
  },
  title: { textAlign: 'center' },
  icon: { fontSize: scale(50) },
});
