import {SmallWayfindingSignData, SmallWayfindingBackground} from '../../App'
import {ArrowDirectionSelector} from '../shared/formComponents'

interface SmallWayfindingSignFormProps {
    signData: SmallWayfindingSignData
    onChange: (field: string, value: any) => void
}

export function SmallWayfindingSignForm({signData, onChange}: SmallWayfindingSignFormProps) {
    return (
        <>
            <div className="form-group">
                <label htmlFor="trailName">Trail Name</label>
                <input
                    type="text"
                    id="trailName"
                    value={signData.trailName}
                    onChange={(e) => onChange('trailName', e.target.value)}
                    placeholder="e.g., Te Piki"
                />
            </div>

            <div className="form-group">
                <label htmlFor="activityDescription">Activity Description (optional)</label>
                <textarea
                    id="activityDescription"
                    value={signData.activityDescription}
                    onChange={(e) => onChange('activityDescription', e.target.value)}
                    placeholder="e.g., One Way"
                    rows={2}
                />
            </div>

            <div className="form-group">
                <label htmlFor="background">Background Color</label>
                <select
                    id="background"
                    value={signData.background}
                    onChange={(e) => {
                        const value = e.target.value
                        const parsedValue = isNaN(Number(value)) ? value : Number(value)
                        onChange('background', parsedValue as SmallWayfindingBackground)
                    }}
                >
                    <option value={1}>Grade 1</option>
                    <option value={2}>Grade 2</option>
                    <option value={3}>Grade 3</option>
                    <option value={4}>Grade 4</option>
                    <option value={5}>Grade 5</option>
                    <option value={6}>Grade 6</option>
                    <option value="nograde">No Grade</option>
                    <option value="warning">Warning</option>
                    <option value="danger">Danger</option>
                </select>
            </div>

            <ArrowDirectionSelector
                label="Arrow Direction"
                value={signData.arrowDirection}
                onChange={(direction) => onChange('arrowDirection', direction)}
            />

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="latitude">Latitude (Optional)</label>
                    <input
                        type="number"
                        id="latitude"
                        value={signData.latitude ?? ''}
                        onChange={(e) => onChange('latitude', e.target.value === '' ? undefined : parseFloat(e.target.value))}
                        step="0.0001"
                        placeholder="e.g., -41.2971"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="longitude">Longitude (Optional)</label>
                    <input
                        type="number"
                        id="longitude"
                        value={signData.longitude ?? ''}
                        onChange={(e) => onChange('longitude', e.target.value === '' ? undefined : parseFloat(e.target.value))}
                        step="0.0001"
                        placeholder="e.g., 174.7222"
                    />
                </div>
            </div>
        </>
    )
}
