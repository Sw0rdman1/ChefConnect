import React, { useMemo } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { BottomSheetHandleProps } from "@gorhom/bottom-sheet";
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedStyle,
    useDerivedValue,
} from "react-native-reanimated";
import { toRad } from "react-native-redash";
import { useColors } from "@/hooks/useColors";

// @ts-ignore
export const transformOrigin = ({ x, y }, ...transformations) => {
    "worklet";
    return [
        { translateX: x },
        { translateY: y },
        ...transformations,
        { translateX: x * -1 },
        { translateY: y * -1 },
    ];
};

interface HandleProps extends BottomSheetHandleProps {
    style?: StyleProp<ViewStyle>;
}

const Handle: React.FC<HandleProps> = ({ style, animatedIndex }) => {
    const { background, tint } = useColors()

    const indicatorTransformOriginY = useDerivedValue(() =>
        interpolate(animatedIndex.value, [0, 1, 2], [-1, 0, 1], Extrapolation.CLAMP)
    );

    const containerStyle = useMemo(() => [styles.header, style, { borderBottomColor: background }], [style]);
    const containerAnimatedStyle = useAnimatedStyle(() => {
        const borderTopRadius = interpolate(
            animatedIndex.value,
            [1, 2],
            [20, 0],
            Extrapolation.CLAMP
        );
        return {
            borderTopLeftRadius: borderTopRadius,
            borderTopRightRadius: borderTopRadius,
        };
    });
    const leftIndicatorStyle = useMemo(
        () => ({
            backgroundColor: tint,
            ...styles.indicator,
            ...styles.leftIndicator,

        }),
        []
    );
    const leftIndicatorAnimatedStyle = useAnimatedStyle(() => {
        const leftIndicatorRotate = interpolate(
            animatedIndex.value,
            [0, 1, 2],
            [toRad(-30), 0, toRad(30)],
            Extrapolation.CLAMP
        );
        return {
            transform: transformOrigin(
                { x: 0, y: indicatorTransformOriginY.value },
                {
                    rotate: `${leftIndicatorRotate}rad`,
                },
                {
                    translateX: -7,
                }
            ),
        };
    });
    const rightIndicatorStyle = useMemo(
        () => ({
            backgroundColor: tint,
            ...styles.indicator,
            ...styles.rightIndicator,
        }),
        []
    );
    const rightIndicatorAnimatedStyle = useAnimatedStyle(() => {
        const rightIndicatorRotate = interpolate(
            animatedIndex.value,
            [0, 1, 2],
            [toRad(30), 0, toRad(-30)],
            Extrapolation.CLAMP
        );
        return {
            transform: transformOrigin(
                { x: 0, y: indicatorTransformOriginY.value },
                {
                    rotate: `${rightIndicatorRotate}rad`,
                },
                {
                    translateX: 7,
                }
            ),
        };
    });
    //#endregion

    // render
    return (
        <Animated.View
            style={[containerStyle, containerAnimatedStyle, { backgroundColor: background }]}
            renderToHardwareTextureAndroid={true}
        >
            <Animated.View style={[leftIndicatorStyle, leftIndicatorAnimatedStyle]} />
            <Animated.View
                style={[rightIndicatorStyle, rightIndicatorAnimatedStyle]}
            />
        </Animated.View>
    );
};

export default Handle;

const styles = StyleSheet.create({
    header: {
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        height: 40,
        borderBottomWidth: 1,
    },
    indicator: {
        position: "absolute",
        width: 15,
        height: 4,
    },
    leftIndicator: {
        borderTopStartRadius: 2,
        borderBottomStartRadius: 2,
    },
    rightIndicator: {
        borderTopEndRadius: 2,
        borderBottomEndRadius: 2,
    },
});