import {Document, Page, View, Text, StyleSheet} from '@react-pdf/renderer'
import {SmallWayfindingSignData} from '../../App'
import {mmToPt, getGradeColor, getArrowRotation, ArrowCircle} from '../shared/pdfUtils'

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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    trailName: {
        fontFamily: 'Open Sans Bold',
        fontSize: 50,
        color: '#FFFFFF',
        flex: 1,
    },
})

export function SmallWayfindingSign({signData}: SmallWayfindingSignProps) {
    const backgroundColor = getGradeColor(signData.grade)
    const arrowRotation = getArrowRotation(signData.arrowDirection)

    return (
        <Document>
            <Page size={[mmToPt(80), mmToPt(240)]} orientation="landscape" style={styles.page}>
                <View style={styles.container}>
                    <View style={[styles.background, {backgroundColor}]}/>
                    <View style={styles.content}>
                        {/* Trail Name */}
                        <Text style={styles.trailName}>{signData.trailName}</Text>

                        {/* Arrow Circle */}
                        <View style={{marginRight: 0}}>
                            <ArrowCircle backgroundColor={backgroundColor} rotation={arrowRotation} diameterMm={50} />
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    )
}
