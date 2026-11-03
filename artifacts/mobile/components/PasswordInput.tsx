import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  type TextInputProps,
  View,
} from 'react-native';

import { useColors } from '@/hooks/useColors';
import { useTranslation } from '@/i18n';

export function PasswordInput({ style, secureTextEntry: _secureTextEntry, testID, ...props }: TextInputProps) {
  const [visible, setVisible] = useState(false);
  const colors = useColors();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        testID={testID}
        secureTextEntry={!visible}
        style={[style, styles.input]}
      />
      <Pressable
        testID={testID ? `${testID}-visibility-toggle` : undefined}
        accessibilityRole="button"
        accessibilityLabel={visible ? t.auth_hide_password : t.auth_show_password}
        accessibilityState={{ selected: visible, disabled: props.editable === false }}
        disabled={props.editable === false}
        hitSlop={8}
        onPress={() => setVisible((current) => !current)}
        style={styles.toggle}
      >
        <Ionicons
          name={visible ? 'eye-off-outline' : 'eye-outline'}
          size={21}
          color={colors.mutedForeground}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    paddingRight: 52,
  },
  toggle: {
    position: 'absolute',
    right: 4,
    top: 0,
    bottom: 0,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
