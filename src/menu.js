import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

function Menu({}) {
  return (
    <View style={styles.menu}>
      <View style={styles.menuItem}>
        <TouchableOpacity>
          <Text style={[styles.menuText]}>퇴치 현황</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuItem}>
        <TouchableOpacity>
          <Text style={[styles.menuText]}>기기 관리</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuItem}>
        <TouchableOpacity>
          <Text style={[styles.menuText]}>설정</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    // flex: 1,
    position: 'relative',
    bottom: 0,
    width: '100%',
    height: 70,
    // backgroundColor: '#E1EFD8',
    backgroundColor: 'green',
    flexDirection: 'row',
  },
  menuItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 18,
    color: 'white',
  },
});

export default Menu;
