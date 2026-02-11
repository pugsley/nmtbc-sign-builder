import {Font, Svg, Path, View} from '@react-pdf/renderer'
import {WayfindingSignData, WarningPostData} from '../../App'

export const MM_TO_PT = 72 / 25.4;

// Convert millimeters to points
export const mmToPt = (mm: number): number => mm * MM_TO_PT;

// Warning Post Colors
export const WARNING_COLOR = '#ECBA42'  // Yellow
export const DANGER_COLOR = '#C63823'   // Red

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
export const getGradeColor = (grade: number): string => {
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

export const getArrowRotation = (direction: WayfindingSignData['arrowDirection']): number => {
    const rotations: Record<WayfindingSignData['arrowDirection'], number> = {
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

export const getWarningColor = (symbol: WarningPostData['symbol']): string => {
    return symbol === 'warning' ? WARNING_COLOR : DANGER_COLOR
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
            <Arrow color={backgroundColor} rotation={rotation} size={arrowSize} />
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
