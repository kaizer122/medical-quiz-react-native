import React, { useEffect, useState } from 'react';
import { AsyncStorage, StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Title, useTheme } from 'react-native-paper';
import Spinner from '../components/Spinner';
import { metrics, scale } from '../helpers';
import { MONITORING_KEY } from '../helpers/constants';
export default () => {
  const { colors } = useTheme();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const result = await AsyncStorage.getItem(MONITORING_KEY);
      if (result) {
        const parsed = JSON.parse(result);
        const legends = Object.keys(parsed);
        const cols = [colors.textAccent, colors.textAccent2, colors.primary];
        const datasets = legends.map((q, i) => {
          return { data: parsed[q], color: () => cols[i] };
        });
        setData({ datasets, legends });
      }
      setLoading(false);
    };
    fetchData();
  }, [colors]);
  const width = metrics.width;
  const height = metrics.height - scale(100);
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {data && data.datasets && data.datasets.length > 0 ? (
            <LineChart
              data={data}
              fromZero={true}
              width={width}
              height={height}
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: 'transparent',
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffa726',
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          ) : (
            <Title>No data </Title>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
  },
});
