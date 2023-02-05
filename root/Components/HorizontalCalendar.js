import React, { useState, useContext, useMemo } from "react";
import Context from "../Context/Context";
import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";
import MyText from "./Text";
import { color } from "react-native-reanimated";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.12;
const ITEM_HEIGHT = 70;
const ITEM_OFFSET = ITEM_WIDTH + 18;

function dateSubtractDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function getDayString(date) {
  return date.toString().split(" ")[0];
}

function isSameDay(date1, date2) {
  return date1.getDate() === date2.getDate();
}

function isToday(date) {
  return new Date().getDate() == date.getDate();
}

function generateHorizontalCalendarDates(days) {
  const today = new Date();
  let result = [];
  for (let i = days; i >= 0; i--) {
    result[i] = dateSubtractDays(today, i);
  }

  return result;
}

export default function HorizontalCalendar({ selectedDate, setSelectedDate }) {
  const {
    theme: { colors },
  } = useContext(Context);
  const dates = useMemo(() => {
    return generateHorizontalCalendarDates(15);
  }, []);

  const onDatePress = (date) => {
    setSelectedDate(date);
  };

  const renderItem = ({ item, index }) => {
    const dayNumber = item.getDate();
    const dayString = getDayString(item);
    const isActive = isSameDay(selectedDate, item);
    return (
      <Pressable
        onPress={() => onDatePress(item)}
        style={[styles.item, isActive && { backgroundColor: colors.secondary }]}
      >
        <MyText style={[styles.dayStyle, isActive && styles.activeText]}>
          {isToday(item) ? "today" : dayString}
        </MyText>
        <MyText style={[styles.dateOutput, isActive && styles.activeText]}>
          {dayNumber}
        </MyText>
      </Pressable>
    );
  };

  return (
    <FlatList
      data={dates}
      renderItem={renderItem}
      keyExtractor={(item) => item.toDateString()}
      horizontal={true}
      contentContainerStyle={[
        { paddingBottom: 16, paddingLeft: 4, paddingRight: 16 },
      ]}
      showsHorizontalScrollIndicator={false}
      initialScrollIndex={dates.length - 8}
      getItemLayout={(_, index) => ({
        length: ITEM_WIDTH,
        offset: ITEM_OFFSET * index,
        index,
      })}
    />
  );
}

const styles = StyleSheet.create({
  dateOutput: {
    color: "#22222280",
    fontSize: 12,
    lineHeight: 15,
  },
  dayStyle: {
    color: "#22222280",
    fontSize: 12,
    lineHeight: 15,
  },
  activeText: {
    color: "#fff",
  },
  item: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
});
