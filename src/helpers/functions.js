import moment from 'moment';
import { Dimensions } from 'react-native';
import { FRENCH_DATE_FORMAT } from './constants';
moment.locale('fr');

const baselineHeight = 709.33;
const baselineWidth = 360;

const window = Dimensions.get('window');
const screenHeight = window.height;
const screenWidth = window.width;

const scaleSize =
  (screenHeight + screenWidth) / 2 / ((baselineHeight + baselineWidth) / 2);

export const scale = value => Math.floor(scaleSize * value);
export const exactScale = value => scaleSize * value;

export const hexToRgb = hex => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `rgba(${parseInt(result[1], 16)} ,${parseInt(result[2], 16)} ,${parseInt(
        result[3],
        16,
      )},1)`
    : null;
};

export const getItemHtml = ({ date, answers }) => {
  let html = "<h1 style='text-align:center'>Rapport Medecin</h1> ";
  html += `<h4 style='text-align:right'>Date de remplissage: ${moment(
    date,
  ).format(FRENCH_DATE_FORMAT)}</h4> <hr> </br>`;
  answers.forEach(
    ({ answer: { label }, question: { title, questionExplained } }, index) => {
      html += `<h4>Question ${index +
        1}: ${title}</h4> <p><b>Explication:</b> ${questionExplained}</p>`;
      html += `<p><b>Réponse:</b> ${label}</p> </br>`;
    },
  );

  return html;
};
