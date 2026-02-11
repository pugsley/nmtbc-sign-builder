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
        padding: 28,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    topRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    textContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    trailName: {
        fontFamily: 'Open Sans Bold',
        fontSize: 50,
        color: '#FFFFFF',
    },
    activityDescription: {
        fontFamily: 'Open Sans Semi-Bold',
        fontSize: 24,
        color: '#FFFFFF',
        marginTop: 10,
    },
})

export function SmallWayfindingSign({signData}: SmallWayfindingSignProps) {
    const backgroundColor = getSmallWayfindingBackgroundColor(signData.background)
    const arrowRotation = signData.arrowDirection ? getArrowRotation(signData.arrowDirection) : 0

    return (
        <Document>
            <Page size={[mmToPt(80), mmToPt(240)]} orientation="landscape" style={styles.page}>
                <View style={styles.container}>
                    <View style={[styles.background, {backgroundColor}]}/>
                    <View style={styles.content}>
                        {/* Top Row: Trail Name/Description and Arrow */}
                        <View style={styles.topRow}>
                            {/* Left side: Trail Name and Activity Description */}
                            <View style={styles.textContainer}>
                                <Text style={styles.trailName}>{signData.trailName}</Text>
                                {signData.activityDescription && (
                                    <Text style={styles.activityDescription}>{signData.activityDescription}</Text>
                                )}
                            </View>

                            {/* Arrow Circle (optional) */}
                            {signData.arrowDirection && (
                                <View style={{marginRight: 0}}>
                                    <ArrowCircle backgroundColor={backgroundColor} rotation={arrowRotation} diameterMm={50} />
                                </View>
                            )}
                        </View>

                        {/* Bottom: Location Coordinates (if provided) */}
                        {signData.latitude !== undefined && signData.longitude !== undefined && (
                            <LocationCoordinates latitude={signData.latitude} longitude={signData.longitude} fontSize={10} />
                        )}
                    </View>
                </View>
            </Page>
        </Document>
    )
}
