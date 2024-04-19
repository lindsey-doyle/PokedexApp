import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'

export default function SkeletonDetailsPokemon() {
  return (
    <>
      <View style={styles.skeletonHeader}>
        <View style={styles.skeletonBackButton} />
        <View style={styles.skeletonContainerTitle}>
          <View style={styles.skeletonTitle} />
          <View style={styles.skeletonId} />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.skeletonContainerImage}>
          <View style={styles.skeletonImage} />
        </View>
        <View>
          <View style={styles.skeletonNavbar}>
            <View style={styles.skeletonNavbarText} />
            <View style={styles.skeletonNavbarText} />
            <View style={styles.skeletonNavbarText} />
          </View>
        </View>
        <View style={styles.skeletonDescription} />
        <View style={styles.skeletonVersion} />
        <View style={styles.skeletonRow}>
          <View style={styles.skeletonField} />
          <View style={styles.skeletonValue} />
        </View>
        <View style={styles.skeletonRow}>
          <View style={styles.skeletonField} />
          <View style={styles.skeletonValue} />
        </View>
        <View style={styles.skeletonRow}>
          <View style={styles.skeletonField} />
          <View style={styles.skeletonValue} />
        </View>
        <View style={styles.skeletonRow}>
          <View style={styles.skeletonField} />
          <View style={styles.skeletonValue} />
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  skeletonHeader: {
    marginTop: 20,
    flexDirection: 'row',
  },
  skeletonBackButton: {
    width: 28,
    height: 28,
    marginTop: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  skeletonContainerTitle: {
    width: '100%',
    flex: 1,
    marginRight: 28,
    alignItems: 'center',
  },
  skeletonTitle: {
    borderRadius: 5,
    width: 200,
    height: 35,
    backgroundColor: '#e0e0e0',
  },
  skeletonId: {
    marginTop: 4,
    width: 34,
    height: 22,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  skeletonContainerImage: {
    marginTop: 20,
    borderRadius: 15,
    width: '100%',
    height: 225,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skeletonImage: {
    width: 210,
    height: 210,
    backgroundColor: '#c7c7c7',
    borderRadius: 15,
  },
  skeletonNavbar: {
    marginTop: 30,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skeletonNavbarText: {
    width: 75,
    height: 28,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  skeletonDescription: {
    backgroundColor: '#e0e0e0',
    height: 35,
    marginBottom: 4,
    borderRadius: 5,
  },
  skeletonVersion: {
    alignSelf: 'flex-end',
    backgroundColor: '#e0e0e0',
    width: 150,
    height: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  skeletonRow: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  skeletonField: {
    marginRight: 45,
    width: 73,
    height: 23,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
  },
  skeletonValue: {
    backgroundColor: '#e0e0e0',
    width: 140,
    height: 23,
    borderRadius: 5,
  },
})
