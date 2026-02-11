import {Document, Page, View, Text, StyleSheet} from '@react-pdf/renderer'
import {HardEasyPostData} from '../../App'
import {mmToPt, getGradeColor, getArrowRotation, ArrowCircle} from '../shared/pdfUtils'

interface HardEasyPostProps {
    signData: HardEasyPostData
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
})

export function HardEasyPost({signData}: HardEasyPostProps) {
    const topColor = getGradeColor(signData.topGrade)
    const bottomColor = getGradeColor(signData.bottomGrade)
    const topArrowRotation = getArrowRotation(signData.topDirection)
    const bottomArrowRotation = getArrowRotation(signData.bottomDirection)

    return (
        <Document>
            <Page size={[mmToPt(115), mmToPt(900)]} orientation="portrait" style={styles.page}>
                <View style={styles.container}>
                    {/* Top Section */}
                    <View style={{
                        height: mmToPt(450),
                        backgroundColor: topColor,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        paddingTop: 20,
                        paddingBottom: 20,
                    }}>
                        {/* Top Arrow */}
                        <View style={{
                            marginBottom: 60,
                            marginTop: 60,
                        }}>
                            <ArrowCircle backgroundColor={topColor} rotation={topArrowRotation} diameterMm={70} />
                        </View>

                        {/* Top Word */}
                        <View style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            flex: 1,
                            justifyContent: 'flex-start',
                        }}>
                            {signData.topWord.split('').map((char, index) => (
                                <Text key={index} style={{
                                    fontFamily: 'Overpass Bold',
                                    fontSize: 150,
                                    color: '#FFFFFF',
                                    textAlign: 'center',
                                    lineHeight: 1,
                                    marginBottom: 0,
                                }}>
                                    {char}
                                </Text>
                            ))}
                        </View>
                    </View>

                    {/* Divider line when grades match */}
                    {signData.topGrade === signData.bottomGrade && (
                        <View style={{
                            height: 10,
                            backgroundColor: '#FFFFFF',
                            width: '100%',
                        }} />
                    )}

                    {/* Bottom Section */}
                    <View style={{
                        height: mmToPt(450),
                        backgroundColor: bottomColor,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        paddingTop: 20,
                        paddingBottom: 20,
                        marginTop: signData.topGrade === signData.bottomGrade ? 0 : -1,
                    }}>
                        {/* Bottom Arrow */}
                        <View style={{
                            marginBottom: 60,
                            marginTop: 60,
                        }}>
                            <ArrowCircle backgroundColor={bottomColor} rotation={bottomArrowRotation} diameterMm={70} />
                        </View>

                        {/* Bottom Word */}
                        <View style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            flex: 1,
                            justifyContent: 'flex-start',
                        }}>
                            {signData.bottomWord.split('').map((char, index) => (
                                <Text key={index} style={{
                                    fontFamily: 'Overpass Bold',
                                    fontSize: 150,
                                    color: '#FFFFFF',
                                    textAlign: 'center',
                                    lineHeight: 1,
                                    marginBottom: 0,
                                }}>
                                    {char}
                                </Text>
                            ))}
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    )
}
