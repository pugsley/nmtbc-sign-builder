import {ArrowDirection, Grade} from '../../App'

interface TrailNameInputProps {
    id: string
    value: string
    onChange: (value: string) => void
    rows?: number
    required?: boolean
}

export function TrailNameInput({id, value, onChange, rows = 3, required = true}: TrailNameInputProps) {
    return (
        <div className="form-group">
            <label htmlFor={id}>Trail Name{required && ' *'}</label>
            <textarea
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="e.g., Te Piki"
                rows={rows}
            />
        </div>
    )
}

interface GradeSelectorProps {
    id: string
    label: string
    value: Grade
    onChange: (grade: Grade) => void
    optional?: boolean
    required?: boolean
}

export function GradeSelector({id, label, value, onChange, optional = false, required = true}: GradeSelectorProps) {
    return (
        <div className="form-group">
            <label htmlFor={id}>{label}{required && ' *'}</label>
            <select
                id={id}
                value={value ?? ''}
                onChange={(e) => onChange(e.target.value === '' ? undefined as any : Number(e.target.value) as Grade)}
            >
                {optional && <option value="">No Grade</option>}
                <option value={1}>Grade 1</option>
                <option value={2}>Grade 2</option>
                <option value={3}>Grade 3</option>
                <option value={4}>Grade 4</option>
                <option value={5}>Grade 5</option>
                <option value={6}>Grade 6</option>
            </select>
        </div>
    )
}

interface ArrowDirectionSelectorProps {
    label: string
    value?: ArrowDirection
    onChange: (direction: ArrowDirection | undefined) => void
    optional?: boolean
    required?: boolean
}

export function ArrowDirectionSelector({label, value, onChange, optional = false, required = true}: ArrowDirectionSelectorProps) {
    const directions: Array<{dir: ArrowDirection, symbol: string}> = [
        {dir: 'NW', symbol: '↖'},
        {dir: 'N', symbol: '↑'},
        {dir: 'NE', symbol: '↗'},
        {dir: 'W', symbol: '←'},
        {dir: 'E', symbol: '→'},
        {dir: 'SW', symbol: '↙'},
        {dir: 'S', symbol: '↓'},
        {dir: 'SE', symbol: '↘'},
    ]

    return (
        <div className="form-group">
            <label>{label}{required && ' *'}</label>
            <div className="arrow-selector">
                {directions.slice(0, 3).map(({dir, symbol}) => (
                    <button
                        key={dir}
                        type="button"
                        className={`arrow-button ${value === dir ? 'active' : ''}`}
                        onClick={() => onChange(dir)}
                    >
                        {symbol}
                    </button>
                ))}
                <button
                    type="button"
                    className={`arrow-button ${value === 'W' ? 'active' : ''}`}
                    onClick={() => onChange('W')}
                >
                    ←
                </button>
                {optional ? (
                    <button
                        type="button"
                        className={`arrow-button ${value === undefined ? 'active' : ''}`}
                        onClick={() => onChange(undefined)}
                    >
                        ✕
                    </button>
                ) : (
                    <div className="arrow-center">
                        ⊕
                    </div>
                )}
                <button
                    type="button"
                    className={`arrow-button ${value === 'E' ? 'active' : ''}`}
                    onClick={() => onChange('E')}
                >
                    →
                </button>
                {directions.slice(5).map(({dir, symbol}) => (
                    <button
                        key={dir}
                        type="button"
                        className={`arrow-button ${value === dir ? 'active' : ''}`}
                        onClick={() => onChange(dir)}
                    >
                        {symbol}
                    </button>
                ))}
            </div>
        </div>
    )
}
