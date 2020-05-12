import React, { useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { View as AnimatableView } from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { Button, Caption, Surface, Text, Title, useTheme } from 'react-native-paper';
import { useNavigation } from 'react-navigation-hooks';
import RNFetchBlob from 'rn-fetch-blob';
import { metrics, scale } from '../../helpers';
import { getItemHtml } from '../../helpers/functions';

export default ({ score, maxScore, noScore, item }) => {
  const { colors } = useTheme();
  const [animation] = useState('fadeInUp');
  const { goBack } = useNavigation();

  const createPath = async () => {
    let options = {
      html: getItemHtml(item),
      fileName: 'formulaire' + Math.floor(Math.random() * Math.floor(1000)),
      base64: true,
    };

    try {
      const results = await RNHTMLtoPDF.convert(options);

      Platform.OS === 'ios'
        ? RNFetchBlob.ios.openDocument(results.filePath)
        : RNFetchBlob.android.actionViewIntent(
            results.filePath,
            'application/pdf',
          );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.flex}>
      <AnimatableView animation={animation} delay={150}>
        <Surface style={styles.container}>
          <View style={styles.textContainer}>
            {noScore ? (
              <>
                <Title style={[styles.title, { color: colors.textAccent }]}>
                  Vous avez términé le questionnaire
                </Title>
                <Text style={styles.downloadSubtitle}>
                  Vous pouvez dès a présent télécharger votre rapport.
                </Text>
                <View style={styles.donwloadBtnContainer}>
                  <TouchableOpacity
                    style={styles.donwloadBtnSub}
                    onPress={createPath}>
                    <Button
                      mode="contained"
                      contentStyle={{ backgroundColor: colors.textAccent2 }}
                      labelStyle={{
                        color: colors.textOnSurfaceTitle,
                        fontSize: scale(20),
                      }}>
                      Télécharger
                    </Button>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <Title style={styles.title}>Votre score est de</Title>
                <Title style={[styles.title, { color: colors.primary }]}>
                  {score}
                  <Caption style={{ lineHeight: scale(36) }}>
                    {'/' + maxScore}
                  </Caption>
                  <Title style={styles.title}>{' ' + 'Points'}</Title>
                </Title>
              </>
            )}
          </View>
        </Surface>
      </AnimatableView>
      <AnimatableView animation={animation} delay={150}>
        <View
          style={[styles.buttonContainer, { backgroundColor: colors.primary }]}>
          <TouchableOpacity onPress={goBack}>
            <Text style={styles.buttonText}> Fermer </Text>
          </TouchableOpacity>
        </View>
      </AnimatableView>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: metrics.width,
    height: metrics.height,
    elevation: 4,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(24),
  },
  title: {
    textAlign: 'center',
    fontSize: scale(32),
    lineHeight: scale(36),
    marginBottom: 16,
  },
  text: {
    fontSize: scale(16),
    lineHeight: scale(18),
    overflow: 'hidden',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    elevation: 6,
    width: metrics.width,
    height: scale(56),
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: scale(24),
    color: '#FFF',
    textAlign: 'center',
  },
  donwloadBtnContainer: {
    justifyContent: 'center',
  },
  donwloadBtnSub: { marginTop: scale(20) },
  downloadSubtitle: {
    marginTop: scale(10),
    fontSize: scale(18),
    textAlign: 'center',
  },
});
