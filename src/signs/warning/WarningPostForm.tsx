import {WarningPostData} from '../../App'
import {GradeSelector} from '../shared/formComponents'

interface WarningPostFormProps {
    signData: WarningPostData
    onChange: (field: string, value: any) => void
}

export function WarningPostForm({signData, onChange}: WarningPostFormProps) {
    return (
        <>
            <div className="form-group">
                <label htmlFor="symbol">Warning Symbol</label>
                <select
                    id="symbol"
                    value={signData.symbol}
                    onChange={(e) => onChange('symbol', e.target.value)}
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
                    onChange={(e) => onChange('title', e.target.value)}
                    placeholder="e.g., DANGER, CAUTION, WARNING"
                />
            </div>

            <GradeSelector
                id="grade"
                label="Grade Level"
                value={signData.grade as any}
                onChange={(grade) => onChange('grade', grade)}
                optional={true}
                required={false}
            />
        </>
    )
}
