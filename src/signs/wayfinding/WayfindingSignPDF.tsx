import {Document, Page, View, Text, StyleSheet, Image} from '@react-pdf/renderer'
import {WayfindingSignData, LOGOS} from '../../App'
import {mmToPt, getGradeColor, getArrowRotation, ArrowCircle, Bike, Walker, LocationCoordinates} from '../shared/pdfUtils'

interface WayfindingSignProps {
    signData: WayfindingSignData
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
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    topSection: {
        display: 'flex',
        flexDirection: 'column',
    },
    middleSection: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    arrowCircleContainer: {
        marginBottom: 40,
        marginTop: 60,
        marginRight: 60,
        alignSelf: "flex-end",
    },
    trailName: {
        fontFamily: 'Open Sans Bold',
        fontSize: 100,
        lineHeight: 1.1,
        color: '#FFFFFF',
        marginBottom: 60,
    },
    gradeTextSection: {
        display: 'flex',
        flexDirection: 'row',
        gap: 30,
        justifyContent: 'space-between',
    },
    gradeText: {
        fontFamily: 'Open Sans Bold',
        fontSize: 50,
        color: '#FFFFFF',
        marginBottom: 40,
    },
    distanceText: {
        fontFamily: 'Open Sans Semi-Bold',
        fontSize: 40,
        color: '#FFFFFF',
    },
    icons: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    plusSign: {
        fontFamily: 'Open Sans Bold',
        fontSize: 60,
        color: '#FFFFFF',
        marginLeft: 10,
    },
    gradeSection: {
        display: 'flex',
        flexDirection: 'column',
    },
    bottomSection: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: 50,
    },
    footerLogos: {
        display: 'flex',
        flexDirection: 'row',
        gap: 30,
        alignItems: 'center',
    },
    footerLogo: {
        height: 80,
        objectFit: 'contain',
    }
})

export function WayfindingSign({signData}: WayfindingSignProps) {
    const backgroundColor = getGradeColor(signData.grade)
    const arrowRotation = getArrowRotation(signData.arrowDirection)

    return (
        <Document>
            <Page size={[mmToPt(240), mmToPt(480)]} orientation="portrait" style={styles.page}>
                <View style={styles.container}>
                    <View style={[styles.background, {backgroundColor}]}/>
                    <View style={styles.content}>

                        <View style={styles.topSection}>
                            {/* Arrow Circle */}
                            <View style={styles.arrowCircleContainer}>
                                <ArrowCircle backgroundColor={backgroundColor} rotation={arrowRotation} diameterMm={111} />
                            </View>

                            {/* Trail Name */}
                            <Text style={styles.trailName}>{signData.trailName}</Text>

                            {/* Grade */}
                            <View style={styles.gradeTextSection}>
                                <Text style={styles.gradeText}>Grade {signData.grade}</Text>
                                <Text style={styles.gradeText}>{signData.gradeNote}</Text>
                                <Text style={styles.gradeText}>{signData.distance}</Text>
                            </View>
                        </View>

                        {/* Middle Section - flex container */}
                        <View style={styles.middleSection}>
                            {/* Icons and Distance - aligned to bottom of middle */}
                            <View style={styles.gradeSection}>
                                <View style={styles.icons}>
                                    {signData.bike && <Bike color="#FFFFFF" />}
                                    {signData.bike && signData.walk && <Text style={styles.plusSign}>+</Text>}
                                    {signData.walk && <Walker color="#FFFFFF" />}
                                </View>

                                {/* Distance Type */}
                                <Text style={styles.distanceText}>
                                    {signData.distanceType}
                                </Text>
                            </View>
                        </View>

                        {/* Bottom Section */}
                        <View style={styles.bottomSection}>
                            <LocationCoordinates latitude={signData.latitude} longitude={signData.longitude} />
                            <View style={styles.footerLogos}>
                                {LOGOS.map(logo =>
                                    signData.logoToggles[logo.id] && (
                                        <Image key={logo.id} src={logo.image} style={styles.footerLogo}/>
                                    )
                                )}
                            </View>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    )
}
