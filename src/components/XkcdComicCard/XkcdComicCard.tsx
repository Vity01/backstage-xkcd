import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {InfoCard, Link, Progress, ResponseErrorPanel} from '@backstage/core-components';
import {configApiRef, fetchApiRef, useApi} from '@backstage/core-plugin-api';

import ComicButtons, {LAST_INDEX} from "../ComicButtons/ComicButtons";
import {XkcdComicProps} from "../../types";

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

type XkcdComic = {
    safe_title: string;
    alt: string;
    img: string;
    title: string;
    num: number;
}

type XkcdImageViewProps = {
    props: XkcdComic;
};

export const XkcdImageView = ({props}: XkcdImageViewProps) => {
    const classes = useStyles();

    return (
        <Link to={`https://xkcd.com/${props.num}`} target='_blank'>
            <img
                src={props.img}
                alt={props.alt}
                title={props.alt}
                className={classes.xkcdImage}
            />
        </Link>
    );
};

export let MAX_COUNT = 2773;


export const XkcdComicCard = (props: XkcdComicProps) => {
    const {fetch} = useApi(fetchApiRef);
    const config = useApi(configApiRef);

    const [num, setNum] = useState<number>(props.comicNumber || LAST_INDEX);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error>();
    const [comic, setComic] = useState<XkcdComic>();

    const classes = useStyles();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const backendUrl = config.getString('backend.baseUrl');
            const proxyUrl = '/proxy/xkcd-proxy/';
            try {
                const url = `${backendUrl}/api${proxyUrl}`
                const response = await fetch(`${url}${num !== LAST_INDEX ? `${num}/` : ''}info.0.json`);
                const data = await response.json()
                if (num === LAST_INDEX) {
                    MAX_COUNT = data.num;
                }
                setComic(data);
                setLoading(false)
                return data;
            } catch (e) {
                if (e instanceof Error) {
                    setError(e);
                } else {
                    setError(new Error(e as string));
                }
            }
        }
        fetchData().then();
    }, [num]);

    const gotoRandom = () => {
        setNum(Math.floor(Math.random() * MAX_COUNT) + 1);
    };

    if (error) {
        return <ResponseErrorPanel error={error}/>;
    }

    const xkcdComic = comic!!;
    return (
        <InfoCard
            title={props.title || loading ? "xkcd" : xkcdComic.safe_title}
            variant="fullHeight"
            action={props.showNav && <ComicButtons maxCount={MAX_COUNT} comic={xkcdComic} loading={loading} gotoAction={setNum} gotoRandom={gotoRandom}/>}
            deepLink={!loading ? {
                link: `https://www.explainxkcd.com/wiki/index.php/${xkcdComic.num}`,
                title: `Explain ${xkcdComic.safe_title}`
            } : undefined}
        >
            <div className={classes.container}>
                {loading ? <Progress/> : <XkcdImageView props={xkcdComic}/>}
            </div>
        </InfoCard>
    )
};

XkcdComicCard.defaultProps = {
    showNav: true,
    showExplain: true,
    comicNumber: LAST_INDEX
};
