import {HardEasyPostData} from '../../App'
import {GradeSelector, ArrowDirectionSelector} from '../shared/formComponents'

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
                    <input
                        type="text"
                        id="topWord"
                        value={signData.topWord}
                        onChange={(e) => onChange('topWord', e.target.value.toUpperCase())}
                        placeholder="e.g., HARD"
                    />
                </div>

                <GradeSelector
                    id="topGrade"
                    label="Top Grade"
                    value={signData.topGrade}
                    onChange={(grade) => onChange('topGrade', grade)}
                />
            </div>

            <ArrowDirectionSelector
                label="Top Arrow Direction"
                value={signData.topDirection}
                onChange={(direction) => onChange('topDirection', direction)}
            />

            <h3>Bottom Section</h3>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="bottomWord">Bottom Word</label>
                    <input
                        type="text"
                        id="bottomWord"
                        value={signData.bottomWord}
                        onChange={(e) => onChange('bottomWord', e.target.value.toUpperCase())}
                        placeholder="e.g., EASY"
                    />
                </div>

                <GradeSelector
                    id="bottomGrade"
                    label="Bottom Grade"
                    value={signData.bottomGrade}
                    onChange={(grade) => onChange('bottomGrade', grade)}
                />
            </div>

            <ArrowDirectionSelector
                label="Bottom Arrow Direction"
                value={signData.bottomDirection}
                onChange={(direction) => onChange('bottomDirection', direction)}
            />
        </>
    )
}
