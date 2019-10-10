import React from 'react'

import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const Loading: React.FC<{}> = () => {
    return (
    <Container>
        <Typography>loading...</Typography>
        <CircularProgress/>
    </Container>
    )
}

export default Loading
