import {Document, Page, View, Text, StyleSheet, Image, Font, Svg, Path} from '@react-pdf/renderer'
import {SignData} from './App'
import nccLogo from './img/ncc.png'
import koataLogo from './img/koata.png'
import nmtbcLogo from './img/nmtbc.png'

// Register Open Sans Bold font
Font.register({
    family: 'Open Sans',
    src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf',
})

interface SignPDFProps {
    signData: SignData
}

const getGradeColor = (grade: number): string => {
    const colors: Record<number, string> = {
        1: '#8BBF4B', // Light Green
        2: '#45A525', // Bright Green
        3: '#47ACEC', // Cyan
        4: '#1538A6', // Deep Blue
        5: '#27292E', // Dark Gray
        6: '#C63823', // Red-Orange
    }
    return colors[grade] || colors[3]
}

const getArrowRotation = (direction: SignData['arrowDirection']): number => {
    const rotations: Record<SignData['arrowDirection'], number> = {
        'N': 0,
        'NE': 45,
        'E': 90,
        'SE': 135,
        'S': 180,
        'SW': 225,
        'W': 270,
        'NW': 315,
    }
    return rotations[direction]
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
        border: '1px solid blue'
    },
    arrowCircle: {
        width: 315,
        height: 315,
        backgroundColor: '#FFFFFF',
        borderRadius: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
        marginTop: 60,
        marginRight: 60,
        alignSelf: "flex-end",
    },
    arrowImage: {
        width: 100,
        height: 100,
    },
    trailName: {
        fontFamily: 'Open Sans',
        fontSize: 100,
        lineHeight: 1.1,
        color: '#FFFFFF',
        marginBottom: 60,
    },
    gradeText: {
        fontFamily: 'Open Sans',
        fontSize: 50,
        color: '#FFFFFF',
        marginBottom: 40,
    },
    distanceText: {
        fontFamily: 'Open Sans',
        fontSize: 40,
        color: '#FFFFFF',
        marginBottom: 10,
    },
    icons: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    plusSign: {
        fontFamily: 'Open Sans',
        fontSize: 60,
        color: '#FFFFFF',
        marginLeft: 10,
    },
    bottomSection: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        border: '1px solid yellow'
    },
    coordinates: {
        display: 'flex',
        flexDirection: 'column',
    },
    coordinateLabel: {
        fontFamily: 'Open Sans',
        fontSize: 12,
        color: '#FFFFFF',
        marginBottom: 2,
    },
    coordinateText: {
        fontFamily: 'Open Sans',
        fontSize: 12,
        color: '#FFFFFF',
    },
    logo: {
        width: 60,
        height: 60,
        objectFit: 'contain',
    },
    footerLogos: {
        display: 'flex',
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
    },
    footerLogo: {
        height: 80,
        objectFit: 'contain',
    }
})

// Arrow component using SVG Path
const Arrow = ({color, rotation}: { color: string; rotation: number }) => (
    <Svg width="200" height="200" viewBox="0 0 100 100" style={{transform: `rotate(${rotation}deg)`}}>
        {/* Arrow shaft */}
        <Path
            d="M 0 0 H 100"
            transform="translate(50 12) rotate(90)"
            stroke={color}
            strokeWidth="16"
            strokeLinecap="butt"
        />
        {/* Arrow head - left side */}
        <Path d="M 0 0 H 50"
              transform="translate(50 12) rotate(45)"
              stroke={color}
              strokeWidth="16"
              strokeLinecap="square"
        />
        {/* Arrow head - right side */}
        <Path d="M 0 0 H 50"
              transform="translate(50 12) rotate(135)"
              stroke={color}
              strokeWidth="16"
              strokeLinecap="square"
        />
    </Svg>
)

// Bike component using SVG Path
const Bike = ({color}: { color: string }) => (
    <Svg width="100" height="100" viewBox="0 0 640 640">
        {/* Head + bike + frame */}
        <Path
            fill={color}
            d="M400 160C426.5 160 448 138.5 448 112C448 85.5 426.5 64 400 64C373.5 64 352 85.5 352 112C352 138.5 373.5 160 400 160zM427.2 224L365.4 175.2C348.1 161.6 323.7 161.4 306.3 174.9L223.2 239.1C192.5 262.9 194.7 309.9 227.5 330.7L288 369.1L288 480C288 497.7 302.3 512 320 512C337.7 512 352 497.7 352 480L352 352C352 341.3 346.7 331.3 337.8 325.4L295 296.9L355.3 248.4L396 281C401.7 285.5 408.7 288 416 288L480 288C497.7 288 512 273.7 512 256C512 238.3 497.7 224 480 224L427.2 224z"
        />
        {/* Left wheel */}
        <Path
            d="M 144 464 m -112 0 a 112 112 0 1 0 224 0 a 112 112 0 1 0 -224 0"
            fill="none"
            stroke={color}
            strokeWidth="28"
        />
        {/* Right wheel */}
        <Path
            d="M 496 464 m -112 0 a 112 112 0 1 0 224 0 a 112 112 0 1 0 -224 0"
            fill="none"
            stroke={color}
            strokeWidth="28"
        />
    </Svg>
)

const Walker = ({color}: { color: string }) => (
    <Svg width="80" height="80" viewBox="0 0 640 640">
        <Path
            fill={color}
            d="M320 144C350.9 144 376 118.9 376 88C376 57.1 350.9 32 320 32C289.1 32 264 57.1 264 88C264 118.9 289.1 144 320 144zM233.4 291.9L256 269.3L256 338.6C256 366.6 268.2 393.3 289.5 411.5L360.9 472.7C366.8 477.8 370.7 484.8 371.8 492.5L384.4 580.6C386.9 598.1 403.1 610.3 420.6 607.8C438.1 605.3 450.3 589.1 447.8 571.6L435.2 483.5C431.9 460.4 420.3 439.4 402.6 424.2L368.1 394.6L368.1 279.4L371.9 284.1C390.1 306.9 417.7 320.1 446.9 320.1L480.1 320.1C497.8 320.1 512.1 305.8 512.1 288.1C512.1 270.4 497.8 256.1 480.1 256.1L446.9 256.1C437.2 256.1 428 251.7 421.9 244.1L404 221.7C381 192.9 346.1 176.1 309.2 176.1C277 176.1 246.1 188.9 223.4 211.7L188.1 246.6C170.1 264.6 160 289 160 314.5L160 352C160 369.7 174.3 384 192 384C209.7 384 224 369.7 224 352L224 314.5C224 306 227.4 297.9 233.4 291.9zM245.8 471.3C244.3 476.5 241.5 481.3 237.7 485.1L169.4 553.4C156.9 565.9 156.9 586.2 169.4 598.7C181.9 611.2 202.2 611.2 214.7 598.7L283 530.4C294.5 518.9 302.9 504.6 307.4 488.9L309.6 481.3L263.6 441.9C261.1 439.7 258.6 437.5 256.2 435.1L245.8 471.3z"
        />
    </Svg>
)


export function SignPDF({signData}: SignPDFProps) {
    const backgroundColor = getGradeColor(signData.grade)
    const arrowRotation = getArrowRotation(signData.arrowDirection)

    const MM_TO_PT = 72 / 25.4;

    return (
        <Document>
            <Page size={[240 * MM_TO_PT, 480 * MM_TO_PT]} orientation="portrait" style={styles.page}>
                <View style={styles.container}>
                    <View style={[styles.background, {backgroundColor}]}/>
                    <View style={styles.content}>

                        <View style={styles.topSection}>
                            {/* Arrow Circle */}
                            <View style={styles.arrowCircle}>
                                <Arrow color={backgroundColor} rotation={arrowRotation}/>
                            </View>

                            {/* Trail Name */}
                            <Text style={styles.trailName}>{signData.trailName}</Text>

                            {/* Grade */}
                            <Text style={styles.gradeText}>Grade {signData.grade}     Technical</Text>

                            {/* Distance */}
                            <Text style={styles.distanceText}>
                                {signData.distance} {signData.distanceType}
                            </Text>

                            <View style={styles.icons}>
                                {signData.bike && <Bike color="#FFFFFF" />}
                                {signData.bike && signData.walk && <Text style={styles.plusSign}>+</Text>}
                                {signData.walk && <Walker color="#FFFFFF" />}
                            </View>
                        </View>

                        {/* Bottom Section */}
                        <View style={styles.bottomSection}>
                            <View style={styles.coordinates}>
                                <Text style={styles.coordinateLabel}>
                                    Location: {Math.abs(signData.latitude).toFixed(4)}° {signData.latitude >= 0 ? 'N' : 'S'}, {Math.abs(signData.longitude).toFixed(4)}° {signData.longitude >= 0 ? 'E' : 'W'}
                                </Text>
                            </View>
                            <View style={styles.footerLogos}>
                                <Image src={nccLogo} style={styles.footerLogo}/>
                                <Image src={koataLogo} style={styles.footerLogo}/>
                                <Image src={nmtbcLogo} style={styles.footerLogo}/>
                            </View>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    )
}
