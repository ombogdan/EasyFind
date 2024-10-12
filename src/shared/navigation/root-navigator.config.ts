import React from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

export const navigationRef = React.createRef<NavigationContainerRef<any>>();

export const navigate = (name: string, params?: any) =>
  navigationRef.current && navigationRef.current.navigate(name, params);

export const reset = (name: string, params?: any) =>
  navigationRef.current?.reset({ index: 0, routes: [{ name, params }] });

export const goBack = () =>
  navigationRef.current && navigationRef.current.goBack();

export const canGoBack = () =>
  navigationRef.current && navigationRef.current.canGoBack();
