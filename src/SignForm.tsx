import { SignData, defaultWayfindingData, defaultWarningPostData, defaultHardEasyPostData } from './App'
import {WayfindingSignForm} from './signs/wayfinding/WayfindingSignForm'
import {WarningPostForm} from './signs/warning/WarningPostForm'
import {HardEasyPostForm} from './signs/hardeasy/HardEasyPostForm'
import './SignForm.css'

interface SignFormProps {
  signData: SignData
  onUpdate: (data: SignData) => void
}

// Default data for sign type switching
const getDefaultDataForType = (signType: 'wayfinding' | 'warning' | 'hardeasy'): SignData => {
  if (signType === 'wayfinding') {
    return defaultWayfindingData
  } else if (signType === 'warning') {
    return defaultWarningPostData
  } else {
    return defaultHardEasyPostData
  }
}

export function SignForm({ signData, onUpdate }: SignFormProps) {
  const handleSignTypeChange = (newType: 'wayfinding' | 'warning' | 'hardeasy') => {
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
          onChange={(e) => handleSignTypeChange(e.target.value as 'wayfinding' | 'warning' | 'hardeasy')}
        >
          <option value="wayfinding">Wayfinding Sign</option>
          <option value="warning">Warning Post</option>
          <option value="hardeasy">Hard/Easy Post</option>
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
    </form>
  )
}
