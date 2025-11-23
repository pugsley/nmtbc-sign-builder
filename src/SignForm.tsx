import { SignData, defaultWayfindingData, defaultWarningPostData } from './App'
import './SignForm.css'

interface SignFormProps {
  signData: SignData
  onUpdate: (data: SignData) => void
}

// Default data for sign type switching
const getDefaultDataForType = (signType: 'wayfinding' | 'warning'): SignData => {
  if (signType === 'wayfinding') {
    return defaultWayfindingData
  } else {
    return defaultWarningPostData
  }
}

export function SignForm({ signData, onUpdate }: SignFormProps) {
  const handleSignTypeChange = (newType: 'wayfinding' | 'warning') => {
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
          onChange={(e) => handleSignTypeChange(e.target.value as 'wayfinding' | 'warning')}
        >
          <option value="wayfinding">Wayfinding Sign</option>
          <option value="warning">Warning Post</option>
        </select>
      </div>

      {/* Wayfinding Sign Fields */}
      {signData.signType === 'wayfinding' && (
        <>
          <div className="trail-name-row">
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
              <label>Arrow Direction</label>
              <div className="arrow-selector">
            <button
              type="button"
              className={`arrow-button ${signData.arrowDirection === 'NW' ? 'active' : ''}`}
              onClick={() => handleChange('arrowDirection', 'NW')}
            >
              ↖
            </button>
            <button
              type="button"
              className={`arrow-button ${signData.arrowDirection === 'N' ? 'active' : ''}`}
              onClick={() => handleChange('arrowDirection', 'N')}
            >
              ↑
            </button>
            <button
              type="button"
              className={`arrow-button ${signData.arrowDirection === 'NE' ? 'active' : ''}`}
              onClick={() => handleChange('arrowDirection', 'NE')}
            >
              ↗
            </button>
            <button
              type="button"
              className={`arrow-button ${signData.arrowDirection === 'W' ? 'active' : ''}`}
              onClick={() => handleChange('arrowDirection', 'W')}
            >
              ←
            </button>
            <div className="arrow-center">
              ⊕
            </div>
            <button
              type="button"
              className={`arrow-button ${signData.arrowDirection === 'E' ? 'active' : ''}`}
              onClick={() => handleChange('arrowDirection', 'E')}
            >
              →
            </button>
            <button
              type="button"
              className={`arrow-button ${signData.arrowDirection === 'SW' ? 'active' : ''}`}
              onClick={() => handleChange('arrowDirection', 'SW')}
            >
              ↙
            </button>
            <button
              type="button"
              className={`arrow-button ${signData.arrowDirection === 'S' ? 'active' : ''}`}
              onClick={() => handleChange('arrowDirection', 'S')}
            >
              ↓
            </button>
            <button
              type="button"
              className={`arrow-button ${signData.arrowDirection === 'SE' ? 'active' : ''}`}
              onClick={() => handleChange('arrowDirection', 'SE')}
            >
              ↘
            </button>
          </div>
        </div>
      </div>

      <div className="form-row-3">
        <div className="form-group">
          <label htmlFor="grade">Grade Level</label>
          <select
            id="grade"
            value={signData.grade}
            onChange={(e) => handleChange('grade', Number(e.target.value) as SignData['grade'])}
          >
            <option value={1}>Grade 1</option>
            <option value={2}>Grade 2</option>
            <option value={3}>Grade 3</option>
            <option value={4}>Grade 4</option>
            <option value={5}>Grade 5</option>
            <option value={6}>Grade 6</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="gradeNote">Grade Note</label>
          <input
            type="text"
            id="gradeNote"
            value={signData.gradeNote}
            onChange={(e) => handleChange('gradeNote', e.target.value)}
            placeholder="e.g., Technical"
          />
        </div>

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

      <div className="form-group">
        <label htmlFor="distanceType">Activity Description</label>
        <textarea
          id="distanceType"
          value={signData.distanceType}
          onChange={(e) => handleChange('distanceType', e.target.value)}
          placeholder="e.g., One Way"
          rows={2}
        />
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
        </>
      )}

      {/* Warning Post Fields */}
      {signData.signType === 'warning' && (
        <>
          <div className="form-group">
            <label htmlFor="symbol">Warning Symbol</label>
            <select
              id="symbol"
              value={signData.symbol}
              onChange={(e) => handleChange('symbol', e.target.value)}
            >
              <option value="danger">Danger (Triangle)</option>
              <option value="warning">Warning (Diamond)</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="title">Title (One Word)</label>
            <input
              type="text"
              id="title"
              value={signData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="e.g., DANGER, CAUTION, WARNING"
            />
          </div>

          <div className="form-group">
            <label htmlFor="grade">Grade Level</label>
            <select
              id="grade"
              value={signData.grade}
              onChange={(e) => handleChange('grade', Number(e.target.value))}
            >
              <option value={1}>Grade 1</option>
              <option value={2}>Grade 2</option>
              <option value={3}>Grade 3</option>
              <option value={4}>Grade 4</option>
              <option value={5}>Grade 5</option>
              <option value={6}>Grade 6</option>
            </select>
          </div>
        </>
      )}
    </form>
  )
}
