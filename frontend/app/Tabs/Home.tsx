import * as React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import CategoryTab from '../components/home/CategoryTab';
import HomeTab from '../components/home/HomeTab';
import Header from '../components/Header';
const initialLayout = { width: Dimensions.get('window').width };

export default function TabHome({navigation}) {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'home', title: 'Home' },
        { key: 'category', title: 'Category' },
    ]);

    const renderScene = SceneMap({
        home: HomeTab,
        category: CategoryTab,
    });

    const renderTabBar = (props) => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#3333FF', height: 1 }}
            style={{ backgroundColor: '#fff' }}
            renderLabel={({ route, focused }) => (
                <Text style={{ color: focused ? '#3333FF' : '#A0AEC0'}}>
                    {route.title}
                </Text>
            )}
        />
    );

    return (
        <View style={{ flex: 1 }}>
            <Header navigation={navigation} />
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                renderTabBar={renderTabBar} />
        </View>
    );
}
