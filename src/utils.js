import { AsyncStorage} from 'react-native'
import { NavigationActions } from 'react-navigation'

export async function getUser() {
  try {
    return await AsyncStorage.getItem('@ListApp:acessToken');
  } catch (e) {
    throw e;
  }
}

export async function storeUser(userToken) {
  try {
    return await AsyncStorage.setItem('@ListApp:acessToken', JSON.stringify(userToken));
  } catch (e) {
    throw e;
  }
}

export async function deleteUser() {
  try {
    return await AsyncStorage.removeItem('@ListApp:acessToken');
  } catch (e) {
    throw e;
  }
}
let navigator;

export function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

export function navigate(routeName, params) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}