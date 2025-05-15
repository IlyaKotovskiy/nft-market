import React from 'react'
import ContentLoader from 'react-content-loader'

const SkeletonCollectionCard = props => (
    <ContentLoader
        width={'100%'}
        height={270}
        viewBox="0 0 430 270"
        backgroundColor="var(--color-navy-light)"
        foregroundColor="var(--color-gray-dark)"
        {...props}
    >   
        <rect x="0" y="0" rx="10" ry="10" width="100%" height="217" />
        <rect x="0" y="230" rx="4" ry="4" width="291" height="9" />
        <rect x="0" y="250" rx="3" ry="3" width="149" height="6" />
    </ContentLoader>
)

export default SkeletonCollectionCard