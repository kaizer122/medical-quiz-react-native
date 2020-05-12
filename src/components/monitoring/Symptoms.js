import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { AsyncStorage, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Divider, Text, Title, useTheme } from 'react-native-paper';
import { metrics, scale } from '../../helpers';
import { FRENCH_DATE_FORMAT, MONITORING_KEY } from '../../helpers/constants';
import Spinner from '../Spinner';

moment.locale('fr');

export default ({ quizzId }) => {
  const { colors } = useTheme();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const result = await AsyncStorage.getItem(MONITORING_KEY);
      if (result) {
        const parsed = JSON.parse(result);
        const quizzData = parsed[quizzId];
        if (quizzData && quizzData.length > 0) {
          setData(quizzData);
        }
      }
      setLoading(false);
    };
    fetchData();
  }, [quizzId]);

  const keyExtractor = (item, index) => index;
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <FlatList
            renderItem={ListItem}
            data={data}
            ListEmptyComponent={ListEmpty}
            ItemSeparatorComponent={Divider}
            keyExtractor={keyExtractor}
          />
        </>
      )}
    </View>
  );
};

const ListItem = ({ index, item: { date, score, maxScore } }) => {
  return (
    <View key={index} style={styles.itemContainer}>
      <View>
        <Text>Le {moment(date).format(FRENCH_DATE_FORMAT)}</Text>
      </View>
      <View>
        <Text>Points: {score + '/' + maxScore}</Text>
      </View>
    </View>
  );
};

const ListEmpty = () => {
  return (
    <View style={styles.empty}>
      <Title> Aucune donnée disponible </Title>
    </View>
  );
};

const styles = StyleSheet.create({
  empty: {
    height: metrics.height - scale(120),
    width: metrics.width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: scale(24),
    paddingVertical: scale(20),
    justifyContent: 'space-between',
  },
});
