import React from 'react';
import { CustomHomepageGrid } from '@backstage/plugin-home';
import { Content, Page } from '@backstage/core-components';
import {XkcdComicHomePageComponent} from "../src";

export const HomePage = () => {
    return (
        <Page themeId="home">
            <Content>
                <CustomHomepageGrid>
                    <XkcdComicHomePageComponent />
                </CustomHomepageGrid>
            </Content>
        </Page>
    );
};