import React, {useCallback, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {InfoCard, Link, Progress, ResponseErrorPanel} from '@backstage/core-components';
import {configApiRef, fetchApiRef, useApi} from '@backstage/core-plugin-api';

import ComicButtons from "../ComicButtons/ComicButtons";
import {XkcdComicProps} from "../../types";
import {DEFAULT_MAX_COUNT, LAST_INDEX, XKCD_PROXY_PATH, XKCD_URLS} from "../../config";

const useStyles = makeStyles({
    xkcdImage: {
        width: '100%',
        height: '100%',
        objectFit: 'contain'
    },
    container: {
        height: '100%'
    }
});

/**
 * XKCD API response interface
 */
interface XkcdApiResponse {
    safe_title: string;
    alt: string;
    img: string;
    title: string;
    num: number;
    transcript?: string;
    year?: string;
    month?: string;
    day?: string;
}

type XkcdImageViewProps = {
    comic: XkcdApiResponse;
};

/**
 * Component to display the XKCD comic image with a link to the original comic
 */
export const XkcdImageView = ({comic}: XkcdImageViewProps) => {
    const classes = useStyles();

    return (
        <Link to={XKCD_URLS.comic(comic.num)} target='_blank'>
            <img
                src={comic.img}
                alt={comic.alt}
                title={comic.alt}
                className={classes.xkcdImage}
            />
        </Link>
    );
};

/**
 * XkcdComicCard displays an XKCD comic with optional navigation controls
 *
 * @param props - Component props
 * @param props.showNav - Show navigation buttons (default: true)
 * @param props.showExplain - Show explain link (default: true)
 * @param props.comicNumber - Specific comic number to display (default: latest)
 * @param props.title - Custom card title
 */
export const XkcdComicCard = (props: XkcdComicProps) => {
    const {fetch} = useApi(fetchApiRef);
    const config = useApi(configApiRef);

    const [num, setNum] = useState<number>(props.comicNumber || LAST_INDEX);
    const [maxCount, setMaxCount] = useState<number>(DEFAULT_MAX_COUNT);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error>();
    const [comic, setComic] = useState<XkcdApiResponse>();

    const classes = useStyles();

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            setLoading(true);
            const backendUrl = config.getString('backend.baseUrl');
            try {
                const url = `${backendUrl}/api${XKCD_PROXY_PATH}`;
                const response = await fetch(`${url}${num !== LAST_INDEX ? `${num}/` : ''}info.0.json`);

                if (!response.ok) {
                    throw new Error(`Failed to fetch comic: ${response.statusText}`);
                }

                const data: XkcdApiResponse = await response.json();
                if (num === LAST_INDEX) {
                    setMaxCount(data.num);
                }
                setComic(data);
                setLoading(false);
            } catch (e) {
                const errorMessage = e instanceof Error ? e.message : String(e);
                setError(new Error(errorMessage));
                setLoading(false);
            }
        };
        fetchData().then();
    }, [num, config, fetch]);

    const gotoRandom = useCallback(() => {
        setNum(Math.floor(Math.random() * maxCount) + 1);
    }, [maxCount]);

    if (error) {
        return <ResponseErrorPanel error={error}/>;
    }

    if (loading || !comic) {
        return (
            <InfoCard title={props.title || "xkcd"} variant="fullHeight">
                <div className={classes.container}>
                    <Progress/>
                </div>
            </InfoCard>
        );
    }

    return (
        <InfoCard
            title={props.title || comic.safe_title}
            variant="fullHeight"
            action={props.showNav && <ComicButtons maxCount={maxCount} comic={comic} loading={loading} gotoAction={setNum} gotoRandom={gotoRandom}/>}
            deepLink={props.showExplain ? {
                link: XKCD_URLS.explain(comic.num),
                title: `Explain ${comic.safe_title}`
            } : undefined}
        >
            <div className={classes.container}>
                <XkcdImageView comic={comic}/>
            </div>
        </InfoCard>
    );
};

XkcdComicCard.defaultProps = {
    showNav: true,
    showExplain: true,
    comicNumber: LAST_INDEX
};
