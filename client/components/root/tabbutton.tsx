import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { routeToScreen } from 'expo-router/build/useScreens';
import { TabTriggerSlotProps } from 'expo-router/ui';
import { ComponentProps, Ref, forwardRef, useEffect } from 'react';
import { Text, Pressable, View } from 'react-native';
import Animated, { Easing, interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

type Icon = ComponentProps<typeof FontAwesome>['name'];

export type TabButtonProps = TabTriggerSlotProps & {
    icon?: Icon;
};

export const TabButton = forwardRef(
    ({ icon, children, isFocused, ...props }: any, ref: Ref<View>) => {
        const scale = useSharedValue(0);

        useEffect(()=>{
            scale.value = withSpring(
                typeof isFocused === 'boolean'? (isFocused? 1: 0): isFocused,
                {duration: 350}
            );
        },[scale, isFocused]);
    
        const animatedIconStyle = useAnimatedStyle(()=>{
    
            const scaleValue = interpolate(
                scale.value,
                [0, 1],
                [1, 1.2]
            );

            return {
                // styles
                transform: [{scale: scaleValue}]
            }
        })
        return (

            <Pressable
                ref={ref}
                {...props}
                onPress={() => {
                    router.navigate(props.href)
                }}
                style={[{
                },
                isFocused ? {} : undefined,
                ]}>

                <Animated.View style={[animatedIconStyle, props.isMiddle ? { width: 90, height: 90, backgroundColor: "rgb(2, 228, 28)", borderRadius: 100, justifyContent: "center", alignItems: "center" } : {}]}>
                    <FontAwesome5 name={props.iconName} size={props.isMiddle ? 36 : 26} color={isFocused?"green":"rgb(255,255,255)"} />
                </Animated.View>
            </Pressable>
        );
    }
);
