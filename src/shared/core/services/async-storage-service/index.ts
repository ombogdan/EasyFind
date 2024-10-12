import AsyncStorage from '@react-native-async-storage/async-storage';

const enum StorageValues {
  accessToken = 'accessToken',
  refreshToken = 'refreshToken',
}

class AsyncStorageService {
  async setAccessToken(token: string) {
    await AsyncStorage.setItem(StorageValues.accessToken, `${token}`);
  }

  async getAccessToken() {
    const accessToken = await AsyncStorage.getItem(StorageValues.accessToken);
    return accessToken;
  }

  async setRefreshToken(token: string) {
    await AsyncStorage.setItem(StorageValues.refreshToken, `${token}`);
  }

  async getRefreshToken() {
    const refreshToken = await AsyncStorage.getItem(StorageValues.refreshToken);
    return refreshToken;
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(StorageValues.accessToken);
  }

  async removeRefreshToken() {
    await AsyncStorage.removeItem(StorageValues.refreshToken);
  }
}

export const asyncStorageService = new AsyncStorageService();
