import {Document, Page, View, Text, StyleSheet} from '@react-pdf/renderer'
import {WarningPostData} from '../../App'
import {MM_TO_PT, getGradeColor, Danger, Warning} from '../shared/pdfUtils'

interface WarningPostProps {
    signData: WarningPostData
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
        alignItems: 'center',
        paddingBottom: 100,
    },
})

export function WarningPost({signData}: WarningPostProps) {
    const backgroundColor = signData.symbol === 'warning' ? '#ECBA42' : '#C63823'

    return (
        <Document key={signData.symbol}>
            <Page size={[115 * MM_TO_PT, 900 * MM_TO_PT]} orientation="portrait" style={styles.page}>
                <View style={styles.container}>
                    <View style={[styles.background, {backgroundColor}]}/>
                    <View style={styles.content}>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                            {signData.symbol === 'danger' ? (
                                <View style={{ transform: 'scale(1.2)', marginBottom: 40 }}><Danger color="#FFFFFF" /></View>
                            ) : (
                                <View style={{ transform: 'scale(1.2)', marginBottom: 40 }}><Warning color="#FFFFFF" /></View>
                            )}

                            {/* Title */}
                            {signData.title.split('').map((char, index) => (
                                <Text key={index} style={{
                                    fontFamily: 'Overpass Bold',
                                    fontSize: 250,
                                    color: '#FFFFFF',
                                    textAlign: 'center',
                                    lineHeight: 1,
                                    marginBottom: 0,
                                }}>
                                    {char}
                                </Text>
                            ))}
                        </View>

                        {/* Grade Badge */}
                        {signData.grade && (
                            <View style={{
                                position: 'absolute',
                                top: 580 * MM_TO_PT,
                            }}>
                                <View style={{
                                    backgroundColor: getGradeColor(signData.grade),
                                    height: 115 * MM_TO_PT,
                                    width: 240 * MM_TO_PT,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderLeft: '10px solid white',
                                    borderRight: '10px solid white',
                                    transform: 'rotate(90)'
                                }}>
                                    <Text style={{
                                        fontFamily: 'Overpass Bold',
                                        fontSize: 120,
                                        color: '#ffffff',
                                        lineHeight: 1.1,
                                    }}>
                                        GRADE {signData.grade}
                                    </Text>
                                </View>
                            </View>
                        )}
                    </View>
                </View>
            </Page>
        </Document>
    )
}
