import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {InfoCard, Link, Progress, ResponseErrorPanel} from '@backstage/core-components';
import {configApiRef, fetchApiRef, useApi} from '@backstage/core-plugin-api';

import {IconButton} from "@material-ui/core";
import ComicButtons, {LAST_INDEX} from "../ComicButtons/ComicButtons";
import {OpenInNew} from "@material-ui/icons";

const useStyles = makeStyles({
    xkcdImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
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
                className={classes.xkcdImage}
            />
        </Link>
    );
};

function ExplainComponent(num: number) {
    return (
        <Link target='_blank'
                 to={`https://www.explainxkcd.com/wiki/index.php/${num}`}>
        <IconButton title="Explain - open in new window" size="small"
                    style={{backgroundColor: 'transparent', fontSize: "small"}}>
            <OpenInNew/> Explain
        </IconButton>
    </Link>
    );
}

export let MAX_COUNT = 2770;

export interface XkcdComicProps {
    showNav?: boolean;
    showExplain?: boolean;
    comicNumber?: number;
    useProxy?: boolean;
    proxyUrl?: string;
}


export const XkcdComicCard = (props: XkcdComicProps) => {
    const {fetch} = useApi(fetchApiRef);
    const config = useApi(configApiRef);

    const [num, setNum] = useState<number>(props.comicNumber || LAST_INDEX);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error>();
    const [comic, setComic] = useState<XkcdComic>();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const backendUrl = config.getString('backend.baseUrl');
            try {
                const url = props.useProxy ? `${backendUrl}/api${props.proxyUrl}` : 'https://xkcd.com/'
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
        <>
            <InfoCard title={loading ? "xkcd" : xkcdComic.safe_title}>
                <div>
                    {props.showNav &&
                        <ComicButtons maxCount={MAX_COUNT} comic={xkcdComic} loading={loading} gotoAction={setNum}
                                      gotoRandom={gotoRandom}/>}
                    {loading && (<Progress/>)}
                    {!loading && (<XkcdImageView props={xkcdComic}/>)}
                </div>
                {props.showExplain &&
                    <div>
                        {!loading && ExplainComponent(xkcdComic.num) }
                    </div>
                }
            </InfoCard>
        </>
    )
};

XkcdComicCard.defaultProps = {
    showNav: true,
    showExplain: true,
    comicNumber: LAST_INDEX,
    useProxy: true,
    proxyUrl: '/proxy/xkcd-proxy/'
};
