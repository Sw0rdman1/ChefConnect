import { Animated, StyleSheet } from "react-native";
import { useRef } from "react";
import { ScrollView, View } from "./Themed";


interface ScrollViewScreenProps {
    children: React.ReactNode;
    headerComponent: React.ReactNode;
    minHeight: number;
    maxHeight: number;
}

const AnimatedHeader: React.FC<ScrollViewScreenProps> = ({ children, headerComponent, minHeight, maxHeight }) => {
    const scrollOffsetY = useRef(new Animated.Value(0)).current;
    const Scroll_Distance = maxHeight - minHeight;

    const animatedHeight = scrollOffsetY.interpolate({
        inputRange: [0, Scroll_Distance],
        outputRange: [0, Scroll_Distance],
        extrapolate: "clamp",
    });

    const animatedHeaderHeight = scrollOffsetY.interpolate({
        inputRange: [0, Scroll_Distance],
        outputRange: [maxHeight, minHeight],
        extrapolate: "clamp",
    });


    return (
        <View style={styles.homeContainer}>
            <Animated.View style={{ height: animatedHeaderHeight }}>
                {headerComponent}
            </Animated.View>
            <ScrollView
                bounces={false}
                scrollEventThrottle={1}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
                    {
                        useNativeDriver: false,
                    }
                )}
            >
                <Animated.View style={{ height: animatedHeight }} />
                {children}
            </ScrollView>
        </View>
    );
};

export default AnimatedHeader;

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
    },

});
