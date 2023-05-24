import * as React from 'react';
import { Renderer as IRenderer, Tester } from './../interfaces';

export const Renderer: IRenderer = (props) => {
    React.useEffect(() => {
        props.action('play');
    }, [props.story])
    const Content = props.story.originalContent as React.ElementType;
    return <Content {...props} />
}

export const tester: Tester = (story) => {
    return {
        condition: !!story.content,
        priority: 2
    }
}

export default {
    renderer: Renderer,
    tester
}