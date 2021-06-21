import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';
import AnimatedAccordion from '../../../../src';
import { useCallback } from 'react';
import { assets } from '../../assets';
import { Sport, Event } from '../../components';
import { Array, Sports } from './index.d.';

const sports: Sports[] = [
  { image: assets.pingpong, title: 'Ping-pong' },
  { image: assets.badminton, title: 'Badminton' },
  { image: assets.baseball, title: 'Baseball' },
  { image: assets.football, title: 'Football' },
  { image: assets.tennis, title: 'Tennis' },
  { image: assets.basketball, title: 'Basketball' },
];

const array: Array[] = [
  {
    image: assets.flag_1,
    title: 'La League',
    county: 'Spain',
    events: [
      {
        command: {
          one: 'Barcelona',
          two: 'Liverpoll',
        },
        icon: {
          one: assets.real_betis,
          two: assets.tottenham,
        },
        score: {
          one: 3,
          two: 4,
        },
        type: 'KL',
      },
    ],
  },

  {
    image: assets.flag_2,
    title: 'Basketball League',
    county: 'Belarus',
    events: [
      {
        command: {
          one: 'BATE',
          two: 'Liverpoll',
        },
        icon: {
          one: assets.real_betis,
          two: assets.tottenham,
        },
        score: {
          one: 3,
          two: 4,
        },
        type: 'HT',
      },
    ],
  },
  {
    image: assets.flag_1,
    title: 'Football League',
    county: 'Belarus',
    events: [
      {
        command: {
          one: 'Real Madrid',
          two: 'Moscow',
        },
        icon: {
          one: assets.real_betis,
          two: assets.tottenham,
        },
        score: {
          one: 3,
          two: 4,
        },
        type: 'HR',
      },
    ],
  },
];
const HomeScreen = () => {
  const handleContentTouchable = useCallback(
    (title, image, county) => (
      <View style={styles.row}>
        <Image source={image} resizeMode={'contain'} style={styles.flag_1} />
        <View>
          <Text style={styles.league}>{title}</Text>
          <Text style={styles.message}>{county}</Text>
        </View>
      </View>
    ),
    []
  );

  const handleContent = useCallback(
    (data) =>
      data.map(({ command, icon, score, type }) => (
        <Event
          key={command.one}
          type={type}
          image={icon}
          scoreOne={score.one}
          scoreTwo={score.two}
          commandOne={command.one}
          commandTwo={command.two}
          iconOne={icon.one}
          iconTwo={icon.two}
        />
      )),
    []
  );

  const hasHeader = (
    <View style={styles.header}>
      <Text style={styles.liveScore}>LiveScore</Text>
      <View style={styles.item}>
        <Image
          source={assets.search}
          resizeMode={'contain'}
          style={styles.search}
        />
        <Image
          source={assets.notification}
          resizeMode={'contain'}
          style={styles.notification}
        />
      </View>
    </View>
  );

  const hasBanner = (
    <Image
      source={assets.banner}
      resizeMode={'contain'}
      style={styles.banner}
    />
  );

  const hasSports = (
    <View style={styles.sportsContent}>
      <ScrollView
        horizontal
        contentContainerStyle={styles.sports}
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        snapToInterval={200}
        snapToAlignment={'center'}
      >
        {sports.map(({ image, title }) => (
          <Sport key={title} {...{ title, image }} />
        ))}
      </ScrollView>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {hasHeader}
        {hasBanner}
        {hasSports}
        {array.map(({ image, events, county, title }) => (
          <AnimatedAccordion
            key={title}
            onAnimatedEndExpanded={() => console.log('expanded')}
            onAnimatedEndCollapsed={() => console.log('collapsed')}
            handleContentTouchable={() =>
              handleContentTouchable(title, image, county)
            }
            renderContent={() => handleContent(events)}
            styleTouchable={styles.touchable}
            styleContainer={styles.content}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
export { HomeScreen };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181829',
  },

  league: {
    fontSize: 22,
    color: '#FFFFFF',
  },
  content: {
    paddingHorizontal: 18,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sports: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingStart: 18,
  },
  header: {
    paddingHorizontal: 18,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 24,
  },
  liveScore: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  touchable: {
    backgroundColor: '#181829',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  flag_1: {
    height: 28,
    width: 28,
    marginRight: 18,
  },
  notification: {
    height: 28,
    width: 28,
  },
  search: {
    height: 22,
    width: 22,
    marginRight: 18,
  },
  title: {
    marginStart: 12,
    fontSize: 20,
    color: '#0b0e25',
  },
  message: {
    fontSize: 14,
    color: '#AAAAAA',
  },
  banner: {
    alignSelf: 'center',
    height: 220,
    width: '90%',
  },
  sportsContent: {
    height: 200,
  },
});
