
import AppNavigator from "../navigation/navigationStack";

const INITIAL_STATE = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('login'));

export default (state = INITIAL_STATE, action) => {
    const nextState = AppNavigator.router.getStateForAction(action, state)

    return nextState || state
};