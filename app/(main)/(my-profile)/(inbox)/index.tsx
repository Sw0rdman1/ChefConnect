import InboxHeader from "@/components/main/chat/InboxHeader";
import AnimatedHeader from "@/components/ui/AnimatedHeader";
import { Text, View } from "@/components/ui/Themed";
import { useApp } from "@/context/AppContext";
import { useChats } from "@/hooks/useChats";
import { useRef } from "react";
import { Animated, StyleSheet } from "react-native";

const InboxScreen = () => {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const { user } = useApp();
  const { chats } = useChats(user?.id as string);

  return (
    <AnimatedHeader
      scrollOffsetY={scrollOffsetY}
      headerComponent={<InboxHeader scrollOffsetY={scrollOffsetY} />}
      maxHeight={200}
      minHeight={150}
    >
      <View style={{ height: 1500 }} />
    </AnimatedHeader>
  );
};

export default InboxScreen;

const styles = StyleSheet.create({});
