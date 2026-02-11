import {WayfindingSignData, LOGOS} from '../../App'

interface WayfindingSignFormProps {
    signData: WayfindingSignData
    onChange: (field: string, value: any) => void
}

export function WayfindingSignForm({signData, onChange}: WayfindingSignFormProps) {
    return (
        <>
            <div className="trail-name-row">
                <div className="form-group">
                    <label htmlFor="trailName">Trail Name</label>
                    <textarea
                        id="trailName"
                        value={signData.trailName}
                        onChange={(e) => onChange('trailName', e.target.value)}
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
                            onClick={() => onChange('arrowDirection', 'NW')}
                        >
                            ↖
                        </button>
                        <button
                            type="button"
                            className={`arrow-button ${signData.arrowDirection === 'N' ? 'active' : ''}`}
                            onClick={() => onChange('arrowDirection', 'N')}
                        >
                            ↑
                        </button>
                        <button
                            type="button"
                            className={`arrow-button ${signData.arrowDirection === 'NE' ? 'active' : ''}`}
                            onClick={() => onChange('arrowDirection', 'NE')}
                        >
                            ↗
                        </button>
                        <button
                            type="button"
                            className={`arrow-button ${signData.arrowDirection === 'W' ? 'active' : ''}`}
                            onClick={() => onChange('arrowDirection', 'W')}
                        >
                            ←
                        </button>
                        <div className="arrow-center">
                            ⊕
                        </div>
                        <button
                            type="button"
                            className={`arrow-button ${signData.arrowDirection === 'E' ? 'active' : ''}`}
                            onClick={() => onChange('arrowDirection', 'E')}
                        >
                            →
                        </button>
                        <button
                            type="button"
                            className={`arrow-button ${signData.arrowDirection === 'SW' ? 'active' : ''}`}
                            onClick={() => onChange('arrowDirection', 'SW')}
                        >
                            ↙
                        </button>
                        <button
                            type="button"
                            className={`arrow-button ${signData.arrowDirection === 'S' ? 'active' : ''}`}
                            onClick={() => onChange('arrowDirection', 'S')}
                        >
                            ↓
                        </button>
                        <button
                            type="button"
                            className={`arrow-button ${signData.arrowDirection === 'SE' ? 'active' : ''}`}
                            onClick={() => onChange('arrowDirection', 'SE')}
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
                        onChange={(e) => onChange('grade', Number(e.target.value) as 1 | 2 | 3 | 4 | 5 | 6)}
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
                        onChange={(e) => onChange('gradeNote', e.target.value)}
                        placeholder="e.g., Technical"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="distance">Distance</label>
                    <input
                        type="text"
                        id="distance"
                        value={signData.distance}
                        onChange={(e) => onChange('distance', e.target.value)}
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
                            onChange={(e) => onChange('bike', e.target.checked)}
                        />
                        <span>Bike</span>
                    </label>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={signData.walk}
                            onChange={(e) => onChange('walk', e.target.checked)}
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
                    onChange={(e) => onChange('distanceType', e.target.value)}
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
                        onChange={(e) => onChange('latitude', parseFloat(e.target.value))}
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
                        onChange={(e) => onChange('longitude', parseFloat(e.target.value))}
                        step="0.0001"
                        placeholder="e.g., 174.7222"
                    />
                </div>
            </div>

            <div className="form-group">
                <label>Footer Logos</label>
                <div className="checkbox-group">
                    {LOGOS.map(logo => (
                        <label key={logo.id} className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={signData.logoToggles[logo.id] ?? true}
                                onChange={(e) => onChange('logoToggles', {
                                    ...signData.logoToggles,
                                    [logo.id]: e.target.checked
                                })}
                            />
                            <span>{logo.name}</span>
                        </label>
                    ))}
                </div>
            </div>
        </>
    )
}
