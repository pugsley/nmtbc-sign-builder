import {WarningPostData} from '../../App'

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

            <div className="form-group">
                <label htmlFor="grade">Grade Level (Optional)</label>
                <select
                    id="grade"
                    value={signData.grade ?? ''}
                    onChange={(e) => onChange('grade', e.target.value === '' ? undefined : Number(e.target.value))}
                >
                    <option value="">No Grade</option>
                    <option value={1}>Grade 1</option>
                    <option value={2}>Grade 2</option>
                    <option value={3}>Grade 3</option>
                    <option value={4}>Grade 4</option>
                    <option value={5}>Grade 5</option>
                    <option value={6}>Grade 6</option>
                </select>
            </div>
        </>
    )
}
