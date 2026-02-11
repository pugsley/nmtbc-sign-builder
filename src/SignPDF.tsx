import {SignData} from './App'
import {WayfindingSign} from './signs/wayfinding/WayfindingSignPDF'
import {WarningPost} from './signs/warning/WarningPostPDF'
import {HardEasyPost} from './signs/hardeasy/HardEasyPostPDF'
import {SmallWayfindingSign} from './signs/smallwayfinding/SmallWayfindingSignPDF'

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
        case 'smallwayfinding':
            return <SmallWayfindingSign signData={signData} />
        default:
            return <WayfindingSign signData={signData} />
    }
}
