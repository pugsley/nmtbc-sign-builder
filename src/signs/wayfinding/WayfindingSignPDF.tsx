import {Document, Page, View, Text, StyleSheet, Image} from '@react-pdf/renderer'
import {WayfindingSignData, LOGOS} from '../../App'
import {
    mmToPt,
    getGradeColor,
    getArrowRotation,
    ArrowCircle,
    Bike,
    MountainBike,
    LocationCoordinates,
    getBikeRotation,
    NoWalking,
    Walker
} from '../shared/pdfUtils'

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
        height: mmToPt(111),
        marginBottom: 40,
        marginTop: 60,
        marginRight: 60,
        alignSelf: "flex-end",
    },
    trailName: {
        fontFamily: 'Open Sans Bold',
        fontSize: 95,
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
        minWidth: 120,
    },
    distanceText: {
        fontFamily: 'Open Sans Semi-Bold',
        fontSize: 40,
        color: '#FFFFFF',
        marginTop: 10,
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

function getActivityDescription(bikeMode: WayfindingSignData['bikeMode'], walk: boolean): string {
    if (bikeMode === 'twoway' && walk) return 'Two-Way Biking & Walking'
    let bikeLine = bikeMode === 'downhill' ? 'Downhill biking' : bikeMode === 'uphill' ? 'Uphill biking' : 'Two-Way Biking'
    if (!walk) {
       bikeLine = `${bikeLine} only`
    }
    return walk ? `${bikeLine}\nTwo-Way walking` : bikeLine
}

export function WayfindingSign({signData}: WayfindingSignProps) {
    const backgroundColor = getGradeColor(signData.grade)
    const arrowRotation = signData.arrowDirection ? getArrowRotation(signData.arrowDirection) : 0

    const modifier = signData.bikeMode === 'uphill' ? -1 : 1
    const rotation = signData.bikeMode === 'twoway' ? 0 : modifier * getBikeRotation(signData.grade)

    return (
        <Document>
            <Page size={[mmToPt(240), mmToPt(480)]} orientation="portrait" style={styles.page}>
                <View style={styles.container}>
                    <View style={[styles.background, {backgroundColor}]}/>
                    <View style={styles.content}>

                        <View style={styles.topSection}>
                            {/* Arrow Circle - always reserve space to keep layout stable */}
                            <View style={styles.arrowCircleContainer}>
                                {signData.arrowDirection && (
                                    <ArrowCircle backgroundColor={backgroundColor} rotation={arrowRotation} diameterMm={111} />
                                )}
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
                                    <Bike color="#FFFFFF" rotation={0} />
                                    {/*{[1, 2, 3].indexOf(signData.grade) !== -1 && <Bike color="#FFFFFF" rotation={rotation} />}*/}
                                    {/*{[4, 5, 6].indexOf(signData.grade) !== -1 && <MountainBike rotation={rotation} />}*/}
                                    {signData.walk ? <Text style={styles.plusSign}>+</Text> : <Text style={styles.plusSign}> </Text>}
                                    {signData.walk ? <Walker /> : <NoWalking />}
                                </View>

                                {/* Activity Description */}
                                <Text style={styles.distanceText}>
                                    {getActivityDescription(signData.bikeMode, signData.walk)}
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
