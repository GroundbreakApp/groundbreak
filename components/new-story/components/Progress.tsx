import React, { useContext } from 'react'
import ProgressWrapper from './ProgressWrapper'

export interface ProgressProps {
    width: number;
    active: number;
    count: number;
}

// eslint-disable-next-line react/display-name, import/no-anonymous-default-export
export default (props: ProgressProps) => {

    const getProgressStyle = ({ active }: { active: number }) => {
        switch (active) {
            case 2:
                return { width: '100%' }
            case 1:
                return { transform: `scaleX(${props.count / 100})` }
            case 0:
                return { width: 0 }
            default:
                return { width: 0 }
        }
    }

    const { width, active } = props
    return (
        <ProgressWrapper width={width} >
            <div
                style={{
                    ...styles.inner,
                    ...getProgressStyle({ active }),
                }} />
        </ProgressWrapper>
    )
}

const styles: any = {
    inner: {
        background: '#fff',
        height: '100%',
        maxWidth: '100%',
        borderRadius: 2,
        transformOrigin: 'center left',

        WebkitBackfaceVisibility: 'hidden',
        MozBackfaceVisibility: 'hidden',
        msBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',

        WebkitPerspective: 1000,
        MozPerspective: 1000,
        msPerspective: 1000,
        perspective: 1000
    }
}