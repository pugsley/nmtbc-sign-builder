import { SignData, defaultWayfindingData, defaultWarningPostData, defaultHardEasyPostData, defaultSmallWayfindingData } from './App'
import {WayfindingSignForm} from './signs/wayfinding/WayfindingSignForm'
import {WarningPostForm} from './signs/warning/WarningPostForm'
import {HardEasyPostForm} from './signs/hardeasy/HardEasyPostForm'
import {SmallWayfindingSignForm} from './signs/smallwayfinding/SmallWayfindingSignForm'
import './SignForm.css'

interface SignFormProps {
  signData: SignData
  onUpdate: (data: SignData) => void
}

// Default data for sign type switching
const getDefaultDataForType = (signType: 'wayfinding' | 'warning' | 'hardeasy' | 'smallwayfinding'): SignData => {
  if (signType === 'wayfinding') {
    return defaultWayfindingData
  } else if (signType === 'warning') {
    return defaultWarningPostData
  } else if (signType === 'hardeasy') {
    return defaultHardEasyPostData
  } else {
    return defaultSmallWayfindingData
  }
}

export function SignForm({ signData, onUpdate }: SignFormProps) {
  const handleSignTypeChange = (newType: 'wayfinding' | 'warning' | 'hardeasy' | 'smallwayfinding') => {
    if (newType !== signData.signType) {
      onUpdate(getDefaultDataForType(newType))
    }
  }

  const handleChange = (field: string, value: any) => {
    onUpdate({ ...signData, [field]: value } as SignData)
  }

  return (
    <form className="sign-form">
      <div className="form-group">
        <label htmlFor="signType">Sign Type</label>
        <select
          id="signType"
          value={signData.signType}
          onChange={(e) => handleSignTypeChange(e.target.value as 'wayfinding' | 'warning' | 'hardeasy' | 'smallwayfinding')}
        >
          <option value="wayfinding">Wayfinding Sign</option>
          <option value="smallwayfinding">Small Wayfinding Sign</option>
          <option value="hardeasy">Hard/Easy Post</option>
          <option value="warning">Warning Post</option>
        </select>
      </div>

      {/* Render sign-specific form fields */}
      {signData.signType === 'wayfinding' && (
        <WayfindingSignForm signData={signData} onChange={handleChange} />
      )}

      {signData.signType === 'warning' && (
        <WarningPostForm signData={signData} onChange={handleChange} />
      )}

      {signData.signType === 'hardeasy' && (
        <HardEasyPostForm signData={signData} onChange={handleChange} />
      )}

      {signData.signType === 'smallwayfinding' && (
        <SmallWayfindingSignForm signData={signData} onChange={handleChange} />
      )}
    </form>
  )
}
