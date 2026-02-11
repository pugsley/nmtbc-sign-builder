import {WayfindingSignData, LOGOS} from '../../App'
import {TrailNameInput, GradeSelector, ArrowDirectionSelector} from '../shared/formComponents'

interface WayfindingSignFormProps {
    signData: WayfindingSignData
    onChange: (field: string, value: any) => void
}

export function WayfindingSignForm({signData, onChange}: WayfindingSignFormProps) {
    return (
        <>
            <div className="trail-name-row">
                <TrailNameInput
                    id="trailName"
                    value={signData.trailName}
                    onChange={(value) => onChange('trailName', value)}
                    rows={2}
                />

                <ArrowDirectionSelector
                    label="Arrow Direction"
                    value={signData.arrowDirection}
                    onChange={(direction) => onChange('arrowDirection', direction)}
                />
            </div>

            <div className="form-row-3">
                <GradeSelector
                    id="grade"
                    label="Grade Level"
                    value={signData.grade}
                    onChange={(grade) => onChange('grade', grade)}
                />

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
                    <label htmlFor="latitude">Latitude *</label>
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
                    <label htmlFor="longitude">Longitude *</label>
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
