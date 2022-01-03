import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { colors } from './src/utils/colors';
import { statuses } from './src/utils/status';
import { fontSizes, spacing } from './src/utils/sizes';
import { Focus } from './src/features/focus/Focus';
import { FocusHistory } from './src/features/focus/FocusHistory';
import { Timer } from './src/features/timer/Timer';

export default function App() {
  const [focusSubject, setfocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addHistoryWithState = (subject, status) => {
    setFocusHistory([
      ...focusHistory,
      { key: String(focusHistory.length + 1), subject, status },
    ]);
  };
  // console.log(focusHistory);

  const onClear = () => {
    setFocusHistory([]);
  };

  const saveFocusHistory = async () => {
    try {
      AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');
      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadFocusHistory();
  }, []);

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addHistoryWithState(focusSubject, statuses.COMPLETED);
            setfocusSubject(null);
          }}
          clearSubject={() => {
            addHistoryWithState(focusSubject, statuses.CANCELLED);
            setfocusSubject(null);
          }}
        />
      ) : (
        <>
          <Focus addSubject={setfocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.xxl,
    backgroundColor: colors.darkBlue,
  },
});
