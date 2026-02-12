import {Document, Page, View, Text, StyleSheet} from '@react-pdf/renderer'
import {SmallWayfindingSignData} from '../../App'
import {mmToPt, getSmallWayfindingBackgroundColor, getArrowRotation, ArrowCircle, LocationCoordinates} from '../shared/pdfUtils'

interface SmallWayfindingSignProps {
    signData: SmallWayfindingSignData
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#FFFFFF',
        padding: 0,
    },
    container: {
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    content: {
        position: 'relative',
        padding: 40,
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 30,
    },
    textColumn: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
    },
    trailName: {
        fontFamily: 'Open Sans Bold',
        fontSize: 50,
        color: '#FFFFFF',
        wordBreak: 'keep-all',
        lineHeight: 1.2,
        marginTop: 0, // Compensate for the space above the first line of text
    },
    activityDescription: {
        fontFamily: 'Open Sans Semi-Bold',
        fontSize: 24,
        color: '#FFFFFF',
    },
    location: {
        position: 'absolute',
        left: 40,
        bottom: 20,
    },
    printGuides: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        border: '2px solid #FF1493',
        borderRadius: 20,
    },
    boltHole: {
        position: 'absolute',
        width: mmToPt(5),
        height: mmToPt(5),
        backgroundColor: '#FF1493',
        borderRadius: 1000,
    },
})

export function SmallWayfindingSign({signData}: SmallWayfindingSignProps) {
    const backgroundColor = getSmallWayfindingBackgroundColor(signData.background)
    const arrowRotation = signData.arrowDirection ? getArrowRotation(signData.arrowDirection) : 0

    // Calculate bolt hole positions (centered, 250pt apart horizontally)
    const centerX = mmToPt(120) // Center of 240mm width
    const centerY = mmToPt(40) // Center of 80mm height
    const holeRadius = mmToPt(2.5) // 5mm diameter circles
    const spacing = 93

    return (
        <Document>
            <Page size={[mmToPt(80), mmToPt(240)]} orientation="landscape" style={styles.page}>
                <View style={styles.container}>
                    <View style={[styles.background, {backgroundColor}]}/>
                    <View style={styles.content}>
                        {/* Left: All text content */}
                        <View style={styles.textColumn}>
                            <Text style={styles.trailName}>{signData.trailName}</Text>
                            {signData.activityDescription && (
                                <Text style={styles.activityDescription}>{signData.activityDescription}</Text>
                            )}
                        </View>

                        {/* Right: Arrow Circle */}
                        {signData.arrowDirection && (
                            <ArrowCircle backgroundColor={backgroundColor} rotation={arrowRotation} diameterMm={50} />
                        )}
                    </View>

                    {/* Location - Bottom left corner */}
                    {signData.latitude !== undefined && signData.longitude !== undefined && (
                        <View style={styles.location}>
                            <LocationCoordinates latitude={signData.latitude} longitude={signData.longitude} fontSize={10} singleLine={true} />
                        </View>
                    )}

                    {/* Print Guides */}
                    {signData.printGuides && (
                        <>
                            <View style={styles.printGuides} />
                            {/* Bolt holes */}
                            <View style={[styles.boltHole, {left: centerX - spacing - holeRadius, top: centerY - holeRadius}]} />
                            <View style={[styles.boltHole, {left: centerX + spacing - holeRadius, top: centerY - holeRadius}]} />
                        </>
                    )}
                </View>
            </Page>
        </Document>
    )
}
