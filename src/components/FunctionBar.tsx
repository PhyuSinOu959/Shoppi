import { View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useCallback, useMemo, useRef, useEffect } from 'react';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { SortBar, SortOption } from './SortBar';

export const FunctionBar = () => {
    const sortBottomSheetRef = useRef<BottomSheetModal>(null);
    const filterBottomSheetRef = useRef<BottomSheetModal>(null);
    
    // variables
    const snapPoints = useMemo(() => ['25%', '50%'], []); // Add multiple snap points

    useEffect(() => {
        return () => {
            sortBottomSheetRef.current?.close();
            filterBottomSheetRef.current?.close();
        };
    }, []);

    // callbacks
    const handleSortPress = useCallback(() => {
        sortBottomSheetRef.current?.present();
    }, []);

    const handleFilterPress = useCallback(() => {
        filterBottomSheetRef.current?.present();
    }, []);

    const handleSortChange = (option: SortOption) => {
        console.log('Selected sort option:', option);
        sortBottomSheetRef.current?.dismiss();
    };

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                {...props}
                appearsOnIndex={0}
                disappearsOnIndex={-1}
                pressBehavior="close"
            />
        ),
        []
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.functionContainer} 
                onPress={handleSortPress}
            >
                <Text style={styles.buttonText}>Sort</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.functionContainer} 
                onPress={handleFilterPress}
            >
                <Text style={styles.buttonText}>Filter</Text>
            </TouchableOpacity>

            <BottomSheetModal
                ref={sortBottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                enablePanDownToClose
                backdropComponent={renderBackdrop}
                backgroundStyle={styles.bottomSheetBackground}
                handleIndicatorStyle={styles.bottomSheetIndicator}
            >
                <View style={styles.bottomSheetContent}>
                    <SortBar currentSort="default" onSortChange={handleSortChange} />
                </View>
            </BottomSheetModal>

            <BottomSheetModal
                ref={filterBottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                enablePanDownToClose
                backdropComponent={renderBackdrop}
                backgroundStyle={styles.bottomSheetBackground}
                handleIndicatorStyle={styles.bottomSheetIndicator}
            >
                <View style={styles.bottomSheetContent}>
                    <Text>Filter options will go here</Text>
                </View>
            </BottomSheetModal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        zIndex: 1,
    },
    functionContainer: {
        flex: 1,
        padding: 8,
        borderRadius: 8,
        margin: 10,
        alignItems: 'center',
        backgroundColor: '#007AFF'
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: '600'
    },
    bottomSheetContent: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    bottomSheetBackground: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
    },
    bottomSheetIndicator: {
        backgroundColor: '#A3A3A3',
        width: 40,
    },
});
