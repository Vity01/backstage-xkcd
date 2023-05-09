import React from 'react';
import { CustomHomepageGrid } from '@backstage/plugin-home';
import { XkcdComicCard } from '../src';
import { Content, Page } from '@backstage/core-components';

export const HomePage = () => {
    return (
        <Page themeId="home">
            <Content>
                <CustomHomepageGrid>
                    <XkcdComicCard />
                </CustomHomepageGrid>
            </Content>
        </Page>
    );
};