import {HardEasyPostData} from '../../App'

interface HardEasyPostFormProps {
    signData: HardEasyPostData
    onChange: (field: string, value: any) => void
}

export function HardEasyPostForm({signData, onChange}: HardEasyPostFormProps) {
    return (
        <>
            <h3>Top Section</h3>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="topWord">Top Word</label>
                    <select
                        id="topWord"
                        value={signData.topWord}
                        onChange={(e) => onChange('topWord', e.target.value)}
                    >
                        <option value="EASY">EASY</option>
                        <option value="HARD">HARD</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="topGrade">Top Grade</label>
                    <select
                        id="topGrade"
                        value={signData.topGrade}
                        onChange={(e) => onChange('topGrade', Number(e.target.value))}
                    >
                        <option value={1}>Grade 1</option>
                        <option value={2}>Grade 2</option>
                        <option value={3}>Grade 3</option>
                        <option value={4}>Grade 4</option>
                        <option value={5}>Grade 5</option>
                        <option value={6}>Grade 6</option>
                    </select>
                </div>
            </div>

            <div className="form-group">
                <label>Top Arrow Direction</label>
                <div className="arrow-selector">
                    <button
                        type="button"
                        className={`arrow-button ${signData.topDirection === 'NW' ? 'active' : ''}`}
                        onClick={() => onChange('topDirection', 'NW')}
                    >
                        ↖
                    </button>
                    <button
                        type="button"
                        className={`arrow-button ${signData.topDirection === 'N' ? 'active' : ''}`}
                        onClick={() => onChange('topDirection', 'N')}
                    >
                        ↑
                    </button>
                    <button
                        type="button"
                        className={`arrow-button ${signData.topDirection === 'NE' ? 'active' : ''}`}
                        onClick={() => onChange('topDirection', 'NE')}
                    >
                        ↗
                    </button>
                    <button
                        type="button"
                        className={`arrow-button ${signData.topDirection === 'W' ? 'active' : ''}`}
                        onClick={() => onChange('topDirection', 'W')}
                    >
                        ←
                    </button>
                    <div className="arrow-center">
                        ⊕
                    </div>
                    <button
                        type="button"
                        className={`arrow-button ${signData.topDirection === 'E' ? 'active' : ''}`}
                        onClick={() => onChange('topDirection', 'E')}
                    >
                        →
                    </button>
                    <button
                        type="button"
                        className={`arrow-button ${signData.topDirection === 'SW' ? 'active' : ''}`}
                        onClick={() => onChange('topDirection', 'SW')}
                    >
                        ↙
                    </button>
                    <button
                        type="button"
                        className={`arrow-button ${signData.topDirection === 'S' ? 'active' : ''}`}
                        onClick={() => onChange('topDirection', 'S')}
                    >
                        ↓
                    </button>
                    <button
                        type="button"
                        className={`arrow-button ${signData.topDirection === 'SE' ? 'active' : ''}`}
                        onClick={() => onChange('topDirection', 'SE')}
                    >
                        ↘
                    </button>
                </div>
            </div>

            <h3>Bottom Section</h3>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="bottomWord">Bottom Word</label>
                    <select
                        id="bottomWord"
                        value={signData.bottomWord}
                        onChange={(e) => onChange('bottomWord', e.target.value)}
                    >
                        <option value="EASY">EASY</option>
                        <option value="HARD">HARD</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="bottomGrade">Bottom Grade</label>
                    <select
                        id="bottomGrade"
                        value={signData.bottomGrade}
                        onChange={(e) => onChange('bottomGrade', Number(e.target.value))}
                    >
                        <option value={1}>Grade 1</option>
                        <option value={2}>Grade 2</option>
                        <option value={3}>Grade 3</option>
                        <option value={4}>Grade 4</option>
                        <option value={5}>Grade 5</option>
                        <option value={6}>Grade 6</option>
                    </select>
                </div>
            </div>

            <div className="form-group">
                <label>Bottom Arrow Direction</label>
                <div className="arrow-selector">
                    <button
                        type="button"
                        className={`arrow-button ${signData.bottomDirection === 'NW' ? 'active' : ''}`}
                        onClick={() => onChange('bottomDirection', 'NW')}
                    >
                        ↖
                    </button>
                    <button
                        type="button"
                        className={`arrow-button ${signData.bottomDirection === 'N' ? 'active' : ''}`}
                        onClick={() => onChange('bottomDirection', 'N')}
                    >
                        ↑
                    </button>
                    <button
                        type="button"
                        className={`arrow-button ${signData.bottomDirection === 'NE' ? 'active' : ''}`}
                        onClick={() => onChange('bottomDirection', 'NE')}
                    >
                        ↗
                    </button>
                    <button
                        type="button"
                        className={`arrow-button ${signData.bottomDirection === 'W' ? 'active' : ''}`}
                        onClick={() => onChange('bottomDirection', 'W')}
                    >
                        ←
                    </button>
                    <div className="arrow-center">
                        ⊕
                    </div>
                    <button
                        type="button"
                        className={`arrow-button ${signData.bottomDirection === 'E' ? 'active' : ''}`}
                        onClick={() => onChange('bottomDirection', 'E')}
                    >
                        →
                    </button>
                    <button
                        type="button"
                        className={`arrow-button ${signData.bottomDirection === 'SW' ? 'active' : ''}`}
                        onClick={() => onChange('bottomDirection', 'SW')}
                    >
                        ↙
                    </button>
                    <button
                        type="button"
                        className={`arrow-button ${signData.bottomDirection === 'S' ? 'active' : ''}`}
                        onClick={() => onChange('bottomDirection', 'S')}
                    >
                        ↓
                    </button>
                    <button
                        type="button"
                        className={`arrow-button ${signData.bottomDirection === 'SE' ? 'active' : ''}`}
                        onClick={() => onChange('bottomDirection', 'SE')}
                    >
                        ↘
                    </button>
                </div>
            </div>
        </>
    )
}
