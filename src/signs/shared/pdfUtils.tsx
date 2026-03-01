import {Font, Svg, Path, View, Text} from '@react-pdf/renderer'
import {ArrowDirection, Grade, WarningSymbol, SmallWayfindingBackground} from '../../App'

export const MM_TO_PT = 72 / 25.4;

// Convert millimeters to points
export const mmToPt = (mm: number): number => mm * MM_TO_PT;

// Warning Post Colors
export const WARNING_COLOR = '#ECBA42'  // Yellow
export const DANGER_COLOR = '#C63823'   // Red

const COLOURS: Record<Grade, string> = {
    1: '#8BBF4B', // Light Green
    2: '#45A525', // Bright Green
    3: '#47ACEC', // Cyan
    4: '#1538A6', // Deep Blue
    5: '#27292E', // Dark Gray
    6: '#C63823', // Red-Orange
}

const ROTATION: Record<Grade, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 5,
    5: 10,
    6: 15,
}

// Register Fonts
Font.register({
    family: 'Open Sans Bold',
    src: `${import.meta.env.BASE_URL}fonts/open-sans-700.ttf`,
})

Font.register({
    family: 'Open Sans Semi-Bold',
    src: `${import.meta.env.BASE_URL}fonts/open-sans-600.ttf`,
})

Font.register({
    family: 'Overpass Bold',
    src: `${import.meta.env.BASE_URL}fonts/overpass-latin-700-normal.woff`,
})

// Utility Functions
export const getGradeColor = (grade: Grade): string => {
    return COLOURS[grade]
}

export const getBikeRotation = (grade: Grade): number => {
    return ROTATION[grade]
}

export const getArrowRotation = (direction: ArrowDirection): number => {
    const rotations: Record<ArrowDirection, number> = {
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

export const getWarningColor = (symbol: WarningSymbol): string => {
    return symbol === 'warning' ? WARNING_COLOR : DANGER_COLOR
}

export const getSmallWayfindingBackgroundColor = (background: SmallWayfindingBackground): string => {
    if (typeof background === 'number') {
        return getGradeColor(background)
    }
    switch (background) {
        case 'nograde':
            return '#9399AB'
        case 'warning':
            return WARNING_COLOR
        case 'danger':
            return DANGER_COLOR
        default:
            return getGradeColor(3)
    }
}

// Shared Components
export const Arrow = ({color, rotation, size = 160}: { color: string; rotation: number; size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 100 100" style={{transform: `rotate(${rotation}deg)`}}>
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

// Reusable Arrow Circle Component for PDF signs
export const ArrowCircle = ({backgroundColor, rotation, diameterMm}: {
    backgroundColor: string;
    rotation: number;
    diameterMm: number;
}) => {
    const diameterPt = mmToPt(diameterMm)
    // Arrow size should be proportional to circle diameter (60% of diameter)
    const arrowSize = diameterPt * 0.8

    return (
        <View style={{
            width: diameterPt,
            height: diameterPt,
            backgroundColor: '#FFFFFF',
            borderRadius: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Arrow color={backgroundColor} rotation={rotation} size={arrowSize}/>
        </View>
    )
}

export const Bike = ({color}: { color: string }) => (
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


export const MountainBike = ({rotation}: { rotation: number }) => {
    let marginTop = 0
    let marginLeft = 0
    if (rotation >= 15) {
        marginLeft = 8
        marginTop = -21
    } else if (rotation >= 10) {
        marginLeft = 5
        marginTop = -17
    }

    return (
        <Svg width={90} viewBox="0 0 129 118" style={{transform: `rotate(${rotation}deg)`, marginTop: marginTop, marginLeft: marginLeft}}>
            <Path
                d="M64.2329 93V67.5L36.2329 48L67.2329 35L84 43L96.7329 48"
                stroke="white"
                strokeWidth={14}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />

            <Path
                d="M27 67.5C39.9787 67.5 50.5 78.0213 50.5 91C50.5 103.979 39.9787 114.5 27 114.5C14.0213 114.5 3.5 103.979 3.5 91C3.5 78.0213 14.0213 67.5 27 67.5Z"
                stroke="white"
                strokeWidth={7}
                fill="none"
            />

            {/* circle cx="101.233" cy="91" r="23.5" */}
            <Path
                d="M124.733 91
           A23.5 23.5 0 1 0 77.733 91
           A23.5 23.5 0 1 0 124.733 91"
                stroke="white"
                strokeWidth={7}
                fill="none"
            />

            <Path
                d="M90.0896 18.0363
           A9.5 9.5 0 1 0 71.0896 18.0363
           A9.5 9.5 0 1 0 90.0896 18.0363"
                fill="white"
                stroke="none"
            />

            <Path
                d="M68.4338 10.8367C67.5441 16.199 67.6562 19.0849 68.6647 24.0728C79.137 27.5581 84.9086 30.1383 95.047 35.7763C98.0398 32.9652 99.8686 28.496 99.6336 26.9324C99.3986 25.3688 98.0067 24.6187 98.0067 24.6187C95.7316 25.5193 94.6656 25.9932 93.0584 26.8016C89.6366 25.2125 88.0269 24.1666 85.7781 21.98C85.0805 19.3476 85.2341 18.1363 86.7224 16.5617C89.114 14.5492 91.1846 13.8687 95.4621 13.0095L94.4994 9.79646L99.276 8.59877C102.301 7.83884 102.831 7.12876 103.325 5.75167C96.4449 5.28525 92.5393 4.69118 85.5064 3.15379C76.5283 3.04583 72.7101 4.62083 68.4338 10.8367Z"
                fill="white"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <Path
                d="M56 64.5C60.5 60.5 61.6605 58.5561 66.5 59.1473C72.2667 62.859 73.1842 66.655 72 74.1473C67.0411 78.6612 66.0244 73.1733 60.5 72C60.5 72 51.5 68.5 56 64.5Z"
                fill="white"
            />
        </Svg>
    )
}

export const Walker = ({color}: { color: string }) => (
    <Svg width="80" height="80" viewBox="0 0 640 640">
        <Path
            fill={color}
            d="M320 144C350.9 144 376 118.9 376 88C376 57.1 350.9 32 320 32C289.1 32 264 57.1 264 88C264 118.9 289.1 144 320 144zM233.4 291.9L256 269.3L256 338.6C256 366.6 268.2 393.3 289.5 411.5L360.9 472.7C366.8 477.8 370.7 484.8 371.8 492.5L384.4 580.6C386.9 598.1 403.1 610.3 420.6 607.8C438.1 605.3 450.3 589.1 447.8 571.6L435.2 483.5C431.9 460.4 420.3 439.4 402.6 424.2L368.1 394.6L368.1 279.4L371.9 284.1C390.1 306.9 417.7 320.1 446.9 320.1L480.1 320.1C497.8 320.1 512.1 305.8 512.1 288.1C512.1 270.4 497.8 256.1 480.1 256.1L446.9 256.1C437.2 256.1 428 251.7 421.9 244.1L404 221.7C381 192.9 346.1 176.1 309.2 176.1C277 176.1 246.1 188.9 223.4 211.7L188.1 246.6C170.1 264.6 160 289 160 314.5L160 352C160 369.7 174.3 384 192 384C209.7 384 224 369.7 224 352L224 314.5C224 306 227.4 297.9 233.4 291.9zM245.8 471.3C244.3 476.5 241.5 481.3 237.7 485.1L169.4 553.4C156.9 565.9 156.9 586.2 169.4 598.7C181.9 611.2 202.2 611.2 214.7 598.7L283 530.4C294.5 518.9 302.9 504.6 307.4 488.9L309.6 481.3L263.6 441.9C261.1 439.7 258.6 437.5 256.2 435.1L245.8 471.3z"
        />
    </Svg>
)

export const Danger = ({color}: { color: string }) => (
    <Svg viewBox="0 0 640 640"><Path fill={color} d="M320 64C334.7 64 348.2 72.1 355.2 85L571.2 485C577.9 497.4 577.6 512.4 570.4 524.5C563.2 536.6 550.1 544 536 544L104 544C89.9 544 76.8 536.6 69.6 524.5C62.4 512.4 62.1 497.4 68.8 485L284.8 85C291.8 72.1 305.3 64 320 64zM320 416C302.3 416 288 430.3 288 448C288 465.7 302.3 480 320 480C337.7 480 352 465.7 352 448C352 430.3 337.7 416 320 416zM320 224C301.8 224 287.3 239.5 288.6 257.7L296 361.7C296.9 374.2 307.4 384 319.9 384C332.5 384 342.9 374.3 343.8 361.7L351.2 257.7C352.5 239.5 338.1 224 319.8 224z"/></Svg>
)

export const Warning = ({color}: { color: string }) => (
    <Svg viewBox="0 0 640 640">
        {/* Diamond with exclamation mark cut out */}
        <Path
            fill={color}
            fillRule="evenodd"
            d="M81 279L279 81C289.9 70.1 304.6 64 320 64C335.4 64 350.1 70.1 361 81L559 279C569.9 289.9 576 304.6 576 320C576 335.4 569.9 350.1 559 361L361 559C350.1 569.9 335.4 576 320 576C304.6 576 289.9 569.9 279 559L81 361C70.1 350.1 64 335.4 64 320C64 304.6 70.1 289.9 81 279z M320 384C302.3 384 288 398.3 288 416C288 433.7 302.3 448 320 448C337.7 448 352 433.7 352 416C352 398.3 337.7 384 320 384z M320 192C301.8 192 287.3 207.5 288.6 225.7L296 329.7C296.9 342.2 307.4 352 319.9 352C332.5 352 342.9 342.3 343.8 329.7L351.2 225.7C352.5 207.5 338.1 192 319.8 192z"
        />
    </Svg>
)

// Reusable Location Coordinates Component
export const LocationCoordinates = ({latitude, longitude, fontSize = 12, singleLine = false}: {
    latitude: number;
    longitude: number;
    fontSize?: number;
    singleLine?: boolean;
}) => (
    <View style={{display: 'flex', flexDirection: 'column'}}>
        <Text style={{
            fontFamily: 'Open Sans Semi-Bold',
            fontSize: fontSize,
            color: '#FFFFFF',
            marginBottom: -3,
        }}>
            Location{singleLine ? '   ' : "\n"}
            <Text style={{letterSpacing: 1.2}}>
                {Math.abs(latitude).toFixed(4)}° {latitude >= 0 ? 'N' : 'S'}, {Math.abs(longitude).toFixed(4)}° {longitude >= 0 ? 'E' : 'W'}
            </Text>
        </Text>
    </View>
)
