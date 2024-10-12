import { Platform, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Header } from 'shared/components/header';
import { Title } from 'shared/ui-kit/title';
import { Box } from 'shared/ui-kit/box';
import { BUTTON_VARIANTS, SIZE } from 'shared/constants';
import { Shadow } from 'shared/ui-kit/shadow';
import CustomInput from 'shared/ui-kit/custom-input/custom-input.component';
import { CustomButton } from 'shared/ui-kit/custom-button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useStyles } from './report.styles';
import { OptionItem } from './components/option-item';
import { OPTION_LIST } from './report.types';
import useReport from './report.hook';

const Report = () => {
  const insets = useSafeAreaInsets();
  const styles = useStyles({ insets });
  const { option, message, setMessage, isLoading, onPressOption, onPressSave } =
    useReport();

  return (
    <View style={styles.container}>
      <Header name="Report" backButton />
      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
        extraScrollHeight={Platform.OS === 'ios' ? 50 : 50}
      >
        {/* OPTIONS */}
        <Title text="Issue" />
        <Box mt={SIZE.md}>
          <Shadow radius={SIZE.md} />
          <View style={styles.optionContainer}>
            {OPTION_LIST.map((i) => (
              <TouchableOpacity
                onPress={onPressOption(i.key)}
                activeOpacity={0.5}
                key={i.key}
              >
                <OptionItem label={i.label} is_selected={option === i.key} />
              </TouchableOpacity>
            ))}
          </View>
        </Box>
        <Box mt={SIZE.xl}>
          <Title text="Message" />
          <Box mt={SIZE.md}>
            <CustomInput
              value={message}
              onChangeValue={setMessage}
              multiline
              styleInput={styles.message}
              maxLength={1024}
              placeholder="Message"
            />
          </Box>
        </Box>
        {/* INPUT */}
        <View style={styles.buttonContainer}>
          <CustomButton
            isLoading={isLoading}
            variant={BUTTON_VARIANTS.primary}
            onPress={onPressSave}
            title="Issue Required"
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Report;
