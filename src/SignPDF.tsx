import {SignData} from './App'
import {WayfindingSign} from './signs/wayfinding/WayfindingSignPDF'
import {WarningPost} from './signs/warning/WarningPostPDF'
import {HardEasyPost} from './signs/hardeasy/HardEasyPostPDF'

interface SignPDFProps {
    signData: SignData
}

// Main SignPDF Component - Routes to appropriate sign type
export function SignPDF({signData}: SignPDFProps) {
    switch (signData.signType) {
        case 'wayfinding':
            return <WayfindingSign signData={signData} />
        case 'warning':
            return <WarningPost signData={signData} />
        case 'hardeasy':
            return <HardEasyPost signData={signData} />
        default:
            return <WayfindingSign signData={signData} />
    }
}
