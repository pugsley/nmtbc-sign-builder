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
    3: 5,
    4: 10,
    5: 20,
    6: 30,
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

export const Bike = ({color, rotation = 0}: { color: string; rotation?: number }) => {
    let marginTop = 0
    let marginLeft = 0

    if (rotation <= -30) {
        marginLeft = -14
        marginTop = -21
    } else if (rotation <= -20) {
        marginLeft = -9
        marginTop = -21
    } else if (rotation <= -10) {
        marginLeft = -4
        marginTop = -14
    } else if (rotation <= -5) {
        marginLeft = -2
        marginTop = -10
    }


    return (
        <Svg width="100" height="100" viewBox="0 0 640 640"
             style={{transform: `rotate(${rotation}deg)`, marginTop: marginTop, marginLeft: marginLeft}}>
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
        </Svg>)
}


export const MountainBike = ({rotation}: { rotation: number }) => {
    let marginTop = 0
    let marginLeft = 0
    if (rotation <= -30) {
        marginLeft = -14
        marginTop = -21
    } else if (rotation <= -20) {
        marginLeft = -9
        marginTop = -21
    } else if (rotation <= -10) {
        marginLeft = -4
        marginTop = -21
    } else if (rotation >= 30) {
        marginLeft = 10
        marginTop = -21
    } else if (rotation >= 20) {
        marginLeft = 10
        marginTop = -17
    } else if (rotation >= 10) {
        marginLeft = 7
        marginTop = -10
    } else if  (rotation >= 5) {
        marginLeft = 0
        marginTop = -21
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

export const Walker = () => (
    <Svg width="73" height="80" viewBox="0 0 73 119">
        <Path d="M33.1724 23.1339C39.5788 23.1339 44.7827 17.9494 44.7827 11.5669C44.7827 5.18447 39.5788 0 33.1724 0C26.766 0 21.5621 5.18447 21.5621 11.5669C21.5621 17.9494 26.766 23.1339 33.1724 23.1339ZM15.2178 53.683L19.9034 49.0149V63.329C19.9034 69.1124 22.4328 74.6274 26.8489 78.3867L41.6521 91.0277C42.8753 92.0811 43.6839 93.5269 43.912 95.1174L46.5243 113.315C47.0426 116.929 50.4013 119.449 54.0295 118.933C57.6578 118.417 60.1872 115.07 59.6688 111.456L57.0565 93.2584C56.3723 88.4871 53.9673 84.1495 50.2976 81.0099L43.1449 74.8959V51.1011L43.9327 52.0719C47.7061 56.7813 53.4283 59.5078 59.4823 59.5078H66.3655C70.0352 59.5078 73 56.5541 73 52.8981C73 49.2421 70.0352 46.2884 66.3655 46.2884H59.4823C57.4712 46.2884 55.5638 45.3796 54.2991 43.8098L50.5879 39.183C45.8194 33.2343 38.5836 29.7642 30.9333 29.7642C24.2573 29.7642 17.8509 32.4081 13.1446 37.1175L5.8259 44.3262C2.09401 48.0441 0 53.084 0 58.3511V66.0968C0 69.7528 2.96478 72.7065 6.63448 72.7065C10.3042 72.7065 13.269 69.7528 13.269 66.0968V58.3511C13.269 56.5954 13.9739 54.9223 15.2178 53.683ZM17.7887 90.7385C17.4777 91.8126 16.8972 92.804 16.1093 93.5889L1.94888 107.696C-0.642716 110.278 -0.642716 114.471 1.94888 117.053C4.54047 119.635 8.74922 119.635 11.3408 117.053L25.5013 102.946C27.8855 100.57 29.6271 97.6167 30.5601 94.3738L31.0162 92.804L21.4791 84.6658C20.9608 84.2114 20.4425 83.757 19.9449 83.2613L17.7887 90.7385Z" fill="white"/>
    </Svg>
)

export const NoWalking = () => (
    <Svg width="90" height="90" viewBox="0 0 154 154" fill="none">
        <Path
            d="M74.1724 37.1339C80.5788 37.1339 85.7827 31.9494 85.7827 25.5669C85.7827 19.1845 80.5788 14 74.1724 14C67.766 14 62.5621 19.1845 62.5621 25.5669C62.5621 31.9494 67.766 37.1339 74.1724 37.1339ZM56.2178 67.683L60.9034 63.0149V77.329C60.9034 83.1124 63.4328 88.6274 67.8489 92.3867L82.6521 105.028C83.8753 106.081 84.6839 107.527 84.912 109.117L87.5243 127.315C88.0426 130.929 91.4013 133.449 95.0295 132.933C98.6578 132.417 101.187 129.07 100.669 125.456L98.0565 107.258C97.3723 102.487 94.9673 98.1495 91.2976 95.0099L84.1449 88.8959V65.1011L84.9327 66.0719C88.7061 70.7813 94.4283 73.5078 100.482 73.5078H107.366C111.035 73.5078 114 70.5541 114 66.8981C114 63.2421 111.035 60.2884 107.366 60.2884H100.482C98.4712 60.2884 96.5638 59.3796 95.2991 57.8098L91.5879 53.183C86.8194 47.2343 79.5836 43.7642 71.9333 43.7642C65.2573 43.7642 58.8509 46.4081 54.1446 51.1175L46.8259 58.3262C43.094 62.0441 41 67.084 41 72.3511V80.0968C41 83.7528 43.9648 86.7065 47.6345 86.7065C51.3042 86.7065 54.269 83.7528 54.269 80.0968V72.3511C54.269 70.5954 54.9739 68.9223 56.2178 67.683ZM58.7887 104.738C58.4777 105.813 57.8972 106.804 57.1093 107.589L42.9489 121.696C40.3573 124.278 40.3573 128.471 42.9489 131.053C45.5405 133.635 49.7492 133.635 52.3408 131.053L66.5013 116.946C68.8855 114.57 70.6271 111.617 71.5601 108.374L72.0162 106.804L62.4791 98.6658C61.9608 98.2114 61.4425 97.757 60.9449 97.2613L58.7887 104.738Z"
            fill="white"/>
        <Path
            d="M77 5
           A72 72 0 1 1 76.999 5
           Z"
            fill="none"
            stroke="white"
            strokeWidth={10}
        />
        <Path
            d="M30.5355 23.4645 L131.536 124.464"
            fill="none"
            stroke="white"
            strokeWidth={10}
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
