import React from 'react';
import {Grid} from '@material-ui/core';
import {
    Header,
    Page,
    Content,
    ContentHeader,
    HeaderLabel,
    SupportButton,
} from '@backstage/core-components';
import {XkcdComicCard} from "../XkcdComicCard";

export const XkcdPage = () => {
    return (<Page themeId="tool">
            <Header title="Welcome to xkcd!" subtitle="">
                <HeaderLabel label="Owner" value="Vity"/>
                <HeaderLabel label="Lifecycle" value="Alpha"/>
            </Header>
            <Content>
                <ContentHeader title="xkcd">
                    <SupportButton>A description of your plugin goes here.</SupportButton>
                </ContentHeader>
                <Grid container spacing={3} direction="column">
                    <Grid md={3} style={{maxHeight: '450px'}} item>
                        <XkcdComicCard/>
                    </Grid>
                </Grid>
            </Content>
        </Page>
    )
};
