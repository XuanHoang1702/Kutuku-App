import * as React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import Header from '../components/Header';
import HistoryTab from '../components/order/HistoryTab';
import MyOrderTab from '../components/order/MyOrderTab';
const initialLayout = { width: Dimensions.get('window').width };

const MyOrder = ({navigation}) => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'MyOrder', title: 'My Order' },
        { key: 'History', title: 'History' },
    ]);

    const renderScene = SceneMap({
        MyOrder: MyOrderTab,
        History: HistoryTab,
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

export default MyOrder
