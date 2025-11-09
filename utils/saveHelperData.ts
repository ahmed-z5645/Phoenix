import { Platform } from 'react-native';
import RNFS from 'react-native-fs';

export interface HelperInfo {
  location: string;
  phoneNumber: number;
  name: string;
  occupation: number; // 0 for community member, 1 for paramedic
}

/**
 * Saves helper data to a JSON file
 * @param helperData - The helper information to save
 * @returns Promise<string> - The file path where data was saved
 */
export const saveHelperDataToFile = async (helperData: HelperInfo): Promise<string> => {
  try {
    const jsonString = JSON.stringify(helperData, null, 2);
    const fileName = `helper_data_${Date.now()}.json`;
    
    // For Android
    if (Platform.OS === 'android') {
      const path = `${RNFS.DocumentDirectoryPath}/${fileName}`;
      await RNFS.writeFile(path, jsonString, 'utf8');
      console.log('Helper data saved to:', path);
      return path;
    }
    
    // For iOS
    if (Platform.OS === 'ios') {
      const path = `${RNFS.DocumentDirectoryPath}/${fileName}`;
      await RNFS.writeFile(path, jsonString, 'utf8');
      console.log('Helper data saved to:', path);
      return path;
    }
    
    throw new Error('Unsupported platform');
  } catch (error) {
    console.error('Error saving helper data to file:', error);
    throw error;
  }
};

/**
 * Saves all helper data to a single JSON file
 * @param helperDataList - Array of helper information
 * @returns Promise<string> - The file path where data was saved
 */
export const saveAllHelperDataToFile = async (helperDataList: HelperInfo[]): Promise<string> => {
  try {
    const jsonString = JSON.stringify(helperDataList, null, 2);
    const fileName = `all_helpers_${Date.now()}.json`;
    
    const path = `${RNFS.DocumentDirectoryPath}/${fileName}`;
    await RNFS.writeFile(path, jsonString, 'utf8');
    console.log('All helper data saved to:', path);
    return path;
  } catch (error) {
    console.error('Error saving all helper data to file:', error);
    throw error;
  }
};

