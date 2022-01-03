import React from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView } from 'react-native';

import { colors } from '../../utils/colors';
import { fontSizes, spacing } from '../../utils/sizes';
import { RoundedButton } from '../../components/RoundedButton';

const HistoryItem = ({ item, index }) => {
  return (
    <View>
      <Text style={historyItemStyles(item.status)}>{item.subject}</Text>
    </View>
  );
};

const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };

  return (
    <>
      <SafeAreaView style={{ flex: 0.5, alignItems: 'center' }}>
        {!!focusHistory.length && (
          <>
            <Text style={styles.title}>Things we have focused on</Text>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <View style={styles.clearButton}>
              <RoundedButton
                size={50}
                title="Clear"
                onPress={() => onClear()}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const historyItemStyles = (status) => ({
  color: status > 1 ? colors.red : colors.green,
  fontSize: fontSizes.lg,
});

const styles = StyleSheet.create({
  title: {
    color: colors.white,
    fontSize: fontSizes.lg,
  },
  clearButton: {
    alignItems: 'center',
    padding: spacing.md,
  },
});

export { FocusHistory };
