import { ChangeEvent } from 'react'
import { SignData } from './App'
import './SignForm.css'

interface SignFormProps {
  signData: SignData
  onUpdate: (data: SignData) => void
}

export function SignForm({ signData, onUpdate }: SignFormProps) {
  const handleChange = (field: keyof SignData, value: string | number) => {
    onUpdate({ ...signData, [field]: value })
  }

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        handleChange('logo', result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleLogoRemove = () => {
    handleChange('logo', null)
  }

  return (
    <form className="sign-form">
      <div className="form-group">
        <label htmlFor="trailName">Trail Name</label>
        <textarea
          id="trailName"
          value={signData.trailName}
          onChange={(e) => handleChange('trailName', e.target.value)}
          placeholder="e.g., Penny Farthing"
          rows={3}
        />
      </div>

      <div className="form-group">
        <label htmlFor="grade">Grade Level</label>
        <select
          id="grade"
          value={signData.grade}
          onChange={(e) => handleChange('grade', Number(e.target.value) as SignData['grade'])}
        >
          <option value={1}>Grade 1 (Easiest)</option>
          <option value={2}>Grade 2 (Easy)</option>
          <option value={3}>Grade 3 (Moderate)</option>
          <option value={4}>Grade 4 (Challenging)</option>
          <option value={5}>Grade 5 (Difficult)</option>
          <option value={6}>Grade 6 (Expert)</option>
        </select>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="distance">Distance</label>
          <input
            type="text"
            id="distance"
            value={signData.distance}
            onChange={(e) => handleChange('distance', e.target.value)}
            placeholder="e.g., 1.2 km"
          />
        </div>

        <div className="form-group">
          <label htmlFor="distanceType">Type</label>
          <select
            id="distanceType"
            value={signData.distanceType}
            onChange={(e) => handleChange('distanceType', e.target.value as SignData['distanceType'])}
          >
            <option value="One Way">One Way</option>
              <option value="Two Way">Two Way</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="latitude">Latitude</label>
          <input
            type="number"
            id="latitude"
            value={signData.latitude}
            onChange={(e) => handleChange('latitude', parseFloat(e.target.value))}
            step="0.0001"
            placeholder="e.g., -41.2971"
          />
        </div>

        <div className="form-group">
          <label htmlFor="longitude">Longitude</label>
          <input
            type="number"
            id="longitude"
            value={signData.longitude}
            onChange={(e) => handleChange('longitude', parseFloat(e.target.value))}
            step="0.0001"
            placeholder="e.g., 174.7222"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Arrow Direction</label>
        <div className="arrow-selector">
          {(['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'] as const).map((direction) => (
            <button
              key={direction}
              type="button"
              className={`arrow-button ${signData.arrowDirection === direction ? 'active' : ''}`}
              onClick={() => handleChange('arrowDirection', direction)}
            >
              {direction}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="logo">Logo</label>
        {signData.logo ? (
          <div className="logo-preview">
            <img src={signData.logo} alt="Logo preview" />
            <button type="button" onClick={handleLogoRemove} className="remove-logo">
              Remove Logo
            </button>
          </div>
        ) : (
          <input
            type="file"
            id="logo"
            accept="image/*"
            onChange={handleLogoUpload}
          />
        )}
      </div>

      <div className="form-group">
        <label>Activity Icons</label>
        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={signData.bike}
              onChange={(e) => handleChange('bike', e.target.checked)}
            />
            <span>Bike</span>
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={signData.walk}
              onChange={(e) => handleChange('walk', e.target.checked)}
            />
            <span>Walk</span>
          </label>
        </div>
      </div>
    </form>
  )
}
