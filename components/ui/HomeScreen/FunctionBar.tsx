import { View, Text, Pressable, StyleSheet } from 'react-native';
import React, { useCallback, useMemo, useRef, useEffect } from 'react';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { SortBar, SortOption } from './SortBar';

export const FunctionBar = () => {
    const sortBottomSheetRef = useRef<BottomSheetModal>(null);
    const filterBottomSheetRef = useRef<BottomSheetModal>(null);
    
    // variables
    const snapPoints = useMemo(() => ['50%'], []); // Simplify to one snap point for testing

    useEffect(() => {
        return () => {
            sortBottomSheetRef.current?.close();
            filterBottomSheetRef.current?.close();
        };
    }, []);

    // callbacks
    const handleSortPress = useCallback(() => {
        console.log('Sort button pressed');
        if (sortBottomSheetRef.current) {
            sortBottomSheetRef.current.present();
        } else {
            console.log('sortBottomSheetRef is null');
        }
    }, []);

    const handleFilterPress = useCallback(() => {
        console.log('Filter button pressed');
        if (filterBottomSheetRef.current) {
            filterBottomSheetRef.current.present();
        } else {
            console.log('filterBottomSheetRef is null');
        }
    }, []);

    const handleSortChange = (option: SortOption) => {
        console.log('Selected sort option:', option);
        sortBottomSheetRef.current?.dismiss();
    };

    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                {...props}
                appearsOnIndex={0}
                disappearsOnIndex={-1}
            />
        ),
        []
    );

    return (
        <View style={styles.container}>
            <Pressable 
                style={styles.functionContainer} 
                onPress={handleSortPress}
            >
                <Text style={styles.buttonText}>Sort</Text>
            </Pressable>
            <Pressable 
                style={styles.functionContainer} 
                onPress={handleFilterPress}
            >
                <Text style={styles.buttonText}>Filter</Text>
            </Pressable>

            <BottomSheetModal
                ref={sortBottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                enablePanDownToClose
                enableDismissOnClose
                backdropComponent={renderBackdrop}
                backgroundStyle={styles.bottomSheetBackground}
                handleIndicatorStyle={styles.bottomSheetIndicator}
                onChange={(index) => console.log('Sort sheet index changed:', index)}
                onDismiss={() => console.log('Sort sheet dismissed')}
            >
                <View style={styles.bottomSheetContent}>
                    <SortBar currentSort="default" onSortChange={handleSortChange} />
                </View>
            </BottomSheetModal>

            <BottomSheetModal
                ref={filterBottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                enablePanDownToClose
                enableDismissOnClose
                backdropComponent={renderBackdrop}
                backgroundStyle={styles.bottomSheetBackground}
                handleIndicatorStyle={styles.bottomSheetIndicator}
                onChange={(index) => console.log('Filter sheet index changed:', index)}
                onDismiss={() => console.log('Filter sheet dismissed')}
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
