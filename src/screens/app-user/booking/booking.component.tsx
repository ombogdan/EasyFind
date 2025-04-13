import React from 'react';
import { SafeAreaView } from 'react-native';
import { useStyles } from './booking.styles';

const Booking = () => {
  const styles = useStyles();


  return (
    <SafeAreaView style={styles.container} />
  );
};

export default Booking;
