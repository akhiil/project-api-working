import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SearchScreen from './src/screens/SearchScreen';
import ResultsShowScreen from './src/screens/ResultsShowScreen';



const navigator = createStackNavigator({
  Search: SearchScreen,
  ResultsShow: ResultsShowScreen
}, {
  initialRoutName: 'Search',
  defaultNavigationOptions: {
    title: 'Zhiffy'
  }
});

export default createAppContainer(navigator);






























//Client ID
// 9Q3pEinIom08WvaMmuT9IA

// API Key
// 