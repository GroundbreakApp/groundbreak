import React, { useContext } from 'react'

export interface ProgressWrapperProps {
    children: any;
    width: number;
}
const ProgressWrapper = (props: ProgressWrapperProps) => {

    return (
        <div style={{
            ...styles.progress,
            ...getProgressWrapperStyle(props)
        }}>
            {props.children}
        </div>
    )
}

const getProgressWrapperStyle = ({ width }: { width: any }) => ({
    width: `${width * 100}%`,
})

const styles = {
    progress: {
        height: 2,
        maxWidth: '100%',
        background: '#555',
        marginLeft: 2,
        marginRight: 2,
        borderRadius: 2,
        WebkitBackfaceVisibility: 'hidden' as const,
        MozBackfaceVisibility: 'hidden' as const,
        msBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden' as const,
    }
}

export default ProgressWrapper