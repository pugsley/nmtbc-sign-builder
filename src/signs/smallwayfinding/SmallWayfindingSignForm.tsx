import {SmallWayfindingSignData} from '../../App'
import {GradeSelector, ArrowDirectionSelector} from '../shared/formComponents'

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

            <GradeSelector
                id="grade"
                label="Grade Level"
                value={signData.grade}
                onChange={(grade) => onChange('grade', grade)}
            />

            <ArrowDirectionSelector
                label="Arrow Direction"
                value={signData.arrowDirection}
                onChange={(direction) => onChange('arrowDirection', direction)}
            />
        </>
    )
}
