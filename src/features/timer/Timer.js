import React, { useState } from 'react';
import { Text, View, StyleSheet, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import { colors } from '../../utils/colors';
import { spacing } from '../../utils/sizes';
import { Timing } from './Timing';
import { CountDown } from '../../components/CountDown';
import { RoundedButton } from '../../components/RoundedButton';

const DEFAULT_TIME = 10;
const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();

  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(DEFAULT_TIME);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 3000);
    } else {
      Vibration.vibrate(3000);
    }
  };

  const onEnd = () => {
    vibrate();
    setProgress(1);
    setMinutes(DEFAULT_TIME);
    setIsStarted(false);
    onTimerEnd();
  };

  return (
    <View style={styles.container}>
      <View style={styles.countDown}>
        <CountDown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={{ padding: spacing.sm }}>
        <ProgressBar
          style={{ height: 10 }}
          color={colors.progressBarColor}
          progress={progress}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        {!isStarted ? (
          <RoundedButton
            title="start"
            size={90}
            onPress={() => setIsStarted(true)}
          />
        ) : (
          <RoundedButton
            title="stop"
            size={90}
            onPress={() => setIsStarted(false)}
          />
        )}
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton title="-" size={50} onPress={() => clearSubject()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  countDown: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  clearSubject: {
    paddingBottom: spacing.lg,
    paddingTop: spacing.sm,
  },
});

export { Timer };
