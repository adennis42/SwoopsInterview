import React from 'react';
import NewsCard from './NewsCard';

function NewsCardGroup({ newsInfo }) {
    return (
        newsInfo.map(info => {
            return <NewsCard articleInfo={info} />
        })
    );
}

export default NewsCardGroup;