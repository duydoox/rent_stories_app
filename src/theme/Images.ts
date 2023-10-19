import { ThemeVariables } from '../../@types/theme';

export default function ({}: ThemeVariables) {
  return {
    logo: require('./assets/images/logo.png'),
    sparkles: {
      topLeft: require('./assets/images/sparkles-top-left.png'),
      top: require('./assets/images/sparkles-top.png'),
      topRight: require('./assets/images/sparkles-top-right.png'),
      right: require('./assets/images/sparkles-right.png'),
      bottomRight: require('./assets/images/sparkles-bottom-right.png'),
      bottom: require('./assets/images/sparkles-bottom.png'),
      bottomLeft: require('./assets/images/sparkles-bottom-left.png'),
    },
    icons: {
      colors: require('./assets/images/colorswatch.png'),
      send: require('./assets/images/send.png'),
      translate: require('./assets/images/translate.png'),
      dark_mode: require('./assets/images/dark_mode.png'),
      translation: require('./assets/images/translation.png'),
      home: require('./assets/images/home.png'),
      rent: require('./assets/images/rent.png'),
      payment: require('./assets/images/payment.png'),
      statistic: require('./assets/images/statistic.png'),
      story: require('./assets/images/story.png'),
      edit: require('./assets/images/edit.png'),
      padlock: require('./assets/images/padlock.png'),
      logout: require('./assets/images/logout.png'),
    },
    avatar: {
      male_1: require('./assets/images/male_1.png'),
      male_2: require('./assets/images/male_2.png'),
      male_3: require('./assets/images/male_3.png'),
      male_4: require('./assets/images/male_4.png'),
      male_5: require('./assets/images/male_5.png'),
      female_1: require('./assets/images/female_1.png'),
      female_2: require('./assets/images/female_2.png'),
      female_3: require('./assets/images/female_3.png'),
      female_4: require('./assets/images/female_4.png'),
      female_5: require('./assets/images/female_5.png'),
    },
  };
}
